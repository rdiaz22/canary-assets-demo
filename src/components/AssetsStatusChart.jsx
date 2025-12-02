import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  disponible: "#34d399",
  prestado: "#fbbf24",
  averiado: "#f97373",
};

export default function AssetsStatusChart({ assets }) {
  const statusCounts = assets.reduce(
    (acc, asset) => {
      const status = asset.status?.toLowerCase() || "sin estado";
      if (status === "disponible") acc.disponible += 1;
      else if (status === "prestado") acc.prestado += 1;
      else if (status === "averiado") acc.averiado += 1;
      return acc;
    },
    { disponible: 0, prestado: 0, averiado: 0 }
  );

  const data = [
    { name: "Disponibles", value: statusCounts.disponible, color: COLORS.disponible },
    { name: "Prestados", value: statusCounts.prestado, color: COLORS.prestado },
    { name: "Averiados", value: statusCounts.averiado, color: COLORS.averiado },
  ];

  return (
    <div className="bg-slate-900/80 border-[3px] border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-xl shadow-black/40">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-100">
          Activos por estado
        </h3>
        <p className="text-[11px] text-slate-500">
          Comparativa de activos según su estado actual.
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              stroke="#475569"
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              stroke="#475569"
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #1f2937",
                borderRadius: "0.75rem",
                fontSize: "11px",
                color: "#e5e7eb",
                padding: "6px 10px",
              }}
              itemStyle={{ color: "#e5e7eb" }}
              labelStyle={{ color: "#e5e7eb" }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", color: "#e5e7eb" }}
            />
            <Bar
              dataKey="value"
              fill="#34d399"
              radius={[8, 8, 0, 0]}
              activeBar={{
                fill: "#4ade80",
                radius: [14, 14, 0, 0],
                stroke: "#22c55e",
                strokeWidth: 2,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

