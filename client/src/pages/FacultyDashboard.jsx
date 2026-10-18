import { BookUser, Mail, ShieldCheck, CalendarDays } from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function FacultyDashboard() {
  const { user } = useAuth();
  const joined = user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0B0F19] font-inter">
      <Navbar title="Faculty Dashboard" />

      <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Hello, <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">{user?.name}</span>
          </h1>
          <p className="text-slate-500 dark:text-blue-200/50 text-sm font-medium mt-1">Here is your faculty profile.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          <div className="lg:col-span-2 bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-6 shadow-xl shadow-slate-200/60 dark:shadow-black/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600/90 to-violet-600/90 flex items-center justify-center shadow-lg shadow-indigo-900/30">
                <BookUser className="w-[18px] h-[18px] text-white" />
              </div>
              <div>
                <h2 className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">Profile Details</h2>
                <p className="text-slate-500 dark:text-blue-200/40 text-[11px] font-medium">Created and managed by the Admin</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-black text-xs">N</span>
                </div>
                <div className="min-w-0">
                  <div className="text-slate-500 dark:text-blue-200/40 text-[10px] font-bold uppercase tracking-widest">Full Name</div>
                  <div className="text-slate-900 dark:text-white text-sm font-bold truncate">{user?.name}</div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-slate-500 dark:text-blue-200/40 text-[10px] font-bold uppercase tracking-widest">Email</div>
                  <div className="text-slate-900 dark:text-white text-sm font-bold truncate">{user?.email}</div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-slate-500 dark:text-blue-200/40 text-[10px] font-bold uppercase tracking-widest">Role</div>
                  <div className="text-slate-900 dark:text-white text-sm font-bold capitalize">{user?.role}</div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-slate-500 dark:text-blue-200/40 text-[10px] font-bold uppercase tracking-widest">Account Created</div>
                  <div className="text-slate-900 dark:text-white text-sm font-bold">{joined}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-100 via-white to-violet-50 dark:from-indigo-600/20 dark:via-white/[0.04] dark:to-violet-600/10 border border-slate-200 dark:border-white/[0.07] rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-900/40">
              <BookUser className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-slate-900 dark:text-white font-black text-lg tracking-tight">Faculty Access</div>
              <p className="text-slate-500 dark:text-blue-200/50 text-xs font-medium mt-2 leading-relaxed">
                You can view only your own profile. Student lists and admin tools are restricted to the Administrator.
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-500/20">
              Verified Role
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
