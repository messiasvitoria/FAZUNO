"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    home:         ["M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z", "M9 21V12h6v9"],
    list:         ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
    chat:         ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
    bell:         ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"],
    settings:     ["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
    chevRight:    ["M9 18l6-6-6-6"],
    mapPin:       ["M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z", "M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0"],
    checkCircle:  ["M22 11.08V12a10 10 0 11-5.93-9.14", "M22 4L12 14.01l-3-3"],
    shield:       ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
    shieldCheck:  ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"],
    user:         ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2", "M12 7m-4 0a4 4 0 108 0 4 4 0 00-8 0"],
    mail:         ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
    phone:        ["M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"],
    fileText:     ["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8", "M10 9H8"],
    calendar:     ["M3 4h18v18H3z", "M16 2v4", "M8 2v4", "M3 10h18"],
    pencil:       ["M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7", "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"],
    arrowLeft:    ["M19 12H5", "M12 19l-7-7 7-7"],
    clock:        ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 6v6l4 2"],
    wrench:       ["M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"],
    broomCat:     ["M2 19.5A2.5 2.5 0 014.5 17h15", "M4.5 17l1.5-9h12l1.5 9", "M9 11v6", "M12 11v6", "M15 11v6"],
    homeIcon:     ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", "M9 22V12h6v10"],
    mortarboard:  ["M22 10v6M2 10l10-5 10 5-10 5z", "M6 12v5c3 3 9 3 12 0v-5"],
    scissorsIcon: ["M6 9a3 3 0 100-6 3 3 0 000 6z", "M6 15a3 3 0 100 6 3 3 0 000-6z", "M20 4L8.12 15.88", "M14.47 14.48L20 20", "M8.12 8.12L12 12"],
    thumbsUp:     ["M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z", "M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"],
    awardIcon:    ["M12 15a7 7 0 100-14 7 7 0 000 14z", "M8.21 13.89L7 23l5-3 5 3-1.21-9.12"],
    usersIcon:    ["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", "M23 21v-2a4 4 0 00-3-3.87", "M9 7a4 4 0 100 8 4 4 0 000-8z", "M16 3.13a4 4 0 010 7.75"],
    trendUp:      ["M23 6l-9.5 9.5-5-5L1 18", "M17 6h6v6"],
    chartBar:     ["M18 20V10", "M12 20V4", "M6 20v-6"],
    star:         null,
  };

  if (name === "star") {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  }
  const d = paths[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const clientData = {
  name:        "Carlos Mendes",
  memberSince: "Março de 2023",
  location:    "Santo André, SP",
  rating:      4.9,
  reviewCount: 12,
  avatar:      "https://i.pravatar.cc/120?img=12",
  bio:         "Morador de Santo André, busco profissionais confiáveis para serviços domésticos. Priorizo qualidade e pontualidade nas contratações.",
  verified:    true,
  stats: [
    { icon: "fileText",  value: 18, label: "Solicitações",  sublabel: "Total de solicitações criadas", color: "#6366f1", bg: "#ede9fe" },
    { icon: "usersIcon", value: 15, label: "Contratações",  sublabel: "Serviços contratados",          color: "#f97316", bg: "#fff7ed" },
    { icon: "star",      value: 12, label: "Avaliações",    sublabel: "Avaliações recebidas",          color: "#f59e0b", bg: "#fef3c7" },
  ],
  recentRequests: [
    { icon: "broomCat", color: "#f97316", label: "Pintura de Apartamento", date: "06/06/2025", status: "em andamento",         statusColor: "#f59e0b", statusBg: "#fef3c7" },
    { icon: "homeIcon", color: "#22c55e", label: "Limpeza Residencial",    date: "02/05/2025", status: "concluído",            statusColor: "#16a34a", statusBg: "#dcfce7" },
    { icon: "wrench",   color: "#6366f1", label: "Instalação de Chuveiro", date: "29/05/2025", status: "aguardando avaliação", statusColor: "#3b82f6", statusBg: "#dbeafe" },
  ],
  hiredProviders: [
    { name: "João Eletricista", role: "Eletricista", rating: 4.9, photo: "/foto_eletricista2.jpg"  },
    { name: "Ana Diarista",     role: "Diarista",    rating: 5.0, photo: "/foto_faxineira2.avif"   },
    { name: "Carlos Pintor",    role: "Pintor",      rating: 4.8, photo: "/foto_pintora2.avif"     },
  ],
  verifications: [
    { icon: "mail",     label: "E-mail verificado",   sub: "Seu e-mail está verificado"   },
    { icon: "phone",    label: "Telefone verificado",  sub: "Seu telefone está verificado" },
    { icon: "fileText", label: "CPF validado",         sub: "Seu CPF está validado"        },
  ],
  achievements: [
    { icon: "usersIcon",  label: "Cliente Frequente",       sub: "Mais de 10 contratações realizadas", color: "#6366f1", bg: "#ede9fe" },
    { icon: "thumbsUp",   label: "Avaliações Positivas",    sub: "Mais de 10 avaliações positivas",    color: "#f97316", bg: "#fff7ed" },
    { icon: "chartBar",   label: "Contratações Realizadas", sub: "Mais de 10 contratações",             color: "#22c55e", bg: "#dcfce7" },
    { icon: "shieldCheck",label: "Conta Verificada",        sub: "Conta 100% verificada",               color: "#f59e0b", bg: "#fef3c7" },
  ],
  reviews: [
    { name: "João Eletricista", role: "Eletricista",        rating: 5.0, date: "10/06/2025", text: "Cliente educado, comunicação clara e sempre muito prestativo. Recomendo!",                                    photo: "/foto_eletricista2.jpg"     },
    { name: "Ana Diarista",     role: "Diarista",           rating: 4.5, date: "03/06/2025", text: "Ótima experiência, tudo organizado e pagamento realizado conforme combinado. Muito pontual!",                 photo: "/foto_faxineira2.avif"      },
    { name: "Carlos Lima",      role: "Encanador",          rating: 4.8, date: "14/05/2025", text: "Muito pontual e prestativo. Voltaria a trabalhar sem hesitar.",                                               photo: "/foto_encanador2.jpg"       },
    { name: "Fernanda Reis",    role: "Pintora",            rating: 4.6, date: "02/04/2025", text: "Organizado e justo. Pagamento realizado no prazo combinado.",                                                 photo: "/foto_pintora2.avif"        },
    { name: "Roberto Souza",    role: "Montador de Móveis", rating: 4.5, date: "18/03/2025", text: "Casa sempre organizada e acesso facilitado. Cliente excelente!",                                             photo: "/foto_montador_moveis.avif" },
    { name: "Patrícia Lima",    role: "Cuidadora",          rating: 4.7, date: "05/03/2025", text: "Ótima comunicação e muito atencioso durante todo o serviço. Voltaria com prazer!",                           photo: "/foto_cuidadora.jpg"        },
  ],
};

function StatCard({ stat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: "white", borderRadius: 14, padding: "18px 16px", boxShadow: hovered ? "0 0 0 2px #f97316, 0 8px 24px rgba(249,115,22,0.15)" : "0 2px 12px rgba(0,0,0,0.06)", border: `1.5px solid ${hovered ? "#f97316" : "#f1f5f9"}`, transform: hovered ? "translateY(-4px)" : "translateY(0)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1, minWidth: 0, transition: "all 0.25s ease", cursor: "default" }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: stat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={stat.icon} size={20} color={stat.color} strokeWidth={2} />
      </div>
      <span style={{ fontSize: 22, fontWeight: 800, color: "#0d1b3e" }}>{stat.value}</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#374151", textAlign: "center" }}>{stat.label}</span>
      <span style={{ fontSize: 10, color: "#9ca3af", textAlign: "center", lineHeight: 1.3 }}>{stat.sublabel}</span>
    </div>
  );
}

function StatusBadge({ status, color, bg }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color, backgroundColor: bg, borderRadius: 20, padding: "3px 10px", textTransform: "capitalize", whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
}

function SectionCard({ children, style = {} }) {
  return (
    <div style={{ backgroundColor: "white", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1.5px solid #f1f5f9", ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ title, link, onLink }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0d1b3e", margin: 0 }}>{title}</h3>
      {link && (
        <button onClick={onLink} style={{ fontSize: 12, fontWeight: 600, color: "#f97316", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>
          {link} <Icon name="chevRight" size={13} color="#f97316" />
        </button>
      )}
    </div>
  );
}

function ReviewCard({ review }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: "white", borderRadius: 16, padding: 16, boxShadow: hovered ? "0 0 0 2px #f97316, 0 8px 24px rgba(249,115,22,0.15)" : "0 2px 12px rgba(0,0,0,0.06)", border: `1.5px solid ${hovered ? "#f97316" : "#f1f5f9"}`, transform: hovered ? "translateY(-4px)" : "translateY(0)", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", transition: "all 0.25s ease", cursor: "default" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #fed7aa" }}>
          <img src={review.photo} alt={review.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#111827" }}>{review.name}</p>
          <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>{review.role}</p>
        </div>
        <span style={{ fontSize: 10, color: "#9ca3af", flexShrink: 0 }}>{review.date}</span>
      </div>
      <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" size={12} color={i < Math.round(review.rating) ? "#f59e0b" : "#e5e7eb"} />
        ))}
        <span style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginLeft: 3 }}>{review.rating.toFixed(1)}</span>
      </div>
      <p style={{ margin: 0, fontSize: 11, color: "#4b5563", lineHeight: 1.6, flex: 1 }}>&ldquo;{review.text}&rdquo;</p>
    </div>
  );
}

function ReviewsCarousel({ reviews }) {
  const TOTAL = reviews.length;
  const items = [...reviews, ...reviews];
  const [index, setIndex]       = useState(0);
  const [animated, setAnimated] = useState(true);

  const next = () => { setAnimated(true); setIndex(i => i + 1); };

  useEffect(() => {
    if (index === TOTAL) {
      const t = setTimeout(() => { setAnimated(false); setIndex(0); }, 380);
      return () => clearTimeout(t);
    }
    if (index === 0) {
      const r = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(r);
    }
  }, [index, TOTAL]);

  const dotIndex = index % TOTAL;

  return (
    <SectionCard style={{ marginBottom: 22 }}>
      <SectionTitle title="Avaliações Recebidas" link="Ver todas as avaliações" />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 14, transition: animated ? "transform 0.38s cubic-bezier(0.4,0,0.2,1)" : "none", transform: `translateX(calc(-${index} * (50% + 7px)))` }}>
            {items.map((review, i) => (
              <div key={i} style={{ flexShrink: 0, width: "calc(50% - 7px)" }}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
        <button onClick={next} style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: 4 }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.55"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 12 }}>
        {reviews.map((_, i) => (
          <button key={i} onClick={() => { setAnimated(true); setIndex(i); }}
            style={{ width: i === dotIndex ? 18 : 6, height: 6, borderRadius: 3, border: "none", backgroundColor: i === dotIndex ? "#f97316" : "#e5e7eb", cursor: "pointer", padding: 0, transition: "all 0.25s ease" }} />
        ))}
      </div>
    </SectionCard>
  );
}

const btnStyle = {
  display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px",
  borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.25)",
  backgroundColor: "rgba(255,255,255,0.1)", color: "white",
  fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
};

export default function MeuPerfilCliente() {
  const router = useRouter();
  const c = clientData;

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = ".perfil-scroll::-webkit-scrollbar{display:none}.perfil-scroll{-ms-overflow-style:none;scrollbar-width:none}";
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f9fafb", display: "flex", flexDirection: "column" }}>
      <div className="perfil-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", backgroundColor: "#f9fafb" }}>

        {/* HERO */}
        <div style={{ background: "linear-gradient(130deg, #0d1b3e 0%, #1e3a8a 55%, #1e40af 100%)", padding: "28px 32px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(ellipse at 90% 50%, rgba(249,115,22,0.15) 0%, transparent 55%)" }} />

          {/* Botões topo */}
          <div style={{ position: "relative", zIndex: 3, display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
            <button
              onClick={() => router.back()}
              style={btnStyle}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
            >
              <Icon name="arrowLeft" size={14} color="white" strokeWidth={2} />
              Voltar
            </button>
            <button
              onClick={() => router.push("/cliente/editar-perfil")}
              style={btnStyle}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
            >
              <Icon name="pencil" size={14} color="white" strokeWidth={2} />
              Editar Perfil
            </button>
          </div>

          {/* Perfil info */}
          <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "flex-start", gap: 22 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: 90, height: 90, borderRadius: "50%", overflow: "hidden", border: "3px solid #f97316", boxShadow: "0 0 0 3px rgba(249,115,22,0.25)" }}>
                <img src={c.avatar} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
              </div>
              <button style={{ position: "absolute", bottom: 2, left: 2, width: 24, height: 24, borderRadius: "50%", backgroundColor: "#f97316", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </button>
              {c.verified && (
                <div style={{ position: "absolute", bottom: 2, right: 2, width: 22, height: 22, borderRadius: "50%", backgroundColor: "#22c55e", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="checkCircle" size={12} color="white" strokeWidth={2.5} />
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <h1 style={{ color: "white", fontSize: 22, fontWeight: 800, margin: "0 0 3px" }}>{c.name}</h1>
                {c.verified && <Icon name="checkCircle" size={18} color="#22c55e" strokeWidth={2.5} />}
              </div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, margin: "0 0 10px" }}>Cliente desde {c.memberSince}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Icon name="mapPin" size={12} color="rgba(255,255,255,0.55)" strokeWidth={2} />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{c.location}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Icon name="star" size={12} color="#f59e0b" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>{c.rating}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>Avaliação média</span>
                </div>
                {c.verified && (
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Icon name="shieldCheck" size={12} color="#22c55e" strokeWidth={2} />
                    <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 600 }}>Perfil Verificado</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div style={{ padding: "22px 32px", boxSizing: "border-box" }}>

          {/* STATS */}
          <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
            {c.stats.map((stat, i) => <StatCard key={i} stat={stat} />)}
          </div>

          {/* SOLICITAÇÕES + PRESTADORES */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
            <SectionCard>
              <SectionTitle title="Solicitações Recentes" link="Ver todas" onLink={() => router.push("/cliente/minhas-solicitacoes")} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.recentRequests.map((req, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < c.recentRequests.length - 1 ? "1px solid #f9fafb" : "none" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={req.icon} size={16} color={req.color} strokeWidth={1.8} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{req.label}</p>
                      <StatusBadge status={req.status} color={req.statusColor} bg={req.statusBg} />
                    </div>
                    <span style={{ fontSize: 11, color: "#9ca3af", flexShrink: 0 }}>{req.date}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard>
              <SectionTitle title="Prestadores Contratados Recentemente" link="Ver todos" />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.hiredProviders.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < c.hiredProviders.length - 1 ? "1px solid #f9fafb" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #fed7aa" }}>
                      <img src={p.photo} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#111827" }}>{p.name}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>{p.role}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
                      <Icon name="star" size={12} color="#f59e0b" />
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{p.rating.toFixed(1)}</span>
                    </div>
                    <button style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                      <Icon name="chevRight" size={14} color="#9ca3af" />
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* AVALIAÇÕES CARROSSEL */}
          <ReviewsCarousel reviews={c.reviews} />

          {/* SEGURANÇA + CONQUISTAS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
            <SectionCard>
              <SectionTitle title="Segurança e Verificação" />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.verifications.map((v, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={v.icon} size={15} color="#16a34a" strokeWidth={2} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#111827" }}>{v.label}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>{v.sub}</p>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <Icon name="checkCircle" size={16} color="#22c55e" strokeWidth={2.5} />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard>
              <SectionTitle title="Conquistas e Reputação" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {c.achievements.map((a, i) => (
                  <div key={i} style={{ backgroundColor: "#f9fafb", borderRadius: 12, padding: "12px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: a.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name={a.icon} size={17} color={a.color} strokeWidth={2} />
                    </div>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{a.label}</p>
                    <p style={{ margin: 0, fontSize: 10, color: "#9ca3af", lineHeight: 1.3 }}>{a.sub}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* BANNER CTA */}
          <div style={{ background: "linear-gradient(130deg, #0d1b3e 0%, #1e3a8a 100%)", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, position: "relative", overflow: "hidden", marginBottom: 8 }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(ellipse at 100% 50%, rgba(249,115,22,0.12) 0%, transparent 60%)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 2 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="trendUp" size={24} color="#f97316" strokeWidth={1.7} />
              </div>
              <div>
                <p style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 700, color: "white" }}>Acompanhe sua jornada na FazUno</p>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, maxWidth: 400 }}>
                  Continue contratando e avaliando o serviço que você utilizou. Sua participação ajuda a tornar a plataforma cada vez melhor para você!
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/cliente")}
              style={{ flexShrink: 0, zIndex: 2, padding: "10px 20px", borderRadius: 10, backgroundColor: "#f97316", border: "none", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Explorar serviços
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ backgroundColor: "#0d1b3e", color: "white", marginTop: 8 }}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="/Logo_branca.png" alt="Fazuno" style={{ height: 36, width: "auto", display: "block" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>© 2026 FazUno. Todos os direitos reservados.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}