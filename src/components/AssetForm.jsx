import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";

const CATEGORIES = [
  "Laptop",
  "Monitor",
  "Tablet",
  "Impresora",
  "Router",
  "Servidor",
  "Otro",
];

const STATUSES = [
  { value: "disponible", label: "Disponible" },
  { value: "prestado", label: "Prestado" },
  { value: "averiado", label: "Averiado" },
];

export default function AssetForm({ asset, onSave, onClose, isOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    category: "",
    status: "disponible",
    location: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name || "",
        code: asset.code || "",
        category: asset.category || "",
        status: asset.status || "disponible",
        location: asset.location || "",
        description: asset.description || "",
      });
    } else {
      setFormData({
        name: "",
        code: "",
        category: "",
        status: "disponible",
        location: "",
        description: "",
      });
    }
    setErrors({});
  }, [asset, isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.code.trim()) {
      newErrors.code = "El código es obligatorio";
    }

    if (!formData.category) {
      newErrors.category = "La categoría es obligatoria";
    }

    if (!formData.status) {
      newErrors.status = "El estado es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSaving(true);

    // Simular delay de guardado
    setTimeout(() => {
      const assetData = {
        ...formData,
        id: asset?.id || `local-${Date.now()}`,
        created_at: asset?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      onSave(assetData);
      setSaving(false);
    }, 500);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              {asset ? "Editar activo" : "Registrar nuevo activo"}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {asset
                ? "Modifica la información del activo"
                : "Completa el formulario para registrar un nuevo equipo"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nombre del activo <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ej: Dell Latitude 5520"
                className={`w-full bg-slate-950/60 border rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition ${
                  errors.name
                    ? "border-rose-500 focus:ring-rose-500/60"
                    : "border-slate-700 focus:ring-emerald-500/60 focus:border-emerald-500/60"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-rose-400">{errors.name}</p>
              )}
            </div>

            {/* Código */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Código único <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => handleChange("code", e.target.value)}
                placeholder="Ej: MD-LAPTOP-001"
                className={`w-full bg-slate-950/60 border rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition font-mono ${
                  errors.code
                    ? "border-rose-500 focus:ring-rose-500/60"
                    : "border-slate-700 focus:ring-emerald-500/60 focus:border-emerald-500/60"
                }`}
              />
              {errors.code && (
                <p className="mt-1 text-xs text-rose-400">{errors.code}</p>
              )}
            </div>

            {/* Categoría y Estado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Categoría <span className="text-rose-400">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className={`w-full bg-slate-950/60 border rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 transition ${
                    errors.category
                      ? "border-rose-500 focus:ring-rose-500/60"
                      : "border-slate-700 focus:ring-emerald-500/60 focus:border-emerald-500/60"
                  }`}
                >
                  <option value="">Selecciona una categoría</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-rose-400">
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Estado <span className="text-rose-400">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className={`w-full bg-slate-950/60 border rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 transition ${
                    errors.status
                      ? "border-rose-500 focus:ring-rose-500/60"
                      : "border-slate-700 focus:ring-emerald-500/60 focus:border-emerald-500/60"
                  }`}
                >
                  {STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="mt-1 text-xs text-rose-400">{errors.status}</p>
                )}
              </div>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Ej: Oficina 201, Almacén central"
                className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 transition"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Descripción detallada del activo..."
                rows={4}
                className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 transition resize-none"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={saving}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-slate-950 font-semibold rounded-lg hover:from-emerald-400 hover:to-sky-400 transition shadow-lg shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {asset ? "Guardar cambios" : "Registrar activo"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

