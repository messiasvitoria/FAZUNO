"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// ─── ICON COMPONENT ──────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    home:      ["M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z","M9 21V12h6v9"],
    plus:      ["M12 5v14","M5 12h14"],
    list:      ["M8 6h13","M8 12h13","M8 18h13","M3 6h.01","M3 12h.01","M3 18h.01"],
    chat:      ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
    bell:      ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"],
    help:      ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3","M12 17h.01"],
    settings:  ["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
    chevDown:  ["M6 9l6 6 6-6"],
    chevRight: ["M9 18l6-6-6-6"],
    mapPin:    ["M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z","M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0"],
    checkCircle:["M22 11.08V12a10 10 0 11-5.93-9.14","M22 4L12 14.01l-3-3"],
    search:    ["M11 11m-8 0a8 8 0 1016 0 8 8 0 00-16 0","M21 21l-4.35-4.35"],
    user:      ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 7m-4 0a4 4 0 108 0 4 4 0 00-8 0"],
    users:     ["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2","M9 7m-4 0a4 4 0 108 0 4 4 0 00-8 0","M23 21v-2a4 4 0 00-3-3.87","M16 3.13a4 4 0 010 7.75"],
    sliders:   ["M4 21v-7","M4 10V3","M12 21v-9","M12 8V3","M20 21v-5","M20 12V3","M1 14h6","M9 8h6","M17 16h6"],
    zap:       ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
    droplet:   ["M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"],
    wrench2:   ["M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"],
    heartIcon: ["M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"],
    broomCat:  ["M2 19.5A2.5 2.5 0 014.5 17h15","M4.5 17l1.5-9h12l1.5 9","M9 11v6","M12 11v6","M15 11v6"],
    homeIcon:  ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z","M9 22V12h6v10"],
    scissorsIcon:["M6 9a3 3 0 100-6 3 3 0 000 6z","M6 15a3 3 0 100 6 3 3 0 000-6z","M20 4L8.12 15.88","M14.47 14.48L20 20","M8.12 8.12L12 12"],
    leafIcon:  ["M17 8C8 10 5.9 16.17 3.82 19.56A1 1 0 004.72 21C11.81 17.44 14.83 12.66 17 8zm0 0c0 9-9 15-17 7"],
    carIcon:   ["M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2","M17 17m-2 0a2 2 0 104 0 2 2 0 00-4 0","M7 17m-2 0a2 2 0 104 0 2 2 0 00-4 0"],
    monitorIcon:["M20 3H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2z","M8 21h8","M12 17v4"],
    pawIcon:   ["M11 4a2 2 0 114 0","M18 8a2 2 0 114 0","M18 16a2 2 0 114 0","M4 12a2 2 0 114 0","M9 10a5 5 0 015 5v3.5a3.5 3.5 0 01-7 0V15a5 5 0 015-5z"],
    bookIcon:  ["M4 19.5A2.5 2.5 0 016.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"],
    xIcon:     ["M18 6L6 18","M6 6l12 12"],
    externalLink:["M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6","M15 3h6v6","M10 14L21 3"],
    clock:     ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M12 6v6l4 2"],
    grid:      null,
    star:      null,
  };

  if (name === "star") {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  }
  if (name === "grid") {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
  }
  const d = paths[name];
  if (!d || d.length === 0) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p}/>)}
    </svg>
  );
}

// ─── HOME PAGE SUB-COMPONENTS ────────────────────────────────────────────────
function CategoryCard({ cat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ width: "60%", aspectRatio: "1", borderRadius: 12, backgroundColor: "white", border: hovered ? "2px solid #f97316" : "2px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", transform: hovered ? "translateY(-5px)" : "translateY(0)", boxShadow: hovered ? "0 8px 24px rgba(249,115,22,0.22)" : "0 2px 8px rgba(0,0,0,0.06)", transition: "all 0.25s ease" }}>
        <Icon name={cat.icon} size={26} color="#0d1b3e" strokeWidth={1.7} />
      </div>
      <span style={{ fontSize: 12, color: "#4b5563", fontWeight: 500, textAlign: "center", lineHeight: 1.2 }}>{cat.label}</span>
    </div>
  );
}

function ServiceCard({ svc }) {
  const [hovered, setHovered] = useState(false);
  const images = { faxina: "/foto_faxineira1.avif", eletrica: "/foto_eletricista.jpg", encanador: "/foto_encanador.jpg", moveis: "/foto_montador_moveis.avif", pintora: "/foto_pintora.avif" };
  const iconToKey = { "broomCat": "faxina", "zap": "eletrica", "droplet": "encanador", "wrench2": "moveis", "heartIcon": "pintora" };
  return (
    <div style={{ backgroundColor: "white", borderRadius: 18, overflow: "hidden", boxShadow: hovered ? "0 0 0 2px #f97316, 0 12px 28px rgba(249,115,22,0.18)" : "0 2px 12px rgba(0,0,0,0.08)", border: `1.5px solid ${hovered ? "#f97316" : "transparent"}`, transform: hovered ? "translateY(-6px)" : "translateY(0)", transition: "all 0.25s ease", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ height: 120, overflow: "hidden", position: "relative" }}>
        <img src={images[iconToKey[svc.icon] || "faxina"]} alt={svc.label} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} onError={e => { e.target.style.display = "none"; e.target.parentNode.style.background = `linear-gradient(135deg, ${svc.bg} 0%, ${svc.color}22 100%)`; }} />
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "white", border: "1.5px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name={svc.icon} size={12} color="#0d1b3e" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>{svc.label}</span>
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>A partir de {svc.price}</p>
      </div>
    </div>
  );
}

// ─── NOTIF DETAIL MODAL ───────────────────────────────────────────────────────
function NotifDetailModal({ notif, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const relatedContent = {
    doc:     { label: "Ver Solicitação",  description: "Acesse os detalhes completos desta solicitação.", action: "Abrir solicitação", color: "#3b82f6" },
    chat:    { label: "Ir para o Chat",   description: "Visualize a conversa completa e responda ao prestador.", action: "Abrir conversa", color: "#22c55e" },
    payment: { label: "Ver Pagamento",    description: "Acesse os detalhes da transação e comprovante.", action: "Ver comprovante", color: "#8b5cf6" },
    star:    { label: "Avaliar Serviço",  description: "Compartilhe sua experiência avaliando o profissional.", action: "Avaliar agora", color: "#f59e0b" },
    eye:     { label: "Ver Solicitação",  description: "O prestador visualizou sua solicitação. Acompanhe o status.", action: "Acompanhar solicitação", color: "#f97316" },
  };
  const content = relatedContent[notif.icon] || relatedContent.doc;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)" }}>
      <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.95) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: "white", borderRadius: 24, width: 460, maxWidth: "90vw", boxShadow: "0 32px 80px rgba(0,0,0,0.22)", overflow: "hidden", animation: "modalIn 0.2s ease" }}>
        <div style={{ backgroundColor: notif.iconBg, padding: "24px 24px 20px", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.08)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon name="xIcon" size={16} color="#374151" strokeWidth={2.5} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
              {notif.icon === "doc"     && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={notif.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>}
              {notif.icon === "chat"    && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={notif.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>}
              {notif.icon === "payment" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={notif.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
              {notif.icon === "star"    && <svg width="24" height="24" viewBox="0 0 24 24" fill={notif.iconColor} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
              {notif.icon === "eye"     && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={notif.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
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
            <button onClick={onClose} style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "white", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}>Fechar</button>
            <button onClick={onClose} style={{ flex: 2, padding: "11px 0", borderRadius: 12, border: "none", backgroundColor: content.color, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              {content.action} <Icon name="externalLink" size={14} color="white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const categories = [
  { icon: "heartIcon",    label: "Saúde"      },
  { icon: "broomCat",     label: "Limpeza"    },
  { icon: "wrench2",      label: "Reparos"    },
  { icon: "homeIcon",     label: "Reformas"   },
  { icon: "scissorsIcon", label: "Beleza"     },
  { icon: "leafIcon",     label: "Jardinagem" },
  { icon: "carIcon",      label: "Automotivo" },
  { icon: "monitorIcon",  label: "Tecnologia" },
  { icon: "pawIcon",      label: "Pet"        },
  { icon: "bookIcon",     label: "Educação"   },
];

const professionals = [
  { name: "Ana Silva",     role: "Faxineira",   rating: 4.9, reviews: 120, distance: "2 km de você",   photo: "/foto_faxineira2.avif" },
  { name: "Carlos Lima",   role: "Eletricista", rating: 4.8, reviews: 98,  distance: "3 km de você",   photo: "/foto_eletricista2.jpg" },
  { name: "Juliana Costa", role: "Cuidadora",   rating: 4.9, reviews: 76,  distance: "1,5 km de você", photo: "/foto_cuidadora.jpg" },
  { name: "Roberto Souza", role: "Encanador",   rating: 4.7, reviews: 143, distance: "4 km de você",   photo: "/foto_encanador2.jpg" },
  { name: "Fernanda Reis", role: "Pintora",     rating: 5.0, reviews: 55,  distance: "2,5 km de você", photo: "/foto_pintora2.avif" },
];

const services = [
  { icon: "broomCat",  label: "Faxina Residencial", price: "R$ 120", color: "#22c55e", bg: "#dcfce7" },
  { icon: "zap",       label: "Eletricista",         price: "R$ 80",  color: "#eab308", bg: "#fef9c3" },
  { icon: "droplet",   label: "Encanador",           price: "R$ 90",  color: "#3b82f6", bg: "#dbeafe" },
  { icon: "wrench2",   label: "Montagem de Móveis",  price: "R$ 70",  color: "#f97316", bg: "#ffedd5" },
  { icon: "heartIcon", label: "Pintora",             price: "R$ 150", color: "#8b5cf6", bg: "#ede9fe" },
];

const reviews = [
  { name: "Marcos A.",   role: "Faxina Residencial", text: "Profissional excelente, chegou no horário e fez um ótimo trabalho. Super recomendo!", rating: 5, photo: "/homem2.avif" },
  { name: "Patrícia M.", role: "Eletricista",         text: "Atendimento rápido e muito atencioso. Resolveu meu problema em minutos!",            rating: 5, photo: "/mulher 1.avif" },
  { name: "Luciana S.",  role: "Cuidadora",           text: "Ótima profissional, cuidadosa e muito dedicada. Minha mãe adorou!",                  rating: 5, photo: "/mulher2.jpg" },
  { name: "Felipe R.",   role: "Encanador",           text: "Resolveu o problema rapidinho, preço justo e muito educado. Recomendo!",              rating: 5, photo: "/homem3.avif" },
];

const navItems = [
  { icon: "home", label: "Início",                    route: null },
  { icon: "plus", label: "Abrir novas solicitações",  route: null },
  { icon: "list", label: "Minhas solicitações",       route: "/Pages/Minhas_Solicitacoes" },
  { icon: "chat", label: "Chat",                      route: null },
];

const filters = ["Todas", "Não lidas", "Solicitações", "Serviços", "Pagamentos"];
const filterKey = (label, index) => {
  if (index === 0) return "todas";
  if (index === 1) return "não_lidas";
  return label.toLowerCase();
};

const allNotifs = [
  { id: 1,  icon: "doc",     title: "Serviço Aceito",                      desc: "O prestador João Silva aceitou sua solicitação de Instalação de Ar Condicionado.",  time: "Há 5 min",       sortOrder: 1,  unread: true,  category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 2,  icon: "chat",    title: "Nova Mensagem",                        desc: "Você recebeu uma nova mensagem do prestador João Silva.",                           time: "Há 20 min",      sortOrder: 2,  unread: true,  category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 3,  icon: "payment", title: "Pagamento Aprovado",                   desc: "Seu pagamento de R$ 350,00 foi aprovado com sucesso.",                             time: "Há 1 hora",      sortOrder: 3,  unread: true,  category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
  { id: 4,  icon: "star",    title: "Avalie seu Serviço",                   desc: "Seu serviço de Limpeza Residencial foi concluído. Conte como foi sua experiência!", time: "Ontem às 10:30", sortOrder: 6,  unread: false, category: "serviços",     iconColor: "#f59e0b", iconBg: "#fef3c7" },
  { id: 5,  icon: "eye",     title: "Prestador Visualizou sua Solicitação", desc: "O prestador Maria Santos visualizou sua solicitação de Pintura Residencial.",      time: "Ontem às 09:15", sortOrder: 7,  unread: false, category: "solicitações", iconColor: "#f97316", iconBg: "#ffedd5" },
  { id: 6,  icon: "doc",     title: "Serviço Concluído",                    desc: "Carlos Lima marcou o serviço de Reparo Elétrico como concluído. Tudo certo?",       time: "Ontem às 14:00", sortOrder: 5,  unread: false, category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 7,  icon: "chat",    title: "Nova Mensagem",                        desc: "Ana Faxineira enviou uma mensagem: 'Posso chegar às 8h amanhã?'",                   time: "Há 2 dias",      sortOrder: 8,  unread: false, category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 8,  icon: "payment", title: "Cobrança Gerada",                      desc: "Foi gerada uma cobrança de R$ 180,00 pelo serviço de Encanamento.",               time: "Há 2 dias",      sortOrder: 9,  unread: false, category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
  { id: 9,  icon: "star",    title: "Avalie seu Serviço",                   desc: "Seu serviço de Instalação de Prateleiras foi concluído.",                           time: "Há 3 dias",      sortOrder: 10, unread: false, category: "serviços",     iconColor: "#f59e0b", iconBg: "#fef3c7" },
  { id: 10, icon: "doc",     title: "Novo Prestador Disponível",            desc: "Roberto Souza está disponível para sua solicitação de Pintura de Quarto.",          time: "Há 3 dias",      sortOrder: 11, unread: false, category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 11, icon: "chat",    title: "Nova Mensagem",                        desc: "Fernanda Pintora enviou fotos do trabalho finalizado para sua aprovação.",          time: "Há 4 dias",      sortOrder: 12, unread: false, category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 12, icon: "payment", title: "Reembolso Processado",                 desc: "Seu reembolso de R$ 90,00 foi processado e será creditado em até 5 dias úteis.",  time: "Há 5 dias",      sortOrder: 13, unread: false, category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
].sort((a, b) => a.sortOrder - b.sortOrder);

function NotifIcon({ icon, iconColor }) {
  if (icon === "doc")     return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
  if (icon === "chat")    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
  if (icon === "payment") return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
  if (icon === "star")    return <svg width="20" height="20" viewBox="0 0 24 24" fill={iconColor} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  if (icon === "eye")     return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
  return null;
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <div className="fazuno-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", backgroundColor: "#f9fafb" }}>
      {/* HERO */}
      <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(130deg, #0d1b3e 0%, #1e3a8a 55%, #1e40af 100%)" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(ellipse at 10% 50%, rgba(249,115,22,0.18) 0%, transparent 50%)" }}/>
        <div style={{ display: "flex", alignItems: "center", padding: "32px 40px", gap: 0, position: "relative", boxSizing: "border-box", minHeight: 220 }}>
          <div style={{ maxWidth: 380, flexShrink: 0, zIndex: 2 }}>
            <h1 style={{ color: "white", fontSize: 28, fontWeight: 800, lineHeight: 1.25, margin: "0 0 12px" }}>
              Tudo o que sua casa<br/>precisa em um <span style={{ color: "#fb923c" }}>só lugar!</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px" }}>
              Encontre profissionais confiáveis para serviços residenciais, saúde, beleza e muito mais.
            </p>
            <button style={{ backgroundColor: "#f97316", color: "white", fontWeight: 700, fontSize: 15, padding: "13px 36px", borderRadius: 9999, border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(249,115,22,0.45)", transition: "background 0.2s, transform 0.1s" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#ea6c0a"; e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#f97316"; e.currentTarget.style.transform = "scale(1)"; }}
            >Solicitar serviço</button>
          </div>
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "58%", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, #1e3a8a, transparent)", zIndex: 1 }}/>
            <img src="/imagem_profissionais.avif" alt="Profissionais FazUno" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(8,18,38,0.65)", display: "flex", justifyContent: "space-around", padding: "16px 40px", flexWrap: "wrap", gap: 16, position: "relative", zIndex: 2 }}>
          {[
            { icon: "user",  val: "2.500+",   lbl: "Clientes atendidos", yellow: false },
            { icon: "users", val: "1.200+",   lbl: "Profissionais",      yellow: false },
            { icon: "star",  val: "4,9",      lbl: "Avaliação média",    yellow: true  },
            { icon: "grid",  val: "Diversas", lbl: "categorias",         yellow: false },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, color: "white" }}>
              <Icon name={s.icon} size={22} color={s.yellow ? "#f59e0b" : "rgba(255,255,255,0.8)"} strokeWidth={s.yellow ? 0 : 1.8} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{s.lbl}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "28px 40px", boxSizing: "border-box" }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>Olá, Isaac! </h2>
          <p style={{ fontSize: 14, color: "#9ca3af", margin: "4px 0 0" }}>O que você precisa hoje?</p>
        </div>
        <div style={{ position: "relative", marginBottom: 32 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
            <Icon name="search" size={18} color="#9ca3af" />
          </span>
          <input placeholder="Buscar eletricista, faxina, professor, encanador..."
            style={{ width: "100%", boxSizing: "border-box", paddingLeft: 44, paddingRight: 50, paddingTop: 12, paddingBottom: 12, fontSize: 14, color: "#374151", backgroundColor: "white", border: "1.5px solid #e5e7eb", borderRadius: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", outline: "none", transition: "border 0.2s, box-shadow 0.2s" }}
            onFocus={e => { e.target.style.borderColor = "#f97316"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.15)"; }}
            onBlur={e => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}
          />
          <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
            <Icon name="sliders" size={18} color="#9ca3af" />
          </span>
        </div>

        <section style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>Categorias</h3>
            <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 600, color: "#f97316", background: "none", border: "none", cursor: "pointer" }}>Ver todas <Icon name="chevRight" size={14} color="#f97316" /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 12 }}>
            {categories.map((cat, i) => <CategoryCard key={i} cat={cat} />)}
          </div>
        </section>

        <section style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>Profissionais perto de você</h3>
            <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 600, color: "#f97316", background: "none", border: "none", cursor: "pointer" }}>Ver todas <Icon name="chevRight" size={14} color="#f97316" /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            {professionals.map((pro, i) => (
              <div key={i}
                style={{ backgroundColor: "white", borderRadius: 18, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1.5px solid transparent", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 0 0 2px #f97316, 0 12px 28px rgba(249,115,22,0.18)"; e.currentTarget.style.borderColor = "#f97316"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"; e.currentTarget.style.borderColor = "transparent"; }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: "2px solid #fed7aa", flexShrink: 0 }}>
                    <img src={pro.photo} alt={pro.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                  </div>
                </div>
                <p style={{ fontWeight: 700, fontSize: 13, color: "#111827", textAlign: "center", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pro.name}</p>
                <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", margin: "0 0 8px" }}>{pro.role}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 4 }}>
                  <Icon name="star" size={13} color="#f59e0b" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{pro.rating}</span>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>({pro.reviews})</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 4 }}>
                  <Icon name="mapPin" size={12} color="#9ca3af" />
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{pro.distance}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 12 }}>
                  <Icon name="checkCircle" size={13} color="#22c55e" />
                  <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 500 }}>Verificada</span>
                </div>
                <button style={{ width: "100%", backgroundColor: "#0d1b3e", color: "white", fontWeight: 700, fontSize: 12, padding: "9px 0", borderRadius: 12, border: "none", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f97316"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0d1b3e"}
                >Contratar</button>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>Serviços mais solicitados</h3>
            <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 600, color: "#f97316", background: "none", border: "none", cursor: "pointer" }}>Ver todos <Icon name="chevRight" size={14} color="#f97316" /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            {services.map((svc, i) => <ServiceCard key={i} svc={svc} />)}
          </div>
        </section>

        <section style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>O que nossos clientes dizem</h3>
            <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 600, color: "#f97316", background: "none", border: "none", cursor: "pointer" }}>Ver todas <Icon name="chevRight" size={14} color="#f97316" /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }}>
            {reviews.map((r, i) => (
              <div key={i}
                style={{ backgroundColor: "white", borderRadius: 18, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1.5px solid transparent", cursor: "pointer", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 0 0 2px #f97316, 0 12px 28px rgba(249,115,22,0.15)"; e.currentTarget.style.borderColor = "#f97316"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "transparent"; }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                  {Array.from({ length: r.rating }).map((_, j) => <Icon key={j} name="star" size={15} color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.6, margin: "0 0 12px" }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12, borderTop: "1px solid #f9fafb" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1px solid #f3f4f6" }}>
                    <img src={r.photo} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#111827", margin: 0 }}>{r.name}</p>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer style={{ backgroundColor: "#0d1b3e", color: "white", marginTop: 16 }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/Logo_branca.png" alt="Fazuno" height="40" />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>© 2026 FazUno. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function TelainicialCliente() {
  const router = useRouter();
  const [activeNav, setActiveNav]         = useState(0);
  const [notifOpen, setNotifOpen]         = useState(false);
  const [notifFilter, setNotifFilter]     = useState("todas");
  const [showAllNotifs, setShowAllNotifs] = useState(false);
  const [notifs, setNotifs]               = useState(allNotifs);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const notifRef = useRef(null);

  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  const baseNotifs = notifFilter === "todas"
    ? notifs
    : notifFilter === "não_lidas"
    ? notifs.filter(n => n.unread)
    : notifs.filter(n => n.category === notifFilter);
  const filteredNotifs = showAllNotifs ? baseNotifs : baseNotifs.slice(0, 5);
  const unreadCount = notifs.filter(n => n.unread).length;

  const unreadForFilter = (label, index) => {
    if (index === 0 || index === 1) return notifs.filter(n => n.unread).length;
    return notifs.filter(n => n.unread && n.category === label.toLowerCase()).length;
  };

  const handleFilterClick = (label, index) => {
    const key = filterKey(label, index);
    setNotifFilter(key);
    setShowAllNotifs(false);
    setNotifs(prev => prev.map(n => {
      if (index === 0 || index === 1) return { ...n, unread: false };
      return n.category === label.toLowerCase() ? { ...n, unread: false } : n;
    }));
  };

  const handleNotifClick = (n) => {
    setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, unread: false } : x));
    setSelectedNotif(n);
  };

  // ── Navegação do menu lateral ──
  const handleNavClick = (index) => {
    const item = navItems[index];
    if (item.route) {
      router.push(item.route);
    } else {
      setActiveNav(index);
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = ".fazuno-scroll::-webkit-scrollbar{display:none}.fazuno-scroll{-ms-overflow-style:none;scrollbar-width:none}";
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", overflow: "hidden", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f9fafb" }}>

      {selectedNotif && <NotifDetailModal notif={selectedNotif} onClose={() => setSelectedNotif(null)} />}

      {/* SIDEBAR */}
      <div style={{ width: 180, minWidth: 180, height: "100%", backgroundColor: "#0d1b3e", display: "flex", flexDirection: "column", flexShrink: 0, zIndex: 30, boxShadow: "4px 0 24px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <img src="/Logo_branca.png" alt="FazUno" style={{ width: 90, height: "auto" }} />
          </div>
        </div>
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item, i) => (
            <button key={i} onClick={() => handleNavClick(i)}
              style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 12, border: "none", cursor: "pointer", textAlign: "left", width: "100%", backgroundColor: activeNav === i && !item.route ? "rgba(255,255,255,0.15)" : "transparent", color: activeNav === i && !item.route ? "white" : "rgba(255,255,255,0.55)", transition: "all 0.2s" }}
              onMouseEnter={e => { if (!(activeNav === i && !item.route)) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { if (!(activeNav === i && !item.route)) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <span style={{ flexShrink: 0, marginTop: 1 }}>
                <Icon name={item.icon} size={17} color={activeNav === i && !item.route ? "white" : "rgba(255,255,255,0.5)"} strokeWidth={2} />
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* TOPBAR */}
        <div style={{ height: 56, backgroundColor: "#0d1b3e", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 20px", flexShrink: 0, zIndex: 20, gap: 4 }}>
          <div ref={notifRef} style={{ position: "relative" }}>
            <button onClick={() => setNotifOpen(o => !o)}
              style={{ position: "relative", padding: 8, borderRadius: 8, border: "none", backgroundColor: notifOpen ? "rgba(255,255,255,0.15)" : "transparent", cursor: "pointer" }}
              onMouseEnter={e => { if (!notifOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { if (!notifOpen) e.currentTarget.style.backgroundColor = notifOpen ? "rgba(255,255,255,0.15)" : "transparent"; }}
            >
              <Icon name="bell" size={20} color="rgba(255,255,255,0.75)" />
              {unreadCount > 0 && (
                <span style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, borderRadius: "50%", backgroundColor: "#f97316", color: "white", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div style={{ position: "fixed", top: 60, right: 20, width: 420, backgroundColor: "white", borderRadius: 20, boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 999, overflow: "hidden", border: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px 12px" }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0d1b3e" }}>Notificações</h3>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon name="clock" size={11} color="#94a3b8" /> Ordenadas por data
                    </p>
                  </div>
                  <button onClick={() => setNotifs(prev => prev.map(n => ({ ...n, unread: false })))}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#f97316" }}>
                    Marcar todas como lidas
                  </button>
                </div>
                <div style={{ display: "flex", gap: 6, padding: "0 20px 12px", overflowX: "auto", scrollbarWidth: "none" }}>
                  {filters.map((f, i) => {
                    const key = filterKey(f, i);
                    const active = notifFilter === key;
                    const badge = unreadForFilter(f, i);
                    return (
                      <button key={f} onClick={() => handleFilterClick(f, i)}
                        style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 5, padding: "5px 14px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", backgroundColor: active ? "#0d1b3e" : "#f1f5f9", color: active ? "white" : "#64748b", transition: "all 0.2s" }}>
                        {f}
                        {badge > 0 && <span style={{ backgroundColor: "#f97316", color: "white", fontSize: 10, fontWeight: 700, borderRadius: 9999, padding: "1px 6px", lineHeight: 1.4 }}>{badge}</span>}
                      </button>
                    );
                  })}
                </div>
                <div style={{ maxHeight: showAllNotifs ? 520 : 380, overflowY: "auto", scrollbarWidth: "none", transition: "max-height 0.3s ease" }}>
                  {filteredNotifs.length === 0 ? (
                    <div style={{ padding: "32px 20px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>Nenhuma notificação aqui.</div>
                  ) : (
                    filteredNotifs.map((n, i) => (
                      <div key={n.id} onClick={() => handleNotifClick(n)}
                        style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 20px", borderTop: i > 0 ? "1px solid #f8fafc" : "none", backgroundColor: n.unread ? "#fafbff" : "white", cursor: "pointer", transition: "background 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f1f5f9"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = n.unread ? "#fafbff" : "white"}
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
                          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: n.unread ? "#f97316" : "#e2e8f0" }} />
                          <Icon name="chevRight" size={13} color="#cbd5e1" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div style={{ padding: "12px 20px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
                  <button onClick={() => setShowAllNotifs(v => !v)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#0d1b3e", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {showAllNotifs ? "Ver menos" : "Ver todas as notificações"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1b3e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={showAllNotifs ? "M18 15l-6-6-6 6" : "M9 18l6-6-6-6"} />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button style={{ padding: 8, borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
          ><Icon name="help" size={20} color="rgba(255,255,255,0.75)" /></button>
          <button style={{ padding: 8, borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
          ><Icon name="settings" size={20} color="rgba(255,255,255,0.75)" /></button>
          <div style={{ width: 1, height: 28, backgroundColor: "rgba(255,255,255,0.2)", margin: "0 8px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", border: "2px solid #f97316", flexShrink: 0 }}>
              <img src="/homem1.avif" alt="Isaac" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
            </div>
            <div>
              <div style={{ color: "white", fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>Isaac</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, lineHeight: 1.2 }}>Cliente</div>
            </div>
            <Icon name="chevDown" size={14} color="rgba(255,255,255,0.4)" />
          </div>
        </div>

        {/* PAGE CONTENT — sempre a HomePage aqui */}
        <HomePage />
      </div>
    </div>
  );
}