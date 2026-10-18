import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark / light mode"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`w-[42px] h-[42px] rounded-full flex items-center justify-center border backdrop-blur-md transition-all shadow-lg hover:scale-105 cursor-pointer ${
        dark
          ? "bg-white/[0.08] border-white/15 text-slate-200 shadow-black/40"
          : "bg-white/90 border-slate-200 text-slate-600 shadow-slate-900/10"
      } ${className}`}
    >
      {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  );
}
