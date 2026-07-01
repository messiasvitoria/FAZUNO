"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

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
    user:         ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2", "M12 11a4 4 0 100-8 4 4 0 000 8z"],
    creditCard:   ["M1 4h22v16H1z", "M1 10h22"],
    star:         ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
    logOut:       ["M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4", "M16 17l5-5-5-5", "M21 12H9"],
    briefcase:    ["M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z", "M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"],
    barChart:     ["M18 20V10", "M12 20V4", "M6 20v-6"],
  };

  const d = paths[name];
  if (!d || d.length === 0) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

// ─── NOTIF ICON ───────────────────────────────────────────────────────────────
function NotifIcon({ icon, iconColor }) {
  if (icon === "doc")     return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>;
  if (icon === "chat")    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>;
  if (icon === "payment") return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>;
  if (icon === "check")   return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>;
  if (icon === "clock")   return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
  if (icon === "star")    return <svg width="20" height="20" viewBox="0 0 24 24" fill={iconColor} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
  if (icon === "alert")   return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
  return null;
}

// ─── NOTIF DETAIL MODAL ───────────────────────────────────────────────────────
function NotifDetailModal({ notif, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const relatedContent = {
    doc:     { label: "Nova Solicitação",    description: "Acesse os detalhes completos desta solicitação e responda ao cliente.", action: "Ver solicitação",      color: "#3b82f6" },
    chat:    { label: "Ir para o Chat",      description: "Visualize a conversa completa e responda ao cliente.", action: "Abrir conversa",          color: "#22c55e" },
    payment: { label: "Ver Pagamento",       description: "Acesse os detalhes da transação e o comprovante de pagamento.", action: "Ver comprovante",       color: "#8b5cf6" },
    check:   { label: "Serviço Concluído",   description: "O serviço foi marcado como concluído. Aguarde a avaliação do cliente.", action: "Ver detalhes",       color: "#22c55e" },
    clock:   { label: "Prazo de Resposta",   description: "Esta solicitação aguarda sua resposta. Responda para não perder o prazo.", action: "Responder agora",  color: "#f97316" },
    star:    { label: "Nova Avaliação",      description: "Um cliente avaliou seu serviço. Confira o feedback recebido.", action: "Ver avaliação",             color: "#f59e0b" },
    alert:   { label: "Aviso do Sistema",    description: "Verifique este aviso para manter seu perfil em dia.", action: "Ver detalhes",                  color: "#ef4444" },
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
          <button
            onClick={onClose}
            style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.08)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
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
            <button
              onClick={onClose}
              style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "white", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              Fechar
            </button>
            <button
              onClick={onClose}
              style={{ flex: 2, padding: "11px 0", borderRadius: 12, border: "none", backgroundColor: content.color, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {content.action} <Icon name="externalLink" size={14} color="white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const filters = ["Todas", "Não lidas", "Solicitações", "Serviços", "Financeiro"];

const filterKey = (label, index) => {
  if (index === 0) return "todas";
  if (index === 1) return "não_lidas";
  return label.toLowerCase();
};

const allNotifs = [
  { id: 1,  icon: "doc",     title: "Nova Solicitação Recebida",            desc: "Você recebeu uma nova solicitação de Instalação de Ar Condicionado de Maria Costa.",    time: "Agora há pouco",  sortOrder: 1,  unread: true,  category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 2,  icon: "chat",    title: "Cliente Respondeu",                    desc: "Maria Santos respondeu sua mensagem sobre a solicitação de Pintura Residencial.",        time: "Há 15 min",       sortOrder: 2,  unread: true,  category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 3,  icon: "clock",   title: "Solicitação Aguardando Resposta",      desc: "A solicitação de Limpeza de Caixa D'água está aguardando sua confirmação há 2 horas.", time: "Há 1 hora",       sortOrder: 3,  unread: true,  category: "solicitações", iconColor: "#f97316", iconBg: "#ffedd5" },
  { id: 4,  icon: "check",   title: "Serviço Concluído",                    desc: "Você concluiu o serviço de Instalação de Chuveiro para Carlos Oliveira com sucesso.",    time: "Ontem às 18:30",  sortOrder: 5,  unread: false, category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 5,  icon: "payment", title: "Pagamento Recebido",                   desc: "Você recebeu um pagamento de R$ 250,00 referente ao serviço de Instalação Elétrica.",   time: "Ontem às 16:45",  sortOrder: 6,  unread: false, category: "financeiro",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
  { id: 6,  icon: "star",    title: "Nova Avaliação Recebida",              desc: "João Pereira avaliou seu serviço com 5 estrelas. Parabéns pelo excelente trabalho!",     time: "Ontem às 14:00",  sortOrder: 4,  unread: false, category: "serviços",     iconColor: "#f59e0b", iconBg: "#fef3c7" },
  { id: 7,  icon: "doc",     title: "Nova Solicitação Recebida",            desc: "Pedro Alves solicitou um orçamento para Reparo de Telhado na Rua das Flores, 120.",      time: "Há 2 dias",       sortOrder: 7,  unread: false, category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 8,  icon: "payment", title: "Cobrança Emitida",                     desc: "Uma cobrança de R$ 180,00 foi gerada para o serviço de Encanamento de Ana Lima.",       time: "Há 2 dias",       sortOrder: 8,  unread: false, category: "financeiro",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
  { id: 9,  icon: "chat",    title: "Nova Mensagem do Cliente",             desc: "Fernanda Costa enviou: 'Pode confirmar o horário para amanhã às 8h?'",                   time: "Há 3 dias",       sortOrder: 9,  unread: false, category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 10, icon: "alert",   title: "Documento Pendente",                   desc: "Seu certificado de habilitação técnica vence em 7 dias. Renove para continuar ativo.",   time: "Há 3 dias",       sortOrder: 10, unread: false, category: "solicitações", iconColor: "#ef4444", iconBg: "#fee2e2" },
  { id: 11, icon: "star",    title: "Avaliação Recebida",                   desc: "Roberto Souza deixou um comentário positivo sobre o serviço de Pintura de Quarto.",     time: "Há 4 dias",       sortOrder: 11, unread: false, category: "serviços",     iconColor: "#f59e0b", iconBg: "#fef3c7" },
  { id: 12, icon: "payment", title: "Repasse Processado",                   desc: "Seu repasse de R$ 420,00 foi processado e será creditado em até 2 dias úteis.",         time: "Há 5 dias",       sortOrder: 12, unread: false, category: "financeiro",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
].sort((a, b) => a.sortOrder - b.sortOrder);

// ─── PROFILE MENU ─────────────────────────────────────────────────────────────
function ProfileMenu({ onClose, onNavigate, onLogout }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const menuItems = [
    { icon: "user",       label: "Meu Perfil",               route: "/Pages/Meu_perfil_prestador", color: "#0d1b3e" },
    { icon: "briefcase",  label: "Meus Serviços",             route: "/Pages/Servicos_prestador",   color: "#0d1b3e" },
    { icon: "creditCard", label: "Financeiro e Repasses",     route: "/Pages/Financeiro_prestador", color: "#0d1b3e" },
    { icon: "barChart",   label: "Desempenho",                route: null,                          color: "#0d1b3e" },
    { icon: "settings",   label: "Configurações da Conta",    route: null,                          color: "#0d1b3e" },
  ];

  return (
    <>
      <style>{`
        @keyframes profileMenuIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
      <div
        ref={menuRef}
        style={{
          position: "fixed",
          top: 64,
          right: 16,
          width: 300,
          backgroundColor: "white",
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          zIndex: 1000,
          overflow: "hidden",
          border: "1px solid #f1f5f9",
          animation: "profileMenuIn 0.18s ease",
        }}
      >
        {/* Header — avatar + name */}
        <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2.5px solid #22c55e",
              flexShrink: 0,
            }}
          >
            <img
              src="/prestador1.avif"
              alt="Carlos"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#0d1b3e", lineHeight: 1.2 }}>Carlos Lima</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
              <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>Prestador Verificado</span>
              {/* Green verified badge */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e" stroke="none">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                <path d="M9 12l2 2 4-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: "#f1f5f9", margin: "0 20px" }} />

        {/* Menu items */}
        <div style={{ padding: "8px 10px" }}>
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => item.route && onNavigate(item.route)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "13px 12px",
                borderRadius: 12,
                border: "none",
                backgroundColor: "transparent",
                cursor: item.route ? "pointer" : "default",
                textAlign: "left",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (item.route) e.currentTarget.style.backgroundColor = "#f8fafc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <Icon name={item.icon} size={20} color={item.color} strokeWidth={1.8} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#0d1b3e" }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: "#f1f5f9", margin: "0 20px" }} />

        {/* Logout */}
        <div style={{ padding: "8px 10px 10px" }}>
          <button
            onClick={onLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "13px 12px",
              borderRadius: 12,
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fff1f2")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <Icon name="logOut" size={20} color="#ef4444" strokeWidth={1.8} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#ef4444" }}>Sair</span>
          </button>
        </div>
      </div>
    </>
  );
}

// ─── TOPBAR COMPONENT ─────────────────────────────────────────────────────────
export default function TopBar_Prestador() {
  const router = useRouter();

  const [notifOpen,     setNotifOpen]     = useState(false);
  const [profileOpen,   setProfileOpen]   = useState(false);
  const [notifFilter,   setNotifFilter]   = useState("todas");
  const [showAllNotifs, setShowAllNotifs] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [notifs,        setNotifs]        = useState(allNotifs);

  const notifRef = useRef(null);

  // Close notif dropdown on outside click
  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  const baseNotifs =
    notifFilter === "todas"
      ? notifs
      : notifFilter === "não_lidas"
      ? notifs.filter((n) => n.unread)
      : notifs.filter((n) => n.category === notifFilter);

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

  const handleNavigate = (route) => {
    setProfileOpen(false);
    router.push(route);
  };

  const handleLogout = () => {
    setProfileOpen(false);
    router.push("/Pages/Login");
  };

  return (
    <>
      {selectedNotif && (
        <NotifDetailModal notif={selectedNotif} onClose={() => setSelectedNotif(null)} />
      )}

      {profileOpen && (
        <ProfileMenu
          onClose={() => setProfileOpen(false)}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}

      <div
        style={{
          height: 56,
          backgroundColor: "#0d1b3e",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 20px",
          flexShrink: 0,
          zIndex: 20,
          gap: 4,
        }}
      >
        {/* Bell */}
        <div ref={notifRef} style={{ position: "relative" }}>
          <button
            onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false); }}
            style={{
              position: "relative",
              padding: 8,
              borderRadius: 8,
              border: "none",
              backgroundColor: notifOpen ? "rgba(255,255,255,0.15)" : "transparent",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { if (!notifOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={(e) => { if (!notifOpen) e.currentTarget.style.backgroundColor = notifOpen ? "rgba(255,255,255,0.15)" : "transparent"; }}
          >
            <Icon name="bell" size={20} color="rgba(255,255,255,0.75)" />
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute", top: 4, right: 4, width: 16, height: 16,
                  borderRadius: "50%", backgroundColor: "#22c55e", color: "white",
                  fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notif Dropdown */}
          {notifOpen && (
            <div
              style={{
                position: "fixed", top: 60, right: 20, width: 420, backgroundColor: "white",
                borderRadius: 20, boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 999,
                overflow: "hidden", border: "1px solid #f1f5f9",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px 12px" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0d1b3e" }}>Notificações</h3>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
                    <Icon name="clock" size={11} color="#94a3b8" /> Ordenadas por data
                  </p>
                </div>
                <button
                  onClick={() => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })))}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#22c55e" }}
                >
                  Marcar todas como lidas
                </button>
              </div>

              <div style={{ display: "flex", gap: 6, padding: "0 20px 12px", overflowX: "auto", scrollbarWidth: "none" }}>
                {filters.map((f, i) => {
                  const key = filterKey(f, i);
                  const active = notifFilter === key;
                  const badge = unreadForFilter(f, i);
                  return (
                    <button
                      key={f}
                      onClick={() => handleFilterClick(f, i)}
                      style={{
                        flexShrink: 0, display: "flex", alignItems: "center", gap: 5,
                        padding: "5px 14px", borderRadius: 9999, fontSize: 12, fontWeight: 600,
                        cursor: "pointer", border: "none",
                        backgroundColor: active ? "#0d1b3e" : "#f1f5f9",
                        color: active ? "white" : "#64748b", transition: "all 0.2s",
                      }}
                    >
                      {f}
                      {badge > 0 && (
                        <span style={{ backgroundColor: "#22c55e", color: "white", fontSize: 10, fontWeight: 700, borderRadius: 9999, padding: "1px 6px", lineHeight: 1.4 }}>
                          {badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div style={{ maxHeight: showAllNotifs ? 520 : 380, overflowY: "auto", scrollbarWidth: "none", transition: "max-height 0.3s ease" }}>
                {filteredNotifs.length === 0 ? (
                  <div style={{ padding: "32px 20px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>Nenhuma notificação aqui.</div>
                ) : (
                  filteredNotifs.map((n, i) => (
                    <div
                      key={n.id}
                      onClick={() => handleNotifClick(n)}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 20px",
                        borderTop: i > 0 ? "1px solid #f8fafc" : "none",
                        backgroundColor: n.unread ? "#f0fdf4" : "white", cursor: "pointer", transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = n.unread ? "#f0fdf4" : "white")}
                    >
                      <div style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: n.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <NotifIcon icon={n.icon} iconColor={n.iconColor} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 700, color: "#0d1b3e" }}>{n.title}</p>
                        <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748b", lineHeight: 1.45, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.desc}</p>
                        <span style={{ fontSize: 11, color: "#94a3b8" }}>{n.time}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0, marginTop: 2 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: n.unread ? "#22c55e" : "#e2e8f0" }} />
                        <Icon name="chevRight" size={13} color="#cbd5e1" />
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ padding: "12px 20px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
                <button
                  onClick={() => setShowAllNotifs((v) => !v)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#0d1b3e", display: "inline-flex", alignItems: "center", gap: 4 }}
                >
                  {showAllNotifs ? "Ver menos" : "Ver todas as notificações"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1b3e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={showAllNotifs ? "M18 15l-6-6-6 6" : "M9 18l6-6-6-6"} />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button
          style={{ padding: 8, borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <Icon name="help" size={20} color="rgba(255,255,255,0.75)" />
        </button>

        {/* Settings */}
        <button
          style={{ padding:8, borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <Icon name="settings" size={20} color="rgba(255,255,255,0.75)" />
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 28, backgroundColor: "rgba(255,255,255,0.2)", margin: "0 8px" }} />

        {/* User — clicável para abrir menu de perfil */}
        <div
          onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false); }}
          style={{
            display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
            padding: "4px 8px", borderRadius: 10,
            backgroundColor: profileOpen ? "rgba(255,255,255,0.12)" : "transparent",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { if (!profileOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
          onMouseLeave={(e) => { if (!profileOpen) e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", border: "2px solid #22c55e", flexShrink: 0 }}>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="João"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
          <div>
            <div style={{ color: "white", fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>João Silva</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, lineHeight: 1.2 }}>Prestador</div>
          </div>
          <Icon name="chevDown" size={14} color="rgba(255,255,255,0.4)" />
        </div>
      </div>
    </>
  );
}
