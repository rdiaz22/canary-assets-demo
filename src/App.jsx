import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, ClipboardList, Scan, Code2, Database, Globe2, Github } from "lucide-react";
import { supabase } from "./lib/supabaseClient";
import AssetStatusBadge from "./components/AssetStatusBadge";
import AssetsByCategoryChart from "./components/AssetsByCategoryChart";

const STATUS_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "disponible", label: "Disponibles" },
  { value: "prestado", label: "Prestados" },
  { value: "averiado", label: "Averiados" },
];

function App() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const inventoryRef = useRef(null);

  const scrollToInventory = useCallback(() => {
    // Usar requestAnimationFrame para deferir el scroll y no bloquear la UI
    requestAnimationFrame(() => {
      if (inventoryRef.current) {
        inventoryRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }, []);

  // Handlers optimizados que no bloquean la UI
  const handleNewAssetClick = useCallback(() => {
    setTimeout(() => {
      alert(
        "Demo: aquí iría el formulario de creación de activos en la versión completa."
      );
    }, 0);
  }, []);

  const handleScanClick = useCallback(() => {
    setTimeout(() => {
      alert(
        "Demo: aquí se abriría el escáner de códigos de barras / QR en la app real."
      );
    }, 0);
  }, []);

  const handleMaintenanceClick = useCallback(() => {
    setTimeout(() => {
      alert(
        "Demo: en una versión completa aquí verías el módulo de mantenimiento."
      );
    }, 0);
  }, []);

  const handleStatusFilterChange = useCallback((value) => {
    setStatusFilter(value);
  }, []);

  useEffect(() => {
    const loadAssets = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("assets_public")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error cargando activos:", error);
      } else {
        setAssets(data || []);
      }
      setLoading(false);
    };

    loadAssets();
  }, []);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        (asset.name +
          asset.code +
          (asset.location || "") +
          (asset.category || ""))
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        asset.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [assets, search, statusFilter]);

  const stats = useMemo(() => {
    const total = assets.length;
    const disponibles = assets.filter(
      (a) => a.status?.toLowerCase() === "disponible"
    ).length;
    const prestados = assets.filter(
      (a) => a.status?.toLowerCase() === "prestado"
    ).length;
    const averiados = assets.filter(
      (a) => a.status?.toLowerCase() === "averiado"
    ).length;

    return { total, disponibles, prestados, averiados };
  }, [assets]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex">
      {/* SIDEBAR (desktop) */}
      <aside className="hidden md:flex w-72 flex-col border-r border-slate-800 bg-slate-950/95 backdrop-blur">
        {/* Logo + título */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-slate-800/80">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/40">
            CA
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-50">
              Canary Assets
            </p>
            <p className="text-[11px] text-emerald-300">Inventario demo</p>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 py-4 text-sm space-y-5">
          <SidebarSection title="Principal">
            <SidebarItem label="Inicio" icon="🏠" active />
            <SidebarItem label="Activos" icon="💻" />
          </SidebarSection>

          <SidebarSection title="Operaciones">
            <SidebarItem label="Mantenimiento" icon="🛠️" />
            <SidebarItem label="Auditorías" icon="📋" />
          </SidebarSection>

          <SidebarSection title="Sistema">
            <SidebarItem label="Configuración" icon="⚙️" />
            <SidebarItem label="Escanear (demo)" icon="📱" />
          </SidebarSection>
        </nav>

        {/* Usuario demo */}
        <div className="px-4 py-4 border-t border-slate-800/80 text-xs flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400/70 to-sky-500/70 flex items-center justify-center text-[11px] font-semibold text-slate-950">
            RD
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-slate-100">rdiaz22</span>
            <span className="text-[10px] text-emerald-300">
              Administrador del sistema
            </span>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER SUPERIOR */}
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
                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-400/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5" />
                  Demo pública · Solo lectura
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:block">
                  Diseñada como ejemplo de portfolio
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
                onClick={scrollToInventory}
                className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition"
              >
                Activos
              </button>
              <button
                type="button"
                onClick={handleMaintenanceClick}
                className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-100 transition"
              >
                Mantenimiento
              </button>
            </div>
          </div>
        </header>

        {/* MAIN DASHBOARD */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-6 md:py-8 space-y-6">
          {/* Bloque superior con descripción + métricas */}
          <section className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)]">
            {/* Intro */}
            <div className="bg-slate-900/80 border-[3px] border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-xl shadow-black/40">
              <h2 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-[11px]">
                  i
                </span>
                Visión general
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                Este panel muestra una demo de un sistema de gestión de activos
                informáticos. Los datos se almacenan en{" "}
                <span className="font-semibold text-slate-100">Supabase</span> y
                se consultan en tiempo real desde un frontend construido con{" "}
                <span className="font-semibold text-slate-100">React</span> y{" "}
                <span className="font-semibold text-slate-100">Tailwind</span>.
              </p>
              <p className="text-xs text-slate-500">
                Ideal para mostrar flujos de lectura, filtrado, visualización de
                datos y diseño UI de dashboards modernos.
              </p>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard
                label="Activos totales"
                value={stats.total}
                hint="Equipos registrados en esta demo"
              />
              <StatCard
                label="Disponibles"
                value={stats.disponibles}
                accent="emerald"
                hint="Listos para usar"
              />
              <StatCard
                label="Prestados"
                value={stats.prestados}
                accent="amber"
                hint="Asignados a usuarios"
              />
              <StatCard
                label="Averiados"
                value={stats.averiados}
                accent="rose"
                hint="Requieren revisión"
              />
            </div>
          </section>

          {/* ACCIONES RÁPIDAS */}
          <section className="grid gap-3 md:grid-cols-3">
            <QuickActionCard
              title="Registrar nuevo activo"
              description="En una versión completa podrías crear y dar de alta nuevos equipos."
              icon={Plus}
              onClick={handleNewAssetClick}
            />
            <QuickActionCard
              title="Ver inventario"
              description="Ir directamente a la tabla de activos registrados."
              icon={ClipboardList}
              onClick={scrollToInventory}
            />
            <QuickActionCard
              title="Escanear activo (demo)"
              description="Simulación de acceso al módulo de escaneo con cámara y códigos."
              icon={Scan}
              onClick={handleScanClick}
            />
          </section>

          {/* Panel principal: filtros + tabla */}
          <section
            ref={inventoryRef}
            className="bg-slate-900/80 border-[3px] border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-2xl shadow-black/40 space-y-4"
          >
            {/* Filtros */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-100">
                  Inventario de activos
                </h2>
                <p className="text-xs text-slate-500">
                  Vista de solo lectura desde la vista{" "}
                  <code className="px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-[11px] font-mono">
                    assets_public
                  </code>
                  .
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar por nombre, código o ubicación..."
                    className="w-full md:w-64 bg-slate-950/60 border border-slate-700 rounded-full px-9 py-1.5 text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <span className="absolute left-3 top-1.5 text-slate-500 text-xs">
                    🔍
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleStatusFilterChange(opt.value)}
                      className={`px-3 py-1 rounded-full text-[11px] border transition
                        ${
                          statusFilter === opt.value
                            ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow shadow-emerald-500/40"
                            : "bg-slate-950/40 text-slate-300 border-slate-700 hover:border-slate-500"
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabla */}
            {loading ? (
              <div className="py-10 text-center text-slate-400 text-sm">
                Cargando inventario demo...
              </div>
            ) : filteredAssets.length === 0 ? (
              <div className="py-10 text-center text-slate-500 text-sm">
                No hay activos que coincidan con los filtros actuales.
              </div>
            ) : (
              <div className="rounded-xl border-[2px] border-slate-700/60 overflow-hidden bg-slate-950/40">
                <div className="overflow-x-auto">
                  <table className="min-w-[640px] w-full text-xs md:text-sm">
                    <thead className="bg-slate-900/90 border-b border-slate-800 text-[11px] uppercase text-slate-400">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">
                          Código
                        </th>
                        <th className="px-3 py-2 text-left font-medium">
                          Nombre
                        </th>
                        <th className="px-3 py-2 text-left font-medium">
                          Categoría
                        </th>
                        <th className="px-3 py-2 text-left font-medium">
                          Estado
                        </th>
                        <th className="px-3 py-2 text-left font-medium">
                          Ubicación
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssets.map((asset, idx) => (
                        <tr
                          key={asset.id}
                          className={`border-b border-slate-800/80 last:border-0 hover:bg-slate-900/70 transition ${
                            idx % 2 === 0 ? "bg-slate-950/10" : ""
                          }`}
                        >
                          <td className="px-3 py-2 font-mono text-[11px] text-slate-400">
                            {asset.code}
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex flex-col">
                              <Link
                                to={`/activo/${asset.id}`}
                                className="font-medium text-slate-50 hover:underline decoration-emerald-400"
                              >
                                {asset.name}
                              </Link>
                              {asset.description && (
                                <span className="text-[11px] text-slate-400 line-clamp-1">
                                  {asset.description}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-2 text-slate-200">
                            {asset.category || "—"}
                          </td>
                          <td className="px-3 py-2">
                            <AssetStatusBadge status={asset.status} />
                          </td>
                          <td className="px-3 py-2 text-slate-200">
                            {asset.location || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <p className="text-xs text-slate-400">
              * Esta demo está pensada para mostrar diseño de dashboards y
              conexión con una base de datos real. En una versión completa se
              añadirían roles, edición de activos, escáner QR, etc.
            </p>
          </section>

          {/* GRÁFICA */}
          <section>
            <AssetsByCategoryChart assets={assets} />
          </section>

          {/* ACERCA DE ESTA DEMO / STACK TÉCNICO */}
          <section className="bg-slate-900/80 border-[3px] border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-xl shadow-black/40 grid gap-4 md:grid-cols-[2fr_1.2fr]">
            {/* Descripción */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-300" />
                Acerca de esta demo
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                <span className="font-semibold text-slate-50">
                  Canary Assets
                </span>{" "}
                es una demo pública de un sistema de inventario de activos
                informáticos. Está pensada para mostrar tu capacidad para
                diseñar e implementar dashboards modernos conectados a una base
                de datos en la nube.
              </p>
              <p className="text-xs text-slate-500">
                Esta versión es de solo lectura: los datos se cargan desde una
                vista pública de Supabase y se presentan en diferentes
                componentes visuales (métricas, tabla, gráficas, ficha de
                detalle, etc.).
              </p>
            </div>

            {/* Stack / links */}
            <div className="space-y-3 text-sm">
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Stack técnico
              </h3>
              <ul className="space-y-1.5 text-[12px] text-slate-300">
                <li className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Frontend con React + Vite + Tailwind CSS.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-emerald-300" />
                  <span>
                    Datos en Supabase (vista pública{" "}
                    <code>assets_public</code>).
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Despliegue en Vercel como demo pública.</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <p className="text-[11px] text-slate-500">
                  Este proyecto es un ejemplo que muestra como se puede conectar una base de datos en la nube a un frontend con React y Tailwind CSS.
                  (inventario de activos, reservas, etc.).
                </p>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-700 bg-slate-950/60 text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Ver código (GitHub)
                  </a>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-slate-800 bg-slate-950/60 text-slate-400">
                    Demo construida por{" "}
                    <span className="font-medium text-slate-200 ml-1">
                      Richard Díaz
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

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

function StatCard({ label, value, hint, accent }) {
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

function QuickActionCard({ title, description, icon: Icon, onClick }) {
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

export default App;
