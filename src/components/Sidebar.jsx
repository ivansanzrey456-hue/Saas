import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, Briefcase, Calendar,
  BarChart2, Settings, ChevronLeft, Zap, Bell
} from "lucide-react";
import { useApp } from "../context/AppContext";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/contacts", label: "Contactos", icon: Users },
  { path: "/deals", label: "Tratos", icon: Briefcase },
  { path: "/activities", label: "Actividades", icon: Calendar },
  { path: "/reports", label: "Reportes", icon: BarChart2 },
];

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useApp();
  const location = useLocation();

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen z-30 flex flex-col
        bg-ink-950 border-r border-ink-800
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "w-56" : "w-16"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-ink-800 gap-3 overflow-hidden">
        <div className="w-8 h-8 rounded-lg bg-acid flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-ink-950" />
        </div>
        {sidebarOpen && (
          <span className="font-display font-800 text-ink-100 text-lg tracking-tight whitespace-nowrap">
            NexCRM
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-1 overflow-hidden">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
          return (
            <Link
              key={path}
              to={path}
              title={!sidebarOpen ? label : undefined}
              className={`nav-item ${active ? "active" : ""} ${!sidebarOpen ? "justify-center px-2" : ""}`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span className="whitespace-nowrap">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-ink-800 flex flex-col gap-1">
        <Link
          to="/settings"
          title={!sidebarOpen ? "Configuración" : undefined}
          className={`nav-item ${location.pathname === "/settings" ? "active" : ""} ${!sidebarOpen ? "justify-center px-2" : ""}`}
        >
          <Settings size={18} className="flex-shrink-0" />
          {sidebarOpen && <span>Configuración</span>}
        </Link>

        {/* Collapse button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`nav-item ${!sidebarOpen ? "justify-center px-2" : "justify-between"}`}
        >
          {sidebarOpen && <span className="text-ink-500 text-xs">Colapsar</span>}
          <ChevronLeft
            size={16}
            className={`text-ink-500 transition-transform duration-300 ${!sidebarOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </aside>
  );
}
