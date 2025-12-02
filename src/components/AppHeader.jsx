import { LogOut, Shield } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function AppHeader({
  onOpenCommand,
  onScrollToInventory,
  onMaintenanceClick,
  isAdmin,
}) {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 space-y-3">
        {/* Primera fila: logo + texto + chips demo */}
        <div className="flex items-center justify-between gap-4">
          {/* En móvil mostramos logo + título porque no hay sidebar */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center text-slate-950 font-bold text-sm">
              CA
            </div>
            <div>
              <p className="text-sm font-semibold">Canary Assets</p>
              <p className="text-[10px] text-slate-500">
                Inventario demo · React + Supabase
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <p className="text-xs text-slate-400">
              Panel principal · Gestión de activos informáticos
            </p>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Botón de búsqueda global */}
            <button
              type="button"
              onClick={onOpenCommand}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200 transition"
            >
              <span className="flex items-center gap-1">
                Buscar
                <span className="hidden md:inline text-slate-500">activos</span>
              </span>
              <span className="flex items-center gap-1 text-[9px] text-slate-500">
                <span className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-950/80">
                  Ctrl
                </span>
                <span>+</span>
                <span className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-950/80">
                  K
                </span>
              </span>
            </button>
            {/* Info del usuario en móvil */}
            <div className="md:hidden flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400/70 to-sky-500/70 flex items-center justify-center text-[10px] font-semibold text-slate-950">
                {user?.avatar || "U"}
              </div>
              {isAdmin && <Shield className="w-4 h-4 text-emerald-400" />}
            </div>

            {/* Info del usuario en desktop */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-400/70 to-sky-500/70 flex items-center justify-center text-[10px] font-semibold text-slate-950">
                  {user?.avatar || "U"}
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-slate-100 leading-tight">
                    {user?.name || "Usuario"}
                  </span>
                  <span className="text-[9px] text-slate-500">
                    {isAdmin ? "Administrador" : "Lector"}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition border border-slate-800 hover:border-slate-700"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-400/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5" />
              Demo pública · Solo lectura
            </span>
          </div>
        </div>

        {/* Segunda fila: menú móvil */}
        <div className="flex gap-2 md:hidden text-xs">
          <button
            type="button"
            className="px-3 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-medium border border-emerald-400 shadow shadow-emerald-500/40"
          >
            Inicio
          </button>
          <button
            type="button"
            onClick={onScrollToInventory}
            className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition"
          >
            Activos
          </button>
          {isAdmin && (
            <button
              type="button"
              onClick={onMaintenanceClick}
              className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-100 transition"
            >
              Mantenimiento
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

