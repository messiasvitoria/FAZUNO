"use client";

import { useState, useEffect } from "react";

function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    home:         ["M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z","M9 21V12h6v9"],
    plus:         ["M12 5v14","M5 12h14"],
    list:         ["M8 6h13","M8 12h13","M8 18h13","M3 6h.01","M3 12h.01","M3 18h.01"],
    chat:         ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
    bell:         ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"],
    help:         ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3","M12 17h.01"],
    settings:     ["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
    chevDown:     ["M6 9l6 6 6-6"],
    chevRight:    ["M9 18l6-6-6-6"],
    mapPin:       ["M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z","M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0"],
    star:         [],
    checkCircle:  ["M22 11.08V12a10 10 0 11-5.93-9.14","M22 4L12 14.01l-3-3"],
    search:       ["M11 11m-8 0a8 8 0 1016 0 8 8 0 00-16 0","M21 21l-4.35-4.35"],
    user:         ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 7m-4 0a4 4 0 108 0 4 4 0 00-8 0"],
    users:        ["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2","M9 7m-4 0a4 4 0 108 0 4 4 0 00-8 0","M23 21v-2a4 4 0 00-3-3.87","M16 3.13a4 4 0 010 7.75"],
    grid:         [],
    sliders:      ["M4 21v-7","M4 10V3","M12 21v-9","M12 8V3","M20 21v-5","M20 12V3","M1 14h6","M9 8h6","M17 16h6"],
    zap:          ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
    droplet:      ["M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"],
    wrench2:      ["M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"],
    heartIcon:    ["M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"],
    broomCat:     ["M2 19.5A2.5 2.5 0 014.5 17h15","M4.5 17l1.5-9h12l1.5 9","M9 11v6","M12 11v6","M15 11v6"],
    homeIcon:     ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z","M9 22V12h6v10"],
    scissorsIcon: ["M6 9a3 3 0 100-6 3 3 0 000 6z","M6 15a3 3 0 100 6 3 3 0 000-6z","M20 4L8.12 15.88","M14.47 14.48L20 20","M8.12 8.12L12 12"],
    leafIcon:     ["M17 8C8 10 5.9 16.17 3.82 19.56A1 1 0 004.72 21C11.81 17.44 14.83 12.66 17 8zm0 0c0 9-9 15-17 7"],
    carIcon:      ["M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2","M17 17m-2 0a2 2 0 104 0 2 2 0 00-4 0","M7 17m-2 0a2 2 0 104 0 2 2 0 00-4 0"],
    monitorIcon:  ["M20 3H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2z","M8 21h8","M12 17v4"],
    pawIcon:      ["M11 4a2 2 0 114 0","M18 8a2 2 0 114 0","M18 16a2 2 0 114 0","M4 12a2 2 0 114 0","M9 10a5 5 0 015 5v3.5a3.5 3.5 0 01-7 0V15a5 5 0 015-5z"],
    bookIcon:     ["M4 19.5A2.5 2.5 0 016.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"],
    facebook:     ["M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"],
    instagram:    ["M2 2m4 0h12a4 4 0 014 4v12a4 4 0 01-4 4H6a4 4 0 01-4-4V6a4 4 0 014-4z","M12 8m-4 0a4 4 0 108 0 4 4 0 00-8 0","M17.5 6.5h.01"],
    youtube:      ["M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z","M9.75 15.02l5.75-3.02-5.75-3.02v6.04"],
  };

  if (name === "star") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    );
  }
  if (name === "grid") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    );
  }
  const d = paths[name];
  if (!d || d.length === 0) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p}/>)}
    </svg>
  );
}

function Avatar({ seed = 1, size = 40 }) {
  const configs = [
    { skin: "#FDBCB4", hair: "#2C1810", hairStyle: "long",   shirt: "#E8506A" },
    { skin: "#8D5524", hair: "#1A0A00", hairStyle: "short",  shirt: "#3B82F6" },
    { skin: "#F1C27D", hair: "#B5651D", hairStyle: "medium", shirt: "#22C55E" },
    { skin: "#C68642", hair: "#111",    hairStyle: "short",  shirt: "#8B5CF6" },
    { skin: "#FDDBB4", hair: "#A0522D", hairStyle: "long",   shirt: "#F97316" },
    { skin: "#6B3A2A", hair: "#0D0D0D", hairStyle: "short",  shirt: "#0EA5E9" },
    { skin: "#E8B89A", hair: "#4A2C2A", hairStyle: "medium", shirt: "#EC4899" },
    { skin: "#D4956A", hair: "#2C1810", hairStyle: "long",   shirt: "#F59E0B" },
  ];
  const c = configs[(seed - 1) % configs.length];
  const long = c.hairStyle === "long";
  const med  = c.hairStyle === "medium";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#f3f4f6"/>
      <ellipse cx="20" cy="38" rx="12" ry="9" fill={c.shirt}/>
      <rect x="17" y="26" width="6" height="6" rx="1" fill={c.skin}/>
      <ellipse cx="20" cy="20" rx="9" ry="10" fill={c.skin}/>
      <ellipse cx="20" cy="12" rx="9.5" ry="5" fill={c.hair}/>
      {long && <><rect x="10.5" y="12" width="3" height="14" rx="1.5" fill={c.hair}/><rect x="26.5" y="12" width="3" height="14" rx="1.5" fill={c.hair}/></>}
      {med  && <><rect x="10.5" y="12" width="3" height="8"  rx="1.5" fill={c.hair}/><rect x="26.5" y="12" width="3" height="8"  rx="1.5" fill={c.hair}/></>}
      <ellipse cx="16.5" cy="20" rx="1.3" ry="1.5" fill="#2C1810"/>
      <ellipse cx="23.5" cy="20" rx="1.3" ry="1.5" fill="#2C1810"/>
      <path d="M17 24 Q20 27 23 24" stroke="#2C1810" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function CategoryCard({ cat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: "60%", aspectRatio: "1", borderRadius: 12,
        backgroundColor: "white",
        border: hovered ? "2px solid #f97316" : "2px solid #e5e7eb",
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(249,115,22,0.22)" : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.25s ease",
      }}>
        <Icon name={cat.icon} size={26} color="#0d1b3e" strokeWidth={1.7} />
      </div>
      <span style={{ fontSize: 12, color: "#4b5563", fontWeight: 500, textAlign: "center", lineHeight: 1.2 }}>{cat.label}</span>
    </div>
  );
}

function ServiceCard({ svc }) {
  const [hovered, setHovered] = useState(false);
  const images = {
    faxina:    "/foto_faxineira1.avif",
    eletrica:  "/foto_eletricista.jpg",
    encanador: "/foto_encanador.jpg",
    moveis:    "/foto_montador_moveis.avif",
    pintora:   "/foto_pintora.avif",
  };
  const iconToKey = {
    "broomCat":  "faxina",
    "zap":       "eletrica",
    "droplet":   "encanador",
    "wrench2":   "moveis",
    "heartIcon": "pintora",
  };
  const imgKey = iconToKey[svc.icon] || "faxina";
  return (
    <div
      style={{
        backgroundColor: "white", borderRadius: 18, overflow: "hidden",
        boxShadow: hovered ? "0 0 0 2px #f97316, 0 12px 28px rgba(249,115,22,0.18)" : "0 2px 12px rgba(0,0,0,0.08)",
        border: `1.5px solid ${hovered ? "#f97316" : "transparent"}`,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.25s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: 120, overflow: "hidden", position: "relative" }}>
        <img
          src={images[imgKey]}
          alt={svc.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          onError={e => {
            e.target.style.display = "none";
            e.target.parentNode.style.background = `linear-gradient(135deg, ${svc.bg} 0%, ${svc.color}22 100%)`;
          }}
        />
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

const categories = [
  { icon: "heartIcon",    label: "Saúde",      color: "#22c55e", bg: "#dcfce7" },
  { icon: "broomCat",     label: "Limpeza",    color: "#3b82f6", bg: "#dbeafe" },
  { icon: "wrench2",      label: "Reparos",    color: "#f97316", bg: "#ffedd5" },
  { icon: "homeIcon",     label: "Reformas",   color: "#8b5cf6", bg: "#ede9fe" },
  { icon: "scissorsIcon", label: "Beleza",     color: "#ec4899", bg: "#fce7f3" },
  { icon: "leafIcon",     label: "Jardinagem", color: "#16a34a", bg: "#dcfce7" },
  { icon: "carIcon",      label: "Automotivo", color: "#6366f1", bg: "#e0e7ff" },
  { icon: "monitorIcon",  label: "Tecnologia", color: "#0ea5e9", bg: "#e0f2fe" },
  { icon: "pawIcon",      label: "Pet",        color: "#f59e0b", bg: "#fef3c7" },
  { icon: "bookIcon",     label: "Educação",   color: "#f97316", bg: "#ffedd5" },
];

const professionals = [
  { name: "Ana Silva",     role: "Faxineira",   rating: 4.9, reviews: 120, distance: "2 km de você",   avatar: 1, photo: "/foto_faxineira2.avif" },
  { name: "Carlos Lima",   role: "Eletricista", rating: 4.8, reviews: 98,  distance: "3 km de você",   avatar: 2, photo: "/foto_eletricista2.jpg" },
  { name: "Juliana Costa", role: "Cuidadora",   rating: 4.9, reviews: 76,  distance: "1,5 km de você", avatar: 3, photo: "/foto_cuidadora.jpg" },
  { name: "Roberto Souza", role: "Encanador",   rating: 4.7, reviews: 143, distance: "4 km de você",   avatar: 4, photo: "/foto_encanador2.jpg" },
  { name: "Fernanda Reis", role: "Pintora",     rating: 5.0, reviews: 55,  distance: "2,5 km de você", avatar: 5, photo: "/foto_pintora2.avif" },
];

const services = [
  { icon: "broomCat",  label: "Faxina Residencial", price: "R$ 120", color: "#22c55e", bg: "#dcfce7" },
  { icon: "zap",       label: "Eletricista",         price: "R$ 80",  color: "#eab308", bg: "#fef9c3" },
  { icon: "droplet",   label: "Encanador",           price: "R$ 90",  color: "#3b82f6", bg: "#dbeafe" },
  { icon: "wrench2",   label: "Montagem de Móveis",  price: "R$ 70",  color: "#f97316", bg: "#ffedd5" },
  { icon: "heartIcon", label: "Pintora",             price: "R$ 150", color: "#8b5cf6", bg: "#ede9fe" },
];

const reviews = [
  { name: "Marcos A.",   role: "Faxina Residencial", text: "Profissional excelente, chegou no horário e fez um ótimo trabalho. Super recomendo!", rating: 5, avatar: 6, photo: "/homem2.avif" },
  { name: "Patrícia M.", role: "Eletricista",         text: "Atendimento rápido e muito atencioso. Resolveu meu problema em minutos!",            rating: 5, avatar: 7, photo: "/mulher 1.avif" },
  { name: "Luciana S.",  role: "Cuidadora",           text: "Ótima profissional, cuidadosa e muito dedicada. Minha mãe adorou!",                  rating: 5, avatar: 8, photo: "/mulher2.jpg" },
  { name: "Felipe R.",   role: "Encanador",           text: "Resolveu o problema rapidinho, preço justo e muito educado. Recomendo!",              rating: 5, avatar: 4, photo: "/homem3.avif" },
];

const navItems = [
  { icon: "home", label: "Início" },
  { icon: "plus", label: "Abrir novas solicitações" },
  { icon: "list", label: "Minhas solicitações" },
  { icon: "chat", label: "Chat" },
];

const filters = ["Todas", "Não lidas", "Solicitações", "Serviços", "Pagamentos"];

const allNotifs = [
  { id: 1,  icon: "doc",     title: "Serviço Aceito",                       desc: "O prestador João Silva aceitou sua solicitação de Instalação de Ar Condicionado.",  time: "Há 5 min",         unread: true,  category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 2,  icon: "chat",    title: "Nova Mensagem",                         desc: "Você recebeu uma nova mensagem do prestador João Silva.",                           time: "Há 20 min",        unread: true,  category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 3,  icon: "payment", title: "Pagamento Aprovado",                    desc: "Seu pagamento de R$ 350,00 foi aprovado com sucesso.",                             time: "Há 1 hora",        unread: true,  category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
  { id: 4,  icon: "star",    title: "Avalie seu Serviço",                    desc: "Seu serviço de Limpeza Residencial foi concluído. Conte como foi sua experiência!", time: "Ontem às 10:30",   unread: false, category: "serviços",     iconColor: "#f59e0b", iconBg: "#fef3c7" },
  { id: 5,  icon: "eye",     title: "Prestador Visualizou sua Solicitação",  desc: "O prestador Maria Santos visualizou sua solicitação de Pintura Residencial.",      time: "Ontem às 09:15",   unread: false, category: "solicitações", iconColor: "#f97316", iconBg: "#ffedd5" },
  { id: 6,  icon: "doc",     title: "Serviço Concluído",                     desc: "Carlos Lima marcou o serviço de Reparo Elétrico como concluído. Tudo certo?",       time: "Ontem às 14:00",   unread: false, category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 7,  icon: "chat",    title: "Nova Mensagem",                         desc: "Ana Faxineira enviou uma mensagem: 'Posso chegar às 8h amanhã?'",                   time: "Há 2 dias",        unread: false, category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 8,  icon: "payment", title: "Cobrança Gerada",                       desc: "Foi gerada uma cobrança de R$ 180,00 pelo serviço de Encanamento.",                time: "Há 2 dias",        unread: false, category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
  { id: 9,  icon: "star",    title: "Avalie seu Serviço",                    desc: "Seu serviço de Instalação de Prateleiras foi concluído. Como foi a experiência?",   time: "Há 3 dias",        unread: false, category: "serviços",     iconColor: "#f59e0b", iconBg: "#fef3c7" },
  { id: 10, icon: "doc",     title: "Novo Prestador Disponível",             desc: "Roberto Souza está disponível para sua solicitação de Pintura de Quarto.",          time: "Há 3 dias",        unread: false, category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 11, icon: "chat",    title: "Nova Mensagem",                         desc: "Fernanda Pintora enviou fotos do trabalho finalizado para sua aprovação.",          time: "Há 4 dias",        unread: false, category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 12, icon: "payment", title: "Reembolso Processado",                  desc: "Seu reembolso de R$ 90,00 foi processado e será creditado em até 5 dias úteis.",  time: "Há 5 dias",        unread: false, category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
];

export default function TelainicialCliente() {
  const [activeNav, setActiveNav]   = useState(0);
  const [notifOpen, setNotifOpen]       = useState(false);
  const [notifFilter, setNotifFilter]     = useState("todas");
  const [showAllNotifs, setShowAllNotifs] = useState(false);
  const [notifs, setNotifs]               = useState(allNotifs);

  const baseNotifs = notifFilter === "todas"
    ? notifs
    : notifFilter === "não_lidas"
    ? notifs.filter(n => n.unread)
    : notifs.filter(n => n.category === notifFilter);
  const filteredNotifs = showAllNotifs ? baseNotifs : baseNotifs.slice(0, 5);

  const unreadCount = notifs.filter(n => n.unread).length;

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = ".fazuno-scroll::-webkit-scrollbar{display:none}.fazuno-scroll{-ms-overflow-style:none;scrollbar-width:none}";
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", overflow: "hidden", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f9fafb" }}>

      {/* SIDEBAR */}
      <div style={{ width: 180, minWidth: 180, height: "100%", backgroundColor: "#0d1b3e", display: "flex", flexDirection: "column", flexShrink: 0, zIndex: 30, boxShadow: "4px 0 24px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <img src="/Logo_branca.png" alt="FazUno" style={{ width: 90, height: "auto" }} />
          </div>
        </div>
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item, i) => (
            <button key={i} onClick={() => setActiveNav(i)}
              style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 12, border: "none", cursor: "pointer", textAlign: "left", width: "100%", backgroundColor: activeNav === i ? "rgba(255,255,255,0.15)" : "transparent", color: activeNav === i ? "white" : "rgba(255,255,255,0.55)", transition: "all 0.2s" }}
              onMouseEnter={e => { if (activeNav !== i) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { if (activeNav !== i) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <span style={{ flexShrink: 0, marginTop: 1 }}>
                <Icon name={item.icon} size={17} color={activeNav === i ? "white" : "rgba(255,255,255,0.5)"} strokeWidth={2} />
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

          {/* Sino + Dropdown */}
          <div style={{ position: "relative" }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setNotifOpen(o => !o)}
              style={{ position: "relative", padding: 8, borderRadius: 8, border: "none", backgroundColor: notifOpen ? "rgba(255,255,255,0.15)" : "transparent", cursor: "pointer" }}
              onMouseEnter={e => { if (!notifOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { if (!notifOpen) e.currentTarget.style.backgroundColor = notifOpen ? "rgba(255,255,255,0.15)" : "transparent"; }}
            >
              <Icon name="bell" size={20} color="rgba(255,255,255,0.75)" />
              {unreadCount > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, borderRadius: "50%", backgroundColor: "#f97316", color: "white", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{unreadCount}</span>}
            </button>

            {notifOpen && (
              <div style={{ position: "fixed", top: 60, right: 20, width: 420, backgroundColor: "white", borderRadius: 20, boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 999, overflow: "hidden", border: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px 12px" }}>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0d1b3e" }}>Notificações</h3>
                  <button onClick={e => { e.stopPropagation(); setNotifs(prev => prev.map(n => ({ ...n, unread: false }))); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#f97316" }}>Marcar todas como lidas</button>
                </div>
                <div style={{ display: "flex", gap: 6, padding: "0 20px 12px", overflowX: "auto", scrollbarWidth: "none" }}>
                  {filters.map((f, i) => {
                    const key = f.toLowerCase().replace(" ", "_");
                    const active = notifFilter === key || (i === 0 && notifFilter === "todas");
                    return (
                      <button key={f} onClick={e => { e.stopPropagation(); setNotifFilter(i === 0 ? "todas" : key); setShowAllNotifs(false); }}
                        style={{ flexShrink: 0, padding: "5px 14px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", backgroundColor: active ? "#0d1b3e" : "#f1f5f9", color: active ? "white" : "#64748b", transition: "all 0.2s" }}
                      >{f}</button>
                    );
                  })}
                </div>
                <div style={{ maxHeight: showAllNotifs ? 520 : 380, overflowY: "auto", scrollbarWidth: "none", transition: "max-height 0.3s ease" }}>
                  {filteredNotifs.map((n, i) => (
                    <div key={n.id}
                      style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 20px", borderTop: i > 0 ? "1px solid #f8fafc" : "none", backgroundColor: n.unread ? "#fafbff" : "white", cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f1f5f9"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = n.unread ? "#fafbff" : "white"}
                    >
                      <div style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: n.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {n.icon === "doc"     && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={n.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>}
                        {n.icon === "chat"    && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={n.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>}
                        {n.icon === "payment" && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={n.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
                        {n.icon === "star"    && <svg width="20" height="20" viewBox="0 0 24 24" fill={n.iconColor} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
                        {n.icon === "eye"     && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={n.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 700, color: "#0d1b3e" }}>{n.title}</p>
                        <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748b", lineHeight: 1.45 }}>{n.desc}</p>
                        <span style={{ fontSize: 11, color: "#94a3b8" }}>{n.time}</span>
                      </div>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: n.unread ? "#f97316" : "#e2e8f0", flexShrink: 0, marginTop: 6 }} />
                    </div>
                  ))}
                </div>
                <div style={{ padding: "12px 20px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
                  <button
                    onClick={e => { e.stopPropagation(); setShowAllNotifs(v => !v); }}
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

        {/* PAGE */}
        <div className="fazuno-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", backgroundColor: "#f9fafb" }}>

          {/* HERO */}
          <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(130deg, #0d1b3e 0%, #1e3a8a 55%, #1e40af 100%)" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(ellipse at 10% 50%, rgba(249,115,22,0.18) 0%, transparent 50%)" }}/>
            <div style={{ display: "flex", alignItems: "center", padding: "32px 40px", gap: 0, position: "relative", boxSizing: "border-box", minHeight: 220 }}>
              <div style={{ maxWidth: 380, flexShrink: 0, zIndex: 2 }}>
                <h1 style={{ color: "white", fontSize: 28, fontWeight: 800, lineHeight: 1.25, margin: "0 0 12px" }}>
                  Tudo o que sua casa<br/>precisa em um{" "}
                  <span style={{ color: "#fb923c" }}>só lugar!</span>
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

          {/* INNER CONTENT */}
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
                    <p style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.6, margin: "0 0 12px" }}>"{r.text}"</p>
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
      </div>
    </div>
  );
}