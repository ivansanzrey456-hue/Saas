import { useApp } from "../context/AppContext";
import Header from "../components/Header";
import { mockRevenueData, stageConfig } from "../data/mockData";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend
} from "recharts";

const fmt = (n) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
const COLORS = ["#00c8ff","#c8ff00","#fb923c","#4ade80","#696982"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card px-3 py-2 text-xs shadow-xl">
      <p className="font-mono text-ink-400 mb-1">{label}</p>
      {payload.map(p => <p key={p.name} style={{color:p.color}} className="font-500">{typeof p.value === "number" && p.value > 1000 ? fmt(p.value) : p.value}</p>)}
    </div>
  );
};

export default function Reports() {
  const { contacts, deals } = useApp();

  // Data by stage
  const byStage = Object.entries(stageConfig).map(([key, cfg]) => ({
    name: cfg.label,
    value: deals.filter(d=>d.stage===key).reduce((s,d)=>s+d.value,0),
    count: deals.filter(d=>d.stage===key).length,
  })).filter(s=>s.count>0);

  // Contacts by status
  const byStatus = [
    { name: "Activo", value: contacts.filter(c=>c.status==="hot").length },
    { name: "Nuevo",  value: contacts.filter(c=>c.status==="new").length },
    { name: "Frío",   value: contacts.filter(c=>c.status==="cold").length },
  ];

  // Win rate
  const closedDeals = deals.filter(d=>["ganado","perdido"].includes(d.stage));
  const wonDeals = deals.filter(d=>d.stage==="ganado");
  const winRate = closedDeals.length ? Math.round((wonDeals.length/closedDeals.length)*100) : 0;
  const avgDealSize = wonDeals.length ? Math.round(wonDeals.reduce((s,d)=>s+d.value,0)/wonDeals.length) : 0;

  return (
    <div className="animate-in-slow">
      <Header title="Reportes" subtitle="Análisis del pipeline y actividad comercial" />

      <div className="pt-16 p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Tasa de cierre", value: `${winRate}%` },
            { label: "Trato promedio", value: fmt(avgDealSize) },
            { label: "Tratos totales", value: deals.length },
            { label: "Contactos totales", value: contacts.length },
          ].map(kpi => (
            <div key={kpi.label} className="stat-card animate-in">
              <p className="text-2xl font-display font-700 text-acid">{kpi.value}</p>
              <p className="text-xs text-ink-500">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Revenue chart */}
        <div className="card p-5 animate-in">
          <h3 className="font-display font-600 text-ink-200 mb-4">Ingresos mensuales (MXN)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockRevenueData}>
              <defs>
                <linearGradient id="r2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c8ff00" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#c8ff00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a37"/>
              <XAxis dataKey="month" tick={{fontSize:11,fill:"#696982",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:"#696982",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area type="monotone" dataKey="revenue" stroke="#c8ff00" strokeWidth={2} fill="url(#r2)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pipeline by stage bar */}
          <div className="card p-5 animate-in">
            <h3 className="font-display font-600 text-ink-200 mb-4">Valor por etapa</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={byStage} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a37" horizontal={false}/>
                <XAxis type="number" tick={{fontSize:10,fill:"#696982",fontFamily:"JetBrains Mono"}} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false}/>
                <YAxis dataKey="name" type="category" tick={{fontSize:11,fill:"#a5a5b4"}} axisLine={false} tickLine={false} width={80}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="value" radius={[0,6,6,0]}>
                  {byStage.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Contacts by status pie */}
          <div className="card p-5 animate-in">
            <h3 className="font-display font-600 text-ink-200 mb-4">Contactos por estado</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={byStatus} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" label={({name,value})=>`${name}: ${value}`} labelLine={false}>
                  {byStatus.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                </Pie>
                <Tooltip content={<CustomTooltip/>}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
