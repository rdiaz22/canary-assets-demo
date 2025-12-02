export default function LoadingSpinner({ message = "Cargando..." }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin" />
        </div>
        <p className="text-slate-400 text-sm">{message}</p>
      </div>
    </div>
  );
}

