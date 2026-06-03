import { useApp } from "../context/AppContext";
import Header from "../components/Header";
import { mockRevenueData, mockPipelineData, stageConfig } from "../data/mockData";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from "recharts";
import { TrendingUp, Users, Briefcase, DollarSign, ArrowUpRight, Flame, Snowflake, Sparkles } from "lucide-react";

const fmt = (n) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

function StatCard({ icon: Icon, label, value, change, color }) {
  return (
    <div className="stat-card animate-in">
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        {change && (
          <span className="flex items-center gap-1 text-xs text-green-400 font-mono">
            <ArrowUpRight size={12} /> {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-display font-700 text-ink-100">{value}</p>
        <p className="text-xs text-ink-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card px-3 py-2 text-xs shadow-xl">
      <p className="font-mono text-ink-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-acid font-500">{fmt(p.value)}</p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { contacts, deals, activities } = useApp();

  const totalPipeline = deals
    .filter(d => !["ganado","perdido"].includes(d.stage))
    .reduce((s, d) => s + d.value, 0);

  const wonDeals = deals.filter(d => d.stage === "ganado").reduce((s, d) => s + d.value, 0);
  const pending = activities.filter(a => !a.done).length;

  const hotContacts = contacts.filter(c => c.status === "hot");
  const recentContacts = [...contacts].slice(0, 5);

  return (
    <div className="animate-in-slow">
      <Header
        title="Dashboard"
        subtitle={`Hoy, ${new Date().toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })}`}
      />

      <div className="pt-16 p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={DollarSign} label="Pipeline activo" value={fmt(totalPipeline)} change="+18%" color="bg-acid/15 text-acid" />
          <StatCard icon={TrendingUp} label="Ingresos cerrados" value={fmt(wonDeals)} change="+12%" color="bg-green-500/15 text-green-400" />
          <StatCard icon={Users} label="Contactos totales" value={contacts.length} color="bg-sky/15 text-sky" />
          <StatCard icon={Briefcase} label="Actividades pendientes" value={pending} color="bg-coral/15 text-coral" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revenue chart */}
          <div className="card p-5 lg:col-span-2 animate-in">
            <h3 className="font-display font-600 text-ink-200 mb-4">Ingresos mensuales</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c8ff00" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#c8ff00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a37" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#696982", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#696982", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#c8ff00" strokeWidth={2} fill="url(#rev)" dot={{ fill: "#c8ff00", r: 3, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pipeline */}
          <div className="card p-5 animate-in">
            <h3 className="font-display font-600 text-ink-200 mb-4">Pipeline por etapa</h3>
            <div className="space-y-3">
              {mockPipelineData.map((d) => {
                const pct = Math.round((d.value / 350000) * 100);
                return (
                  <div key={d.stage}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-ink-400">{d.stage}</span>
                      <span className="font-mono text-ink-300">{fmt(d.value)}</span>
                    </div>
                    <div className="h-1.5 bg-ink-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-acid rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Hot contacts */}
          <div className="card p-5 animate-in">
            <div className="flex items-center gap-2 mb-4">
              <Flame size={16} className="text-coral" />
              <h3 className="font-display font-600 text-ink-200">Contactos activos</h3>
            </div>
            <div className="space-y-3">
              {hotContacts.map(c => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-coral/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-mono font-500 text-coral">{c.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink-200 font-500 truncate">{c.name}</p>
                    <p className="text-xs text-ink-500 truncate">{c.company}</p>
                  </div>
                  <span className="text-xs font-mono text-acid">{fmt(c.value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming activities */}
          <div className="card p-5 animate-in">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-acid" />
              <h3 className="font-display font-600 text-ink-200">Próximas actividades</h3>
            </div>
            <div className="space-y-3">
              {activities.filter(a => !a.done).slice(0, 4).map(a => (
                <div key={a.id} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-acid mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink-200 truncate">{a.title}</p>
                    <p className="text-xs text-ink-500">{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
