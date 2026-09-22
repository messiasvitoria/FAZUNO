"use client";

import { useState } from "react";
import ReagendamentoSolicitadoCliente from "./reagendamento_solicitado_cliente";
import { useRouter } from "next/navigation"; // ← ADICIONADO
const STATUS_CONFIG = {
  "Solicitação Enviada":  { color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE", label: "SOLICITAÇÃO ENVIADA" },
  "Em Análise":           { color: "#EA580C", bg: "#FFF7ED", border: "#FED7AA", label: "EM ANÁLISE" },
  "Aceita":               { color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE", label: "ACEITA" },
  "Aguardando Pagamento": { color: "#CA8A04", bg: "#FEFCE8", border: "#FEF08A", label: "AGUARDANDO PAGAMENTO" },
  "Aguardando Aprovação": { color: "#EA580C", bg: "#FFF7ED", border: "#FED7AA", label: "AGUARDANDO APROVAÇÃO" },
  "Em Andamento":         { color: "#0284C7", bg: "#F0F9FF", border: "#BAE6FD", label: "EM ANDAMENTO" },
  "A Caminho":            { color: "#0284C7", bg: "#F0F9FF", border: "#BAE6FD", label: "A CAMINHO" },
  "Concluída":            { color: "#16A34A", bg: "#F0FDF4", border: "#BBF7D0", label: "CONCLUÍDA" },
  "Cancelada":            { color: "#DC2626", bg: "#FEF2F2", border: "#FECACA", label: "CANCELADA" },
};

const MOCK_SOLICITACAO = {
  id: "#SOL-2024-5123",
  status: "Em Andamento",
  ultimaAtualizacao: "Hoje às 14:08",
  categoria: "Hidráulica",
  servico: "Instalação de Torneira",
  descricao: "Instalação de torneira de mesa na bancada da cozinha. Modelo já adquirido pelo cliente.",
  endereco: "Rua das Flores, 120 - Vila Mariana\nSão Paulo - SP, 04110-010",
  dataAgendada: "20/05/2024",
  horarioAgendado: "14:30",
  valorEstimado: "R$ 120,00",
  observacoes: "Ponto de água já existente.",
  prestador: {
    nome: "João Silva",
    avaliacao: 4.9,
    avaliacoes: 128,
    verificado: true,
    avatar: "JS",
    avatarColor: "#2563EB",
    foto: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  timeline: [
    { status: "Solicitação criada",    data: "20/05/2024 às 10:15", desc: "Sua solicitação foi criada com sucesso.",      done: true,  active: false },
    { status: "Aceita pelo prestador", data: "20/05/2024 às 11:02", desc: "João Silva aceitou sua solicitação.",          done: true,  active: false },
    { status: "A caminho",             data: "20/05/2024 às 13:50", desc: "O prestador está a caminho do local.",         done: true,  active: false, caminho: true },
    { status: "Em andamento",          data: "20/05/2024 às 14:05", desc: "O serviço está em execução.",                  done: false, active: true  },
    { status: "Concluída",             data: null,                  desc: "Aguardando conclusão do serviço.",             done: false, active: false },
    { status: "Cancelada",             data: null,                  desc: "Solicitação cancelada.",                       done: false, active: false, cancelada: true },
  ],
  caminho:    { distancia: "3,2 km", chegada: "12 min", previsao: "14:42" },
  orcamento:  { valorOriginal: "R$ 120,00", novoValor: "R$ 180,00", diferenca: "R$ 60,00", motivo: "Material adicional necessário", justificativa: "Foi identificado que o registro precisa ser trocado também.", fotos: [] },
};

function CheckIcon({ done, active, cancelada }) {
  if (cancelada) return (
    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FEF2F2", border: "2px solid #FECACA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
    </div>
  );
  if (active) return (
    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#2563EB", border: "2px solid #2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
    </div>
  );
  if (done) return (
    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#16A34A", border: "2px solid #16A34A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
    </div>
  );
  return (
    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#F3F4F6", border: "2px solid #D1D5DB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
    </div>
  );
}

export default function DetalhesModal({ onClose, solicitacao }) {
  const router = useRouter(); // ← ADICIONADO
  const [showReagendamento, setShowReagendamento] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const sol       = solicitacao || MOCK_SOLICITACAO;
  const status    = sol.status;
  const cfg       = STATUS_CONFIG[status] || STATUS_CONFIG["Em Andamento"];
  const timeline  = sol.timeline  || MOCK_SOLICITACAO.timeline;
  const caminho   = sol.caminho   || MOCK_SOLICITACAO.caminho;
  const orcamento = sol.orcamento || MOCK_SOLICITACAO.orcamento;
  const endereco  = sol.endereco  || sol.local || "";
  const prestador = sol.prestador || MOCK_SOLICITACAO.prestador;
  const perfilPrestadorUrl = `/Pages/Perfil_prestador?${new URLSearchParams({
    nome: prestador?.nome || "Prestador",
    tipo: "prestador",
    servico: sol.servico || "Solicitacao",
    avaliacao: String(prestador?.avaliacao || ""),
    avaliacoes: String(prestador?.avaliacoes || ""),
    origem: "detalhes-minhas-solicitacoes",
    id: String(sol.id || ""),
    ...(prestador?.foto ? { foto: prestador.foto } : {}),
  }).toString()}`;
  const chatUrl = `/Pages/Chat?${new URLSearchParams({
    nome: prestador?.nome || "Prestador",
    tipo: "prestador",
    servico: sol.servico || "Solicitacao",
    origem: "detalhes-minhas-solicitacoes",
    id: String(sol.id || ""),
    ...(prestador?.foto ? { foto: prestador.foto } : {}),
  }).toString()}`;

  const btnBase = {
    borderRadius: 8, padding: "10px 16px", fontSize: "0.82rem", fontWeight: 600,
    fontFamily: "'Sora', sans-serif", cursor: "pointer", transition: "opacity 0.18s",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 7, width: "100%",
  };

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
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'DM Sans', sans-serif" }}
      >
        <div
          className="modal-box"
          onClick={(e) => e.stopPropagation()}
          style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 980, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}
        >

          {/* ── Header ───────────────────────────────────────────────────────── */}
          <div style={{ padding: "24px 28px 16px", borderBottom: "1px solid #F3F4F6" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.35rem", fontWeight: 700, color: "#111827", margin: 0, marginBottom: 4 }}>
                  Detalhes da Solicitação
                </h2>
                <p style={{ fontSize: "0.8rem", color: "#9CA3AF", margin: 0 }}>ID da solicitação: {sol.id || "—"}</p>
              </div>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4, lineHeight: 1, display: "flex", alignItems: "center" }}>
                <i className="ti ti-x" style={{ fontSize: 20 }} />
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, background: "#F9FAFB", borderRadius: 10, padding: "10px 16px", border: "1px solid #F3F4F6" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, fontSize: "0.72rem", fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.color, display: "inline-block" }} />
                {cfg.label}
              </span>
              <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>
                Última atualização: {sol.ultimaAtualizacao || sol.data || "—"}
              </span>
            </div>
          </div>

          {/* ── Body ─────────────────────────────────────────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 0 }}>

            {/* Coluna Esquerda */}
            <div style={{ padding: "24px 28px", borderRight: "1px solid #F3F4F6" }}>

              {/* Informações do Serviço */}
              <div style={{ background: "#fff", border: "1px solid #F3F4F6", borderRadius: 12, padding: "20px", marginBottom: 20 }}>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.92rem", fontWeight: 700, color: "#111827", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 7 }}>
                  <i className="ti ti-calendar" style={{ fontSize: 17, color: "#6B7280" }} /> Informações do Serviço
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {sol.categoria && (
                      <div>
                        <div style={{ fontSize: "0.7rem", color: "#9CA3AF", marginBottom: 3 }}>Categoria</div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111827", display: "flex", alignItems: "center", gap: 5 }}>
                          <i className="ti ti-tool" style={{ fontSize: 15, color: "#6B7280" }} /> {sol.categoria}
                        </div>
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "#9CA3AF", marginBottom: 3 }}>Serviço</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111827", display: "flex", alignItems: "center", gap: 5 }}>
                        <i className="ti ti-briefcase" style={{ fontSize: 15, color: "#6B7280" }} /> {sol.servico}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "#9CA3AF", marginBottom: 3 }}>Descrição</div>
                      <div style={{ fontSize: "0.82rem", color: "#374151", lineHeight: 1.5 }}>{sol.descricao}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "#9CA3AF", marginBottom: 3 }}>Endereço</div>
                      <div style={{ fontSize: "0.82rem", color: "#374151", lineHeight: 1.5 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
                          <i className="ti ti-map-pin" style={{ fontSize: 15, color: "#6B7280", marginTop: 2, flexShrink: 0 }} />
                          <span>
                            {endereco.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}
                            <span style={{ color: "#2563EB", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>Ver no mapa</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <div>
                        <div style={{ fontSize: "0.7rem", color: "#9CA3AF", marginBottom: 3, display: "flex", alignItems: "center", gap: 4 }}>
                          <i className="ti ti-calendar" style={{ fontSize: 13 }} /> Data agendada
                        </div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111827" }}>{sol.dataAgendada || sol.data || "—"}</div>
                      </div>
                      {sol.horarioAgendado && (
                        <div>
                          <div style={{ fontSize: "0.7rem", color: "#9CA3AF", marginBottom: 3, display: "flex", alignItems: "center", gap: 4 }}>
                            <i className="ti ti-clock" style={{ fontSize: 13 }} /> Horário
                          </div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111827" }}>{sol.horarioAgendado}</div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "#9CA3AF", marginBottom: 3, display: "flex", alignItems: "center", gap: 4 }}>
                        <i className="ti ti-currency-dollar" style={{ fontSize: 13 }} /> Valor
                      </div>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: "#16A34A" }}>{sol.valorEstimado || sol.valor || "—"}</div>
                    </div>
                    {sol.observacoes && (
                      <div>
                        <div style={{ fontSize: "0.7rem", color: "#9CA3AF", marginBottom: 3, display: "flex", alignItems: "center", gap: 4 }}>
                          <i className="ti ti-notes" style={{ fontSize: 13 }} /> Observações
                        </div>
                        <div style={{ fontSize: "0.82rem", color: "#374151" }}>{sol.observacoes}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Informações do Prestador */}
              <div style={{ background: "#fff", border: "1px solid #F3F4F6", borderRadius: 12, padding: "20px", marginBottom: 20 }}>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.92rem", fontWeight: 700, color: "#111827", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 7 }}>
                  <i className="ti ti-user" style={{ fontSize: 17, color: "#6B7280" }} /> Informações do Prestador
                </h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {prestador.foto ? (
                      <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
                        <img src={prestador.foto} alt={prestador.avatar} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ) : (
                      <div style={{ width: 52, height: 52, borderRadius: "50%", background: prestador.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>
                        {prestador.avatar}
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827", marginBottom: 3 }}>{prestador.nome}</div>
                      <div style={{ color: "#16A34A", fontSize: "0.75rem", fontWeight: 600, marginBottom: 3, display: "flex", alignItems: "center", gap: 4 }}>
                        <i className="ti ti-circle-check" style={{ fontSize: 14 }} /> Prestador Verificado
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <i className="ti ti-star" style={{ fontSize: 14, color: "#FBBF24" }} />
                        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111827" }}>{prestador.avaliacao}</span>
                        <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>({prestador.avaliacoes} avaliações)</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {/* ── CORRIGIDO: redireciona para Perfil_prestador ao clicar ── */}
                    <button
                      className="action-btn"
                      onClick={() => router.push(perfilPrestadorUrl)}
                      style={{ ...btnBase, background: "#fff", color: "#374151", border: "1.5px solid #E5E7EB", width: "auto", padding: "10px 18px" }}
                    >
                      <i className="ti ti-user" style={{ fontSize: 15 }} /> Ver perfil
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => router.push(chatUrl)}
                      style={{ ...btnBase, background: "#fff", color: "#374151", border: "1.5px solid #E5E7EB", width: "auto", padding: "10px 18px" }}
                    >
                      <i className="ti ti-message" style={{ fontSize: 15 }} /> Enviar mensagem
                    </button>
                  </div>
                </div>
              </div>

              {/* Aviso orçamento */}
              <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1D4ED8", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <i className="ti ti-info-circle" style={{ fontSize: 16 }} /> Aviso sobre orçamento
                </div>
                <div style={{ fontSize: "0.78rem", color: "#1E40AF", lineHeight: 1.6 }}>
                  O valor apresentado é uma estimativa. Caso sejam identificadas necessidades adicionais, o prestador poderá solicitar uma revisão de orçamento que deverá ser aprovada pelo cliente.
                </div>
              </div>

              {/* Ações por status */}
              <div>
                {status === "Solicitação Enviada" && (
                  <button
                    className="action-btn"
                    onClick={() => router.push(`/Pages/Cancelamento_cliente?id=${encodeURIComponent(sol.id)}`)}
                    style={{ ...btnBase, background: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FECACA" }}
                  >
                    <i className="ti ti-x" style={{ fontSize: 15 }} /> Cancelar Solicitação
                  </button>
                )}
                {status === "Aceita" && (
                <div style={{ display: "flex", gap: 10 }}>
                <button className="action-btn" onClick={() => setShowReagendamento(true)} style={{ ...btnBase, background: "#F5F3FF", color: "#7C3AED", border: "1.5px solid #DDD6FE" }}>
                <i className="ti ti-calendar" style={{ fontSize: 15 }} /> Reagendar
               </button>
                  </div>
                )}
                {status === "Aguardando Pagamento" && (
                  <button className="action-btn" style={{ ...btnBase, background: "#FBBF24", color: "#111827", border: "none" }}>
                    <i className="ti ti-credit-card" style={{ fontSize: 15 }} /> Realizar Pagamento
                  </button>
                )}
                {status === "Aguardando Aprovação" && (
                  <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: 20 }}>
                    <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#EA580C", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 6 }}>
                      <i className="ti ti-clipboard" style={{ fontSize: 16 }} /> Solicitação de Alteração de Orçamento
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
                      <div><div style={{ fontSize: "0.68rem", color: "#9CA3AF", marginBottom: 2 }}>Valor original</div><div style={{ fontWeight: 700, color: "#111827" }}>{orcamento.valorOriginal}</div></div>
                      <div><div style={{ fontSize: "0.68rem", color: "#9CA3AF", marginBottom: 2 }}>Novo valor</div><div style={{ fontWeight: 700, color: "#EA580C" }}>{orcamento.novoValor}</div></div>
                      <div><div style={{ fontSize: "0.68rem", color: "#9CA3AF", marginBottom: 2 }}>Diferença</div><div style={{ fontWeight: 700, color: "#DC2626" }}>+{orcamento.diferenca}</div></div>
                    </div>
                    <div style={{ marginBottom: 8 }}><div style={{ fontSize: "0.68rem", color: "#9CA3AF", marginBottom: 2 }}>Motivo</div><div style={{ fontSize: "0.82rem", color: "#374151" }}>{orcamento.motivo}</div></div>
                    <div style={{ marginBottom: 14 }}><div style={{ fontSize: "0.68rem", color: "#9CA3AF", marginBottom: 2 }}>Justificativa</div><div style={{ fontSize: "0.82rem", color: "#374151" }}>{orcamento.justificativa}</div></div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button className="action-btn" style={{ ...btnBase, background: "#16A34A", color: "#fff", border: "none" }}>
                        <i className="ti ti-check" style={{ fontSize: 15 }} /> Aprovar Novo Valor
                      </button>
                      <button className="action-btn" style={{ ...btnBase, background: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FECACA" }}>
                        <i className="ti ti-x" style={{ fontSize: 15 }} /> Recusar Novo Valor
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => router.push(chatUrl)}
                        style={{ ...btnBase, background: "#fff", color: "#374151", border: "1.5px solid #E5E7EB" }}
                      >
                        <i className="ti ti-message" style={{ fontSize: 15 }} /> Conversar
                      </button>
                    </div>
                  </div>
                )}
                {status === "Concluída" && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="action-btn" style={{ ...btnBase, background: "#FBBF24", color: "#111827", border: "none" }}>
                      <i className="ti ti-star" style={{ fontSize: 15 }} /> Avaliar Prestador
                    </button>
                    <button className="action-btn" style={{ ...btnBase, background: "#fff", color: "#374151", border: "1.5px solid #E5E7EB" }}>
                      <i className="ti ti-refresh" style={{ fontSize: 15 }} /> Pedir Novamente
                    </button>
                    <button
                      className="action-btn"
                      aria-pressed={isFavorited}
                      onClick={() => setIsFavorited((current) => !current)}
                      style={{ ...btnBase, background: "#EFF6FF", color: isFavorited ? "#F1670F" : "#2563EB", border: "1.5px solid #BFDBFE" }}
                    >
                      <i className={isFavorited ? "ti ti-heart-filled" : "ti ti-heart"} style={{ fontSize: 15 }} /> {isFavorited ? "Favoritado" : "Favoritar"}
                    </button>
                  </div>
                )}
                {status === "Cancelada" && (
                  <button className="action-btn" style={{ ...btnBase, background: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FECACA" }}>
                    <i className="ti ti-info-circle" style={{ fontSize: 15 }} /> Ver Motivo do Cancelamento
                  </button>
                )}
              </div>
            </div>

            {/* Coluna Direita — Timeline */}
            <div style={{ padding: "24px" }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.92rem", fontWeight: 700, color: "#111827", margin: "0 0 20px", display: "flex", alignItems: "center", gap: 7 }}>
                <i className="ti ti-timeline" style={{ fontSize: 17, color: "#6B7280" }} /> Andamento do atendimento
              </h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {timeline.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <CheckIcon done={item.done} active={item.active} cancelada={item.cancelada} />
                      {i < timeline.length - 1 && (
                        <div style={{ width: 2, flex: 1, minHeight: 32, background: item.done ? "#16A34A" : "#E5E7EB", margin: "4px 0" }} />
                      )}
                    </div>
                    <div style={{ paddingBottom: 20, flex: 1 }}>
                      <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: item.active ? "#2563EB" : item.cancelada ? "#DC2626" : item.done ? "#111827" : "#9CA3AF", marginBottom: 2 }}>
                        {item.status}
                      </div>
                      {item.data && (
                        <div style={{ fontSize: "0.72rem", color: "#9CA3AF", marginBottom: 3 }}>{item.data}</div>
                      )}
                      <div style={{ fontSize: "0.76rem", color: "#6B7280", lineHeight: 1.5 }}>{item.desc}</div>
                      {item.caminho && item.done && (
                        <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: "12px 14px", marginTop: 10 }}>
                          <i className="ti ti-car" style={{ fontSize: 20, color: "#16A34A", marginBottom: 8, display: "block" }} />
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem", color: "#374151", marginBottom: 4 }}>
                            <span>Distância restante</span><span style={{ fontWeight: 700 }}>{caminho.distancia}</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem", color: "#374151", marginBottom: 4 }}>
                            <span>Chegada estimada</span><span style={{ fontWeight: 700 }}>{caminho.chegada}</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem", color: "#374151", marginBottom: 8 }}>
                            <span>Previsão</span><span style={{ fontWeight: 700, color: "#16A34A" }}>{caminho.previsao}</span>
                          </div>
                          <button className="action-btn" style={{ ...btnBase, background: "#fff", color: "#374151", border: "1.5px solid #D1D5DB", fontSize: "0.76rem", padding: "8px 12px" }}>
                            <i className="ti ti-eye" style={{ fontSize: 14 }} /> Acompanhar chegada
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    {showReagendamento && (
  <ReagendamentoSolicitadoCliente
    onClose={() => setShowReagendamento(false)}
    onConcluir={() => setShowReagendamento(false)}
  />
)}
    </>
  );
}
