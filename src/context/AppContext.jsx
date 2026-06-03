import { createContext, useContext, useState } from "react";
import { mockContacts, mockDeals, mockActivities } from "../data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [contacts, setContacts] = useState(mockContacts);
  const [deals, setDeals] = useState(mockDeals);
  const [activities, setActivities] = useState(mockActivities);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Contacts CRUD
  const addContact = (contact) => {
    const newContact = { ...contact, id: Date.now(), avatar: contact.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase() };
    setContacts(prev => [newContact, ...prev]);
    showNotification(`Contacto "${contact.name}" creado.`);
  };

  const updateContact = (id, data) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    showNotification("Contacto actualizado.");
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    showNotification("Contacto eliminado.", "error");
  };

  // Deals CRUD
  const addDeal = (deal) => {
    const newDeal = { ...deal, id: Date.now() };
    setDeals(prev => [newDeal, ...prev]);
    showNotification(`Trato "${deal.title}" creado.`);
  };

  const updateDeal = (id, data) => {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, ...data } : d));
    showNotification("Trato actualizado.");
  };

  const deleteDeal = (id) => {
    setDeals(prev => prev.filter(d => d.id !== id));
    showNotification("Trato eliminado.", "error");
  };

  // Activities CRUD
  const addActivity = (activity) => {
    setActivities(prev => [{ ...activity, id: Date.now(), done: false }, ...prev]);
    showNotification("Actividad creada.");
  };

  const toggleActivity = (id) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, done: !a.done } : a));
  };

  const deleteActivity = (id) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AppContext.Provider value={{
      contacts, deals, activities,
      sidebarOpen, setSidebarOpen,
      notification,
      addContact, updateContact, deleteContact,
      addDeal, updateDeal, deleteDeal,
      addActivity, toggleActivity, deleteActivity,
      showNotification,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
