import { useEffect, useRef, useState } from "react";
import { Bell, CircleHelp, Settings, ChevronDown, User } from "lucide-react";

/* ── Dados ── */
const STATUS_OPTIONS = [
  { value: "active",   label: "Ativo para novos serviços",  dot: "#22c55e" },
  { value: "paused",   label: "Pausado temporariamente",     dot: "#f59e0b" },
  { value: "inactive", label: "Inativo",                     dot: "rgba(255,255,255,0.4)" },
];

const NOTIFICATIONS = [
  { icon: "📥", text: "Nova solicitação: Pintura residencial", time: "5 min atrás" },
  { icon: "✅", text: "Serviço confirmado por Brenda Barbosa",  time: "1h atrás" },
  { icon: "💬", text: "Nova mensagem de Carlos Oliveira",       time: "2h atrás" },
  { icon: "⭐", text: "Você recebeu uma avaliação 5 estrelas",  time: "Ontem" },
];

const PROFILE_MENU = [
  { icon: "👤", label: "Meu perfil" },
  { icon: "⚙️", label: "Configurações" },
  { icon: "💳", label: "Pagamentos" },
  { icon: "🚪", label: "Sair", danger: true },
];

const AVAILABILITY_ACTIONS = [
  { icon: "⏸️", label: "Pausar por 1 hora" },
  { icon: "🌙", label: "Pausar pelo resto do dia" },
  { icon: "🚫", label: "Bloquear este horário" },
  { icon: "🗓️", label: "Editar horários da semana" },
];

/* ── Dropdown genérico ── */
function useClickOutside(ref, onClose) {
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [ref, onClose]);
}

function Dropdown({ trigger, children, align = "left", width = 240 }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {trigger(() => setOpen((o) => !o), open)}
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          [align]: 0,
          width,
          background: "#fff",
          borderRadius: 12,
          border: "0.5px solid #e5e7eb",
          boxShadow: "0 12px 32px rgba(17,24,39,0.14)",
          padding: 6,
          zIndex: 50,
        }}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ icon, label, sub, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px",
        border: "none",
        background: "transparent",
        borderRadius: 8,
        fontSize: 13,
        color: danger ? "#dc2626" : "#374151",
        cursor: "pointer",
        textAlign: "left",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = danger ? "#fef2f2" : "#f9fafb")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span style={{ fontSize: 15, width: 18, textAlign: "center", flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>
        <div style={{ fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{sub}</div>}
      </span>
    </button>
  );
}

/* ── Menus ── */
function StatusMenu({ status, onChange }) {
  const current = STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];
  return (
    <Dropdown
      align="left"
      width={230}
      trigger={(toggle) => (
        <button onClick={toggle} style={{
          display: "flex", alignItems: "center", gap: 8,
          borderRadius: 20, padding: "7px 14px",
          fontSize: 12.5, fontWeight: 600, cursor: "pointer",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.16)",
          color: "#fff", whiteSpace: "nowrap",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: current.dot, flexShrink: 0 }} />
          {current.label}
          <ChevronDown size={14} strokeWidth={2.4} style={{ opacity: 0.8 }} />
        </button>
      )}
    >
      {(close) => STATUS_OPTIONS.map((opt) => (
        <DropdownItem
          key={opt.value}
          icon="●"
          label={opt.label}
          onClick={() => { onChange(opt.value); close(); }}
        />
      ))}
    </Dropdown>
  );
}

function NotificationsMenu() {
  return (
    <Dropdown align="right" width={280} trigger={(toggle) => (
      <button onClick={toggle} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.75)", display: "flex" }}>
        <Bell size={19} strokeWidth={1.8} />
        <span style={{
          position: "absolute", top: -6, right: -7,
          background: "#f97316", color: "#fff",
          borderRadius: "50%", width: 16, height: 16,
          fontSize: 9.5, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
        }}>
          {NOTIFICATIONS.length}
        </span>
      </button>
    )}>
      {(close) => (
        <>
          <div style={{ padding: "6px 10px 8px", fontSize: 12, fontWeight: 600, color: "#111827" }}>Notificações</div>
          {NOTIFICATIONS.map((n, i) => (
            <DropdownItem key={i} icon={n.icon} label={n.text} sub={n.time} onClick={close} />
          ))}
        </>
      )}
    </Dropdown>
  );
}

function ProfileMenu() {
  return (
    <Dropdown align="right" width={200} trigger={(toggle) => (
      <button onClick={toggle} style={{ display: "flex", alignItems: "center", gap: 9, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "#6366f1",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, border: "2px solid #f97316",
        }}>
          <User size={16} color="#fff" strokeWidth={2.2} />
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ color: "#fff", fontSize: 12.5, fontWeight: 700 }}>João Silva</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10.5 }}>Prestador</div>
        </div>
        <ChevronDown size={14} strokeWidth={2.4} style={{ color: "rgba(255,255,255,0.5)" }} />
      </button>
    )}>
      {(close) => PROFILE_MENU.map((item) => (
        <DropdownItem key={item.label} icon={item.icon} label={item.label} danger={item.danger} onClick={close} />
      ))}
    </Dropdown>
  );
}

/* ── Topbar principal ── */
export default function Topbar({ status, onStatusChange }) {
  return (
    <header style={{
      background: "#0d1b3e",
      padding: "14px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    }}>
      {/* Esquerda: saudação + status */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Olá, João! 👋</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11.5, marginTop: 2 }}>
            Aqui está o resumo do seu dia!
          </div>
        </div>
        <StatusMenu status={status} onChange={onStatusChange} />
      </div>

      {/* Direita: notificações, ajuda, config, perfil */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <NotificationsMenu />
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.75)", display: "flex" }}>
          <CircleHelp size={19} strokeWidth={1.8} />
        </button>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.75)", display: "flex" }}>
          <Settings size={19} strokeWidth={1.8} />
        </button>
        <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.14)" }} />
        <ProfileMenu />
      </div>
    </header>
  );
}

/* Exporta o Dropdown e DropdownItem para reuso em outros componentes */
export { Dropdown, DropdownItem, AVAILABILITY_ACTIONS };