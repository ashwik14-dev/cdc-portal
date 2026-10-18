import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BadgeCheck, IdCard, Building2, QrCode, Loader2, ShieldAlert, GraduationCap } from "lucide-react";
import PublicNav from "../components/PublicNav";
import { api } from "../api/apiClient";

export default function VerifyPage() {
  const { qrId } = useParams();
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    let alive = true;
    setState({ status: "loading", data: null });
    api
      .get(`/verify/${encodeURIComponent(qrId)}`)
      .then((res) => {
        if (alive) setState({ status: "ok", data: res.data });
      })
      .catch((err) => {
        if (!alive) return;
        setState({ status: err.status === 404 ? "notfound" : "error", data: null });
      });
    return () => {
      alive = false;
    };
  }, [qrId]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0B0F19] font-inter">
      <PublicNav />

      <main className="max-w-[520px] mx-auto px-4 sm:px-6 py-12 flex flex-col items-center">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10 px-3.5 py-1.5 rounded-full mb-6">
          Student Verification
        </span>

        {state.status === "loading" && (
          <div className="w-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-10 shadow-xl shadow-slate-200/60 dark:shadow-none flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
            <p className="text-slate-500 dark:text-blue-200/60 text-sm font-medium">Checking QR code…</p>
          </div>
        )}

        {(state.status === "notfound" || state.status === "error") && (
          <div className="w-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-10 shadow-xl shadow-slate-200/60 dark:shadow-none flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-slate-900 dark:text-white font-black text-xl">
              {state.status === "notfound" ? "Not a valid student QR" : "Could not verify right now"}
            </h1>
            <p className="text-slate-500 dark:text-blue-200/60 text-sm font-medium leading-relaxed">
              {state.status === "notfound"
                ? "We couldn't find a student linked to this QR code. It may have been revoked or is not issued by the CDC Portal."
                : "Something went wrong while verifying this QR code. Please try again in a moment."}
            </p>
            <Link
              to="/"
              className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full px-6 py-2.5 text-sm font-bold shadow-lg shadow-blue-900/30 no-underline hover:-translate-y-0.5 transition"
            >
              Go to CDC Portal
            </Link>
          </div>
        )}

        {state.status === "ok" && state.data && (
          <div className="w-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 dark:shadow-none">
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src="institute_of_aeronautical_engineering_logo.jpg"
                alt="IARE"
                className="w-16 h-16 object-contain rounded-2xl shadow-lg mb-4"
              />
              <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-full">
                <BadgeCheck className="w-5 h-5" />
                <span className="text-sm font-extrabold tracking-tight">Verified Student</span>
              </div>
              <p className="text-slate-500 dark:text-blue-200/50 text-[11px] font-medium mt-3">
                {state.data.institute}
              </p>
            </div>

            <div className="flex flex-col items-center mb-6">
              {state.data.photo && (
                <img
                  src={state.data.photo}
                  alt={state.data.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-white/10 shadow-xl shadow-slate-200/60 dark:shadow-black/30 mb-4"
                />
              )}
              <div className="text-slate-900 dark:text-white font-black text-2xl tracking-tight">
                {state.data.name}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Row icon={<IdCard className="w-4 h-4" />} label="Roll Number" value={state.data.rollNumber || "—"} />
              <Row icon={<Building2 className="w-4 h-4" />} label="Branch" value={state.data.branch || "—"} />
              <Row icon={<QrCode className="w-4 h-4" />} label="QR Identifier" value={state.data.studentQrId} mono />
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 pt-5 border-t border-slate-100 dark:border-white/[0.07]">
              <GraduationCap className="w-4 h-4 text-slate-400 dark:text-blue-200/40" />
              <p className="text-slate-400 dark:text-blue-200/40 text-[10px] font-medium">
                This QR contains only a non-sensitive identifier — never a password or token.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Row({ icon, label, value, mono }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3.5">
      <div className="flex items-center gap-2 text-slate-500 dark:text-blue-200/50 text-[11px] font-bold uppercase tracking-widest">
        <span className="text-blue-600 dark:text-blue-400">{icon}</span>
        {label}
      </div>
      <div className={`text-slate-900 dark:text-white text-sm font-bold text-right ${mono ? "font-mono tracking-wider" : ""}`}>
        {value}
      </div>
    </div>
  );
}
