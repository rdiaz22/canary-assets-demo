import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AssetsLocationChart({ assets }) {
  const locationCounts = assets.reduce((acc, asset) => {
    const location = asset.location || "Sin ubicación";
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(locationCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5 ubicaciones

  if (!data.length) {
    return (
      <div className="bg-slate-900/80 border-[3px] border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-xl shadow-black/40">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-100">
            Top ubicaciones
          </h3>
          <p className="text-[11px] text-slate-500">
            Las 5 ubicaciones con más activos.
          </p>
        </div>
        <div className="text-sm text-slate-400 text-center py-8">
          No hay datos suficientes.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border-[3px] border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-xl shadow-black/40">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-100">
          Top ubicaciones
        </h3>
        <p className="text-[11px] text-slate-500">
          Las 5 ubicaciones con más activos.
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} stroke="#475569" />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              stroke="#475569"
              width={100}
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
            <Bar
              dataKey="value"
              fill="#60a5fa"
              radius={[0, 8, 8, 0]}
              activeBar={{
                fill: "#93c5fd",
                radius: [0, 14, 14, 0],
                stroke: "#3b82f6",
                strokeWidth: 2,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

