"use client";

import { useEffect, useMemo, useState } from "react";
import DetalhesModal from "../Detalhes_solicitacao_prestador/Detalhes_solicitacao_prestador";
import {
  FaBell,
  FaBolt,
  FaBroom,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaEllipsisV,
  FaFilter,
  FaHammer,
  FaMapMarkerAlt,
  FaPaintRoller,
  FaPlayCircle,
  FaRegStar,
  FaSearch,
  FaSlidersH,
  FaSnowflake,
  FaStar,
  FaSyncAlt,
  FaTimes,
  FaTimesCircle,
  FaTools,
  FaUserAlt,
  FaWrench,
} from "react-icons/fa";

const STATUS = {
  nova: {
    label: "Nova",
    plural: "Novas",
    color: "#7C3AED",
    bg: "#EFE6FF",
    icon: <FaSlidersH />,
  },
  aceita: {
    label: "Aceita",
    plural: "Aceitas",
    color: "#16A34A",
    bg: "#DFF7E8",
    icon: <FaTools />,
  },
  andamento: {
    label: "Em Andamento",
    plural: "Em Andamento",
    color: "#1477FF",
    bg: "#E4F1FF",
    icon: <FaRegStar />,
  },
  concluida: {
    label: "Concluída",
    plural: "Concluídas",
    color: "#16A34A",
    bg: "#DFF7E8",
    icon: <FaCheckCircle />,
  },
  cancelada: {
    label: "Cancelada",
    plural: "Canceladas",
    color: "#FF2D2D",
    bg: "#FFE3E3",
    icon: <FaTimesCircle />,
  },
  recusada: {
    label: "Recusada",
    plural: "Recusadas",
    color: "#667085",
    bg: "#ECEFF3",
    icon: <FaTimes />,
  },
};

const CATEGORY_ICONS = {
  Limpeza: <FaBroom />,
  Manutenção: <FaTools />,
  Reformas: <FaPaintRoller />,
  Concluído: <FaCheckCircle />,
  "Ar-condicionado": <FaSnowflake />,
  Montagem: <FaHammer />,
  Elétrica: <FaBolt />,
  Hidráulica: <FaWrench />,
};

const CATEGORY_COLORS = {
  Limpeza: ["#f1670f", "#FFE8DE"],
  Manutenção: ["#f1670f", "#FFE8DE"],
  Reformas: ["#f1670f", "#FFE8DE"],
  Concluído: ["#f1670f", "#FFE8DE"],
  "Ar-condicionado": ["#f1670f", "#FFE8DE"],
  Montagem: ["#f1670f", "#FFE8DE"],
  Elétrica: ["#f1670f", "#FFE8DE"],
  Hidráulica: ["#f1670f", "#FFE8DE"],
};
const ITEMS_PER_PAGE = 6;
const TRANSFERRED_OPPORTUNITIES_KEY = "fazuno_oportunidades_transferidas";

function readTransferredOpportunities() {
  if (typeof window === "undefined") return [];

  try {
    const data = window.localStorage.getItem(TRANSFERRED_OPPORTUNITIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function clearTransferredOpportunities() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TRANSFERRED_OPPORTUNITIES_KEY);
}

const REQUESTS = [
  {
    id: 1,
    client: "Mariana Costa",
    avatar: "https://i.pravatar.cc/120?img=47",
    rating: 4.8,
    reviews: 12,
    neighborhood: "Vila Mariana, São Paulo - SP",
    distance: 2.1,
    category: "Limpeza",
    title: "Limpeza completa de apartamento",
    description:
      "Preciso de uma limpeza completa no meu apartamento de 2 quartos.",
    date: "20/05/2024",
    time: "14:30",
    value: 180,
    valueLabel: "Valor estimado",
    status: "nova",
    observacoes: "Apartamento de 2 quartos, 70m².",
  },
  {
    id: 2,
    client: "Carlos Mendes",
    avatar: "https://i.pravatar.cc/120?img=12",
    rating: 4.6,
    reviews: 7,
    neighborhood: "Santo André, São Paulo - SP",
    distance: 3.4,
    category: "Manutenção",
    title: "Instalação de chuveiro elétrico",
    description: "Preciso instalar um chuveiro elétrico novo no banheiro.",
    date: "19/05/2024",
    time: "09:15",
    value: 150,
    valueLabel: "Valor estimado",
    status: "aceita",
    observacoes: "Ponto elétrico já existente.",
  },
  {
    id: 3,
    client: "Juliana Oliveira",
    avatar: "https://i.pravatar.cc/120?img=32",
    rating: 5.0,
    reviews: 18,
    neighborhood: "Moema, São Paulo - SP",
    distance: 4.2,
    category: "Reformas",
    title: "Pintura interna de sala",
    description:
      "Quero pintar a sala de estar e o corredor. Paredes na cor clara.",
    date: "18/05/2024",
    time: "16:45",
    value: 350,
    valueLabel: "Valor estimado",
    status: "andamento",
    observacoes: "Tinta fornecida pelo cliente.",
  },
  {
    id: 4,
    client: "Roberto Almeida",
    avatar: "https://i.pravatar.cc/120?img=11",
    rating: 4.3,
    reviews: 9,
    neighborhood: "Tatuapé, São Paulo - SP",
    distance: 5.8,
    category: "Elétrica",
    title: "Troca de tomadas e interruptores",
    description: "Preciso trocar 3 tomadas e 2 interruptores na cozinha.",
    date: "18/05/2024",
    time: "10:20",
    value: 200,
    valueLabel: "Valor final",
    status: "concluida",
    observacoes: "",
  },
  {
    id: 5,
    client: "Rafael Ferreira",
    avatar: "https://i.pravatar.cc/120?img=68",
    rating: 4.2,
    reviews: 5,
    neighborhood: "Itaim Bibi, São Paulo - SP",
    distance: 4.5,
    category: "Ar-condicionado",
    title: "Instalação de ar condicionado",
    description: "Instalar ar condicionado split 9.000 BTUs na sala.",
    date: "17/05/2024",
    time: "09:20",
    value: 250,
    valueLabel: "Valor estimado",
    status: "cancelada",
    observacoes: "",
  },
  {
    id: 6,
    client: "André Silva",
    avatar: "https://i.pravatar.cc/120?img=59",
    rating: 4.1,
    reviews: 6,
    neighborhood: "Perdizes, São Paulo - SP",
    distance: 6.3,
    category: "Montagem",
    title: "Montagem de móveis",
    description: "Montagem de guarda-roupa de 6 portas e cama de casal.",
    date: "16/05/2024",
    time: "13:40",
    value: 120,
    valueLabel: "Valor estimado",
    status: "recusada",
    observacoes: "",
  },
  {
    id: 7,
    client: "Bianca Rocha",
    avatar: "https://i.pravatar.cc/120?img=44",
    rating: 4.9,
    reviews: 15,
    neighborhood: "Pinheiros, São Paulo - SP",
    distance: 2.8,
    category: "Elétrica",
    title: "Revisão de disjuntores",
    description: "Preciso revisar o quadro de energia do apartamento.",
    date: "15/05/2024",
    time: "11:00",
    value: 210,
    valueLabel: "Valor estimado",
    status: "nova",
    observacoes: "Quadro de 20 disjuntores.",
  },
  {
    id: 8,
    client: "Patrícia Lima",
    avatar: "https://i.pravatar.cc/120?img=49",
    rating: 4.7,
    reviews: 10,
    neighborhood: "Aclimação, São Paulo - SP",
    distance: 1.9,
    category: "Hidráulica",
    title: "Vazamento na pia da cozinha",
    description: "A pia apresenta vazamento constante na parte inferior.",
    date: "15/05/2024",
    time: "08:30",
    value: 170,
    valueLabel: "Valor estimado",
    status: "nova",
    observacoes: "Acesso abaixo da pia disponível.",
  },
  {
    id: 9,
    client: "Eduardo Ramos",
    avatar: "https://i.pravatar.cc/120?img=52",
    rating: 4.5,
    reviews: 8,
    neighborhood: "Bela Vista, São Paulo - SP",
    distance: 3.0,
    category: "Limpeza",
    title: "Limpeza de escritório",
    description: "Limpeza geral de escritório pequeno após mudança.",
    date: "14/05/2024",
    time: "15:10",
    value: 190,
    valueLabel: "Valor estimado",
    status: "aceita",
    observacoes: "Escritório de 40m².",
  },
];

function money(value) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

function parseDate(value) {
  const [day, month, year] = value.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function getActionLabel(status) {
  if (status === "nova") return "Aceitar serviço";
  if (status === "aceita") return "Iniciar serviço";
  if (status === "andamento") return "Atualizar status";
  if (status === "concluida") return "Avaliar cliente";
  return "";
}

function getNextStatus(status) {
  if (status === "nova") return "aceita";
  if (status === "aceita") return "andamento";
  if (status === "andamento") return "concluida";
  return status;
}

function getActionIcon(status) {
  if (status === "nova") return <FaCheckCircle />;
  if (status === "aceita") return <FaPlayCircle />;
  if (status === "andamento") return <FaSyncAlt />;
  if (status === "concluida") return <FaRegStar />;
  return null;
}

function StatusBadge({ status }) {
  const item = STATUS[status];
  return (
    <span
      className="sr-status"
      style={{ "--status-color": item.color, "--status-bg": item.bg }}
    >
      {item.label}
    </span>
  );
}

function CategoryIcon({ category }) {
  const [color, bg] = CATEGORY_COLORS[category] || ["#0A0B2D", "#EEF0F5"];
  return (
    <div
      className="sr-category-icon"
      style={{ "--category-color": color, "--category-bg": bg }}
    >
      {CATEGORY_ICONS[category] || <FaWrench />}
    </div>
  );
}

function StatusFilter({ value, label, count, active, onClick, icon, color }) {
  return (
    <button
      type="button"
      className={`sr-filter-pill ${active ? "sr-filter-pill--active" : ""}`}
      onClick={onClick}
    >
      {value === "todos" ? null : (
        <span className="sr-filter-dot" style={{ "--dot-color": color }}>
          {icon}
        </span>
      )}
      {label} ({count})
    </button>
  );
}

function RequestCard({ item, index, onAction, onVerDetalhes }) {
  const actionLabel = getActionLabel(item.status);

  return (
    <article
      className={`sr-card ${item.origem === "oportunidades" ? "sr-card--from-opportunity" : ""}`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <section className="sr-client">
        <img src={item.avatar} alt="" className="sr-avatar" />
        <div>
          <h2>{item.client}</h2>
          <span className="sr-rating">
            <FaStar />
            {item.rating.toFixed(1)} ({item.reviews} avaliações)
          </span>
          <span className="sr-muted-line">
            <FaMapMarkerAlt />
            {item.neighborhood}
          </span>
          <span className="sr-muted-line">
            {item.distance.toFixed(1)} km de distância
          </span>
        </div>
      </section>

      <section className="sr-service">
        <CategoryIcon category={item.category} />
        <div className="sr-service-body">
          <span>{item.category}</span>
          {item.origem === "oportunidades" && (
            <strong className="sr-origin-badge">
              <FaCheckCircle />
              {item.originLabel || "Veio de oportunidades"}
            </strong>
          )}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="sr-date-row">
            <span>
              <FaCalendarAlt />
              {item.date}
            </span>
            <span>
              <FaClock />
              às {item.time}
            </span>
          </div>
        </div>
      </section>

      <section className="sr-card-actions">
        <div className="sr-value-row">
          <div>
            <span>{item.valueLabel}</span>
            <strong>R$ {money(item.value)}</strong>
          </div>
          <StatusBadge status={item.status} />
        </div>
        <div className="sr-action-row">
          <button
            type="button"
            className="sr-btn sr-btn--primary"
            onClick={() => onVerDetalhes(item)}
          >
            Ver detalhes
          </button>
          {actionLabel && (
            <button
              type="button"
              className="sr-btn sr-btn--secondary"
              onClick={() => onAction(item.id)}
            >
              {getActionIcon(item.status)}
              {actionLabel}
            </button>
          )}
          <button type="button" className="sr-more" aria-label="Mais opções">
            <FaEllipsisV />
          </button>
        </div>
      </section>
    </article>
  );
}

function SummaryCard({ items }) {
  const rows = Object.entries(STATUS).map(([key, status]) => ({
    key,
    ...status,
    count: items.filter((item) => item.status === key).length,
  }));

  return (
    <aside className="sr-side-card">
      <h2>Resumo das solicitações</h2>
      <div className="sr-summary-list">
        {rows.map((row) => (
          <div key={row.key} className="sr-summary-row">
            <span style={{ "--summary-color": row.color }}>{row.icon}</span>
            <p>{row.plural}</p>
            <strong>{row.count}</strong>
          </div>
        ))}
      </div>
      <div className="sr-total-row">
        <span>Total</span>
        <strong>{items.length}</strong>
      </div>
    </aside>
  );
}

function TipsCard() {
  const tips = [
    "Mantenha seu perfil sempre atualizado para receber mais oportunidades.",
    "Responda rápido para aumentar suas chances de ser escolhido.",
    "Avaliações positivas geram mais confiança.",
    "Atualize o status dos serviços para manter seus clientes informados.",
  ];

  return (
    <aside className="sr-side-card sr-tips">
      <h2>Dicas para você</h2>
      {tips.map((tip) => (
        <p key={tip}>
          <FaCheckCircle />
          {tip}
        </p>
      ))}
      <button type="button" className="sr-profile-btn">
        <FaUserAlt />
        Ver meu perfil
      </button>
    </aside>
  );
}

export default function Oportunidades() {
  const [items, setItems] = useState(REQUESTS);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);

  useEffect(() => {
    const transferred = readTransferredOpportunities();
    if (!transferred.length) return;
    clearTransferredOpportunities();

    const params = new URLSearchParams(window.location.search);
    const targetId = params.get("id");
    const selected = transferred.find((item) => String(item.id) === targetId);

    if (selected) {
      setSolicitacaoSelecionada(selected);
    }

    setItems((current) => {
      const transferredIds = new Set(transferred.map((item) => item.id));
      return [
        ...transferred,
        ...current.filter((item) => !transferredIds.has(item.id)),
      ];
    });
  }, []);

  const counts = useMemo(() => {
    return Object.fromEntries(
      Object.keys(STATUS).map((key) => [
        key,
        items.filter((item) => item.status === key).length,
      ]),
    );
  }, [items]);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();

    return items
      .filter((item) => {
        const matchesSearch =
          !term ||
          [
            item.client,
            item.neighborhood,
            item.category,
            item.title,
            item.description,
          ]
            .join(" ")
            .toLowerCase()
            .includes(term);
        const matchesStatus =
          statusFilter === "todos" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const originOrder =
          Number(b.origem === "oportunidades") -
          Number(a.origem === "oportunidades");
        if (originOrder !== 0) return originOrder;

        return parseDate(b.date) - parseDate(a.date);
      });
  }, [items, search, statusFilter]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, pageCount);
  const start = (safePage - 1) * ITEMS_PER_PAGE;
  const visibleItems = filteredItems.slice(start, start + ITEMS_PER_PAGE);

  function updateSearch(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function updateStatus(value) {
    setStatusFilter(value);
    setCurrentPage(1);
  }

  function handleAction(id) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        const nextStatus = getNextStatus(item.status);
        return {
          ...item,
          status: nextStatus,
          valueLabel:
            nextStatus === "concluida" ? "Valor final" : item.valueLabel,
        };
      }),
    );
  }

  function handleVerDetalhes(item) {
    setSolicitacaoSelecionada(item);
  }

  function handleFecharDetalhes() {
    setSolicitacaoSelecionada(null);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

        .sr-page, .sr-page * { box-sizing: border-box; }
        .sr-page {
          min-height: 100vh;
          width: 100%;
          background: #FFFFFF;
          color: #06104A;
          font-family: 'DM Sans', sans-serif;
        }

        .sr-shell {
          width: min(100%, 1440px);
          margin: 0 auto;
          padding: 18px 20px 24px;
        }

        .sr-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .sr-title h1 {
          margin: 0 0 8px;
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.7rem, 2.6vw, 2.35rem);
          line-height: 1.05;
          letter-spacing: 0;
          font-weight: 700;
        }

        .sr-title p {
          margin: 0;
          color: #06104A;
          font-size: 0.94rem;
          font-weight: 500;
        }

        .sr-user-area {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .sr-bell {
          position: relative;
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 0;
          background: transparent;
          color: #06104A;
          font-size: 1.35rem;
          cursor: pointer;
        }

        .sr-bell span {
          position: absolute;
          top: -2px;
          right: -3px;
          min-width: 20px;
          height: 20px;
          padding: 0 5px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #FF1F1F;
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 800;
        }

        .sr-profile {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border: 0;
          background: transparent;
          color: #06104A;
          cursor: pointer;
        }

        .sr-profile img {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 0 3px #F2F4F8;
        }

        .sr-top-controls {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 180px;
          gap: 18px;
          margin-bottom: 20px;
        }

        .sr-search {
          position: relative;
          min-width: 0;
        }

        .sr-search svg {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #06104A;
          font-size: 1rem;
        }

        .sr-search input {
          width: 100%;
          height: 52px;
          padding: 0 18px 0 52px;
          border: 1.5px solid #DDE3EE;
          border-radius: 8px;
          background: #FFFFFF;
          color: #06104A;
          font: inherit;
          font-size: 0.9rem;
          outline: none;
          box-shadow: 0 8px 22px rgba(6, 16, 74, 0.03);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .sr-search input::placeholder { color: #6975A8; }
        .sr-search input:focus {
          border-color: #06104A;
          box-shadow: 0 0 0 3px rgba(6, 16, 74, 0.08);
        }

        .sr-filter-main {
          height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border: 1.5px solid #DDE3EE;
          border-radius: 8px;
          background: #FFFFFF;
          color: #06104A;
          font: inherit;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .sr-filter-main:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 24px rgba(6, 16, 74, 0.08);
        }

        .sr-filter-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .sr-filter-pill {
          height: 39px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1.5px solid #DDE3EE;
          border-radius: 999px;
          background: #FFFFFF;
          color: #06104A;
          font: inherit;
          font-size: 0.86rem;
          font-weight: 800;
          white-space: nowrap;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
        }

        .sr-filter-pill:hover {
          transform: translateY(-1px);
          border-color: #f1670f;
        }

        .sr-filter-pill--active {
          border-color: #f1670f;
          background: #f1670f;
          color: #FFFFFF;
          box-shadow: 0 10px 20px rgba(241, 103, 15, 0.25);
          }

        .sr-filter-dot {
          width: 10px;
          height: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--dot-color);
          font-size: 0.72rem;
        }

        .sr-content {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 22px;
          align-items: start;
        }

        .sr-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sr-card {
          min-height: 142px;
          display: grid;
          grid-template-columns: minmax(235px, 0.95fr) minmax(330px, 1.15fr) minmax(320px, 0.9fr);
          gap: 20px;
          padding: 20px 22px;
          border: 1.5px solid #E2E7F0;
          border-radius: 8px;
          background: #FFFFFF;
          box-shadow: 0 8px 24px rgba(6, 16, 74, 0.03);
          animation: sr-card-in 0.42s ease both;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }

        .sr-card:hover {
          transform: translateY(-2px);
          border-color: #C9D2E4;
          box-shadow: 0 14px 32px rgba(6, 16, 74, 0.08);
        }

        .sr-card--from-opportunity {
          border-color: rgba(22, 163, 74, 0.38);
          box-shadow: 0 10px 26px rgba(22, 163, 74, 0.08);
        }

        .sr-client {
          display: grid;
          grid-template-columns: 72px minmax(0, 1fr);
          gap: 16px;
          align-items: start;
        }

        .sr-avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          background: #F2F4F8;
        }

        .sr-client h2 {
          margin: 0 0 8px;
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0;
        }

        .sr-rating, .sr-muted-line {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #06104A;
          font-size: 0.82rem;
          font-weight: 600;
          line-height: 1.35;
        }

        .sr-rating { margin-bottom: 18px; }
        .sr-rating svg { color: #F59E0B; }
        .sr-muted-line + .sr-muted-line { margin-top: 9px; }
        .sr-muted-line svg { color: #06104A; font-size: 0.85rem; }

        .sr-service {
          min-width: 0;
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr);
          gap: 14px;
          padding-left: 2px;
        }

        .sr-category-icon {
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: var(--category-bg);
          color: #f1670f !important;
          font-size: 1.05rem;
          }

        .sr-category-icon svg {
          transition: transform 0.22s ease;
        }

        .sr-card:hover .sr-category-icon svg {
          transform: scale(1.1) rotate(-6deg);
        }

        .sr-service-body > span {
          display: block;
          margin-bottom: 4px;
          color: #06104A;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .sr-origin-badge {
          width: fit-content;
          min-height: 26px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin: 0 0 7px;
          padding: 0 10px;
          border: 1.5px solid rgba(22, 163, 74, 0.18);
          border-radius: 999px;
          background: #F0FDF4;
          color: #15803D;
          font-size: 0.72rem;
          font-weight: 900;
        }

        .sr-service-body h3 {
          margin: 0 0 6px;
          font-family: 'Sora', sans-serif;
          color: #06104A;
          font-size: 0.98rem;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: 0;
        }

        .sr-service-body p {
          max-width: 380px;
          margin: 0 0 16px;
          color: #06104A;
          font-size: 0.82rem;
          font-weight: 500;
          line-height: 1.45;
        }

        .sr-date-row {
          display: flex;
          align-items: center;
          gap: 22px;
          flex-wrap: wrap;
        }

        .sr-date-row span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #06104A;
          font-size: 0.86rem;
          font-weight: 700;
        }

        .sr-card-actions {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 18px;
          padding-left: 20px;
          border-left: 1px solid #E7EBF3;
        }

        .sr-value-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          }

        .sr-value-row span {
          display: block;
          margin-bottom: 6px;
          color: #06104A;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .sr-value-row strong {
          display: block;
          color: #06104A;
          font-family: 'Sora', sans-serif;
          font-size: 1.13rem;
          font-weight: 700;
        }

        .sr-status {
          min-width: 82px;
          min-height: 33px;
          padding: 0 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: var(--status-bg);
          color: var(--status-color);
          font-size: 0.86rem;
          font-weight: 800;
          white-space: nowrap;
        }

        .sr-action-row {
          display: grid;
          grid-template-columns: 138px minmax(156px, 1fr) 26px;
          gap: 12px;
          align-items: center;
        }

        .sr-btn {
          height: 40px;
          padding: 0 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 6px;
          font: inherit;
          font-size: 0.9rem;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.16s, box-shadow 0.2s, background 0.2s, color 0.2s;
        }

        .sr-btn:active { transform: scale(0.97); }
        .sr-btn--primary {
          border: 1.5px solid #06104A;
          background: #06104A;
          color: #FFFFFF;
          box-shadow: 0 8px 16px rgba(6, 16, 74, 0.12);
        }

        .sr-btn--secondary {
          border: 1.5px solid #06104A;
          background: #FFFFFF;
          color: #06104A;
        }

        .sr-btn--primary:hover, .sr-btn--secondary:hover {
          box-shadow: 0 12px 22px rgba(6, 16, 74, 0.14);
          transform: translateY(-1px);
        }

        .sr-more {
          width: 26px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 0;
          background: transparent;
          color: #06104A;
          cursor: pointer;
        }

        .sr-side {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .sr-side-card {
          padding: 22px 24px;
          border: 1.5px solid #E2E7F0;
          border-radius: 8px;
          background: #FFFFFF;
          box-shadow: 0 8px 24px rgba(6, 16, 74, 0.03);
          animation: sr-card-in 0.42s ease both;
        }

        .sr-side-card h2 {
          margin: 0 0 22px;
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0;
        }

        .sr-summary-list {
          display: flex;
          flex-direction: column;
        }

        .sr-summary-row {
          min-height: 45px;
          display: grid;
          grid-template-columns: 28px 1fr auto;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid #E7EBF3;
          color: #06104A;
        }

        .sr-summary-row span {
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--summary-color);
          font-size: 0.95rem;
        }

        .sr-summary-row p {
          margin: 0;
          font-size: 0.88rem;
          font-weight: 600;
        }

        .sr-summary-row strong, .sr-total-row strong {
          font-size: 0.95rem;
          font-weight: 800;
        }

        .sr-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 22px;
          color: #06104A;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
        }

        .sr-tips h2 { margin-bottom: 24px; }
        .sr-tips p {
          display: grid;
          grid-template-columns: 20px minmax(0, 1fr);
          gap: 12px;
          margin: 0 0 22px;
          color: #06104A;
          font-size: 0.86rem;
          font-weight: 600;
          line-height: 1.5;
        }

        .sr-tips p svg {
          margin-top: 2px;
          color: #16A34A;
        }

        .sr-profile-btn {
          width: 100%;
          height: 54px;
          margin-top: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border: 1.5px solid #DDE3EE;
          border-radius: 8px;
          background: #FFFFFF;
          color: #06104A;
          font: inherit;
          font-weight: 800;
          cursor: pointer;
        }

        .sr-empty {
          min-height: 230px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          border: 1.5px dashed #CBD5E1;
          border-radius: 8px;
          color: #06104A;
          font-weight: 700;
          text-align: center;
        }

        .sr-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 8px;
          color: #06104A;
          font-size: 0.86rem;
          font-weight: 600;
        }

        .sr-pagination {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sr-page-btn {
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #DDE3EE;
          border-radius: 6px;
          background: #FFFFFF;
          color: #06104A;
          font: inherit;
          font-weight: 800;
          cursor: pointer;
        }

        .sr-page-btn--active {
          background: #06104A;
          border-color: #06104A;
          color: #FFFFFF;
        }

        @keyframes sr-card-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1180px) {
          .sr-content { grid-template-columns: 1fr; }
          .sr-side { grid-template-columns: repeat(2, minmax(0, 1fr)); display: grid; }
          .sr-card { grid-template-columns: minmax(210px, 0.9fr) minmax(280px, 1.1fr) minmax(290px, 0.9fr); }
        }

        @media (max-width: 860px) {
          .sr-header, .sr-footer { align-items: flex-start; flex-direction: column; }
          .sr-top-controls { grid-template-columns: 1fr; }
          .sr-card { grid-template-columns: 1fr; }
          .sr-card-actions { padding-left: 0; border-left: 0; border-top: 1px solid #E7EBF3; padding-top: 16px; }
          .sr-side { grid-template-columns: 1fr; }
        }

        @media (max-width: 560px) {
          .sr-shell { padding: 16px 14px 22px; }
          .sr-user-area { width: 100%; justify-content: space-between; }
          .sr-filter-row { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 6px; }
          .sr-client { grid-template-columns: 58px minmax(0, 1fr); }
          .sr-avatar { width: 56px; height: 56px; }
          .sr-action-row { grid-template-columns: 1fr; }
          .sr-more { width: 100%; border: 1.5px solid #DDE3EE; border-radius: 6px; }
          .sr-value-row { flex-direction: column; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sr-card, .sr-side-card { animation: none; }
          .sr-card, .sr-btn, .sr-filter-pill, .sr-filter-main, .sr-category-icon svg { transition: none; }
        }
      `}</style>

      <main
        className="solicitacoes-page"
        style={{ position: "fixed", inset: 0, overflowY: "auto" }}
      >
        <div className="sr-shell">
          <header className="sr-header">
            <div className="sr-title">
              <h1>Solicitações Recebidas</h1>
              <p>
                Acompanhe e gerencie as solicitações de serviços feitas pelos
                clientes.
              </p>
            </div>
            <div className="sr-user-area"></div>
          </header>

          <section className="sr-top-controls" aria-label="Busca e filtros">
            <label className="sr-search">
              <FaSearch />
              <input
                type="search"
                placeholder="Pesquisar por cliente, serviço ou localização..."
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
              />
            </label>
            <button
              type="button"
              className="sr-filter-main"
              onClick={() => setFiltersOpen((open) => !open)}
            >
              <FaFilter />
              Filtros
            </button>
          </section>

          <section
            className="sr-filter-row"
            aria-label="Status das solicitações"
          >
            <StatusFilter
              value="todos"
              label="Todas"
              count={items.length}
              active={statusFilter === "todos"}
              onClick={() => updateStatus("todos")}
            />
            {Object.entries(STATUS).map(([key, item]) => (
              <StatusFilter
                key={key}
                value={key}
                label={item.plural}
                count={counts[key]}
                active={statusFilter === key}
                onClick={() => updateStatus(key)}
                icon={item.icon}
                color={item.color}
              />
            ))}
          </section>

          {filtersOpen && (
            <section className="sr-filter-row" aria-label="Filtros adicionais">
              <StatusFilter
                value="todos"
                label="Mais recentes"
                count={filteredItems.length}
                active
                onClick={() => updateStatus(statusFilter)}
              />
              <StatusFilter
                value="todos"
                label="Maior valor"
                count={filteredItems.length}
                active={false}
                onClick={() => updateStatus(statusFilter)}
              />
            </section>
          )}

          <section className="sr-content">
            <div>
              <div className="sr-list">
                {visibleItems.length > 0 ? (
                  visibleItems.map((item, index) => (
                    <RequestCard
                      key={item.id}
                      item={item}
                      index={index}
                      onAction={handleAction}
                      onVerDetalhes={handleVerDetalhes}
                    />
                  ))
                ) : (
                  <div className="sr-empty">
                    Nenhuma solicitação cadastrada no momento. Assim que um
                    cliente solicitar um serviço, ela aparecerá aqui.
                  </div>
                )}
              </div>

              <footer className="sr-footer">
                <span>
                  {filteredItems.length > 0
                    ? `Mostrando ${start + 1} a ${Math.min(start + ITEMS_PER_PAGE, filteredItems.length)} de ${filteredItems.length} solicitações`
                    : "Nenhuma solicitação encontrada"}
                </span>
                <nav className="sr-pagination" aria-label="Paginação">
                  <button
                    type="button"
                    className="sr-page-btn"
                    onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                  >
                    <FaChevronLeft />
                  </button>
                  {Array.from({ length: pageCount }, (_, index) => (
                    <button
                      key={index + 1}
                      type="button"
                      className={`sr-page-btn ${safePage === index + 1 ? "sr-page-btn--active" : ""}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="sr-page-btn"
                    onClick={() =>
                      setCurrentPage(Math.min(pageCount, safePage + 1))
                    }
                  >
                    <FaChevronRight />
                  </button>
                </nav>
              </footer>
            </div>

            <div className="sr-side">
              <SummaryCard items={items} />
              <TipsCard />
            </div>
          </section>
        </div>
      </main>

      {solicitacaoSelecionada && (
        <DetalhesModal
          solicitacao={solicitacaoSelecionada}
          onClose={handleFecharDetalhes}
        />
      )}
    </>
  );
}
