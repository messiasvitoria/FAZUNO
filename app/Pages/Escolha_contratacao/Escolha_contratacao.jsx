"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/SideBar_cliente";
import Topbar from "../../components/TopBar_cliente";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBolt,
  FaBullhorn,
  FaCalendarAlt,
  FaBroom,
  FaCar,
  FaCheck,
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaDesktop,
  FaFilter,
  FaGraduationCap,
  FaHeart,
  FaHome,
  FaLeaf,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPaintRoller,
  FaRegCheckCircle,
  FaSearch,
  FaShareAlt,
  FaShieldAlt,
  FaStar,
  FaTimes,
  FaTint,
  FaTools,
  FaUpload,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa";

const OPTIONS = [
  {
    key: "direta",
    title: "Solicitação Direta",
    description: "Encontre um profissional que já possui um serviço cadastrado e envie uma solicitação diretamente para ele.",
    color: "#F1670F",
    hover: "#EA580C",
    soft: "#FFF4EC",
    icon: FaClipboardList,
    bullets: [
      "Você escolhe o serviço",
      "Envia a solicitação",
      "Aguarda a confirmação",
    ],
  },
  {
    key: "oportunidade",
    title: "Publicar Oportunidade",
    description: "Descreva sua necessidade e receba propostas de profissionais interessados.",
    color: "#0B55F4",
    hover: "#0847CC",
    soft: "#EEF5FF",
    icon: FaBullhorn,
    bullets: [
      "Você publica sua necessidade",
      "Profissionais enviam propostas",
      "Você escolhe a melhor proposta",
    ],
  },
];

const MENU_ITEMS = [
  { icon: "home", label: "Início", route: "/Pages/Tela_inicial_cliente" },
  { icon: "plus", label: "Abrir novas solicitações", route: "/Pages/Escolha_contratacao" },
  { icon: "list", label: "Minhas solicitações", route: "/Pages/Tela_inicial_cliente" },
  { icon: "chat", label: "Chat", route: "/Pages/Tela_inicial_cliente" },
];

const DIRECT_STEPS = [
  "Buscar serviço",
  "Resultados dos serviços",
  "Detalhes do serviço",
  "Preencher solicitação",
  "Confirmação",
];

const OPPORTUNITY_STEPS = [
  "Publicar oportunidade",
  "Detalhes",
  "Anexos",
  "Revisão",
  "Publicada",
];

const DEFAULT_OPPORTUNITY_FORM = {
  title: "Reforma de banheiro",
  category: "Reformas",
  description: "Preciso reformar o banheiro com troca de revestimento, pintura e pequenos ajustes hidráulicos.",
  location: "Vila Madalena, São Paulo - SP",
  date: "30/05/2025",
  time: "14:00",
  estimatedValue: "R$ 1.500,00",
  notes: "Tenho preferência por profissionais com disponibilidade ainda esta semana.",
  attachments: [
    { id: "foto-banheiro", type: "image", name: "banheiro-atual.jpg" },
    { id: "referencia", type: "document", name: "referencias.pdf" },
  ],
};

const DIRECT_CATEGORIES = [
  { label: "Limpeza", icon: FaBroom },
  { label: "Reformas", icon: FaHome },
  { label: "Elétrica", icon: FaBolt },
  { label: "Hidráulica", icon: FaTint },
  { label: "Pintura", icon: FaPaintRoller },
  { label: "Jardinagem", icon: FaLeaf },
  { label: "Montagem", icon: FaTools },
  { label: "Beleza", icon: FaHeart },
  { label: "Tecnologia", icon: FaDesktop },
  { label: "Automotivo", icon: FaCar },
  { label: "Educação", icon: FaGraduationCap },
];

const DIRECT_SERVICES = [
  {
    id: 1,
    title: "Instalação de chuveiro",
    professional: "João Silva",
    rating: "4.9",
    reviews: "128",
    price: "R$ 120",
    distance: "3 km",
    eta: "10 min",
    image: "/foto_encanador.jpg",
    profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    profileRoute: "/Pages/Perfil_prestador",
    category: "Elétrica",
    subcategory: "Chuveiro elétrico",
    description: "Instalação completa de chuveiro com revisão do ponto elétrico e teste de funcionamento.",
    included: ["Instalação do chuveiro", "Revisão do ponto elétrico", "Teste de funcionamento"],
    excluded: ["Peças novas", "Troca de fiação completa"],
    serviceFor: "Residências e apartamentos",
    chargingType: "Por serviço",
    attendanceMode: "Presencial",
    executionTime: "Até 1 hora",
    serviceArea: "Vila Madalena, Pinheiros e regiões próximas",
    nextAvailability: "Hoje após 14h",
    completedServices: "124 serviços realizados",
    address: "Rua das Flores, 123, Vila Madalena, São Paulo - SP",
  },
  {
    id: 2,
    title: "Instalação de torneira",
    professional: "Ana Paula",
    rating: "4.8",
    reviews: "97",
    price: "R$ 100",
    distance: "5 km",
    eta: "15 min",
    image: "/foto_encanador2.jpg",
    category: "Hidráulica",
    subcategory: "Torneiras e vazamentos",
    description: "Troca ou instalação de torneira com vedação, teste de vazamento e orientação de uso.",
    included: ["Instalação ou troca da torneira", "Vedação básica", "Teste de vazamento"],
    excluded: ["Compra da torneira", "Troca de bancada ou cuba"],
    serviceFor: "Cozinhas, banheiros e áreas de serviço",
    chargingType: "Por serviço",
    attendanceMode: "Presencial",
    executionTime: "Até 1 hora",
    serviceArea: "Moema, Vila Mariana e região sul",
    nextAvailability: "Hoje após 15h",
    completedServices: "98 serviços realizados",
    address: "Av. Liberdade, 1120, Moema, São Paulo - SP",
  },
  {
    id: 3,
    title: "Troca de tomada",
    professional: "Carlos Mendes",
    rating: "4.7",
    reviews: "46",
    price: "R$ 80",
    distance: "4 km",
    eta: "20 min",
    image: "/foto_eletricista.jpg",
    category: "Elétrica",
    subcategory: "Tomadas e pontos elétricos",
    description: "Substituição de tomadas, revisão básica da fiação e teste de segurança após a troca.",
    included: ["Troca da tomada", "Revisão do ponto", "Teste de segurança"],
    excluded: ["Nova fiação", "Quadro de energia"],
    serviceFor: "Residências e comércios pequenos",
    chargingType: "Por ponto",
    attendanceMode: "Presencial",
    executionTime: "Até 40 minutos",
    serviceArea: "Consolação, Centro e Bela Vista",
    nextAvailability: "Amanhã pela manhã",
    completedServices: "76 serviços realizados",
    address: "Rua Augusta, 450, Consolação, São Paulo - SP",
  },
  {
    id: 4,
    title: "Pintura residencial",
    professional: "Mariana Costa",
    rating: "4.8",
    reviews: "82",
    price: "R$ 160",
    distance: "6 km",
    eta: "30 min",
    image: "/foto_pintora.avif",
    category: "Reformas",
    subcategory: "Pintura interna",
    description: "Pintura de ambientes internos com acabamento limpo, proteção de móveis e organização final.",
    included: ["Proteção do ambiente", "Pintura de paredes internas", "Limpeza básica ao finalizar"],
    excluded: ["Tinta e materiais", "Correção estrutural de parede"],
    serviceFor: "Casas e apartamentos",
    chargingType: "Por ambiente",
    attendanceMode: "Presencial",
    executionTime: "1 a 2 dias",
    serviceArea: "Vila Mariana, Paraíso e Ipiranga",
    nextAvailability: "Esta semana",
    completedServices: "112 serviços realizados",
    address: "Rua Vergueiro, 880, Vila Mariana, São Paulo - SP",
  },
  {
    id: 5,
    title: "Limpeza residencial",
    professional: "Patricia Lima",
    rating: "4.9",
    reviews: "134",
    price: "R$ 140",
    distance: "2 km",
    eta: "12 min",
    image: "/foto_faxineira1.avif",
    category: "Limpeza",
    subcategory: "Limpeza padrao",
    description: "Limpeza completa para casas e apartamentos, com foco em cozinha, banheiros, quartos e areas comuns.",
    included: ["Limpeza de pisos e superficies", "Higienizacao de banheiros", "Organizacao basica dos ambientes"],
    excluded: ["Limpeza pos-obra", "Produtos especificos importados"],
    serviceFor: "Casas e apartamentos",
    chargingType: "Por diaria",
    attendanceMode: "Presencial",
    executionTime: "4 a 6 horas",
    serviceArea: "Pinheiros, Vila Madalena e Perdizes",
    nextAvailability: "Amanha pela manha",
    completedServices: "156 servicos realizados",
    address: "Rua Harmonia, 220, Vila Madalena, Sao Paulo - SP",
  },
  {
    id: 6,
    title: "Pintura de parede",
    professional: "Renata Alves",
    rating: "4.8",
    reviews: "73",
    price: "R$ 180",
    distance: "4 km",
    eta: "25 min",
    image: "/foto_pintora2.avif",
    category: "Pintura",
    subcategory: "Pintura interna",
    description: "Pintura de paredes internas com acabamento uniforme, protecao de rodapes e limpeza basica ao final.",
    included: ["Preparacao simples da parede", "Pintura de ate um ambiente", "Protecao de piso e moveis"],
    excluded: ["Tinta e massa corrida", "Correcao de infiltracao"],
    serviceFor: "Ambientes internos",
    chargingType: "Por ambiente",
    attendanceMode: "Presencial",
    executionTime: "1 dia",
    serviceArea: "Vila Mariana, Saude e Paraiso",
    nextAvailability: "Esta semana",
    completedServices: "89 servicos realizados",
    address: "Rua Domingos de Morais, 980, Vila Mariana, Sao Paulo - SP",
  },
  {
    id: 7,
    title: "Manutencao de jardim",
    professional: "Rafael Nunes",
    rating: "4.7",
    reviews: "61",
    price: "R$ 110",
    distance: "7 km",
    eta: "35 min",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=260&fit=crop&auto=format",
    category: "Jardinagem",
    subcategory: "Poda e manutencao",
    description: "Manutencao de jardins pequenos, poda leve, retirada de folhas e organizacao da area verde.",
    included: ["Poda leve", "Limpeza do jardim", "Orientacao de cuidados"],
    excluded: ["Remocao de arvores", "Compra de plantas e vasos"],
    serviceFor: "Jardins residenciais",
    chargingType: "Por visita",
    attendanceMode: "Presencial",
    executionTime: "2 a 3 horas",
    serviceArea: "Butanta, Pinheiros e Alto de Pinheiros",
    nextAvailability: "Ate 3 dias",
    completedServices: "52 servicos realizados",
    address: "Av. Corifeu de Azevedo Marques, 1500, Butanta, Sao Paulo - SP",
  },
  {
    id: 8,
    title: "Montagem de moveis",
    professional: "Pedro Lima",
    rating: "4.9",
    reviews: "119",
    price: "R$ 130",
    distance: "3 km",
    eta: "18 min",
    image: "/foto_montador_moveis.avif",
    category: "Montagem",
    subcategory: "Moveis residenciais",
    description: "Montagem de moveis novos ou desmontados, com conferencia das pecas e ajuste final.",
    included: ["Montagem do movel", "Ajustes de portas e gavetas", "Organizacao das pecas restantes"],
    excluded: ["Fixacao em parede estrutural", "Transporte de moveis"],
    serviceFor: "Guarda-roupas, racks, mesas e armarios",
    chargingType: "Por movel",
    attendanceMode: "Presencial",
    executionTime: "1 a 3 horas",
    serviceArea: "Mooca, Tatuape e Belem",
    nextAvailability: "Hoje apos 16h",
    completedServices: "143 servicos realizados",
    address: "Rua da Mooca, 910, Mooca, Sao Paulo - SP",
  },
  {
    id: 9,
    title: "Maquiagem social",
    professional: "Camila Rocha",
    rating: "5.0",
    reviews: "88",
    price: "R$ 170",
    distance: "5 km",
    eta: "30 min",
    image: "/mulher2.jpg",
    category: "Beleza",
    subcategory: "Maquiagem",
    description: "Maquiagem social para eventos, fotos e ocasioes especiais, com preparacao de pele e acabamento profissional.",
    included: ["Preparacao de pele", "Maquiagem completa", "Finalizacao para maior duracao"],
    excluded: ["Penteado", "Cilios posticos premium"],
    serviceFor: "Eventos e ensaios",
    chargingType: "Por atendimento",
    attendanceMode: "Presencial",
    executionTime: "Ate 1h30",
    serviceArea: "Centro, Liberdade e Bela Vista",
    nextAvailability: "Amanha a tarde",
    completedServices: "101 servicos realizados",
    address: "Rua Galvao Bueno, 420, Liberdade, Sao Paulo - SP",
  },
  {
    id: 10,
    title: "Suporte para computador",
    professional: "Lucas Ferreira",
    rating: "4.8",
    reviews: "64",
    price: "R$ 90",
    distance: "Atendimento remoto",
    eta: "8 min",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=260&fit=crop&auto=format",
    category: "Tecnologia",
    subcategory: "Suporte tecnico",
    description: "Suporte para computador, configuracao de programas, limpeza de arquivos e diagnostico inicial.",
    included: ["Diagnostico basico", "Configuracao de sistema", "Orientacao de uso"],
    excluded: ["Troca de pecas", "Formatacao com backup avancado"],
    serviceFor: "Notebooks e computadores pessoais",
    chargingType: "Por atendimento",
    attendanceMode: "Online / Remoto",
    executionTime: "Ate 1 hora",
    serviceArea: "Atendimento remoto para Sao Paulo",
    nextAvailability: "Disponivel agora",
    completedServices: "87 servicos realizados",
    address: "Atendimento remoto",
  },
  {
    id: 11,
    title: "Higienizacao automotiva",
    professional: "Andre Santos",
    rating: "4.7",
    reviews: "55",
    price: "R$ 150",
    distance: "6 km",
    eta: "32 min",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=260&fit=crop&auto=format",
    category: "Automotivo",
    subcategory: "Limpeza de veiculos",
    description: "Higienizacao interna de veiculos com limpeza de bancos, painel, carpetes e acabamento.",
    included: ["Aspiracao interna", "Limpeza de painel", "Higienizacao de bancos"],
    excluded: ["Polimento externo", "Remocao profunda de manchas"],
    serviceFor: "Carros de passeio",
    chargingType: "Por veiculo",
    attendanceMode: "Presencial",
    executionTime: "2 a 4 horas",
    serviceArea: "Santana, Tucuruvi e regiao norte",
    nextAvailability: "Ate 3 dias",
    completedServices: "69 servicos realizados",
    address: "Av. Braz Leme, 1200, Santana, Sao Paulo - SP",
  },
  {
    id: 12,
    title: "Aula particular de matematica",
    professional: "Fernanda Dias",
    rating: "4.9",
    reviews: "77",
    price: "R$ 85",
    distance: "Atendimento remoto",
    eta: "10 min",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=260&fit=crop&auto=format",
    category: "Educação",
    subcategory: "Reforco escolar",
    description: "Aula particular de matematica para ensino fundamental e medio, com revisao de conteudo e exercicios guiados.",
    included: ["Aula ao vivo", "Lista de exercicios", "Plano de estudo simples"],
    excluded: ["Material impresso", "Acompanhamento diario"],
    serviceFor: "Ensino fundamental e medio",
    chargingType: "Por hora",
    attendanceMode: "Online / Remoto",
    executionTime: "1 hora",
    serviceArea: "Atendimento remoto para todo o Brasil",
    nextAvailability: "Hoje a noite",
    completedServices: "132 servicos realizados",
    address: "Atendimento remoto",
  },
];

const CONTRACT_FLOW_KEY = "fazuno_tipo_contratacao";
const DIRECT_STEP_KEY = "fazuno_solicitacao_direta_etapa";
const DIRECT_MAX_STEP_KEY = "fazuno_solicitacao_direta_etapa_maxima";
const DIRECT_SERVICE_KEY = "fazuno_solicitacao_direta_servico";
const CLIENT_REQUESTS_KEY = "fazuno_minhas_solicitacoes_extra";
const LAST_CLIENT_REQUEST_KEY = "fazuno_ultima_solicitacao_cliente";
const DEFAULT_DIRECT_SCHEDULE = {
  date: "25/05/2025",
  isoDate: "2025-05-25",
  time: "09:00",
  period: "Manha",
};

const PROVIDER_AVAILABLE_DATES = {
  "2025-05-20": ["09:00", "10:30", "14:00", "16:30"],
  "2025-05-21": ["08:30", "11:00", "15:00"],
  "2025-05-23": ["09:00", "13:30", "17:00"],
  "2025-05-25": ["09:00", "10:30", "14:00", "16:00"],
  "2025-05-28": ["08:00", "11:30", "15:30"],
  "2025-06-02": ["09:00", "14:00", "17:00"],
  "2025-06-04": ["08:30", "10:30", "15:00"],
  "2025-06-07": ["09:00", "11:00"],
  "2025-06-10": ["10:00", "13:30", "16:30"],
};

const PROVIDER_BLOCKED_DATES = ["2025-05-22", "2025-05-24", "2025-05-26", "2025-06-03", "2025-06-08"];
const PROVIDER_ALL_TIMES = ["08:00", "08:30", "09:00", "10:30", "11:00", "13:30", "14:00", "15:00", "16:00", "16:30", "17:00"];
const MONTH_LABELS = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const WEEKDAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatIsoDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

function getSchedulePeriod(time) {
  const hour = Number(time.split(":")[0]);
  if (hour < 12) return "Manhã";
  if (hour < 18) return "Tarde";
  return "Noite";
}

function formatPriceValue(value) {
  const normalized = value.replace(/[^\d,]/g, "").replace(/\./g, "").replace(",", ".");
  const numeric = Number(normalized) || parseCurrency(value);
  return `R$ ${numeric.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function buildClientRequest(service, schedule) {
  const requestId = `SOL-2025-${String(service.id).padStart(6, "0")}`;

  return {
    id: requestId,
    origem: "Solicitação Direta",
    nova: true,
    prestador: {
      nome: service.professional,
      avaliacao: Number(service.rating),
      avaliacoes: service.reviews,
      avatar: service.professional.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
      avatarColor: "#0A0B2D",
      foto: service.profilePhoto || service.image,
    },
    servico: service.title,
    categoria: service.category,
    descricao: service.description,
    local: service.address,
    endereco: service.address,
    data: `${schedule.date} às ${schedule.time}`,
    dataAgendada: schedule.date,
    horarioAgendado: schedule.time,
    ultimaAtualizacao: "Agora",
    status: "Pendente",
    statusMsg: "Solicitação enviada. Aguarde o prestador aceitar ou responder seu pedido.",
    valorLabel: "Valor estimado",
    valor: formatPriceValue(service.price),
    valorEstimado: formatPriceValue(service.price),
    observacoes: "Solicitação criada pela contratação direta.",
    timeline: [
      {
        status: "Solicitação criada",
        data: "Agora",
        desc: "Sua solicitação foi enviada para o prestador.",
        done: true,
        active: false,
      },
      {
        status: "Aguardando aceite do prestador",
        data: null,
        desc: "O prestador ainda precisa aceitar ou responder esta solicitação.",
        done: false,
        active: true,
      },
      {
        status: "Aceita pelo prestador",
        data: null,
        desc: "Quando o prestador aceitar, o atendimento poderá avançar.",
        done: false,
        active: false,
      },
      {
        status: "Em andamento",
        data: null,
        desc: "Aguardando início do serviço.",
        done: false,
        active: false,
      },
      {
        status: "Concluída",
        data: null,
        desc: "Aguardando conclusão do serviço.",
        done: false,
        active: false,
      },
    ],
    acoes: ["cancelar", "detalhes", "conversar"],
  };
}

function saveClientRequest(service, schedule) {
  const request = buildClientRequest(service, schedule);
  const stored = JSON.parse(window.localStorage.getItem(CLIENT_REQUESTS_KEY) || "[]");
  const withoutSameRequest = stored.filter((item) => item.id !== request.id);
  window.localStorage.setItem(CLIENT_REQUESTS_KEY, JSON.stringify([request, ...withoutSameRequest]));
  window.sessionStorage.setItem(LAST_CLIENT_REQUEST_KEY, request.id);
  return request;
}

function buildPublishedOpportunity(form) {
  const opportunityId = "OPR-2025-000045";
  const interessados = [
    {
      nome: "Carlos Mendes",
      profissao: "Reformas e acabamento",
      avaliacao: "4.8",
      avaliacoes: "97",
      distancia: "2 km",
      mensagem: "Tenho experiencia em reformas de banheiro e posso iniciar ainda esta semana.",
      valor: "R$ 1.450,00",
      foto: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      nome: "Ana Paula Silva",
      profissao: "Pintura e pequenos reparos",
      avaliacao: "4.9",
      avaliacoes: "153",
      distancia: "3,5 km",
      mensagem: "Consigo fazer a avaliacao presencial e enviar a lista de materiais.",
      valor: "R$ 1.600,00",
      foto: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      nome: "Rafael Oliveira",
      profissao: "Pedreiro e revestimentos",
      avaliacao: "4.7",
      avaliacoes: "88",
      distancia: "4 km",
      mensagem: "Posso atender no periodo solicitado e entregar em prazo curto.",
      valor: "R$ 1.520,00",
      foto: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ];

  return {
    id: opportunityId,
    tipo: "oportunidade",
    origem: "Publicar Oportunidade",
    nova: true,
    cliente: { nome: "Isaac", tipo: "Cliente" },
    titulo: form.title,
    servico: form.title,
    categoria: form.category,
    descricao: form.description,
    local: form.location,
    endereco: form.location,
    data: `${form.date} às ${form.time}`,
    dataAgendada: form.date,
    horarioAgendado: form.time,
    valorLabel: "Valor estimado",
    valor: form.estimatedValue,
    valorEstimado: form.estimatedValue,
    observacoes: form.notes,
    anexos: form.attachments,
    interessados,
    interessadosCount: interessados.length,
    ultimaAtualizacao: "Agora",
    status: interessados.length > 0 ? "Em Análise" : "Nova",
    statusMsg: interessados.length > 0 ? "Interessados aguardando sua análise." : "Aguardando interesse de profissionais.",
    opportunityMessage: "Nenhum prestador aceito até o momento.",
    acoes: ["detalhes", "interessados", "cancelar_oportunidade"],
    timeline: [
      {
        status: "Oportunidade publicada",
        data: "Agora",
        desc: "Sua oportunidade foi publicada para prestadores compatíveis.",
        done: true,
        active: false,
      },
      {
        status: "Aguardando interessados",
        data: null,
        desc: "Prestadores compatíveis poderão enviar interesse.",
        done: interessados.length > 0,
        active: interessados.length === 0,
      },
      {
        status: "Análise de propostas",
        data: null,
        desc: "Quando houver interessados, você poderá comparar as propostas.",
        done: false,
        active: interessados.length > 0,
      },
      {
        status: "Prestador aceito",
        data: null,
        desc: "Após aceitar um prestador, a oportunidade vira uma solicitação.",
        done: false,
        active: false,
      },
    ],
  };
}

function savePublishedOpportunity(form) {
  const opportunity = buildPublishedOpportunity(form);
  const stored = JSON.parse(window.localStorage.getItem(CLIENT_REQUESTS_KEY) || "[]");
  const withoutPreviousOpportunity = stored.filter((item) => item.tipo !== "oportunidade" && item.id !== opportunity.id);
  window.localStorage.setItem(CLIENT_REQUESTS_KEY, JSON.stringify([opportunity, ...withoutPreviousOpportunity]));
  window.sessionStorage.setItem(LAST_CLIENT_REQUEST_KEY, opportunity.id);
  return opportunity;
}

function getStoredDirectStep() {
  const savedStep = Number(window.sessionStorage.getItem(DIRECT_STEP_KEY));
  if (!savedStep) return 1;
  return Math.min(Math.max(savedStep, 1), DIRECT_STEPS.length);
}

function getStoredDirectMaxStep() {
  const savedStep = Number(window.sessionStorage.getItem(DIRECT_MAX_STEP_KEY));
  if (!savedStep) return 1;
  return Math.min(Math.max(savedStep, 1), DIRECT_STEPS.length);
}

function getStoredDirectService() {
  const savedServiceId = Number(window.sessionStorage.getItem(DIRECT_SERVICE_KEY));
  return DIRECT_SERVICES.find((service) => service.id === savedServiceId) || DIRECT_SERVICES[0];
}

function parseCurrency(value) {
  return Number(value.replace(/\D/g, ""));
}

function parseDistance(value) {
  return Number(value.replace(",", ".").replace(/[^\d.]/g, ""));
}

function normalizeSearch(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function SidebarIcon({ name, size = 17, color = "currentColor", strokeWidth = 2 }) {
  const paths = {
    home: ["M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z", "M9 21V12h6v9"],
    plus: ["M12 5v14", "M5 12h14"],
    list: ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
    chat: ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
    bell: ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 01-3.46 0"],
    help: ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3", "M12 17h.01"],
    settings: ["M12 15a3 3 0 100-6 3 3 0 000 6z", "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
    chevDown: ["M6 9l6 6 6-6"],
    droplet: ["M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"],
    zap: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
    heart: ["M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"],
    broom: ["M2 19.5A2.5 2.5 0 014.5 17h15", "M4.5 17l1.5-9h12l1.5 9", "M9 11v6", "M12 11v6", "M15 11v6"],
    brush: ["M18.37 2.63a2.12 2.12 0 010 3L8.2 15.8l-4 1 1-4L15.37 2.63a2.12 2.12 0 013 0z", "M4 21c3 0 5-1 5-4"],
    leaf: ["M17 8C8 10 5.9 16.17 3.82 19.56A1 1 0 004.72 21C11.81 17.44 14.83 12.66 17 8z", "M17 8c0 9-9 15-17 7"],
    wrench: ["M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"],
    scissors: ["M6 9a3 3 0 100-6 3 3 0 000 6z", "M6 15a3 3 0 100 6 3 3 0 000-6z", "M20 4L8.12 15.88", "M14.47 14.48L20 20", "M8.12 8.12L12 12"],
    monitor: ["M20 3H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2z", "M8 21h8", "M12 17v4"],
    car: ["M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2", "M17 17m-2 0a2 2 0 104 0 2 2 0 00-4 0", "M7 17m-2 0a2 2 0 104 0 2 2 0 00-4 0"],
    book: ["M4 19.5A2.5 2.5 0 016.5 17H20", "M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z", "M8 6h8", "M8 10h6"],
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function OptionIllustration({ option }) {
  const Icon = option.icon;
  const isOpportunity = option.key === "oportunidade";

  return (
    <div className="choice-illustration" style={{ "--accent": option.color, "--soft": option.soft }}>
      <span className="choice-glow" />
      <span className="choice-spark choice-spark--one">+</span>
      <span className="choice-spark choice-spark--two">+</span>
      <div className="choice-main-icon">
        <Icon />
      </div>
      {isOpportunity ? (
        <>
          <span className="choice-floating choice-floating--top">
            <FaUserCheck />
          </span>
          <span className="choice-floating choice-floating--bottom">
            <FaUsers />
          </span>
        </>
      ) : (
        <span className="choice-floating choice-floating--check">
          <FaCheck />
        </span>
      )}
    </div>
  );
}

function OptionCard({ option, selected, onSelect }) {
  return (
    <article className={`choice-card ${selected ? "choice-card--selected" : ""}`} style={{ "--accent": option.color, "--hover": option.hover }}>
      <OptionIllustration option={option} />
      <div className="choice-card-body">
        <span className="choice-card-kicker">Tipo de contratação</span>
        <h2>{option.title}</h2>
        <p>{option.description}</p>
        <ul>
          {option.bullets.map((bullet) => (
            <li key={bullet}>
              <span>
                <FaRegCheckCircle />
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={() => onSelect(option.key)}>
        <FaCheck />
        Continuar
      </button>
    </article>
  );
}

function StepIndicator({ step, maxStep, onStepClick, steps = DIRECT_STEPS }) {
  return (
    <div className="direct-steps" aria-label="Etapas do fluxo">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const active = step === stepNumber;
        const done = step > stepNumber;
        const available = stepNumber <= maxStep;

        return (
          <button
            key={label}
            type="button"
            className={`direct-step ${active ? "direct-step--active" : ""} ${done ? "direct-step--done" : ""} ${available ? "direct-step--available" : "direct-step--locked"}`}
            onClick={() => available && onStepClick(stepNumber)}
            disabled={!available}
            aria-current={active ? "step" : undefined}
          >
            <span>{done ? <FaCheck /> : stepNumber}</span>
            <p>{label}</p>
          </button>
        );
      })}
    </div>
  );
}

function MiniServiceCard({ service, onClick }) {
  return (
    <button type="button" className="direct-mini-card" onClick={onClick}>
      <img src={service.image} alt={service.title} />
      <span>
        <strong>{service.title}</strong>
        <small>A partir de {service.price}</small>
      </span>
      <FaArrowRight />
    </button>
  );
}

function ProfessionalCard({ service, onDetails, onRequest }) {
  return (
    <article className="direct-result-card">
      <img src={service.image} alt={service.title} />
      <div className="direct-result-info">
        <h3>{service.title}</h3>
        <strong>{service.professional}</strong>
        <p>
          <FaStar />
          {service.rating} ({service.reviews})
        </p>
        <p>
          <FaClock />
          Responde em {service.eta}
        </p>
        <p>
          <FaMapMarkerAlt />
          {service.distance} de você
        </p>
        <small>A partir de {service.price}</small>
      </div>
      <div className="direct-result-actions">
        <button type="button" className="direct-secondary" onClick={onDetails}>
          Ver detalhes
        </button>
        <button type="button" className="direct-primary" onClick={onRequest}>
          Solicitar
        </button>
      </div>
    </article>
  );
}

function DirectSearchStep({ onNext, onSelect, onBack, onCategorySelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const categoriesRef = useRef(null);
  const scrollCategories = (direction) => {
    categoriesRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
  };
  const normalizedQuery = normalizeSearch(searchQuery);
  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return DIRECT_CATEGORIES;
    return DIRECT_CATEGORIES.filter((category) => normalizeSearch(category.label).includes(normalizedQuery));
  }, [normalizedQuery]);
  const filteredPopularServices = useMemo(() => {
    if (!normalizedQuery) return DIRECT_SERVICES.slice(0, 3);

    return DIRECT_SERVICES.filter((service) => {
      const searchable = [
        service.title,
        service.professional,
        service.category,
        service.description,
        service.address,
      ].join(" ");

      return normalizeSearch(searchable).includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  return (
    <section className="direct-panel">
      <div className="direct-panel-header">
        <button type="button" className="direct-back" onClick={onBack} aria-label="Voltar">
          <FaArrowLeft />
        </button>
        <h2>Buscar serviço</h2>
      </div>

      <label className="direct-search">
        <FaSearch />
        <input type="search" placeholder="O que você precisa?" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
        {searchQuery && (
          <button type="button" aria-label="Limpar busca" onClick={() => setSearchQuery("")}>
            <FaTimes />
          </button>
        )}
      </label>

      <div className="direct-section-title">
        <h3>Categorias</h3>
      </div>

      <div className="direct-carousel-wrap">
        <button type="button" className="direct-carousel-arrow" aria-label="Categorias anteriores" onClick={() => scrollCategories(-1)}>
          <FaArrowLeft />
        </button>
        <div className="direct-categories" ref={categoriesRef}>
          {filteredCategories.map((category) => {
            const CategoryIcon = category.icon;

            return (
              <button
                key={category.label}
                type="button"
                onClick={() => {
                  setSearchQuery(category.label);
                  onCategorySelect(category.label);
                  onNext(2);
                }}
              >
                <span>
                  <CategoryIcon />
                </span>
                {category.label}
              </button>
            );
          })}
          {filteredCategories.length === 0 && (
            <div className="direct-inline-empty">
              Nenhuma categoria encontrada.
            </div>
          )}
        </div>
        <button type="button" className="direct-carousel-arrow" aria-label="Próximas categorias" onClick={() => scrollCategories(1)}>
          <FaArrowRight />
        </button>
      </div>

      <div className="direct-section-title">
        <h3>Mais procurados</h3>
      </div>

      <div className="direct-mini-list">
        {filteredPopularServices.map((service) => (
          <MiniServiceCard
            key={service.id}
            service={service}
            onClick={() => {
              onSelect(service);
              onCategorySelect("Todas");
              onNext(2);
            }}
          />
        ))}
        {filteredPopularServices.length === 0 && (
          <div className="direct-empty-results">
            Nenhum serviço encontrado para &quot;{searchQuery}&quot;.
          </div>
        )}
      </div>

    </section>
  );
}

function DirectResultsStep({ onBack, onDetails, onRequest, initialCategory = "Todas" }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [distanceFilter, setDistanceFilter] = useState("Todas");
  const [sortFilter, setSortFilter] = useState("relevancia");

  const serviceCategories = useMemo(
    () => ["Todas", ...DIRECT_CATEGORIES.map((category) => category.label)],
    []
  );

  const filteredServices = useMemo(() => {
    const maxDistance = distanceFilter === "Todas" ? null : Number(distanceFilter);

    const services = DIRECT_SERVICES.filter((service) => {
      const matchesCategory = categoryFilter === "Todas" || normalizeSearch(service.category) === normalizeSearch(categoryFilter);
      const matchesDistance = maxDistance === null || parseDistance(service.distance) <= maxDistance;
      return matchesCategory && matchesDistance;
    });

    return [...services].sort((a, b) => {
      if (sortFilter === "menor-preco") return parseCurrency(a.price) - parseCurrency(b.price);
      if (sortFilter === "maior-avaliacao") return Number(b.rating) - Number(a.rating);
      if (sortFilter === "menor-distancia") return parseDistance(a.distance) - parseDistance(b.distance);
      return a.id - b.id;
    });
  }, [categoryFilter, distanceFilter, sortFilter]);

  const activeFiltersCount = [categoryFilter !== "Todas", distanceFilter !== "Todas", sortFilter !== "relevancia"].filter(Boolean).length;

  function clearFilters() {
    setCategoryFilter("Todas");
    setDistanceFilter("Todas");
    setSortFilter("relevancia");
  }

  return (
    <section className="direct-panel">
      <div className="direct-panel-header">
        <button type="button" className="direct-back" onClick={onBack} aria-label="Voltar">
          <FaArrowLeft />
        </button>
        <h2>Serviços encontrados</h2>
      </div>

      <div className="direct-result-top">
        <p>{filteredServices.length} serviços encontrados</p>
        <button type="button" className={filtersOpen ? "direct-filter-trigger direct-filter-trigger--active" : "direct-filter-trigger"} onClick={() => setFiltersOpen((open) => !open)}>
          <FaFilter />
          Filtrar
          {activeFiltersCount > 0 && <span>{activeFiltersCount}</span>}
        </button>
      </div>

      {filtersOpen && (
        <div className="direct-filter-panel">
          <label>
            Categoria
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              {serviceCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label>
            Distância
            <select value={distanceFilter} onChange={(event) => setDistanceFilter(event.target.value)}>
              <option value="Todas">Todas</option>
              <option value="3">Até 3 km</option>
              <option value="5">Até 5 km</option>
              <option value="10">Até 10 km</option>
            </select>
          </label>
          <label>
            Ordenar por
            <select value={sortFilter} onChange={(event) => setSortFilter(event.target.value)}>
              <option value="relevancia">Relevância</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-avaliacao">Maior avaliação</option>
              <option value="menor-distancia">Menor distância</option>
            </select>
          </label>
          <button type="button" onClick={clearFilters}>
            Limpar filtros
          </button>
        </div>
      )}

      <div className="direct-results">
        {filteredServices.map((service) => (
          <ProfessionalCard
            key={service.id}
            service={service}
            onDetails={() => onDetails(service)}
            onRequest={() => onRequest(service)}
          />
        ))}
        {filteredServices.length === 0 && (
          <div className="direct-empty-results">
            Nenhum serviço encontrado com esses filtros.
          </div>
        )}
      </div>
    </section>
  );
}

function DirectDetailsStep({ service, onBack, onRequest }) {
  const router = useRouter();
  const included = service.included || ["Execução do serviço", "Orientação inicial", "Teste de qualidade"];
  const excluded = service.excluded || ["Materiais adicionais", "Serviços fora do combinado"];
  const profilePhoto = service.profilePhoto || service.image;

  return (
    <section className="direct-panel direct-panel--details">
      <div className="direct-detail-media">
        <button type="button" className="direct-floating-back" onClick={onBack} aria-label="Voltar">
          <FaArrowLeft />
        </button>
        <img src={service.image} alt={service.title} />
        <div className="direct-floating-actions">
          <button type="button" aria-label="Compartilhar">
            <FaShareAlt />
          </button>
          <button type="button" aria-label="Favoritar">
            <FaHeart />
          </button>
        </div>
        <span>{service.category}</span>
      </div>

      <div className="direct-detail-content">
        <div className="direct-service-heading">
          <div>
            <p>{service.category} / {service.subcategory}</p>
            <h2>{service.title}</h2>
          </div>
          <div className="direct-service-price">
            <span>
              <FaMoneyBillWave />
              Valor do serviço
            </span>
            <strong>{service.price}</strong>
          </div>
        </div>

        <div className="direct-provider-strip">
          <img src={profilePhoto} alt={service.professional} />
          <div>
            <span>Prestador</span>
            <strong>{service.professional}</strong>
            <p className="direct-rating">
              <FaStar />
              {service.rating} ({service.reviews} avaliações)
            </p>
          </div>
          <button type="button" onClick={() => router.push(`${service.profileRoute || "/Pages/Perfil_prestador"}?returnTo=${encodeURIComponent("/Pages/Escolha_contratacao")}`)}>
            Ver perfil
          </button>
        </div>

        <p className="direct-service-description">{service.description}</p>

        <div className="direct-badges">
          <span>
            <FaCheckCircle />
            {service.chargingType}
          </span>
          <span>{service.attendanceMode}</span>
          <span>{service.executionTime}</span>
        </div>

        <div className="direct-service-grid">
          <article>
            <FaTools />
            <span>Tipo de serviço</span>
            <strong>{service.serviceFor}</strong>
          </article>
          <article>
            <FaMapMarkerAlt />
            <span>Área de atendimento</span>
            <strong>{service.serviceArea}</strong>
          </article>
          <article>
            <FaClock />
            <span>Disponibilidade</span>
            <strong>{service.nextAvailability}</strong>
          </article>
          <article>
            <FaShieldAlt />
            <span>Histórico</span>
            <strong>{service.completedServices}</strong>
          </article>
        </div>

        <div className="direct-service-lists">
          <section>
            <h3>O que está incluso</h3>
            {included.map((item) => (
              <p key={item}>
                <FaRegCheckCircle />
                {item}
              </p>
            ))}
          </section>
          <section>
            <h3>O que não está incluso</h3>
            {excluded.map((item) => (
              <p key={item}>
                <FaTimes />
                {item}
              </p>
            ))}
          </section>
        </div>

        <div className="direct-service-address">
          <FaMapMarkerAlt />
          <div>
            <span>Endereço base</span>
            <strong>{service.address}</strong>
            <p>{service.distance} de você</p>
          </div>
        </div>

        <button type="button" className="direct-wide-primary" onClick={onRequest}>
          Solicitar serviço
        </button>
      </div>
    </section>
  );
}

function ProviderCalendarModal({ schedule, onClose, onConfirm }) {
  const initialDate = new Date(`${schedule.isoDate}T12:00:00`);
  const [visibleMonth, setVisibleMonth] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(schedule.isoDate);
  const [selectedTime, setSelectedTime] = useState(schedule.time);
  const [mode, setMode] = useState("days");

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const days = [
    ...Array.from({ length: firstDay }, (_, index) => ({ key: `empty-${index}`, empty: true })),
    ...Array.from({ length: totalDays }, (_, index) => {
      const date = new Date(year, month, index + 1);
      const isoDate = toIsoDate(date);
      const available = Boolean(PROVIDER_AVAILABLE_DATES[isoDate]);
      const blocked = PROVIDER_BLOCKED_DATES.includes(isoDate) || !available;
      return { key: isoDate, isoDate, day: index + 1, available, blocked };
    }),
  ];
  const availableTimes = PROVIDER_AVAILABLE_DATES[selectedDate] || [];

  function moveMonth(direction) {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
    setMode("days");
  }

  function chooseDate(day) {
    if (day.empty || day.blocked) return;
    setSelectedDate(day.isoDate);
    setSelectedTime((PROVIDER_AVAILABLE_DATES[day.isoDate] || [])[0] || "");
    setMode("times");
  }

  function finishSchedule() {
    if (!selectedDate || !selectedTime) return;
    onConfirm({
      date: formatIsoDate(selectedDate),
      isoDate: selectedDate,
      time: selectedTime,
      period: getSchedulePeriod(selectedTime),
    });
  }

  return (
    <div className="direct-calendar-overlay" role="dialog" aria-modal="true">
      <div className="direct-calendar-modal">
        <div className="direct-calendar-header">
          <div>
            <span>Agenda do prestador</span>
            <h3>{mode === "days" ? "Escolha uma data disponivel" : `Horarios em ${formatIsoDate(selectedDate)}`}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar calendario">
            <FaTimes />
          </button>
        </div>

        {mode === "days" ? (
          <>
            <div className="direct-calendar-nav">
              <button type="button" onClick={() => moveMonth(-1)} aria-label="Mes anterior">
                <FaArrowLeft />
              </button>
              <strong>{MONTH_LABELS[month]} {year}</strong>
              <button type="button" onClick={() => moveMonth(1)} aria-label="Proximo mes">
                <FaArrowRight />
              </button>
            </div>

            <div className="direct-calendar-legend">
              <span><i className="is-available" /> Disponivel</span>
              <span><i className="is-blocked" /> Indisponivel</span>
            </div>

            <div className="direct-calendar-weekdays">
              {WEEKDAY_LABELS.map((weekday) => <span key={weekday}>{weekday}</span>)}
            </div>
            <div className="direct-calendar-grid">
              {days.map((day) => (
                <button
                  key={day.key}
                  type="button"
                  className={`${day.empty ? "is-empty" : ""} ${day.available ? "is-available" : ""} ${day.blocked ? "is-blocked" : ""} ${day.isoDate === selectedDate ? "is-selected" : ""}`}
                  disabled={day.empty || day.blocked}
                  onClick={() => chooseDate(day)}
                >
                  {day.day || ""}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="direct-time-grid">
              {PROVIDER_ALL_TIMES.map((time) => {
                const available = availableTimes.includes(time);
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={!available}
                    className={`${available ? "is-available" : "is-blocked"} ${selectedTime === time ? "is-selected" : ""}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    <strong>{time}</strong>
                    <span>{available ? "Disponivel" : "Indisponivel"}</span>
                  </button>
                );
              })}
            </div>

            <div className="direct-calendar-actions">
              <button type="button" className="direct-calendar-secondary" onClick={() => setMode("days")}>
                Voltar aos dias
              </button>
              <button type="button" className="direct-calendar-primary" onClick={finishSchedule}>
                Concluir agendamento
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DirectFormStep({ service, onBack, onConfirm }) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [schedule, setSchedule] = useState(DEFAULT_DIRECT_SCHEDULE);

  return (
    <section className="direct-panel direct-panel--form">
      <div className="direct-panel-header">
        <button type="button" className="direct-back" onClick={onBack} aria-label="Voltar">
          <FaArrowLeft />
        </button>
        <h2>Solicitar serviço</h2>
      </div>

      <div className="direct-form-grid">
        <label>
          Endereço
          <span className="direct-input-wrap">
            <input defaultValue={service.address} />
            <FaMapMarkerAlt />
          </span>
        </label>
        <label>
          Data desejada
          <button type="button" className="direct-input-wrap direct-schedule-trigger" onClick={() => setCalendarOpen(true)}>
            <span>{schedule.date}</span>
            <FaCalendarAlt />
          </button>
        </label>
        <label>
          Horário desejado
          <button type="button" className="direct-input-wrap direct-schedule-trigger" onClick={() => setCalendarOpen(true)}>
            <span>{schedule.time} ({schedule.period})</span>
            <FaClock />
          </button>
        </label>
      </div>

      <label className="direct-textarea">
        Descrição do serviço
        <textarea maxLength={500} placeholder="Descreva mais detalhes sobre sua necessidade..." />
        <span>0/500</span>
      </label>

      <div className="direct-attachments">
        <p>Fotos (opcional)</p>
        <div>
          {DIRECT_SERVICES.slice(0, 3).map((item) => (
            <img key={item.id} src={item.image} alt="" />
          ))}
          <button type="button" aria-label="Adicionar foto">
            <FaUpload />
          </button>
        </div>
      </div>

      <button type="button" className="direct-wide-primary" onClick={() => onConfirm(schedule)}>
        Continuar
      </button>

      {calendarOpen && (
        <ProviderCalendarModal
          schedule={schedule}
          onClose={() => setCalendarOpen(false)}
          onConfirm={(nextSchedule) => {
            setSchedule(nextSchedule);
            setCalendarOpen(false);
          }}
        />
      )}
    </section>
  );
}

function DirectConfirmationStep({ service, schedule, request, onHome, onViewRequests }) {
  const requestId = request?.id || `SOL-2025-${String(service.id).padStart(6, "0")}`;

  return (
    <section className="direct-panel direct-panel--success">
      <div className="direct-success-icon">
        <FaCheck />
      </div>
      <h2>Solicitação enviada com sucesso!</h2>
      <p>O profissional foi notificado e em breve entrará em contato com você.</p>

      <div className="direct-summary">
        <h3>Resumo da solicitação</h3>
        <dl>
          <div>
            <dt>Serviço</dt>
            <dd>{service.title}</dd>
          </div>
          <div>
            <dt>Profissional</dt>
            <dd>{service.professional}</dd>
          </div>
          <div>
            <dt>Data</dt>
            <dd>{schedule.date} às {schedule.time}</dd>
          </div>
          <div>
            <dt>Endereço</dt>
            <dd>{service.address}</dd>
          </div>
        </dl>
        <strong>#{requestId}</strong>
      </div>

      <button type="button" className="direct-wide-primary" onClick={() => onViewRequests(requestId)}>
        Ver minhas solicitações
      </button>
      <button type="button" className="direct-link-button" onClick={onHome}>
        Ir para o início
      </button>
    </section>
  );
}

function OpportunityBasicStep({ form, setForm, onBack, onNext }) {
  return (
    <section className="direct-panel direct-panel--form">
      <div className="direct-panel-header">
        <button type="button" className="direct-back" onClick={onBack} aria-label="Voltar">
          <FaArrowLeft />
        </button>
        <h2>Nova oportunidade</h2>
      </div>

      <div className="direct-form-grid">
        <label>
          Título da oportunidade
          <span className="direct-input-wrap">
            <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
          </span>
        </label>
        <label>
          Categoria
          <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>
            {DIRECT_CATEGORIES.map((category) => (
              <option key={category.label} value={category.label}>{category.label}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="direct-textarea">
        Descrição
        <textarea value={form.description} maxLength={500} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
        <span>{form.description.length}/500</span>
      </label>

      <button type="button" className="direct-wide-primary opportunity-primary" onClick={onNext}>
        Continuar
      </button>
    </section>
  );
}

function OpportunityDetailsStep({ form, setForm, onBack, onNext }) {
  return (
    <section className="direct-panel direct-panel--form">
      <div className="direct-panel-header">
        <button type="button" className="direct-back" onClick={onBack} aria-label="Voltar">
          <FaArrowLeft />
        </button>
        <h2>Detalhes da oportunidade</h2>
      </div>

      <div className="direct-form-grid">
        <label>
          Localização
          <span className="direct-input-wrap">
            <input value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} />
            <FaMapMarkerAlt />
          </span>
        </label>
        <label>
          Data desejada
          <span className="direct-input-wrap">
            <input value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} />
            <FaCalendarAlt />
          </span>
        </label>
        <label>
          Horário desejado
          <span className="direct-input-wrap">
            <input value={form.time} onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))} />
            <FaClock />
          </span>
        </label>
        <label>
          Valor estimado
          <span className="direct-input-wrap">
            <input value={form.estimatedValue} onChange={(event) => setForm((current) => ({ ...current, estimatedValue: event.target.value }))} />
            <FaMoneyBillWave />
          </span>
        </label>
      </div>

      <button type="button" className="direct-wide-primary opportunity-primary" onClick={onNext}>
        Continuar
      </button>
    </section>
  );
}

function OpportunityAttachmentsStep({ form, setForm, onBack, onNext }) {
  function handleFiles(event, type) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const nextAttachments = files.map((file) => ({
      id: `${type}-${file.name}-${Date.now()}`,
      type,
      name: file.name,
    }));

    setForm((current) => ({ ...current, attachments: [...current.attachments, ...nextAttachments] }));
    event.target.value = "";
  }

  function removeAttachment(id) {
    setForm((current) => ({ ...current, attachments: current.attachments.filter((attachment) => attachment.id !== id) }));
  }

  return (
    <section className="direct-panel direct-panel--form">
      <div className="direct-panel-header">
        <button type="button" className="direct-back" onClick={onBack} aria-label="Voltar">
          <FaArrowLeft />
        </button>
        <h2>Anexos e observações</h2>
      </div>

      <div className="opportunity-attachments">
        <div className="opportunity-attachment-actions">
          <label>
            <FaUpload />
            Upload de imagem
            <input type="file" accept="image/*" multiple onChange={(event) => handleFiles(event, "image")} />
          </label>
          <label>
            <FaUpload />
            Upload de documento
            <input type="file" accept=".pdf,.doc,.docx,.txt" multiple onChange={(event) => handleFiles(event, "document")} />
          </label>
        </div>

        <div className="opportunity-attachment-list">
          {form.attachments.map((attachment) => (
            <span key={attachment.id}>
              {attachment.type === "image" ? "Imagem" : "Documento"}: {attachment.name}
              <button type="button" onClick={() => removeAttachment(attachment.id)} aria-label={`Remover ${attachment.name}`}>
                <FaTimes />
              </button>
            </span>
          ))}
        </div>
      </div>

      <label className="direct-textarea">
        Observações adicionais
        <textarea value={form.notes} maxLength={500} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
        <span>{form.notes.length}/500</span>
      </label>

      <button type="button" className="direct-wide-primary opportunity-primary" onClick={onNext} disabled={form.attachments.length === 0}>
        Revisar publicação
      </button>
    </section>
  );
}

function OpportunityReviewStep({ form, onBack, onPublish }) {
  return (
    <section className="direct-panel direct-panel--form">
      <div className="direct-panel-header">
        <button type="button" className="direct-back" onClick={onBack} aria-label="Voltar">
          <FaArrowLeft />
        </button>
        <h2>Revisar publicação</h2>
      </div>

      <div className="direct-summary opportunity-review">
        <h3>{form.title}</h3>
        <dl>
          <div><dt>Categoria</dt><dd>{form.category}</dd></div>
          <div><dt>Localização</dt><dd>{form.location}</dd></div>
          <div><dt>Data</dt><dd>{form.date} às {form.time}</dd></div>
          <div><dt>Valor estimado</dt><dd>{form.estimatedValue}</dd></div>
          <div><dt>Anexos</dt><dd>{form.attachments.length} arquivo(s)</dd></div>
        </dl>
        <p>{form.description}</p>
      </div>

      <div className="opportunity-info-box">
        A oportunidade será publicada como <strong>Nova</strong> e ficará disponível para prestadores compatíveis com a categoria escolhida.
      </div>

      <button type="button" className="direct-wide-primary opportunity-primary" onClick={onPublish}>
        Publicar oportunidade
      </button>
    </section>
  );
}

function OpportunitySuccessStep({ opportunity, onHome, onViewOpportunity }) {
  return (
    <section className="direct-panel direct-panel--success">
      <div className="direct-success-icon opportunity-success-icon">
        <FaBullhorn />
      </div>
      <h2>Oportunidade publicada com sucesso!</h2>
      <p>Prestadores compatíveis agora podem visualizar sua oportunidade e enviar interesse.</p>

      <div className="direct-summary">
        <h3>Resumo da oportunidade</h3>
        <dl>
          <div><dt>Título</dt><dd>{opportunity.titulo}</dd></div>
          <div><dt>Status</dt><dd>{opportunity.status}</dd></div>
          <div><dt>Interessados</dt><dd>{opportunity.interessadosCount} prestadores</dd></div>
          <div><dt>Data</dt><dd>{opportunity.data}</dd></div>
        </dl>
        <strong>#{opportunity.id}</strong>
      </div>

      <button type="button" className="direct-wide-primary opportunity-primary" onClick={() => onViewOpportunity(opportunity.id)}>
        Ver oportunidade
      </button>
      <button type="button" className="direct-link-button" onClick={onHome}>
        Ir para o início
      </button>
    </section>
  );
}

function PublishOpportunityFlow({ step, maxStep, form, opportunity, setStep, setForm, onBack, onPublish, onHome, onViewOpportunity }) {
  return (
    <div className="direct-flow opportunity-flow">
      <div className="direct-flow-title">
        <button type="button" className="direct-back-to-choice" onClick={onBack}>
          <FaArrowLeft />
          Tipo de contratação
        </button>
        <div>
          <h1>Publicar Oportunidade</h1>
          <p>Publique sua necessidade e receba propostas de profissionais interessados.</p>
        </div>
      </div>

      <StepIndicator step={step} maxStep={maxStep} onStepClick={setStep} steps={OPPORTUNITY_STEPS} />

      <div className="direct-step-shell">
        {step === 1 && <OpportunityBasicStep form={form} setForm={setForm} onBack={onBack} onNext={() => setStep(2)} />}
        {step === 2 && <OpportunityDetailsStep form={form} setForm={setForm} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
        {step === 3 && <OpportunityAttachmentsStep form={form} setForm={setForm} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
        {step === 4 && <OpportunityReviewStep form={form} onBack={() => setStep(3)} onPublish={onPublish} />}
        {step === 5 && <OpportunitySuccessStep opportunity={opportunity} onHome={onHome} onViewOpportunity={onViewOpportunity} />}
      </div>
    </div>
  );
}

function DirectSolicitationFlow({
  step,
  maxStep,
  service,
  categoryFilter,
  schedule,
  request,
  setCategoryFilter,
  setStep,
  setService,
  onScheduleConfirm,
  onBack,
  onHome,
  onViewRequests,
}) {
  const selectedService = service || DIRECT_SERVICES[0];

  return (
    <div className="direct-flow">
      <div className="direct-flow-title">
        <button type="button" className="direct-back-to-choice" onClick={onBack}>
          <FaArrowLeft />
          Tipo de contratação
        </button>
        <div>
          <h1>Solicitação Direta</h1>
          <p>Encontre e contrate um profissional rapidamente.</p>
        </div>
      </div>

      <StepIndicator step={step} maxStep={maxStep} onStepClick={setStep} />

      <div className="direct-step-shell">
        {step === 1 && <DirectSearchStep onNext={setStep} onSelect={setService} onBack={onBack} onCategorySelect={setCategoryFilter} />}
        {step === 2 && (
          <DirectResultsStep
            onBack={() => setStep(1)}
            initialCategory={categoryFilter}
            onDetails={(nextService) => {
              setService(nextService);
              setStep(3);
            }}
            onRequest={(nextService) => {
              setService(nextService);
              setStep(4);
            }}
          />
        )}
        {step === 3 && <DirectDetailsStep service={selectedService} onBack={() => setStep(2)} onRequest={() => setStep(4)} />}
        {step === 4 && <DirectFormStep service={selectedService} onBack={() => setStep(3)} onConfirm={onScheduleConfirm} />}
        {step === 5 && (
          <DirectConfirmationStep
            service={selectedService}
            schedule={schedule}
            request={request}
            onHome={onHome}
            onViewRequests={onViewRequests}
          />
        )}
      </div>
    </div>
  );
}

export default function EscolhaContratacao() {
  const router = useRouter();
  const [storageReady, setStorageReady] = useState(false);
  const [selected, setSelected] = useState("");
  const [flow, setFlow] = useState("choice");
  const [directStep, setDirectStep] = useState(1);
  const [maxDirectStep, setMaxDirectStep] = useState(1);
  const [selectedService, setSelectedService] = useState(DIRECT_SERVICES[0]);
  const [directCategoryFilter, setDirectCategoryFilter] = useState("Todas");
  const [directSchedule, setDirectSchedule] = useState(DEFAULT_DIRECT_SCHEDULE);
  const [createdRequest, setCreatedRequest] = useState(null);
  const [opportunityStep, setOpportunityStep] = useState(1);
  const [maxOpportunityStep, setMaxOpportunityStep] = useState(1);
  const [opportunityForm, setOpportunityForm] = useState(DEFAULT_OPPORTUNITY_FORM);
  const [createdOpportunity, setCreatedOpportunity] = useState(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const savedFlow = window.sessionStorage.getItem(CONTRACT_FLOW_KEY);

    if (savedFlow === "direta") {
      setSelected("direta");
      setFlow("direta");
      setDirectStep(getStoredDirectStep());
      setMaxDirectStep(Math.max(getStoredDirectStep(), getStoredDirectMaxStep()));
      setSelectedService(getStoredDirectService());
    } else if (savedFlow === "oportunidade") {
      setSelected("oportunidade");
      setFlow("oportunidade");
    } else if (savedFlow) {
      setSelected(savedFlow);
    }

    setStorageReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!storageReady) return;

    window.sessionStorage.setItem(CONTRACT_FLOW_KEY, selected);
    window.sessionStorage.setItem(DIRECT_STEP_KEY, String(directStep));
    window.sessionStorage.setItem(DIRECT_MAX_STEP_KEY, String(maxDirectStep));
    window.sessionStorage.setItem(DIRECT_SERVICE_KEY, String(selectedService.id));
  }, [directStep, maxDirectStep, selected, selectedService.id, storageReady]);

  function handleDirectStep(nextStep) {
    const safeStep = Math.min(Math.max(nextStep, 1), DIRECT_STEPS.length);
    setDirectStep(safeStep);
    setMaxDirectStep((current) => Math.max(current, safeStep));
  }

  function handleDirectBack() {
    if (directStep > 1) {
      handleDirectStep(directStep - 1);
      return;
    }

    setFlow("choice");
    setSelected("");
    window.sessionStorage.removeItem(CONTRACT_FLOW_KEY);
  }

  function handleOpportunityStep(nextStep) {
    const safeStep = Math.min(Math.max(nextStep, 1), OPPORTUNITY_STEPS.length);
    setOpportunityStep(safeStep);
    setMaxOpportunityStep((current) => Math.max(current, safeStep));
  }

  function handleOpportunityBack() {
    if (opportunityStep > 1) {
      handleOpportunityStep(opportunityStep - 1);
      return;
    }

    setFlow("choice");
    setSelected("");
    window.sessionStorage.removeItem(CONTRACT_FLOW_KEY);
  }

  function handleSelect(value) {
    setSelected(value);
    window.sessionStorage.setItem(CONTRACT_FLOW_KEY, value);

    if (value === "direta") {
      setFlow("direta");
      setDirectStep(getStoredDirectStep());
      setMaxDirectStep(Math.max(getStoredDirectStep(), getStoredDirectMaxStep()));
      setDirectCategoryFilter("Todas");
      setSelectedService(getStoredDirectService());
      return;
    }

    if (value === "oportunidade") {
      setFlow("oportunidade");
      setOpportunityStep(1);
      setMaxOpportunityStep(1);
      setOpportunityForm(DEFAULT_OPPORTUNITY_FORM);
      setCreatedOpportunity(null);
    }
  }

  function handleDirectScheduleConfirm(schedule) {
    const request = saveClientRequest(selectedService, schedule);
    setDirectSchedule(schedule);
    setCreatedRequest(request);
    handleDirectStep(5);
  }

  function handlePublishOpportunity() {
    const opportunity = savePublishedOpportunity(opportunityForm);
    setCreatedOpportunity(opportunity);
    handleOpportunityStep(5);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        .choice-page,
        .choice-page * {
          box-sizing: border-box;
        }

        .choice-layout,
        .choice-layout * {
          font-family: 'Poppins', Arial, Helvetica, sans-serif;
        }

        .choice-layout {
          width: 100%;
          height: 100vh;
          display: flex;
          overflow: hidden;
          background: #F5F7FB;
        }

        .choice-main {
          flex: 1;
          min-width: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .choice-page {
          flex: 1;
          min-height: 0;
          overflow-x: hidden;
          overflow-y: auto;
          background: #F5F7FB;
          color: #0A0B2D;
        }

        .choice-shell {
          width: min(100%, 1220px);
          margin: 0 auto;
          padding: 44px 40px 32px;
        }

        .choice-header {
          text-align: left;
          margin-bottom: 26px;
        }

        .choice-header h1 {
          margin: 0;
          color: #0A0B2D;
          font-size: clamp(1.25rem, 1.8vw, 1.55rem);
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: 0;
        }

        .choice-header p {
          margin: 10px 0 0;
          max-width: 660px;
          color: #666B7A;
          font-size: 0.88rem;
          font-weight: 500;
          line-height: 1.55;
        }

        .choice-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .choice-card {
          position: relative;
          min-height: 270px;
          display: grid;
          grid-template-columns: 176px minmax(0, 1fr);
          grid-template-rows: 1fr auto;
          gap: 0 22px;
          align-items: stretch;
          padding: 22px 24px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          box-shadow: 0 10px 30px rgba(10, 11, 45, 0.05);
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }

        .choice-card:hover,
        .choice-card--selected {
          transform: translateY(-1px);
          border-color: var(--hover);
          box-shadow: 0 16px 36px rgba(10, 11, 45, 0.08);
        }

        .choice-illustration {
          width: 154px;
          height: 154px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: center;
          margin: 0;
        }

        .choice-glow {
          position: absolute;
          width: 132px;
          height: 132px;
          border-radius: 8px;
          background: var(--soft);
        }

        .choice-main-icon {
          width: 76px;
          height: 76px;
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #FFFFFF;
          color: var(--accent);
          font-size: 2.65rem;
          box-shadow: 0 14px 28px rgba(10, 11, 45, 0.1);
        }

        .choice-floating {
          position: absolute;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #FFFFFF;
          border-radius: 50%;
          background: var(--accent);
          color: #FFFFFF;
          box-shadow: 0 10px 24px rgba(10, 11, 45, 0.12);
        }

        .choice-floating--check {
          width: 42px;
          height: 42px;
          right: 16px;
          top: 22px;
          font-size: 1rem;
        }

        .choice-floating--top,
        .choice-floating--bottom {
          width: 40px;
          height: 40px;
          right: 12px;
          font-size: 0.92rem;
          background: #E8F8EE;
          color: var(--accent);
        }

        .choice-floating--top {
          top: 14px;
        }

        .choice-floating--bottom {
          bottom: 14px;
        }

        .choice-spark {
          position: absolute;
          color: color-mix(in srgb, var(--accent) 42%, #D2DCFF);
          font-weight: 900;
        }

        .choice-spark--one {
          left: 10px;
          top: 34px;
        }

        .choice-spark--two {
          right: 0;
          bottom: 42px;
        }

        .choice-card-body {
          min-width: 0;
          padding-left: 22px;
          border-left: 1px solid #EEF0F5;
          text-align: left;
        }

        .choice-card-kicker {
          display: block;
          margin-bottom: 4px;
          color: #8A90A0;
          font-size: 0.72rem;
          font-weight: 800;
        }

        .choice-card h2 {
          margin: 0 0 12px;
          color: #0A0B2D;
          font-size: 1.16rem;
          line-height: 1.2;
          font-weight: 800;
        }

        .choice-card p {
          max-width: 420px;
          margin: 0 0 18px;
          color: #666B7A;
          font-size: 0.86rem;
          font-weight: 500;
          line-height: 1.55;
        }

        .choice-card ul {
          width: min(100%, 340px);
          margin: 0;
          padding: 0;
          list-style: none;
          text-align: left;
        }

        .choice-card li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #303449;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .choice-card li + li {
          margin-top: 13px;
        }

        .choice-card li span {
          width: 24px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #FFF4EC;
          color: var(--accent);
          font-size: 0.8rem;
        }

        .choice-card button {
          width: 100%;
          min-height: 38px;
          grid-column: 2;
          justify-self: end;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
          border: 1.5px solid transparent;
          border-radius: 8px;
          background: #0A0B2D;
          color: #FFFFFF;
          font: inherit;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .choice-card button:hover {
          border-color: var(--hover);
          background: var(--hover);
          box-shadow: 0 8px 22px rgba(241, 103, 15, 0.22);
        }

        .choice-feedback {
          width: min(100%, 720px);
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 22px auto 0;
          padding: 0 16px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font-size: 0.9rem;
          font-weight: 800;
          text-align: center;
        }

        .choice-feedback svg {
          color: #F1670F;
        }

        .direct-flow {
          width: 100%;
        }

        .direct-flow-title {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 22px;
        }

        .direct-flow-title h1 {
          margin: 0;
          color: #0A0B2D;
          font-size: clamp(1.5rem, 2.4vw, 1.95rem);
          line-height: 1.16;
          font-weight: 750;
        }

        .direct-flow-title p {
          margin: 6px 0 0;
          color: #666B7A;
          font-size: 0.84rem;
          font-weight: 500;
        }

        .direct-back-to-choice {
          min-height: 28px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
          white-space: nowrap;
        }

        .direct-back-to-choice:hover {
          color: #F1670F;
        }

        .direct-steps {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 18px;
        }

        .direct-step {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 12px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #7A8192;
          font: inherit;
          font-size: 0.74rem;
          font-weight: 800;
          text-align: left;
          cursor: default;
        }

        .direct-step--available {
          cursor: pointer;
        }

        .direct-step--available:hover {
          border-color: rgba(241, 103, 15, 0.45);
          box-shadow: 0 8px 18px rgba(10, 11, 45, 0.08);
          transform: translateY(-1px);
        }

        .direct-step--locked {
          opacity: 0.78;
        }

        .direct-step:disabled {
          cursor: not-allowed;
        }

        .direct-step span {
          width: 24px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #EEF2F7;
          color: #7A8192;
          font-size: 0.74rem;
        }

        .direct-step p {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .direct-step--active,
        .direct-step--done {
          border-color: rgba(241, 103, 15, 0.28);
          color: #0A0B2D;
        }

        .direct-step--active span,
        .direct-step--done span {
          background: #F1670F;
          color: #FFFFFF;
        }

        .direct-step-shell {
          width: min(100%, 760px);
          margin: 0 auto;
        }

        .direct-panel {
          min-height: 520px;
          padding: 20px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          box-shadow: 0 10px 30px rgba(10, 11, 45, 0.05);
        }

        .direct-panel-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .direct-panel-header h2,
        .direct-panel h2 {
          margin: 0;
          color: #0A0B2D;
          font-size: 1.08rem;
          font-weight: 800;
        }

        .direct-back,
        .direct-floating-back {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #0A0B2D;
          cursor: pointer;
        }

        .direct-back:hover {
          background: #FFF4EC;
          color: #F1670F;
        }

        .direct-floating-back {
          background: #FFFFFF;
          border: 1.5px solid #E6E8EF;
        }

        .direct-search {
          height: 44px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          color: #98A2B3;
        }

        .direct-search input {
          width: 100%;
          border: 0;
          outline: 0;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.86rem;
        }

        .direct-search button {
          width: 28px;
          height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #0A0B2D;
          cursor: pointer;
        }

        .direct-search button:hover {
          background: #FFF4EC;
          color: #F1670F;
        }

        .direct-section-title,
        .direct-result-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin: 18px 0 10px;
        }

        .direct-section-title h3,
        .direct-result-top p {
          margin: 0;
          color: #0A0B2D;
          font-size: 0.86rem;
          font-weight: 800;
        }

        .direct-section-title button,
        .direct-result-top button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 0;
          background: transparent;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.74rem;
          font-weight: 800;
          cursor: pointer;
        }

        .direct-filter-trigger span {
          width: 18px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #F1670F;
          color: #FFFFFF;
          font-size: 0.64rem;
        }

        .direct-filter-trigger--active {
          color: #F1670F !important;
        }

        .direct-filter-panel {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
          align-items: end;
          gap: 10px;
          margin: 0 0 12px;
          padding: 12px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
        }

        .direct-filter-panel label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          color: #667085;
          font-size: 0.7rem;
          font-weight: 800;
        }

        .direct-filter-panel select {
          min-height: 38px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.75rem;
          font-weight: 700;
          outline: 0;
          padding: 0 10px;
        }

        .direct-filter-panel select:focus {
          border-color: #F1670F;
          box-shadow: 0 0 0 3px rgba(241, 103, 15, 0.12);
        }

        .direct-filter-panel > button {
          min-height: 38px;
          padding: 0 12px;
          border: 1.5px solid #0A0B2D;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.72rem;
          font-weight: 800;
          cursor: pointer;
        }

        .direct-filter-panel > button:hover {
          border-color: #F1670F;
          background: #F1670F;
          color: #FFFFFF;
        }

        .direct-empty-results {
          padding: 22px;
          border: 1.5px dashed #CDD3DF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #667085;
          text-align: center;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .direct-inline-empty {
          min-width: 220px;
          min-height: 74px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 14px;
          border: 1.5px dashed #CDD3DF;
          border-radius: 8px;
          color: #667085;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .direct-carousel-wrap {
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr) 34px;
          align-items: center;
          gap: 8px;
        }

        .direct-carousel-arrow {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          cursor: pointer;
        }

        .direct-carousel-arrow:hover {
          background: #EEF0F5;
        }

        .direct-categories {
          display: flex;
          gap: 9px;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 2px;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
        }

        .direct-categories::-webkit-scrollbar {
          display: none;
        }

        .direct-categories button {
          width: 138px;
          min-width: 138px;
          min-height: 74px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.72rem;
          font-weight: 800;
          cursor: pointer;
          scroll-snap-align: start;
        }

        .direct-categories button span {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #FFF4EC;
        }

        .direct-categories button span svg {
          width: 18px;
          height: 18px;
          color: #F1670F;
        }

        .direct-mini-list,
        .direct-results {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .direct-mini-card,
        .direct-result-card {
          width: 100%;
          display: grid;
          grid-template-columns: 72px minmax(0, 1fr) auto;
          gap: 12px;
          align-items: center;
          padding: 10px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          text-align: left;
        }

        .direct-mini-card {
          cursor: pointer;
        }

        .direct-mini-card img,
        .direct-result-card > img {
          width: 72px;
          height: 72px;
          border-radius: 8px;
          object-fit: cover;
        }

        .direct-mini-card strong,
        .direct-result-info h3 {
          display: block;
          margin: 0 0 5px;
          color: #0A0B2D;
          font-size: 0.9rem;
          font-weight: 800;
        }

        .direct-mini-card small,
        .direct-result-info small {
          color: #F1670F;
          font-size: 0.74rem;
          font-weight: 800;
        }

        .direct-wide-secondary,
        .direct-wide-primary,
        .direct-secondary,
        .direct-primary {
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 8px;
          font: inherit;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
          white-space: nowrap;
        }

        .direct-wide-secondary,
        .direct-secondary {
          border: 1.5px solid #0A0B2D;
          background: #FFFFFF;
          color: #0A0B2D;
        }

        .direct-wide-primary,
        .direct-primary {
          border: 1.5px solid #0A0B2D;
          background: #0A0B2D;
          color: #FFFFFF;
        }

        .direct-secondary:hover,
        .direct-primary:hover {
          border-color: #F1670F;
          background: #F1670F;
          color: #FFFFFF;
        }

        .direct-wide-secondary,
        .direct-wide-primary {
          width: 100%;
          margin-top: 14px;
        }

        .direct-result-card {
          grid-template-columns: 76px minmax(0, 1fr) 236px;
        }

        .direct-result-info strong {
          display: block;
          margin-bottom: 5px;
          color: #0A0B2D;
          font-size: 0.78rem;
        }

        .direct-result-info p {
          display: flex;
          align-items: center;
          gap: 6px;
          margin: 3px 0;
          color: #667085;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .direct-result-info svg {
          color: #0A0B2D;
        }

        .direct-result-info p span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #0A0B2D;
        }

        .direct-result-actions {
          display: grid;
          grid-template-columns: 124px 96px;
          gap: 8px;
          justify-content: end;
        }

        .direct-detail-media {
          position: relative;
          height: 220px;
          overflow: hidden;
          border-radius: 8px;
          background: #E6E8EF;
        }

        .direct-detail-media img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .direct-floating-back {
          position: absolute;
          left: 12px;
          top: 12px;
          z-index: 2;
        }

        .direct-floating-actions {
          position: absolute;
          right: 12px;
          top: 12px;
          z-index: 2;
          display: flex;
          gap: 8px;
        }

        .direct-floating-actions button {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 0;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.92);
          color: #0A0B2D;
          font-size: 0.95rem;
          line-height: 1;
          cursor: pointer;
        }

        .direct-floating-actions button svg {
          display: block;
          flex-shrink: 0;
        }

        .direct-detail-media > span {
          position: absolute;
          left: 14px;
          bottom: 14px;
          padding: 5px 10px;
          border-radius: 8px;
          background: #0B55F4;
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
        }

        .direct-detail-content {
          padding-top: 18px;
        }

        .direct-detail-content > strong {
          display: block;
          margin-top: 6px;
          color: #667085;
          font-size: 0.84rem;
        }

        .direct-rating,
        .direct-detail-facts p {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 8px 0;
          color: #667085;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .direct-rating svg,
        .direct-detail-facts svg {
          color: #F1670F;
        }

        .direct-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 12px 0;
        }

        .direct-badges span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 8px;
          background: #FFF4EC;
          color: #F1670F;
          font-size: 0.72rem;
          font-weight: 800;
        }

        .direct-badges span:first-child {
          background: #ECFDF3;
          color: #16A34A;
        }

        .direct-detail-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 42px;
          border: 0;
          border-top: 1px solid #EEF0F5;
          background: #FFFFFF;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
        }

        .direct-service-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .direct-service-heading p,
        .direct-service-grid article span,
        .direct-service-address span {
          margin: 0 0 4px;
          color: #667085;
          font-size: 0.72rem;
          font-weight: 500;
        }

        .direct-service-heading h2 {
          margin: 0;
          color: #0A0B2D;
          font-size: 1.22rem;
          line-height: 1.22;
          font-weight: 700;
        }

        .direct-service-price {
          min-width: 142px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 14px;
          border: 1.5px solid #FED7AA;
          border-radius: 8px;
          background: #FFF7ED;
          box-shadow: 0 10px 24px rgba(241, 103, 15, 0.1);
          white-space: nowrap;
        }

        .direct-service-price span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #9A3412;
          font-size: 0.66rem;
          font-weight: 700;
        }

        .direct-service-price svg {
          color: #F1670F;
        }

        .direct-service-price strong {
          color: #0A0B2D;
          font-size: 1.16rem;
          line-height: 1;
          font-weight: 750;
        }

        .direct-provider-strip {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px 12px;
          margin: 12px 0;
          padding: 10px 12px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #F8FAFC;
        }

        .direct-provider-strip img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #FFFFFF;
          box-shadow: 0 6px 14px rgba(10, 11, 45, 0.12);
        }

        .direct-provider-strip > div {
          min-width: 0;
          flex: 1;
        }

        .direct-provider-strip > div > span {
          display: block;
          margin: 0 0 4px;
          color: #667085;
          font-size: 0.72rem;
          font-weight: 500;
        }

        .direct-provider-strip > div > strong {
          display: block;
          color: #0A0B2D;
          font-size: 0.86rem;
          font-weight: 650;
        }

        .direct-provider-strip button {
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 12px;
          border: 1.5px solid #0A0B2D;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .direct-provider-strip button:hover {
          background: #0A0B2D;
          color: #FFFFFF;
        }

        .direct-service-description {
          margin: 12px 0;
          color: #475467;
          font-size: 0.86rem;
          line-height: 1.55;
          font-weight: 400;
        }

        .direct-service-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin: 12px 0;
        }

        .direct-service-grid article {
          display: grid;
          grid-template-columns: 32px minmax(0, 1fr);
          gap: 4px 10px;
          align-items: center;
          padding: 10px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
        }

        .direct-service-grid article > svg {
          grid-row: span 2;
          color: #F1670F;
        }

        .direct-service-grid article strong {
          color: #0A0B2D;
          font-size: 0.78rem;
          line-height: 1.35;
          font-weight: 600;
        }

        .direct-service-lists {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin: 12px 0;
        }

        .direct-service-lists section {
          padding: 12px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
        }

        .direct-service-lists h3 {
          margin: 0 0 8px;
          color: #0A0B2D;
          font-size: 0.82rem;
          font-weight: 650;
        }

        .direct-service-lists p {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin: 7px 0;
          color: #475467;
          font-size: 0.76rem;
          line-height: 1.35;
          font-weight: 400;
        }

        .direct-service-lists svg {
          flex: 0 0 auto;
          margin-top: 2px;
          color: #16A34A;
        }

        .direct-service-lists section:last-child svg {
          color: #EF4444;
        }

        .direct-service-address {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 12px;
          padding: 12px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #F8FAFC;
        }

        .direct-service-address > svg {
          color: #F1670F;
          margin-top: 2px;
        }

        .direct-service-address strong,
        .direct-service-address p {
          display: block;
          margin: 0;
          color: #0A0B2D;
          font-size: 0.78rem;
          line-height: 1.4;
          font-weight: 500;
        }

        .direct-service-address p {
          margin-top: 4px;
          color: #667085;
          font-weight: 400;
        }

        .direct-step p,
        .direct-categories button,
        .direct-mini-card strong,
        .direct-result-info h3,
        .direct-result-info strong,
        .direct-result-info p,
        .direct-mini-card small,
        .direct-result-info small,
        .direct-badges span,
        .direct-detail-row,
        .direct-filter-panel label,
        .direct-section-title a,
        .direct-back-to-choice {
          font-weight: 600;
        }

        .direct-result-info p,
        .direct-rating,
        .direct-detail-facts p {
          font-weight: 500;
        }

        .direct-form-grid,
        .direct-panel--form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .direct-form-grid label,
        .direct-textarea {
          color: #0A0B2D;
          font-size: 0.78rem;
          font-weight: 650;
        }

        .direct-input-wrap,
        .direct-form-grid select,
        .direct-textarea textarea {
          width: 100%;
          min-height: 42px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 6px;
          padding: 0 12px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
        }

        .direct-input-wrap input,
        .direct-form-grid select {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          font: inherit;
          font-weight: 500;
          color: #0A0B2D;
        }

        .direct-schedule-trigger {
          justify-content: space-between;
          font: inherit;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
        }

        .direct-input-wrap svg,
        .direct-textarea span {
          color: #0B55F4;
        }

        .direct-textarea {
          position: relative;
          display: block;
        }

        .direct-textarea textarea {
          min-height: 96px;
          padding: 12px;
          resize: none;
          font: inherit;
          font-weight: 500;
          outline: 0;
        }

        .direct-textarea span {
          position: absolute;
          right: 12px;
          bottom: 10px;
          font-size: 0.68rem;
          font-weight: 800;
        }

        .direct-attachments p {
          margin: 0 0 8px;
          color: #0A0B2D;
          font-size: 0.78rem;
          font-weight: 800;
        }

        .direct-attachments div {
          display: flex;
          gap: 10px;
        }

        .direct-attachments img,
        .direct-attachments button {
          width: 62px;
          height: 62px;
          border-radius: 8px;
        }

        .direct-attachments img {
          object-fit: cover;
        }

        .direct-attachments button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 1.5px dashed #0A0B2D;
          background: #F8FAFC;
          color: #0A0B2D;
          font-size: 1.08rem;
          cursor: pointer;
        }

        .direct-attachments button:hover {
          background: #EEF0F5;
        }

        .opportunity-flow .direct-step--active span,
        .opportunity-flow .direct-step--done span {
          background: #F1670F;
        }

        .opportunity-flow .direct-step--active {
          border-color: #FED7AA;
          background: #FFF7ED;
        }

        .opportunity-primary {
          border-color: #0A0B2D;
          background: #0A0B2D;
        }

        .opportunity-primary:hover {
          border-color: #F1670F;
          background: #F1670F;
        }

        .opportunity-primary:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .opportunity-attachments {
          display: grid;
          gap: 12px;
        }

        .opportunity-attachment-actions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .opportunity-attachment-actions label {
          min-height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1.5px dashed #0A0B2D;
          border-radius: 8px;
          background: #F8FAFC;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        .opportunity-attachment-actions input {
          display: none;
        }

        .opportunity-attachment-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .opportunity-attachment-list span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font-size: 0.72rem;
          font-weight: 600;
        }

        .opportunity-attachment-list button {
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 0;
          border-radius: 6px;
          background: #FEF2F2;
          color: #DC2626;
          cursor: pointer;
        }

        .opportunity-review p,
        .opportunity-info-box {
          color: #667085;
          font-size: 0.8rem;
          line-height: 1.55;
        }

        .opportunity-info-box {
          padding: 12px 14px;
          border: 1.5px solid #FED7AA;
          border-radius: 8px;
          background: #FFF7ED;
        }

        .opportunity-info-box strong {
          color: #F1670F;
        }

        .opportunity-success-icon {
          background: #F1670F;
        }

        .direct-calendar-overlay {
          position: fixed;
          inset: 0;
          z-index: 80;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 22px;
          background: rgba(10, 11, 45, 0.36);
          backdrop-filter: blur(3px);
        }

        .direct-calendar-modal {
          width: min(100%, 520px);
          max-height: min(720px, calc(100vh - 44px));
          overflow-y: auto;
          padding: 18px;
          border: 1.5px solid #E6E8EF;
          border-radius: 12px;
          background: #FFFFFF;
          box-shadow: 0 24px 60px rgba(10, 11, 45, 0.22);
        }

        .direct-calendar-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 14px;
        }

        .direct-calendar-header span {
          color: #667085;
          font-size: 0.74rem;
          font-weight: 500;
        }

        .direct-calendar-header h3 {
          margin: 3px 0 0;
          color: #0A0B2D;
          font-size: 1rem;
          line-height: 1.25;
          font-weight: 700;
        }

        .direct-calendar-header > button,
        .direct-calendar-nav button {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          cursor: pointer;
        }

        .direct-calendar-nav {
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr) 34px;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .direct-calendar-nav strong {
          text-align: center;
          color: #0A0B2D;
          font-size: 0.9rem;
          font-weight: 700;
        }

        .direct-calendar-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
          color: #667085;
          font-size: 0.74rem;
          font-weight: 500;
        }

        .direct-calendar-legend span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .direct-calendar-legend i {
          width: 9px;
          height: 9px;
          border-radius: 99px;
        }

        .direct-calendar-legend .is-available {
          background: #16A34A;
        }

        .direct-calendar-legend .is-blocked {
          background: #CBD5E1;
        }

        .direct-calendar-weekdays,
        .direct-calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 6px;
        }

        .direct-calendar-weekdays {
          margin-bottom: 6px;
        }

        .direct-calendar-weekdays span {
          text-align: center;
          color: #667085;
          font-size: 0.68rem;
          font-weight: 700;
        }

        .direct-calendar-grid button {
          min-height: 42px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.8rem;
          font-weight: 650;
          cursor: pointer;
        }

        .direct-calendar-grid button.is-empty {
          visibility: hidden;
        }

        .direct-calendar-grid button.is-available {
          border-color: #BBF7D0;
          background: #F0FDF4;
          color: #15803D;
        }

        .direct-calendar-grid button.is-blocked {
          background: #F1F5F9;
          color: #94A3B8;
          cursor: not-allowed;
          text-decoration: line-through;
        }

        .direct-calendar-grid button.is-selected,
        .direct-calendar-grid button.is-available:hover {
          border-color: #0A0B2D;
          background: #0A0B2D;
          color: #FFFFFF;
          text-decoration: none;
        }

        .direct-time-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }

        .direct-time-grid button {
          min-height: 58px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font: inherit;
          cursor: pointer;
        }

        .direct-time-grid button strong {
          font-size: 0.86rem;
          font-weight: 700;
        }

        .direct-time-grid button span {
          color: #667085;
          font-size: 0.68rem;
          font-weight: 500;
        }

        .direct-time-grid button.is-available {
          border-color: #BBF7D0;
          background: #F0FDF4;
        }

        .direct-time-grid button.is-blocked {
          background: #F1F5F9;
          color: #94A3B8;
          cursor: not-allowed;
        }

        .direct-time-grid button.is-selected {
          border-color: #0A0B2D;
          background: #0A0B2D;
          color: #FFFFFF;
        }

        .direct-time-grid button.is-selected span {
          color: rgba(255,255,255,0.74);
        }

        .direct-calendar-actions {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 10px;
          margin-top: 14px;
        }

        .direct-calendar-secondary,
        .direct-calendar-primary {
          min-height: 40px;
          border-radius: 8px;
          font: inherit;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        .direct-calendar-secondary {
          border: 1.5px solid #E6E8EF;
          background: #FFFFFF;
          color: #0A0B2D;
        }

        .direct-calendar-primary {
          border: 1.5px solid #0A0B2D;
          background: #0A0B2D;
          color: #FFFFFF;
        }

        .direct-panel--success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 42px 28px;
        }

        .direct-success-icon {
          width: 88px;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #16A34A;
          color: #FFFFFF;
          font-size: 2.4rem;
          box-shadow: 0 18px 36px rgba(22, 163, 74, 0.2);
        }

        .direct-panel--success h2 {
          margin-top: 22px;
          font-size: 1.24rem;
        }

        .direct-panel--success > p {
          max-width: 360px;
          margin: 10px 0 22px;
          color: #667085;
          font-size: 0.88rem;
          line-height: 1.5;
        }

        .direct-summary {
          width: 100%;
          padding: 18px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          text-align: left;
        }

        .direct-summary h3 {
          margin: 0 0 14px;
          color: #0A0B2D;
          font-size: 0.9rem;
          font-weight: 800;
        }

        .direct-summary dl {
          display: grid;
          gap: 10px;
          margin: 0 0 16px;
        }

        .direct-summary div {
          display: grid;
          grid-template-columns: 120px minmax(0, 1fr);
          gap: 12px;
        }

        .direct-summary dt {
          color: #667085;
          font-size: 0.76rem;
          font-weight: 800;
        }

        .direct-summary dd {
          margin: 0;
          color: #0A0B2D;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .direct-summary strong {
          color: #0B55F4;
          font-size: 1rem;
        }

        .direct-link-button {
          margin-top: 14px;
          border: 0;
          background: transparent;
          color: #0B55F4;
          font: inherit;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
        }

        @media (max-width: 760px) {
          .choice-shell {
            padding: 24px 14px 22px;
          }

          .choice-header {
            margin-bottom: 18px;
            text-align: center;
          }

          .choice-header h1 {
            font-size: 1.2rem;
          }

          .choice-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .choice-card {
            min-height: 0;
            display: grid;
            grid-template-columns: 112px minmax(0, 1fr);
            align-items: center;
            gap: 14px;
            padding: 16px;
          }

          .choice-illustration {
            width: 112px;
            height: 112px;
            grid-row: span 2;
            margin: 0;
          }

          .choice-glow {
            width: 96px;
            height: 96px;
          }

          .choice-main-icon {
            width: 72px;
            height: 72px;
            border-radius: 18px;
            font-size: 2.5rem;
          }

          .choice-floating--check {
            width: 38px;
            height: 38px;
            right: 4px;
            top: 12px;
            border-width: 3px;
            font-size: 0.9rem;
          }

          .choice-floating--top,
          .choice-floating--bottom {
            width: 34px;
            height: 34px;
            right: 0;
            border-width: 3px;
            font-size: 0.78rem;
          }

          .choice-floating--top {
            top: 4px;
          }

          .choice-floating--bottom {
            bottom: 6px;
          }

          .choice-spark {
            display: none;
          }

          .choice-card-body {
            text-align: left;
            padding-left: 0;
            border-left: 0;
          }

          .choice-card h2 {
            font-size: 1rem;
          }

          .choice-card p {
            max-width: none;
            margin: 0;
            font-size: 0.78rem;
            line-height: 1.48;
          }

          .choice-card ul {
            display: none;
          }

          .choice-card button {
            grid-column: 1 / -1;
            min-height: 46px;
            margin-top: 0;
          }

          .direct-steps {
            grid-template-columns: 1fr;
          }

          .direct-step-shell {
            width: 100%;
          }

          .direct-result-card {
            grid-template-columns: 72px minmax(0, 1fr);
          }

          .direct-filter-panel {
            grid-template-columns: 1fr;
          }

          .direct-result-actions {
            grid-column: 1 / -1;
          }

          .direct-flow-title {
            flex-direction: column;
          }
        }

        @media (max-width: 680px) {
          .choice-layout {
            display: block;
            overflow: visible;
          }

          .choice-main,
          .choice-page {
            min-height: auto;
            overflow: visible;
          }
        }
      `}</style>

      <div className="choice-layout">
        <Sidebar />

        <div className="choice-main">
          <Topbar />
          <main className="choice-page">
            <div className="choice-shell">
              {flow === "direta" ? (
                <DirectSolicitationFlow
                  step={directStep}
                  maxStep={maxDirectStep}
                  service={selectedService}
                  categoryFilter={directCategoryFilter}
                  schedule={directSchedule}
                  request={createdRequest}
                  setCategoryFilter={setDirectCategoryFilter}
                  setStep={handleDirectStep}
                  setService={setSelectedService}
                  onScheduleConfirm={handleDirectScheduleConfirm}
                  onBack={handleDirectBack}
                  onHome={() => router.push("/Pages/Tela_inicial_cliente")}
                  onViewRequests={(requestId) => {
                    const target = requestId
                      ? `/Pages/Minhas_Solicitacoes?abrir=${encodeURIComponent(requestId)}`
                      : "/Pages/Minhas_Solicitacoes";
                    router.push(target);
                  }}
                />
              ) : flow === "oportunidade" ? (
                <PublishOpportunityFlow
                  step={opportunityStep}
                  maxStep={maxOpportunityStep}
                  form={opportunityForm}
                  opportunity={createdOpportunity || buildPublishedOpportunity(opportunityForm)}
                  setStep={handleOpportunityStep}
                  setForm={setOpportunityForm}
                  onBack={handleOpportunityBack}
                  onPublish={handlePublishOpportunity}
                  onHome={() => router.push("/Pages/Tela_inicial_cliente")}
                  onViewOpportunity={(opportunityId) => router.push(`/Pages/Minhas_Solicitacoes?abrir=${encodeURIComponent(opportunityId)}`)}
                />
              ) : (
                <>
              <section className="choice-header">
                <h1>Como você gostaria de contratar?</h1>
                <p>Escolha a opção que melhor atende à sua necessidade.</p>
              </section>

              <section className="choice-grid" aria-label="Tipos de contratação">
                {OPTIONS.map((option) => (
                  <OptionCard
                    key={option.key}
                    option={option}
                    selected={selected === option.key}
                    onSelect={handleSelect}
                  />
                ))}
              </section>

              {selected && (
                <div className="choice-feedback" role="status">
                  <FaShieldAlt />
                  {selected === "direta"
                    ? "Solicitação direta selecionada. Próxima etapa: escolher um serviço cadastrado."
                    : "Publicação de oportunidade selecionada. Próxima etapa: descrever sua necessidade."}
                </div>
              )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
