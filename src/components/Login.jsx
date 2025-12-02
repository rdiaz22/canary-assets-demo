import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LogIn, User, Lock, AlertCircle } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simular delay de red
    setTimeout(() => {
      const result = login(username, password);
      if (!result.success) {
        setError(result.error);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 items-center justify-center text-slate-950 font-bold text-2xl shadow-lg shadow-emerald-500/40 mb-4">
            CA
          </div>
          <h1 className="text-2xl font-bold text-slate-50 mb-2">
            Canary Assets
          </h1>
          <p className="text-sm text-slate-400">
            Sistema de gestión de inventario
          </p>
        </div>

        {/* Card de login */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/40">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-100 mb-2">
              Iniciar sesión
            </h2>
            <p className="text-sm text-slate-400">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Usuario */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin o lector"
                  className="w-full bg-slate-950/60 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 transition"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/60 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 transition"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-sm text-rose-300">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Botón submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 text-slate-950 font-semibold py-2.5 rounded-lg hover:from-emerald-400 hover:to-sky-400 transition shadow-lg shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Iniciar sesión
                </>
              )}
            </button>
          </form>

          {/* Credenciales demo */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 mb-3 text-center">
              Credenciales de demostración:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-slate-950/40 rounded border border-slate-800">
                <div>
                  <span className="text-slate-300 font-medium">Admin:</span>
                  <span className="text-slate-500 ml-2">admin / admin123</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUsername("admin");
                    setPassword("admin123");
                  }}
                  className="text-emerald-400 hover:text-emerald-300 text-[10px] font-medium"
                >
                  Usar
                </button>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-950/40 rounded border border-slate-800">
                <div>
                  <span className="text-slate-300 font-medium">Lector:</span>
                  <span className="text-slate-500 ml-2">lector / lector123</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUsername("lector");
                    setPassword("lector123");
                  }}
                  className="text-emerald-400 hover:text-emerald-300 text-[10px] font-medium"
                >
                  Usar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Esta es una demo pública · Solo lectura
        </p>
      </div>
    </div>
  );
}

