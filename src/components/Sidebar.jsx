import { LogOut, User as UserIcon, Shield } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function SidebarSection({ title, children }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-wide text-slate-500">
          {title}
        </p>
        <span className="h-px flex-1 ml-2 bg-gradient-to-r from-emerald-500/60 via-sky-500/40 to-transparent" />
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function SidebarItem({ label, icon, active }) {
  return (
    <button
      type="button"
      className={`
        w-full flex items-center gap-3 px-4 py-2.5
        rounded-full text-left text-sm transition
        border
        ${
          active
            ? "bg-slate-900/90 border-emerald-400 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
            : "bg-slate-950/40 border-slate-800 text-slate-300 hover:border-emerald-400/70 hover:bg-slate-900/80 hover:text-slate-50"
        }
      `}
    >
      <span className="text-base">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default function Sidebar({ onLogout }) {
  const { user, isAdmin } = useAuth();

  return (
    <aside className="hidden md:flex w-72 flex-col border-r border-slate-800 bg-slate-950/95 backdrop-blur">
      {/* Logo + título */}
      <div className="px-5 py-4 flex items-center gap-3 border-b border-slate-800/80">
        <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/40">
          CA
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-50">Canary Assets</p>
          <p className="text-[11px] text-emerald-300">Inventario demo</p>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 text-sm space-y-5">
        <SidebarSection title="Principal">
          <SidebarItem label="Inicio" icon="🏠" active />
          <SidebarItem label="Activos" icon="💻" />
        </SidebarSection>

        {isAdmin() && (
          <SidebarSection title="Operaciones">
            <SidebarItem label="Mantenimiento" icon="🛠️" />
            <SidebarItem label="Auditorías" icon="📋" />
          </SidebarSection>
        )}

        {isAdmin() && (
          <SidebarSection title="Sistema">
            <SidebarItem label="Configuración" icon="⚙️" />
            <SidebarItem label="Escanear (demo)" icon="📱" />
          </SidebarSection>
        )}
      </nav>

      {/* Usuario */}
      <div className="px-4 py-4 border-t border-slate-800/80">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400/70 to-sky-500/70 flex items-center justify-center text-[11px] font-semibold text-slate-950">
            {user?.avatar || "U"}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-medium text-slate-100 text-xs truncate">
              {user?.name || "Usuario"}
            </span>
            <span className="text-[10px] text-emerald-300 flex items-center gap-1">
              {isAdmin() ? (
                <>
                  <Shield className="w-3 h-3" />
                  Administrador
                </>
              ) : (
                <>
                  <UserIcon className="w-3 h-3" />
                  Lector
                </>
              )}
            </span>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 rounded-lg transition border border-slate-800 hover:border-slate-700"
        >
          <LogOut className="w-3.5 h-3.5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

