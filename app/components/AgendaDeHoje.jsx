"use client";

const agendamentos = [
  {
    horario: "14:00",
    titulo: "Instalação de TV",
    cliente: "Ana Caroline",
    local: "Vila Mariana, São Paulo - SP",
  },
  {
    horario: "16:30",
    titulo: "Manutenção hidráulica",
    cliente: "Bruno Lima",
    local: "Moema, São Paulo - SP",
  },
];

export default function AgendaDeHoje() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid rgba(0,0,0,0.10)", padding: "20px 24px", width: 380, flexShrink: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Agenda de hoje</span>
        <a href="#" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none" }}>Ver agenda completa</a>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {agendamentos.map((a) => (
          <div key={a.horario} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            {/* Horario */}
            <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", minWidth: 40, paddingTop: 2 }}>{a.horario}</span>

            {/* Linha vertical */}
            <div style={{ width: 3, borderRadius: 4, background: "#3b82f6", alignSelf: "stretch", flexShrink: 0 }} />

            {/* Info */}
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 14, color: "#111827", margin: "0 0 2px" }}>{a.titulo}</p>
              <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 1px" }}>Cliente: {a.cliente}</p>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{a.local}</p>
            </div>

            {/* Badge */}
            <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: "#d1fae5", color: "#065f46", flexShrink: 0 }}>
              Agendado
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
