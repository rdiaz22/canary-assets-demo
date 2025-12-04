import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import AssetStatusBadge from "../components/AssetStatusBadge";
import {
  ArrowLeft,
  QrCode,
  Printer,
  MapPin,
  Tag,
  Info,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function AssetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAsset = async () => {
      const { data, error } = await supabase
        .from("assets_public")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error cargando activo:", error);
      }
      setAsset(data);
      setLoading(false);
    };

    loadAsset();
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const handleShowQr = () => {
    alert(
      "Demo: aquí se mostraría un código QR real apuntando a esta misma URL pública."
    );
  };

  const handlePrint = () => {
    alert("Demo: en la versión completa se generaría una ficha imprimible.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
        <div className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500"
            >
              <ArrowLeft className="w-3 h-3" />
              Volver
            </button>
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/40">
              CA
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                Detalle de activo
              </h1>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Vista individual desde <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">assets_public</code>.
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="text-[11px] text-emerald-600 dark:text-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-200 underline-offset-2 hover:underline"
          >
            Volver al inventario
          </Link>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="w-full flex justify-center px-4 py-8 md:py-10">
        {loading ? (
          <div className="text-slate-600 dark:text-slate-400 text-sm py-16">
            Cargando activo...
          </div>
        ) : !asset ? (
          <div className="text-slate-600 dark:text-slate-400 text-sm py-16">
            No se ha encontrado el activo solicitado.
          </div>
        ) : (
          <div className="w-full max-w-6xl grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* COLUMNA IZQUIERDA */}
            <section className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-2xl shadow-slate-200/50 dark:shadow-black/40 space-y-5">
              {/* Imagen */}
              {asset.image_url ? (
                <div className="relative w-full h-80 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                  <img
                    src={asset.image_url}
                    alt={asset.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 dark:from-slate-950/80 to-transparent px-4 py-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-700 dark:text-slate-200">
                      Imagen del activo
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                      Demo · URL pública
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-80 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center justify-center text-slate-600 dark:text-slate-500 text-sm gap-2">
                  <span>Imagen no disponible</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-500">
                    En una versión completa se mostraría una foto del equipo.
                  </span>
                </div>
              )}

              {/* Info principal */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-500 uppercase mb-1">
                    Código
                  </p>
                  <p className="font-mono text-sm text-slate-700 dark:text-slate-300">
                    {asset.code}
                  </p>
                  <h2 className="mt-3 text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50">
                    {asset.name}
                  </h2>
                  {asset.description && (
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {asset.description}
                    </p>
                  )}
                </div>
                <AssetStatusBadge status={asset.status} />
              </div>

              {/* Ficha técnica */}
              <div className="grid gap-4 md:grid-cols-2">
                <DetailField
                  label="Categoría"
                  value={asset.category || "No especificada"}
                  icon={<Tag className="w-3.5 h-3.5" />}
                />
                <DetailField
                  label="Ubicación"
                  value={asset.location || "Sin ubicación asignada"}
                  icon={<MapPin className="w-3.5 h-3.5" />}
                />
                <DetailField
                  label="Estado"
                  value={<AssetStatusBadge status={asset.status} />}
                />
                <DetailField
                  label="ID interno"
                  value={asset.id}
                  mono
                />
              </div>

              {/* Bloque de contexto / uso real */}
              <div className="mt-2 border-t border-slate-200 dark:border-slate-800 pt-4 text-[11px] text-slate-600 dark:text-slate-500 space-y-1.5">
                <p className="font-medium text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Cómo se usaría esta vista en producción
                </p>
                <p>
                  Esta ficha está pensada como ejemplo de detalle de activo en un
                  sistema de inventario real. Desde aquí se podrían:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ver el histórico de movimientos y responsable actual.</li>
                  <li>
                    Consultar información de compra: proveedor, factura, fecha
                    de alta.
                  </li>
                  <li>
                    Programar y revisar tareas de mantenimiento o auditorías.
                  </li>
                </ul>
              </div>
            </section>

            {/* COLUMNA DERECHA */}
            <aside className="space-y-4">
              {/* Acciones rápidas sobre el activo */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl shadow-slate-200/50 dark:shadow-black/40 space-y-3">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-200">
                  Acciones sobre este activo
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleShowQr}
                    className="inline-flex items-center justify-between w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/60 text-xs text-slate-900 dark:text-slate-100 hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-900 transition"
                  >
                    <span className="flex items-center gap-2">
                      <QrCode className="w-4 h-4" />
                      Ver código QR (demo)
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-500">
                      Enlaza a esta ficha
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center justify-between w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/40 text-xs text-slate-900 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                  >
                    <span className="flex items-center gap-2">
                      <Printer className="w-4 h-4" />
                      Imprimir ficha (demo)
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-500">
                      Etiqueta / informe
                    </span>
                  </button>

                  <Link
                    to="/"
                    className="inline-flex items-center justify-center w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition"
                  >
                    Volver al inventario
                  </Link>
                </div>
              </div>

              {/* Resumen compacto */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl shadow-slate-200/50 dark:shadow-black/40 space-y-3">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-200">
                  Resumen del activo
                </p>
                <InfoRow label="Código" value={asset.code} mono />
                <InfoRow
                  label="Categoría"
                  value={asset.category || "No especificada"}
                />
                <InfoRow
                  label="Ubicación"
                  value={asset.location || "Sin ubicación asignada"}
                />
                <InfoRow
                  label="Estado"
                  value={<AssetStatusBadge status={asset.status} />}
                />
                <p className="text-[11px] text-slate-600 dark:text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
                  Este panel lateral está pensado para consultas rápidas, por
                  ejemplo al escanear un QR en almacén o en una etiqueta física.
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

function DetailField({ label, value, mono, icon }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-slate-600 dark:text-slate-500 uppercase flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      {typeof value === "string" ? (
        <p
          className={`text-sm text-slate-700 dark:text-slate-200 ${
            mono ? "font-mono break-all" : ""
          }`}
        >
          {value}
        </p>
      ) : (
        value
      )}
    </div>
  );
}

function InfoRow({ label, value, mono }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase text-slate-600 dark:text-slate-500">{label}</span>
      {typeof value === "string" ? (
        <span
          className={`text-xs text-slate-700 dark:text-slate-200 ${
            mono ? "font-mono break-all" : ""
          }`}
        >
          {value}
        </span>
      ) : (
        value
      )}
    </div>
  );
}
