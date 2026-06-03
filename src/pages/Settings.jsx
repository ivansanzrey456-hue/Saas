import Header from "../components/Header";
import { User, Bell, Shield, CreditCard, Zap } from "lucide-react";

function SettingsSection({ icon: Icon, title, children }) {
  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-ink-800 pb-3">
        <Icon size={16} className="text-acid" />
        <h3 className="font-display font-600 text-ink-200">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function SettingsRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm text-ink-200 font-500">{label}</p>
        {description && <p className="text-xs text-ink-500 mt-0.5">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ defaultChecked }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-10 h-5 bg-ink-700 rounded-full peer peer-checked:bg-acid transition-colors duration-200 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-ink-950 after:rounded-full after:w-4 after:h-4 after:transition-all peer-checked:after:translate-x-5" />
    </label>
  );
}

export default function Settings() {
  return (
    <div className="animate-in-slow">
      <Header title="Configuración" subtitle="Personaliza tu cuenta y workspace" />

      <div className="pt-16 p-6 max-w-2xl space-y-4">
        <SettingsSection icon={User} title="Perfil">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-acid/20 border border-acid/30 flex items-center justify-center flex-shrink-0">
              <span className="font-mono text-lg text-acid font-500">TU</span>
            </div>
            <div className="flex-1 space-y-2">
              <input className="input-field w-full" defaultValue="Tu Nombre" placeholder="Nombre completo" />
              <input className="input-field w-full" defaultValue="tu@empresa.com" placeholder="Email" />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="btn-primary">Guardar perfil</button>
          </div>
        </SettingsSection>

        <SettingsSection icon={Bell} title="Notificaciones">
          <SettingsRow label="Recordatorios de actividad" description="Notificar 30 min antes de cada actividad">
            <Toggle defaultChecked={true} />
          </SettingsRow>
          <SettingsRow label="Alertas de trato" description="Al cambiar etapa un trato">
            <Toggle defaultChecked={true} />
          </SettingsRow>
          <SettingsRow label="Resumen semanal" description="Email con el resumen del pipeline cada lunes">
            <Toggle defaultChecked={false} />
          </SettingsRow>
        </SettingsSection>

        <SettingsSection icon={Shield} title="Seguridad">
          <SettingsRow label="Autenticación en dos pasos" description="Mayor seguridad para tu cuenta">
            <Toggle defaultChecked={false} />
          </SettingsRow>
          <SettingsRow label="Sesión activa" description="Última sesión: hace 2 minutos">
            <button className="text-xs text-coral hover:text-coral-dim font-mono font-500 transition-colors">Cerrar sesión</button>
          </SettingsRow>
        </SettingsSection>

        <SettingsSection icon={CreditCard} title="Plan">
          <div className="flex items-center justify-between p-3 bg-acid/10 border border-acid/30 rounded-xl">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-acid" />
              <div>
                <p className="text-sm font-500 text-acid">Plan Pro</p>
                <p className="text-xs text-ink-500">$299 MXN / mes · Activo</p>
              </div>
            </div>
            <button className="btn-ghost text-xs">Cambiar plan</button>
          </div>
          <SettingsRow label="Contactos" description="800 de 1,000 usados">
            <div className="w-24 h-1.5 bg-ink-800 rounded-full overflow-hidden">
              <div className="h-full bg-acid rounded-full" style={{width:"80%"}} />
            </div>
          </SettingsRow>
          <SettingsRow label="Almacenamiento" description="2.1 GB de 10 GB">
            <div className="w-24 h-1.5 bg-ink-800 rounded-full overflow-hidden">
              <div className="h-full bg-sky rounded-full" style={{width:"21%"}} />
            </div>
          </SettingsRow>
        </SettingsSection>
      </div>
    </div>
  );
}
