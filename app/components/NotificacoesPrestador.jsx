"use client";
import { useState } from "react";
import { FaFileAlt, FaCommentAlt, FaClock, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

const categorias = ["Todas", "Não lidas", "Solicitações", "Serviços", "Financeiro", "Sistema"];

const notificacoes = [
  {
    id: 1,
    titulo: "Nova Solicitação Recebida",
    descricao: "Você recebeu uma nova solicitação de Instalação de Ar Condicionado.",
    link: "Ver detalhes",
    tempo: "Agora há pouco",
    lida: false,
    categoria: "Solicitações",
    icon: FaFileAlt,
    iconBg: "#e0e7ff",
    iconColor: "#4338ca",
  },
  {
    id: 2,
    titulo: "Cliente Respondeu",
    descricao: "Maria Santos respondeu sua mensagem sobre a solicitação de Pintura Residencial.",
    link: "Ver conversa",
    tempo: "Há 15 min",
    lida: false,
    categoria: "Solicitações",
    icon: FaCommentAlt,
    iconBg: "#d1fae5",
    iconColor: "#059669",
  },
  {
    id: 3,
    titulo: "Solicitação em Análise",
    descricao: "A solicitação de Limpeza de Caixa D'água está aguardando sua resposta.",
    link: "Ver solicitação",
    tempo: "Há 1 hora",
    lida: false,
    categoria: "Solicitações",
    icon: FaClock,
    iconBg: "#fef3c7",
    iconColor: "#d97706",
  },
  {
    id: 4,
    titulo: "Serviço Concluído",
    descricao: "Você concluiu o serviço de Instalação de Chuveiro para Carlos Oliveira.",
    link: "Ver avaliação",
    tempo: "Ontem às 18:30",
    lida: true,
    categoria: "Serviços",
    icon: FaCheckCircle,
    iconBg: "#ede9fe",
    iconColor: "#7c3aed",
  },
  {
    id: 5,
    titulo: "Pagamento Recebido",
    descricao: "Você recebeu um pagamento de R$ 250,00 referente ao serviço concluído.",
    link: "Ver comprovante",
    tempo: "Ontem às 16:45",
    lida: true,
    categoria: "Financeiro",
    icon: FaMoneyBillWave,
    iconBg: "#d1fae5",
    iconColor: "#059669",
  },
];

export default function NotificacoesPrestador({ onClose }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [lista, setLista] = useState(notificacoes);

  const filtradas = lista.filter((n) => {
    if (categoriaAtiva === "Todas") return true;
    if (categoriaAtiva === "Não lidas") return !n.lida;
    return n.categoria === categoriaAtiva;
  });

  const contagem = (cat) => {
    if (cat === "Todas") return lista.length;
    if (cat === "Não lidas") return lista.filter((n) => !n.lida).length;
    return lista.filter((n) => n.categoria === cat).length;
  };

  const marcarTodasLidas = () => setLista(lista.map((n) => ({ ...n, lida: true })));

  return (
    <div style={{
      position: "absolute", top: "100%", right: 0, marginTop: 8,
      width: 480, background: "#fff", borderRadius: 16,
      border: "0.5px solid rgba(0,0,0,0.10)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      zIndex: 100, overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px 12px" }}>
        <span style={{ fontWeight: 700, fontSize: 18, color: "#111827" }}>Notificações</span>
        <button onClick={marcarTodasLidas} style={{ fontSize: 13, color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
          Marcar todas como lidas
        </button>
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: 4, padding: "0 20px 12px", overflowX: "auto" }}>
        {categorias.map((cat) => {
          const count = contagem(cat);
          if (count === 0 && cat !== "Todas") return null;
          return (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              style={{
                fontSize: 13, fontWeight: 500, padding: "5px 12px", borderRadius: 20, whiteSpace: "nowrap",
                border: "none", cursor: "pointer",
                background: categoriaAtiva === cat ? "#3b82f6" : "#f3f4f6",
                color: categoriaAtiva === cat ? "#fff" : "#374151",
                display: "flex", alignItems: "center", gap: 5,
              }}
            >
              {cat}
              {count > 0 && (
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: categoriaAtiva === cat ? "#3b82f6" : "#ef4444",
                  background: categoriaAtiva === cat ? "#fff" : "#fee2e2",
                  borderRadius: 10, padding: "1px 5px",
                }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Lista */}
      <div style={{ maxHeight: 380, overflowY: "auto" }}>
        {filtradas.map((n, i) => {
          const Icon = n.icon;
          return (
            <div key={n.id} style={{
              display: "flex", gap: 12, padding: "14px 20px",
              borderTop: i === 0 ? "0.5px solid #f3f4f6" : "0.5px solid #f3f4f6",
              background: n.lida ? "#fff" : "#f8faff",
              cursor: "pointer",
            }}>
              {/* Bolinha não lida */}
              <div style={{ width: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {!n.lida && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }} />}
              </div>

              {/* Ícone */}
              <div style={{ width: 40, height: 40, borderRadius: 10, background: n.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={18} color={n.iconColor} />
              </div>

              {/* Conteúdo */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: "#111827", margin: "0 0 2px" }}>{n.titulo}</p>
                <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 4px", lineHeight: 1.4 }}>{n.descricao}</p>
                <a href="#" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>{n.link}</a>
              </div>

              {/* Tempo + bolinha direita */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                <span style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>{n.tempo}</span>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.lida ? "#d1d5db" : "#3b82f6" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "0.5px solid #f3f4f6", textAlign: "center" }}>
        <a href="#" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>
          Ver todas as notificações →
        </a>
      </div>
    </div>
  );
}
