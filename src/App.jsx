import { useEffect, useState, useMemo, useRef, useCallback, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Database, Globe2, Github } from "lucide-react";
import { useAuth } from "./contexts/AuthContext";
import { supabase } from "./lib/supabaseClient";
import Sidebar from "./components/Sidebar";
import AppHeader from "./components/AppHeader";
import StatsSection from "./components/StatsSection";
import QuickActionsSection from "./components/QuickActionsSection";
import InventorySection from "./components/InventorySection";
import AssetForm from "./components/AssetForm";
import DeleteConfirm from "./components/DeleteConfirm";
import CommandPalette from "./components/CommandPalette";

// Lazy load del componente de gráficos para code splitting
const AssetsByCategoryChart = lazy(() => import("./components/AssetsByCategoryChart.jsx"));
const AssetsStatusChart = lazy(() => import("./components/AssetsStatusChart.jsx"));
const AssetsLocationChart = lazy(() => import("./components/AssetsLocationChart.jsx"));

// Límite de activos temporales para evitar problemas de rendimiento
const MAX_LOCAL_ASSETS = 5;

function App() {
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [localAssets, setLocalAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [commandOpen, setCommandOpen] = useState(false);

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
    if (localAssets.length >= MAX_LOCAL_ASSETS) {
      setTimeout(() => {
        alert(
          `Límite alcanzado: Solo puedes crear hasta ${MAX_LOCAL_ASSETS} activos temporales en esta demo. Elimina algunos para crear nuevos.`
        );
      }, 0);
      return;
    }
    setEditingAsset(null);
    setFormOpen(true);
  }, [localAssets.length]);

  const handleEditAsset = useCallback((asset) => {
    setEditingAsset(asset);
    setFormOpen(true);
  }, []);

  const handleDeleteAsset = useCallback((asset) => {
    setDeleteConfirm(asset);
  }, []);

  const handleSaveAsset = useCallback((assetData) => {
    if (editingAsset) {
      // Actualizar activo existente
      setLocalAssets((prev) =>
        prev.map((a) => (a.id === assetData.id ? assetData : a))
      );
    } else {
      // Crear nuevo activo (validar límite)
      if (localAssets.length >= MAX_LOCAL_ASSETS) {
        setTimeout(() => {
          alert(
            `Límite alcanzado: Solo puedes crear hasta ${MAX_LOCAL_ASSETS} activos temporales en esta demo. Elimina algunos para crear nuevos.`
          );
        }, 0);
        return;
      }
      setLocalAssets((prev) => [...prev, assetData]);
    }
    setFormOpen(false);
    setEditingAsset(null);
  }, [editingAsset, localAssets.length]);

  const handleConfirmDelete = useCallback(() => {
    if (deleteConfirm) {
      setLocalAssets((prev) =>
        prev.filter((a) => a.id !== deleteConfirm.id)
      );
      setDeleteConfirm(null);
    }
  }, [deleteConfirm]);

  // Persistir activos locales en localStorage para que no se pierdan al volver
  useEffect(() => {
    try {
      const stored = localStorage.getItem("canary_assets_local");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setLocalAssets(parsed);
        }
      }
    } catch (e) {
      console.error("Error leyendo activos locales desde localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("canary_assets_local", JSON.stringify(localAssets));
    } catch (e) {
      console.error("Error guardando activos locales en localStorage", e);
    }
  }, [localAssets]);

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

  const handleOpenCommand = useCallback(() => {
    setCommandOpen(true);
  }, []);

  const handleCloseCommand = useCallback(() => {
    setCommandOpen(false);
  }, []);

  const handleSelectAssetFromCommand = useCallback(
    (asset) => {
      if (asset.id && !String(asset.id).startsWith("local-")) {
        navigate(`/activo/${asset.id}`);
      } else {
        // Para activos locales, hacemos scroll al inventario
        scrollToInventory();
      }
      setCommandOpen(false);
    },
    [navigate, scrollToInventory]
  );
  
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

  // Atajo de teclado global Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      if (
        (isMac ? e.metaKey : e.ctrlKey) &&
        (e.key === "k" || e.key === "K")
      ) {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Combinar activos de Supabase con activos locales
  const allAssets = useMemo(() => {
    return [...assets, ...localAssets];
  }, [assets, localAssets]);

  const filteredAssets = useMemo(() => {
    return allAssets.filter((asset) => {
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
  }, [allAssets, search, statusFilter]);

  const stats = useMemo(() => {
    const total = allAssets.length;
    const disponibles = allAssets.filter(
      (a) => a.status?.toLowerCase() === "disponible"
    ).length;
    const prestados = allAssets.filter(
      (a) => a.status?.toLowerCase() === "prestado"
    ).length;
    const averiados = allAssets.filter(
      (a) => a.status?.toLowerCase() === "averiado"
    ).length;

    return { total, disponibles, prestados, averiados };
  }, [allAssets]);

  const handleExportCSV = useCallback(() => {
    const headers = ["Código", "Nombre", "Categoría", "Estado", "Ubicación", "Descripción"];
    const rows = filteredAssets.map((asset) => [
      asset.code || "",
      asset.name || "",
      asset.category || "",
      asset.status || "",
      asset.location || "",
      asset.description || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `inventario_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredAssets]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex">
      <Sidebar onLogout={logout} />

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          onOpenCommand={handleOpenCommand}
          onScrollToInventory={scrollToInventory}
          onMaintenanceClick={handleMaintenanceClick}
          isAdmin={isAdmin()}
        />

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

            <StatsSection stats={stats} />
          </section>

          <QuickActionsSection
            isAdmin={isAdmin()}
            onNewAsset={handleNewAssetClick}
            onViewInventory={scrollToInventory}
            onScan={handleScanClick}
            localAssetsCount={localAssets.length}
            maxLocalAssets={MAX_LOCAL_ASSETS}
          />

          <InventorySection
            localAssetsCount={localAssets.length}
            inventoryRef={inventoryRef}
            isAdmin={isAdmin()}
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            filteredAssets={filteredAssets}
            loading={loading}
            onEditAsset={handleEditAsset}
            onDeleteAsset={handleDeleteAsset}
            onExportCSV={handleExportCSV}
          />

          {/* GRÁFICAS */}
          <section className="grid gap-4 md:grid-cols-2">
            <Suspense
              fallback={
                <div className="bg-slate-900/80 border-[3px] border-slate-700/60 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
                  <div className="text-center">
                    <div className="relative w-12 h-12 mx-auto mb-3">
                      <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin" />
                    </div>
                    <p className="text-sm text-slate-400">Cargando gráfica...</p>
                  </div>
                </div>
              }
            >
              <AssetsByCategoryChart assets={allAssets} />
            </Suspense>
            <Suspense
              fallback={
                <div className="bg-slate-900/80 border-[3px] border-slate-700/60 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
                  <div className="text-center">
                    <div className="relative w-12 h-12 mx-auto mb-3">
                      <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin" />
                    </div>
                    <p className="text-sm text-slate-400">Cargando gráfica...</p>
                  </div>
                </div>
              }
            >
              <AssetsStatusChart assets={allAssets} />
            </Suspense>
          </section>

          {/* Gráfica de ubicaciones */}
          <section>
            <Suspense
              fallback={
                <div className="bg-slate-900/80 border-[3px] border-slate-700/60 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
                  <div className="text-center">
                    <div className="relative w-12 h-12 mx-auto mb-3">
                      <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin" />
                    </div>
                    <p className="text-sm text-slate-400">Cargando gráfica...</p>
                  </div>
            </div>
              }
            >
              <AssetsLocationChart assets={allAssets} />
            </Suspense>
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

      {/* Modales */}
      <AssetForm
        asset={editingAsset}
        onSave={handleSaveAsset}
        onClose={() => {
          setFormOpen(false);
          setEditingAsset(null);
        }}
        isOpen={formOpen}
      />

      <DeleteConfirm
        asset={deleteConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm(null)}
        isOpen={!!deleteConfirm}
      />

      <CommandPalette
        isOpen={commandOpen}
        onClose={handleCloseCommand}
        assets={allAssets}
        onSelectAsset={handleSelectAssetFromCommand}
        onGoToInventory={scrollToInventory}
      />
    </div>
  );
}

export default App;
