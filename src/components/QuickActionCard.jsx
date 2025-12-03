export default function QuickActionCard({ title, description, icon: Icon, onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group text-left bg-slate-900/80 border-[2px] rounded-2xl p-4 flex gap-3 items-start shadow-lg transition ${
        disabled
          ? "border-slate-800/40 opacity-60 cursor-not-allowed"
          : "border-slate-700/60 hover:border-emerald-400/80 hover:bg-slate-900 hover:shadow-emerald-500/20 shadow-black/30"
      }`}
    >
      {Icon && (
        <div className={`mt-0.5 h-8 w-8 rounded-xl bg-slate-950/80 border flex items-center justify-center ${
          disabled ? "border-slate-800/40" : "border-slate-700"
        }`}>
          <Icon className={`w-4 h-4 transition-colors ${
            disabled ? "text-slate-600" : "text-slate-300 group-hover:text-emerald-300"
          }`} />
        </div>
      )}

      <div className="flex-1">
        <p className={`text-sm font-semibold ${
          disabled ? "text-slate-500" : "text-slate-100 group-hover:text-emerald-200"
        }`}>
          {title}
        </p>
        <p className={`mt-1 text-[11px] leading-snug ${
          disabled ? "text-slate-600" : "text-slate-500"
        }`}>
          {description}
        </p>
      </div>
    </button>
  );
}

