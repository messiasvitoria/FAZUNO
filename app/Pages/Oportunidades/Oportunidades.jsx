"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaBolt,
  FaBroom,
  FaCalendarAlt,
  FaCheckCircle,
  FaComments,
  FaChevronDown,
  FaClock,
  FaEllipsisV,
  FaEye,
  FaHammer,
  FaLeaf,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPaperPlane,
  FaPaintRoller,
  FaRegClock,
  FaSearch,
  FaSlidersH,
  FaSnowflake,
  FaStar,
  FaThumbtack,
  FaTint,
  FaTools,
  FaTimes,
  FaUser,
  FaWrench,
} from "react-icons/fa";

const STATUS = {
  nova: { label: "Nova", color: "#7C3AED", bg: "#F1E9FF" },
  analise: { label: "Em Análise", color: "#F97316", bg: "#FFF1E7" },
  interesse: { label: "Interesse Enviado", color: "#2563EB", bg: "#EAF1FF" },
  aceita: { label: "Aceita", color: "#16A34A", bg: "#E8F8EE" },
  encerrada: { label: "Encerrada", color: "#6B7280", bg: "#F0F2F4" },
  expirada: { label: "Expirada", color: "#DC2626", bg: "#FDECEC" },
};

const CATEGORY_ICONS = {
  Reformas: <FaHammer />,
  Limpeza: <FaBroom />,
  Hidráulica: <FaTint />,
  Elétrica: <FaBolt />,
  Pintura: <FaPaintRoller />,
  Jardinagem: <FaLeaf />,
  "Ar-condicionado": <FaSnowflake />,
  Manutenção: <FaTools />,
};

const FILTERS = [
  { label: "Todas", value: "todas" },
  { label: "Maior valor", value: "maiorValor" },
  { label: "Menor distância", value: "menorDistancia" },
  { label: "Mais recentes", value: "recentes" },
];

const PRICE_RANGES = [
  { label: "Faixa de preço", value: "todas" },
  { label: "Até R$ 300", value: "ate300" },
  { label: "R$ 301 a R$ 600", value: "301a600" },
  { label: "Acima de R$ 600", value: "acima600" },
];

const STATUS_FILTERS = [
  { label: "Todos os status", value: "todos" },
  ...Object.entries(STATUS).map(([value, item]) => ({ label: item.label, value })),
];

const TRANSFERRED_OPPORTUNITIES_KEY = "fazuno_oportunidades_transferidas";

const OPPORTUNITIES = [
  {
    id: 1,
    client: "Mariana Costa",
    avatar: "/profiles/mariana-costa.jpg",
    rating: 4.8,
    city: "Vila Mariana, São Paulo - SP",
    category: "Pintura",
    title: "Pintura de apartamento",
    description: "Apartamento de 2 quartos, sala e cozinha. Cliente procura acabamento limpo e prazo curto.",
    date: "18/05/2024",
    budgetMin: 800,
    budgetMax: 1200,
    estimated: 1000,
    distance: 3.2,
    status: "nova",
    pinned: false,
    time: "09:00",
    receivedAgo: "12 minutos",
    expiresIn: "03h:45m",
    address: "Rua Vergueiro, 840 - Vila Mariana, São Paulo - SP",
    observations: "Cliente solicita acabamento limpo e proteção dos móveis.",
    compatibility: 92,
    clientSince: "jan/2023",
  },
  {
    id: 2,
    client: "Carlos Menezes",
    avatar: "/profiles/carlos-menezes.jpg",
    rating: 4.6,
    city: "Pinheiros, São Paulo - SP",
    category: "Limpeza",
    title: "Limpeza pós-obra",
    description: "Limpeza completa de apartamento após reforma, incluindo vidros, piso e retirada de resíduos.",
    date: "20/05/2024",
    budgetMin: 300,
    budgetMax: 500,
    estimated: 400,
    distance: 1.8,
    status: "analise",
    pinned: true,
    time: "14:00",
    receivedAgo: "25 minutos",
    expiresIn: "05h:10m",
    address: "Rua dos Pinheiros, 320 - Pinheiros, São Paulo - SP",
    observations: "Apartamento vazio, com acesso liberado pela portaria.",
    compatibility: 97,
    clientSince: "abr/2022",
  },
  {
    id: 3,
    client: "Juliana Pereira",
    avatar: "/profiles/juliana-pereira.jpg",
    rating: 5.0,
    city: "Moema, São Paulo - SP",
    category: "Hidráulica",
    title: "Troca de torneira",
    description: "Torneira da cozinha com vazamento constante. Serviço simples com preferência para hoje.",
    date: "17/05/2024",
    budgetMin: 150,
    budgetMax: 250,
    estimated: 200,
    distance: 2.5,
    status: "interesse",
    pinned: false,
    time: "16:30",
    receivedAgo: "40 minutos",
    expiresIn: "01h:20m",
    address: "Av. Ibirapuera, 1120 - Moema, São Paulo - SP",
    observations: "Cliente prefere atendimento ainda hoje.",
    compatibility: 88,
    clientSince: "ago/2023",
  },
  {
    id: 4,
    client: "Ricardo Almeida",
    avatar: "/profiles/ricardo-almeida.jpg",
    rating: 4.9,
    city: "Tatuapé, São Paulo - SP",
    category: "Elétrica",
    title: "Instalação de luminárias",
    description: "Instalar 3 luminárias no teto da sala e do quarto, com avaliação dos pontos existentes.",
    date: "19/05/2024",
    budgetMin: 180,
    budgetMax: 280,
    estimated: 220,
    distance: 4.0,
    status: "aceita",
    pinned: false,
    time: "10:30",
    receivedAgo: "1 hora",
    expiresIn: null,
    address: "Rua Tuiuti, 650 - Tatuapé, São Paulo - SP",
    observations: "Pontos elétricos já estão preparados para avaliação.",
    compatibility: 95,
    clientSince: "mar/2021",
  },
  {
    id: 5,
    client: "Ana Souza",
    avatar: "/profiles/ana-souza.jpg",
    rating: 4.7,
    city: "Santana, São Paulo - SP",
    category: "Jardinagem",
    title: "Poda de árvores e jardim",
    description: "Manutenção completa do jardim com poda de árvores frutíferas e organização dos canteiros.",
    date: "21/05/2024",
    budgetMin: 250,
    budgetMax: 450,
    estimated: 350,
    distance: 5.1,
    status: "encerrada",
    pinned: false,
    time: "08:30",
    receivedAgo: "2 horas",
    expiresIn: null,
    address: "Rua Voluntários da Pátria, 910 - Santana, São Paulo - SP",
    observations: "Cliente encerrou a busca por prestadores.",
    compatibility: 84,
    clientSince: "mai/2020",
  },
  {
    id: 6,
    client: "Pedro Lima",
    avatar: "/profiles/pedro-lima.jpg",
    rating: 4.4,
    city: "Brooklin, São Paulo - SP",
    category: "Ar-condicionado",
    title: "Instalação de ar-condicionado",
    description: "Instalação de split 12.000 BTUs no quarto principal, com suporte e acabamento.",
    date: "16/05/2024",
    budgetMin: 400,
    budgetMax: 600,
    estimated: 480,
    distance: 3.8,
    status: "expirada",
    pinned: false,
    time: "13:00",
    receivedAgo: "3 horas",
    expiresIn: null,
    address: "Av. Santo Amaro, 4450 - Brooklin, São Paulo - SP",
    observations: "Prazo de resposta encerrado.",
    compatibility: 90,
    clientSince: "nov/2022",
  },
];

const DETAIL_STATUS = {
  nova: {
    badge: "NOVA OPORTUNIDADE",
    icon: <FaBolt />,
    message: "Esta oportunidade está disponível para outros prestadores. Seja rápido para demonstrar interesse.",
    tone: "purple",
    actionTone: "navy",
    primary: "ENVIAR INTERESSE",
    primaryIcon: <FaPaperPlane />,
    secondary: "RECUSAR OPORTUNIDADE",
    secondaryIcon: <FaTimes />,
  },
  analise: {
    badge: "EM ANÁLISE",
    icon: <FaClock />,
    message: "Analise as informações da oportunidade antes de demonstrar interesse.",
    tone: "orange",
    actionTone: "navy",
    primary: "ENVIAR INTERESSE",
    primaryIcon: <FaPaperPlane />,
    secondary: "RECUSAR OPORTUNIDADE",
    secondaryIcon: <FaTimes />,
  },
  interesse: {
    badge: "INTERESSE ENVIADO",
    icon: <FaComments />,
    message: "Seu interesse foi enviado ao cliente. Aguarde a resposta.",
    tone: "blue",
    primary: "INTERESSE ENVIADO",
    primaryIcon: <FaCheckCircle />,
    secondary: "CANCELAR INTERESSE",
    secondaryIcon: <FaTimes />,
    disabledPrimary: true,
    disabledNotice: "Seu interesse ja foi enviado. Aguarde a resposta do cliente.",
    disabledMessage: "Seu interesse jÃ¡ foi enviado. Aguarde a resposta do cliente.",
  },
  encerrada: {
    badge: "ENCERRADA",
    icon: <FaCheckCircle />,
    message: "Esta oportunidade foi encerrada pelo cliente.",
    tone: "gray",
    reasons: ["Serviço cancelado pelo cliente", "Solicitação removida da plataforma", "Oportunidade encerrada sem contratação"],
    primary: "VER RESUMO",
    primaryIcon: <FaEye />,
  },
  expirada: {
    badge: "EXPIRADA",
    icon: <FaRegClock />,
    message: "Esta oportunidade expirou e não está mais disponível para manifestação de interesse.",
    tone: "red",
    reasons: ["Prazo de resposta encerrado", "Cliente não recebeu novas manifestações após o período definido"],
    primary: "FECHAR",
    primaryIcon: <FaTimes />,
  },
  aceita: {
    badge: "SELECIONADA",
    icon: <FaCheckCircle />,
    message: "Parabéns! Você foi selecionado para realizar este serviço.",
    tone: "green",
    primaryIcon: <FaCheckCircle />,
    primary: "ACESSAR SOLICITAÇÃO",
  },
};

function money(value) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

function writeTransferredOpportunity(item) {
  window.localStorage.setItem(TRANSFERRED_OPPORTUNITIES_KEY, JSON.stringify([item]));
}

function opportunityToRequest(item) {
  return {
    id: `opp-${item.id}`,
    opportunityId: item.id,
    origem: "oportunidades",
    originLabel: "Veio de oportunidades",
    client: item.client,
    avatar: item.avatar,
    rating: item.rating,
    reviews: item.reviews || 1,
    neighborhood: item.city,
    address: item.address,
    distance: item.distance,
    category: item.category,
    title: item.title,
    description: item.description,
    date: item.date,
    time: item.time,
    value: item.estimated,
    valueLabel: "Valor aprovado",
    status: "aceita",
    observacoes: item.observations,
    clientSince: item.clientSince,
    acceptedFromOpportunityAt: new Date().toISOString(),
  };
}

function parseDate(value) {
  const [day, month, year] = value.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function matchesPriceRange(item, range) {
  if (range === "ate300") return item.estimated <= 300;
  if (range === "301a600") return item.estimated > 300 && item.estimated <= 600;
  if (range === "acima600") return item.estimated > 600;
  return true;
}

function StatusBadge({ status }) {
  const item = STATUS[status] || STATUS.nova;

  return (
    <span className="op-status" style={{ color: item.color, backgroundColor: item.bg }}>
      {item.label}
    </span>
  );
}

function CategoryIcon({ category }) {
  return <div className="op-category-icon">{CATEGORY_ICONS[category] || <FaWrench />}</div>;
}

function PinButton({ pinned, onClick }) {
  return (
    <button
      type="button"
      className={`op-pin ${pinned ? "op-pin--active" : ""}`}
      onClick={onClick}
      aria-label={pinned ? "Desafixar oportunidade" : "Fixar oportunidade"}
      title={pinned ? "Desafixar oportunidade" : "Fixar oportunidade"}
    >
      <FaThumbtack />
    </button>
  );
}

function FilterButton({ children, active, onClick }) {
  return (
    <button type="button" className={`op-filter ${active ? "op-filter--active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

function OpportunityCard({ item, onAccessRequest, onDetails, onPin }) {
  const isAccepted = item.status === "aceita";
  const isPinned = item.pinned || isAccepted;

  return (
    <article className={`op-card ${isPinned ? "op-card--pinned" : ""} ${isAccepted ? "op-card--accepted" : ""}`}>
      <div className="op-client-panel">
        <div className="op-avatar" aria-hidden="true">
          {item.avatar ? <Image src={item.avatar} alt="" fill sizes="58px" className="op-avatar-image" /> : item.client.charAt(0)}
        </div>
        <div className="op-client-row">
          <strong>{item.client}</strong>
          <span className="op-rating">
            <FaStar />
            {item.rating.toFixed(1)}
          </span>
          <span className="op-city">{item.city}</span>
        </div>
        <span className="op-profile-distance">
          <FaMapMarkerAlt />
          <strong>{item.distance.toFixed(1)} km</strong>
          de distância
        </span>
      </div>

      <div className="op-service-panel">
        <div className="op-service-row">
          <CategoryIcon category={item.category} />
          <div>
            <span>{item.category}</span>
            <h2>{item.title}</h2>
          </div>
        </div>

        <p className="op-description">{item.description}</p>

        <div className="op-meta">
          <span>
            <FaCalendarAlt />
            Data desejada
            <strong>{item.date}</strong>
          </span>
        </div>
      </div>

      <aside className={`op-card-side ${isAccepted ? "op-card-side--accepted" : ""}`}>
        <StatusBadge status={item.status} />
        {!isAccepted && (
          <div className="op-price">
            <strong>R$ {money(item.estimated)}</strong>
            <span>Valor estimado</span>
          </div>
        )}
        {isAccepted && (
          <div className="op-accepted-banner">
            <FaCheckCircle />
            <span>Parabéns! Você foi selecionado para realizar este serviço.</span>
          </div>
        )}
        <div className="op-card-actions">
          {isAccepted ? (
            <button type="button" className="op-access-request" onClick={() => onAccessRequest(item)}>
              Acessar solicitação
            </button>
          ) : (
            <>
              <button type="button" className="op-details" onClick={() => onDetails(item)}>
                Ver detalhes
              </button>
              <button type="button" className="op-chat" aria-label="Abrir chat com cliente" title="Chat com cliente">
                <FaComments />
              </button>
              <PinButton pinned={isPinned} onClick={() => onPin(item.id)} />
            </>
          )}
        </div>
      </aside>
    </article>
  );
}

function DetailMetric({ icon, label, value, tone = "neutral" }) {
  return (
    <div className={`op-detail-metric op-detail-metric--${tone}`}>
      <span>{icon}</span>
      <div>
        <strong>{value}</strong>
        <small>{label}</small>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="op-detail-row">
      <span>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function OpportunityDetailsModal({ item, onAccessRequest, onClose, onAction, onPin }) {
  const status = DETAIL_STATUS[item.status] || DETAIL_STATUS.nova;
  const [modalNotice, setModalNotice] = useState("");
  const canExpire = item.status === "nova" || item.status === "analise" || item.status === "interesse";
  const primaryTone = status.actionTone || status.tone;
  const requirements = item.requirements || [
    `Experiencia comprovada em ${item.category.toLowerCase()}`,
    "Ferramentas proprias para execucao",
    "Atendimento no local informado pelo cliente",
  ];
  const expectations =
    item.expectations ||
    "Cliente procura um profissional cuidadoso, com disponibilidade no prazo solicitado e comunicacao rapida durante o atendimento.";
  const attachments = item.attachments || ["Fotos do local", "Referencia do servico", "Documento do atendimento"];
  const openMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`;
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };
  const handlePrimaryAction = () => {
    if (status.disabledPrimary) {
      setModalNotice(status.disabledNotice || status.disabledMessage || "Esta acao nao esta disponivel no momento.");
      return;
    }

    if (item.status === "aceita") {
      onAccessRequest(item);
      return;
    }

    onAction(item, "primary");
  };
  const handleSecondaryAction = () => {
    const confirmationMessage =
      item.status === "interesse"
        ? "Tem certeza que deseja cancelar o interesse nesta oportunidade?"
        : "Tem certeza que deseja recusar esta oportunidade?";

    if (!window.confirm(confirmationMessage)) return;

    onAction(item, "secondary");
  };

  return (
    <div className="op-modal-layer" role="presentation" onMouseDown={onClose}>
      <section className="op-details-modal" role="dialog" aria-modal="true" aria-labelledby="opDetailsTitle" onMouseDown={(event) => event.stopPropagation()}>
        <header className="op-modal-header">
          <span className={`op-detail-status op-detail-status--${status.tone}`}>
            {status.icon}
            {status.badge}
          </span>
          <div className="op-modal-header-actions">
            <button type="button" aria-label="Mais opções" title="Mais opções">
              <FaEllipsisV />
            </button>
            <button type="button" aria-label="Fechar detalhes" title="Fechar" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
        </header>

        <h2 id="opDetailsTitle">{item.title}</h2>

        <section className="op-detail-summary" aria-label="Resumo da oportunidade">
          <DetailMetric icon={<FaTools />} label="Valor estimado" value={`R$ ${money(item.estimated)}`} tone="brand" />
          <DetailMetric icon={<FaMapMarkerAlt />} label="de distância" value={`${item.distance.toFixed(1)} km`} tone="brand" />
          <DetailMetric icon={<FaCalendarAlt />} label="Data e horário" value={`${item.date} às ${item.time}`} tone="brand" />
        </section>

        <div className="op-time-strip">
          <span>
            <FaRegClock />
            Recebida há {item.receivedAgo}
          </span>
          {canExpire && item.expiresIn && (
            <span>
              <FaClock />
              Expira em {item.expiresIn}
            </span>
          )}
        </div>

        <section className="op-modal-grid">
          <article className="op-modal-card">
            <h3>Cliente</h3>
            <div className="op-modal-client">
              <div className="op-modal-avatar" aria-hidden="true">
                {item.avatar ? <Image src={item.avatar} alt="" fill sizes="72px" className="op-avatar-image" /> : item.client.charAt(0)}
              </div>
              <div>
                <strong>{item.client}</strong>
                <span className="op-modal-rating">
                  <FaStar />
                  {item.rating.toFixed(1)} avaliação
                </span>
                <small>Cliente desde {item.clientSince}</small>
              </div>
            </div>
            <div className="op-quick-actions">
              <button type="button">
                <FaUser />
                Ver Perfil
              </button>
              <button type="button" onClick={openMaps}>
                <FaMapMarkerAlt />
                Ver Localização
              </button>
              <button type="button">
                <FaComments />
                Chat
              </button>
              <button type="button" onClick={() => onPin(item.id)}>
                <FaThumbtack />
                {item.pinned ? "Fixada" : "Fixar"}
              </button>
            </div>
          </article>

          <article className="op-modal-card">
            <h3>Compatibilidade com você</h3>
            <div className="op-compat">
              <div className="op-compat-score">
                <strong>{item.compatibility}%</strong>
                <span>match</span>
              </div>
              <ul>
                <li><FaCheckCircle /> Serviço que você oferece</li>
                <li><FaCheckCircle /> Região de atuação</li>
                <li><FaCheckCircle /> Faixa de preço compatível</li>
                <li><FaCheckCircle /> Alta taxa de contratação</li>
              </ul>
            </div>
          </article>
        </section>

        <section className="op-modal-card op-service-details">
          <h3 className="op-service-title">Detalhes da solicitacao</h3>
          <div className="op-service-description-block">
            <strong>Descricao</strong>
            <p>{item.description}</p>
            <p>{item.observations}</p>
          </div>

          <div className="op-service-detail-section">
            <h4>Informacoes gerais</h4>
            <div className="op-service-detail-grid">
              <DetailRow icon={<FaTools />} label="Categoria" value={item.category} />
              <DetailRow icon={<FaCalendarAlt />} label="Data desejada" value={item.date} />
              <DetailRow icon={<FaClock />} label="Horario desejado" value={item.time} />
              <DetailRow icon={<FaRegClock />} label="Prazo" value={item.expiresIn ? `Expira em ${item.expiresIn}` : "Ate esta semana"} />
              <DetailRow icon={<FaMapMarkerAlt />} label="Endereco" value={item.address} />
              <DetailRow icon={<FaMapMarkerAlt />} label="Distancia" value={`${item.distance.toFixed(1)} km`} />
              <DetailRow icon={<FaUser />} label="Modalidade" value="Presencial" />
              <DetailRow icon={<FaMoneyBillWave />} label="Orcamento" value={`R$ ${money(item.budgetMin)} a R$ ${money(item.budgetMax)}`} />
            </div>
          </div>

          <div className="op-service-extra-grid">
            <div>
              <h4>Requisitos do cliente</h4>
              <ul>
                {requirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Expectativas do cliente</h4>
              <p>{expectations}</p>
            </div>
          </div>

          <div className="op-service-attachments">
            <h4>Anexos</h4>
            <div>
              {attachments.map((attachment) => (
                <span key={attachment}>
                  <FaEye />
                  {attachment}
                </span>
              ))}
            </div>
          </div>
          <h3>Detalhes do serviço</h3>
          <div className="op-service-detail-grid">
            <DetailRow icon={<FaTools />} label="Categoria" value={item.category} />
            <DetailRow icon={<FaEye />} label="Descrição" value={item.description} />
            <DetailRow icon={<FaMapMarkerAlt />} label="Endereço" value={item.address} />
            <DetailRow icon={<FaCalendarAlt />} label="Data solicitada" value={item.date} />
            <DetailRow icon={<FaClock />} label="Horário solicitado" value={item.time} />
            <DetailRow icon={<FaMapMarkerAlt />} label="Distância" value={`${item.distance.toFixed(1)} km`} />
            <DetailRow icon={<FaComments />} label="Observações" value={item.observations} />
          </div>
        </section>

        <section className={`op-status-message op-status-message--${status.tone}`}>
          <FaCheckCircle />
          <div>
            <strong>{status.message}</strong>
            {status.reasons && (
              <ul>
                {status.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {modalNotice && (
          <div className="op-action-notice" role="status">
            <FaCheckCircle />
            {modalNotice}
          </div>
        )}

        <footer className="op-modal-footer">
          {status.primary && (
            <button
              type="button"
              className={`op-modal-main op-modal-main--${primaryTone} ${status.disabledPrimary ? "op-modal-main--inactive" : ""}`}
              onClick={handlePrimaryAction}
            >
              {status.primaryIcon}
              {status.primary}
            </button>
          )}
          {status.secondary && (
            <button type="button" className="op-modal-secondary-action" onClick={handleSecondaryAction}>
              {status.secondaryIcon}
              {status.secondary}
            </button>
          )}
        </footer>
      </section>
    </div>
  );
}

export default function Oportunidades() {
  const router = useRouter();
  const [items, setItems] = useState(OPPORTUNITIES);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [activeFilter, setActiveFilter] = useState("todas");
  const [categoryFilter, setCategoryFilter] = useState("todas");
  const [priceFilter, setPriceFilter] = useState("todas");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [onlyPinned, setOnlyPinned] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    return ["todas", ...Array.from(new Set(items.map((item) => item.category)))];
  }, [items]);

  const sortedItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = items.filter((item) => {
      if (item.transferred) return false;

      const matchesSearch =
        !term ||
        [item.client, item.city, item.category, item.title, item.description]
          .join(" ")
          .toLowerCase()
          .includes(term);

      const matchesCategory = categoryFilter === "todas" || item.category === categoryFilter;
      const matchesStatus = statusFilter === "todos" || item.status === statusFilter;
      const isPriority = item.status === "aceita";
      const matchesPinned = !onlyPinned || item.pinned || isPriority;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesPriceRange(item, priceFilter) &&
        matchesPinned
      );
    });

    return [...filtered].sort((a, b) => {
      const acceptedOrder = Number(b.status === "aceita") - Number(a.status === "aceita");
      if (acceptedOrder !== 0) return acceptedOrder;
      const pinnedOrder = Number(b.pinned) - Number(a.pinned);
      if (pinnedOrder !== 0) return pinnedOrder;
      if (activeFilter === "maiorValor") return b.estimated - a.estimated;
      if (activeFilter === "menorDistancia") return a.distance - b.distance;
      if (activeFilter === "recentes") return parseDate(b.date) - parseDate(a.date);

      return 0;
    });
  }, [activeFilter, categoryFilter, items, onlyPinned, priceFilter, search, statusFilter]);

  const visibleCount = sortedItems.length;
  const totalCount = items.filter((item) => !item.transferred).length;
  const filterCount =
    Number(categoryFilter !== "todas") +
    Number(priceFilter !== "todas") +
    Number(statusFilter !== "todos") +
    Number(onlyPinned);

  function togglePin(id) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, pinned: !item.pinned } : item)));
    setSelectedOpportunity((current) => (current?.id === id ? { ...current, pinned: !current.pinned } : current));
  }

  function handleAccessRequest(item) {
    const request = opportunityToRequest(item);

    writeTransferredOpportunity(request);
    setItems((current) =>
      current.map((currentItem) =>
        currentItem.id === item.id ? { ...currentItem, transferred: true } : currentItem,
      ),
    );
    setSelectedOpportunity(null);
    router.push(`/Pages/Solicitacao_prestador?origem=oportunidades&id=${request.id}`);
  }

  function handleModalAction(item, action) {
    const status = item.status;

    if (status === "nova" || status === "analise") {
      if (action === "primary") {
        setItems((current) => current.map((currentItem) => (currentItem.id === item.id ? { ...currentItem, status: "interesse" } : currentItem)));
      }

      if (action === "secondary") {
        setItems((current) => current.map((currentItem) => (currentItem.id === item.id ? { ...currentItem, status: "encerrada" } : currentItem)));
      }

      setSelectedOpportunity(null);
      return;
    }

    if (status === "interesse" && action === "secondary") {
      setItems((current) => current.map((currentItem) => (currentItem.id === item.id ? { ...currentItem, status: "analise" } : currentItem)));
      setSelectedOpportunity(null);
      return;
    }

    setSelectedOpportunity(null);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .op-page,
        .op-page * {
          box-sizing: border-box;
        }

        html,
        body {
          height: auto !important;
          min-height: 100%;
          overflow-y: auto !important;
        }

        .op-page {
          width: 100vw;
          min-height: 100vh;
          overflow-x: hidden;
          background: #F7F8FB;
          color: #0A0B2D;
          font-family: 'DM Sans', sans-serif;
        }

        .op-shell {
          min-height: 100vh;
          max-width: 1160px;
          margin: 0 auto;
          padding: 30px 28px 22px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .op-header {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .op-header h1 {
          margin: 0;
          color: #0A0B2D;
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.85rem, 3vw, 2.55rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: 0;
        }

        .op-header p {
          max-width: 560px;
          margin: 10px 0 0;
          color: #666B7A;
          font-size: 0.94rem;
          line-height: 1.55;
        }

        .op-toolbar {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .op-search-line {
          display: flex;
          gap: 12px;
        }

        .op-search {
          position: relative;
          flex: 1;
        }

        .op-search svg {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9DA3B1;
          font-size: 0.9rem;
          pointer-events: none;
        }

        .op-search input {
          width: 100%;
          height: 46px;
          padding: 0 16px 0 42px;
          border: 1.5px solid #E0E3EB;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .op-search input::placeholder {
          color: #A2A7B4;
        }

        .op-search input:focus {
          border-color: rgba(241, 103, 15, 0.65);
          box-shadow: 0 0 0 3px rgba(241, 103, 15, 0.12);
        }

        .op-filter-action,
        .op-select {
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1.5px solid #E0E3EB;
          border-radius: 8px;
          background: #FFFFFF;
          color: #303449;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, box-shadow 0.2s;
        }

        .op-filter-action {
          min-width: 118px;
          padding: 0 18px;
        }

        .op-filter-action span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background: #F1670F;
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
        }

        .op-filter-action:hover,
        .op-filter-action--active,
        .op-select:hover {
          border-color: rgba(241, 103, 15, 0.65);
          color: #F1670F;
          box-shadow: 0 8px 22px rgba(241, 103, 15, 0.09);
        }

        .op-filter-line {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .op-filter {
          height: 34px;
          padding: 0 14px;
          border: 1.5px solid #E0E3EB;
          border-radius: 999px;
          background: #FFFFFF;
          color: #666B7A;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .op-filter:hover,
        .op-filter--active {
          border-color: #F1670F;
          background: #F1670F;
          color: #FFFFFF;
          box-shadow: 0 8px 22px rgba(241, 103, 15, 0.18);
        }

        .op-filter-spacer {
          flex: 1;
        }

        .op-select {
          position: relative;
          height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          font-size: 0.78rem;
        }

        .op-select select {
          min-width: 118px;
          border: 0;
          outline: 0;
          appearance: none;
          background: transparent;
          color: inherit;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
          padding-right: 16px;
        }

        .op-select svg {
          pointer-events: none;
          font-size: 0.72rem;
        }

        .op-advanced-filters {
          display: flex;
          align-items: end;
          gap: 10px;
          flex-wrap: wrap;
          padding: 12px;
          border: 1.5px solid #E0E3EB;
          border-radius: 8px;
          background: #FFFFFF;
          box-shadow: 0 10px 26px rgba(10, 11, 45, 0.05);
        }

        .op-advanced-filters label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          color: #667085;
          font-size: 0.72rem;
          font-weight: 800;
        }

        .op-advanced-filters select {
          height: 36px;
          min-width: 160px;
          border: 1.5px solid #E0E3EB;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          outline: 0;
          padding: 0 10px;
        }

        .op-check-filter {
          min-height: 36px;
          flex-direction: row !important;
          align-items: center;
          color: #0A0B2D !important;
          font-size: 0.82rem !important;
          cursor: pointer;
        }

        .op-check-filter input {
          accent-color: #F1670F;
        }

        .op-advanced-filters button {
          height: 36px;
          border: 1.5px solid rgba(241, 103, 15, 0.42);
          border-radius: 8px;
          background: #FFF4EC;
          color: #F1670F;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          padding: 0 12px;
          cursor: pointer;
        }

        .op-list-wrap {
          min-height: 0;
          flex: 1;
          overflow: visible;
          padding-right: 4px;
        }

        .op-list-wrap::-webkit-scrollbar {
          width: 5px;
        }

        .op-list-wrap::-webkit-scrollbar-track {
          background: transparent;
        }

        .op-list-wrap::-webkit-scrollbar-thumb {
          background: #D6DAE4;
          border-radius: 999px;
        }

        .op-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 12px;
        }

        .op-card {
          position: relative;
          display: grid;
          grid-template-columns: minmax(178px, 0.72fr) minmax(300px, 1.22fr) minmax(178px, 0.62fr);
          gap: 0;
          align-items: stretch;
          min-height: 154px;
          padding: 18px 20px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          box-shadow: 0 10px 30px rgba(10, 11, 45, 0.05);
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }

        .op-card:hover {
          transform: translateY(-1px);
          border-color: rgba(241, 103, 15, 0.36);
          box-shadow: 0 16px 36px rgba(10, 11, 45, 0.08);
        }

        .op-card--pinned {
          border-color: #F1670F;
          background: linear-gradient(90deg, #FFF7F1 0%, #FFFFFF 34%, #FFFFFF 100%);
          box-shadow: 0 16px 38px rgba(241, 103, 15, 0.16);
        }

        .op-card--pinned::before {
          content: "";
          position: absolute;
          left: -1.5px;
          top: 16px;
          bottom: 16px;
          width: 5px;
          border-radius: 0 99px 99px 0;
          background: #F1670F;
        }

        .op-card--accepted {
          border-color: #16A34A;
          background: linear-gradient(90deg, #F3FBF6 0%, #FFFFFF 34%, #FFFFFF 100%);
          box-shadow: 0 16px 38px rgba(22, 163, 74, 0.14);
        }

        .op-card--accepted:hover {
          border-color: #16A34A;
          box-shadow: 0 18px 42px rgba(22, 163, 74, 0.18);
        }

        .op-card--accepted::before {
          background: #16A34A;
        }

        .op-card--accepted .op-category-icon {
          background: rgba(22, 163, 74, 0.1);
          color: #16A34A;
        }

        .op-card--accepted .op-profile-distance svg,
        .op-card--accepted .op-meta svg {
          color: #16A34A;
        }

        .op-client-panel {
          display: grid;
          grid-template-columns: 58px minmax(0, 1fr);
          gap: 12px;
          align-content: start;
          align-items: start;
          padding-right: 20px;
        }

        .op-avatar {
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 50%;
          background: #0A0B2D;
          color: #FFFFFF;
          font-family: 'Sora', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          overflow: hidden;
        }

        .op-avatar-image {
          object-fit: cover;
          object-position: center 34%;
        }

        .op-service-panel {
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
          padding: 0 22px;
          border-left: 1px solid #EEF0F5;
          border-right: 1px solid #EEF0F5;
        }

        .op-client-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
          min-width: 0;
        }

        .op-client-row strong {
          color: #0A0B2D;
          font-size: 0.92rem;
          font-weight: 700;
        }

        .op-rating {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #F1670F;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .op-city {
          color: #8A90A0;
          font-size: 0.78rem;
          font-weight: 500;
        }

        .op-profile-distance {
          grid-column: 2;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 0;
          color: #667085;
          font-size: 0.76rem;
          font-weight: 600;
        }

        .op-profile-distance svg {
          color: #F1670F;
          font-size: 0.8rem;
        }

        .op-profile-distance strong {
          color: #0A0B2D;
          font-weight: 800;
        }

        .op-service-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .op-category-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          border-radius: 8px;
          background: rgba(241, 103, 15, 0.1);
          color: #F1670F;
          font-size: 1rem;
        }

        .op-service-row span {
          display: block;
          margin-bottom: 2px;
          color: #8A90A0;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .op-service-row h2 {
          margin: 0;
          color: #0A0B2D;
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: 0;
        }

        .op-description {
          margin: 10px 0 12px;
          color: #666B7A;
          font-size: 0.84rem;
          line-height: 1.5;
        }

        .op-accepted-banner {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          width: 100%;
          max-width: 100%;
          min-height: 22px;
          margin: 0;
          padding: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          color: #15803D;
          font-size: 0.76rem;
          font-weight: 800;
        }

        .op-accepted-banner svg {
          flex: 0 0 auto;
          color: #16A34A;
          font-size: 0.88rem;
        }

        .op-meta {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          color: #767B89;
          font-size: 0.76rem;
          font-weight: 600;
        }

        .op-meta span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .op-meta svg {
          color: #F1670F;
          opacity: 0.82;
          font-size: 0.78rem;
        }

        .op-meta strong {
          color: #303449;
          font-weight: 700;
        }

        .op-card-side {
          min-width: 178px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 14px;
          padding-left: 22px;
        }

        .op-card-side--accepted {
          gap: 12px;
        }

        .op-card-side--accepted .op-accepted-banner {
          margin-top: 8px;
        }

        .op-status {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 26px;
          padding: 0 10px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 800;
          white-space: nowrap;
        }

        .op-price {
          text-align: left;
        }

        .op-price strong {
          display: block;
          color: #0A0B2D;
          font-family: 'Sora', sans-serif;
          font-size: 1.08rem;
          font-weight: 800;
        }

        .op-price span {
          color: #8A90A0;
          font-size: 0.72rem;
          font-weight: 600;
        }

        .op-card-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }

        .op-card-side--accepted .op-card-actions {
          margin-top: 8px;
        }

        .op-details {
          height: 34px;
          padding: 0 14px;
          border: 1.5px solid transparent;
          border-radius: 8px;
          background: #0A0B2D;
          color: #FFFFFF;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .op-details:hover {
          border-color: #F1670F;
          background: #F1670F;
          box-shadow: 0 8px 22px rgba(241, 103, 15, 0.26);
        }

        .op-access-request {
          height: 34px;
          padding: 0 12px;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem;
          font-weight: 800;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s;
        }

        .op-access-request {
          border: 1.5px solid #15803D;
          background: #15803D;
          color: #FFFFFF;
          box-shadow: 0 8px 20px rgba(21, 128, 61, 0.18);
        }

        .op-access-request:hover {
          border-color: #166534;
          background: #166534;
          color: #FFFFFF;
          box-shadow: 0 10px 24px rgba(21, 128, 61, 0.24);
        }

        .op-chat,
        .op-pin {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #E0E3EB;
          border-radius: 8px;
          background: #FFFFFF;
          color: #A3A8B6;
          cursor: pointer;
          transition: all 0.2s;
        }

        .op-chat:hover {
          border-color: rgba(37, 99, 235, 0.38);
          background: #EAF1FF;
          color: #2563EB;
          box-shadow: 0 8px 22px rgba(37, 99, 235, 0.12);
        }

        .op-pin:hover,
        .op-pin--active {
          border-color: rgba(241, 103, 15, 0.5);
          background: #FFF4EC;
          color: #F1670F;
          box-shadow: 0 8px 22px rgba(241, 103, 15, 0.12);
        }

        .op-pin--active {
          border-color: #F1670F;
          background: #F1670F;
          color: #FFFFFF;
        }

        .op-pin--active svg {
          transform: rotate(-28deg);
        }

        .op-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 6px 0 0;
        }

        .op-footer p {
          margin: 0;
          color: #767B89;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .op-pagination {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .op-page-btn {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #E0E3EB;
          border-radius: 8px;
          background: #FFFFFF;
          color: #666B7A;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s;
        }

        .op-page-btn:hover,
        .op-page-btn--active {
          border-color: #F1670F;
          background: #F1670F;
          color: #FFFFFF;
        }

        .op-empty {
          padding: 72px 20px;
          border: 1.5px dashed #D8DCE6;
          border-radius: 8px;
          background: #FFFFFF;
          color: #767B89;
          text-align: center;
          font-size: 0.92rem;
          font-weight: 600;
        }

        .op-modal-layer {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 18px;
          overflow-y: auto;
          background: rgba(10, 11, 45, 0.28);
          backdrop-filter: blur(2px);
        }

        .op-details-modal {
          width: min(100%, 760px);
          margin: auto 0;
          padding: 22px;
          border: 1.5px solid #E0E3EB;
          border-radius: 12px;
          background: #FFFFFF;
          box-shadow: 0 24px 80px rgba(10, 11, 45, 0.22);
        }

        .op-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .op-detail-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 30px;
          padding: 0 12px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 900;
        }

        .op-detail-status svg {
          font-size: 0.82rem;
        }

        .op-detail-status--green {
          background: #E8F8EE;
          color: #15803D;
        }

        .op-detail-status--purple {
          background: #F1E9FF;
          color: #7C3AED;
        }

        .op-detail-status--orange {
          background: #FFF1E7;
          color: #F97316;
        }

        .op-detail-status--blue {
          background: #EAF1FF;
          color: #2563EB;
        }

        .op-detail-status--gray {
          background: #F0F2F4;
          color: #6B7280;
        }

        .op-detail-status--red {
          background: #FDECEC;
          color: #DC2626;
        }

        .op-modal-header-actions {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .op-modal-header-actions button {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #0A0B2D;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .op-modal-header-actions button:hover {
          background: #F4F6FA;
          color: #F1670F;
        }

        .op-details-modal h2 {
          margin: 16px 0 18px;
          color: #0A0B2D;
          font-family: 'Sora', sans-serif;
          font-size: 1.42rem;
          line-height: 1.2;
        }

        .op-detail-summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .op-detail-metric {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 72px;
          padding: 12px;
          border: 1.5px solid #E0E3EB;
          border-radius: 8px;
          background: #FFFFFF;
        }

        .op-detail-metric > span {
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          border-radius: 8px;
          font-size: 1rem;
        }

        .op-detail-metric--brand {
          border-color: rgba(10, 11, 45, 0.12);
          background: #FFFFFF;
        }

        .op-detail-metric--brand > span {
          background: #F1F3F8;
          color: #0A0B2D;
        }

        .op-detail-metric--brand strong {
          color: #0A0B2D;
        }

        .op-detail-metric--brand small {
          color: #303449;
        }

        .op-detail-metric strong {
          display: block;
          color: #0A0B2D;
          font-family: 'Sora', sans-serif;
          font-size: 1.02rem;
          line-height: 1.2;
        }

        .op-detail-metric small {
          display: block;
          margin-top: 4px;
          color: #667085;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .op-time-strip {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin: 12px 0 16px;
        }

        .op-time-strip span {
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 12px;
          border: 1.5px solid rgba(10, 11, 45, 0.12);
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font-size: 0.78rem;
          font-weight: 900;
          text-align: center;
        }

        .op-time-strip span:last-child {
          justify-content: center;
          border-color: rgba(249, 115, 22, 0.2);
          background: #FFF9F4;
          color: #F97316;
        }

        .op-modal-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 12px;
        }

        .op-modal-card {
          padding: 14px;
          border: 1.5px solid #E0E3EB;
          border-radius: 8px;
          background: #FFFFFF;
          box-shadow: 0 8px 24px rgba(10, 11, 45, 0.04);
        }

        .op-modal-card h3 {
          margin: 0 0 14px;
          color: #0A0B2D;
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem;
        }

        .op-modal-client {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .op-modal-avatar {
          width: 62px;
          height: 62px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #0A0B2D;
          color: #FFFFFF;
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          overflow: hidden;
        }

        .op-modal-client strong {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #0A0B2D;
          font-family: 'Sora', sans-serif;
          font-size: 0.96rem;
        }

        .op-modal-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin: 5px 0;
          color: #F1670F;
          font-size: 0.78rem;
          font-weight: 800;
        }

        .op-modal-client small {
          color: #667085;
          font-size: 0.76rem;
          font-weight: 700;
        }

        .op-quick-actions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-top: 14px;
        }

        .op-quick-actions button {
          min-height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1.5px solid #E0E3EB;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
        }

        .op-quick-actions button:hover {
          border-color: rgba(241, 103, 15, 0.42);
          color: #F1670F;
          background: #FFF9F4;
        }

        .op-compat {
          display: grid;
          grid-template-columns: 104px minmax(0, 1fr);
          gap: 14px;
          align-items: center;
        }

        .op-compat-score {
          width: 94px;
          height: 94px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border: 9px solid #16A34A;
          border-radius: 50%;
          color: #0A0B2D;
        }

        .op-compat-score strong {
          font-family: 'Sora', sans-serif;
          font-size: 1.35rem;
          line-height: 1;
        }

        .op-compat-score span {
          margin-top: 4px;
          color: #667085;
          font-size: 0.66rem;
          font-weight: 800;
        }

        .op-compat ul,
        .op-status-message ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .op-compat li {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #303449;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .op-compat li + li {
          margin-top: 9px;
        }

        .op-compat li svg {
          color: #16A34A;
        }

        .op-service-details {
          margin-top: 12px;
        }

        .op-service-details > h3:not(.op-service-title) {
          display: none;
        }

        .op-service-details > h3:not(.op-service-title) + .op-service-detail-grid {
          display: none;
        }

        .op-service-title {
          margin-bottom: 14px !important;
          text-transform: uppercase;
        }

        .op-service-description-block {
          padding-bottom: 14px;
          border-bottom: 1px solid #EEF0F5;
        }

        .op-service-description-block strong,
        .op-service-detail-section h4,
        .op-service-extra-grid h4,
        .op-service-attachments h4 {
          display: block;
          margin: 0 0 8px;
          color: #0A0B2D;
          font-family: 'Sora', sans-serif;
          font-size: 0.84rem;
          font-weight: 800;
        }

        .op-service-description-block p,
        .op-service-extra-grid p {
          margin: 0;
          color: #0A0B2D;
          font-size: 0.84rem;
          font-weight: 600;
          line-height: 1.58;
        }

        .op-service-description-block p + p {
          margin-top: 6px;
          color: #667085;
        }

        .op-service-detail-section {
          padding: 14px 0;
          border-bottom: 1px solid #EEF0F5;
        }

        .op-service-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px 22px;
        }

        .op-service-extra-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          padding: 14px 0;
          border-bottom: 1px solid #EEF0F5;
        }

        .op-service-extra-grid ul {
          margin: 0;
          padding-left: 17px;
          color: #0A0B2D;
          font-size: 0.82rem;
          font-weight: 600;
          line-height: 1.7;
        }

        .op-service-attachments {
          padding-top: 14px;
        }

        .op-service-attachments > div {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }

        .op-service-attachments span {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 10px;
          border: 1.5px solid #E0E3EB;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font-size: 0.76rem;
          font-weight: 800;
          text-align: center;
        }

        .op-detail-row {
          display: grid;
          grid-template-columns: 20px 94px minmax(0, 1fr);
          gap: 8px;
          align-items: start;
        }

        .op-detail-row > span {
          color: #667085;
          font-size: 0.82rem;
        }

        .op-detail-row small {
          color: #667085;
          font-size: 0.74rem;
          font-weight: 800;
        }

        .op-detail-row strong {
          color: #0A0B2D;
          font-size: 0.78rem;
          font-weight: 700;
          line-height: 1.45;
        }

        .op-status-message {
          display: flex;
          gap: 12px;
          margin-top: 14px;
          padding: 12px;
          border: 1.5px solid #E0E3EB;
          border-radius: 8px;
          background: #FFFFFF;
        }

        .op-status-message > svg {
          flex: 0 0 auto;
          margin-top: 2px;
        }

        .op-status-message strong {
          display: block;
          color: #0A0B2D;
          font-size: 0.84rem;
          line-height: 1.45;
        }

        .op-status-message li {
          margin-top: 6px;
          color: #667085;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .op-status-message--green {
          border-color: rgba(22, 163, 74, 0.2);
          background: #F3FBF6;
        }

        .op-status-message--green > svg {
          color: #16A34A;
        }

        .op-status-message--purple {
          border-color: rgba(124, 58, 237, 0.18);
          background: #FAF7FF;
        }

        .op-status-message--purple > svg {
          color: #7C3AED;
        }

        .op-status-message--orange {
          border-color: rgba(249, 115, 22, 0.2);
          background: #FFF9F4;
        }

        .op-status-message--orange > svg {
          color: #F97316;
        }

        .op-status-message--blue {
          border-color: rgba(37, 99, 235, 0.2);
          background: #F7FAFF;
        }

        .op-status-message--blue > svg {
          color: #2563EB;
        }

        .op-status-message--gray {
          background: #F7F8FB;
        }

        .op-status-message--gray > svg {
          color: #6B7280;
        }

        .op-status-message--red {
          border-color: rgba(220, 38, 38, 0.2);
          background: #FFF7F7;
        }

        .op-status-message--red > svg {
          color: #DC2626;
        }

        .op-modal-footer {
          display: grid;
          gap: 10px;
          margin-top: 14px;
        }

        .op-action-notice {
          min-height: 40px;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
          padding: 10px 12px;
          border: 1.5px solid #C8D7F6;
          border-radius: 8px;
          background: #F7FAFF;
          color: #0A0B2D;
          font-size: 0.82rem;
          font-weight: 800;
        }

        .op-action-notice svg {
          color: #2563EB;
        }

        .op-modal-main,
        .op-modal-secondary-action {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 900;
          cursor: pointer;
        }

        .op-modal-main {
          border: 1.5px solid #16A34A;
          background: #16A34A;
          color: #FFFFFF;
          box-shadow: 0 12px 24px rgba(22, 163, 74, 0.16);
        }

        .op-modal-main--navy {
          border-color: #0A0B2D;
          background: #0A0B2D;
          color: #FFFFFF;
          box-shadow: 0 12px 24px rgba(10, 11, 45, 0.16);
        }

        .op-modal-main--purple {
          border-color: #7C3AED;
          background: #7C3AED;
        }

        .op-modal-main--orange {
          border-color: #F97316;
          background: #F97316;
        }

        .op-modal-main--blue {
          border-color: #2563EB;
          background: #2563EB;
        }

        .op-modal-main--gray {
          border-color: #6B7280;
          background: #6B7280;
        }

        .op-modal-main--red {
          border-color: #DC2626;
          background: #DC2626;
        }

        .op-modal-main--inactive {
          border-color: #C8D7F6;
          background: #EAF1FF;
          color: #2563EB;
          cursor: pointer;
          box-shadow: none;
        }

        .op-modal-secondary-action {
          border: 1.5px solid #E0E3EB;
          background: #FFFFFF;
          color: #DC2626;
        }

        @media (max-width: 900px) {
          .op-page {
            overflow: auto;
          }

          .op-shell {
            min-height: 100vh;
            height: auto;
            padding: 24px 18px;
          }

          .op-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .op-filter-spacer {
            display: none;
          }

          .op-card {
            grid-template-columns: minmax(0, 1fr);
            gap: 14px;
          }

          .op-client-panel {
            padding-right: 0;
          }

          .op-service-panel {
            padding: 14px 0;
            border-left: 0;
            border-right: 0;
            border-top: 1px solid #EEF0F5;
            border-bottom: 1px solid #EEF0F5;
          }

          .op-card-side {
            min-width: 0;
            width: 100%;
            display: grid;
            grid-template-columns: auto minmax(120px, 1fr) auto;
            align-items: center;
            padding-left: 0;
          }
        }

        @media (max-width: 620px) {
          .op-search-line {
            flex-direction: column;
          }

          .op-filter-action {
            width: 100%;
          }

          .op-card {
            grid-template-columns: 1fr;
          }

          .op-client-panel {
            grid-template-columns: 48px minmax(0, 1fr);
          }

          .op-avatar {
            width: 48px;
            height: 48px;
          }

          .op-card-side {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }

          .op-card-actions,
          .op-details {
            width: 100%;
          }

          .op-details {
            flex: 1;
          }

          .op-footer {
            align-items: flex-start;
            flex-direction: column;
          }

          .op-pagination {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <main className="op-page">
        <div className="op-shell">
          <header className="op-header">
            <div>
              <h1>Oportunidades</h1>
              <p>Encontre serviços compatíveis com o seu perfil e acompanhe o status de cada oportunidade.</p>
            </div>
          </header>

          <section className="op-toolbar" aria-label="Filtros de oportunidades">
            <div className="op-search-line">
              <label className="op-search">
                <FaSearch />
                <input
                  type="search"
                  placeholder="Pesquisar por serviço, cliente ou localização..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <button type="button" className={`op-filter-action ${filtersOpen ? "op-filter-action--active" : ""}`} onClick={() => setFiltersOpen((open) => !open)}>
                <FaSlidersH />
                Filtros
                {filterCount > 0 && <span>{filterCount}</span>}
              </button>
            </div>

            <div className="op-filter-line">
              {FILTERS.map((filter) => (
                <FilterButton key={filter.value} active={activeFilter === filter.value} onClick={() => setActiveFilter(filter.value)}>
                  {filter.value === "todas" ? `${filter.label} (${totalCount})` : filter.label}
                </FilterButton>
              ))}
              <div className="op-filter-spacer" />
              <label className="op-select">
                <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "todas" ? "Categoria" : category}
                    </option>
                  ))}
                </select>
                <FaChevronDown />
              </label>
              <label className="op-select">
                <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}>
                  {PRICE_RANGES.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
                <FaChevronDown />
              </label>
            </div>

            {filtersOpen && (
              <div className="op-advanced-filters">
                <label>
                  Status
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                    {STATUS_FILTERS.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="op-check-filter">
                  <input type="checkbox" checked={onlyPinned} onChange={(event) => setOnlyPinned(event.target.checked)} />
                  Apenas fixadas
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setCategoryFilter("todas");
                    setPriceFilter("todas");
                    setStatusFilter("todos");
                    setOnlyPinned(false);
                    setActiveFilter("todas");
                    setSearch("");
                  }}
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </section>

          <section className="op-list-wrap" aria-label="Lista de oportunidades">
            <div className="op-list">
              {sortedItems.length > 0 ? (
                sortedItems.map((item) => (
                  <OpportunityCard
                    key={item.id}
                    item={item}
                    onAccessRequest={handleAccessRequest}
                    onDetails={setSelectedOpportunity}
                    onPin={togglePin}
                  />
                ))
              ) : (
                <div className="op-empty">Nenhuma oportunidade encontrada.</div>
              )}
            </div>

            <footer className="op-footer">
              <p>{visibleCount > 0 ? `Mostrando 1 a ${visibleCount} de ${visibleCount} oportunidades` : "Nenhuma oportunidade encontrada"}</p>
              <nav className="op-pagination" aria-label="Paginação">
                <button type="button" className="op-page-btn op-page-btn--active">
                  1
                </button>
              </nav>
            </footer>
          </section>
        </div>

        {selectedOpportunity && (
          <OpportunityDetailsModal
            item={selectedOpportunity}
            onAccessRequest={handleAccessRequest}
            onClose={() => setSelectedOpportunity(null)}
            onAction={handleModalAction}
            onPin={togglePin}
          />
        )}

      </main>
    </>
  );
}
