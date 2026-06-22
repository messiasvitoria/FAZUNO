"use client";

import Sidebar from "../../components/SideBar_cliente";
import Topbar  from "../../components/TopBar_cliente";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DetalhesModal from "./Modal_Detalhes_Cliente";
import { FaBullhorn } from "react-icons/fa";

const CLIENT_REQUESTS_KEY = "fazuno_minhas_solicitacoes_extra";
const LAST_CLIENT_REQUEST_KEY = "fazuno_ultima_solicitacao_cliente";

const SAMPLE_INTERESSADOS = [
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

const STATUS_CONFIG = {
  "Nova":                  { color: "#F1670F", bg: "#FFF7ED", border: "#FED7AA", label: "NOVA" },
  "Pendente":              { color: "#F1670F", bg: "#FFF7ED", border: "#FED7AA", label: "PENDENTE" },
  "Solicitação Enviada":  { color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE", label: "SOLICITAÇÃO ENVIADA" },
  "Em Análise":           { color: "#EA580C", bg: "#FFF7ED", border: "#FED7AA", label: "EM ANÁLISE" },
  "Aceita":               { color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE", label: "ACEITA" },
  "Aguardando Pagamento": { color: "#CA8A04", bg: "#FEFCE8", border: "#FEF08A", label: "AGUARDANDO PAGAMENTO" },
  "Em Andamento":         { color: "#0284C7", bg: "#F0F9FF", border: "#BAE6FD", label: "EM ANDAMENTO" },
  "Concluída":            { color: "#16A34A", bg: "#F0FDF4", border: "#BBF7D0", label: "CONCLUÍDA" },
  "Cancelada":            { color: "#DC2626", bg: "#FEF2F2", border: "#FECACA", label: "CANCELADA" },
};

const SOLICITACOES = [
  { id: 1, prestador: { nome: "João Silva",      avaliacao: 4.8, avaliacoes: 32, avatar: "JS", avatarColor: "#2563EB", foto: "https://randomuser.me/api/portraits/men/32.jpg"   }, servico: "Instalação de TV",               descricao: "Instalar TV 55 polegadas na parede da sala.",        local: "Moema, São Paulo – SP",       data: "20/05/2024 às 14:30", status: "Aceita",               statusMsg: "O prestador aceitou sua solicitação. Aguarde o início do serviço.",                              valorLabel: "Valor estimado",    valor: "R$ 180,00", acoes: ["detalhes", "conversar"] },
  { id: 2, prestador: { nome: "Ana Caroline",    avaliacao: 5.0, avaliacoes: 18, avatar: "AC", avatarColor: "#7C3AED", foto: "https://randomuser.me/api/portraits/women/44.jpg" }, servico: "Limpeza Residencial",            descricao: "Limpeza completa de apartamento 80m².",              local: "Vila Mariana, São Paulo – SP", data: "18/05/2024 às 10:15", status: "Aguardando Pagamento", statusMsg: "O prestador aceitou sua solicitação. Realize o pagamento para iniciar o serviço.",             valorLabel: "Valor do serviço", valor: "R$ 220,00", acoes: ["pagamento", "conversar", "detalhes"] },
  { id: 3, prestador: { nome: "Amancio Silva",   avaliacao: 4.8, avaliacoes: 45, avatar: "AS", avatarColor: "#EA580C", foto: "https://randomuser.me/api/portraits/men/45.jpg"   }, servico: "Reparo Hidráulico",              descricao: "Conserto de vazamento no banheiro.",                 local: "Santo André, São Paulo – SP",  data: "15/05/2024 às 09:00", status: "Em Andamento",         statusMsg: "O serviço está em andamento. Acompanhe o progresso.",                                          valorLabel: "Valor do serviço", valor: "R$ 150,00", acoes: ["andamento", "conversar"] },
  { id: 4, prestador: { nome: "Lúcia Carvalho",  avaliacao: 5.0, avaliacoes: 27, avatar: "LC", avatarColor: "#16A34A", foto: "https://randomuser.me/api/portraits/women/27.jpg" }, servico: "Pintura de Parede",              descricao: "Pintura de 2 quartos e sala.",                       local: "Ipiranga, São Paulo – SP",     data: "10/05/2024 às 16:20", status: "Concluída",            statusMsg: "Serviço concluído em 12/05/2024 às 17:40",                                                     valorLabel: "Valor do serviço", valor: "R$ 320,00", acoes: ["novamente", "avaliar"] },
  { id: 5, prestador: { nome: "Ricardo Almeida", avaliacao: 4.7, avaliacoes: 16, avatar: "RA", avatarColor: "#0284C7", foto: "https://randomuser.me/api/portraits/men/16.jpg"   }, servico: "Troca de Tomadas",               descricao: "Trocar 3 tomadas danificadas.",                      local: "Tatuapé, São Paulo – SP",      data: "08/05/2024 às 11:40", status: "Solicitação Enviada",  statusMsg: "Aguardando o prestador analisar sua solicitação.",                                             valorLabel: "Valor estimado",    valor: "R$ 120,00", acoes: ["cancelar"] },
  { id: 6, prestador: { nome: "Fernanda Lima",   avaliacao: 4.9, avaliacoes: 52, avatar: "FL", avatarColor: "#CA8A04", foto: "https://randomuser.me/api/portraits/women/52.jpg" }, servico: "Instalação de Ar-condicionado", descricao: "Instalar ar-condicionado split 12.000 BTUs.",        local: "Pinheiros, São Paulo – SP",    data: "05/05/2024 às 13:00", status: "Em Análise",           statusMsg: "O prestador está analisando sua solicitação.",                                                 valorLabel: "Valor estimado",    valor: "R$ 280,00", acoes: ["cancelar"] },
  { id: 7, prestador: { nome: "Carlos Mendes",   avaliacao: 4.6, avaliacoes: 11, avatar: "CM", avatarColor: "#DC2626", foto: "https://randomuser.me/api/portraits/men/11.jpg"   }, servico: "Conserto de Portão",             descricao: "Reparo no motor do portão automático.",              local: "Santana, São Paulo – SP",      data: "02/05/2024 às 08:30", status: "Cancelada",            statusMsg: "Solicitação cancelada pelo cliente.",                                                          valorLabel: "Valor estimado",    valor: "R$ 200,00", acoes: ["novamente"] },
];

function loadExtraSolicitacoes() {
  if (typeof window === "undefined") return [];
  try {
    window.localStorage.removeItem(CLIENT_REQUESTS_KEY);
    const stored = JSON.parse(window.sessionStorage.getItem(CLIENT_REQUESTS_KEY) || "[]");
    window.sessionStorage.removeItem(CLIENT_REQUESTS_KEY);
    if (!Array.isArray(stored)) return [];

    const seen = new Set();
    const deduped = stored.filter((item) => {
      const key = item.tipo === "oportunidade" ? "oportunidade-publicada" : item.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map((item) => {
      if (item.tipo !== "oportunidade") return item;
      const interessados = item.interessados?.length ? item.interessados : SAMPLE_INTERESSADOS;
      return {
        ...item,
        id: item.id || "OPR-2025-000045",
        statusMsg: item.statusMsg === "Aguardando interesse de profissionais." ? "Interessados aguardando sua análise." : item.statusMsg,
        interessados,
        interessadosCount: interessados.length,
      };
    });

    const normalized = deduped.map((item) => {
      if (item.tipo !== "oportunidade") return item;
      const interessados = item.interessados?.length ? item.interessados : SAMPLE_INTERESSADOS;
      const hasInteressados = interessados.length > 0;
      return {
        ...item,
        status: hasInteressados ? "Em Análise" : item.status,
        statusMsg: hasInteressados ? "Interessados aguardando sua análise." : item.statusMsg,
        interessados,
        interessadosCount: interessados.length,
      };
    });

    return normalized;
  } catch {
    return [];
  }
}

function getInitialOpenSolicitacao(extraSolicitacoes) {
  if (typeof window === "undefined") return null;
  const urlRequestId = new URLSearchParams(window.location.search).get("abrir");
  const sessionRequestId = window.sessionStorage.getItem(LAST_CLIENT_REQUEST_KEY);
  const requestId = urlRequestId || sessionRequestId;
  if (sessionRequestId) {
    window.sessionStorage.removeItem(LAST_CLIENT_REQUEST_KEY);
  }
  if (!requestId) return null;
  const normalizedRequestId = requestId.replace(/^#/, "");
  return [...extraSolicitacoes, ...SOLICITACOES].find((item) => String(item.id).replace(/^#/, "") === normalizedRequestId) || null;
}

const TABS = [
  { label: "Todas",                key: "Todas" },
  { label: "Oportunidades",        key: "Nova" },
  { label: "Pendentes",            key: "Pendente" },
  { label: "Solicitação Enviada",  key: "Solicitação Enviada" },
  { label: "Em Análise",           key: "Em Análise" },
  { label: "Aceita",               key: "Aceita" },
  { label: "Aguardando Pagamento", key: "Aguardando Pagamento" },
  { label: "Em Andamento",         key: "Em Andamento" },
  { label: "Concluídas",           key: "Concluída" },
  { label: "Canceladas",           key: "Cancelada" },
];

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="#FBBF24" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1L7.2 4.2L10.5 4.5L8.1 6.6L8.9 9.8L6 8.1L3.1 9.8L3.9 6.6L1.5 4.5L4.8 4.2L6 1Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function Avatar({ initials, color, size = 54, foto }) {
  if (foto) return (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
      <img src={foto} alt={initials} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: size * 0.28, color: "#fff", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, fontSize: "0.65rem", fontWeight: 700, fontFamily: "'Sora', sans-serif", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
      {cfg.label}
    </span>
  );
}

// ─── ACTION BUTTON com navegação ──────────────────────────────────────────────
function ActionButton({ type, onClick }) {
  const router = useRouter();

  const configs = {
    detalhes:              { label: "Ver detalhes",           style: "primary" },
    conversar:             { label: "Conversar",              style: "outline", icon: <ChatIcon /> },
    pagamento:             { label: "Realizar pagamento",     style: "warning" },
    andamento:             { label: "Ver andamento",          style: "outline" },
    novamente:             { label: "Solicitar novamente",    style: "outline" },
    avaliar:               { label: "Avaliar Prestador",      style: "outline" },
    ver_avaliacao:         { label: "Ver avaliação",          style: "outline" },
    cancelar:              { label: "Cancelar solicitação",   style: "danger"  },
    interessados:          { label: "Ver interessados",       style: "outline" },
    cancelar_oportunidade: { label: "Cancelar oportunidade",  style: "danger"  },
  };

  const cfg = configs[type] || { label: type, style: "outline" };
  const styles = {
    primary: { background: "#111827", color: "#fff",    border: "1.5px solid #111827" },
    warning: { background: "#FBBF24", color: "#111827", border: "1.5px solid #FBBF24" },
    outline: { background: "#fff",    color: "#374151", border: "1.5px solid #E5E7EB" },
    danger:  { background: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FECACA" },
  };

  const handleClick = () => {
    if (type === "cancelar" || type === "cancelar_oportunidade") {
      router.push("/Pages/Cancelamento_cliente");
      return;
    }
    if (type === "pagamento") {
      router.push("/Pages/Pagamento_cliente");
      return;
    }
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      style={{ ...styles[cfg.style], borderRadius: 8, padding: "8px 14px", fontSize: "0.78rem", fontWeight: 600, fontFamily: "'Sora', sans-serif", cursor: "pointer", transition: "all 0.18s ease", whiteSpace: "nowrap", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.82"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
    >
      {cfg.icon && cfg.icon}
      {cfg.label}
    </button>
  );
}

function RatingStars({ value, onChange, size = 26 }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          style={{ border: 0, background: "transparent", color: star <= value ? "#F59E0B" : "#D1D5DB", fontSize: size, cursor: onChange ? "pointer" : "default", lineHeight: 1 }}
          aria-label={`${star} estrela${star > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function AvaliacaoModal({ solicitacao, avaliacao, onClose, onSubmit }) {
  const [nota, setNota] = useState(avaliacao?.nota || 5);
  const [criterios, setCriterios] = useState(avaliacao?.criterios || {
    qualidade: 5,
    pontualidade: 5,
    comunicacao: 5,
    profissionalismo: 5,
  });
  const [comentario, setComentario] = useState(avaliacao?.comentario || "");
  const readonly = Boolean(avaliacao);
  const criteriosLabels = [
    ["qualidade", "Qualidade do serviço"],
    ["pontualidade", "Pontualidade"],
    ["comunicacao", "Comunicação"],
    ["profissionalismo", "Profissionalismo"],
  ];

  const handleSubmit = () => {
    onSubmit({
      nota,
      criterios,
      comentario,
      data: new Date().toLocaleDateString("pt-BR"),
    });
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={(event) => event.stopPropagation()} style={{ width: "100%", maxWidth: 820, maxHeight: "92vh", overflowY: "auto", background: "#fff", borderRadius: 16, boxShadow: "0 24px 70px rgba(0,0,0,0.2)", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ padding: "22px 26px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h2 style={{ margin: 0, color: "#0A0B2D", fontFamily: "'Sora', sans-serif", fontSize: "1.25rem" }}>{readonly ? "Avaliação enviada" : "Avaliar Prestador"}</h2>
            <p style={{ margin: "6px 0 0", color: "#6B7280", fontSize: "0.84rem" }}>As avaliações são anônimas para ambas as partes.</p>
          </div>
          <button onClick={onClose} style={{ width: 34, height: 34, border: 0, borderRadius: 8, background: "#F9FAFB", color: "#6B7280", cursor: "pointer", fontSize: 20 }}>×</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 20, padding: 26 }}>
          <aside style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: 18, background: "#FBFCFE" }}>
            <h3 style={{ margin: "0 0 14px", fontFamily: "'Sora', sans-serif", fontSize: "0.88rem", color: "#0A0B2D" }}>Resumo da contratação</h3>
            {[
              ["Serviço", solicitacao.servico],
              ["Data do serviço", solicitacao.data],
              ["Valor do serviço", solicitacao.valor],
              ["Código da solicitação", `#SOL-${String(solicitacao.id).padStart(6, "0")}`],
            ].map(([label, value]) => (
              <div key={label} style={{ marginBottom: 12 }}>
                <div style={{ color: "#9CA3AF", fontSize: "0.7rem", fontWeight: 700 }}>{label}</div>
                <div style={{ color: "#111827", fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.35 }}>{value}</div>
              </div>
            ))}
          </aside>
          <section>
            <div style={{ marginBottom: 18 }}>
              <h3 style={{ margin: "0 0 8px", fontFamily: "'Sora', sans-serif", fontSize: "0.9rem", color: "#0A0B2D" }}>Nota geral</h3>
              <RatingStars value={nota} onChange={readonly ? null : setNota} size={30} />
            </div>
            <div style={{ border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", marginBottom: 18 }}>
              {criteriosLabels.map(([key, label]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "12px 14px", borderBottom: key === "profissionalismo" ? 0 : "1px solid #F3F4F6" }}>
                  <span style={{ color: "#374151", fontSize: "0.82rem", fontWeight: 700 }}>{label}</span>
                  <RatingStars value={criterios[key]} onChange={readonly ? null : (value) => setCriterios((current) => ({ ...current, [key]: value }))} size={20} />
                </div>
              ))}
            </div>
            <label style={{ display: "block", color: "#374151", fontSize: "0.82rem", fontWeight: 700, marginBottom: 8 }}>Comentário opcional</label>
            <textarea
              value={comentario}
              onChange={(event) => setComentario(event.target.value.slice(0, 500))}
              disabled={readonly}
              placeholder="Compartilhe sua experiência..."
              style={{ width: "100%", minHeight: 110, resize: "vertical", border: "1px solid #E5E7EB", borderRadius: 12, padding: 14, fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", outline: "none" }}
            />
            <div style={{ textAlign: "right", color: "#6B7280", fontSize: "0.72rem", marginTop: 4 }}>{comentario.length}/500</div>
            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
              <button onClick={onClose} style={{ flex: 1, padding: "12px 14px", borderRadius: 10, border: "1.5px solid #D1D5DB", background: "#fff", color: "#374151", fontWeight: 800, cursor: "pointer" }}>Cancelar</button>
              {!readonly && (
                <button onClick={handleSubmit} style={{ flex: 1.4, padding: "12px 14px", borderRadius: 10, border: "1.5px solid #0A0B2D", background: "#0A0B2D", color: "#fff", fontWeight: 800, cursor: "pointer" }}>Enviar Avaliação</button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SolicitacaoCard({ item, delay, onVerDetalhes, onAvaliar, avaliacao }) {
  const statusCfg = STATUS_CONFIG[item.status];
  const isNewDirect = item.origem === "Solicitação Direta" && item.nova;
  const isOpportunity = item.tipo === "oportunidade";
  const isClosed = item.status === "Concluída" || item.status === "Encerrada";
  const actions = isClosed && !isOpportunity ? ["detalhes", avaliacao ? "ver_avaliacao" : "avaliar"] : item.acoes;
  return (
    <div
      className="card-in"
      style={{
        animationDelay: `${delay}ms`,
        display: "grid",
        gridTemplateColumns: "88px 1fr 200px 168px",
        gap: "0 20px",
        alignItems: "center",
        background: isOpportunity ? "#FFFBF7" : isNewDirect ? "#FFFBF7" : "#fff",
        border: `1px solid ${isOpportunity ? "#FED7AA" : isNewDirect ? "#FED7AA" : "#F3F4F6"}`,
        borderLeft: `4px solid ${statusCfg.color}`,
        borderRadius: 14,
        padding: "20px 22px",
        boxShadow: isNewDirect ? "0 10px 28px rgba(241, 103, 15, 0.1)" : "0 1px 4px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.2s, transform 0.2s",
        position: "relative",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Coluna 1 — Avatar */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
        {isOpportunity ? (
          <div style={{ width: 54, height: 54, borderRadius: "50%", background: "#FFF7ED", color: "#F1670F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "0.9rem", boxShadow: "0 2px 8px rgba(241,103,15,0.14)" }}>
            <FaBullhorn size={22} />
          </div>
        ) : (
          <>
            <Avatar initials={item.prestador.avatar} color={item.prestador.avatarColor} foto={item.prestador.foto} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>{item.prestador.nome}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "center", marginTop: 3 }}>
                <StarIcon />
                <span style={{ fontSize: "0.7rem", color: "#92400E", fontWeight: 600 }}>{item.prestador.avaliacao}</span>
              </div>
              <div style={{ fontSize: "0.62rem", color: "#9CA3AF", marginTop: 1 }}>({item.prestador.avaliacoes} avaliações)</div>
            </div>
          </>
        )}
      </div>

      {/* Coluna 2 — Serviço */}
      <div>
        {isOpportunity && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 8, padding: "4px 9px", borderRadius: 999, background: "#FFF7ED", border: "1px solid #FED7AA", color: "#F1670F", fontSize: "0.62rem", fontWeight: 700, fontFamily: "'Sora', sans-serif", letterSpacing: "0.02em" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F1670F" }} />
            Oportunidade publicada
          </span>
        )}
        {isNewDirect && !isOpportunity && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 8, padding: "4px 9px", borderRadius: 999, background: "#FFF7ED", border: "1px solid #FED7AA", color: "#F1670F", fontSize: "0.62rem", fontWeight: 700, fontFamily: "'Sora', sans-serif", letterSpacing: "0.02em" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F1670F" }} />
            Nova solicitação direta
          </span>
        )}
        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.98rem", color: "#111827", marginBottom: 3 }}>{item.servico}</div>
        <div style={{ fontSize: "0.78rem", color: "#6B7280", marginBottom: 12 }}>{item.descricao}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.74rem", color: "#6B7280" }}><LocationIcon /> {item.local}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.74rem", color: "#6B7280" }}><CalendarIcon /> {item.data}</div>
          {isOpportunity && (
            <div style={{ fontSize: "0.74rem", color: "#F1670F", fontWeight: 700 }}>
              Interessados: {item.interessadosCount || 0} prestadores
            </div>
          )}
        </div>
      </div>

      {/* Coluna 3 — Status */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <StatusBadge status={item.status} />
        <p style={{ fontSize: "0.74rem", color: "#6B7280", lineHeight: 1.55, margin: 0 }}>{item.statusMsg}</p>
        {isClosed && !isOpportunity && (
          <p style={{ fontSize: "0.72rem", color: avaliacao ? "#16A34A" : "#F1670F", lineHeight: 1.45, margin: 0, fontWeight: 700 }}>
            {avaliacao ? "✓ Avaliação enviada" : "Você ainda não avaliou este serviço."}
          </p>
        )}
      </div>

      {/* Coluna 4 — Valor + Ações */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.66rem", color: "#9CA3AF", marginBottom: 2 }}>{item.valorLabel}</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#111827" }}>{item.valor}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
          {actions.map((acao) => (
            <ActionButton
              key={acao}
              type={acao}
              onClick={
                acao === "detalhes" || acao === "interessados"
                  ? () => onVerDetalhes(acao)
                  : acao === "avaliar" || acao === "ver_avaliacao"
                  ? () => onAvaliar(item, acao === "ver_avaliacao")
                  : () => {}
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OpportunityDetailsModal({ oportunidade, initialView = "detalhes", onClose }) {
  const router = useRouter();
  const cfg = STATUS_CONFIG[oportunidade.status] || STATUS_CONFIG.Nova;
  const interessados = oportunidade.interessados || [];
  const showInterestedFirst = initialView === "interessados";

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(0,0,0,0.45)", fontFamily: "'DM Sans', sans-serif" }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{ width: "100%", maxWidth: 980, maxHeight: "90vh", overflowY: "auto", background: "#FFFFFF", borderRadius: 16, boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}
      >
        <div style={{ padding: "24px 28px 16px", borderBottom: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.35rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                Detalhes da Oportunidade
              </h2>
              <p style={{ fontSize: "0.8rem", color: "#9CA3AF", margin: "6px 0 0" }}>ID da oportunidade: {oportunidade.id}</p>
            </div>
            <button onClick={onClose} style={{ width: 34, height: 34, border: 0, borderRadius: 8, background: "#F9FAFB", color: "#6B7280", cursor: "pointer", fontSize: 20 }}>
              ×
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, background: "#F9FAFB", borderRadius: 10, padding: "10px 16px", border: "1px solid #F3F4F6" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, fontSize: "0.72rem", fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.color, display: "inline-block" }} />
              {cfg.label}
            </span>
            <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>
              Última atualização: {oportunidade.ultimaAtualizacao || "Agora"}
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 320px", gap: 0 }}>
          <div style={{ padding: "24px 28px", borderRight: "1px solid #F3F4F6" }}>
            <section style={{ border: "1px solid #F3F4F6", borderRadius: 12, padding: 20, marginBottom: 18 }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.95rem", margin: "0 0 16px", color: "#111827" }}>Dados da oportunidade</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                {[
                  ["Categoria", oportunidade.categoria],
                  ["Valor estimado", oportunidade.valorEstimado],
                  ["Localização", oportunidade.local],
                  ["Data e horário", oportunidade.data],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "grid", gap: 5, minWidth: 0, padding: "12px 14px", borderRadius: 10, background: "#F9FAFB", border: "1px solid #F3F4F6" }}>
                    <small style={{ display: "block", color: "#9CA3AF", fontSize: "0.7rem", fontWeight: 600 }}>{label}</small>
                    <strong style={{ display: "block", color: "#111827", fontSize: "0.88rem", lineHeight: 1.35, overflowWrap: "anywhere" }}>{value}</strong>
                  </div>
                ))}
              </div>
              <p style={{ margin: "16px 0 0", color: "#374151", fontSize: "0.84rem", lineHeight: 1.55 }}>{oportunidade.descricao}</p>
              {oportunidade.observacoes && (
                <p style={{ margin: "10px 0 0", color: "#6B7280", fontSize: "0.78rem", lineHeight: 1.5 }}>
                  <strong>Observações:</strong> {oportunidade.observacoes}
                </p>
              )}
            </section>

            <section style={{ border: `1px solid ${showInterestedFirst ? "#FED7AA" : "#F3F4F6"}`, borderRadius: 12, padding: 20, boxShadow: showInterestedFirst ? "0 12px 26px rgba(241,103,15,0.08)" : "none" }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.95rem", margin: "0 0 16px", color: "#111827" }}>Interessados</h3>
              {interessados.length === 0 ? (
                <div style={{ padding: 16, borderRadius: 10, background: "#FFF7ED", border: "1px solid #FED7AA", color: "#F1670F", fontSize: "0.82rem", fontWeight: 700 }}>
                  Aguardando interesse de profissionais.
                </div>
              ) : (
                interessados.map((interessado) => (
                  <div key={interessado.nome} style={{ display: "grid", gridTemplateColumns: "44px minmax(0, 1fr) auto", gap: 12, alignItems: "center", padding: "12px 0", borderTop: "1px solid #F3F4F6" }}>
                    <Avatar initials={interessado.nome?.slice(0, 2) || "PR"} foto={interessado.foto} size={44} color="#0A0B2D" />
                    <div style={{ minWidth: 0 }}>
                      <strong style={{ display: "block", color: "#111827", fontSize: "0.86rem", fontFamily: "'Sora', sans-serif" }}>{interessado.nome}</strong>
                      <span style={{ display: "block", color: "#6B7280", fontSize: "0.74rem", marginTop: 2 }}>{interessado.profissao}</span>
                      <span style={{ display: "block", color: "#6B7280", fontSize: "0.72rem", marginTop: 4 }}>
                        {interessado.avaliacao} ({interessado.avaliacoes} avaliações) • {interessado.distancia}
                      </span>
                      <p style={{ margin: "7px 0 0", color: "#4B5563", fontSize: "0.74rem", lineHeight: 1.45 }}>{interessado.mensagem}</p>
                    </div>
                    <div style={{ textAlign: "right", display: "grid", gap: 8, justifyItems: "end" }}>
                      <strong style={{ color: "#F1670F", fontSize: "0.84rem", fontFamily: "'Sora', sans-serif" }}>{interessado.valor}</strong>
                      <button style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #D1D5DB", background: "#FFFFFF", color: "#0A0B2D", fontWeight: 700, fontSize: "0.72rem", cursor: "pointer" }}>
                        Ver perfil
                      </button>
                      <button style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #0A0B2D", background: "#0A0B2D", color: "#fff", fontWeight: 700, fontSize: "0.72rem", cursor: "pointer" }}>
                        Aceitar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>

          <aside style={{ padding: 24 }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.92rem", fontWeight: 700, color: "#111827", margin: "0 0 20px" }}>Histórico</h3>
            {(oportunidade.timeline || []).map((item, index) => (
              <div key={`${item.status}-${index}`} style={{ display: "flex", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: item.done ? "#F1670F" : item.active ? "#0A0B2D" : "#E5E7EB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                    {item.done ? "✓" : ""}
                  </div>
                  {index < (oportunidade.timeline || []).length - 1 && <div style={{ width: 2, flex: 1, minHeight: 30, background: item.done ? "#F1670F" : "#E5E7EB", margin: "4px 0" }} />}
                </div>
                <div style={{ paddingBottom: 18 }}>
                  <strong style={{ display: "block", color: item.active ? "#0A0B2D" : "#111827", fontSize: "0.84rem" }}>{item.status}</strong>
                  {item.data && <span style={{ display: "block", color: "#9CA3AF", fontSize: "0.72rem", marginTop: 2 }}>{item.data}</span>}
                  <p style={{ margin: "4px 0 0", color: "#6B7280", fontSize: "0.76rem", lineHeight: 1.45 }}>{item.desc}</p>
                </div>
              </div>
            ))}

            <button
              onClick={() => router.push("/Pages/Cancelamento_cliente")}
              style={{ width: "100%", marginTop: 10, padding: "11px 14px", borderRadius: 8, border: "1.5px solid #FECACA", background: "#FEF2F2", color: "#DC2626", fontWeight: 700, cursor: "pointer" }}
            >
              Cancelar oportunidade
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE CONTENT ─────────────────────────────────────────────────────────────
function PageContent() {
  const [activeTab, setActiveTab] = useState("Todas");
  const [search, setSearch]       = useState("");
  const [page, setPage]           = useState(1);
  const [extraSolicitacoes] = useState(loadExtraSolicitacoes);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(() => getInitialOpenSolicitacao(extraSolicitacoes));
  const [opportunityModalView, setOpportunityModalView] = useState("detalhes");
  const [avaliacoes, setAvaliacoes] = useState({});
  const [avaliacaoModal, setAvaliacaoModal] = useState(null);

  const PER_PAGE = 6;
  const solicitacoes = useMemo(() => [...extraSolicitacoes, ...SOLICITACOES], [extraSolicitacoes]);

  const filtered = solicitacoes.filter((s) => {
    const matchTab    = activeTab === "Todas" || s.status === activeTab;
    const termo = search.toLowerCase();
    const prestadorNome = s.prestador?.nome || "";
    const matchSearch = !search || s.servico.toLowerCase().includes(termo) || prestadorNome.toLowerCase().includes(termo) || s.status.toLowerCase().includes(termo);
    return matchTab && matchSearch;
  });

  const openDetails = (item, view = "detalhes") => {
    setOpportunityModalView(view);
    setSolicitacaoSelecionada(item);
  };

  const closeDetails = () => {
    setSolicitacaoSelecionada(null);
    setOpportunityModalView("detalhes");
  };

  const openAvaliacao = (item) => {
    setAvaliacaoModal(item);
  };

  const saveAvaliacao = (avaliacao) => {
    setAvaliacoes((current) => ({ ...current, [avaliacaoModal.id]: avaliacao }));
    setAvaliacaoModal(null);
  };

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const getTabCount = (key) => key === "Todas" ? solicitacoes.length : solicitacoes.filter((s) => s.status === key).length;

  return (
    <>
      <div style={{ flex: 1, overflowY: "auto", background: "#F9FAFB", fontFamily: "'DM Sans', sans-serif", color: "#111827" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "36px 24px 60px" }}>

          {/* Header */}
          <div className="page-in" style={{ marginBottom: 28 }}>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.75rem", fontWeight: 700, color: "#111827", margin: 0, marginBottom: 5 }}>
              Minhas Solicitações
            </h1>
            <p style={{ fontSize: "0.86rem", color: "#6B7280", margin: 0 }}>
              Acompanhe todas as suas solicitações de serviços.
            </p>
          </div>

          {/* Search + Filtros */}
          <div className="page-in" style={{ animationDelay: "50ms", display: "flex", gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: "0.95rem", color: "#9CA3AF" }}>🔍</span>
              <input
                type="text"
                placeholder="Pesquisar por serviço, prestador ou status..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={{ width: "100%", padding: "12px 16px 12px 42px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, fontSize: "0.88rem", color: "#111827", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", transition: "border-color 0.2s, box-shadow 0.2s" }}
                onFocus={(e)  => { e.target.style.borderColor = "#6B7280"; e.target.style.boxShadow = "0 0 0 3px rgba(107,114,128,0.1)"; }}
                onBlur={(e)   => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; }}
              />
            </div>
            <button
              style={{ padding: "12px 20px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, color: "#374151", fontSize: "0.86rem", fontWeight: 500, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 7, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#6B7280"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#E5E7EB"}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
              </svg>
              Filtros
            </button>
          </div>

          {/* Tabs */}
          <div className="page-in" style={{ animationDelay: "80ms", display: "flex", gap: 6, marginBottom: 22, flexWrap: "wrap" }}>
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              const count    = getTabCount(tab.key);
              const cfg      = STATUS_CONFIG[tab.key];
              return (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key); setPage(1); }}
                  style={{ padding: "7px 14px", borderRadius: 20, fontSize: "0.78rem", fontWeight: isActive ? 700 : 500, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "all 0.18s ease", background: isActive ? (tab.key === "Todas" ? "#111827" : cfg.color) : "#fff", color: isActive ? "#fff" : "#6B7280", border: isActive ? `1.5px solid ${tab.key === "Todas" ? "#111827" : cfg.color}` : "1.5px solid #E5E7EB", boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.15)" : "0 1px 2px rgba(0,0,0,0.04)" }}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {paginated.length === 0 ? (
              <div style={{ textAlign: "center", padding: "64px 20px", background: "#fff", borderRadius: 14, border: "1px solid #F3F4F6", color: "#9CA3AF", fontSize: "0.9rem" }}>
                Nenhuma solicitação encontrada.
              </div>
            ) : (
              paginated.map((item, i) => (
                <SolicitacaoCard
                  key={item.id}
                  item={item}
                  delay={i * 55}
                  avaliacao={avaliacoes[item.id]}
                  onAvaliar={openAvaliacao}
                  onVerDetalhes={(acao) => openDetails(item, acao === "interessados" ? "interessados" : "detalhes")}
                />
              ))
            )}
          </div>

          {/* Paginação */}
          <div className="page-in" style={{ animationDelay: "200ms", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
            <span style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>
              Mostrando {Math.min((page - 1) * PER_PAGE + 1, filtered.length)} a {Math.min(page * PER_PAGE, filtered.length)} de {filtered.length} solicitações
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={{ width: 34, height: 34, borderRadius: 8, background: "#fff", border: "1px solid #E5E7EB", color: page === 1 ? "#D1D5DB" : "#374151", fontSize: "0.9rem", cursor: page === 1 ? "not-allowed" : "pointer", fontWeight: 600 }}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{ width: 34, height: 34, borderRadius: 8, background: p === page ? "#111827" : "#fff", border: `1px solid ${p === page ? "#111827" : "#E5E7EB"}`, color: p === page ? "#fff" : "#374151", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>
                  {p}
                </button>
              ))}
              <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)} style={{ width: 34, height: 34, borderRadius: 8, background: "#fff", border: "1px solid #E5E7EB", color: page === totalPages || totalPages === 0 ? "#D1D5DB" : "#374151", fontSize: "0.9rem", cursor: page === totalPages || totalPages === 0 ? "not-allowed" : "pointer", fontWeight: 600 }}>›</button>
            </div>
          </div>

        </div>
      </div>

      {solicitacaoSelecionada && (
        solicitacaoSelecionada.tipo === "oportunidade" ? (
          <OpportunityDetailsModal oportunidade={solicitacaoSelecionada} initialView={opportunityModalView} onClose={closeDetails} />
        ) : (
          <DetalhesModal solicitacao={{ ...solicitacaoSelecionada, avaliacaoEnviada: avaliacoes[solicitacaoSelecionada.id] }} onClose={closeDetails} />
        )
      )}
      {avaliacaoModal && (
        <AvaliacaoModal
          solicitacao={avaliacaoModal}
          avaliacao={avaliacoes[avaliacaoModal.id]}
          onClose={() => setAvaliacaoModal(null)}
          onSubmit={saveAvaliacao}
        />
      )}
    </>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function MinhasSolicitacoes() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        html, body, #__next { margin: 0; padding: 0; width: 100%; }
        * { box-sizing: border-box; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .page-in { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .card-in { animation: fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #F3F4F6; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 10px; }
        input::placeholder { color: #9CA3AF; }
        input:focus { outline: none; }
      `}</style>

      <div style={{ display: "flex", width: "100%", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI', sans-serif" }}>

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

          {/* TOPBAR */}
          <Topbar />

          {/* PAGE CONTENT */}
          <PageContent />

        </div>
      </div>
    </>
  );
}