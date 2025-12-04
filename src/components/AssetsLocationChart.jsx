import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../contexts/ThemeContext";

export default function AssetsLocationChart({ assets }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
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
      <div className="bg-white/80 dark:bg-slate-900/80 border-[3px] border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-xl shadow-slate-200/50 dark:shadow-black/40">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Top ubicaciones
          </h3>
          <p className="text-[11px] text-slate-600 dark:text-slate-500">
            Las 5 ubicaciones con más activos.
          </p>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400 text-center py-8">
          No hay datos suficientes.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 border-[3px] border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-xl shadow-slate-200/50 dark:shadow-black/40">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Top ubicaciones
        </h3>
        <p className="text-[11px] text-slate-600 dark:text-slate-500">
          Las 5 ubicaciones con más activos.
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1f2937" : "#e2e8f0"} />
            <XAxis type="number" tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 11 }} stroke={isDark ? "#475569" : "#cbd5e1"} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 11 }}
              stroke={isDark ? "#475569" : "#cbd5e1"}
              width={100}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: isDark ? "#020617" : "#f8fafc",
                border: isDark ? "1px solid #1f2937" : "1px solid #e2e8f0",
                borderRadius: "0.75rem",
                fontSize: "11px",
                color: isDark ? "#e5e7eb" : "#0f172a",
                padding: "6px 10px",
              }}
              itemStyle={{ color: isDark ? "#e5e7eb" : "#0f172a" }}
              labelStyle={{ color: isDark ? "#e5e7eb" : "#0f172a" }}
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

