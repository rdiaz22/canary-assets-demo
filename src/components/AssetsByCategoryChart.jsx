// src/components/AssetsByCategoryChart.jsx
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
import { useTheme } from "../contexts/ThemeContext";
  
  const COLORS = [
    "#34d399",
    "#60a5fa",
    "#fbbf24",
    "#f97373",
    "#a855f7",
    "#22c55e",
    "#06b6d4",
  ];
  
  export default function AssetsByCategoryChart({ assets }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    
    // Agrupar por categoría
    const counts = assets.reduce((acc, asset) => {
      const key = asset.category || "Sin categoría";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  
    const data = Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  
    if (!data.length) {
      return (
        <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm text-slate-600 dark:text-slate-400">
          No hay datos suficientes para generar la gráfica.
        </div>
      );
    }

    return (
      <div className="bg-white/80 dark:bg-slate-900/80 border-[3px] border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-xl shadow-slate-200/50 dark:shadow-black/40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Activos por categoría
            </h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-500">
              Distribución de activos según la categoría asignada.
            </p>
          </div>
        </div>
  
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
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
                layout="vertical"
                align="right"
                verticalAlign="middle"
                wrapperStyle={{ fontSize: "11px", color: isDark ? "#e5e7eb" : "#0f172a" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  