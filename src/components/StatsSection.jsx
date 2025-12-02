import StatCard from "./StatCard";

export default function StatsSection({ stats }) {
  return (
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
  );
}

