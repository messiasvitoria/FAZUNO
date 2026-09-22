"use client";
<<<<<<< HEAD
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaEnvelope, FaBullseye, FaTools, FaCalendarAlt, FaStar,
  FaMapMarkerAlt, FaChevronRight,
  FaPaintRoller, FaTint, FaBolt, FaBroom,
  FaEllipsisV, FaPlus,
} from "react-icons/fa";
import Link from "next/link";
import SidebarPrestador from "../../components/SidebarPrestador";
import TopBarPrestador from "../../components/TopBarPrestador";

// ─── DADOS: StatCards ───────────────────────────────────────────────
const statCards = [
  { label: "Novas Solicitações ", value: 8,     icon: FaEnvelope,    iconBg: "#EEEDFE", iconColor: "#534AB7" },
  { label: "Oportunidades",          value: 6,     icon: FaBullseye,    iconBg: "#FAEEDA", iconColor: "#BA7517" },
  { label: "Serviços em andamento",  value: 3,     icon: FaTools,       iconBg: "#E6F1FB", iconColor: "#185FA5" },
  { label: "Agenda de hoje",         value: 2,     icon: FaCalendarAlt, iconBg: "#EAF3DE", iconColor: "#3B6D11" },
  { label: "Avaliação média",        value: "4,8", icon: FaStar,        iconBg: "#FAEEDA", iconColor: "#EF9F27" },
];

// ─── DADOS: Solicitações Recebidas ──────────────────────────────────
const solicitacoes = [
  { nome: "Mariana Costa",    servico: "Limpeza completa",               horario: "Hoje, 14:30",  local: " Sambaíba Velha, Floriano - PI",   status: "EM ABERTO",  valor: "R$ 180,00", avatar: "MC", avatarBg: "#e0e7ff", avatarColor: "#4338ca" },
  { nome: "Carlos Mendes",    servico: "Instalação de chuveiro elétrico", horario: "Hoje, 10:15",  local: "Tiberão, Floriano - PI",           status: "EM ANÁLISE", valor: "R$ 150,00", avatar: "CM", avatarBg: "#fef3c7", avatarColor: "#b45309" },
  { nome: "Juliana Oliveira", servico: "Pintura interna",                 horario: "Ontem, 16:45", local: "Campo Velho, Floriano - PI",       status: "PENDENTE",   valor: "R$ 350,00", avatar: "JO", avatarBg: "#fce7f3", avatarColor: "#be185d" },
  { nome: "Ricardo Almeida",  servico: "Troca de tomadas",                horario: "Ontem, 11:20", local: "Vila Viana, Barão de Grajaú - MA", status: "ACEITA",     valor: "R$ 120,00", avatar: "RA", avatarBg: "#d1fae5", avatarColor: "#065f46" },
];

const statusStyle = {
  "EM ABERTO":  { bg: "#ede9fe", color: "#6d28d9" },
  "EM ANÁLISE": { bg: "#fef3c7", color: "#b45309" },
  "PENDENTE":   { bg: "#ffedd5", color: "#c2410c" },
  "ACEITA":     { bg: "#d1fae5", color: "#065f46" },
};

// ─── DADOS: Oportunidades para você ─────────────────────────────────
const oportunidades = [
  { titulo: "Pintura de apartamento",   local: "Princesinha, Floriano - PI", distancia: "2,1 km de distância", icon: FaPaintRoller, iconBg: "#ede9fe", iconColor: "#7c3aed" },
  { titulo: "Vazamento no banheiro",    local: "Catumbi, Floriano - PI",     distancia: "3,4 km de distância", icon: FaTint,        iconBg: "#e0f2fe", iconColor: "#0284c7" },
  { titulo: "Instalação de luminária",  local: "Campo Velho, Floriano - PI", distancia: "4,2 km de distância", icon: FaBolt,        iconBg: "#fef3c7", iconColor: "#d97706" },
  { titulo: "Limpeza pós-obra",         local: "Alto da Cruz, Floriano - PI",distancia: "5,8 km de distância", icon: FaBroom,       iconBg: "#d1fae5", iconColor: "#059669" },
];

// ─── DADOS: Agenda de hoje ───────────────────────────────────────────
const agendamentos = [
  { horario: "14:00", titulo: "Instalação de TV",         cliente: "Ana Caroline", local: "Vila Mariana, São Paulo - SP" },
  { horario: "16:30", titulo: "Manutenção hidráulica",    cliente: "Bruno Lima",   local: "Moema, São Paulo - SP" },
];

// ─── DADOS: Seus Serviços ────────────────────────────────────────────
const servicos = [
  { titulo: "Instalação de torneira", categoria: "Hidráulica", preco: "A partir de R$ 120,00", ativo: true, imagem: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400" },
  { titulo: "Troca de tomadas",       categoria: "Elétrica",   preco: "A partir de R$ 80,00",  ativo: true, imagem: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400" },
  { titulo: "Pintura interna",        categoria: "Pintura",    preco: "A partir de R$ 250,00", ativo: true, imagem: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400" },
  { titulo: "Limpeza completa",       categoria: "Limpeza",    preco: "A partir de R$ 150,00", ativo: true, imagem: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400" },
];

export default function Tela_inicio_prestador() {
  const router = useRouter();
=======
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import StatCards from "../../components/StatCards";
import SolicitacoesRecebidas from "../../components/SolicitacoesRecebidas";
import OportunidadesParaVoce from "../../components/OportunidadesParaVoce";
import AgendaDeHoje from "../../components/AgendaDeHoje";
import SeusServicos from "../../components/SeusServicos";
import NotificacoesPrestador from "../../components/NotificacoesPrestador";

// ─── ICON COMPONENT ───────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    home:      ["M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z","M9 21V12h6v9"],
    list:      ["M8 6h13","M8 12h13","M8 18h13","M3 6h.01","M3 12h.01","M3 18h.01"],
    briefcase: ["M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z","M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"],
    calendar:  ["M3 4h18v18H3z","M16 2v4","M8 2v4","M3 10h18"],
    chat:      ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
    bell:      ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"],
    help:      ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3","M12 17h.01"],
    settings:  ["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
    chevDown:  ["M6 9l6 6 6-6"],
    user:      ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 7m-4 0a4 4 0 108 0 4 4 0 00-8 0"],
    zap:       ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
    xIcon:     ["M18 6L6 18","M6 6l12 12"],
  };
  const d = paths[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const navItems = [
  { icon: "home",      label: "Início"                                                          },
  { icon: "list",      label: "Solicitações Recebidas"                                         },
  { icon: "zap",       label: "Oportunidades",  route: "/Pages/Oportunidades"                  },
  { icon: "briefcase", label: "Meus Serviços",  route: "/Pages/Seus_servicos_prestador"        }, // ← rota adicionada
  { icon: "calendar",  label: "Agenda", route: "/Pages/Tela_Calendario_Prestador" },
  { icon: "chat",      label: "Chat"                                                            },
];

function StatusDropdown({ isOnline, onChange, onClose }) {
  return (
    <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", width: 270, backgroundColor: "white", borderRadius: 14, boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 200, overflow: "hidden", border: "1px solid #f1f5f9" }}>
      {[
        { online: true,  title: "Ativo para novos serviços", sub: "Você está visível para receber solicitações." },
        { online: false, title: "Ficar offline",             sub: "Você não receberá novas solicitações." },
      ].map(opt => (
        <div key={String(opt.online)}
          onClick={() => { onChange(opt.online); onClose(); }}
          style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", cursor: "pointer", backgroundColor: isOnline === opt.online ? "#f8fafc" : "white" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f1f5f9"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = isOnline === opt.online ? "#f8fafc" : "white"}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: opt.online ? "#22c55e" : "#94a3b8", flexShrink: 0, marginTop: 4 }} />
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0d1b3e" }}>{opt.title}</p>
            <p style={{ margin: "2px 0 0", fontSize: 11.5, color: "#64748b" }}>{opt.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Tela_inicio_prestador() {
  const router = useRouter();
  const [activeNav, setActiveNav]           = useState(2);
  const [notifOpen, setNotifOpen]           = useState(false);
  const [statusOpen, setStatusOpen]         = useState(false);
  const [isOnline, setIsOnline]             = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifRef  = useRef(null);
  const statusRef = useRef(null);

  const handleNavClick = (i) => {
    const item = navItems[i];
    if (item.route) {
      router.push(item.route);
    } else {
      setActiveNav(i);
    }
  };
>>>>>>> bbd136c22832df1cac739ce4c8ace8c00814fd4b

  // ── Trava o body nesta tela com layout fixo ──
  useEffect(() => {
    document.body.classList.add("layout-fixed");
    return () => document.body.classList.remove("layout-fixed");
  }, []);

<<<<<<< HEAD
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f9fafb",
      }}
    >
      <SidebarPrestador />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
          marginLeft: 216,
        }}
      >
        <TopBarPrestador
          title="Olá, João! 👋"
          subtitle="Aqui está o resumo do seu dia!"
        />
=======
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current  && !notifRef.current.contains(e.target))  setNotifOpen(false);
      if (statusRef.current && !statusRef.current.contains(e.target)) setStatusOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div style={{
      display: "flex",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f9fafb",
    }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: 200,
        minWidth: 200,
        height: "100%",
        backgroundColor: "#0d1b3e",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        zIndex: 30,
        boxShadow: "4px 0 24px rgba(0,0,0,0.25)",
      }}>

        {/* Logo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "14px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          <img src="/Logo_branca.png" alt="FazUno" style={{ width: 100, height: "auto", objectFit: "contain" }} />
        </div>

        {/* Nav — itens agrupados no topo, sem space-evenly */}
        <nav style={{
          flex: 1,
          padding: "10px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 2,           /* ← espaço fixo e pequeno entre itens */
          alignItems: "stretch",
          overflowY: "auto",
        }}>
          {navItems.map((item, i) => {
            const active = activeNav === i;
            return (
              <button
                key={i}
                onClick={() => handleNavClick(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "9px 10px",   /* ← padding vertical menor */
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                  backgroundColor: active ? "rgba(255,255,255,0.15)" : "transparent",
                  color: active ? "white" : "rgba(255,255,255,0.55)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <span style={{ flexShrink: 0 }}>
                  <Icon name={item.icon} size={16} color={active ? "white" : "rgba(255,255,255,0.5)"} strokeWidth={2} />
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.3, flex: 1 }}>{item.label}</span>
                {item.badge != null && (
                  <span style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: 9999,
                    padding: "1px 6px",
                    lineHeight: 1.6,
                    flexShrink: 0,
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* ── TOPBAR ── */}
        <div style={{
          height: 56,
          backgroundColor: "#0d1b3e",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          flexShrink: 0,
          zIndex: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        }}>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>Olá, João! 👋</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Aqui está o resumo do seu dia!</span>
          </div>

          <div ref={statusRef} style={{ position: "relative" }}>
            <button
              onClick={() => setStatusOpen(o => !o)}
              style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.1)", border: "none", borderRadius: 999, padding: "6px 14px", cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.16)"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
            >
              <span style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: isOnline ? "#22c55e" : "#94a3b8" }} />
              <span style={{ color: "white", fontSize: 13, fontWeight: 500 }}>{isOnline ? "Ativo para novos serviços" : "Offline"}</span>
              <Icon name="chevDown" size={13} color="rgba(255,255,255,0.5)" />
            </button>
            {statusOpen && <StatusDropdown isOnline={isOnline} onChange={setIsOnline} onClose={() => setStatusOpen(false)} />}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div ref={notifRef} style={{ position: "relative" }}>
              <button
                onClick={() => setNotifOpen(o => !o)}
                style={{ position: "relative", padding: 8, borderRadius: 8, border: "none", backgroundColor: notifOpen ? "rgba(255,255,255,0.15)" : "transparent", cursor: "pointer" }}
                onMouseEnter={e => { if (!notifOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { if (!notifOpen) e.currentTarget.style.backgroundColor = notifOpen ? "rgba(255,255,255,0.15)" : "transparent"; }}
              >
                <Icon name="bell" size={20} color="rgba(255,255,255,0.75)" />
                <span style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, borderRadius: "50%", backgroundColor: "#f97316", color: "white", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>5</span>
              </button>
              {notifOpen && (
                <div style={{ position: "fixed", top: 60, right: 20, zIndex: 999 }}>
                  <NotificacoesPrestador onClose={() => setNotifOpen(false)} />
                </div>
              )}
            </div>

            <button
              style={{ padding: 8, borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
            ><Icon name="help" size={20} color="rgba(255,255,255,0.75)" /></button>

            <button
              style={{ padding: 8, borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
            ><Icon name="settings" size={20} color="rgba(255,255,255,0.75)" /></button>

            <div style={{ width: 1, height: 28, backgroundColor: "rgba(255,255,255,0.2)", margin: "0 8px" }} />

            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #f97316", backgroundColor: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="user" size={16} color="white" strokeWidth={2} />
              </div>
              <div>
                <div style={{ color: "white", fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>João Silva</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, lineHeight: 1.2 }}>Prestador</div>
              </div>
              <Icon name="chevDown" size={14} color="rgba(255,255,255,0.4)" />
            </div>
          </div>
        </div>

        {/* ── MOBILE DRAWER ── */}
        {mobileMenuOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)" }} onClick={() => setMobileMenuOpen(false)} />
            <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 280, backgroundColor: "#0d1b3e", padding: 24, boxShadow: "0 0 40px rgba(0,0,0,0.4)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Icon name="xIcon" size={20} color="rgba(255,255,255,0.6)" strokeWidth={2.5} />
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {navItems.map((item, i) => (
                  <button key={i} onClick={() => { handleNavClick(i); setMobileMenuOpen(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", borderRadius: 10, border: "none", cursor: "pointer", backgroundColor: activeNav === i ? "rgba(255,255,255,0.15)" : "transparent", color: activeNav === i ? "white" : "rgba(255,255,255,0.55)", fontSize: 12.5, fontWeight: 500, width: "100%" }}
                  >
                    <Icon name={item.icon} size={16} color={activeNav === i ? "white" : "rgba(255,255,255,0.5)"} strokeWidth={2} />
                    <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
                    {item.badge != null && (
                      <span style={{ backgroundColor: "#ef4444", color: "white", fontSize: 10, fontWeight: 700, borderRadius: 999, padding: "1px 6px" }}>{item.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
>>>>>>> bbd136c22832df1cac739ce4c8ace8c00814fd4b

        {/* ── CONTEÚDO PRINCIPAL ── */}
        <main style={{ flex: 1, overflowY: "auto", backgroundColor: "#f9fafb" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px" }}>
<<<<<<< HEAD

            {/* ═══ STAT CARDS ═══ */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
              {statCards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
                <div
                  key={label}
                  style={{
                    background: "#ffffff",
                    border: "0.5px solid rgba(0,0,0,0.12)",
                    borderRadius: 12,
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    height: 72,
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: iconBg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} color={iconColor} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {label}
                    </p>
                    <p style={{ fontSize: 22, fontWeight: 500, color: "#111827", margin: 0, lineHeight: 1 }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ═══ SOLICITAÇÕES RECEBIDAS + OPORTUNIDADES ═══ */}
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>

              {/* Solicitações Recebidas */}
              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid rgba(0,0,0,0.10)", padding: "20px 24px", flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Solicitações recebidas</span>
                  <a href="#" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none" }}>Ver todas</a>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {solicitacoes.map((s) => {
                    const st = statusStyle[s.status];
                    return (
                      <div key={s.nome} style={{ display: "grid", gridTemplateColumns: "42px 1fr 110px 160px 90px 12px", alignItems: "center", gap: 12, cursor: "pointer" }}>
                        <div style={{ width: 42, height: 42, borderRadius: "50%", background: s.avatarBg, color: s.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13 }}>
                          {s.avatar}
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontWeight: 600, fontSize: 14, color: "#111827", margin: 0 }}>{s.nome}</p>
                          <p style={{ fontSize: 13, color: "#6b7280", margin: "1px 0" }}>{s.servico}</p>
                          <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, display: "flex", alignItems: "center", gap: 3 }}>
                            <FaMapMarkerAlt size={10} /> {s.local}
                          </p>
                        </div>

                        <span style={{ fontSize: 13, color: "#6b7280", textAlign: "center" }}>{s.horario}</span>

                        <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: st.bg, color: st.color, textAlign: "center", whiteSpace: "nowrap" }}>
                          {s.status}
                        </span>

                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontWeight: 600, fontSize: 14, color: "#111827", margin: 0 }}>{s.valor}</p>
                          <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Valor estimado</p>
                        </div>

                        <FaChevronRight size={12} color="#9ca3af" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Oportunidades para você */}
              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid rgba(0,0,0,0.10)", padding: "20px 24px", width: 380, flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Oportunidades para você</span>
                  <Link href="/pags/Oportunidades" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none" }}>
                    Ver todas
                  </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {oportunidades.map((op) => {
                    const OpIcon = op.icon;
                    return (
                      <div key={op.titulo} style={{ border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: "12px", cursor: "pointer" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: op.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                          <OpIcon size={18} color={op.iconColor} />
                        </div>
                        <p style={{ fontWeight: 600, fontSize: 12, color: "#111827", margin: "0 0 2px" }}>{op.titulo}</p>
                        <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 6px" }}>{op.local}</p>
                        <p style={{ fontWeight: 700, fontSize: 13, color: "#059669", margin: "0 0 4px" }}>Preço a combinar</p>
                        <p style={{ fontSize: 11, color: "#6b7280", margin: 0, display: "flex", alignItems: "center", gap: 3 }}>
                          <FaMapMarkerAlt size={10} /> {op.distancia}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ═══ AGENDA DE HOJE + SEUS SERVIÇOS ═══ */}
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>

              {/* Agenda de hoje */}
              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid rgba(0,0,0,0.10)", padding: "20px 24px", width: 380, flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Agenda de hoje</span>
                  <a href="#" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none" }}>Ver agenda completa</a>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {agendamentos.map((a) => (
                    <div key={a.horario} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", minWidth: 40, paddingTop: 2 }}>{a.horario}</span>

                      <div style={{ width: 3, borderRadius: 4, background: "#3b82f6", alignSelf: "stretch", flexShrink: 0 }} />

                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, fontSize: 14, color: "#111827", margin: "0 0 2px" }}>{a.titulo}</p>
                        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 1px" }}>Cliente: {a.cliente}</p>
                        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{a.local}</p>
                      </div>

                      <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: "#d1fae5", color: "#065f46", flexShrink: 0 }}>
                        Agendado
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seus Serviços */}
              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid rgba(0,0,0,0.10)", padding: "20px 24px", flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Seus serviços</span>
                    <span style={{ fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 20, background: "#e0e7ff", color: "#4338ca" }}>
                      12 serviços cadastrados
                    </span>
                  </div>
                  <button
                    onClick={() => router.push("/Pages/Tela_CadastroServico_Prestador")}
                    style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#fff", background: "#06104A", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer" }}
                  >
                    <FaPlus size={11} /> Adicionar serviço
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                  {servicos.map((s) => (
                    <div key={s.titulo} style={{ border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" }}>
                      <img src={s.imagem} alt={s.titulo} style={{ width: "100%", height: 90, objectFit: "cover" }} />
                      <div style={{ padding: "10px 10px 8px" }}>
                        <p style={{ fontWeight: 600, fontSize: 13, color: "#111827", margin: "0 0 2px" }}>{s.titulo}</p>
                        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>{s.categoria}</p>
                        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 8px" }}>{s.preco}</p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: "#d1fae5", color: "#065f46" }}>
                            Ativo
                          </span>
                          <FaEllipsisV size={12} color="#9ca3af" style={{ cursor: "pointer" }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <a href="#" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>Ver todos os serviços →</a>
                </div>
              </div>
            </div>

          </div>
        </main>
=======
            <StatCards />
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              <SolicitacoesRecebidas />
              <OportunidadesParaVoce />
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              <AgendaDeHoje />
              <SeusServicos />
            </div>
          </div>
        </main>

>>>>>>> bbd136c22832df1cac739ce4c8ace8c00814fd4b
      </div>
    </div>
  );
}