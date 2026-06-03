import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ open, onClose, title, children, width = "max-w-lg" }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative z-10 w-full ${width} card shadow-2xl animate-in`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-800">
          <h2 className="font-display font-700 text-ink-100">{title}</h2>
          <button onClick={onClose} className="nav-item p-1.5">
            <X size={16} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
