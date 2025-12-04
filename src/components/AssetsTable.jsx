import { Link } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react";
import AssetStatusBadge from "./AssetStatusBadge";

export default function AssetsTable({
  assets,
  loading,
  isAdmin,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="py-10 text-center text-slate-400 text-sm">
        Cargando inventario demo...
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="py-10 text-center text-slate-500 text-sm">
        No hay activos que coincidan con los filtros actuales.
      </div>
    );
  }

  return (
    <div className="rounded-xl border-[2px] border-slate-200 dark:border-slate-700/60 overflow-hidden bg-white/70 dark:bg-slate-950/40">
      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full text-xs md:text-sm">
          <thead className="bg-slate-100 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase text-slate-600 dark:text-slate-400">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Código</th>
              <th className="px-3 py-2 text-left font-medium">Nombre</th>
              <th className="px-3 py-2 text-left font-medium">Categoría</th>
              <th className="px-3 py-2 text-left font-medium">Estado</th>
              <th className="px-3 py-2 text-left font-medium">Ubicación</th>
              {isAdmin && (
                <th className="px-3 py-2 text-left font-medium">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, idx) => {
              const isLocal = String(asset.id).startsWith("local-");

              return (
              <tr
                key={asset.id}
                className={`border-b border-slate-200 dark:border-slate-800/80 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/70 transition ${
                  idx % 2 === 0 ? "bg-white dark:bg-slate-950/10" : "bg-slate-50/60 dark:bg-transparent"
                }`}
              >
                <td className="px-3 py-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {asset.code}
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-col">
                    {isLocal ? (
                      <>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {asset.name}
                        </span>
                        <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-emerald-700 dark:text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                          Solo demo (sin detalle)
                        </span>
                      </>
                    ) : (
                      <Link
                        to={`/activo/${asset.id}`}
                        className="font-medium text-slate-900 dark:text-slate-50 hover:underline decoration-emerald-500 dark:decoration-emerald-400"
                      >
                        {asset.name}
                      </Link>
                    )}
                    {asset.description && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {asset.description}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2 text-slate-700 dark:text-slate-200">
                  {asset.category || "—"}
                </td>
                <td className="px-3 py-2">
                  <AssetStatusBadge status={asset.status} />
                </td>
                <td className="px-3 py-2 text-slate-700 dark:text-slate-200">
                  {asset.location || "—"}
                </td>
                {isAdmin && (
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      {isLocal ? (
                        <>
                          <button
                            onClick={() => onEdit(asset)}
                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 transition"
                            title="Editar activo"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDelete(asset)}
                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 transition"
                            title="Eliminar activo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] text-slate-500 dark:text-slate-500">
                          Solo lectura
                        </span>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
}

