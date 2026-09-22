"use client";
import { FaEllipsisV, FaPlus } from "react-icons/fa";

const servicos = [
  { titulo: "Instalação de torneira", categoria: "Hidráulica", preco: "A partir de R$ 120,00", ativo: true, imagem: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400" },
  { titulo: "Troca de tomadas",       categoria: "Elétrica",   preco: "A partir de R$ 80,00",  ativo: true, imagem: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400" },
  { titulo: "Pintura interna",        categoria: "Pintura",    preco: "A partir de R$ 250,00", ativo: true, imagem: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400" },
  { titulo: "Limpeza completa",       categoria: "Limpeza",    preco: "A partir de R$ 150,00", ativo: true, imagem: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400" },
];

export default function SeusServicos() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid rgba(0,0,0,0.10)", padding: "20px 24px", flex: 1, minWidth: 0 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Seus serviços</span>
          <span style={{ fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 20, background: "#e0e7ff", color: "#4338ca" }}>
            12 serviços cadastrados
          </span>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#fff", background: "#1e293b", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer" }}>
          <FaPlus size={11} /> Adicionar serviço
        </button>
      </div>

      {/* Grid de serviços */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {servicos.map((s) => (
          <div key={s.titulo} style={{ border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" }}>
            <img src={s.imagem} alt={s.titulo} style={{ width: "100%", height: 90, objectFit: "cover" }} />
            <div style={{ padding: "10px 10px 8px" }}>
              <p style={{ fontWeight: 600, fontSize: 13, color: "#111827", margin: "0 0 2px" }}>{s.titulo}</p>
              <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>{s.categoria}</p>
              <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 8px" }}>{s.preco}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: "#d1fae5", color: "#065f46" }}>
                  Ativo
                </span>
                <FaEllipsisV size={12} color="#9ca3af" style={{ cursor: "pointer" }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <a href="#" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>Ver todos os serviços →</a>
      </div>
    </div>
  );
}
