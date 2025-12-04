export default function StatCard({ label, value, hint, accent }) {
  const accentClasses =
    accent === "emerald"
      ? "from-emerald-500 to-teal-600 dark:from-emerald-400/30 dark:to-teal-500/20 text-emerald-600 dark:text-emerald-200"
      : accent === "amber"
      ? "from-amber-500 to-orange-600 dark:from-amber-400/30 dark:to-orange-500/20 text-amber-600 dark:text-amber-200"
      : accent === "rose"
      ? "from-rose-500 to-fuchsia-600 dark:from-rose-400/30 dark:to-fuchsia-500/20 text-rose-600 dark:text-rose-200"
      : "from-slate-600 to-slate-700 dark:from-slate-400/25 dark:to-slate-500/15 text-slate-700 dark:text-slate-200";

  return (
    <div className="bg-white/80 dark:bg-slate-900/70 border-[3px] border-slate-200 dark:border-slate-700/60 rounded-2xl p-3.5 flex flex-col justify-between shadow-lg shadow-slate-200/50 dark:shadow-black/40">
      <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 uppercase mb-1">
        {label}
      </p>
      <p
        className={`text-xl font-semibold bg-gradient-to-r ${accentClasses} bg-clip-text`}
      >
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-500 leading-snug">{hint}</p>
      )}
    </div>
  );
}

