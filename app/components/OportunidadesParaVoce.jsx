"use client";
import { FaPaintRoller, FaTint, FaBolt, FaBroom, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

const oportunidades = [
  {
    titulo: "Pintura de apartamento",
    local: "Princesinha, Floriano - PI",
    valor: "R$ 1.200,00",
    distancia: "2,1 km de distância",
    icon: FaPaintRoller,
    iconBg: "#ede9fe",
    iconColor: "#7c3aed",
  },
  {
    titulo: "Vazamento no banheiro",
    local: "Catumbi, Floriano - PI",
    valor: "R$ 250,00",
    distancia: "3,4 km de distância",
    icon: FaTint,
    iconBg: "#e0f2fe",
    iconColor: "#0284c7",
  },
  {
    titulo: "Instalação de luminária",
    local: "Campo Velho, Floriano - PI",
    valor: "R$ 180,00",
    distancia: "4,2 km de distância",
    icon: FaBolt,
    iconBg: "#fef3c7",
    iconColor: "#d97706",
  },
  {
    titulo: "Limpeza pós-obra",
    local: "Alto da Cruz, Floriano - PI",
    valor: "R$ 400,00",
    distancia: "5,8 km de distância",
    icon: FaBroom,
    iconBg: "#d1fae5",
    iconColor: "#059669",
  },
];

export default function OportunidadesParaVoce() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid rgba(0,0,0,0.10)", padding: "20px 24px", width: 380, flexShrink: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Oportunidades para você</span>
        <Link
          href="/pags/Oportunidades"
          style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none" }}
        >
          Ver todas
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {oportunidades.map((op) => {
          const Icon = op.icon;
          return (
            <div key={op.titulo} style={{ border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: "12px", cursor: "pointer" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: op.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                <Icon size={18} color={op.iconColor} />
              </div>
              <p style={{ fontWeight: 600, fontSize: 12, color: "#111827", margin: "0 0 2px" }}>{op.titulo}</p>
              <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 6px" }}>{op.local}</p>
              <p style={{ fontWeight: 700, fontSize: 13, color: "#111827", margin: "0 0 4px" }}>{op.valor}</p>
              <p style={{ fontSize: 11, color: "#6b7280", margin: 0, display: "flex", alignItems: "center", gap: 3 }}>
                <FaMapMarkerAlt size={10} /> {op.distancia}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}