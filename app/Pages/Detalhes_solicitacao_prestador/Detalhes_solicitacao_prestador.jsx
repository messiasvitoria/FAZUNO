"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReagendamentoSolicitadoPrestador from "./reagendamento_solicitado_prestador";

const STATUS_CONFIG = {
  nova: { color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE", label: "NOVA" },
  aceita: {
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    label: "ACEITA",
  },
  andamento: {
    color: "#0284C7",
    bg: "#F0F9FF",
    border: "#BAE6FD",
    label: "EM ANDAMENTO",
  },
  concluida: {
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    label: "CONCLUÍDA",
  },
  cancelada: {
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    label: "CANCELADA",
  },
  recusada: {
    color: "#667085",
    bg: "#ECEFF3",
    border: "#D1D5DB",
    label: "RECUSADA",
  },
  "Em Andamento": {
    color: "#0284C7",
    bg: "#F0F9FF",
    border: "#BAE6FD",
    label: "EM ANDAMENTO",
  },
  Aceita: {
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    label: "ACEITA",
  },
  Concluída: {
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    label: "CONCLUÍDA",
  },
  Cancelada: {
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    label: "CANCELADA",
  },
};

const MOCK = {
  id: "#SOL-2024-5123",
  status: "andamento",
  ultimaAtualizacao: "Hoje às 14:08",
  categoria: "Hidráulica",
  servico: "Instalação de Torneira",
  descricao: "Instalação de torneira de mesa na bancada da cozinha.",
  endereco: "Rua das Flores, 120 - Vila Mariana\nSão Paulo - SP, 04110-010",
  dataAgendada: "20/05/2024",
  horarioAgendado: "14:30",
  valorEstimado: "R$ 120,00",
  observacoes: "Ponto de água já existente.",
  client: "Mariana Costa",
  avatar: "https://i.pravatar.cc/120?img=47",
  rating: 4.8,
  reviews: 12,
  timeline: [
    {
      status: "Solicitação recebida",
      data: "20/05/2024 às 10:15",
      desc: "O cliente enviou a solicitação.",
      done: true,
      active: false,
    },
    {
      status: "Aceita por você",
      data: "20/05/2024 às 11:02",
      desc: "Você aceitou a solicitação.",
      done: true,
      active: false,
    },
    {
      status: "A caminho",
      data: "20/05/2024 às 13:50",
      desc: "Você está a caminho do local.",
      done: true,
      active: false,
    },
    {
      status: "Em andamento",
      data: "20/05/2024 às 14:05",
      desc: "Serviço em execução.",
      done: false,
      active: true,
    },
    {
      status: "Concluída",
      data: null,
      desc: "Aguardando conclusão.",
      done: false,
      active: false,
    },
    {
      status: "Cancelada",
      data: null,
      desc: "Solicitação cancelada.",
      done: false,
      active: false,
      cancelada: true,
    },
  ],
};

function CheckIcon({ done, active, cancelada }) {
  if (cancelada)
    return (
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#FEF2F2",
          border: "2px solid #FECACA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#DC2626"
          strokeWidth="3"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    );
  if (active)
    return (
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#2563EB",
          border: "2px solid #2563EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#fff",
          }}
        />
      </div>
    );
  if (done)
    return (
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#16A34A",
          border: "2px solid #16A34A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    );
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "#F3F4F6",
        border: "2px solid #D1D5DB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="3"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

export default function DetalhesModal({ onClose, solicitacao, onStatusChange }) {
  const [showReagendamento, setShowReagendamento] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPointerEvents = document.body.style.pointerEvents;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "auto";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.pointerEvents = previousBodyPointerEvents;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [onClose]);

  const sol = solicitacao || MOCK;
  const status = sol.status;
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["andamento"];
  const timeline = sol.timeline || MOCK.timeline;
  const endereco = sol.endereco || sol.local || "";
  const servicoNome = sol.service || sol.servico || sol.title || "Solicitacao";

  // dados do cliente
  const clienteNome = sol.client || sol.cliente || "Cliente";
  const clienteFoto = sol.avatar || null;
  const clienteRating = sol.rating || 0;
  const clienteReviews = sol.reviews || 0;
  const clientePerfilUrl = `/Pages/Perfil_cliente?${new URLSearchParams({
    nome: clienteNome,
    avaliacao: String(clienteRating),
    avaliacoes: String(clienteReviews),
    local: endereco || sol.neighborhood || "",
    origem: "solicitacao-prestador",
    id: String(sol.id || ""),
    ...(clienteFoto ? { foto: clienteFoto } : {}),
  }).toString()}`;
  const clienteChatUrl = `/Pages/Chat?${new URLSearchParams({
    nome: clienteNome,
    tipo: "cliente",
    servico: servicoNome,
    origem: "solicitacao-prestador",
    id: String(sol.id || ""),
    ...(clienteFoto ? { foto: clienteFoto } : {}),
  }).toString()}`;

  const closeAndGo = (url) => {
    router.push(url);
    onClose?.();
  };

  const changeStatusAndClose = (nextStatus) => {
    onStatusChange?.(sol.id, nextStatus);
    onClose?.();
  };

  const btnBase = {
    borderRadius: 8,
    padding: "10px 16px",
    fontSize: "0.82rem",
    fontWeight: 600,
    fontFamily: "'Sora', sans-serif",
    cursor: "pointer",
    transition: "opacity 0.18s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    width: "100%",
  };

  const podeReagendar =
    status === "aceita" ||
    status === "Aceita" ||
    status === "andamento" ||
    status === "Em Andamento";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        * { box-sizing: border-box; }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .modal-overlay { animation: fadeIn 0.2s ease both; }
        .modal-box     { animation: slideUp 0.3s cubic-bezier(0.22,1,0.36,1) both; }
        .action-btn:hover { opacity: 0.82 !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 10px; }
      `}</style>

      <div
        className="modal-overlay"
        onClick={(event) => {
          event.stopPropagation();
          onClose?.();
        }}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div
          className="modal-box"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 980,
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "24px 28px 16px",
              borderBottom: "1px solid #F3F4F6",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "#111827",
                    margin: 0,
                    marginBottom: 4,
                  }}
                >
                  Detalhes da Solicitação
                </h2>
                <p style={{ fontSize: "0.8rem", color: "#9CA3AF", margin: 0 }}>
                  ID: {sol.id || "—"}
                </p>
              </div>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onClose?.();
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6B7280",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <i className="ti ti-x" style={{ fontSize: 20 }} />
              </button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 14,
                background: "#F9FAFB",
                borderRadius: 10,
                padding: "10px 16px",
                border: "1px solid #F3F4F6",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 12px",
                  borderRadius: 20,
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  color: cfg.color,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: cfg.color,
                    display: "inline-block",
                  }}
                />
                {cfg.label}
              </span>
              <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>
                Última atualização: {sol.ultimaAtualizacao || sol.data || "—"}
              </span>
            </div>
          </div>

          {/* Body */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: 0,
            }}
          >
            {/* Coluna Esquerda */}
            <div
              style={{ padding: "24px 28px", borderRight: "1px solid #F3F4F6" }}
            >
              {/* Informações do Serviço */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #F3F4F6",
                  borderRadius: 12,
                  padding: "20px",
                  marginBottom: 20,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: "#111827",
                    margin: "0 0 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <i
                    className="ti ti-calendar"
                    style={{ fontSize: 17, color: "#6B7280" }}
                  />{" "}
                  Informações do Serviço
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {sol.categoria && (
                      <div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "#9CA3AF",
                            marginBottom: 3,
                          }}
                        >
                          Categoria
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "#111827",
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <i
                            className="ti ti-tool"
                            style={{ fontSize: 15, color: "#6B7280" }}
                          />{" "}
                          {sol.categoria}
                        </div>
                      </div>
                    )}
                    <div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#9CA3AF",
                          marginBottom: 3,
                        }}
                      >
                        Serviço
                      </div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "#111827",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <i
                          className="ti ti-briefcase"
                          style={{ fontSize: 15, color: "#6B7280" }}
                        />{" "}
                        {sol.servico || sol.title}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#9CA3AF",
                          marginBottom: 3,
                        }}
                      >
                        Descrição
                      </div>
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: "#374151",
                          lineHeight: 1.5,
                        }}
                      >
                        {sol.descricao || sol.description}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#9CA3AF",
                          marginBottom: 3,
                        }}
                      >
                        Endereço
                      </div>
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: "#374151",
                          lineHeight: 1.5,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 5,
                          }}
                        >
                          <i
                            className="ti ti-map-pin"
                            style={{
                              fontSize: 15,
                              color: "#6B7280",
                              marginTop: 2,
                              flexShrink: 0,
                            }}
                          />
                          <span>
                            {endereco.split("\n").map((l, i) => (
                              <span key={i}>
                                {l}
                                <br />
                              </span>
                            ))}
                            <span
                              style={{
                                color: "#2563EB",
                                fontSize: "0.78rem",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              Ver no mapa
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 10,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "#9CA3AF",
                            marginBottom: 3,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <i
                            className="ti ti-calendar"
                            style={{ fontSize: 13 }}
                          />{" "}
                          Data
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {sol.dataAgendada || sol.date || "—"}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "#9CA3AF",
                            marginBottom: 3,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <i className="ti ti-clock" style={{ fontSize: 13 }} />{" "}
                          Horário
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {sol.horarioAgendado || sol.time || "—"}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#9CA3AF",
                          marginBottom: 3,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <i
                          className="ti ti-currency-dollar"
                          style={{ fontSize: 13 }}
                        />{" "}
                        Valor
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "#16A34A",
                        }}
                      >
                        {sol.valorEstimado ||
                          (sol.value
                            ? `R$ ${sol.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                            : "—")}
                      </div>
                    </div>
                    {sol.observacoes && (
                      <div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "#9CA3AF",
                            marginBottom: 3,
                          }}
                        >
                          Observações
                        </div>
                        <div style={{ fontSize: "0.82rem", color: "#374151" }}>
                          {sol.observacoes}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Informações do CLIENTE (não do prestador) ── */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #F3F4F6",
                  borderRadius: 12,
                  padding: "20px",
                  marginBottom: 20,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: "#111827",
                    margin: "0 0 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <i
                    className="ti ti-user"
                    style={{ fontSize: 17, color: "#6B7280" }}
                  />{" "}
                  Informações do Cliente
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    {clienteFoto ? (
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: "50%",
                          overflow: "hidden",
                          flexShrink: 0,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        }}
                      >
                        <img
                          src={clienteFoto}
                          alt={clienteNome}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: "50%",
                          background: "#7C3AED",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Sora', sans-serif",
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: "#fff",
                        }}
                      >
                        {clienteNome
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: "#111827",
                          marginBottom: 3,
                        }}
                      >
                        {clienteNome}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <i
                          className="ti ti-star"
                          style={{ fontSize: 14, color: "#FBBF24" }}
                        />
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {clienteRating}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
                          ({clienteReviews} avaliações)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className="action-btn"
                      onClick={() => closeAndGo(clientePerfilUrl)}
                      style={{
                        ...btnBase,
                        background: "#fff",
                        color: "#374151",
                        border: "1.5px solid #E5E7EB",
                        width: "auto",
                        padding: "10px 18px",
                      }}
                    >
                      <i className="ti ti-user" style={{ fontSize: 15 }} /> Ver
                      perfil
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => closeAndGo(clienteChatUrl)}
                      style={{
                        ...btnBase,
                        background: "#fff",
                        color: "#374151",
                        border: "1.5px solid #E5E7EB",
                        width: "auto",
                        padding: "10px 18px",
                      }}
                    >
                      <i className="ti ti-message" style={{ fontSize: 15 }} />{" "}
                      Enviar mensagem
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Ações do PRESTADOR por status ── */}
              <div>
                {status === "nova" && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className="action-btn"
                      onClick={() => changeStatusAndClose("aceita")}
                      style={{
                        ...btnBase,
                        background: "#16A34A",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      <i className="ti ti-check" style={{ fontSize: 15 }} />{" "}
                      Aceitar serviço
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => changeStatusAndClose("recusada")}
                      style={{
                        ...btnBase,
                        background: "#FEF2F2",
                        color: "#DC2626",
                        border: "1.5px solid #FECACA",
                      }}
                    >
                      <i className="ti ti-x" style={{ fontSize: 15 }} /> Recusar
                    </button>
                  </div>
                )}
                {(status === "aceita" || status === "Aceita") && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className="action-btn"
                      onClick={() => changeStatusAndClose("andamento")}
                      style={{
                        ...btnBase,
                        background: "#2563EB",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      <i
                        className="ti ti-player-play"
                        style={{ fontSize: 15 }}
                      />{" "}
                      Iniciar serviço
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => setShowReagendamento(true)}
                      style={{
                        ...btnBase,
                        background: "#F5F3FF",
                        color: "#7C3AED",
                        border: "1.5px solid #DDD6FE",
                      }}
                    >
                      <i className="ti ti-calendar" style={{ fontSize: 15 }} />{" "}
                      Reagendar
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => closeAndGo(`/Pages/Cancelamento_prestador?id=${encodeURIComponent(sol.id)}`)}
                      style={{
                        ...btnBase,
                        background: "#FEF2F2",
                        color: "#DC2626",
                        border: "1.5px solid #FECACA",
                      }}
                    >
                      <i className="ti ti-x" style={{ fontSize: 15 }} />{" "}
                      Cancelar
                    </button>
                  </div>
                )}
                {(status === "andamento" || status === "Em Andamento") && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className="action-btn"
                      onClick={() => changeStatusAndClose("concluida")}
                      style={{
                        ...btnBase,
                        background: "#16A34A",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      <i
                        className="ti ti-circle-check"
                        style={{ fontSize: 15 }}
                      />{" "}
                      Concluir serviço
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => setShowReagendamento(true)}
                      style={{
                        ...btnBase,
                        background: "#F5F3FF",
                        color: "#7C3AED",
                        border: "1.5px solid #DDD6FE",
                      }}
                    >
                      <i className="ti ti-calendar" style={{ fontSize: 15 }} />{" "}
                      Reagendar
                    </button>
                  </div>
                )}
                {(status === "concluida" || status === "Concluída") && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className="action-btn"
                      style={{
                        ...btnBase,
                        background: "#FBBF24",
                        color: "#111827",
                        border: "none",
                      }}
                    >
                      <i className="ti ti-star" style={{ fontSize: 15 }} />{" "}
                      Avaliar cliente
                    </button>
                    <button
                      className="action-btn"
                      style={{
                        ...btnBase,
                        background: "#EFF6FF",
                        color: "#2563EB",
                        border: "1.5px solid #BFDBFE",
                      }}
                    >
                      <i
                        className="ti ti-file-invoice"
                        style={{ fontSize: 15 }}
                      />{" "}
                      Ver comprovante
                    </button>
                  </div>
                )}
                {(status === "cancelada" || status === "Cancelada") && (
                  <button
                    className="action-btn"
                    style={{
                      ...btnBase,
                      background: "#FEF2F2",
                      color: "#DC2626",
                      border: "1.5px solid #FECACA",
                    }}
                  >
                    <i className="ti ti-info-circle" style={{ fontSize: 15 }} />{" "}
                    Ver motivo do cancelamento
                  </button>
                )}
                {status === "recusada" && (
                  <button
                    className="action-btn"
                    style={{
                      ...btnBase,
                      background: "#F3F4F6",
                      color: "#6B7280",
                      border: "1.5px solid #E5E7EB",
                    }}
                  >
                    <i className="ti ti-info-circle" style={{ fontSize: 15 }} />{" "}
                    Ver detalhes da recusa
                  </button>
                )}
              </div>
            </div>

            {/* Coluna Direita — Timeline */}
            <div style={{ padding: "24px" }}>
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  color: "#111827",
                  margin: "0 0 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <i
                  className="ti ti-timeline"
                  style={{ fontSize: 17, color: "#6B7280" }}
                />{" "}
                Andamento do atendimento
              </h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {timeline.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <CheckIcon
                        done={item.done}
                        active={item.active}
                        cancelada={item.cancelada}
                      />
                      {i < timeline.length - 1 && (
                        <div
                          style={{
                            width: 2,
                            flex: 1,
                            minHeight: 32,
                            background: item.done ? "#16A34A" : "#E5E7EB",
                            margin: "4px 0",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ paddingBottom: 20, flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          color: item.active
                            ? "#2563EB"
                            : item.cancelada
                              ? "#DC2626"
                              : item.done
                                ? "#111827"
                                : "#9CA3AF",
                          marginBottom: 2,
                        }}
                      >
                        {item.status}
                      </div>
                      {item.data && (
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: "#9CA3AF",
                            marginBottom: 3,
                          }}
                        >
                          {item.data}
                        </div>
                      )}
                      <div
                        style={{
                          fontSize: "0.76rem",
                          color: "#6B7280",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showReagendamento && (
        <ReagendamentoSolicitadoPrestador
          onClose={() => setShowReagendamento(false)}
          onConcluir={() => setShowReagendamento(false)}
        />
      )}
    </>
  );
}
