// src/components/AssetStatusBadge.jsx

const statusStyles = {
    disponible: {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      dot: "bg-emerald-500",
      label: "Disponible",
    },
    prestado: {
      bg: "bg-amber-100",
      text: "text-amber-800",
      dot: "bg-amber-500",
      label: "Prestado",
    },
    averiado: {
      bg: "bg-rose-100",
      text: "text-rose-800",
      dot: "bg-rose-500",
      label: "Averiado",
    },
  };
  
  export default function AssetStatusBadge({ status }) {
    const key = status?.toLowerCase() || "desconocido";
    const style = statusStyles[key] || {
      bg: "bg-slate-100",
      text: "text-slate-700",
      dot: "bg-slate-400",
      label: status || "Desconocido",
    };
  
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
        {style.label}
      </span>
    );
  }
  