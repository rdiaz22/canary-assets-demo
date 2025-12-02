import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (requireAdmin && !isAdmin()) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-md text-center">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔒</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            Acceso restringido
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            No tienes permisos para acceder a esta sección. Se requiere rol de
            administrador.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 transition text-sm"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return children;
}

