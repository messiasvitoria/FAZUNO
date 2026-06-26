"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/SideBar_cliente";
import Topbar  from "../../components/TopBar_cliente";

function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    mapPin:      ["M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z","M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0"],
    checkCircle: ["M22 11.08V12a10 10 0 11-5.93-9.14","M22 4L12 14.01l-3-3"],
    search:      ["M11 11m-8 0a8 8 0 1016 0 8 8 0 00-16 0","M21 21l-4.35-4.35"],
    sliders:     ["M4 21v-7","M4 10V3","M12 21v-9","M12 8V3","M20 21v-5","M20 12V3","M1 14h6","M9 8h6","M17 16h6"],
    arrowLeft:   ["M19 12H5","M12 19l-7-7 7-7"],
    chevDown:    ["M6 9l6 6 6-6"],
    x:           ["M18 6L6 18","M6 6l12 12"],
    heart:       ["M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"],
    star:        null,
  };
  if (name === "star") {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  }
  const d = paths[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p}/>)}
    </svg>
  );
}

/* ── Dados ─────────────────────────────────────────────────────── */
const SUBCATEGORIAS = [
  { key: "todas",        label: "Todos"              },
  { key: "cuidador",     label: "Cuidadores"         },
  { key: "enfermagem",   label: "Enfermagem"         },
  { key: "fisioterapia", label: "Fisioterapia"       },
  { key: "nutricao",     label: "Nutrição"           },
  { key: "psicologia",   label: "Psicologia"         },
  { key: "medico",       label: "Médicos"            },
  { key: "odontologia",  label: "Odontologia"        },
  { key: "estetica",     label: "Estética"           },
];

const ORDENAR = [
  { key: "relevancia",  label: "Mais relevantes"  },
  { key: "avaliacao",   label: "Melhor avaliados" },
  { key: "distancia",   label: "Mais próximos"    },
  { key: "preco_asc",   label: "Menor preço"      },
  { key: "preco_desc",  label: "Maior preço"      },
];

const PROFISSIONAIS = [
  // Cuidadores
  { id: 1,  nome: "Juliana Costa",    sub: "cuidador",     role: "Cuidadora de Idosos",         rating: 4.9, reviews: 76,  distance: "1,5 km", price: "R$ 80/h",  photo: "/foto_cuidadora.jpg",         verified: true,  destaque: true,  bio: "Especialista em cuidados com idosos, com 8 anos de experiência. Disponível para plantões diurnos e noturnos." },
  { id: 2,  nome: "Renata Alves",     sub: "cuidador",     role: "Cuidadora Pediátrica",        rating: 4.8, reviews: 44,  distance: "2,2 km", price: "R$ 70/h",  photo: "/foto_faxineira2.avif",       verified: true,  destaque: false, bio: "Cuidadora infantil com formação em primeiros socorros e desenvolvimento infantil." },
  { id: 3,  nome: "Marco Vieira",     sub: "cuidador",     role: "Cuidador Domiciliar",         rating: 4.7, reviews: 31,  distance: "3,0 km", price: "R$ 65/h",  photo: "/foto_encanador2.jpg",        verified: true,  destaque: false, bio: "Cuidador domiciliar com treinamento em mobilidade e higiene para pacientes acamados." },
  // Enfermagem
  { id: 4,  nome: "Camila Ferreira",  sub: "enfermagem",   role: "Técnica em Enfermagem",       rating: 4.9, reviews: 112, distance: "2,0 km", price: "R$ 90/h",  photo: "/foto_faxineira1.avif",       verified: true,  destaque: true,  bio: "Técnica em enfermagem com experiência em aplicação de medicamentos, curativos e monitoramento." },
  { id: 5,  nome: "Diego Santana",    sub: "enfermagem",   role: "Enfermeiro Domiciliar",       rating: 4.8, reviews: 88,  distance: "3,5 km", price: "R$ 120/h", photo: "/foto_encanador.jpg",         verified: true,  destaque: false, bio: "Enfermeiro com COREN ativo, especializado em cuidados domiciliares e pós-operatórios." },
  { id: 6,  nome: "Larissa Matos",    sub: "enfermagem",   role: "Enfermeira UTI Domiciliar",   rating: 5.0, reviews: 67,  distance: "4,1 km", price: "R$ 150/h", photo: "/foto_faxineira2.avif",       verified: true,  destaque: true,  bio: "Enfermeira especializada em UTI domiciliar e pacientes de alta complexidade." },
  // Fisioterapia
  { id: 7,  nome: "Rodrigo Lima",     sub: "fisioterapia", role: "Fisioterapeuta",              rating: 4.9, reviews: 93,  distance: "1,8 km", price: "R$ 130/h", photo: "/foto_montador_moveis.avif",  verified: true,  destaque: true,  bio: "Fisioterapeuta com especialização em reabilitação ortopédica e neurológica." },
  { id: 8,  nome: "Tânia Rocha",      sub: "fisioterapia", role: "Fisio. Respiratória",         rating: 4.7, reviews: 55,  distance: "2,8 km", price: "R$ 140/h", photo: "/foto_faxineira1.avif",       verified: true,  destaque: false, bio: "Especialista em fisioterapia respiratória para DPOC, asma e pós-COVID." },
  { id: 9,  nome: "Bruno Almeida",    sub: "fisioterapia", role: "Fisio. Esportivo",            rating: 4.8, reviews: 79,  distance: "3,2 km", price: "R$ 135/h", photo: "/foto_eletricista2.jpg",      verified: true,  destaque: false, bio: "Fisioterapeuta esportivo com atendimento em domicílio e reabilitação de atletas." },
  // Nutrição
  { id: 10, nome: "Priscila Nunes",   sub: "nutricao",     role: "Nutricionista",               rating: 4.9, reviews: 101, distance: "1,2 km", price: "R$ 110/h", photo: "/foto_pintora2.avif",         verified: true,  destaque: true,  bio: "Nutricionista clínica com foco em emagrecimento saudável e reeducação alimentar." },
  { id: 11, nome: "André Campos",     sub: "nutricao",     role: "Nutri. Esportivo",            rating: 4.8, reviews: 63,  distance: "2,5 km", price: "R$ 120/h", photo: "/foto_encanador2.jpg",        verified: true,  destaque: false, bio: "Nutricionista esportivo com experiência em performance e suplementação." },
  { id: 12, nome: "Fernanda Braga",   sub: "nutricao",     role: "Nutri. Infantil",             rating: 4.9, reviews: 47,  distance: "3,7 km", price: "R$ 115/h", photo: "/foto_faxineira2.avif",       verified: true,  destaque: false, bio: "Especializada em alimentação saudável para bebês e crianças em fase de crescimento." },
  // Psicologia
  { id: 13, nome: "Aline Carvalho",   sub: "psicologia",   role: "Psicóloga Clínica",           rating: 5.0, reviews: 134, distance: "1,0 km", price: "R$ 150/h", photo: "/foto_pintora.avif",          verified: true,  destaque: true,  bio: "Psicóloga com CRP ativo, especializada em TCC, ansiedade e depressão." },
  { id: 14, nome: "Paulo Henrique",   sub: "psicologia",   role: "Psicólogo Infantil",          rating: 4.8, reviews: 72,  distance: "2,3 km", price: "R$ 140/h", photo: "/foto_eletricista.jpg",       verified: true,  destaque: false, bio: "Especialista em psicologia infantil e adolescente, com abordagem lúdica." },
  { id: 15, nome: "Mariana Lopes",    sub: "psicologia",   role: "Neuropsicóloga",              rating: 4.9, reviews: 58,  distance: "4,0 km", price: "R$ 170/h", photo: "/foto_cuidadora.jpg",         verified: true,  destaque: false, bio: "Neuropsicóloga com experiência em avaliação e reabilitação cognitiva." },
  // Médicos
  { id: 16, nome: "Dr. Fábio Torres", sub: "medico",       role: "Clínico Geral",               rating: 5.0, reviews: 198, distance: "2,0 km", price: "R$ 200/h", photo: "/foto_eletricista2.jpg",      verified: true,  destaque: true,  bio: "Médico clínico geral com CRM ativo, atende visitas domiciliares e emite atestados." },
  { id: 17, nome: "Dra. Cláudia Mei", sub: "medico",       role: "Pediatra",                    rating: 4.9, reviews: 143, distance: "3,1 km", price: "R$ 220/h", photo: "/foto_faxineira1.avif",       verified: true,  destaque: false, bio: "Pediatra com residência em neonatologia, atendimento domiciliar para bebês e crianças." },
  { id: 18, nome: "Dr. Rafael Mota",  sub: "medico",       role: "Geriatra",                    rating: 4.8, reviews: 87,  distance: "3,8 km", price: "R$ 240/h", photo: "/foto_encanador.jpg",         verified: true,  destaque: false, bio: "Geriatra especializado em cuidados de saúde para idosos e doenças crônicas." },
  // Odontologia
  { id: 19, nome: "Dra. Letícia Paz", sub: "odontologia",  role: "Dentista",                    rating: 4.9, reviews: 89,  distance: "1,5 km", price: "R$ 160/h", photo: "/foto_pintora2.avif",         verified: true,  destaque: true,  bio: "Dentista com CRO ativo, realiza consultas domiciliares de urgência e manutenção." },
  { id: 20, nome: "Bruno Esteves",    sub: "odontologia",  role: "Ortodontista",                rating: 4.8, reviews: 55,  distance: "2,9 km", price: "R$ 180/h", photo: "/foto_montador_moveis.avif",  verified: true,  destaque: false, bio: "Especialista em ortodontia e alinhadores invisíveis com atendimento personalizado." },
  // Estética
  { id: 21, nome: "Vanessa Souza",    sub: "estetica",     role: "Esteticista",                 rating: 4.9, reviews: 116, distance: "0,8 km", price: "R$ 95/h",  photo: "/foto_faxineira2.avif",       verified: true,  destaque: true,  bio: "Esteticista com cursos em drenagem linfática, microagulhamento e limpeza de pele." },
  { id: 22, nome: "Gisele Tavares",   sub: "estetica",     role: "Massoterapeuta",              rating: 4.8, reviews: 74,  distance: "1,9 km", price: "R$ 100/h", photo: "/foto_cuidadora.jpg",         verified: true,  destaque: false, bio: "Massoterapeuta com técnicas relaxantes, terapêuticas e modeladoras." },
  { id: 23, nome: "Carina Medeiros",  sub: "estetica",     role: "Podóloga",                    rating: 4.7, reviews: 49,  distance: "2,6 km", price: "R$ 80/h",  photo: "/foto_pintora.avif",          verified: true,  destaque: false, bio: "Podóloga com atendimento domiciliar especializado em diabéticos e idosos." },
];

/* ── Card do profissional ──────────────────────────────────────── */
function ProfissionalCard({ pro, onContratar }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: "white", borderRadius: 18, padding: 16, boxShadow: hovered ? "0 0 0 2px #f97316, 0 12px 28px rgba(249,115,22,0.18)" : "0 0 0 1.5px #e5e7eb, 0 2px 12px rgba(0,0,0,0.07)", transform: hovered ? "translateY(-6px)" : "translateY(0)", transition: "all 0.25s ease", cursor: "default", position: "relative" }}
    >
      {pro.destaque && (
        <span style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontWeight: 700, background: "#fff7ed", color: "#f97316", border: "1px solid #fed7aa", borderRadius: 20, padding: "3px 8px" }}>
          ⭐ Destaque
        </span>
      )}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", border: "2.5px solid #fed7aa", flexShrink: 0 }}>
          <img src={pro.photo} alt={pro.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
        </div>
      </div>
      <p style={{ fontWeight: 700, fontSize: 13, color: "#111827", textAlign: "center", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pro.nome}</p>
      <p style={{ fontSize: 12, color: "#6b7280", textAlign: "center", margin: "0 0 8px" }}>{pro.role}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 4 }}>
        <Icon name="star" size={13} color="#f59e0b" />
        <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{pro.rating}</span>
        <span style={{ fontSize: 12, color: "#9ca3af" }}>({pro.reviews})</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 4 }}>
        <Icon name="mapPin" size={12} color="#9ca3af" />
        <span style={{ fontSize: 11, color: "#9ca3af" }}>{pro.distance}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 6 }}>
        <Icon name="checkCircle" size={13} color="#22c55e" />
        <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 500 }}>Verificado</span>
      </div>
      <p style={{ fontSize: 11, color: "#6b7280", textAlign: "center", lineHeight: 1.5, margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{pro.bio}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#0d1b3e" }}>{pro.price}</span>
      </div>
      <button
        onClick={() => onContratar(pro)}
        style={{ width: "100%", backgroundColor: "#0d1b3e", color: "white", fontWeight: 700, fontSize: 12, padding: "10px 0", borderRadius: 12, border: "none", cursor: "pointer", transition: "background 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f97316"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0d1b3e"}
      >
        Contratar
      </button>
    </div>
  );
}

/* ── Modal Contratar ───────────────────────────────────────────── */
function ModalContratar({ pro, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 420, boxShadow: "0 24px 60px rgba(0,0,0,0.2)", overflow: "hidden", fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ background: "linear-gradient(130deg, #0d1b3e 0%, #1e3a8a 100%)", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, color: "#fff", fontSize: 16, fontWeight: 700 }}>Contratar profissional</h2>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "#fff", cursor: "pointer", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="x" size={16} color="#fff" strokeWidth={2} />
          </button>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: "2px solid #fed7aa", flexShrink: 0 }}>
              <img src={pro.photo} alt={pro.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#111827" }}>{pro.nome}</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>{pro.role}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                <Icon name="star" size={12} color="#f59e0b" />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{pro.rating}</span>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>({pro.reviews} avaliações)</span>
              </div>
            </div>
          </div>
          <div style={{ background: "#f9fafb", borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>{pro.bio}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            <div style={{ background: "#f9fafb", borderRadius: 10, padding: 12 }}>
              <p style={{ margin: 0, fontSize: 10, color: "#9ca3af", fontWeight: 600 }}>VALOR</p>
              <p style={{ margin: "3px 0 0", fontSize: 14, fontWeight: 700, color: "#0d1b3e" }}>{pro.price}</p>
            </div>
            <div style={{ background: "#f9fafb", borderRadius: 10, padding: 12 }}>
              <p style={{ margin: 0, fontSize: 10, color: "#9ca3af", fontWeight: 600 }}>DISTÂNCIA</p>
              <p style={{ margin: "3px 0 0", fontSize: 14, fontWeight: 700, color: "#0d1b3e" }}>{pro.distance}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1.5px solid #D1D5DB", background: "#fff", color: "#374151", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Cancelar</button>
            <button style={{ flex: 1.4, padding: "11px 0", borderRadius: 10, border: "none", background: "#f97316", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >Solicitar serviço</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Página ────────────────────────────────────────────────────── */
export default function CategoriaSaude() {
  const router = useRouter();
  const [subcat, setSubcat]     = useState("todas");
  const [ordenar, setOrdenar]   = useState("relevancia");
  const [busca, setBusca]       = useState("");
  const [showOrder, setShowOrder] = useState(false);
  const [modalPro, setModalPro] = useState(null);

  const filtrados = PROFISSIONAIS.filter(p => {
    const matchSub  = subcat === "todas" || p.sub === subcat;
    const matchBusca = !busca || p.nome.toLowerCase().includes(busca.toLowerCase()) || p.role.toLowerCase().includes(busca.toLowerCase());
    return matchSub && matchBusca;
  }).sort((a, b) => {
    if (ordenar === "avaliacao")  return b.rating - a.rating;
    if (ordenar === "distancia")  return parseFloat(a.distance) - parseFloat(b.distance);
    if (ordenar === "preco_asc")  return parseInt(a.price.replace(/\D/g,"")) - parseInt(b.price.replace(/\D/g,""));
    if (ordenar === "preco_desc") return parseInt(b.price.replace(/\D/g,"")) - parseInt(a.price.replace(/\D/g,""));
    return b.destaque - a.destaque;
  });

  const labelOrdenar = ORDENAR.find(o => o.key === ordenar)?.label;

  return (
    <>
      <style>{`
        .saude-scroll::-webkit-scrollbar{display:none}
        .saude-scroll{-ms-overflow-style:none;scrollbar-width:none}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .card-ani{animation:fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both}
      `}</style>

      <div style={{ display: "flex", width: "100%", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f9fafb" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
          <Topbar />

          <div className="saude-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", backgroundColor: "#f9fafb" }}>

            {/* HERO */}
            <div style={{ background: "linear-gradient(130deg, #0d1b3e 0%, #1e3a8a 55%, #1e40af 100%)", padding: "28px 40px 32px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(ellipse at 90% 50%, rgba(249,115,22,0.15) 0%, transparent 55%)" }} />
              <div style={{ position: "relative", zIndex: 2 }}>
                <button
                  onClick={() => router.back()}
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.1)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 18, transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                >
                  <Icon name="arrowLeft" size={14} color="white" strokeWidth={2} /> Voltar
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="heart" size={26} color="#fb923c" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h1 style={{ color: "white", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>Saúde e Bem-estar</h1>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, margin: 0 }}>
                      Cuidadores, enfermeiros, fisioterapeutas, médicos e muito mais — todos verificados e prontos para atender você.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTEÚDO */}
            <div style={{ padding: "24px 40px", boxSizing: "border-box" }}>

              {/* BUSCA + ORDENAR */}
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }}>
                    <Icon name="search" size={16} color="#9ca3af" />
                  </span>
                  <input
                    value={busca}
                    onChange={e => setBusca(e.target.value)}
                    placeholder="Buscar profissional ou especialidade..."
                    style={{ width: "100%", boxSizing: "border-box", paddingLeft: 40, paddingRight: 16, paddingTop: 11, paddingBottom: 11, fontSize: 13, color: "#374151", background: "white", border: "1.5px solid #e5e7eb", borderRadius: 12, outline: "none", transition: "border 0.2s, box-shadow 0.2s" }}
                    onFocus={e => { e.target.style.borderColor = "#f97316"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.12)"; }}
                    onBlur={e =>  { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setShowOrder(v => !v)}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 16px", background: "white", border: "1.5px solid #e5e7eb", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    <Icon name="sliders" size={15} color="#6b7280" /> {labelOrdenar} <Icon name="chevDown" size={14} color="#6b7280" />
                  </button>
                  {showOrder && (
                    <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "white", border: "1.5px solid #e5e7eb", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 100, minWidth: 200, overflow: "hidden" }}>
                      {ORDENAR.map(o => (
                        <button key={o.key} onClick={() => { setOrdenar(o.key); setShowOrder(false); }}
                          style={{ width: "100%", textAlign: "left", padding: "10px 16px", fontSize: 13, fontWeight: o.key === ordenar ? 700 : 400, color: o.key === ordenar ? "#f97316" : "#374151", background: o.key === ordenar ? "#fff7ed" : "transparent", border: "none", cursor: "pointer" }}>
                          {o.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* SUBCATEGORIAS */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {SUBCATEGORIAS.map(s => (
                  <button key={s.key} onClick={() => setSubcat(s.key)}
                    style={{ padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: subcat === s.key ? 700 : 500, cursor: "pointer", transition: "all 0.18s", border: subcat === s.key ? "1.5px solid #f97316" : "1.5px solid #e5e7eb", background: subcat === s.key ? "#f97316" : "white", color: subcat === s.key ? "white" : "#6b7280", boxShadow: subcat === s.key ? "0 2px 8px rgba(249,115,22,0.3)" : "none" }}>
                    {s.label}
                  </button>
                ))}
              </div>

              {/* RESULTADO */}
              <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>
                {filtrados.length} profissional{filtrados.length !== 1 ? "is" : ""} encontrado{filtrados.length !== 1 ? "s" : ""}
              </p>

              {/* GRID */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(195px, 1fr))", gap: 16 }}>
                {filtrados.map((pro, i) => (
                  <div key={pro.id} className="card-ani" style={{ animationDelay: `${i * 40}ms` }}>
                    <ProfissionalCard pro={pro} onContratar={setModalPro} />
                  </div>
                ))}
                {filtrados.length === 0 && (
                  <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontSize: 14 }}>
                    Nenhum profissional encontrado para essa busca.
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <footer style={{ backgroundColor: "#0d1b3e", color: "white", marginTop: 16 }}>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 40px", display: "flex", alignItems: "center", gap: 10 }}>
                <img src="/Logo_branca.png" alt="Fazuno" style={{ height: 36, width: "auto" }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>© 2026 FazUno. Todos os direitos reservados.</span>
              </div>
            </footer>

          </div>
        </div>
      </div>

      {modalPro && <ModalContratar pro={modalPro} onClose={() => setModalPro(null)} />}
    </>
  );
}