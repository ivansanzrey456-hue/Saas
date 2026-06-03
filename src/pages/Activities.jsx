import { useState } from "react";
import { useApp } from "../context/AppContext";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { Phone, Mail, Users, Plus, Check, Trash2, Clock } from "lucide-react";

const typeConfig = {
  call:    { label: "Llamada",  icon: Phone, color: "text-sky",  bg: "bg-sky/10" },
  email:   { label: "Email",    icon: Mail,  color: "text-acid", bg: "bg-acid/10" },
  meeting: { label: "Reunión",  icon: Users, color: "text-coral",bg: "bg-coral/10" },
};

const emptyForm = { type: "call", title: "", contact: "", date: "", notes: "" };

export default function Activities() {
  const { activities, addActivity, toggleActivity, deleteActivity, contacts } = useApp();
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    addActivity(form);
    setModalOpen(false);
    setForm(emptyForm);
  };

  const filtered = activities.filter(a => {
    if (filter === "pending") return !a.done;
    if (filter === "done") return a.done;
    return true;
  });

  const pending = activities.filter(a => !a.done).length;
  const done = activities.filter(a => a.done).length;

  return (
    <div className="animate-in-slow">
      <Header
        title="Actividades"
        subtitle={`${pending} pendientes · ${done} completadas`}
        actions={
          <button onClick={() => { setForm(emptyForm); setModalOpen(true); }} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Nueva
          </button>
        }
      />

      <div className="pt-16 p-6 space-y-4">
        {/* Filters */}
        <div className="flex gap-1">
          {["all","pending","done"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-500 transition-colors duration-150 ${filter===f ? "bg-acid text-ink-950" : "bg-ink-800 text-ink-400 hover:text-ink-200"}`}>
              {f==="all"?"Todas":f==="pending"?"Pendientes":"Completadas"}
            </button>
          ))}
        </div>

        {/* Activity list */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="card p-10 text-center text-ink-500 text-sm">Sin actividades</div>
          )}
          {filtered.map(a => {
            const tc = typeConfig[a.type] || typeConfig.call;
            const Icon = tc.icon;
            return (
              <div key={a.id} className={`card p-4 flex items-start gap-4 transition-opacity duration-200 ${a.done ? "opacity-50" : ""}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${tc.bg}`}>
                  <Icon size={16} className={tc.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-500 text-sm ${a.done ? "line-through text-ink-500" : "text-ink-100"}`}>{a.title}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1">
                    {a.contact && <span className="text-xs text-ink-500">{a.contact}</span>}
                    {a.date && (
                      <span className="flex items-center gap-1 text-xs text-ink-600">
                        <Clock size={10} />{a.date}
                      </span>
                    )}
                  </div>
                  {a.notes && <p className="text-xs text-ink-600 mt-1">{a.notes}</p>}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleActivity(a.id)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${a.done ? "bg-green-500/20 text-green-400" : "bg-ink-800 text-ink-500 hover:bg-green-500/20 hover:text-green-400"}`}
                  >
                    <Check size={14} />
                  </button>
                  <button onClick={() => deleteActivity(a.id)} className="btn-ghost p-1.5 hover:text-coral">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nueva actividad">
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-ink-500 mb-1">Tipo</label>
            <div className="flex gap-2">
              {Object.entries(typeConfig).map(([k, v]) => {
                const I = v.icon;
                return (
                  <button key={k} onClick={() => setForm(p=>({...p,type:k}))}
                    className={`flex-1 py-2 rounded-xl text-xs font-mono font-500 flex items-center justify-center gap-1.5 transition-colors border ${form.type===k ? `${v.bg} ${v.color} border-transparent` : "border-ink-700 text-ink-400 hover:text-ink-200"}`}>
                    <I size={13} />{v.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-xs text-ink-500 mb-1">Título *</label>
            <input className="input-field w-full" placeholder="Ej. Llamada de seguimiento con Ana" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-ink-500 mb-1">Contacto</label>
              <input className="input-field w-full" list="act-contacts" placeholder="Nombre del contacto" value={form.contact} onChange={e=>setForm(p=>({...p,contact:e.target.value}))} />
              <datalist id="act-contacts">{contacts.map(c=><option key={c.id} value={c.name}/>)}</datalist>
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Fecha y hora</label>
              <input className="input-field w-full" type="datetime-local" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-ink-500 mb-1">Notas</label>
            <textarea className="input-field w-full resize-none" rows={2} placeholder="Detalles opcionales…" value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button onClick={() => setModalOpen(false)} className="btn-ghost">Cancelar</button>
            <button onClick={handleSubmit} className="btn-primary">Crear actividad</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
