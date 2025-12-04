import { Search, Download } from "lucide-react";
import AssetsTable from "./AssetsTable";

const STATUS_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "disponible", label: "Disponibles" },
  { value: "prestado", label: "Prestados" },
  { value: "averiado", label: "Averiados" },
];

export default function InventorySection({
  inventoryRef,
  isAdmin,
  search,
  setSearch,
  statusFilter,
  onStatusFilterChange,
  filteredAssets,
  loading,
  onEditAsset,
  onDeleteAsset,
  onExportExcel,
  localAssetsCount = 0,
}) {
  return (
    <section
      ref={inventoryRef}
      className="bg-white/80 dark:bg-slate-900/80 border-[3px] border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-2xl shadow-slate-200/50 dark:shadow-black/40 space-y-4"
    >
      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Inventario de activos
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-500">
            {isAdmin
              ? "Activos desde Supabase (solo lectura) y activos locales (editable)"
              : "Vista de solo lectura desde la vista"}{" "}
            {!isAdmin && (
              <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-[11px] font-mono text-slate-700 dark:text-slate-200">
                assets_public
              </code>
            )}
            .
            {isAdmin && localAssetsCount > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-400/30 text-[10px]">
                {localAssetsCount} temporal{localAssetsCount !== 1 ? "es" : ""}
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre, código o ubicación..."
              className="w-full md:w-64 bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-700 rounded-full px-9 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-500" />
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onStatusFilterChange(opt.value)}
                className={`px-3 py-1 rounded-full text-[11px] border transition
                  ${
                    statusFilter === opt.value
                      ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow shadow-emerald-500/40"
                      : "bg-slate-100 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-emerald-400/70"
                  }`}
              >
                {opt.label}
              </button>
            ))}
            {filteredAssets.length > 0 && (
              <button
                onClick={onExportExcel}
                className="px-3 py-1 rounded-full text-[11px] border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 hover:border-emerald-500 dark:hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-200 transition flex items-center gap-1.5"
                title="Exportar a Excel"
              >
                <Download className="w-3.5 h-3.5" />
                Excel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabla */}
      <AssetsTable
        assets={filteredAssets}
        loading={loading}
        isAdmin={isAdmin}
        onEdit={onEditAsset}
        onDelete={onDeleteAsset}
      />

      <p className="text-xs text-slate-600 dark:text-slate-400">
        * Los activos desde Supabase son de solo lectura. Los activos creados
        localmente pueden ser editados o eliminados por administradores.
      </p>
    </section>
  );
}

