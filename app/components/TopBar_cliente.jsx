"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, ChevronDown, User, CreditCard, Heart, Settings, LogOut, BadgeCheck } from "lucide-react";

// ─── ICON COMPONENT ──────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    bell:         ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 01-3.46 0"],
    help:         ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3", "M12 17h.01"],
    settings:     ["M12 15a3 3 0 100-6 3 3 0 000 6z", "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
    chevDown:     ["M6 9l6 6 6-6"],
    chevRight:    ["M9 18l6-6-6-6"],
    xIcon:        ["M18 6L6 18", "M6 6l12 12"],
    externalLink: ["M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6", "M15 3h6v6", "M10 14L21 3"],
    clock:        ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 6v6l4 2"],
  };
  const d = paths[name];
  if (!d || d.length === 0) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

// ─── NOTIF ICON ──────────────────────────────────────────────────────────────
function NotifIcon({ icon, iconColor }) {
  if (icon === "doc")     return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>;
  if (icon === "chat")    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>;
  if (icon === "payment") return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>;
  if (icon === "star")    return <svg width="20" height="20" viewBox="0 0 24 24" fill={iconColor} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
  if (icon === "eye")     return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
  return null;
}

// ─── NOTIF DETAIL MODAL ──────────────────────────────────────────────────────
function NotifDetailModal({ notif, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const relatedContent = {
    doc:     { label: "Ver Solicitação",  description: "Acesse os detalhes completos desta solicitação.",          action: "Abrir solicitação",         color: "#3b82f6" },
    chat:    { label: "Ir para o Chat",   description: "Visualize a conversa completa e responda ao prestador.",   action: "Abrir conversa",            color: "#22c55e" },
    payment: { label: "Ver Pagamento",    description: "Acesse os detalhes da transação e comprovante.",           action: "Ver comprovante",            color: "#8b5cf6" },
    star:    { label: "Avaliar Serviço",  description: "Compartilhe sua experiência avaliando o profissional.",    action: "Avaliar agora",              color: "#f59e0b" },
    eye:     { label: "Ver Solicitação",  description: "O prestador visualizou sua solicitação. Acompanhe.",       action: "Acompanhar solicitação",     color: "#f97316" },
  };
  const content = relatedContent[notif.icon] || relatedContent.doc;

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)" }}
    >
      <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.95) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "white", borderRadius: 24, width: 460, maxWidth: "90vw", boxShadow: "0 32px 80px rgba(0,0,0,0.22)", overflow: "hidden", animation: "modalIn 0.2s ease" }}
      >
        <div style={{ backgroundColor: notif.iconBg, padding: "24px 24px 20px", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.08)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon name="xIcon" size={16} color="#374151" strokeWidth={2.5} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
              <NotifIcon icon={notif.icon} iconColor={notif.iconColor} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: notif.iconColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>{content.label}</p>
              <h3 style={{ margin: "2px 0 0", fontSize: 17, fontWeight: 800, color: "#0d1b3e" }}>{notif.title}</h3>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px 24px 24px" }}>
          <div style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: "14px 16px", marginBottom: 16, borderLeft: `3px solid ${notif.iconColor}` }}>
            <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{notif.desc}</p>
          </div>
          <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: "0 0 20px" }}>{content.description}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            <Icon name="clock" size={14} color="#94a3b8" />
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{notif.time}</span>
            <span style={{ fontSize: 12, color: "#e2e8f0", margin: "0 4px" }}>•</span>
            <span style={{ fontSize: 12, color: "#94a3b8", textTransform: "capitalize" }}>{notif.category}</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "white", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Fechar</button>
            <button onClick={onClose} style={{ flex: 2, padding: "11px 0", borderRadius: 12, border: "none", backgroundColor: content.color, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {content.action} <Icon name="externalLink" size={14} color="white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PERFIL DROPDOWN ─────────────────────────────────────────────────────────
function PerfilDropdown({
  userName = "Brenda Nogueira",
  perfilPath = "/perfil",
  pagamentosPath = "/pagamentos",
  favoritosPath = "/favoritos",
  configuracoesPath = "/configuracoes",
  onSair = () => console.log("Sair clicado"),
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      {/* Botão do perfil */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "0 8px" }}
      >
        <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", border: "2px solid #f97316", flexShrink: 0 }}>
          <img
            src="/homem1.avif"
            alt={userName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ color: "white", fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>{userName.split(" ")[0]}</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, lineHeight: 1.2 }}>Cliente</div>
        </div>
        <ChevronDown
          size={14}
          color="rgba(255,255,255,0.4)"
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown do perfil */}
      {open && (
        <div style={{ position: "fixed", top: 60, right: 20, width: 420, maxWidth: "90vw", backgroundColor: "white", borderRadius: 16, boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 999, overflow: "hidden", border: "1px solid #f1f5f9" }}>
          {/* Cabeçalho */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "24px 24px 20px" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: "50%", backgroundColor: "#e2e8f0", border: "1px solid #e2e8f0" }}>
              <User size={32} color="#94a3b8" strokeWidth={1.8} />
            </span>
            <div>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{userName}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                <span style={{ color: "#94a3b8", fontSize: 14 }}>Cliente Verificado</span>
                <BadgeCheck size={18} color="#3b82f6" fill="#3b82f6" strokeWidth={0} />
              </div>
            </div>
          </div>

          <hr style={{ borderColor: "#f1f5f9", margin: 0 }} />

          {/* Itens */}
          <nav style={{ paddingTop: 8, paddingBottom: 8 }}>
            {[
              { href: perfilPath,         Icon: User,      label: "Meu Perfil" },
              { href: pagamentosPath,      Icon: CreditCard, label: "Pagamentos e Reembolsos" },
              { href: favoritosPath,       Icon: Heart,     label: "Favoritos" },
              { href: configuracoesPath,   Icon: Settings,  label: "Configurações da Conta" },
            ].map(({ href, Icon: ItemIcon, label }) => (
              <a
                key={label}
                href={href}
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 24px", color: "#0f172a", textDecoration: "none", fontSize: 16, fontWeight: 500 }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <ItemIcon size={22} strokeWidth={1.8} />
                {label}
              </a>
            ))}
          </nav>

          <hr style={{ borderColor: "#f1f5f9", margin: 0 }} />

          {/* Sair */}
          <button
            onClick={onSair}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 500, textAlign: "left" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fef2f2")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <LogOut size={22} strokeWidth={1.8} />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}

// ─── DADOS DE NOTIFICAÇÕES ────────────────────────────────────────────────────
const filters = ["Todas", "Não lidas", "Solicitações", "Serviços", "Pagamentos"];
const filterKey = (label, index) => {
  if (index === 0) return "todas";
  if (index === 1) return "não_lidas";
  return label.toLowerCase();
};
const allNotifs = [
  { id: 1,  icon: "doc",     title: "Serviço Aceito",                       desc: "O prestador João Silva aceitou sua solicitação de Instalação de Ar Condicionado.", time: "Há 5 min",       sortOrder: 1,  unread: true,  category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 2,  icon: "chat",    title: "Nova Mensagem",                         desc: "Você recebeu uma nova mensagem do prestador João Silva.",                           time: "Há 20 min",      sortOrder: 2,  unread: true,  category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 3,  icon: "payment", title: "Pagamento Aprovado",                    desc: "Seu pagamento de R$ 350,00 foi aprovado com sucesso.",                             time: "Há 1 hora",      sortOrder: 3,  unread: true,  category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
  { id: 4,  icon: "star",    title: "Avalie seu Serviço",                    desc: "Seu serviço de Limpeza Residencial foi concluído. Conte como foi sua experiência!", time: "Ontem às 10:30", sortOrder: 6,  unread: false, category: "serviços",     iconColor: "#f59e0b", iconBg: "#fef3c7" },
  { id: 5,  icon: "eye",     title: "Prestador Visualizou sua Solicitação",  desc: "O prestador Maria Santos visualizou sua solicitação de Pintura Residencial.",      time: "Ontem às 09:15", sortOrder: 7,  unread: false, category: "solicitações", iconColor: "#f97316", iconBg: "#ffedd5" },
  { id: 6,  icon: "doc",     title: "Serviço Concluído",                     desc: "Carlos Lima marcou o serviço de Reparo Elétrico como concluído. Tudo certo?",       time: "Ontem às 14:00", sortOrder: 5,  unread: false, category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 7,  icon: "chat",    title: "Nova Mensagem",                         desc: "Ana Faxineira enviou uma mensagem: 'Posso chegar às 8h amanhã?'",                   time: "Há 2 dias",      sortOrder: 8,  unread: false, category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 8,  icon: "payment", title: "Cobrança Gerada",                       desc: "Foi gerada uma cobrança de R$ 180,00 pelo serviço de Encanamento.",               time: "Há 2 dias",      sortOrder: 9,  unread: false, category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
  { id: 9,  icon: "star",    title: "Avalie seu Serviço",                    desc: "Seu serviço de Instalação de Prateleiras foi concluído.",                           time: "Há 3 dias",      sortOrder: 10, unread: false, category: "serviços",     iconColor: "#f59e0b", iconBg: "#fef3c7" },
  { id: 10, icon: "doc",     title: "Novo Prestador Disponível",             desc: "Roberto Souza está disponível para sua solicitação de Pintura de Quarto.",          time: "Há 3 dias",      sortOrder: 11, unread: false, category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 11, icon: "chat",    title: "Nova Mensagem",                         desc: "Fernanda Pintora enviou fotos do trabalho finalizado para sua aprovação.",          time: "Há 4 dias",      sortOrder: 12, unread: false, category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 12, icon: "payment", title: "Reembolso Processado",                  desc: "Seu reembolso de R$ 90,00 foi processado e será creditado em até 5 dias úteis.",  time: "Há 5 dias",      sortOrder: 13, unread: false, category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
].sort((a, b) => a.sortOrder - b.sortOrder);

// ─── TOPBAR PRINCIPAL ─────────────────────────────────────────────────────────
export default function TopBar_cliente({
  userName = "Brenda Nogueira",
  perfilPath = "/perfil",
  pagamentosPath = "/pagamentos",
  favoritosPath = "/favoritos",
  configuracoesPath = "/configuracoes",
  onSair = () => console.log("Sair clicado"),
}) {
  const [notifOpen, setNotifOpen]         = useState(false);
  const [notifFilter, setNotifFilter]     = useState("todas");
  const [showAllNotifs, setShowAllNotifs] = useState(false);
  const [notifs, setNotifs]               = useState(allNotifs);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const notifRef = useRef(null);

  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  const baseNotifs =
    notifFilter === "todas"       ? notifs :
    notifFilter === "não_lidas"   ? notifs.filter((n) => n.unread) :
    notifs.filter((n) => n.category === notifFilter);

  const filteredNotifs = showAllNotifs ? baseNotifs : baseNotifs.slice(0, 5);
  const unreadCount = notifs.filter((n) => n.unread).length;

  const unreadForFilter = (label, index) => {
    if (index === 0 || index === 1) return notifs.filter((n) => n.unread).length;
    return notifs.filter((n) => n.unread && n.category === label.toLowerCase()).length;
  };

  const handleFilterClick = (label, index) => {
    const key = filterKey(label, index);
    setNotifFilter(key);
    setShowAllNotifs(false);
    setNotifs((prev) =>
      prev.map((n) => {
        if (index === 0 || index === 1) return { ...n, unread: false };
        return n.category === label.toLowerCase() ? { ...n, unread: false } : n;
      })
    );
  };

  const handleNotifClick = (n) => {
    setNotifs((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)));
    setSelectedNotif(n);
  };

  return (
    <>
      {selectedNotif && (
        <NotifDetailModal notif={selectedNotif} onClose={() => setSelectedNotif(null)} />
      )}

      <div style={{ height: 56, backgroundColor: "#0d1b3e", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 20px", flexShrink: 0, zIndex: 20, gap: 4 }}>

        {/* Sino de notificações */}
        <div ref={notifRef} style={{ position: "relative" }}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            style={{ position: "relative", padding: 8, borderRadius: 8, border: "none", backgroundColor: notifOpen ? "rgba(255,255,255,0.15)" : "transparent", cursor: "pointer" }}
            onMouseEnter={(e) => { if (!notifOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={(e) => { if (!notifOpen) e.currentTarget.style.backgroundColor = notifOpen ? "rgba(255,255,255,0.15)" : "transparent"; }}
          >
            <Icon name="bell" size={20} color="rgba(255,255,255,0.75)" />
            {unreadCount > 0 && (
              <span style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, borderRadius: "50%", backgroundColor: "#f97316", color: "white", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown notificações */}
          {notifOpen && (
            <div style={{ position: "fixed", top: 60, right: 20, width: 420, backgroundColor: "white", borderRadius: 20, boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 999, overflow: "hidden", border: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px 12px" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0d1b3e" }}>Notificações</h3>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
                    <Icon name="clock" size={11} color="#94a3b8" /> Ordenadas por data
                  </p>
                </div>
                <button onClick={() => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#f97316" }}>
                  Marcar todas como lidas
                </button>
              </div>

              <div style={{ display: "flex", gap: 6, padding: "0 20px 12px", overflowX: "auto", scrollbarWidth: "none" }}>
                {filters.map((f, i) => {
                  const key = filterKey(f, i);
                  const active = notifFilter === key;
                  const badge = unreadForFilter(f, i);
                  return (
                    <button key={f} onClick={() => handleFilterClick(f, i)} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 5, padding: "5px 14px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", backgroundColor: active ? "#0d1b3e" : "#f1f5f9", color: active ? "white" : "#64748b" }}>
                      {f}
                      {badge > 0 && <span style={{ backgroundColor: "#f97316", color: "white", fontSize: 10, fontWeight: 700, borderRadius: 9999, padding: "1px 6px" }}>{badge}</span>}
                    </button>
                  );
                })}
              </div>

              <div style={{ maxHeight: showAllNotifs ? 520 : 380, overflowY: "auto", scrollbarWidth: "none" }}>
                {filteredNotifs.length === 0 ? (
                  <div style={{ padding: "32px 20px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>Nenhuma notificação aqui.</div>
                ) : (
                  filteredNotifs.map((n, i) => (
                    <div key={n.id} onClick={() => handleNotifClick(n)} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 20px", borderTop: i > 0 ? "1px solid #f8fafc" : "none", backgroundColor: n.unread ? "#fafbff" : "white", cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = n.unread ? "#fafbff" : "white")}
                    >
                      <div style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: n.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <NotifIcon icon={n.icon} iconColor={n.iconColor} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 700, color: "#0d1b3e" }}>{n.title}</p>
                        <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.desc}</p>
                        <span style={{ fontSize: 11, color: "#94a3b8" }}>{n.time}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0, marginTop: 2 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: n.unread ? "#f97316" : "#e2e8f0" }} />
                        <Icon name="chevRight" size={13} color="#cbd5e1" />
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ padding: "12px 20px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
                <button onClick={() => setShowAllNotifs((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#0d1b3e", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  {showAllNotifs ? "Ver menos" : "Ver todas as notificações"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1b3e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={showAllNotifs ? "M18 15l-6-6-6 6" : "M9 18l6-6-6-6"} />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Ajuda */}
        <button style={{ padding: 8, borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <Icon name="help" size={20} color="rgba(255,255,255,0.75)" />
        </button>

        {/* Configurações */}
        <button style={{ padding: 8, borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <Icon name="settings" size={20} color="rgba(255,255,255,0.75)" />
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 28, backgroundColor: "rgba(255,255,255,0.2)", margin: "0 8px" }} />

        {/* Perfil com dropdown */}
        <PerfilDropdown
          userName={userName}
          perfilPath={perfilPath}
          pagamentosPath={pagamentosPath}
          favoritosPath={favoritosPath}
          configuracoesPath={configuracoesPath}
          onSair={onSair}
        />
      </div>
    </>
  );
}