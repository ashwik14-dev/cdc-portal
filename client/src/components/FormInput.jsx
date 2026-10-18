export default function FormInput({ label, icon: Icon, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs font-bold text-slate-500 dark:text-blue-200/60 ml-3 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-blue-200/45 group-focus-within:text-blue-600 transition-colors"
            aria-hidden="true"
          />
        )}
        <input
          className={`w-full bg-white dark:bg-white/[0.06] border-2 border-slate-100 dark:border-white/10 rounded-full py-3 ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 focus:bg-white dark:focus:bg-white/[0.08] focus:border-blue-600 focus:shadow-lg focus:shadow-blue-600/10 transition-all outline-none ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
