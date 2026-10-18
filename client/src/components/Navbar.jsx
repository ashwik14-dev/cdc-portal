import { LogOut, ShieldCheck, GraduationCap, BookUser, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const roleMeta = {
  admin: { label: "Administrator", gradient: "from-blue-600 to-indigo-600", icon: ShieldCheck },
  faculty: { label: "Faculty", gradient: "from-indigo-600 to-violet-600", icon: BookUser },
  student: { label: "Student", gradient: "from-blue-600 to-cyan-600", icon: GraduationCap },
};

export default function Navbar({ title = "Dashboard" }) {
  const { user, logout } = useAuth();
  const meta = roleMeta[user?.role] || roleMeta.student;
  const RoleIcon = meta.icon;

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/5">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-lg shadow-blue-900/30 shrink-0`}>
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-slate-900 dark:text-white font-bold text-sm tracking-tight truncate">CDC Portal</div>
            <div className="text-slate-500 dark:text-blue-200/50 text-[10px] font-medium uppercase tracking-wider truncate">{title}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-full pl-1.5 pr-3 py-1.5">
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${meta.gradient} flex items-center justify-center overflow-hidden`}>
              {user?.photo ? (
                <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <RoleIcon className="w-3.5 h-3.5 text-white" />
              )}
            </div>
            <div className="leading-tight">
              <div className="text-slate-900 dark:text-white text-xs font-bold truncate max-w-[120px]">{user?.name}</div>
              <div className="text-slate-500 dark:text-blue-200/50 text-[9px] uppercase font-bold tracking-wider">{meta.label}</div>
            </div>
          </div>

          <ThemeToggle />

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500/15 border border-slate-200 dark:border-white/5 hover:border-red-200 dark:hover:border-red-500/30 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
