// src/components/AssetsByCategoryChart.jsx
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
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
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-sm text-slate-400">
          No hay datos suficientes para generar la gráfica.
        </div>
      );
    }
  
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              Activos por categoría
            </h3>
            <p className="text-[11px] text-slate-500">
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
                    backgroundColor: "#020617",
                    border: "1px solid #1f2937",
                    borderRadius: "0.75rem",
                    fontSize: "11px",
                    color: "#e5e7eb",            // <- texto claro
                    padding: "6px 10px",
                }}
                itemStyle={{ color: "#e5e7eb" }} // <- texto de items claro
                labelStyle={{ color: "#e5e7eb" }} // <- texto del título claro
                />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                wrapperStyle={{ fontSize: "11px", color: "#e5e7eb" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  