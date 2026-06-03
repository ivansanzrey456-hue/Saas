// Mock data for the CRM SaaS

export const mockContacts = [
  { id: 1, name: "Ana García", email: "ana@techflow.mx", phone: "+52 55 1234-5678", company: "TechFlow MX", role: "CEO", status: "hot", value: 85000, lastContact: "2026-05-20", avatar: "AG", tags: ["Enterprise", "Prioridad"] },
  { id: 2, name: "Carlos Mendoza", email: "cmendoza@innova.com", phone: "+52 33 9876-5432", company: "Innova Corp", role: "CTO", status: "new", value: 42000, lastContact: "2026-05-22", avatar: "CM", tags: ["Startup"] },
  { id: 3, name: "Sofía Ramírez", email: "sofia@glosystems.io", phone: "+52 81 5555-0001", company: "Glo Systems", role: "Directora de Operaciones", status: "cold", value: 28000, lastContact: "2026-04-15", avatar: "SR", tags: ["PYME"] },
  { id: 4, name: "Luis Herrera", email: "lherrera@nexapay.com", phone: "+52 55 8888-2222", company: "NexaPay", role: "VP de Ventas", status: "hot", value: 120000, lastContact: "2026-05-24", avatar: "LH", tags: ["Enterprise", "Fintech"] },
  { id: 5, name: "Valentina Torres", email: "vtorres@buildco.mx", phone: "+52 55 3344-5566", company: "BuildCo MX", role: "Gerente de Compras", status: "new", value: 15000, lastContact: "2026-05-25", avatar: "VT", tags: ["PYME"] },
  { id: 6, name: "Roberto Solis", email: "rsolis@databridge.ai", phone: "+52 33 7777-3333", company: "DataBridge AI", role: "Fundador", status: "hot", value: 65000, lastContact: "2026-05-21", avatar: "RS", tags: ["Startup", "IA"] },
  { id: 7, name: "Mariana Vega", email: "mvega@cloudlab.mx", phone: "+52 81 4444-8888", company: "CloudLab", role: "Product Manager", status: "cold", value: 9000, lastContact: "2026-03-30", avatar: "MV", tags: ["SaaS"] },
  { id: 8, name: "Javier Castillo", email: "jcastillo@redstone.mx", phone: "+52 55 2233-7799", company: "Redstone MX", role: "Director General", status: "new", value: 55000, lastContact: "2026-05-23", avatar: "JC", tags: ["Enterprise"] },
];

export const mockDeals = [
  { id: 1, title: "Licencia Enterprise — TechFlow", contact: "Ana García", company: "TechFlow MX", value: 85000, stage: "negociacion", probability: 75, closeDate: "2026-06-15", owner: "Tú" },
  { id: 2, title: "Plan Pro Anual — NexaPay", contact: "Luis Herrera", company: "NexaPay", value: 120000, stage: "propuesta", probability: 60, closeDate: "2026-06-30", owner: "Tú" },
  { id: 3, title: "Integración API — DataBridge", contact: "Roberto Solis", company: "DataBridge AI", value: 65000, stage: "discovery", probability: 40, closeDate: "2026-07-10", owner: "Tú" },
  { id: 4, title: "CRM Básico — Innova Corp", contact: "Carlos Mendoza", company: "Innova Corp", value: 42000, stage: "ganado", probability: 100, closeDate: "2026-05-10", owner: "Tú" },
  { id: 5, title: "Soporte Premium — BuildCo", contact: "Valentina Torres", company: "BuildCo MX", value: 15000, stage: "discovery", probability: 30, closeDate: "2026-07-20", owner: "Tú" },
  { id: 6, title: "Renovación — CloudLab", contact: "Mariana Vega", company: "CloudLab", value: 9000, stage: "perdido", probability: 0, closeDate: "2026-04-01", owner: "Tú" },
  { id: 7, title: "Expansión Modular — Redstone", contact: "Javier Castillo", company: "Redstone MX", value: 55000, stage: "propuesta", probability: 55, closeDate: "2026-07-05", owner: "Tú" },
  { id: 8, title: "Piloto 3 meses — Glo Systems", contact: "Sofía Ramírez", company: "Glo Systems", value: 8000, stage: "negociacion", probability: 65, closeDate: "2026-06-20", owner: "Tú" },
];

export const mockActivities = [
  { id: 1, type: "call", title: "Llamada de seguimiento con Ana García", contact: "Ana García", date: "2026-05-26 10:00", done: false, notes: "Revisar propuesta actualizada" },
  { id: 2, type: "email", title: "Enviar propuesta a NexaPay", contact: "Luis Herrera", date: "2026-05-26 14:00", done: false, notes: "Incluir descuento por volumen" },
  { id: 3, type: "meeting", title: "Demo con DataBridge AI", contact: "Roberto Solis", date: "2026-05-27 11:00", done: false, notes: "Preparar caso de uso en IA" },
  { id: 4, type: "call", title: "Onboarding Innova Corp", contact: "Carlos Mendoza", date: "2026-05-24 09:00", done: true, notes: "Accesos entregados" },
  { id: 5, type: "email", title: "Propuesta enviada a Redstone MX", contact: "Javier Castillo", date: "2026-05-23 15:30", done: true, notes: "" },
  { id: 6, type: "meeting", title: "Reunión inicial — BuildCo", contact: "Valentina Torres", date: "2026-05-28 16:00", done: false, notes: "Primer contacto, calificar" },
];

export const mockRevenueData = [
  { month: "Ene", revenue: 28000, deals: 3 },
  { month: "Feb", revenue: 34000, deals: 4 },
  { month: "Mar", revenue: 29000, deals: 3 },
  { month: "Abr", revenue: 51000, deals: 6 },
  { month: "May", revenue: 67000, deals: 7 },
  { month: "Jun", revenue: 0, deals: 0 },
];

export const mockPipelineData = [
  { stage: "Discovery", value: 80000, count: 2 },
  { stage: "Propuesta", value: 175000, count: 2 },
  { stage: "Negociación", value: 93000, count: 2 },
  { stage: "Ganado", value: 42000, count: 1 },
];

export const stageConfig = {
  discovery:    { label: "Discovery",    color: "text-sky",   bg: "bg-sky/10",   border: "border-sky/30" },
  propuesta:    { label: "Propuesta",    color: "text-acid",  bg: "bg-acid/10",  border: "border-acid/30" },
  negociacion:  { label: "Negociación",  color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30" },
  ganado:       { label: "Ganado",       color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30" },
  perdido:      { label: "Perdido",      color: "text-ink-500", bg: "bg-ink-800", border: "border-ink-700" },
};

export const statusConfig = {
  hot:  { label: "Activo",  className: "tag-hot" },
  new:  { label: "Nuevo",   className: "tag-new" },
  cold: { label: "Frío",    className: "tag-cold" },
};
