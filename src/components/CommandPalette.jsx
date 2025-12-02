import { useEffect, useMemo, useState, useRef } from "react";
import { Command, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export default function CommandPalette({
  isOpen,
  onClose,
  assets,
  onSelectAsset,
  onGoToInventory,
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      // Foco al input cuando se abre
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handler);
    }

    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return assets.slice(0, 8);

    return assets
      .filter((asset) => {
        const text =
          (asset.name || "") +
          " " +
          (asset.code || "") +
          " " +
          (asset.location || "") +
          " " +
          (asset.category || "");
        return text.toLowerCase().includes(q);
      })
      .slice(0, 10);
  }, [assets, query]);

  const handleKeyDown = (e) => {
    if (!filteredAssets.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev + 1 >= filteredAssets.length ? 0 : prev + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev - 1 < 0 ? filteredAssets.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const asset = filteredAssets[activeIndex];
      if (asset) {
        onSelectAsset(asset);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header / input */}
        <div className="border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2 px-4 py-3">
            <Command className="w-4 h-4 text-emerald-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar activo por nombre, código, ubicación..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-0 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none"
            />
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-500">
              <span className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-900/80">
                Ctrl
              </span>
              <span>+</span>
              <span className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-900/80">
                K
              </span>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="max-h-96 overflow-y-auto">
          {/* Comandos rápidos */}
          <div className="px-4 pt-3 pb-2">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500 mb-2">
              Comandos rápidos
            </p>
            <button
              type="button"
              onClick={() => {
                onGoToInventory();
                onClose();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs bg-slate-900/80 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-900 transition"
            >
              <Search className="w-4 h-4 text-emerald-300" />
              <div className="flex-1">
                <p className="text-slate-100">Ir al inventario</p>
                <p className="text-[10px] text-slate-500">
                  Hace scroll hasta la tabla de activos
                </p>
              </div>
            </button>
          </div>

          {/* Resultados de activos */}
          <div className="px-4 pt-2 pb-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                Activos
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-500">
                <ArrowUpDown className="w-3 h-3" />
                Navega con ↑ ↓, Enter para abrir
              </span>
            </div>

            {filteredAssets.length === 0 ? (
              <p className="text-xs text-slate-500 py-3">
                No se encontraron activos para &quot;{query}&quot;.
              </p>
            ) : (
              <ul className="space-y-1 pb-2">
                {filteredAssets.map((asset, index) => (
                  <li key={asset.id}>
                    <button
                      type="button"
                      onClick={() => onSelectAsset(asset)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-xs border ${
                        index === activeIndex
                          ? "bg-slate-800 border-emerald-500/60"
                          : "bg-slate-900/40 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/80"
                      }`}
                    >
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-slate-100 truncate">
                            {asset.name}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            {asset.code}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                          <span>{asset.category || "Sin categoría"}</span>
                          {asset.location && (
                            <>
                              <span>•</span>
                              <span className="truncate">
                                {asset.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {String(asset.id).startsWith("local-") && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/40">
                          Local
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


