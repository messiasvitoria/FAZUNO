"use client"

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
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
  { id: 1,  prestador: { nome: "João Silva",      avaliacao: 4.8, avaliacoes: 32,  avatar: "JS", avatarColor: "#2563EB" }, servico: "Instalação de TV",             descricao: "Instalar TV 55 polegadas na parede da sala.",        local: "Moema, São Paulo – SP",       data: "20/05/2024 às 14:30", status: "Aceita",                 statusMsg: "O prestador aceitou sua solicitação. Aguarde o início do serviço.",                             valorLabel: "Valor estimado",   valor: "R$ 180,00", acoes: ["detalhes", "conversar"] },
  { id: 2,  prestador: { nome: "Ana Caroline",    avaliacao: 5.0, avaliacoes: 18,  avatar: "AC", avatarColor: "#7C3AED" }, servico: "Limpeza Residencial",          descricao: "Limpeza completa de apartamento 80m².",              local: "Vila Mariana, São Paulo – SP", data: "18/05/2024 às 10:15", status: "Aguardando Pagamento",   statusMsg: "O prestador aceitou sua solicitação. Realize o pagamento para iniciar o serviço.",             valorLabel: "Valor do serviço", valor: "R$ 220,00", acoes: ["pagamento", "conversar", "detalhes"] },
  { id: 3,  prestador: { nome: "Amancio Silva",   avaliacao: 4.8, avaliacoes: 45,  avatar: "AS", avatarColor: "#EA580C" }, servico: "Reparo Hidráulico",            descricao: "Conserto de vazamento no banheiro.",                 local: "Santo André, São Paulo – SP",  data: "15/05/2024 às 09:00", status: "Em Andamento",           statusMsg: "O serviço está em andamento. Acompanhe o progresso.",                                          valorLabel: "Valor do serviço", valor: "R$ 150,00", acoes: ["andamento", "conversar"] },
  { id: 4,  prestador: { nome: "Lúcia Carvalho",  avaliacao: 5.0, avaliacoes: 27,  avatar: "LC", avatarColor: "#16A34A" }, servico: "Pintura de Parede",            descricao: "Pintura de 2 quartos e sala.",                       local: "Ipiranga, São Paulo – SP",     data: "10/05/2024 às 16:20", status: "Concluída",              statusMsg: "Serviço concluído em 12/05/2024 às 17:40",                                                    valorLabel: "Valor do serviço", valor: "R$ 320,00", acoes: ["novamente", "avaliar"] },
  { id: 5,  prestador: { nome: "Ricardo Almeida", avaliacao: 4.7, avaliacoes: 16,  avatar: "RA", avatarColor: "#0284C7" }, servico: "Troca de Tomadas",             descricao: "Trocar 3 tomadas danificadas.",                      local: "Tatuapé, São Paulo – SP",      data: "08/05/2024 às 11:40", status: "Solicitação Enviada",   statusMsg: "Aguardando o prestador analisar sua solicitação.",                                            valorLabel: "Valor estimado",   valor: "R$ 120,00", acoes: ["cancelar"] },
  { id: 6,  prestador: { nome: "Fernanda Lima",   avaliacao: 4.9, avaliacoes: 52,  avatar: "FL", avatarColor: "#CA8A04" }, servico: "Instalação de Ar-condicionado",descricao: "Instalar ar-condicionado split 12.000 BTUs.",        local: "Pinheiros, São Paulo – SP",    data: "05/05/2024 às 13:00", status: "Em Análise",            statusMsg: "O prestador está analisando sua solicitação.",                                                valorLabel: "Valor estimado",   valor: "R$ 280,00", acoes: ["cancelar"] },
  { id: 7,  prestador: { nome: "Carlos Mendes",   avaliacao: 4.6, avaliacoes: 11,  avatar: "CM", avatarColor: "#DC2626" }, servico: "Conserto de Portão",           descricao: "Reparo no motor do portão automático.",              local: "Santana, São Paulo – SP",      data: "02/05/2024 às 08:30", status: "Cancelada",             statusMsg: "Solicitação cancelada pelo cliente.",                                                         valorLabel: "Valor estimado",   valor: "R$ 200,00", acoes: ["novamente"] },
];

const TABS_SOL = [
  { label: "Todas",                key: "Todas" },
  { label: "Solicitação Enviada",  key: "Solicitação Enviada" },
  { label: "Em Análise",           key: "Em Análise" },
  { label: "Aceita",               key: "Aceita" },
  { label: "Aguardando Pagamento", key: "Aguardando Pagamento" },
  { label: "Em Andamento",         key: "Em Andamento" },
  { label: "Concluídas",           key: "Concluída" },
  { label: "Canceladas",           key: "Cancelada" },
];

// nav items — índice 2 = Minhas solicitações (ativo), índice 0 = Início (volta)
const navItems = [
  { icon: "home", label: "Início" },
  { icon: "plus", label: "Abrir novas solicitações" },
  { icon: "list", label: "Minhas solicitações" },
  { icon: "chat", label: "Chat" },
];

const filters = ["Todas", "Não lidas", "Solicitações", "Serviços", "Pagamentos"];
const filterKey = (label, index) => {
  if (index === 0) return "todas";
  if (index === 1) return "não_lidas";
  return label.toLowerCase();
};

const allNotifs = [
  { id: 1,  icon: "doc",     title: "Serviço Aceito",                      desc: "O prestador João Silva aceitou sua solicitação de Instalação de Ar Condicionado.",  time: "Há 5 min",       sortOrder: 1,  unread: true,  category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 2,  icon: "chat",    title: "Nova Mensagem",                        desc: "Você recebeu uma nova mensagem do prestador João Silva.",                           time: "Há 20 min",      sortOrder: 2,  unread: true,  category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 3,  icon: "payment", title: "Pagamento Aprovado",                   desc: "Seu pagamento de R$ 350,00 foi aprovado com sucesso.",                             time: "Há 1 hora",      sortOrder: 3,  unread: true,  category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
  { id: 4,  icon: "star",    title: "Avalie seu Serviço",                   desc: "Seu serviço de Limpeza Residencial foi concluído. Conte como foi sua experiência!", time: "Ontem às 10:30", sortOrder: 6,  unread: false, category: "serviços",     iconColor: "#f59e0b", iconBg: "#fef3c7" },
  { id: 5,  icon: "eye",     title: "Prestador Visualizou sua Solicitação", desc: "O prestador Maria Santos visualizou sua solicitação de Pintura Residencial.",      time: "Ontem às 09:15", sortOrder: 7,  unread: false, category: "solicitações", iconColor: "#f97316", iconBg: "#ffedd5" },
  { id: 6,  icon: "doc",     title: "Serviço Concluído",                    desc: "Carlos Lima marcou o serviço de Reparo Elétrico como concluído. Tudo certo?",       time: "Ontem às 14:00", sortOrder: 5,  unread: false, category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 7,  icon: "chat",    title: "Nova Mensagem",                        desc: "Ana Faxineira enviou uma mensagem: 'Posso chegar às 8h amanhã?'",                   time: "Há 2 dias",      sortOrder: 8,  unread: false, category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 8,  icon: "payment", title: "Cobrança Gerada",                      desc: "Foi gerada uma cobrança de R$ 180,00 pelo serviço de Encanamento.",               time: "Há 2 dias",      sortOrder: 9,  unread: false, category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
  { id: 9,  icon: "star",    title: "Avalie seu Serviço",                   desc: "Seu serviço de Instalação de Prateleiras foi concluído.",                           time: "Há 3 dias",      sortOrder: 10, unread: false, category: "serviços",     iconColor: "#f59e0b", iconBg: "#fef3c7" },
  { id: 10, icon: "doc",     title: "Novo Prestador Disponível",            desc: "Roberto Souza está disponível para sua solicitação de Pintura de Quarto.",          time: "Há 3 dias",      sortOrder: 11, unread: false, category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 11, icon: "chat",    title: "Nova Mensagem",                        desc: "Fernanda Pintora enviou fotos do trabalho finalizado para sua aprovação.",          time: "Há 4 dias",      sortOrder: 12, unread: false, category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 12, icon: "payment", title: "Reembolso Processado",                 desc: "Seu reembolso de R$ 90,00 foi processado e será creditado em até 5 dias úteis.",  time: "Há 5 dias",      sortOrder: 13, unread: false, category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
].sort((a, b) => a.sortOrder - b.sortOrder);

// ─── ICON ─────────────────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    home:      ["M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z","M9 21V12h6v9"],
    plus:      ["M12 5v14","M5 12h14"],
    list:      ["M8 6h13","M8 12h13","M8 18h13","M3 6h.01","M3 12h.01","M3 18h.01"],
    chat:      ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
    bell:      ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"],
    help:      ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3","M12 17h.01"],
    settings:  ["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
    chevDown:  ["M6 9l6 6 6-6"],
    chevRight: ["M9 18l6-6-6-6"],
    xIcon:     ["M18 6L6 18","M6 6l12 12"],
    externalLink:["M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6","M15 3h6v6","M10 14L21 3"],
    clock:     ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M12 6v6l4 2"],
    star:      null,
  };
  if (name === "star") {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  }
  const d = paths[name];
  if (!d || d.length === 0) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p}/>)}
    </svg>
  );
}

// ─── NOTIF ICON ───────────────────────────────────────────────────────────────
function NotifIcon({ icon, iconColor }) {
  if (icon === "doc")     return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
  if (icon === "chat")    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
  if (icon === "payment") return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
  if (icon === "star")    return <svg width="20" height="20" viewBox="0 0 24 24" fill={iconColor} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  if (icon === "eye")     return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
  return null;
}

// ─── NOTIF DETAIL MODAL ───────────────────────────────────────────────────────
function NotifDetailModal({ notif, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const relatedContent = {
    doc:     { label: "Ver Solicitação",  description: "Acesse os detalhes completos desta solicitação.", action: "Abrir solicitação", color: "#3b82f6" },
    chat:    { label: "Ir para o Chat",   description: "Visualize a conversa completa e responda ao prestador.", action: "Abrir conversa", color: "#22c55e" },
    payment: { label: "Ver Pagamento",    description: "Acesse os detalhes da transação e comprovante.", action: "Ver comprovante", color: "#8b5cf6" },
    star:    { label: "Avaliar Serviço",  description: "Compartilhe sua experiência avaliando o profissional.", action: "Avaliar agora", color: "#f59e0b" },
    eye:     { label: "Ver Solicitação",  description: "O prestador visualizou sua solicitação. Acompanhe o status.", action: "Acompanhar solicitação", color: "#f97316" },
  };
  const content = relatedContent[notif.icon] || relatedContent.doc;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)" }}>
      <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.95) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: "white", borderRadius: 24, width: 460, maxWidth: "90vw", boxShadow: "0 32px 80px rgba(0,0,0,0.22)", overflow: "hidden", animation: "modalIn 0.2s ease" }}>
        <div style={{ backgroundColor: notif.iconBg, padding: "24px 24px 20px", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.08)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon name="xIcon" size={16} color="#374151" strokeWidth={2.5} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
              {notif.icon === "doc"     && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={notif.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>}
              {notif.icon === "chat"    && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={notif.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>}
              {notif.icon === "payment" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={notif.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
              {notif.icon === "star"    && <svg width="24" height="24" viewBox="0 0 24 24" fill={notif.iconColor} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
              {notif.icon === "eye"     && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={notif.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: notif.iconColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>{content.label}</p>
              <h3 style={{ margin: "2px 0 0", fontSize: 17, fontWeight: 800, color: "#0d1b3e" }}>{notif.title}</h3>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px 24px 24px" }}>
          <div style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: "14px 16px", marginBottom: 16, borderLeft: `3px solid ${notif.iconColor}` }}>
            <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{notif.desc}</p>
          </div>
          <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: "0 0 20px" }}>{content.description}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            <Icon name="clock" size={14} color="#94a3b8" />
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{notif.time}</span>
            <span style={{ fontSize: 12, color: "#e2e8f0", margin: "0 4px" }}>•</span>
            <span style={{ fontSize: 12, color: "#94a3b8", textTransform: "capitalize" }}>{notif.category}</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "white", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}>Fechar</button>
            <button onClick={onClose} style={{ flex: 2, padding: "11px 0", borderRadius: 12, border: "none", backgroundColor: content.color, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              {content.action} <Icon name="externalLink" size={14} color="white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DETALHE MODAL ────────────────────────────────────────────────────────────
function DetalheModal({ item, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const cfg = STATUS_CONFIG[item.status];
  const timeline = [
    { label: "Solicitação enviada",  done: true, date: item.data },
    { label: "Prestador notificado", done: true, date: "Automático" },
    { label: "Proposta aceita",      done: ["Aceita","Aguardando Pagamento","Em Andamento","Concluída"].includes(item.status), date: "" },
    { label: "Pagamento confirmado", done: ["Em Andamento","Concluída"].includes(item.status), date: "" },
    { label: "Serviço em andamento", done: ["Em Andamento","Concluída"].includes(item.status), date: "" },
    { label: "Serviço concluído",    done: item.status === "Concluída", date: "" },
  ];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(3px)" }}>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.95) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: "white", borderRadius: 24, width: 560, maxWidth: "92vw", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 32px 80px rgba(0,0,0,0.25)", animation: "modalIn 0.22s ease" }}>
        <div style={{ background: "linear-gradient(135deg, #0d1b3e 0%, #1e3a8a 100%)", padding: "24px 24px 20px", borderRadius: "24px 24px 0 0", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", fontSize: 18 }}>✕</button>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: item.prestador.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, color: "white", flexShrink: 0 }}>{item.prestador.avatar}</div>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Prestador</p>
              <h3 style={{ margin: "2px 0 2px", fontSize: 18, fontWeight: 800, color: "white" }}>{item.prestador.nome}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "#fbbf24", fontSize: 13 }}>★</span>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 600 }}>{item.prestador.avaliacao}</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>({item.prestador.avaliacoes} avaliações)</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px 24px 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
            <div>
              <h4 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 800, color: "#111827" }}>{item.servico}</h4>
              <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{item.descricao}</p>
            </div>
            <span style={{ flexShrink: 0, padding: "4px 12px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{cfg.label}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              { label: "📍 Local", value: item.local },
              { label: "📅 Data", value: item.data },
              { label: "💰 " + item.valorLabel, value: item.valor },
              { label: "🔖 ID da solicitação", value: `#FAZ-${String(item.id).padStart(4,"0")}` },
            ].map((row, i) => (
              <div key={i} style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 14px" }}>
                <p style={{ margin: "0 0 2px", fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{row.label}</p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#111827" }}>{row.value}</p>
              </div>
            ))}
          </div>
          <div style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 16, borderLeft: `3px solid ${cfg.color}` }}>
            <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{item.statusMsg}</p>
          </div>
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700, color: "#374151" }}>Andamento da solicitação</p>
            {timeline.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: step.done ? "#16a34a" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {step.done && <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>✓</span>}
                  </div>
                  {i < timeline.length - 1 && <div style={{ width: 2, height: 22, backgroundColor: step.done ? "#bbf7d0" : "#e5e7eb", margin: "2px 0" }} />}
                </div>
                <div style={{ marginTop: 1 }}>
                  <p style={{ margin: "0 0 1px", fontSize: 13, fontWeight: step.done ? 600 : 400, color: step.done ? "#111827" : "#9ca3af" }}>{step.label}</p>
                  {step.date && <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{step.date}</p>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "white", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}>Fechar</button>
            <button onClick={onClose} style={{ flex: 2, padding: "11px 0", borderRadius: 12, border: "none", backgroundColor: "#0d1b3e", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f97316"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0d1b3e"}>Conversar com prestador</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CARD SUB-COMPONENTS ──────────────────────────────────────────────────────
function AvatarSol({ initials, color, size = 54 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: size * 0.28, color: "#fff", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
      {initials}
    </div>
  );
}

function StatusBadgeSol({ status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, fontSize: "0.65rem", fontWeight: 700, fontFamily: "'Sora', sans-serif", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
      {cfg.label}
    </span>
  );
}

function ActionButton({ type, onClick }) {
  const configs = {
    detalhes:  { label: "Ver detalhes",          style: "primary" },
    conversar: { label: "Conversar",             style: "outline" },
    pagamento: { label: "Realizar pagamento",    style: "warning" },
    andamento: { label: "Ver andamento",         style: "outline" },
    novamente: { label: "Solicitar novamente",   style: "outline" },
    avaliar:   { label: "Avaliar serviço",       style: "outline" },
    cancelar:  { label: "Cancelar solicitação",  style: "danger"  },
  };
  const cfg = configs[type] || { label: type, style: "outline" };
  const styles = {
    primary: { background: "#111827", color: "#fff",    border: "1.5px solid #111827" },
    warning: { background: "#FBBF24", color: "#111827", border: "1.5px solid #FBBF24" },
    outline: { background: "#fff",    color: "#374151", border: "1.5px solid #E5E7EB" },
    danger:  { background: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FECACA" },
  };
  return (
    <button onClick={onClick}
      style={{ ...styles[cfg.style], borderRadius: 8, padding: "8px 14px", fontSize: "0.78rem", fontWeight: 600, fontFamily: "'Sora', sans-serif", cursor: "pointer", transition: "all 0.18s ease", whiteSpace: "nowrap", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >{cfg.label}</button>
  );
}

function SolicitacaoCard({ item, onVerDetalhes, delay }) {
  const statusCfg = STATUS_CONFIG[item.status];
  return (
    <div className="sol-card-in"
      style={{ animationDelay: `${delay}ms`, display: "grid", gridTemplateColumns: "88px 1fr 200px 168px", gap: "0 20px", alignItems: "center", background: "#fff", border: "1px solid #F3F4F6", borderLeft: `4px solid ${statusCfg.color}`, borderRadius: 14, padding: "20px 22px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", transition: "box-shadow 0.2s, transform 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
        <AvatarSol initials={item.prestador.avatar} color={item.prestador.avatarColor} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>{item.prestador.nome}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "center", marginTop: 3 }}>
            <span style={{ color: "#FBBF24", fontSize: 12 }}>★</span>
            <span style={{ fontSize: "0.7rem", color: "#92400E", fontWeight: 600 }}>{item.prestador.avaliacao}</span>
          </div>
          <div style={{ fontSize: "0.62rem", color: "#9CA3AF", marginTop: 1 }}>({item.prestador.avaliacoes} avaliações)</div>
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.98rem", color: "#111827", marginBottom: 3 }}>{item.servico}</div>
        <div style={{ fontSize: "0.78rem", color: "#6B7280", marginBottom: 12 }}>{item.descricao}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.74rem", color: "#6B7280" }}>📍 {item.local}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.74rem", color: "#6B7280" }}>📅 {item.data}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <StatusBadgeSol status={item.status} />
        <p style={{ fontSize: "0.74rem", color: "#6B7280", lineHeight: 1.55, margin: 0 }}>{item.statusMsg}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.66rem", color: "#9CA3AF", marginBottom: 2 }}>{item.valorLabel}</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#111827" }}>{item.valor}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
          {item.acoes.map((acao) => (
            <ActionButton key={acao} type={acao} onClick={acao === "detalhes" ? () => onVerDetalhes(item) : () => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function MinhasSolicitacoes() {
  const router = useRouter();

  // solicitações state
  const [activeTab, setActiveTab]     = useState("Todas");
  const [search, setSearch]           = useState("");
  const [page, setPage]               = useState(1);
  const [detalheItem, setDetalheItem] = useState(null);
  const PER_PAGE = 6;

  // notif state
  const [notifOpen, setNotifOpen]         = useState(false);
  const [notifFilter, setNotifFilter]     = useState("todas");
  const [showAllNotifs, setShowAllNotifs] = useState(false);
  const [notifs, setNotifs]               = useState(allNotifs);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const notifRef = useRef(null);

  // nav: "Início" redireciona, "Minhas solicitações" fica ativo
  const activeNav = 2;
  const handleNav = (i) => {
    if (i === 0) router.push("/Pages/Tela_inicial_cliente");
    // outros itens podem ser adicionados aqui futuramente
  };

  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .fazuno-scroll::-webkit-scrollbar{display:none}
      .fazuno-scroll{-ms-overflow-style:none;scrollbar-width:none}
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
      @keyframes solFadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
      .sol-card-in { animation: solFadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both; }
      .sol-page-in  { animation: solFadeUp 0.5s  cubic-bezier(0.22,1,0.36,1) both; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const baseNotifs = notifFilter === "todas" ? notifs
    : notifFilter === "não_lidas" ? notifs.filter(n => n.unread)
    : notifs.filter(n => n.category === notifFilter);
  const filteredNotifs = showAllNotifs ? baseNotifs : baseNotifs.slice(0, 5);
  const unreadCount = notifs.filter(n => n.unread).length;
  const unreadForFilter = (label, index) => {
    if (index === 0 || index === 1) return notifs.filter(n => n.unread).length;
    return notifs.filter(n => n.unread && n.category === label.toLowerCase()).length;
  };
  const handleFilterClick = (label, index) => {
    const key = filterKey(label, index);
    setNotifFilter(key);
    setShowAllNotifs(false);
    setNotifs(prev => prev.map(n => {
      if (index === 0 || index === 1) return { ...n, unread: false };
      return n.category === label.toLowerCase() ? { ...n, unread: false } : n;
    }));
  };
  const handleNotifClick = (n) => {
    setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, unread: false } : x));
    setSelectedNotif(n);
  };

  // solicitações logic
  const recente    = SOLICITACOES[0];
  const recenteCfg = STATUS_CONFIG[recente.status];
  const filtered = SOLICITACOES.filter(s => {
    const matchTab    = activeTab === "Todas" || s.status === activeTab;
    const matchSearch = !search
      || s.servico.toLowerCase().includes(search.toLowerCase())
      || s.prestador.nome.toLowerCase().includes(search.toLowerCase())
      || s.status.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const getTabCount = (key) => key === "Todas" ? SOLICITACOES.length : SOLICITACOES.filter(s => s.status === key).length;

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f9fafb" }}>

      {selectedNotif && <NotifDetailModal notif={selectedNotif} onClose={() => setSelectedNotif(null)} />}
      {detalheItem   && <DetalheModal     item={detalheItem}    onClose={() => setDetalheItem(null)} />}

      {/* ── SIDEBAR ── */}
      <div style={{ width: 180, minWidth: 180, height: "100%", backgroundColor: "#0d1b3e", display: "flex", flexDirection: "column", flexShrink: 0, zIndex: 30, boxShadow: "4px 0 24px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <img src="/Logo_branca.png" alt="FazUno" style={{ width: 90, height: "auto" }} />
          </div>
        </div>
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item, i) => (
            <button key={i} onClick={() => handleNav(i)}
              style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 12, border: "none", cursor: "pointer", textAlign: "left", width: "100%", backgroundColor: activeNav === i ? "rgba(255,255,255,0.15)" : "transparent", color: activeNav === i ? "white" : "rgba(255,255,255,0.55)", transition: "all 0.2s" }}
              onMouseEnter={e => { if (activeNav !== i) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { if (activeNav !== i) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <span style={{ flexShrink: 0, marginTop: 1 }}>
                <Icon name={item.icon} size={17} color={activeNav === i ? "white" : "rgba(255,255,255,0.5)"} strokeWidth={2} />
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* TOPBAR */}
        <div style={{ height: 56, backgroundColor: "#0d1b3e", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 20px", flexShrink: 0, zIndex: 20, gap: 4 }}>
          <div ref={notifRef} style={{ position: "relative" }}>
            <button onClick={() => setNotifOpen(o => !o)}
              style={{ position: "relative", padding: 8, borderRadius: 8, border: "none", backgroundColor: notifOpen ? "rgba(255,255,255,0.15)" : "transparent", cursor: "pointer" }}
              onMouseEnter={e => { if (!notifOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { if (!notifOpen) e.currentTarget.style.backgroundColor = notifOpen ? "rgba(255,255,255,0.15)" : "transparent"; }}
            >
              <Icon name="bell" size={20} color="rgba(255,255,255,0.75)" />
              {unreadCount > 0 && (
                <span style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, borderRadius: "50%", backgroundColor: "#f97316", color: "white", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div style={{ position: "fixed", top: 60, right: 20, width: 420, backgroundColor: "white", borderRadius: 20, boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 999, overflow: "hidden", border: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px 12px" }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0d1b3e" }}>Notificações</h3>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon name="clock" size={11} color="#94a3b8" /> Ordenadas por data
                    </p>
                  </div>
                  <button onClick={() => setNotifs(prev => prev.map(n => ({ ...n, unread: false })))}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#f97316" }}>
                    Marcar todas como lidas
                  </button>
                </div>
                <div style={{ display: "flex", gap: 6, padding: "0 20px 12px", overflowX: "auto", scrollbarWidth: "none" }}>
                  {filters.map((f, i) => {
                    const key = filterKey(f, i);
                    const active = notifFilter === key;
                    const badge = unreadForFilter(f, i);
                    return (
                      <button key={f} onClick={() => handleFilterClick(f, i)}
                        style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 5, padding: "5px 14px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", backgroundColor: active ? "#0d1b3e" : "#f1f5f9", color: active ? "white" : "#64748b", transition: "all 0.2s" }}>
                        {f}
                        {badge > 0 && <span style={{ backgroundColor: "#f97316", color: "white", fontSize: 10, fontWeight: 700, borderRadius: 9999, padding: "1px 6px", lineHeight: 1.4 }}>{badge}</span>}
                      </button>
                    );
                  })}
                </div>
                <div style={{ maxHeight: showAllNotifs ? 520 : 380, overflowY: "auto", scrollbarWidth: "none", transition: "max-height 0.3s ease" }}>
                  {filteredNotifs.length === 0 ? (
                    <div style={{ padding: "32px 20px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>Nenhuma notificação aqui.</div>
                  ) : filteredNotifs.map((n, i) => (
                    <div key={n.id} onClick={() => handleNotifClick(n)}
                      style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 20px", borderTop: i > 0 ? "1px solid #f8fafc" : "none", backgroundColor: n.unread ? "#fafbff" : "white", cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f1f5f9"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = n.unread ? "#fafbff" : "white"}
                    >
                      <div style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: n.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <NotifIcon icon={n.icon} iconColor={n.iconColor} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 700, color: "#0d1b3e" }}>{n.title}</p>
                        <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748b", lineHeight: 1.45, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.desc}</p>
                        <span style={{ fontSize: 11, color: "#94a3b8" }}>{n.time}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0, marginTop: 2 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: n.unread ? "#f97316" : "#e2e8f0" }} />
                        <Icon name="chevRight" size={13} color="#cbd5e1" />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "12px 20px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
                  <button onClick={() => setShowAllNotifs(v => !v)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#0d1b3e", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {showAllNotifs ? "Ver menos" : "Ver todas as notificações"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1b3e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={showAllNotifs ? "M18 15l-6-6-6 6" : "M9 18l6-6-6-6"} />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button style={{ padding: 8, borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
          ><Icon name="help" size={20} color="rgba(255,255,255,0.75)" /></button>
          <button style={{ padding: 8, borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
          ><Icon name="settings" size={20} color="rgba(255,255,255,0.75)" /></button>
          <div style={{ width: 1, height: 28, backgroundColor: "rgba(255,255,255,0.2)", margin: "0 8px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", border: "2px solid #f97316", flexShrink: 0 }}>
              <img src="/homem1.avif" alt="Isaac" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
            </div>
            <div>
              <div style={{ color: "white", fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>Isaac</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, lineHeight: 1.2 }}>Cliente</div>
            </div>
            <Icon name="chevDown" size={14} color="rgba(255,255,255,0.4)" />
          </div>
        </div>

        {/* ── CONTEÚDO ── */}
        <div className="fazuno-scroll" style={{ flex: 1, overflowY: "auto", backgroundColor: "#F9FAFB", fontFamily: "'DM Sans', sans-serif", color: "#111827" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 32px 60px" }}>

            {/* Header */}
            <div className="sol-page-in" style={{ marginBottom: 28 }}>
              <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.75rem", fontWeight: 700, color: "#111827", margin: "0 0 5px" }}>Minhas Solicitações</h1>
              <p style={{ fontSize: "0.86rem", color: "#6B7280", margin: 0 }}>Acompanhe todas as suas solicitações de serviços.</p>
            </div>

            {/* Search + Filtros */}
            <div className="sol-page-in" style={{ animationDelay: "50ms", display: "flex", gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: "0.95rem", color: "#9CA3AF" }}>🔍</span>
                <input type="text" placeholder="Pesquisar por serviço, prestador ou status..." value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  style={{ width: "100%", padding: "12px 16px 12px 42px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, fontSize: "0.88rem", color: "#111827", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", outline: "none", boxSizing: "border-box" }}
                  onFocus={e => { e.target.style.borderColor = "#6B7280"; e.target.style.boxShadow = "0 0 0 3px rgba(107,114,128,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; }}
                />
              </div>
              <button style={{ padding: "12px 20px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, color: "#374151", fontSize: "0.86rem", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#6B7280"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E7EB"}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                </svg>
                Filtros
              </button>
            </div>

            {/* Solicitação mais recente */}
            <div className="sol-page-in"
              onClick={() => setDetalheItem(recente)}
              style={{ animationDelay: "70ms", display: "flex", alignItems: "center", gap: 16, background: "white", border: `1.5px solid ${recenteCfg.border}`, borderLeft: `4px solid ${recenteCfg.color}`, borderRadius: 14, padding: "14px 18px", marginBottom: 22, cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s, transform 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.11)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: recenteCfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22 }}>🧹</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Sua solicitação mais recente</span>
                  <span style={{ padding: "2px 8px", borderRadius: 20, background: recenteCfg.bg, border: `1px solid ${recenteCfg.border}`, color: recenteCfg.color, fontSize: 10, fontWeight: 700 }}>{recenteCfg.label}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{recente.servico}</span>
                  <span style={{ fontSize: 12, color: "#6b7280" }}>📅 {recente.data}</span>
                  <span style={{ fontSize: 12, color: "#6b7280" }}>👤 {recente.prestador.nome}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: recenteCfg.color }}>{recente.valor}</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, padding: "8px 16px", borderRadius: 10, background: "#f1f5f9", color: "#374151", fontSize: 13, fontWeight: 600 }}>
                Acompanhar pedido <span style={{ fontSize: 16 }}>›</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="sol-page-in" style={{ animationDelay: "90ms", display: "flex", gap: 6, marginBottom: 22, flexWrap: "wrap" }}>
              {TABS_SOL.map(tab => {
                const isActive = activeTab === tab.key;
                const count    = getTabCount(tab.key);
                const cfg      = STATUS_CONFIG[tab.key];
                return (
                  <button key={tab.key} onClick={() => { setActiveTab(tab.key); setPage(1); }}
                    style={{ padding: "7px 14px", borderRadius: 20, fontSize: "0.78rem", fontWeight: isActive ? 700 : 500, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "all 0.18s ease", background: isActive ? (tab.key === "Todas" ? "#111827" : cfg.color) : "#fff", color: isActive ? "#fff" : "#6B7280", border: isActive ? `1.5px solid ${tab.key === "Todas" ? "#111827" : cfg.color}` : "1.5px solid #E5E7EB", boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.15)" : "0 1px 2px rgba(0,0,0,0.04)" }}
                  >{tab.label} ({count})</button>
                );
              })}
            </div>

            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {paginated.length === 0 ? (
                <div style={{ textAlign: "center", padding: "64px 20px", background: "#fff", borderRadius: 14, border: "1px solid #F3F4F6", color: "#9CA3AF", fontSize: "0.9rem" }}>
                  Nenhuma solicitação encontrada.
                </div>
              ) : paginated.map((item, i) => (
                <SolicitacaoCard key={item.id} item={item} onVerDetalhes={setDetalheItem} delay={i * 55} />
              ))}
            </div>

            {/* Paginação */}
            <div className="sol-page-in" style={{ animationDelay: "200ms", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
              <span style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>
                Mostrando {Math.min((page - 1) * PER_PAGE + 1, filtered.length)} a {Math.min(page * PER_PAGE, filtered.length)} de {filtered.length} solicitações
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                  style={{ width: 34, height: 34, borderRadius: 8, background: "#fff", border: "1px solid #E5E7EB", color: page === 1 ? "#D1D5DB" : "#374151", fontSize: "0.9rem", cursor: page === 1 ? "not-allowed" : "pointer", fontWeight: 600 }}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    style={{ width: 34, height: 34, borderRadius: 8, background: p === page ? "#111827" : "#fff", border: `1px solid ${p === page ? "#111827" : "#E5E7EB"}`, color: p === page ? "#fff" : "#374151", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>
                    {p}
                  </button>
                ))}
                <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)}
                  style={{ width: 34, height: 34, borderRadius: 8, background: "#fff", border: "1px solid #E5E7EB", color: (page === totalPages || totalPages === 0) ? "#D1D5DB" : "#374151", fontSize: "0.9rem", cursor: (page === totalPages || totalPages === 0) ? "not-allowed" : "pointer", fontWeight: 600 }}>›</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}