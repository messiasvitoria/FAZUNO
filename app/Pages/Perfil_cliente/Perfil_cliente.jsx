"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// ─── ICON COMPONENT ──────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    home:         ["M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z", "M9 21V12h6v9"],
    plus:         ["M12 5v14", "M5 12h14"],
    list:         ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
    chat:         ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
    bell:         ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"],
    help:         ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3","M12 17h.01"],
    settings:     ["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
    chevDown:     ["M6 9l6 6 6-6"],
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
    heartIcon:    ["M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"],
    broomCat:     ["M2 19.5A2.5 2.5 0 014.5 17h15", "M4.5 17l1.5-9h12l1.5 9", "M9 11v6", "M12 11v6", "M15 11v6"],
    homeIcon:     ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", "M9 22V12h6v10"],
    scissorsIcon: ["M6 9a3 3 0 100-6 3 3 0 000 6z", "M6 15a3 3 0 100 6 3 3 0 000-6z", "M20 4L8.12 15.88", "M14.47 14.48L20 20", "M8.12 8.12L12 12"],
    leafIcon:     ["M17 8C8 10 5.9 16.17 3.82 19.56A1 1 0 004.72 21C11.81 17.44 14.83 12.66 17 8zm0 0c0 9-9 15-17 7"],
    monitorIcon:  ["M20 3H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2z", "M8 21h8", "M12 17v4"],
    pawIcon:      ["M11 4a2 2 0 114 0", "M18 8a2 2 0 114 0", "M18 16a2 2 0 114 0", "M4 12a2 2 0 114 0", "M9 10a5 5 0 015 5v3.5a3.5 3.5 0 01-7 0V15a5 5 0 015-5z"],
    bookIcon:     ["M4 19.5A2.5 2.5 0 016.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"],
    mortarboard:  ["M22 10v6M2 10l10-5 10 5-10 5z", "M6 12v5c3 3 9 3 12 0v-5"],
    wrench:       ["M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"],
    // ── Ícone "ban" (mesmo conceito usado no Perfil_prestador para avaliação anônima) ──
    ban:          ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M4.93 4.93l14.14 14.14"],
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

// ─── STATIC DATA — CARLOS MENDES ─────────────────────────────────────────────
const clientData = {
  name:        "Carlos Mendes",
  memberSince: "Março de 2023",
  location:    "Santo André, São Paulo - SP",
  rating:      4.6,
  reviewCount: 7,
  avatar:      "https://i.pravatar.cc/120?img=12",
  bio:         "Morador de Santo André, busco profissionais confiáveis para serviços domésticos. Priorizo qualidade e pontualidade nas contratações.",
  verified:    true,
  stats: [
    { icon: "fileText",    value: 7,         label: "Solicitações realizadas", color: "#6366f1", bg: "#ede9fe" },
    { icon: "checkCircle", value: 5,         label: "Serviços concluídos",     color: "#22c55e", bg: "#dcfce7" },
    { icon: "star",        value: 7,         label: "Avaliações recebidas",    color: "#f59e0b", bg: "#fef3c7" },
    { icon: "calendar",    value: "3 anos",  label: "Tempo na plataforma",     color: "#3b82f6", bg: "#dbeafe" },
  ],
  verifications: [
    { icon: "mail",        label: "E-mail verificado"   },
    { icon: "phone",       label: "Telefone verificado" },
    { icon: "fileText",    label: "Documento validado"  },
    { icon: "shieldCheck", label: "Perfil verificado"   },
  ],
  topCategories: [
    { icon: "wrench",       label: "Manutenção"       },
    { icon: "homeIcon",     label: "Reformas"         },
    { icon: "broomCat",     label: "Limpeza"          },
    { icon: "mortarboard",  label: "Instalações"      },
    { icon: "scissorsIcon", label: "Outros"           },
  ],
  reviews: [
    { name: "João Silva",    role: "Eletricista",        rating: 5.0, date: "10/05/2025", text: "Cliente muito educado e prestativo. Comunicação clara desde o início. Recomendo!",             photo: "/foto_eletricista2.jpg"     },
    { name: "Ana Souza",     role: "Diarista",           rating: 4.5, date: "22/04/2025", text: "Ambiente organizado e cliente muito atencioso. Foi um prazer realizar o serviço.",             photo: "/foto_faxineira2.avif"      },
    { name: "Carlos Lima",   role: "Encanador",          rating: 4.8, date: "14/04/2025", text: "Muito pontual e prestativo. Voltaria a trabalhar sem hesitar.",                               photo: "/foto_encanador2.jpg",       anonymous: true },
    { name: "Fernanda Reis", role: "Pintora",            rating: 4.6, date: "02/04/2025", text: "Organizado e justo. Pagamento realizado no prazo combinado.",                                  photo: "/foto_pintora2.avif"        },
    { name: "Roberto Souza", role: "Montador de Móveis", rating: 4.5, date: "18/03/2025", text: "Casa sempre organizada e acesso facilitado. Cliente excelente!",                              photo: "/foto_montador_moveis.avif" },
    { name: "Patrícia Lima", role: "Cuidadora",          rating: 4.7, date: "05/03/2025", text: "Ótima comunicação e muito atencioso durante todo o serviço. Voltaria com prazer!",            photo: "/foto_cuidadora.jpg",        anonymous: true },
    { name: "Marcos Prado",  role: "Jardineiro",         rating: 4.3, date: "20/02/2025", text: "Cliente pontual e educado. Deixou tudo pronto para trabalhar sem dificuldades.",              photo: "/homem2.avif"               },
  ],
};

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ stat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: "white", borderRadius: 14, padding: "16px 12px", boxShadow: hovered ? "0 0 0 2px #f97316, 0 8px 24px rgba(249,115,22,0.15)" : "0 2px 12px rgba(0,0,0,0.06)", border: `1.5px solid ${hovered ? "#f97316" : "#f1f5f9"}`, transform: hovered ? "translateY(-4px)" : "translateY(0)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1, minWidth: 0, transition: "all 0.25s ease", cursor: "default" }}>
      <div style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: stat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={stat.icon} size={19} color={stat.color} strokeWidth={2} />
      </div>
      <span style={{ fontSize: 20, fontWeight: 800, color: "#0d1b3e" }}>{stat.value}</span>
      <span style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", lineHeight: 1.3 }}>{stat.label}</span>
    </div>
  );
}

// ─── CATEGORY PILL ───────────────────────────────────────────────────────────
function CategoryPill({ cat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: "white", border: hovered ? "2px solid #f97316" : "2px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", transform: hovered ? "translateY(-3px)" : "translateY(0)", boxShadow: hovered ? "0 6px 16px rgba(249,115,22,0.2)" : "0 2px 8px rgba(0,0,0,0.06)", transition: "all 0.22s ease" }}>
        <Icon name={cat.icon} size={20} color="#0d1b3e" strokeWidth={1.7} />
      </div>
      <span style={{ fontSize: 10, color: "#4b5563", fontWeight: 500, textAlign: "center", lineHeight: 1.2 }}>{cat.label}</span>
    </div>
  );
}

// ─── REVIEW CARD ─────────────────────────────────────────────────────────────
function ReviewCard({ review }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: "white", borderRadius: 16, padding: 16, boxShadow: hovered ? "0 0 0 2px #f97316, 0 8px 24px rgba(249,115,22,0.15)" : "0 2px 12px rgba(0,0,0,0.06)", border: `1.5px solid ${hovered ? "#f97316" : "#f1f5f9"}`, transform: hovered ? "translateY(-4px)" : "translateY(0)", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", transition: "all 0.25s ease", cursor: "default" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        {review.anonymous ? (
          // ── PADRONIZADO: mesmo padrão de avaliação anônima do Perfil_prestador ──
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#f1f5f9", border: "2px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="ban" size={16} color="#9ca3af" strokeWidth={2} />
          </div>
        ) : (
          <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #fed7aa" }}>
            <img src={review.photo} alt={review.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#111827" }}>{review.anonymous ? "Avaliação anônima" : review.name}</p>
          {!review.anonymous && <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>{review.role}</p>}
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

// ─── REVIEWS CAROUSEL ────────────────────────────────────────────────────────
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
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 14px" }}>Avaliações recebidas dos prestadores</h3>
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
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function PerfilCliente() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const c = {
    ...clientData,
    name: searchParams.get("nome") || clientData.name,
    avatar: searchParams.get("foto") || clientData.avatar,
    location: searchParams.get("local") || clientData.location,
    rating: Number(searchParams.get("avaliacao")) || clientData.rating,
    reviewCount: Number(searchParams.get("avaliacoes")) || clientData.reviewCount,
  };

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
        <div style={{ background: "linear-gradient(130deg, #0d1b3e 0%, #1e3a8a 55%, #1e40af 100%)", padding: "24px 32px 28px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(ellipse at 90% 50%, rgba(249,115,22,0.15) 0%, transparent 55%)" }} />

          {/* Botão voltar */}
          <button
            onClick={() => router.back()}
            style={{ position: "relative", zIndex: 3, display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18, padding: "8px 14px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.08)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.16)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
          >
            <Icon name="arrowLeft" size={15} color="white" strokeWidth={2} />
            Voltar
          </button>

          <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "flex-start", gap: 22 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: "3px solid #f97316", boxShadow: "0 0 0 3px rgba(249,115,22,0.25)" }}>
                <img src={c.avatar} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
              </div>
              {c.verified && (
                <div style={{ position: "absolute", bottom: 2, right: 2, width: 22, height: 22, borderRadius: "50%", backgroundColor: "#22c55e", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="checkCircle" size={12} color="white" strokeWidth={2.5} />
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ color: "white", fontSize: 22, fontWeight: 800, margin: "0 0 3px" }}>{c.name}</h1>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, margin: "0 0 8px" }}>Cliente desde {c.memberSince}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Icon name="mapPin" size={12} color="rgba(255,255,255,0.55)" strokeWidth={2} />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{c.location}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Icon name="star" size={12} color="#f59e0b" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>{c.rating}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>({c.reviewCount} avaliações)</span>
                </div>
                {c.verified && (
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Icon name="shieldCheck" size={12} color="#22c55e" strokeWidth={2} />
                    <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 600 }}>Cliente Verificado</span>
                  </div>
                )}
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: "10px 0 0", lineHeight: 1.6, maxWidth: 480 }}>{c.bio}</p>
            </div>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div style={{ padding: "22px 32px", boxSizing: "border-box" }}>

          {/* STATS */}
          <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
            {c.stats.map((stat, i) => <StatCard key={i} stat={stat} />)}
          </div>

          {/* SOBRE + VERIFICAÇÕES */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
            <div style={{ backgroundColor: "white", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1.5px solid #f1f5f9" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0d1b3e", margin: "0 0 12px" }}>Sobre</h3>
              <p style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.7, margin: 0 }}>{c.bio}</p>
            </div>
            <div style={{ backgroundColor: "white", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1.5px solid #f1f5f9" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0d1b3e", margin: "0 0 12px" }}>Verificações</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {c.verifications.map((v, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 7, backgroundColor: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="checkCircle" size={13} color="#16a34a" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{v.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CATEGORIAS */}
          <div style={{ backgroundColor: "white", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1.5px solid #f1f5f9", marginBottom: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0d1b3e", margin: 0 }}>Categorias mais contratadas</h3>
              <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#f97316", background: "none", border: "none", cursor: "pointer" }}>
                Ver mais <Icon name="chevRight" size={13} color="#f97316" />
              </button>
            </div>
            <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
              {c.topCategories.map((cat, i) => <CategoryPill key={i} cat={cat} />)}
            </div>
          </div>

          {/* AVALIAÇÕES */}
          <ReviewsCarousel reviews={c.reviews} />

          {/* BANNER SEGURANÇA */}
          <div style={{ background: "linear-gradient(130deg, #0d1b3e 0%, #1e3a8a 100%)", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(ellipse at 100% 50%, rgba(249,115,22,0.12) 0%, transparent 60%)" }} />
            <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 2 }}>
              <Icon name="shield" size={24} color="#f97316" strokeWidth={1.7} />
            </div>
            <div style={{ zIndex: 2 }}>
              <p style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 700, color: "white" }}>Perfil seguro e confiável</p>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                Todas as informações deste perfil são checadas pela nossa equipe para garantir mais segurança para os prestadores de serviço da plataforma.
              </p>
            </div>
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
