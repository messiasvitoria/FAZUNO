"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft, FaStar, FaMapMarkerAlt, FaCheckCircle, FaCommentDots,
  FaHeart, FaRegHeart, FaSearch, FaTimes, FaShareAlt,
  FaChevronLeft, FaChevronRight, FaBolt, FaTools, FaPlug, FaLightbulb,
  FaShieldAlt, FaExclamationTriangle,
} from "react-icons/fa";

const C = {
  navy:    "#06104A",
  band:    "#143660",
  orange:  "#f1670f",
  purple:  "#7C5CFC",
  muted:   "#6975A8",
  border:  "#E2E7F0",
  border2: "#DDE3EE",
  bg:      "#FFFFFF",
  bgLight: "#F2F4F8",
  green:   "#16A34A",
  star:    "#F59E0B",
};


const PHOTO_PROVIDER = "https://randomuser.me/api/portraits/men/32.jpg";

const SERVICE_PHOTOS = [
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
];

const PROVIDER = {
  name: "João Silva",
  profession: "Eletricista profissional",
  city: "São Paulo", state: "SP",
  rating: 4.9, totalRatings: 128,
  verified: true,
};

const CATEGORIES = ["Todas as categorias", "Residencial", "Comercial", "Manutenção", "Instalação", "Emergencial"];
const SORT_OPTIONS = ["Mais contratados", "Menor preço", "Maior avaliação"];
const ITEMS_PER_PAGE = 8;
const EXTERNAL_DIRECT_SERVICE_KEY = "fazuno_solicitacao_direta_servico_externo";

const SERVICES = [
  { id:1,  title:"Instalação elétrica residencial completa", category:"Residencial", desc:"Instalações elétricas residenciais e comerciais completas, do projeto à execução.", price:120, rating:4.9, reviews:32, contratacoes:23, Icon:FaBolt, destaque:true, photo:SERVICE_PHOTOS[0] },
  { id:2,  title:"Instalação elétrica comercial e predial",  category:"Comercial",   desc:"Projetos e instalações elétricas para lojas, escritórios e condomínios.", price:280, rating:4.8, reviews:14, contratacoes:9,  Icon:FaBolt, photo:SERVICE_PHOTOS[1] },
  { id:3,  title:"Manutenção elétrica preventiva",           category:"Manutenção",  desc:"Reparos elétricos, troca de disjuntores, tomadas e interruptores com segurança.", price:110, rating:4.9, reviews:28, contratacoes:32, Icon:FaTools, photo:SERVICE_PHOTOS[2] },
  { id:4,  title:"Troca de fiação e cabeamento",              category:"Manutenção",  desc:"Substituição completa de fiação antiga ou danificada, com materiais de qualidade.", price:150, rating:4.8, reviews:21, contratacoes:17, Icon:FaPlug, photo:SERVICE_PHOTOS[3] },
  { id:5,  title:"Instalação de iluminação LED",              category:"Instalação", desc:"Instalação de luminárias, spots, fitas de LED e iluminação decorativa.", price:90,  rating:4.8, reviews:13, contratacoes:11, Icon:FaLightbulb, photo:SERVICE_PHOTOS[4] },
  { id:6,  title:"Instalação de quadro de distribuição",      category:"Instalação", desc:"Montagem e revisão de quadros de distribuição com disjuntores certificados.", price:180, rating:4.9, reviews:18, contratacoes:14, Icon:FaShieldAlt, photo:SERVICE_PHOTOS[0] },
  { id:7,  title:"Instalação de tomadas e interruptores",     category:"Instalação", desc:"Instalação de tomadas, interruptores e pontos de energia.", price:70,  rating:4.8, reviews:10, contratacoes:14, Icon:FaBolt, photo:SERVICE_PHOTOS[1] },
  { id:8,  title:"Reparo de curto-circuito",                  category:"Emergencial",desc:"Atendimento rápido para curtos-circuitos e falhas elétricas urgentes.", price:130, rating:5.0, reviews:9,  contratacoes:8,  Icon:FaExclamationTriangle, photo:SERVICE_PHOTOS[2] },
  { id:9,  title:"Revisão e laudo de instalação (NR-10)",     category:"Manutenção", desc:"Vistoria completa com laudo técnico conforme norma NR-10.", price:160, rating:4.9, reviews:15, contratacoes:12, Icon:FaShieldAlt, photo:SERVICE_PHOTOS[3] },
  { id:10, title:"Instalação de chuveiro elétrico",           category:"Residencial",desc:"Instalação e troca de chuveiros e duchas elétricas com segurança.", price:80,  rating:4.9, reviews:19, contratacoes:22, Icon:FaBolt, photo:SERVICE_PHOTOS[4] },
  { id:11, title:"Troca de disjuntores",                      category:"Manutenção", desc:"Substituição de disjuntores queimados ou subdimensionados.", price:95,  rating:4.7, reviews:11, contratacoes:13, Icon:FaTools, photo:SERVICE_PHOTOS[0] },
  { id:12, title:"Instalação de ventiladores de teto",        category:"Residencial",desc:"Instalação de ventiladores de teto com ponto elétrico já existente.", price:100, rating:4.8, reviews:8,  contratacoes:7,  Icon:FaBolt, photo:SERVICE_PHOTOS[1] },
  { id:13, title:"Atendimento elétrico de emergência 24h",    category:"Emergencial",desc:"Atendimento urgente a qualquer hora para falhas elétricas críticas.", price:200, rating:5.0, reviews:6,  contratacoes:5,  Icon:FaExclamationTriangle, photo:SERVICE_PHOTOS[2] },
  { id:14, title:"Instalação elétrica predial",               category:"Comercial",  desc:"Instalação elétrica completa para edifícios e condomínios.", price:350, rating:4.9, reviews:7,  contratacoes:4,  Icon:FaBolt, photo:SERVICE_PHOTOS[3] },
  { id:15, title:"Aterramento e proteção contra surtos",      category:"Instalação", desc:"Instalação de aterramento e dispositivos DPS para proteção elétrica.", price:140, rating:4.8, reviews:9,  contratacoes:6,  Icon:FaShieldAlt, photo:SERVICE_PHOTOS[4] },
  { id:16, title:"Vistoria elétrica para laudo de seguro",     category:"Manutenção", desc:"Vistoria e laudo técnico para fins de seguro residencial ou comercial.", price:170, rating:4.9, reviews:5,  contratacoes:3,  Icon:FaShieldAlt, photo:SERVICE_PHOTOS[0] },
];

const pageBtnStyle = { width:32, height:32, borderRadius:7, border:`1.5px solid ${C.border2}`, background:"#fff", color:C.navy, fontSize:".82rem", fontWeight:700, fontFamily:"'Sora',sans-serif", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" };

export default function TodosServicosPrestador({ onVoltar }) {
  const router = useRouter();
  const [search, setSearch]         = useState("");
  const [category, setCategory]     = useState("Todas as categorias");
  const [sort, setSort]             = useState("Mais contratados");
  const [page, setPage]             = useState(1);
  const [favorited, setFavorited]   = useState(false);
  const [shared, setShared] = useState(false);
  const [favServices, setFavServices] = useState(new Set());

  function toggleFavService(id) {
    setFavServices(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function limparFiltros() {
    setSearch(""); setCategory("Todas as categorias"); setSort("Mais contratados"); setPage(1);
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = SERVICES.filter(s => {
      const matchesTerm = !term || (s.title + " " + s.desc).toLowerCase().includes(term);
      const matchesCat  = category === "Todas as categorias" || s.category === category;
      return matchesTerm && matchesCat;
    });
    if (sort === "Menor preço")          list = [...list].sort((a,b) => a.price - b.price);
    else if (sort === "Maior avaliação") list = [...list].sort((a,b) => b.rating - a.rating);
    else                                  list = [...list].sort((a,b) => b.contratacoes - a.contratacoes);
    return list;
  }, [search, category, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage  = Math.min(page, pageCount);
  const start     = (safePage - 1) * ITEMS_PER_PAGE;
  const visible   = filtered.slice(start, start + ITEMS_PER_PAGE);

  function updateSearch(v)   { setSearch(v); setPage(1); }
  function updateCategory(v) { setCategory(v); setPage(1); }
  function updateSort(v)     { setSort(v); setPage(1); }

  function buildDirectService(service) {
    return {
      id: 8000 + service.id,
      title: service.title,
      professional: PROVIDER.name,
      rating: String(service.rating),
      reviews: String(service.reviews),
      price: `R$ ${service.price.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`,
      distance: "3 km",
      eta: "10 min",
      image: service.photo,
      profilePhoto: PHOTO_PROVIDER,
      profileRoute: "/Pages/Perfil_prestador",
      category: "Elétrica",
      subcategory: service.category,
      description: service.desc,
      included: ["Avaliação do ponto elétrico", "Execução do serviço contratado", "Teste de segurança ao finalizar"],
      excluded: ["Materiais não combinados", "Mudanças estruturais fora do escopo"],
      serviceFor: "Residências, comércios e pequenos condomínios",
      chargingType: "Por serviço",
      attendanceMode: "Presencial",
      executionTime: "Conforme complexidade do serviço",
      serviceArea: "São Paulo e regiões próximas",
      nextAvailability: "Hoje após 14h",
      completedServices: `${service.contratacoes} contratações`,
      address: "Rua das Flores, 123, Vila Madalena, São Paulo - SP",
    };
  }

  function openDirectFlow(service, step) {
    window.sessionStorage.setItem(EXTERNAL_DIRECT_SERVICE_KEY, JSON.stringify(buildDirectService(service)));
    router.push(`/Pages/Escolha_contratacao?fluxo=direta&etapa=${step}&servicoExterno=1`);
  }

  const headerBtnBase = { height:40, padding:"0 18px", borderRadius:8, fontSize:".84rem", fontWeight:700, fontFamily:"'Sora',sans-serif", cursor:"pointer", display:"flex", alignItems:"center", gap:7, transition:"all 0.15s", whiteSpace:"nowrap" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-thumb { background:#c7cde0; border-radius:99px; }
        @keyframes tsSlideIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .ts-card { animation: tsSlideIn 0.4s ease both; }
      `}</style>

      <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#EEF1F8", color:C.navy, position:"fixed", inset:0, overflowY:"auto" }}>

        {/* ══ HERO ══ */}
        <div style={{ background:"linear-gradient(120deg,#06104A 0%,#143660 50%,#1a4a7a 100%)" }}>
          <div style={{ maxWidth:1180, margin:"0 auto", padding:"28px 40px 26px" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>

              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <button
                  onClick={() => onVoltar ? onVoltar() : router.back()}
                  style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 14px", borderRadius:8, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s", width:"fit-content" }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.16)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; }}>
                  <FaArrowLeft size={13}/> Voltar
                </button>

                <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ width:64, height:64, borderRadius:"50%", border:"3px solid rgba(255,255,255,0.5)", overflow:"hidden", flexShrink:0 }}>
                    <img src={PHOTO_PROVIDER} alt={PROVIDER.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e => { e.target.src="https://picsum.photos/seed/electrician42/200/200"; }}/>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Sora',sans-serif", fontSize:"1.3rem", fontWeight:800, color:"#fff" }}>{PROVIDER.name}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, color:"rgba(255,255,255,0.7)", fontSize:".82rem", fontWeight:600, marginTop:3 }}>
                      <FaBolt style={{ color:C.orange }}/> {PROVIDER.profession}
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:14, marginTop:8 }}>
                      <span style={{ display:"flex", alignItems:"center", gap:5, color:"rgba(255,255,255,0.8)", fontSize:".8rem", fontWeight:600 }}>
                        <FaMapMarkerAlt style={{ color:C.orange }}/> {PROVIDER.city}, {PROVIDER.state}
                      </span>
                      <span style={{ display:"flex", alignItems:"center", gap:5, color:"rgba(255,255,255,0.8)", fontSize:".8rem", fontWeight:600 }}>
                        <FaStar style={{ color:C.star }}/> {PROVIDER.rating} ({PROVIDER.totalRatings} avaliações)
                      </span>
                      {PROVIDER.verified && (
                        <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(22,163,74,0.18)", color:"#4ade80", border:"1px solid rgba(74,222,128,0.4)", fontSize:".72rem", fontWeight:700, borderRadius:999, padding:"3px 10px" }}>
                          <FaCheckCircle size={10}/> Perfil Verificado
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <button
                  onClick={() => router.push(`/Pages/Chat?nome=${encodeURIComponent(PROVIDER.name)}&tipo=prestador&servico=${encodeURIComponent("Servicos do prestador")}&origem=perfil-prestador`)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.7)"; e.currentTarget.style.background="rgba(255,255,255,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; e.currentTarget.style.background="transparent"; }}
                  style={{ ...headerBtnBase, background:"transparent", border:"1.5px solid rgba(255,255,255,0.3)", color:"#fff" }}>
                  <FaCommentDots size={13}/> Enviar mensagem
                </button>
                <button
                  onClick={() => setFavorited(v => !v)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.7)"; e.currentTarget.style.background="rgba(255,255,255,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; e.currentTarget.style.background="transparent"; }}
                  style={{ ...headerBtnBase, background:"transparent", border:"1.5px solid rgba(255,255,255,0.3)", color:"#fff" }}>
                  {favorited ? <FaHeart size={13} style={{ color:C.orange }}/> : <FaRegHeart size={13}/>} {favorited ? "Favoritado" : "Favoritar perfil"}
                </button>
                <button
                  onClick={() => {
                    const url = typeof window !== "undefined" ? window.location.href : "";
                    navigator?.clipboard?.writeText(url);
                    setShared(true);
                    window.setTimeout(() => setShared(false), 1800);
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.7)"; e.currentTarget.style.background="rgba(255,255,255,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; e.currentTarget.style.background="transparent"; }}
                  style={{ ...headerBtnBase, background:"transparent", border:"1.5px solid rgba(255,255,255,0.3)", color:"#fff" }}>
                  <FaShareAlt size={13}/> {shared ? "Link copiado" : "Compartilhar perfil"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ══ CONTEÚDO ══ */}
        <div style={{ maxWidth:1180, margin:"0 auto", padding:"26px 40px 60px" }}>

          <div style={{ marginBottom:22 }}>
            <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:"1.55rem", fontWeight:800, color:C.navy, margin:"0 0 6px" }}>Todos os serviços</h1>
            <p style={{ color:C.muted, fontSize:".9rem", fontWeight:500, margin:0 }}>
              Confira todos os serviços que {PROVIDER.name} oferece. Escolha o serviço ideal para sua necessidade.
            </p>
          </div>

          {/* Toolbar */}
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:22 }}>
            <div style={{ flex:"2 1 260px", position:"relative" }}>
              <FaSearch style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", color:C.muted, fontSize:".85rem" }}/>
              <input
                value={search}
                onChange={e => updateSearch(e.target.value)}
                placeholder="Buscar serviço..."
                style={{ width:"100%", height:46, padding:"0 16px 0 42px", borderRadius:9, border:`1.5px solid ${C.border2}`, fontSize:".86rem", fontFamily:"'DM Sans',sans-serif", color:C.navy, outline:"none", boxSizing:"border-box" }}/>
            </div>
            <select value={category} onChange={e => updateCategory(e.target.value)}
              style={{ height:46, padding:"0 14px", borderRadius:9, border:`1.5px solid ${C.border2}`, fontSize:".84rem", fontWeight:600, color:C.navy, background:"#fff", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sort} onChange={e => updateSort(e.target.value)}
              style={{ height:46, padding:"0 14px", borderRadius:9, border:`1.5px solid ${C.border2}`, fontSize:".84rem", fontWeight:600, color:C.navy, background:"#fff", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
              {SORT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={limparFiltros}
              style={{ height:46, padding:"0 18px", borderRadius:9, border:`1.5px solid ${C.orange}`, background:"#fff", color:C.orange, fontSize:".84rem", fontWeight:700, cursor:"pointer", fontFamily:"'Sora',sans-serif", display:"flex", alignItems:"center", gap:7 }}>
              <FaTimes size={12}/> Limpar filtros
            </button>
          </div>

          {/* Grid */}
          {visible.length > 0 ? (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18, marginBottom:26 }}>
              {visible.map((s,i) => {
                const isFav = favServices.has(s.id);
                return (
                  <div key={s.id} className="ts-card"
                    style={{ position:"relative", border:`1.5px solid ${C.border}`, borderRadius:12, overflow:"hidden", background:"#fff", boxShadow:"0 2px 12px rgba(6,16,74,0.05)", animationDelay:`${i*40}ms`, transition:"transform 0.2s, box-shadow 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 26px rgba(6,16,74,0.10)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 12px rgba(6,16,74,0.05)"; }}>

                    <div style={{ position:"relative", width:"100%", aspectRatio:"4/3" }}>
                      <img src={s.photo} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                        onError={e => { e.target.src=`https://picsum.photos/seed/serv${s.id}/400/300`; }}/>
                      <span style={{ position:"absolute", top:9, left:9, background:C.navy, color:"#fff", fontSize:".66rem", fontWeight:700, borderRadius:999, padding:"4px 10px" }}>
                        {s.category}
                      </span>
                      {s.destaque && (
                        <span style={{ position:"absolute", top:9, right:44, background:C.orange, color:"#fff", fontSize:".64rem", fontWeight:800, borderRadius:999, padding:"4px 9px", textTransform:"uppercase" }}>
                          Mais contratado
                        </span>
                      )}
                      <button onClick={() => toggleFavService(s.id)}
                        style={{ position:"absolute", top:8, right:8, width:28, height:28, borderRadius:"50%", background:"rgba(255,255,255,0.95)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                        {isFav ? <FaHeart size={12} color={C.orange}/> : <FaRegHeart size={12} color={C.navy}/>}
                      </button>
                    </div>

                    <div style={{ padding:"14px 16px 16px" }}>
                      <div style={{ fontFamily:"'Sora',sans-serif", fontSize:".88rem", fontWeight:700, color:C.navy, marginBottom:6, lineHeight:1.3, minHeight:36 }}>{s.title}</div>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                        <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:".76rem", fontWeight:700, color:C.navy }}>
                          <FaStar size={11} color={C.star}/> {s.rating} ({s.reviews})
                        </span>
                        <span style={{ fontSize:".72rem", color:C.muted, fontWeight:600 }}>{s.contratacoes} contratações</span>
                      </div>
                      <p style={{ fontSize:".76rem", color:C.muted, fontWeight:500, lineHeight:1.5, margin:"0 0 12px", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", minHeight:34 }}>{s.desc}</p>
                      <div style={{ fontSize:".7rem", color:C.muted, fontWeight:600, marginBottom:2 }}>A partir de</div>
                      <div style={{ fontFamily:"'Sora',sans-serif", fontSize:"1rem", fontWeight:800, color:C.navy, marginBottom:13 }}>
                        R$ {s.price.toLocaleString("pt-BR",{minimumFractionDigits:2})}
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                        <button type="button" onClick={() => openDirectFlow(s, 4)} style={{ width:"100%", padding:"9px 0", borderRadius:8, border:"none", background:C.navy, color:"#fff", fontSize:".8rem", fontWeight:700, fontFamily:"'Sora',sans-serif", cursor:"pointer" }}>Solicitar serviço</button>
                        <button type="button" onClick={() => openDirectFlow(s, 3)} style={{ width:"100%", padding:"9px 0", borderRadius:8, border:`1.5px solid ${C.border2}`, background:"#fff", color:C.navy, fontSize:".8rem", fontWeight:700, fontFamily:"'Sora',sans-serif", cursor:"pointer" }}>Ver detalhes</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign:"center", padding:"60px 0", color:C.muted, fontWeight:600 }}>
              Nenhum serviço encontrado com esses filtros.
            </div>
          )}

          {/* Paginação */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
            <span style={{ fontSize:".84rem", color:C.muted, fontWeight:600 }}>
              {filtered.length > 0
                ? `Mostrando ${start+1} a ${Math.min(start+ITEMS_PER_PAGE, filtered.length)} de ${filtered.length} serviços`
                : "Nenhum serviço encontrado"}
            </span>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <button onClick={() => setPage(Math.max(1, safePage-1))} style={pageBtnStyle}><FaChevronLeft size={11}/></button>
              {Array.from({ length: pageCount }, (_,i) => (
                <button key={i+1} onClick={() => setPage(i+1)}
                  style={{ ...pageBtnStyle, background: safePage===i+1 ? C.navy : "#fff", borderColor: safePage===i+1 ? C.navy : C.border2, color: safePage===i+1 ? "#fff" : C.navy }}>
                  {i+1}
                </button>
              ))}
              <button onClick={() => setPage(Math.min(pageCount, safePage+1))} style={pageBtnStyle}><FaChevronRight size={11}/></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
