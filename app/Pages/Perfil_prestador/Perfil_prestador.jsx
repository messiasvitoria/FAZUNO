"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TodosServicosPrestador from "./Todos_servicos_prestador";
import {
  FaStar, FaStarHalfAlt, FaRegStar,
  FaMapMarkerAlt, FaCheckCircle,
  FaShieldAlt, FaClock, FaChevronDown, FaChevronUp,
  FaHeart, FaRegHeart,
  FaBroom, FaPaintRoller, FaHeartbeat, FaGraduationCap, FaCut,
  FaLaptop, FaEllipsisH, FaExclamationCircle, FaBan,
  FaWrench, FaBolt, FaFileAlt, FaCalendar,
  FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight,
  FaCommentDots, FaPlug, FaLightbulb, FaTools, FaExclamationTriangle, FaShareAlt,
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
  greenBg: "#DFF7E8",
  red:     "#FF2D2D",
  star:    "#F59E0B",
};

// ── PADRONIZADO: mesma foto usada no Modal_Detalhes_Cliente ──
const PHOTO_PROVIDER = "https://randomuser.me/api/portraits/men/32.jpg";
const EXTERNAL_DIRECT_SERVICE_KEY = "fazuno_solicitacao_direta_servico_externo";

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

// ── PADRONIZADO: prévia de "Serviços ofertados" (todas elétricas) ──
const SERVICES_PREVIEW = [
  { title: "Instalação elétrica residencial",      desc: "Instalações elétricas residenciais e comerciais completas, do projeto à execução.", price: "120,00", Icon: FaBolt,               photo: PORTFOLIO_PHOTOS[0] },
  { title: "Manutenção elétrica preventiva",       desc: "Reparos elétricos, troca de disjuntores, tomadas e interruptores com segurança.",   price: "110,00", Icon: FaTools,              photo: PORTFOLIO_PHOTOS[1] },
  { title: "Troca de fiação e cabeamento",         desc: "Substituição completa de fiação antiga ou danificada, com materiais de qualidade.", price: "150,00", Icon: FaPlug,               photo: PORTFOLIO_PHOTOS[2] },
  { title: "Instalação de iluminação LED",         desc: "Instalação de luminárias, spots, fitas de LED e iluminação decorativa.",            price: "90,00",  Icon: FaLightbulb,          photo: PORTFOLIO_PHOTOS[3] },
  { title: "Instalação de quadro de distribuição",  desc: "Montagem e revisão de quadros de distribuição com disjuntores certificados.",       price: "180,00", Icon: FaShieldAlt,          photo: PORTFOLIO_PHOTOS[4] },
  { title: "Instalação de tomadas e interruptores",desc: "Instalação de tomadas, interruptores e pontos de energia.",                          price: "70,00",  Icon: FaBolt,               photo: PORTFOLIO_PHOTOS[0] },
  { title: "Reparo de curto-circuito",             desc: "Atendimento rápido para curtos-circuitos e falhas elétricas urgentes.",              price: "130,00", Icon: FaExclamationTriangle, photo: PORTFOLIO_PHOTOS[1] },
  { title: "Revisão e laudo NR-10",                desc: "Vistoria completa com laudo técnico conforme norma NR-10.",                          price: "160,00", Icon: FaShieldAlt,          photo: PORTFOLIO_PHOTOS[2] },
];

function normalizeProfileKey(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

const PROFILE_BY_PROFESSION = {
  eletricista: {
    servicesCompleted: 156,
    completionRate: 98,
    about: "Sou eletricista profissional com mais de 8 anos de experiência em instalações, manutenções e reparos elétricos residenciais, comerciais e prediais. Trabalho com compromisso, segurança e qualidade, sempre buscando a satisfação dos meus clientes.",
    highlights: ["Experiência: 8+ anos", "Atendimento rápido e eficiente", "Materiais de qualidade", "Garantia nos serviços realizados"],
    skills: ["Instalações elétricas", "Manutenção preventiva", "Quadros de distribuição", "Curto-circuitos", "Iluminação LED", "Tomadas e interruptores", "Fiação e cabeamento"],
    certifications: [{ name: "NR 10 - Segurança em Instalações e Serviços em Eletricidade", year: 2023, verified: true }],
    serviceInfo: {
      neighborhoods: "Vila Madalena, Pinheiros, Perdizes, Sumaré, Pompeia e região",
      radius: "Até 15 km",
      topServices: "Instalações elétricas, Reparos, Troca de fiação, Iluminação",
      schedule: "Segunda a Sexta: 8h às 18h\nSábado: 8h às 12h",
    },
    category: "Elétrica",
    subcategory: "Serviço elétrico",
    serviceFor: "Residências, comércios e pequenos condomínios",
    services: SERVICES_PREVIEW,
  },
  cuidadora: {
    servicesCompleted: 94,
    completionRate: 97,
    about: "Sou cuidadora com experiência no acompanhamento de idosos, crianças e pessoas que precisam de apoio na rotina. Trabalho com atenção, paciência e responsabilidade para oferecer um atendimento humanizado e seguro.",
    highlights: ["Experiência com cuidados domiciliares", "Acompanhamento com atenção e respeito", "Comunicação clara com a família", "Pontualidade nos atendimentos"],
    skills: ["Acompanhamento diário", "Cuidados com idosos", "Apoio em consultas", "Organização de rotina", "Administração de horários", "Companhia e bem-estar"],
    certifications: [{ name: "Curso de cuidador domiciliar", year: 2024, verified: true }],
    serviceInfo: {
      neighborhoods: "Vila Madalena, Pinheiros, Perdizes, Moema e região",
      radius: "Até 12 km",
      topServices: "Acompanhamento domiciliar, Cuidados com idosos, Apoio em consultas",
      schedule: "Segunda a Sexta: 7h às 19h\nPlantões sob consulta",
    },
    category: "Saúde e Cuidados",
    subcategory: "Cuidado domiciliar",
    serviceFor: "Idosos, crianças e pessoas em recuperação",
    services: [
      { title: "Acompanhamento domiciliar", desc: "Apoio na rotina, companhia e acompanhamento seguro durante o dia.", price: "150,00", Icon: FaHeartbeat, photo: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=300&fit=crop" },
      { title: "Cuidados com idosos", desc: "Atendimento humanizado para idosos com apoio em atividades diárias.", price: "180,00", Icon: FaHeartbeat, photo: "https://images.unsplash.com/photo-1576765608866-5b51046452be?w=400&h=300&fit=crop" },
      { title: "Apoio em consultas", desc: "Acompanhamento em consultas, exames e deslocamentos com segurança.", price: "120,00", Icon: FaCheckCircle, photo: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop" },
      { title: "Plantão de cuidados", desc: "Plantões combinados para suporte em períodos específicos.", price: "220,00", Icon: FaClock, photo: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop" },
    ],
  },
  faxineira: {
    servicesCompleted: 126,
    completionRate: 96,
    about: "Sou profissional de limpeza residencial, com foco em organização, capricho e cuidado com cada ambiente. Atendo casas e apartamentos com materiais adequados e atenção aos detalhes.",
    highlights: ["Limpeza detalhada", "Organização de ambientes", "Atendimento pontual", "Cuidado com móveis e superfícies"],
    skills: ["Faxina residencial", "Limpeza pós-obra leve", "Organização", "Limpeza de cozinha", "Limpeza de banheiros", "Passadoria sob combinação"],
    certifications: [{ name: "Boas práticas de limpeza residencial", year: 2024, verified: true }],
    serviceInfo: {
      neighborhoods: "Vila Madalena, Pinheiros, Pompeia, Perdizes e região",
      radius: "Até 10 km",
      topServices: "Faxina residencial, Limpeza pesada, Organização",
      schedule: "Segunda a Sábado: 8h às 17h",
    },
    category: "Limpeza",
    subcategory: "Limpeza residencial",
    serviceFor: "Casas e apartamentos",
    services: [
      { title: "Faxina residencial", desc: "Limpeza completa de cômodos, cozinha, banheiros e áreas comuns.", price: "120,00", Icon: FaBroom, photo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop" },
      { title: "Limpeza pesada", desc: "Limpeza mais detalhada para ambientes que precisam de cuidado extra.", price: "180,00", Icon: FaBroom, photo: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop" },
      { title: "Organização de ambientes", desc: "Organização de armários, quartos e áreas de uso diário.", price: "100,00", Icon: FaCheckCircle, photo: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop" },
    ],
  },
  encanador: {
    servicesCompleted: 98,
    completionRate: 95,
    about: "Sou encanador com experiência em reparos hidráulicos, instalação de torneiras, desentupimentos e manutenção preventiva. Trabalho com diagnóstico claro e solução prática para evitar novos vazamentos.",
    highlights: ["Atendimento rápido", "Reparos com garantia", "Diagnóstico de vazamentos", "Instalações hidráulicas"],
    skills: ["Troca de torneira", "Reparo de vazamento", "Desentupimento", "Instalação de chuveiro", "Instalação hidráulica", "Manutenção preventiva"],
    certifications: [{ name: "Manutenção hidráulica residencial", year: 2024, verified: true }],
    serviceInfo: {
      neighborhoods: "Moema, Vila Madalena, Pinheiros, Brooklin e região",
      radius: "Até 15 km",
      topServices: "Torneiras, Vazamentos, Desentupimentos, Chuveiros",
      schedule: "Segunda a Sexta: 8h às 18h\nEmergências sob consulta",
    },
    category: "Hidráulica",
    subcategory: "Serviço hidráulico",
    serviceFor: "Residências e pequenos comércios",
    services: [
      { title: "Instalação de torneira", desc: "Instalação ou troca de torneiras com teste de vedação.", price: "100,00", Icon: FaWrench, photo: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop" },
      { title: "Reparo de vazamento", desc: "Identificação e correção de vazamentos em pias, banheiros e áreas de serviço.", price: "140,00", Icon: FaTools, photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
      { title: "Desentupimento simples", desc: "Desentupimento de ralos, pias e vasos com avaliação no local.", price: "160,00", Icon: FaExclamationTriangle, photo: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop" },
    ],
  },
  pintora: {
    servicesCompleted: 87,
    completionRate: 96,
    about: "Sou pintora residencial com experiência em pintura interna, preparação de paredes e acabamentos. Trabalho com cuidado no isolamento dos ambientes e atenção ao acabamento final.",
    highlights: ["Acabamento profissional", "Proteção dos ambientes", "Orientação sobre tintas", "Entrega limpa e organizada"],
    skills: ["Pintura interna", "Pintura de parede", "Preparação de superfície", "Textura simples", "Retoques", "Acabamento"],
    certifications: [{ name: "Técnicas de pintura residencial", year: 2024, verified: true }],
    serviceInfo: {
      neighborhoods: "Pinheiros, Vila Madalena, Perdizes, Butantã e região",
      radius: "Até 12 km",
      topServices: "Pintura residencial, Retoques, Preparação de paredes",
      schedule: "Segunda a Sexta: 8h às 18h",
    },
    category: "Pintura",
    subcategory: "Pintura residencial",
    serviceFor: "Casas, apartamentos e pequenos ambientes",
    services: [
      { title: "Pintura residencial", desc: "Pintura interna com preparação básica e acabamento uniforme.", price: "250,00", Icon: FaPaintRoller, photo: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop" },
      { title: "Pintura de parede", desc: "Pintura de paredes avulsas com isolamento do ambiente.", price: "160,00", Icon: FaPaintRoller, photo: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&h=300&fit=crop" },
      { title: "Retoques e acabamento", desc: "Correção de marcas, retoques e acabamento em áreas pequenas.", price: "90,00", Icon: FaCheckCircle, photo: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop" },
    ],
  },
  jardineiro: {
    servicesCompleted: 71,
    completionRate: 95,
    about: "Sou jardineiro com experiência em manutenção de jardins, poda, limpeza de áreas verdes e cuidados com plantas ornamentais. Busco deixar o espaço bonito, saudável e bem cuidado.",
    highlights: ["Poda cuidadosa", "Manutenção de jardins", "Cuidados com plantas", "Limpeza de área verde"],
    skills: ["Poda", "Jardinagem", "Plantio", "Adubação", "Limpeza de quintal", "Manutenção de vasos"],
    certifications: [{ name: "Jardinagem e manutenção paisagística", year: 2023, verified: true }],
    serviceInfo: {
      neighborhoods: "Perdizes, Pinheiros, Vila Madalena e região",
      radius: "Até 15 km",
      topServices: "Poda, Jardinagem, Manutenção de área verde",
      schedule: "Segunda a Sábado: 7h às 17h",
    },
    category: "Jardinagem",
    subcategory: "Manutenção de jardim",
    serviceFor: "Jardins, quintais e áreas externas",
    services: [
      { title: "Manutenção de jardim", desc: "Corte, limpeza e organização de jardins residenciais.", price: "100,00", Icon: FaTools, photo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop" },
      { title: "Poda de plantas", desc: "Poda de arbustos, plantas ornamentais e pequenas árvores.", price: "120,00", Icon: FaCheckCircle, photo: "https://images.unsplash.com/photo-1599685315640-7e144c4f4d72?w=400&h=300&fit=crop" },
      { title: "Plantio e adubação", desc: "Plantio de mudas, troca de vasos e adubação do solo.", price: "90,00", Icon: FaShieldAlt, photo: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop" },
    ],
  },
  cozinheira: {
    servicesCompleted: 112,
    completionRate: 97,
    about: "Sou cozinheira com experiência em refeições do dia a dia, preparo de marmitas, pratos caseiros e organização básica da cozinha após o preparo. Trabalho com cuidado, higiene e atenção ao gosto do cliente.",
    highlights: ["Comida caseira", "Preparo organizado", "Higiene no preparo", "Cardápios combinados"],
    skills: ["Refeições caseiras", "Marmitas", "Pré-preparo", "Organização da cozinha", "Cardápio semanal", "Pratos simples"],
    certifications: [{ name: "Boas práticas na manipulação de alimentos", year: 2024, verified: true }],
    serviceInfo: {
      neighborhoods: "Moema, Pinheiros, Vila Mariana, Vila Madalena e região",
      radius: "Até 10 km",
      topServices: "Refeições caseiras, Marmitas, Cardápio semanal",
      schedule: "Segunda a Sexta: 8h às 17h",
    },
    category: "Cozinha",
    subcategory: "Serviço de cozinha",
    serviceFor: "Residências e pequenas rotinas familiares",
    services: [
      { title: "Cozinha do dia a dia", desc: "Preparo de refeições caseiras combinadas com o cliente.", price: "160,00", Icon: FaCheckCircle, photo: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop" },
      { title: "Preparo de marmitas", desc: "Preparo de marmitas semanais com organização e higiene.", price: "180,00", Icon: FaFileAlt, photo: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop" },
      { title: "Cardápio semanal", desc: "Organização e preparo de refeições para a semana.", price: "220,00", Icon: FaCalendar, photo: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400&h=300&fit=crop" },
    ],
  },
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerPhoto = searchParams.get("foto") || PHOTO_PROVIDER;
  const requestedProfession = searchParams.get("servico") || PROVIDER.mainProfession;
  const roleProfile = PROFILE_BY_PROFESSION[normalizeProfileKey(requestedProfession)] || PROFILE_BY_PROFESSION.eletricista;
  const p = {
    ...PROVIDER,
    ...roleProfile,
    name: searchParams.get("nome") || PROVIDER.name,
    mainProfession: requestedProfession,
    rating: Number(searchParams.get("avaliacao")) || PROVIDER.rating,
    totalRatings: Number(searchParams.get("avaliacoes")) || PROVIDER.totalRatings,
  };
  const [showAll, setShowAll]       = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [skillHover, setSkillHover] = useState(null);
  const [favorited, setFavorited]   = useState(false);
  const [shared, setShared] = useState(false);
  const [showCatalogo, setShowCatalogo] = useState(false);
  const carouselRef = useRef(null);
  const offeredServices = p.services || SERVICES_PREVIEW;

  const visibleReviews = showAll ? p.reviews : p.reviews.slice(0, 2);

  function scrollCarousel(dir) {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 230, behavior: "smooth" });
  }

  function buildDirectService(service, index) {
    return {
      id: 8500 + index,
      title: service.title,
      professional: p.name,
      rating: String(p.rating),
      reviews: String(p.totalRatings),
      price: `R$ ${service.price.replace(",00", "")}`,
      distance: "3 km",
      eta: "10 min",
      image: service.photo,
      profilePhoto: providerPhoto,
      profileRoute: "/Pages/Perfil_prestador",
      category: p.category,
      subcategory: p.subcategory,
      description: service.desc,
      included: ["Avaliação inicial", "Execução do serviço contratado", "Orientação ao finalizar"],
      excluded: ["Materiais não combinados", "Demandas fora do escopo inicial"],
      serviceFor: p.serviceFor,
      chargingType: "Por serviço",
      attendanceMode: "Presencial",
      executionTime: "Conforme complexidade do serviço",
      serviceArea: p.serviceInfo.neighborhoods,
      nextAvailability: "Hoje após 14h",
      completedServices: `${p.servicesCompleted} serviços realizados`,
      address: "Rua das Flores, 123, Vila Madalena, São Paulo - SP",
    };
  }

  function openDirectFlow(service, index, step) {
    window.sessionStorage.setItem(EXTERNAL_DIRECT_SERVICE_KEY, JSON.stringify(buildDirectService(service, index)));
    router.push(`/Pages/Escolha_contratacao?fluxo=direta&etapa=${step}&servicoExterno=1`);
  }

  if (showCatalogo) {
    return (
      <TodosServicosPrestador
        onVoltar={() => setShowCatalogo(false)}
        providerData={p}
        providerPhoto={providerPhoto}
        servicesData={offeredServices}
      />
    );
  }

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
        .services-carousel::-webkit-scrollbar { display:none; }
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
                    src={providerPhoto}
                    alt={p.name}
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

              {/* ── BOTÕES "ENVIAR MENSAGEM" + "FAVORITAR PERFIL" (substituindo "Editar perfil") ── */}
              <div style={{ display:"flex", flexDirection:"column", gap:10, flexShrink:0 }}>
                <button
                  onClick={() => router.push(`/Pages/Chat?nome=${encodeURIComponent(p.name)}&tipo=prestador&servico=${encodeURIComponent("Perfil do prestador")}&origem=perfil-prestador`)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=C.orange; e.currentTarget.style.background="rgba(255,255,255,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; e.currentTarget.style.background="transparent"; }}
                  style={{ height:40, padding:"0 18px", background:"transparent", border:"1.5px solid rgba(255,255,255,0.3)", borderRadius:8, color:"#fff", fontSize:".84rem", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:7, transition:"all 0.15s", whiteSpace:"nowrap" }}>
                  <FaCommentDots size={13}/> Enviar mensagem
                </button>
                <button
                  onClick={() => setFavorited(v => !v)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=C.orange; e.currentTarget.style.background="rgba(255,255,255,0.08)"; }}
onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; e.currentTarget.style.background="transparent"; }}
                  style={{ height:40, padding:"0 18px", background:"transparent", border:"1.5px solid rgba(255,255,255,0.3)", borderRadius:8, color:"#fff", fontSize:".84rem", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:7, transition:"all 0.15s", whiteSpace:"nowrap" }}>
                  {favorited ? <FaHeart size={13} style={{ color:C.orange }}/> : <FaRegHeart size={13}/>} {favorited ? "Favoritado" : "Favoritar perfil"}
                </button>
                <button
                  onClick={() => {
                    const url = typeof window !== "undefined" ? window.location.href : "";
                    navigator?.clipboard?.writeText(url);
                    setShared(true);
                    window.setTimeout(() => setShared(false), 1800);
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=C.orange; e.currentTarget.style.background="rgba(255,255,255,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; e.currentTarget.style.background="transparent"; }}
                  style={{ height:40, padding:"0 18px", background:"transparent", border:"1.5px solid rgba(255,255,255,0.3)", borderRadius:8, color:"#fff", fontSize:".84rem", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:7, transition:"all 0.15s", whiteSpace:"nowrap" }}>
                  <FaShareAlt size={13}/> {shared ? "Link copiado" : "Compartilhar perfil"}
                </button>
              </div>
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

          {/* ── SERVIÇOS OFERTADOS (carrossel) ── */}
          <AnimCard delay={95} style={{ ...card, marginBottom:20 }}>
            <div style={{ padding:"24px 26px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
                <p style={{ ...secTitle, marginBottom:0 }}>Serviços ofertados</p>
                <button
                  onClick={() => setShowCatalogo(true)}
                  onMouseEnter={e => e.currentTarget.style.textDecoration="underline"}
                  onMouseLeave={e => e.currentTarget.style.textDecoration="none"}
                  style={{ background:"none", border:"none", color:C.orange, fontSize:".83rem", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
                  Ver todos os serviços <FaArrowRight size={11}/>
                </button>
              </div>

              <div style={{ position:"relative" }}>
                <button
                  onClick={() => scrollCarousel(-1)}
                  style={{ position:"absolute", left:-8, top:"38%", transform:"translateY(-50%)", width:34, height:34, borderRadius:"50%", background:"#fff", border:`1.5px solid ${C.border}`, boxShadow:"0 4px 12px rgba(6,16,74,0.12)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:2 }}>
                  <FaChevronLeft size={12} color={C.navy}/>
                </button>
                <button
                  onClick={() => scrollCarousel(1)}
                  style={{ position:"absolute", right:-8, top:"38%", transform:"translateY(-50%)", width:34, height:34, borderRadius:"50%", background:"#fff", border:`1.5px solid ${C.border}`, boxShadow:"0 4px 12px rgba(6,16,74,0.12)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:2 }}>
                  <FaChevronRight size={12} color={C.navy}/>
                </button>

                <div ref={carouselRef} className="services-carousel" style={{ display:"flex", gap:14, overflowX:"auto", scrollSnapType:"x mandatory", paddingBottom:4, scrollbarWidth:"none" }}>
                  {offeredServices.map((s,i) => (
                    <div key={i}
                      style={{ minWidth:212, maxWidth:212, flexShrink:0, scrollSnapAlign:"start", border:`1.5px solid ${C.border}`, borderRadius:12, overflow:"hidden", background:C.bg, transition:"transform 0.2s, box-shadow 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 10px 24px rgba(6,16,74,0.10)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                      <div style={{ position:"relative", width:"100%", aspectRatio:"4/3" }}>
                        <img src={s.photo} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                          onError={e => { e.target.src=`https://picsum.photos/seed/serv${i+1}/400/300`; }}/>
                        <div style={{ position:"absolute", top:8, left:8, width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,0.92)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <s.Icon style={{ color:C.orange, fontSize:".85rem" }}/>
                        </div>
                      </div>
                      <div style={{ padding:"13px 14px 15px" }}>
                        <div style={{ fontFamily:"'Sora',sans-serif", fontSize:".84rem", fontWeight:700, color:C.navy, marginBottom:6, lineHeight:1.3, minHeight:34 }}>{s.title}</div>
                        <p style={{ fontSize:".73rem", color:C.muted, fontWeight:500, lineHeight:1.5, margin:"0 0 10px", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", minHeight:32 }}>{s.desc}</p>
                        <div style={{ fontSize:".68rem", color:C.muted, fontWeight:600, marginBottom:2 }}>A partir de</div>
                        <div style={{ fontFamily:"'Sora',sans-serif", fontSize:".92rem", fontWeight:800, color:C.navy, marginBottom:12 }}>R$ {s.price}</div>
                        <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                          <button type="button" onClick={() => openDirectFlow(s, i, 4)} style={{ width:"100%", padding:"8px 0", borderRadius:8, border:"none", background:C.navy, color:"#fff", fontSize:".77rem", fontWeight:700, fontFamily:"'Sora',sans-serif", cursor:"pointer" }}>Solicitar serviço</button>
                          <button type="button" onClick={() => openDirectFlow(s, i, 3)} style={{ width:"100%", padding:"8px 0", borderRadius:8, border:`1.5px solid ${C.border2}`, background:C.bg, color:C.navy, fontSize:".77rem", fontWeight:700, fontFamily:"'Sora',sans-serif", cursor:"pointer" }}>Ver detalhes</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                    <div style={{ width:42, height:42, borderRadius:"50%", background:C.bgLight, border:`2px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <FaBan style={{ color:C.muted, fontSize:"1rem" }}/>
                    </div>
                    <div>
                      <div style={{ fontFamily:"'Sora',sans-serif", fontSize:".88rem", fontWeight:700, color:C.navy }}>Avaliação anônima</div>
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

          {/* ── Banner Segurança ── */}
          <div style={{ background:"linear-gradient(130deg,#06104A 0%,#143660 100%)", borderRadius:16, padding:"20px 24px", display:"flex", alignItems:"center", gap:16, position:"relative", overflow:"hidden", marginTop:20 }}>
            <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(ellipse at 100% 50%, rgba(241,103,15,0.12) 0%, transparent 60%)" }}/>
            <div style={{ width:48, height:48, borderRadius:14, backgroundColor:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, zIndex:2 }}>
              <FaShieldAlt style={{ color:C.orange, fontSize:"1.4rem" }}/>
            </div>
            <div style={{ zIndex:2 }}>
              <p style={{ margin:"0 0 3px", fontSize:".9rem", fontWeight:700, color:"#fff", fontFamily:"'Sora',sans-serif" }}>Perfil seguro e confiável</p>
              <p style={{ margin:0, fontSize:".8rem", color:"rgba(255,255,255,0.6)", lineHeight:1.5 }}>
                Todas as informações deste perfil são checadas pela nossa equipe para garantir mais segurança para os clientes da plataforma.
              </p>
            </div>
          </div>

        </div>{/* fecha maxWidth */}

        {/* ── Rodapé ── */}
        <footer style={{ backgroundColor:"#0d1b3e", color:"white", marginTop:8 }}>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", padding:"16px 40px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <img src="/Logo_branca.png" alt="Fazuno" style={{ height:36, width:"auto", display:"block" }}/>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginLeft:8 }}>© 2026 FazUno. Todos os direitos reservados.</span>
            </div>
          </div>
        </footer>

      </div>{/* fecha position:fixed */}

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
    </>
  );
}
