"use client";

import { useMemo, useState } from "react";
import {
  FaBolt,
  FaBroom,
  FaCalendarAlt,
  FaCheckCircle,
  FaComments,
  FaChevronDown,
  FaHammer,
  FaLeaf,
  FaMapMarkerAlt,
  FaPaintRoller,
  FaSearch,
  FaSlidersH,
  FaSnowflake,
  FaStar,
  FaThumbtack,
  FaTint,
  FaTools,
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
  },
];

function money(value) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
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

function OpportunityCard({ item, onPin }) {
  const isAccepted = item.status === "aceita";
  const isPinned = item.pinned || isAccepted;
  const avatarStyle = item.avatar ? { backgroundImage: `url(${item.avatar})` } : undefined;

  return (
    <article className={`op-card ${isPinned ? "op-card--pinned" : ""} ${isAccepted ? "op-card--accepted" : ""}`}>
      <div className="op-client-panel">
        <div className={`op-avatar ${item.avatar ? "op-avatar--photo" : ""}`} style={avatarStyle} aria-hidden="true">
          {!item.avatar && item.client.charAt(0)}
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
            <span>Sua proposta foi aceita pelo cliente.</span>
          </div>
        )}
        <div className="op-card-actions">
          {isAccepted ? (
            <button type="button" className="op-access-request">
              Acessar solicitação
            </button>
          ) : (
            <>
              <button type="button" className="op-details">
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

export default function Oportunidades() {
  const [items, setItems] = useState(OPPORTUNITIES);
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
  const totalCount = items.length;
  const filterCount =
    Number(categoryFilter !== "todas") +
    Number(priceFilter !== "todas") +
    Number(statusFilter !== "todos") +
    Number(onlyPinned);

  function togglePin(id) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, pinned: !item.pinned } : item)));
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
          border-radius: 50%;
          background: #0A0B2D;
          color: #FFFFFF;
          font-family: 'Sora', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .op-avatar--photo {
          background-position: center;
          background-size: cover;
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
                  <OpportunityCard key={item.id} item={item} onPin={togglePin} />
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

      </main>
    </>
  );
}
