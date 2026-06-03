import { useState } from "react";
import { useApp } from "../context/AppContext";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { statusConfig } from "../data/mockData";
import { Plus, Search, Trash2, Pencil, Mail, Phone } from "lucide-react";

const emptyForm = {
  name: "", email: "", phone: "", company: "", role: "", status: "new", value: "", tags: ""
};

export default function Contacts() {
  const { contacts, addContact, updateContact, deleteContact } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openAdd = () => { setEditContact(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (c) => {
    setEditContact(c);
    setForm({ ...c, value: String(c.value), tags: (c.tags || []).join(", ") });
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    const data = { ...form, value: Number(form.value) || 0, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
    if (editContact) updateContact(editContact.id, data);
    else addContact(data);
    setModalOpen(false);
  };

  const filtered = contacts.filter(c => {
    const matchSearch = !search || [c.name, c.email, c.company].some(s => s?.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const fmt = (n) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="animate-in-slow">
      <Header
        title="Contactos"
        subtitle={`${contacts.length} contactos registrados`}
        actions={
          <button onClick={openAdd} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Nuevo
          </button>
        }
      />

      <div className="pt-16 p-6 space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              className="input-field w-full pl-8"
              placeholder="Buscar contactos…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            {["all", "hot", "new", "cold"].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-500 transition-colors duration-150 ${statusFilter === s ? "bg-acid text-ink-950" : "bg-ink-800 text-ink-400 hover:text-ink-200"}`}
              >
                {s === "all" ? "Todos" : statusConfig[s]?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink-800">
                <tr>
                  <th className="table-head text-left">Contacto</th>
                  <th className="table-head text-left hidden md:table-cell">Empresa</th>
                  <th className="table-head text-left hidden lg:table-cell">Contacto</th>
                  <th className="table-head text-left">Estado</th>
                  <th className="table-head text-right hidden sm:table-cell">Valor</th>
                  <th className="table-head text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="table-cell text-center text-ink-500 py-10">Sin resultados</td></tr>
                )}
                {filtered.map(c => {
                  const sc = statusConfig[c.status] || statusConfig.new;
                  return (
                    <tr key={c.id} className="table-row">
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-acid/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-mono font-500 text-acid">{c.avatar}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-500 text-ink-100 truncate">{c.name}</p>
                            <p className="text-xs text-ink-500 truncate">{c.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell hidden md:table-cell text-ink-400">{c.company}</td>
                      <td className="table-cell hidden lg:table-cell">
                        <div className="flex flex-col gap-0.5">
                          <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 text-xs text-ink-400 hover:text-acid transition-colors">
                            <Mail size={11} />{c.email}
                          </a>
                          <span className="flex items-center gap-1.5 text-xs text-ink-500">
                            <Phone size={11} />{c.phone}
                          </span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className={`badge ${sc.className}`}>{sc.label}</span>
                      </td>
                      <td className="table-cell text-right hidden sm:table-cell">
                        <span className="font-mono text-sm text-acid">{fmt(c.value)}</span>
                      </td>
                      <td className="table-cell text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(c)} className="btn-ghost p-1.5">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => setConfirmDelete(c)} className="btn-ghost p-1.5 hover:text-coral">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editContact ? "Editar contacto" : "Nuevo contacto"}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs text-ink-500 mb-1">Nombre completo *</label>
              <input className="input-field w-full" placeholder="Ej. Ana García" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Email</label>
              <input className="input-field w-full" placeholder="email@empresa.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Teléfono</label>
              <input className="input-field w-full" placeholder="+52 55 ..." value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Empresa</label>
              <input className="input-field w-full" placeholder="Empresa S.A." value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Cargo</label>
              <input className="input-field w-full" placeholder="CEO, CTO, VP…" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Estado</label>
              <select className="input-field w-full" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                <option value="new">Nuevo</option>
                <option value="hot">Activo</option>
                <option value="cold">Frío</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Valor estimado (MXN)</label>
              <input className="input-field w-full" type="number" placeholder="50000" value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-ink-500 mb-1">Etiquetas (separadas por coma)</label>
              <input className="input-field w-full" placeholder="Enterprise, Startup, PYME" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setModalOpen(false)} className="btn-ghost">Cancelar</button>
            <button onClick={handleSubmit} className="btn-primary">{editContact ? "Guardar cambios" : "Crear contacto"}</button>
          </div>
        </div>
      </Modal>

      {/* Confirm delete */}
      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Eliminar contacto" width="max-w-sm">
        <p className="text-ink-400 text-sm mb-4">¿Eliminar a <span className="text-ink-100 font-500">{confirmDelete?.name}</span>? Esta acción es irreversible.</p>
        <div className="flex justify-end gap-2">
          <button onClick={() => setConfirmDelete(null)} className="btn-ghost">Cancelar</button>
          <button onClick={() => { deleteContact(confirmDelete.id); setConfirmDelete(null); }} className="px-4 py-2 bg-coral text-white rounded-xl text-sm font-500 hover:bg-coral-dim transition-colors">Eliminar</button>
        </div>
      </Modal>
    </div>
  );
}
