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
import { useTheme } from "../contexts/ThemeContext";

const COLORS = {
  disponible: "#34d399",
  prestado: "#fbbf24",
  averiado: "#f97373",
};

export default function AssetsStatusChart({ assets }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
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
    <div className="bg-white/80 dark:bg-slate-900/80 border-[3px] border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-xl shadow-slate-200/50 dark:shadow-black/40">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Activos por estado
        </h3>
        <p className="text-[11px] text-slate-600 dark:text-slate-500">
          Comparativa de activos según su estado actual.
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1f2937" : "#e2e8f0"} />
            <XAxis
              dataKey="name"
              tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 11 }}
              stroke={isDark ? "#475569" : "#cbd5e1"}
            />
            <YAxis
              tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 11 }}
              stroke={isDark ? "#475569" : "#cbd5e1"}
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
            <Legend
              wrapperStyle={{ fontSize: "11px", color: isDark ? "#e5e7eb" : "#0f172a" }}
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

