import { NavLink } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function PublicNav() {
  return (
    <header className="sticky top-0 z-50 bg-slate-200 dark:bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-300 dark:border-white/5">
      <div className="h-16 px-4 sm:px-6 flex items-center gap-4 sm:gap-8">
        <div className="max-w-[1100px] mr-auto flex items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2.5 font-extrabold text-slate-900 dark:text-white tracking-tight shrink-0">
            <span className="w-[34px] h-[34px] rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/40">
              <ShieldCheck className="w-[18px] h-[18px] text-white" />
            </span>
            <span className="hidden sm:inline">CDC Portal</span>
          </div>

          <nav className="flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `inline-flex flex-col items-center px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-all ${
                    isActive
                      ? "text-blue-600 bg-blue-50 dark:bg-white dark:text-transparent"
                      : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={
                        isActive
                          ? "dark:bg-gradient-to-r dark:from-blue-600 dark:to-violet-600 dark:bg-clip-text dark:text-transparent"
                          : ""
                      }
                    >
                      {l.label}
                    </span>
                    {isActive && (
                      <span className="hidden dark:block mt-[2px] h-0.5 w-3.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
