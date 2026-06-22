"use client";

import Sidebar from "../../components/SideBar_cliente";
import Topbar  from "../../components/TopBar_cliente";
import { useState } from "react";
import DetalhesModal from "./Modal_Detalhes_Cliente";

const STATUS_CONFIG = {
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

const TABS = [
  { label: "Todas",                key: "Todas" },
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

function ActionButton({ type, onClick }) {
  const configs = {
    detalhes:  { label: "Ver detalhes",         style: "primary" },
    conversar: { label: "Conversar",            style: "outline", icon: <ChatIcon /> },
    pagamento: { label: "Realizar pagamento",   style: "warning" },
    andamento: { label: "Ver andamento",        style: "outline" },
    novamente: { label: "Solicitar novamente",  style: "outline" },
    avaliar:   { label: "Avaliar serviço",      style: "outline" },
    cancelar:  { label: "Cancelar solicitação", style: "danger" },
  };
  const cfg = configs[type] || { label: type, style: "outline" };
  const styles = {
    primary: { background: "#111827", color: "#fff",    border: "1.5px solid #111827" },
    warning: { background: "#FBBF24", color: "#111827", border: "1.5px solid #FBBF24" },
    outline: { background: "#fff",    color: "#374151", border: "1.5px solid #E5E7EB" },
    danger:  { background: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FECACA" },
  };
  return (
    <button
      onClick={onClick}
      style={{ ...styles[cfg.style], borderRadius: 8, padding: "8px 14px", fontSize: "0.78rem", fontWeight: 600, fontFamily: "'Sora', sans-serif", cursor: "pointer", transition: "all 0.18s ease", whiteSpace: "nowrap", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.82"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
    >
      {cfg.icon && cfg.icon}
      {cfg.label}
    </button>
  );
}

function SolicitacaoCard({ item, delay, onVerDetalhes }) {
  const statusCfg = STATUS_CONFIG[item.status];
  return (
    <div
      className="card-in"
      style={{ animationDelay: `${delay}ms`, display: "grid", gridTemplateColumns: "88px 1fr 200px 168px", gap: "0 20px", alignItems: "center", background: "#fff", border: "1px solid #F3F4F6", borderLeft: `4px solid ${statusCfg.color}`, borderRadius: 14, padding: "20px 22px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", transition: "box-shadow 0.2s, transform 0.2s" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Coluna 1 — Avatar */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
        <Avatar initials={item.prestador.avatar} color={item.prestador.avatarColor} foto={item.prestador.foto} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>{item.prestador.nome}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "center", marginTop: 3 }}>
            <StarIcon />
            <span style={{ fontSize: "0.7rem", color: "#92400E", fontWeight: 600 }}>{item.prestador.avaliacao}</span>
          </div>
          <div style={{ fontSize: "0.62rem", color: "#9CA3AF", marginTop: 1 }}>({item.prestador.avaliacoes} avaliações)</div>
        </div>
      </div>

      {/* Coluna 2 — Serviço */}
      <div>
        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.98rem", color: "#111827", marginBottom: 3 }}>{item.servico}</div>
        <div style={{ fontSize: "0.78rem", color: "#6B7280", marginBottom: 12 }}>{item.descricao}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.74rem", color: "#6B7280" }}><LocationIcon /> {item.local}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.74rem", color: "#6B7280" }}><CalendarIcon /> {item.data}</div>
        </div>
      </div>

      {/* Coluna 3 — Status */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <StatusBadge status={item.status} />
        <p style={{ fontSize: "0.74rem", color: "#6B7280", lineHeight: 1.55, margin: 0 }}>{item.statusMsg}</p>
      </div>

      {/* Coluna 4 — Valor + Ações */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.66rem", color: "#9CA3AF", marginBottom: 2 }}>{item.valorLabel}</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#111827" }}>{item.valor}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
          {item.acoes.map((acao) => (
            <ActionButton key={acao} type={acao} onClick={acao === "detalhes" ? onVerDetalhes : () => {}} />
          ))}
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
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);

  const PER_PAGE = 6;

  const filtered = SOLICITACOES.filter((s) => {
    const matchTab    = activeTab === "Todas" || s.status === activeTab;
    const matchSearch = !search || s.servico.toLowerCase().includes(search.toLowerCase()) || s.prestador.nome.toLowerCase().includes(search.toLowerCase()) || s.status.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const getTabCount = (key) => key === "Todas" ? SOLICITACOES.length : SOLICITACOES.filter((s) => s.status === key).length;

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
                <SolicitacaoCard key={item.id} item={item} delay={i * 55} onVerDetalhes={() => setSolicitacaoSelecionada(item)} />
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
        <DetalhesModal solicitacao={solicitacaoSelecionada} onClose={() => setSolicitacaoSelecionada(null)} />
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