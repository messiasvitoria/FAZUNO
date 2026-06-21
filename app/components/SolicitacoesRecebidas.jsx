"use client";
import { FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";

const solicitacoes = [
  { nome: "Mariana Costa",   servico: "Limpeza completa",              horario: "Hoje, 14:30",  local: " Sambaíba Velha, Floriano - PI",  status: "EM ABERTO",                 valor: "R$ 180,00", avatar: "MC", avatarBg: "#e0e7ff", avatarColor: "#4338ca" },
  { nome: "Carlos Mendes",   servico: "Instalação de chuveiro elétrico", horario: "Hoje, 10:15", local: "Tiberão, Floriano - PI",   status: "EM ANÁLISE",           valor: "R$ 150,00", avatar: "CM", avatarBg: "#fef3c7", avatarColor: "#b45309" },
  { nome: "Juliana Oliveira",servico: "Pintura interna",               horario: "Ontem, 16:45", local: "Campo Velho, Floriano - PI",         status: "PENDENTE", valor: "R$ 350,00", avatar: "JO", avatarBg: "#fce7f3", avatarColor: "#be185d" },
  { nome: "Ricardo Almeida", servico: "Troca de tomadas",              horario: "Ontem, 11:20", local: "Vila Viana, Barão de Grajaú - MA",       status: "ACEITA",               valor: "R$ 120,00", avatar: "RA", avatarBg: "#d1fae5", avatarColor: "#065f46" },
];

const statusStyle = {
  "EM ABERTO":                  { bg: "#ede9fe", color: "#6d28d9" },
  "EM ANÁLISE":            { bg: "#fef3c7", color: "#b45309" },
  "PENDENTE":  { bg: "#ffedd5", color: "#c2410c" },
  "ACEITA":                { bg: "#d1fae5", color: "#065f46" },
};

export default function SolicitacoesRecebidas() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid rgba(0,0,0,0.10)", padding: "20px 24px", flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Solicitações recebidas</span>
        <a href="#" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none" }}>Ver todas</a>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {solicitacoes.map((s) => {
          const st = statusStyle[s.status];
          return (
            <div key={s.nome} style={{ display: "grid", gridTemplateColumns: "42px 1fr 110px 160px 90px 12px", alignItems: "center", gap: 12, cursor: "pointer" }}>

              {/* Avatar */}
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: s.avatarBg, color: s.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13 }}>
                {s.avatar}
              </div>

              {/* Info */}
              <div style={{ minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: "#111827", margin: 0 }}>{s.nome}</p>
                <p style={{ fontSize: 13, color: "#6b7280", margin: "1px 0" }}>{s.servico}</p>
                <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, display: "flex", alignItems: "center", gap: 3 }}>
                  <FaMapMarkerAlt size={10} /> {s.local}
                </p>
              </div>

              {/* Horario */}
              <span style={{ fontSize: 13, color: "#6b7280", textAlign: "center" }}>{s.horario}</span>

              {/* Status */}
              <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: st.bg, color: st.color, textAlign: "center", whiteSpace: "nowrap" }}>
                {s.status}
              </span>

              {/* Valor */}
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: "#111827", margin: 0 }}>{s.valor}</p>
                <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Valor estimado</p>
              </div>

              <FaChevronRight size={12} color="#9ca3af" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
