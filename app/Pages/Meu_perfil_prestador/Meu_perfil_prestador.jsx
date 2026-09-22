"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FaCamera, FaCheckCircle, FaMapMarkerAlt, FaCalendarAlt, FaBolt,
  FaStar, FaStarHalfAlt, FaRegStar, FaEdit, FaArrowLeft,
  FaBriefcase, FaThumbsUp, FaTrophy, FaChartLine,
  FaWrench, FaTools, FaShieldAlt, FaDownload, FaClock,
  FaUser, FaIdCard, FaPhoneAlt, FaEnvelope,
  FaInfoCircle, FaTimes,
} from "react-icons/fa";

const C = {
  navy:      "#06104A",
  band:      "#143660",
  orange:    "#f1670f",
  muted:     "#6975A8",
  border:    "#E2E7F0",
  border2:   "#DDE3EE",
  bg:        "#FFFFFF",
  bgLight:   "#F2F4F8",
  purple:    "#7C5CFC",
  purpleBg:  "#F1ECFC",
  heroFrom:  "#F1ECFC",
  heroTo:    "#F8F5FE",
  green:     "#16A34A",
  greenBg:   "#DFF7E8",
  amber:     "#D97706",
  amberBg:   "#FEF3C7",
  coral:     "#F0653D",
  coralBg:   "#FDEAE3",
  blue:      "#2563EB",
  blueBg:    "#DBEAFE",
  gray:      "#6B7280",
  grayBg:    "#F1F2F5",
  star:      "#F59E0B",
};

// ── Dados mockados — substituir por dados reais da API ──
const PROVIDER = {
  name: "João Silva",
  profession: "Eletricista Profissional",
  verified: true,
  city: "Floriano", state: "PI",
  memberSince: "Janeiro de 2024",
  rating: 4.9, totalRatings: 128,
  responseRate: 95,
  about: "Sou eletricista profissional com mais de 8 anos de experiência em instalações, manutenções e reparos elétricos residenciais, comerciais e prediais. Trabalho com compromisso, segurança e qualidade, sempre buscando a satisfação dos meus clientes.",
  schedule: "Segunda a Sexta: 07:00 às 18:00\nSábado: 07:00 às 12:00",
};

const STATS = [
  { Icon: FaBriefcase, iconBg: C.purpleBg, iconColor: C.purple, val: "243", label: "Serviços realizados", sub: "Total concluídos" },
  { Icon: FaThumbsUp,  iconBg: C.greenBg,  iconColor: C.green,  val: "128", label: "Avaliações recebidas", sub: "Média 4,9 estrelas" },
  { Icon: FaTrophy,    iconBg: C.amberBg,  iconColor: C.amber,  val: "Top 10%", label: "Ranking", sub: "Entre os prestadores da sua região" },
  { Icon: FaChartLine, iconBg: C.coralBg,  iconColor: C.coral,  val: "98%", label: "Taxa de conclusão", sub: "Serviços finalizados com sucesso" },
];

const MONTHS = ["Dez", "Jan", "Fev", "Mar", "Abr"];
const CHART_MAX = 200;
const CHART_SERIES = [
  { label: "Visualizações", color: C.purple, data: [55, 88, 122, 158, 192] },
  { label: "Contatos",      color: C.blue,   data: [32, 50, 75, 98, 128] },
  { label: "Contratações",  color: C.green,  data: [12, 22, 36, 50, 66] },
];
const chartX = (i) => 14 + i * 146;
const chartY = (v) => 150 - (v / CHART_MAX) * 130;

const FEATURED_SERVICES = [
  { name: "Instalações Elétricas",     count: 120, rating: 4.9, Icon: FaBolt,   iconBg: C.purpleBg, iconColor: C.purple },
  { name: "Manutenção Elétrica",       count: 85,  rating: 4.8, Icon: FaWrench, iconBg: C.blueBg,   iconColor: C.blue },
  { name: "Reparos e Emergências",     count: 38,  rating: 4.9, Icon: FaTools,  iconBg: C.coralBg,  iconColor: C.coral },
];

const CERTIFICATIONS = [
  { name: "NR-10 – Segurança em Instalações Elétricas", validUntil: "20/03/2026" },
  { name: "Certificado de Eletricista Profissional",    validUntil: "15/08/2026" },
  { name: "Comprovante de MEI",                          validUntil: "30/04/2026" },
];

const RECENT_REVIEWS = [
  { author: "Maria Vitória",   rating: 5, date: "06/06/2025", text: "Excelente profissional! Resolveu tudo rapidamente e com muita qualidade." },
  { author: "Isaac Gabriel",rating: 5, date: "02/06/2025", text: "Muito atencioso e educado. Serviço impecável, recomendo!" },
  { author: "Juliana Lima",  rating: 5, date: "30/05/2025", text: "Chegou no horário, explicou tudo certinho." },
];

const RECENT_OPPORTUNITIES = [
  { title: "Instalação de chuveiro elétrico", city: "Floriano, PI", status: "Novo",       time: "Há 20 min" },
  { title: "Troca de fiação",                 city: "Floriano, PI", status: "Em análise", time: "Há 1h" },
  { title: "Instalação de tomadas",           city: "Floriano, PI", status: "Encerrada",  time: "Ontem" },
];

const STATUS_STYLES = {
  "Novo":       { bg: C.greenBg, color: C.green },
  "Em análise": { bg: C.amberBg, color: C.amber },
  "Encerrada":  { bg: C.grayBg,  color: C.gray },
};

const SERVICE_AREAS = [
  { city: "Floriano - PI",              principal: true },
  { city: "Barão de Grajaú - MA",       principal: false },
  { city: "Manoel Emídio - PI",principal: false },
  { city: "Jerumenha - PI",             principal: false },
];
const EXTRA_AREAS = 2;

const PROFESSIONAL_INFO = [
  { Icon: FaUser,      label: "Tipo de conta",   value: "Pessoa Física" },
  { Icon: FaIdCard,    label: "CNPJ / CPF",      value: "123.000.000-00" },
  { Icon: FaCalendarAlt,label: "Cadastrado em",  value: "15/01/2023" },
  { Icon: FaPhoneAlt,  label: "Telefone",        value: "(89) 9 9999-9999" },
  { Icon: FaEnvelope,  label: "E-mail",          value: "joao.silva@email.com" },
];

function StarRow({ value }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, color: C.star, fontSize: "0.78rem" }}>
      {[1, 2, 3, 4, 5].map((i) =>
        value >= i ? <FaStar key={i} /> :
        value >= i - 0.5 ? <FaStarHalfAlt key={i} /> :
        <FaRegStar key={i} />
      )}
    </span>
  );
}

function AnimCard({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.04 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: `opacity 0.5s ${delay}ms ease, transform 0.5s ${delay}ms ease`, ...style }}>
      {children}
    </div>
  );
}

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ width: 42, height: 24, borderRadius: 999, border: `1.5px solid ${C.border2}`, cursor: "pointer", padding: 2, background: on ? C.purple : C.border2, transition: "background 0.2s, border-color 0.2s", display: "flex", alignItems: "center", justifyContent: on ? "flex-end" : "flex-start" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.orange; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border2; }}
    >
      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", transition: "transform 0.2s" }} />
    </button>
  );
}

const card = { border: `1.5px solid ${C.border}`, borderRadius: 12, background: C.bg, boxShadow: "0 2px 12px rgba(6,16,74,0.05)", overflow: "hidden" };
const cardPad = { padding: "22px 24px" };
const secTitle = { fontFamily: "'Sora',sans-serif", fontSize: "0.95rem", fontWeight: 700, color: C.navy, margin: 0 };
const linkBtn = { background: "none", border: "1.5px solid transparent", borderRadius: 999, padding: "5px 13px", color: C.purple, fontSize: ".76rem", fontWeight: 700, cursor: "pointer", transition: "background 0.18s, border-color 0.18s" };

export default function MeuPerfilPrestador() {
  const router = useRouter();
  const [available, setAvailable] = useState(true);
  const [receiving, setReceiving] = useState(true);
  const [showTip, setShowTip] = useState(true);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes mpFadeBg { from{opacity:0} to{opacity:1} }
        @keyframes mpSlideIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-thumb { background:#c7cde0; border-radius:99px; }
      `}</style>

      <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#EEF1F8", color: C.navy, width: "100%", minHeight: "100%" }}>

        {/* ══ HERO BANNER (full-bleed, navy) ══ */}
        <div style={{ background: `linear-gradient(120deg,${C.navy} 0%,${C.band} 50%,#1a4a7a 100%)`, animation: "mpSlideIn 0.5s ease both" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 40px 30px" }}>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => router.back()}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, border: "1.5px solid transparent", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.16)"; e.currentTarget.style.borderColor = C.orange; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "transparent"; }}
              >
                <FaArrowLeft size={13} /> Voltar
              </button>

              <button
                onClick={() => router.push("/Pages/Editar_Perfil_Prestador")}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 8, border: "1.5px solid transparent", background: C.orange, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 2px 10px rgba(241,103,15,0.35)" }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.08)"; e.currentTarget.style.borderColor = C.navy; }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.borderColor = "transparent"; }}
              >
                <FaEdit size={13} /> Editar Perfil
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 22, flexWrap: "wrap" }}>

              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{ width: 96, height: 96, borderRadius: "50%", border: "3.5px solid rgba(255,255,255,0.5)", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt={PROVIDER.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.target.src = "https://picsum.photos/seed/electrician42/200/200"; }}
                  />
                </div>
                <button
                  title="Alterar foto de perfil"
                  style={{ position: "absolute", bottom: -2, right: -2, width: 28, height: 28, borderRadius: "50%", background: "#fff", border: "1.5px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 6px rgba(6,16,74,0.25)", transition: "background 0.18s, border-color 0.18s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF4EE"; e.currentTarget.style.borderColor = C.orange; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "transparent"; }}
                >
                  <FaCamera style={{ color: C.orange, fontSize: ".75rem" }} />
                </button>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#fff" }}>{PROVIDER.name}</div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: ".88rem", fontWeight: 500, marginTop: 4, marginBottom: 10 }}>
                  {PROVIDER.profession} · desde {PROVIDER.memberSince}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.82)", fontSize: ".84rem", fontWeight: 600 }}>
                    <FaMapMarkerAlt style={{ color: C.orange }} /> {PROVIDER.city}, {PROVIDER.state}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.82)", fontSize: ".84rem", fontWeight: 600 }}>
                    <FaStar style={{ color: C.star }} /> {PROVIDER.rating} Avaliação média
                  </span>
                  {PROVIDER.verified && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(22,163,74,0.18)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.4)", fontSize: ".75rem", fontWeight: 700, borderRadius: 999, padding: "3px 11px" }}>
                      <FaCheckCircle size={10} /> Perfil Verificado
                    </span>
                  )}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.82)", fontSize: ".75rem", fontWeight: 700, borderRadius: 999, padding: "3px 11px" }}>
                    <FaBolt style={{ color: "#4ade80" }} size={10} /> Taxa de Resposta <span style={{ color: "#4ade80" }}>{PROVIDER.responseRate}%</span>
                  </span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: ".83rem", fontWeight: 500, marginTop: 12, lineHeight: 1.65, maxWidth: 580 }}>
                  {PROVIDER.about}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ CONTEÚDO ══ */}
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 40px 60px" }}>
          <AnimCard delay={40} style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 22 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ ...card, padding: "22px 18px" }}>
                <div style={{ width: 46, height: 46, borderRadius: 11, background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <s.Icon style={{ color: s.iconColor, fontSize: "1.15rem" }} />
                </div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: "1.45rem", fontWeight: 800, color: C.navy, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: ".8rem", color: C.navy, fontWeight: 700, marginTop: 7 }}>{s.label}</div>
                <div style={{ fontSize: ".72rem", color: C.muted, fontWeight: 600, marginTop: 3 }}>{s.sub}</div>
              </div>
            ))}
          </AnimCard>

          {/* ── GRID PRINCIPAL: 3 COLUNAS INDEPENDENTES ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1.85fr 1.25fr 1fr", gap: 20, marginBottom: 20 }}>

            {/* COLUNA A */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Desempenho */}
              <AnimCard delay={60} style={card}>
                <div style={cardPad}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                    <p style={secTitle}>Desempenho</p>
                    <span style={{ fontSize: ".74rem", color: C.muted, fontWeight: 600 }}>Últimos 6 meses ▾</span>
                  </div>

                  <svg viewBox="0 0 614 180" style={{ width: "100%", height: "auto", display: "block" }}>
                    {[0, 50, 100, 150, 200].map((g) => (
                      <g key={g}>
                        <line x1={14} x2={604} y1={chartY(g)} y2={chartY(g)} stroke={C.bgLight} strokeWidth={1} />
                        <text x={0} y={chartY(g) + 3} fontSize="9.5" fill={C.muted}>{g}</text>
                      </g>
                    ))}
                    {MONTHS.map((m, i) => (
                      <text key={m} x={chartX(i)} y={172} fontSize="10.5" fill={C.muted} textAnchor="middle" fontWeight="600">{m}</text>
                    ))}
                    {CHART_SERIES.map((s) => (
                      <polyline
                        key={s.label}
                        points={s.data.map((v, i) => `${chartX(i)},${chartY(v)}`).join(" ")}
                        fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      />
                    ))}
                    {CHART_SERIES.map((s) =>
                      s.data.map((v, i) => (
                        <circle key={s.label + i} cx={chartX(i)} cy={chartY(v)} r="3.5" fill="#fff" stroke={s.color} strokeWidth="2" />
                      ))
                    )}
                  </svg>

                  <div style={{ display: "flex", gap: 18, justifyContent: "center", marginTop: 10, flexWrap: "wrap" }}>
                    {CHART_SERIES.map((s) => (
                      <span key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".76rem", color: C.muted, fontWeight: 600 }}>
                        <span style={{ width: 9, height: 9, borderRadius: "50%", background: s.color }} /> {s.label}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimCard>

              {/* Serviços em Destaque */}
              <AnimCard delay={100} style={card}>
                <div style={cardPad}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <p style={secTitle}>Serviços em Destaque</p>
                    <button style={linkBtn} onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF4EE"; e.currentTarget.style.borderColor = C.orange; }} onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "transparent"; }}>Gerenciar serviços</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {FEATURED_SERVICES.map((s, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "11px 0", borderBottom: i < FEATURED_SERVICES.length - 1 ? `1px solid ${C.bgLight}` : "none" }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <s.Icon style={{ color: s.iconColor, fontSize: ".95rem" }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: ".85rem", fontWeight: 700, color: C.navy }}>{s.name}</div>
                          <div style={{ fontSize: ".74rem", color: C.muted, fontWeight: 600, marginTop: 2 }}>{s.count} serviços realizados</div>
                        </div>
                        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: ".82rem", fontWeight: 700, color: C.navy, flexShrink: 0 }}>
                          <FaStar style={{ color: C.star, fontSize: ".78rem" }} /> {s.rating}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimCard>

              {/* Certificações e Documentos */}
              <AnimCard delay={140} style={card}>
                <div style={cardPad}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <p style={secTitle}>Certificações e Documentos</p>
                    <button style={linkBtn} onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF4EE"; e.currentTarget.style.borderColor = C.orange; }} onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "transparent"; }}>Gerenciar</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {CERTIFICATIONS.map((c, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "#F8FAFF", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "12px 14px" }}>
                        <FaShieldAlt style={{ color: C.purple, fontSize: "1.05rem", flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: ".82rem", fontWeight: 700, color: C.navy }}>{c.name}</div>
                          <div style={{ fontSize: ".72rem", color: C.muted, marginTop: 2, fontWeight: 600 }}>Válido até {c.validUntil}</div>
                        </div>
                        <button title="Baixar documento" style={{ background: "none", border: "1.5px solid transparent", borderRadius: 8, color: C.muted, cursor: "pointer", flexShrink: 0, padding: "6px 8px", transition: "background 0.18s, border-color 0.18s, color 0.18s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = C.orange; e.currentTarget.style.background = "#FFF4EE"; e.currentTarget.style.borderColor = C.orange; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "transparent"; }}>
                          <FaDownload size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimCard>
            </div>

            {/* COLUNA B */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Avaliações Recentes */}
              <AnimCard delay={80} style={card}>
                <div style={cardPad}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <p style={secTitle}>Avaliações Recentes</p>
                    <button style={linkBtn} onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF4EE"; e.currentTarget.style.borderColor = C.orange; }} onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "transparent"; }}>Ver todas</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {RECENT_REVIEWS.map((r, i) => (
                      <div key={i} style={{ padding: "12px 0", borderBottom: i < RECENT_REVIEWS.length - 1 ? `1px solid ${C.bgLight}` : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                          <StarRow value={r.rating} />
                          <span style={{ fontSize: ".7rem", color: C.muted, fontWeight: 600 }}>{r.date}</span>
                        </div>
                        <p style={{ fontSize: ".82rem", color: "#374151", lineHeight: 1.55, fontWeight: 500, margin: "0 0 4px" }}>{r.text}</p>
                        <div style={{ fontSize: ".74rem", color: C.navy, fontWeight: 700 }}>{r.author}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimCard>

              {/* Oportunidades Recentes */}
              <AnimCard delay={120} style={card}>
                <div style={cardPad}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <p style={secTitle}>Oportunidades Recentes</p>
                    <button style={linkBtn} onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF4EE"; e.currentTarget.style.borderColor = C.orange; }} onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "transparent"; }}>Ver todas</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {RECENT_OPPORTUNITIES.map((o, i) => {
                      const st = STATUS_STYLES[o.status];
                      return (
                        <div key={i} style={{ padding: "12px 0", borderBottom: i < RECENT_OPPORTUNITIES.length - 1 ? `1px solid ${C.bgLight}` : "none" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                            <div>
                              <div style={{ fontSize: ".84rem", fontWeight: 700, color: C.navy }}>{o.title}</div>
                              <div style={{ fontSize: ".74rem", color: C.muted, fontWeight: 600, marginTop: 3 }}>{o.city}</div>
                            </div>
                            <span style={{ background: st.bg, color: st.color, fontSize: ".68rem", fontWeight: 700, borderRadius: 999, padding: "3px 10px", whiteSpace: "nowrap" }}>{o.status}</span>
                          </div>
                          <div style={{ fontSize: ".7rem", color: C.muted, fontWeight: 600, marginTop: 6 }}>{o.time}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimCard>
            </div>

            {/* COLUNA C */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Disponibilidade */}
              <AnimCard delay={100} style={card}>
                <div style={cardPad}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <p style={secTitle}>Disponibilidade</p>
                    <button onClick={() => setAvailable((v) => !v)} style={linkBtn} onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF4EE"; e.currentTarget.style.borderColor = C.orange; }} onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "transparent"; }}>Editar</button>
                  </div>

                  <div style={{ background: available ? C.greenBg : C.grayBg, color: available ? C.green : C.gray, fontSize: ".78rem", fontWeight: 700, borderRadius: 8, padding: "9px 12px", marginBottom: 18 }}>
                    {available ? "Disponível para novas oportunidades" : "Indisponível no momento"}
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 18 }}>
                    <FaClock style={{ color: C.purple, fontSize: ".85rem", marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ color: C.muted, fontSize: ".71rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".03em", marginBottom: 3 }}>Horário de atendimento</div>
                      <div style={{ color: C.navy, fontWeight: 600, fontSize: ".82rem", whiteSpace: "pre-line", lineHeight: 1.55 }}>{PROVIDER.schedule}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: `1px solid ${C.bgLight}` }}>
                    <div>
                      <div style={{ fontSize: ".82rem", fontWeight: 700, color: C.navy }}>Receber oportunidades</div>
                      <div style={{ fontSize: ".72rem", color: C.muted, fontWeight: 600, marginTop: 2 }}>
                        {receiving ? "Você está recebendo oportunidades na sua região." : "Você não receberá novas oportunidades."}
                      </div>
                    </div>
                    <Toggle on={receiving} onClick={() => setReceiving((v) => !v)} />
                  </div>
                </div>
              </AnimCard>

              {/* Áreas de Atendimento */}
              <AnimCard delay={140} style={card}>
                <div style={cardPad}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <p style={secTitle}>Áreas de Atendimento</p>
                    <button style={linkBtn} onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF4EE"; e.currentTarget.style.borderColor = C.orange; }} onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "transparent"; }}>Gerenciar</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    {SERVICE_AREAS.map((a, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".82rem", fontWeight: 600, color: C.navy, minWidth: 0 }}>
                          <FaMapMarkerAlt style={{ color: C.purple, flexShrink: 0, fontSize: ".8rem" }} /> {a.city}
                        </span>
                        {a.principal && (
                          <span style={{ background: C.purpleBg, color: C.purple, fontSize: ".66rem", fontWeight: 700, borderRadius: 999, padding: "2px 9px", flexShrink: 0 }}>Principal</span>
                        )}
                      </div>
                    ))}
                  </div>
                  {EXTRA_AREAS > 0 && (
                    <div style={{ fontSize: ".76rem", color: C.muted, fontWeight: 700, marginTop: 12 }}>+{EXTRA_AREAS} cidades</div>
                  )}
                </div>
              </AnimCard>
            </div>
          </div>

          {/* ── INFORMAÇÕES PROFISSIONAIS ── */}
          <AnimCard delay={160} style={{ ...card, marginBottom: 18 }}>
            <div style={cardPad}>
              <p style={{ ...secTitle, marginBottom: 18 }}>Informações Profissionais</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 18 }}>
                {PROFESSIONAL_INFO.map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: C.purpleBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <row.Icon style={{ color: C.purple, fontSize: ".8rem" }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: C.muted, fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".03em", marginBottom: 3 }}>{row.label}</div>
                      <div style={{ color: C.navy, fontWeight: 700, fontSize: ".82rem", wordBreak: "break-word" }}>{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimCard>

          {/* ── DICA ── */}
          {showTip && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: 10, padding: "13px 16px", animation: "mpSlideIn 0.3s ease" }}>
              <FaInfoCircle style={{ color: "#1E40AF", flexShrink: 0, marginTop: 2, fontSize: ".9rem" }} />
              <p style={{ flex: 1, margin: 0, fontSize: ".8rem", color: "#1E40AF", fontWeight: 600, lineHeight: 1.6 }}>
                Dica: complete seu perfil, mantenha suas certificações atualizadas e responda rápido às oportunidades para continuar recebendo mais serviços.
              </p>
              <button onClick={() => setShowTip(false)} style={{ background: "none", border: "1.5px solid transparent", borderRadius: 6, color: "#1E40AF", cursor: "pointer", padding: 3, flexShrink: 0, transition: "border-color 0.18s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.orange; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; }}>
                <FaTimes size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
