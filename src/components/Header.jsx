import { Bell, Search } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Header({ title, subtitle, actions }) {
  const { sidebarOpen, notification } = useApp();

  return (
    <>
      {/* Global notification */}
      {notification && (
        <div
          className={`
            fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-2xl
            font-body text-sm font-500 animate-in
            ${notification.type === "error"
              ? "bg-coral text-white"
              : "bg-acid text-ink-950"
            }
          `}
        >
          {notification.msg}
        </div>
      )}

      <header
        className={`
          fixed top-0 right-0 z-20 h-16
          flex items-center justify-between gap-4
          px-6 border-b border-ink-800 bg-ink-950/80 backdrop-blur
          transition-all duration-300
          ${sidebarOpen ? "left-56" : "left-16"}
        `}
      >
        <div className="min-w-0">
          <h1 className="font-display font-700 text-ink-100 text-xl truncate">{title}</h1>
          {subtitle && <p className="text-xs text-ink-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {actions}
          <button className="nav-item p-2">
            <Bell size={18} />
          </button>
          <div className="w-8 h-8 rounded-lg bg-acid/20 border border-acid/30 flex items-center justify-center">
            <span className="font-mono text-xs text-acid font-500">TU</span>
          </div>
        </div>
      </header>
    </>
  );
}
