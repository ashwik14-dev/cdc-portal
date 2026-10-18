import { GraduationCap, Mail, IdCard, ShieldCheck, QrCode, Download, CalendarDays, Building2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "../components/Navbar";
import PhotoUploader from "../components/PhotoUploader";
import { useAuth } from "../context/AuthContext";

function downloadQr() {
  const svg = document.getElementById("student-qr");
  if (!svg) return;
  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const a = document.createElement("a");
    a.download = `qr-${Date.now()}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const joined = user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

  const verifyBase = import.meta.env.VITE_PUBLIC_ORIGIN || window.location.origin;
  const qrValue =
    user?.studentQrId ? `${verifyBase}/verify/${user.studentQrId}` : "CDC";

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0B0F19] font-inter">
      <Navbar title="Student Dashboard" />

      <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Hello, <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">{user?.name}</span>
          </h1>
          <p className="text-slate-500 dark:text-blue-200/50 text-sm font-medium mt-1">Here is your student profile and unique QR code.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          <div className="lg:col-span-2 bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-6 backdrop-blur-xl shadow-xl shadow-slate-200/60 dark:shadow-black/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/80 to-cyan-600/80 flex items-center justify-center shadow-lg shadow-blue-900/30">
                <GraduationCap className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <h2 className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">Profile Details</h2>
                <p className="text-slate-500 dark:text-blue-200/40 text-[11px] font-medium">Created and managed by the Admin</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3.5">
                <div className="text-slate-500 dark:text-blue-200/40 text-[10px] font-bold uppercase tracking-widest mb-1">Full Name</div>
                <div className="text-slate-900 dark:text-white text-sm font-bold truncate">{user?.name}</div>
              </div>
              <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3.5">
                <div className="text-slate-500 dark:text-blue-200/40 text-[10px] font-bold uppercase tracking-widest mb-1">Email</div>
                <div className="text-slate-900 dark:text-white text-sm font-bold truncate flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  {user?.email}
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3.5">
                <div className="text-slate-500 dark:text-blue-200/40 text-[10px] font-bold uppercase tracking-widest mb-1">Roll Number</div>
                <div className="text-slate-900 dark:text-white text-sm font-bold truncate flex items-center gap-2">
                  <IdCard className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  {user?.rollNumber}
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3.5">
                <div className="text-slate-500 dark:text-blue-200/40 text-[10px] font-bold uppercase tracking-widest mb-1">Branch</div>
                <div className="text-slate-900 dark:text-white text-sm font-bold truncate flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  {user?.branch || "—"}
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3.5">
                <div className="text-slate-500 dark:text-blue-200/40 text-[10px] font-bold uppercase tracking-widest mb-1">Role</div>
                <div className="text-slate-900 dark:text-white text-sm font-bold capitalize flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 shrink-0" />
                  {user?.role}
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3.5 sm:col-span-2">
                <div className="text-slate-500 dark:text-blue-200/40 text-[10px] font-bold uppercase tracking-widest mb-1">Account Created</div>
                <div className="text-slate-900 dark:text-white text-sm font-bold flex items-center gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                  {joined}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-6 backdrop-blur-xl shadow-xl shadow-slate-200/60 dark:shadow-black/20 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-6 self-start w-full">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/80 to-cyan-600/80 flex items-center justify-center shadow-lg shadow-blue-900/30">
                  <QrCode className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h2 className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">My QR Code</h2>
                  <p className="text-slate-500 dark:text-blue-200/40 text-[11px] font-medium">Unique to your account</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-2xl shadow-blue-900/20 border border-slate-100">
                <QRCodeSVG
                  id="student-qr"
                  value={qrValue}
                  size={180}
                  level="H"
                  includeMargin={false}
                  fgColor="#0B0F19"
                  bgColor="#FFFFFF"
                />
              </div>

              <div className="mt-4 text-center">
                <div className="text-slate-500 dark:text-blue-200/40 text-[10px] font-bold uppercase tracking-widest">QR Identifier</div>
                <div className="text-slate-900 dark:text-white font-mono font-bold text-sm mt-1 tracking-wider">{user?.studentQrId}</div>
              </div>

              <button
                onClick={downloadQr}
                className="mt-5 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-xs rounded-full py-3 shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download QR
              </button>

              <p className="text-slate-400 dark:text-blue-200/30 text-[10px] font-medium mt-3 text-center leading-relaxed">
                Scan this QR to open your public verification page — it never reveals your password or token.
              </p>
            </div>

            <PhotoUploader />
          </div>
        </div>
      </main>
    </div>
  );
}
