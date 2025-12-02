import { Plus, ClipboardList, Scan } from "lucide-react";
import QuickActionCard from "./QuickActionCard";

export default function QuickActionsSection({
  isAdmin,
  onNewAsset,
  onViewInventory,
  onScan,
}) {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      {isAdmin && (
        <QuickActionCard
          title="Registrar nuevo activo"
          description="En una versión completa podrías crear y dar de alta nuevos equipos."
          icon={Plus}
          onClick={onNewAsset}
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

