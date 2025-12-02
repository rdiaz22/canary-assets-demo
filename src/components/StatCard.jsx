export default function StatCard({ label, value, hint, accent }) {
  const accentClasses =
    accent === "emerald"
      ? "from-emerald-400/30 to-teal-500/20 text-emerald-200"
      : accent === "amber"
      ? "from-amber-400/30 to-orange-500/20 text-amber-200"
      : accent === "rose"
      ? "from-rose-400/30 to-fuchsia-500/20 text-rose-200"
      : "from-slate-400/25 to-slate-500/15 text-slate-200";

  return (
    <div className="bg-slate-900/70 border-[3px] border-slate-700/60 rounded-2xl p-3.5 flex flex-col justify-between shadow-lg shadow-black/40">
      <p className="text-[11px] font-medium text-slate-400 uppercase mb-1">
        {label}
      </p>
      <p
        className={`text-xl font-semibold bg-gradient-to-r ${accentClasses} bg-clip-text`}
      >
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-[10px] text-slate-500 leading-snug">{hint}</p>
      )}
    </div>
  );
}

