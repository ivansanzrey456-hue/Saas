import { useState } from "react";
import { useApp } from "../context/AppContext";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { stageConfig } from "../data/mockData";
import { Plus, Trash2, Pencil, GripVertical, TrendingUp } from "lucide-react";

const stages = ["discovery", "propuesta", "negociacion", "ganado", "perdido"];
const emptyForm = { title: "", contact: "", company: "", value: "", stage: "discovery", probability: 50, closeDate: "" };

const fmt = (n) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

function KanbanCard({ deal, onEdit, onDelete }) {
  const cfg = stageConfig[deal.stage];
  return (
    <div className="bg-ink-800 border border-ink-700 rounded-xl p-3 space-y-2 hover:border-ink-600 transition-colors duration-150">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-ink-200 font-500 leading-snug">{deal.title}</p>
        <div className="flex gap-0.5 flex-shrink-0">
          <button onClick={() => onEdit(deal)} className="btn-ghost p-1"><Pencil size={12} /></button>
          <button onClick={() => onDelete(deal)} className="btn-ghost p-1 hover:text-coral"><Trash2 size={12} /></button>
        </div>
      </div>
      <p className="text-xs text-ink-500">{deal.company}</p>
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-acid">{fmt(deal.value)}</span>
        <span className="text-xs font-mono text-ink-500">{deal.probability}%</span>
      </div>
      {deal.closeDate && (
        <p className="text-xs text-ink-600">{deal.closeDate}</p>
      )}
    </div>
  );
}

export default function Deals() {
  const { deals, addDeal, updateDeal, deleteDeal, contacts } = useApp();
  const [view, setView] = useState("kanban");
  const [modalOpen, setModalOpen] = useState(false);
  const [editDeal, setEditDeal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openAdd = () => { setEditDeal(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (d) => { setEditDeal(d); setForm({ ...d, value: String(d.value) }); setModalOpen(true); };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    const data = { ...form, value: Number(form.value) || 0, probability: Number(form.probability) };
    if (editDeal) updateDeal(editDeal.id, data);
    else addDeal(data);
    setModalOpen(false);
  };

  const totalPipeline = deals.filter(d => !["perdido"].includes(d.stage)).reduce((s,d)=>s+d.value,0);
  const wonTotal = deals.filter(d => d.stage === "ganado").reduce((s,d)=>s+d.value,0);

  return (
    <div className="animate-in-slow">
      <Header
        title="Tratos"
        subtitle={`Pipeline: ${fmt(totalPipeline)} · Cerrado: ${fmt(wonTotal)}`}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex bg-ink-800 rounded-lg p-0.5">
              {["kanban","lista"].map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-3 py-1 rounded-md text-xs font-mono font-500 transition-colors ${view===v ? "bg-acid text-ink-950" : "text-ink-400"}`}>
                  {v === "kanban" ? "Tablero" : "Lista"}
                </button>
              ))}
            </div>
            <button onClick={openAdd} className="btn-primary flex items-center gap-2">
              <Plus size={16} /> Nuevo
            </button>
          </div>
        }
      />

      <div className="pt-16 p-6">
        {view === "kanban" ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stages.map(stage => {
              const cfg = stageConfig[stage];
              const stageDeals = deals.filter(d => d.stage === stage);
              const stageTotal = stageDeals.reduce((s,d)=>s+d.value,0);
              return (
                <div key={stage} className="flex-shrink-0 w-64">
                  <div className={`flex items-center justify-between mb-3 px-1`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${cfg.bg.replace('/10','')}`} style={{background: stage==='ganado'?'#4ade80':stage==='perdido'?'#696982':stage==='negociacion'?'#fb923c':stage==='propuesta'?'#c8ff00':'#00c8ff'}} />
                      <span className={`text-xs font-mono font-500 ${cfg.color}`}>{cfg.label}</span>
                    </div>
                    <span className="text-xs font-mono text-ink-600">{stageDeals.length}</span>
                  </div>
                  <div className={`min-h-[80px] rounded-xl border ${cfg.border} p-2 space-y-2 ${cfg.bg}`}>
                    {stageDeals.map(d => (
                      <KanbanCard key={d.id} deal={d} onEdit={openEdit} onDelete={setConfirmDelete} />
                    ))}
                    {stageDeals.length === 0 && (
                      <p className="text-center text-xs text-ink-700 py-6">Sin tratos</p>
                    )}
                  </div>
                  {stageDeals.length > 0 && (
                    <p className="text-xs text-right font-mono text-ink-600 mt-1 px-1">{fmt(stageTotal)}</p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-ink-800">
                <tr>
                  <th className="table-head text-left">Trato</th>
                  <th className="table-head text-left hidden md:table-cell">Empresa</th>
                  <th className="table-head text-left">Etapa</th>
                  <th className="table-head text-right">Valor</th>
                  <th className="table-head text-right hidden sm:table-cell">Prob.</th>
                  <th className="table-head text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {deals.map(d => {
                  const cfg = stageConfig[d.stage];
                  return (
                    <tr key={d.id} className="table-row">
                      <td className="table-cell">
                        <p className="font-500 text-ink-100">{d.title}</p>
                        <p className="text-xs text-ink-500">{d.contact}</p>
                      </td>
                      <td className="table-cell hidden md:table-cell text-ink-400">{d.company}</td>
                      <td className="table-cell">
                        <span className={`badge ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                      </td>
                      <td className="table-cell text-right font-mono text-acid">{fmt(d.value)}</td>
                      <td className="table-cell text-right hidden sm:table-cell font-mono text-ink-400">{d.probability}%</td>
                      <td className="table-cell text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(d)} className="btn-ghost p-1.5"><Pencil size={14} /></button>
                          <button onClick={() => setConfirmDelete(d)} className="btn-ghost p-1.5 hover:text-coral"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editDeal ? "Editar trato" : "Nuevo trato"}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs text-ink-500 mb-1">Nombre del trato *</label>
              <input className="input-field w-full" placeholder="Ej. Licencia Enterprise" value={form.title} onChange={e => setForm(p=>({...p,title:e.target.value}))} />
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Contacto</label>
              <input className="input-field w-full" list="contacts-list" placeholder="Nombre del contacto" value={form.contact} onChange={e => setForm(p=>({...p,contact:e.target.value}))} />
              <datalist id="contacts-list">{contacts.map(c=><option key={c.id} value={c.name}/>)}</datalist>
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Empresa</label>
              <input className="input-field w-full" placeholder="Empresa S.A." value={form.company} onChange={e => setForm(p=>({...p,company:e.target.value}))} />
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Valor (MXN)</label>
              <input className="input-field w-full" type="number" placeholder="100000" value={form.value} onChange={e => setForm(p=>({...p,value:e.target.value}))} />
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Probabilidad (%)</label>
              <input className="input-field w-full" type="number" min="0" max="100" value={form.probability} onChange={e => setForm(p=>({...p,probability:e.target.value}))} />
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Etapa</label>
              <select className="input-field w-full" value={form.stage} onChange={e => setForm(p=>({...p,stage:e.target.value}))}>
                {stages.map(s => <option key={s} value={s}>{stageConfig[s].label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Fecha de cierre</label>
              <input className="input-field w-full" type="date" value={form.closeDate} onChange={e => setForm(p=>({...p,closeDate:e.target.value}))} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setModalOpen(false)} className="btn-ghost">Cancelar</button>
            <button onClick={handleSubmit} className="btn-primary">{editDeal ? "Guardar cambios" : "Crear trato"}</button>
          </div>
        </div>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Eliminar trato" width="max-w-sm">
        <p className="text-ink-400 text-sm mb-4">¿Eliminar <span className="text-ink-100 font-500">"{confirmDelete?.title}"</span>?</p>
        <div className="flex justify-end gap-2">
          <button onClick={() => setConfirmDelete(null)} className="btn-ghost">Cancelar</button>
          <button onClick={() => { deleteDeal(confirmDelete.id); setConfirmDelete(null); }} className="px-4 py-2 bg-coral text-white rounded-xl text-sm font-500 hover:bg-coral-dim transition-colors">Eliminar</button>
        </div>
      </Modal>
    </div>
  );
}
