"use client";
import { FaEnvelope, FaBullseye, FaTools, FaCalendarAlt, FaStar } from "react-icons/fa";

const cards = [
  { label: "Solicitações de normas", value: 8,     icon: FaEnvelope,    iconBg: "#EEEDFE", iconColor: "#534AB7" },
  { label: "Oportunidades",          value: 6,     icon: FaBullseye,    iconBg: "#FAEEDA", iconColor: "#BA7517" },
  { label: "Serviços em andamento",  value: 3,     icon: FaTools,       iconBg: "#E6F1FB", iconColor: "#185FA5" },
  { label: "Agenda de hoje",         value: 2,     icon: FaCalendarAlt, iconBg: "#EAF3DE", iconColor: "#3B6D11" },
  { label: "Avaliação média",        value: "4,8", icon: FaStar,        iconBg: "#FAEEDA", iconColor: "#EF9F27" },
];

function StatCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
      {cards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
        <div
          key={label}
          style={{
            background: "#ffffff",
            border: "0.5px solid rgba(0,0,0,0.12)",
            borderRadius: 12,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            height: 72,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: 40, height: 40, borderRadius: 8,
              background: iconBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={20} color={iconColor} />
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {label}
            </p>
            <p style={{ fontSize: 22, fontWeight: 500, color: "#111827", margin: 0, lineHeight: 1 }}>
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatCards;