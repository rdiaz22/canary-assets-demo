import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirm({ asset, onConfirm, onCancel, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">
                ¿Eliminar activo?
              </h3>
              <p className="text-sm text-slate-300 mb-1">
                Estás a punto de eliminar el activo:
              </p>
              <p className="text-sm font-medium text-slate-100 mb-4">
                {asset?.name} ({asset?.code})
              </p>
              <p className="text-xs text-slate-400">
                Esta acción no se puede deshacer. El activo será eliminado
                permanentemente.
              </p>
            </div>
            <button
              onClick={onCancel}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-800">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition shadow-lg shadow-rose-500/40"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

