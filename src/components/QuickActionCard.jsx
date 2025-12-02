export default function QuickActionCard({ title, description, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left bg-slate-900/80 border-[2px] border-slate-700/60 rounded-2xl p-4 flex gap-3 items-start hover:border-emerald-400/80 hover:bg-slate-900 shadow-lg shadow-black/30 hover:shadow-emerald-500/20 transition"
    >
      {Icon && (
        <div className="mt-0.5 h-8 w-8 rounded-xl bg-slate-950/80 border border-slate-700 flex items-center justify-center">
          <Icon className="w-4 h-4 text-slate-300 group-hover:text-emerald-300 transition-colors" />
        </div>
      )}

      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-100 group-hover:text-emerald-200">
          {title}
        </p>
        <p className="mt-1 text-[11px] text-slate-500 leading-snug">
          {description}
        </p>
      </div>
    </button>
  );
}

