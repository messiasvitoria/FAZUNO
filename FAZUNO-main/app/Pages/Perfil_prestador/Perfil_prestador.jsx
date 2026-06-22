"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // ← ADICIONADO
import {
  FaStar, FaStarHalfAlt, FaRegStar,
  FaMapMarkerAlt, FaCheckCircle,
  FaShieldAlt, FaClock, FaChevronDown, FaChevronUp,
  FaHeart, FaRegHeart,
  FaBroom, FaPaintRoller, FaHeartbeat, FaGraduationCap, FaCut,
  FaLaptop, FaEllipsisH, FaExclamationCircle, FaBan,
  FaWrench, FaBolt, FaEdit, FaFileAlt, FaCalendar,
  FaArrowLeft, // ← ADICIONADO
} from "react-icons/fa";

const C = {
  navy:    "#06104A",
  band:    "#143660",
  orange:  "#f1670f",
  muted:   "#6975A8",
  border:  "#E2E7F0",
  border2: "#DDE3EE",
  bg:      "#FFFFFF",
  bgLight: "#F2F4F8",
  green:   "#16A34A",
  greenBg: "#DFF7E8",
  red:     "#FF2D2D",
  star:    "#F59E0B",
};

// ── PADRONIZADO: mesma foto usada no Modal_Detalhes_Cliente ──
const PHOTO_PROVIDER = "https://randomuser.me/api/portraits/men/32.jpg";

// Fotos realistas de eletricista
const PORTFOLIO_PHOTOS = [
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
];

const AVATAR_PHOTOS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
];

const PROVIDER = {
  name: "João Silva",
  mainProfession: "Eletricista",
  verified: true,
  available: true,
  city: "São Paulo", state: "SP", neighborhood: "Vila Madalena",
  memberSince: "abril de 2023", yearsOnPlatform: 2,
  rating: 4.9, totalRatings: 128,
  servicesCompleted: 156, completionRate: 98, avgResponseTime: "1h 20m",
  about: "Sou eletricista profissional com mais de 8 anos de experiência em instalações, manutenções e reparos elétricos residenciais, comerciais e prediais. Trabalho com compromisso, segurança e qualidade, sempre buscando a satisfação dos meus clientes.",
  highlights: ["Experiência: 8+ anos","Atendimento rápido e eficiente","Materiais de qualidade","Garantia nos serviços realizados"],
  verifications: [
    { label: "E-mail verificado", done: true },
    { label: "Telefone verificado", done: true },
    { label: "Documento validado", done: true },
    { label: "Perfil verificado", done: true },
  ],
  categories: [
    { label: "Limpeza",          Icon: FaBroom,        iconBg: "#EDE9FE", iconColor: "#7C3AED" },
    { label: "Reformas",         Icon: FaPaintRoller,  iconBg: "#DCFCE7", iconColor: "#16A34A" },
    { label: "Saúde e Cuidados", Icon: FaHeartbeat,    iconBg: "#FCE7F3", iconColor: "#DB2777" },
    { label: "Educação",         Icon: FaGraduationCap,iconBg: "#FEF3C7", iconColor: "#D97706" },
    { label: "Beleza",           Icon: FaCut,          iconBg: "#FFE4E6", iconColor: "#E11D48" },
    { label: "Tecnologia",       Icon: FaLaptop,       iconBg: "#DBEAFE", iconColor: "#2563EB" },
    { label: "Outros",           Icon: FaEllipsisH,    iconBg: "#F3F4F6", iconColor: "#6B7280" },
  ],
  skills: ["Instalações elétricas","Manutenção preventiva","Quadros de distribuição","Curto-circuitos","Iluminação LED","Tomadas e interruptores","Fiação e cabeamento"],
  certifications: [
    { name: "NR 10 – Segurança em Instalações e Serviços em Eletricidade", year: 2023, verified: true },
  ],
  serviceInfo: {
    neighborhoods: "Vila Madalena, Pinheiros, Perdizes, Sumaré, Pompeia e região",
    radius: "Até 15 km",
    topServices: "Instalações elétricas, Reparos, Troca de fiação, Iluminação",
    schedule: "Segunda a Sexta: 8h às 18h\nSábado: 8h às 12h",
  },
  reviews: [
    { id: 1, author: "Ana Souza",        rating: 5, date: "12/05/2025", text: "Excelente profissional! Chegou no horário, resolveu o problema rapidamente e ainda explicou tudo. Muito educado e atencioso. Recomendo!" },
    { id: 2, author: "Carlos Lima",      rating: 5, date: "08/05/2025", text: "Serviço de alta qualidade, muito caprichoso e organizado. Fez a instalação completa da minha casa com perfeição." },
    { id: 3, author: "Mariana Costa",    rating: 5, date: "20/04/2025", text: "Super recomendo! Resolveu um problema que outros eletricistas não conseguiram. Preço justo e serviço impecável." },
    { id: 4, author: "Roberto Ferreira", rating: 4, date: "15/04/2025", text: "Bom profissional, chegou no horário combinado e fez o serviço direitinho. Só demorou um pouco mais do previsto." },
  ],
};

function StarRow({ value }) {
  return (
    <span style={{ display:"inline-flex", gap:2, color:C.star, fontSize:"0.8rem" }}>
      {[1,2,3,4,5].map(i =>
        value >= i ? <FaStar key={i}/> :
        value >= i - 0.5 ? <FaStarHalfAlt key={i}/> :
        <FaRegStar key={i}/>
      )}
    </span>
  );
}

function AnimCard({ children, delay=0, style={} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold:0.04 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(18px)", transition:`opacity 0.5s ${delay}ms ease, transform 0.5s ${delay}ms ease`, ...style }}>
      {children}
    </div>
  );
}

const card = { border:`1.5px solid ${C.border}`, borderRadius:12, background:C.bg, boxShadow:"0 2px 12px rgba(6,16,74,0.05)", overflow:"hidden" };
const secTitle = { fontFamily:"'Sora',sans-serif", fontSize:"1rem", fontWeight:700, color:C.navy, marginBottom:18, marginTop:0 };

export default function PerfilPrestador() {
  const router = useRouter(); // ← ADICIONADO
  const p = PROVIDER;
  const [showAll, setShowAll]       = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [skillHover, setSkillHover] = useState(null);

  const visibleReviews = showAll ? p.reviews : p.reviews.slice(0, 2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes ppPulse { 0%,100%{box-shadow:0 0 0 0 rgba(22,163,74,0.5)} 50%{box-shadow:0 0 0 7px rgba(22,163,74,0)} }
        @keyframes ppSlideIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ppFadeBg { from{opacity:0} to{opacity:1} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-thumb { background:#c7cde0; border-radius:99px; }
      `}</style>

      <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#EEF1F8", color:C.navy, position:"fixed", inset:0, overflowY:"auto" }}>

        {/* ══ HERO BANNER ══ */}
        <div style={{ background:"linear-gradient(120deg,#06104A 0%,#143660 50%,#1a4a7a 100%)", animation:"ppSlideIn 0.5s ease both" }}>
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"36px 40px 32px" }}>

            {/* ── BOTÃO VOLTAR ── */}
            <button
              onClick={() => router.push("/Pages/Minhas_Solicitacoes")}
              style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:18, padding:"8px 14px", borderRadius:8, border:"1.5px solid rgba(255,255,255,0.2)", backgroundColor:"rgba(255,255,255,0.08)", color:"white", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s", background:"rgba(255,255,255,0.08)" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor="rgba(255,255,255,0.16)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor="rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; }}
            >
              <FaArrowLeft size={13} /> Voltar
            </button>

            <div style={{ display:"flex", alignItems:"flex-start", gap:22 }}>

              <div style={{ position:"relative", flexShrink:0 }}>
                <div style={{ width:96, height:96, borderRadius:"50%", border:"3.5px solid rgba(255,255,255,0.5)", overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.3)" }}>
                  {/* ── PADRONIZADO: mesma foto do Modal_Detalhes_Cliente ── */}
                  <img
                    src={PHOTO_PROVIDER}
                    alt="João Silva"
                    style={{ width:"100%", height:"100%", objectFit:"cover" }}
                    onError={e => { e.target.src="https://picsum.photos/seed/electrician42/200/200"; }}
                  />
                </div>
                {p.available && (
                  <div style={{ position:"absolute", bottom:4, right:4, width:22, height:22, borderRadius:"50%", background:C.green, border:"2.5px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", animation:"ppPulse 2s infinite" }}>
                    <FaCheckCircle style={{ color:"#fff", fontSize:10 }}/>
                  </div>
                )}
              </div>

              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:4 }}>
                  <span style={{ fontFamily:"'Sora',sans-serif", fontSize:"1.6rem", fontWeight:800, color:"#fff" }}>{p.name}</span>
                </div>
                <div style={{ color:"rgba(255,255,255,0.65)", fontSize:".88rem", fontWeight:500, marginBottom:10 }}>
                  {p.mainProfession} · desde {p.memberSince}
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:16, alignItems:"center" }}>
                  <span style={{ display:"flex", alignItems:"center", gap:6, color:"rgba(255,255,255,0.82)", fontSize:".84rem", fontWeight:600 }}>
                    <FaMapMarkerAlt style={{ color:C.orange }}/> {p.city}, {p.state}
                  </span>
                  <span style={{ display:"flex", alignItems:"center", gap:6, color:"rgba(255,255,255,0.82)", fontSize:".84rem", fontWeight:600 }}>
                    <FaStar style={{ color:C.star }}/> {p.rating} Avaliação média
                  </span>
                  {p.verified && (
                    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(22,163,74,0.18)", color:"#4ade80", border:"1px solid rgba(74,222,128,0.4)", fontSize:".75rem", fontWeight:700, borderRadius:999, padding:"3px 11px" }}>
                      <FaCheckCircle size={10}/> Perfil Verificado
                    </span>
                  )}
                </div>
                <p style={{ color:"rgba(255,255,255,0.55)", fontSize:".83rem", fontWeight:500, marginTop:12, lineHeight:1.65, maxWidth:580 }}>
                  {p.about}
                </p>
              </div>

              <button
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.7)"; e.currentTarget.style.background="rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; e.currentTarget.style.background="transparent"; }}
                style={{ height:40, padding:"0 18px", background:"transparent", border:"1.5px solid rgba(255,255,255,0.3)", borderRadius:8, color:"#fff", fontSize:".84rem", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:7, flexShrink:0, transition:"all 0.15s" }}>
                <FaEdit size={13}/> Editar perfil
              </button>
            </div>
          </div>
        </div>

        {/* ══ CONTEÚDO ══ */}
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 40px 60px" }}>

          {/* Stats */}
          <AnimCard delay={0} style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:22 }}>
            {[
              { Icon:FaFileAlt,     iconBg:"#EDE9FE", iconColor:"#7C3AED", val:p.servicesCompleted,       label:"Solicitações realizadas" },
              { Icon:FaCheckCircle, iconBg:"#DCFCE7", iconColor:C.green,   val:p.completionRate+"%",      label:"Taxa de conclusão" },
              { Icon:FaStar,        iconBg:"#FEF3C7", iconColor:"#D97706", val:p.totalRatings,             label:"Avaliações recebidas" },
              { Icon:FaCalendar,    iconBg:"#DBEAFE", iconColor:"#2563EB", val:p.yearsOnPlatform+" anos",  label:"Tempo na plataforma" },
            ].map((s,i) => (
              <div key={i} style={{ ...card, padding:"24px 20px", textAlign:"center" }}>
                <div style={{ width:52, height:52, borderRadius:12, background:s.iconBg, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
                  <s.Icon style={{ color:s.iconColor, fontSize:"1.3rem" }}/>
                </div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:"1.6rem", fontWeight:800, color:C.navy, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:".74rem", color:C.muted, fontWeight:600, marginTop:6 }}>{s.label}</div>
              </div>
            ))}
          </AnimCard>

          {/* Sobre + Verificações */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
            <AnimCard delay={60} style={card}>
              <div style={{ padding:"24px 26px" }}>
                <p style={secTitle}>Sobre</p>
                <p style={{ fontSize:".87rem", color:"#374151", lineHeight:1.75, fontWeight:500, margin:"0 0 16px" }}>{p.about}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                  {p.highlights.map((h,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:9, fontSize:".84rem", fontWeight:600, color:C.navy }}>
                      <FaCheckCircle style={{ color:C.green, flexShrink:0, fontSize:".85rem" }}/> {h}
                    </div>
                  ))}
                </div>
              </div>
            </AnimCard>

            <AnimCard delay={100} style={card}>
              <div style={{ padding:"24px 26px" }}>
                <p style={secTitle}>Verificações</p>
                {p.verifications.map((v,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom: i < p.verifications.length-1 ? `1px solid ${C.bgLight}` : "none" }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:v.done?C.greenBg:C.bgLight, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <FaCheckCircle style={{ color:v.done?C.green:C.border, fontSize:".85rem" }}/>
                    </div>
                    <span style={{ fontSize:".88rem", fontWeight:600, color:C.navy }}>{v.label}</span>
                  </div>
                ))}
                <div style={{ display:"flex", alignItems:"flex-start", gap:9, background:"#EFF6FF", border:"1.5px solid #BFDBFE", borderRadius:8, padding:"11px 13px", marginTop:16, fontSize:".75rem", color:"#1E40AF", lineHeight:1.6, fontWeight:600 }}>
                  <FaBan style={{ flexShrink:0, marginTop:1, fontSize:".9rem" }}/>
                  Dados sensíveis como telefone, e-mail e documentos não são exibidos ao público.
                </div>
              </div>
            </AnimCard>
          </div>

          {/* Categorias */}
          <AnimCard delay={80} style={{ ...card, marginBottom:20 }}>
            <div style={{ padding:"24px 26px" }}>
              <p style={secTitle}>Categorias de atuação</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:12 }}>
                {p.categories.map((cat,i) => (
                  <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:9 }}>
                    <div style={{ width:"100%", aspectRatio:"1", maxWidth:72, borderRadius:14, background:cat.iconBg, color:cat.iconColor, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" }}>
                      <cat.Icon/>
                    </div>
                    <div style={{ fontSize:".75rem", fontWeight:700, color:C.muted, textAlign:"center", lineHeight:1.3 }}>{cat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimCard>

          {/* Habilidades + Atendimento */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
            <AnimCard delay={100} style={card}>
              <div style={{ padding:"24px 26px" }}>
                <p style={secTitle}>Habilidades e especialidades</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {p.skills.map((s,i) => (
                    <span key={i}
                      onMouseEnter={() => setSkillHover(i)} onMouseLeave={() => setSkillHover(null)}
                      style={{ background:skillHover===i?"#FFF4EE":C.bgLight, color:skillHover===i?C.orange:C.navy, border:`1.5px solid ${skillHover===i?C.orange:C.border2}`, borderRadius:999, padding:"5px 14px", fontSize:".8rem", fontWeight:600, cursor:"default", transition:"all 0.18s" }}>
                      {s}
                    </span>
                  ))}
                </div>
                <p style={{ ...secTitle, marginTop:22 }}>Certificações</p>
                {p.certifications.map((c,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, background:"#F8FAFF", border:`1.5px solid ${C.border}`, borderRadius:10, padding:14 }}>
                    <FaShieldAlt style={{ color:C.band, fontSize:"1.3rem", flexShrink:0, marginTop:2 }}/>
                    <div>
                      <div style={{ fontSize:".84rem", fontWeight:700, color:C.navy }}>{c.name}</div>
                      <div style={{ fontSize:".74rem", color:C.muted, marginTop:4, display:"flex", alignItems:"center", gap:5 }}>
                        Certificado em {c.year}
                        {c.verified && <span style={{ color:C.green, display:"inline-flex", alignItems:"center", gap:3 }}><FaCheckCircle size={10}/> Verificado</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimCard>

            <AnimCard delay={140} style={card}>
              <div style={{ padding:"24px 26px" }}>
                <p style={secTitle}>Informações de atendimento</p>
                {[
                  { Icon:FaMapMarkerAlt, key:"Bairros que atende",       val:p.serviceInfo.neighborhoods },
                  { Icon:FaBolt,         key:"Raio de atendimento",      val:p.serviceInfo.radius },
                  { Icon:FaWrench,       key:"Serviços mais realizados", val:p.serviceInfo.topServices },
                  { Icon:FaClock,        key:"Horário de atendimento",   val:p.serviceInfo.schedule },
                ].map((row,i) => (
                  <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:i<3?18:0 }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:"#FFF4EE", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <row.Icon style={{ color:C.orange, fontSize:".88rem" }}/>
                    </div>
                    <div>
                      <div style={{ color:C.muted, fontSize:".71rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".04em", marginBottom:2 }}>{row.key}</div>
                      <div style={{ color:C.navy, fontWeight:600, fontSize:".85rem", whiteSpace:"pre-line", lineHeight:1.55 }}>{row.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimCard>
          </div>

          {/* Portfólio */}
          <AnimCard delay={120} style={{ ...card, marginBottom:20 }}>
            <div style={{ padding:"24px 26px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <p style={{ ...secTitle, marginBottom:0 }}>Portfólio</p>
                <button style={{ background:"none", border:"none", color:C.orange, fontSize:".83rem", fontWeight:700, cursor:"pointer" }}>Ver mais</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12 }}>
                {PORTFOLIO_PHOTOS.map((url,i) => (
                  <div key={i}
                    style={{ width:"100%", aspectRatio:"4/3", borderRadius:10, overflow:"hidden", cursor:"pointer", border:"1.5px solid transparent", transition:"transform 0.2s, border-color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform="scale(1.03)"; e.currentTarget.style.borderColor=C.orange; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.borderColor="transparent"; }}>
                    <img
                      src={url}
                      alt={`Portfolio ${i+1}`}
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                      onError={e => { e.target.src=`https://picsum.photos/seed/elec${i+1}/400/300`; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </AnimCard>

          {/* Avaliações */}
          <AnimCard delay={160} style={{ ...card, marginBottom:10 }}>
            <div style={{ padding:"24px 26px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <p style={{ ...secTitle, marginBottom:0 }}>Avaliações recebidas</p>
                <button style={{ background:"none", border:"none", color:C.orange, fontSize:".83rem", fontWeight:700, cursor:"pointer" }}>Ver todas ({p.totalRatings})</button>
              </div>

              {visibleReviews.map((r,idx) => (
                <div key={r.id} style={{ padding:"14px 0", borderBottom: idx < visibleReviews.length-1 ? `1px solid ${C.bgLight}` : "none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:9 }}>
                    <div style={{ width:42, height:42, borderRadius:"50%", overflow:"hidden", flexShrink:0, border:`2px solid ${C.border}` }}>
                      <img
                        src={AVATAR_PHOTOS[idx % AVATAR_PHOTOS.length]}
                        alt={r.author}
                        style={{ width:"100%", height:"100%", objectFit:"cover" }}
                        onError={e => { e.target.src=`https://picsum.photos/seed/person${idx+1}/80/80`; }}
                      />
                    </div>
                    <div>
                      <div style={{ fontFamily:"'Sora',sans-serif", fontSize:".88rem", fontWeight:700, color:C.navy }}>{r.author}</div>
                      <StarRow value={r.rating}/>
                    </div>
                    <div style={{ fontSize:".74rem", color:C.muted, fontWeight:600, marginLeft:"auto" }}>{r.date}</div>
                  </div>
                  <p style={{ fontSize:".85rem", color:"#374151", lineHeight:1.65, fontWeight:500, margin:0 }}>{r.text}</p>
                </div>
              ))}

              {p.reviews.length > 2 && (
                <button onClick={() => setShowAll(v => !v)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=C.orange; e.currentTarget.style.color=C.orange; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=C.border2; e.currentTarget.style.color=C.muted; }}
                  style={{ width:"100%", background:"none", border:`1.5px solid ${C.border2}`, borderRadius:8, padding:11, fontSize:".84rem", fontWeight:700, color:C.muted, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7, marginTop:14, transition:"all 0.18s" }}>
                  {showAll ? <><FaChevronUp size={11}/> Mostrar menos</> : <><FaChevronDown size={11}/> Ver mais {p.reviews.length-2} avaliações</>}
                </button>
              )}
            </div>
          </AnimCard>

          <button onClick={() => setReportOpen(true)}
            onMouseEnter={e => e.currentTarget.style.color=C.red}
            onMouseLeave={e => e.currentTarget.style.color=C.muted}
            style={{ display:"flex", alignItems:"center", gap:7, justifyContent:"center", background:"none", border:"none", color:C.muted, fontSize:".78rem", fontWeight:600, cursor:"pointer", padding:"10px 0", margin:"4px auto 0", transition:"color 0.15s" }}>
            <FaExclamationCircle/> Denunciar este perfil
          </button>
        </div>

        {/* ── Modal de denúncia ── */}
        {reportOpen && (
          <div onClick={() => setReportOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(6,16,74,0.55)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:60, animation:"ppFadeBg 0.2s ease" }}>
            <div onClick={e => e.stopPropagation()} style={{ background:C.bg, borderRadius:14, padding:"28px 24px", width:"min(360px,94vw)", boxShadow:"0 24px 60px rgba(6,16,74,0.25)", animation:"ppSlideIn 0.3s ease" }}>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:"1rem", fontWeight:700, color:C.navy, marginBottom:10 }}>Denunciar perfil</div>
              <p style={{ fontSize:".84rem", color:C.muted, fontWeight:500, marginBottom:18, lineHeight:1.6 }}>Selecione o motivo. Analisaremos e tomaremos as medidas necessárias.</p>
              {["Informações falsas","Comportamento inadequado","Spam ou fraude","Outro"].map(m => (
                <button key={m} onClick={() => setReportOpen(false)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=C.band; e.currentTarget.style.background="#EFF6FF"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background="#F8FAFF"; }}
                  style={{ display:"block", width:"100%", textAlign:"left", background:"#F8FAFF", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"11px 14px", marginBottom:8, fontSize:".84rem", fontWeight:600, color:C.navy, cursor:"pointer", transition:"all 0.15s" }}>
                  {m}
                </button>
              ))}
              <button onClick={() => setReportOpen(false)} style={{ width:"100%", background:"none", border:"none", color:C.muted, fontSize:".82rem", fontWeight:600, cursor:"pointer", marginTop:6, padding:6 }}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}