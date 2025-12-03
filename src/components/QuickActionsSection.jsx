import { Plus, ClipboardList, Scan } from "lucide-react";
import QuickActionCard from "./QuickActionCard";

export default function QuickActionsSection({
  isAdmin,
  onNewAsset,
  onViewInventory,
  onScan,
  localAssetsCount = 0,
  maxLocalAssets = 5,
}) {
  const isLimitReached = localAssetsCount >= maxLocalAssets;
  
  return (
    <section className="grid gap-3 md:grid-cols-3">
      {isAdmin && (
        <QuickActionCard
          title="Registrar nuevo activo"
          description={
            isLimitReached
              ? `Límite alcanzado (${localAssetsCount}/${maxLocalAssets}). Elimina algunos activos temporales para crear nuevos.`
              : `En una versión completa podrías crear y dar de alta nuevos equipos. (${localAssetsCount}/${maxLocalAssets} temporales)`
          }
          icon={Plus}
          onClick={onNewAsset}
          disabled={isLimitReached}
        />
      )}
      <QuickActionCard
        title="Ver inventario"
        description="Ir directamente a la tabla de activos registrados."
        icon={ClipboardList}
        onClick={onViewInventory}
      />
      {isAdmin && (
        <QuickActionCard
          title="Escanear activo (demo)"
          description="Simulación de acceso al módulo de escaneo con cámara y códigos."
          icon={Scan}
          onClick={onScan}
        />
      )}
    </section>
  );
}

