"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaEnvelope, FaBullseye, FaTools, FaCalendarAlt, FaStar,
  FaMapMarkerAlt, FaChevronRight,
  FaPaintRoller, FaTint, FaBolt, FaBroom,
  FaEllipsisV, FaPlus,
} from "react-icons/fa";
import Link from "next/link";
import SidebarPrestador from "../../components/SidebarPrestador";
import TopBarPrestador from "../../components/TopBarPrestador";

// ─── DADOS: StatCards ───────────────────────────────────────────────
const statCards = [
  { label: "Novas Solicitações ", value: 8,     icon: FaEnvelope,    iconBg: "#EEEDFE", iconColor: "#534AB7" },
  { label: "Oportunidades",          value: 6,     icon: FaBullseye,    iconBg: "#FAEEDA", iconColor: "#BA7517" },
  { label: "Serviços em andamento",  value: 3,     icon: FaTools,       iconBg: "#E6F1FB", iconColor: "#185FA5" },
  { label: "Agenda de hoje",         value: 2,     icon: FaCalendarAlt, iconBg: "#EAF3DE", iconColor: "#3B6D11" },
  { label: "Avaliação média",        value: "4,8", icon: FaStar,        iconBg: "#FAEEDA", iconColor: "#EF9F27" },
];

// ─── DADOS: Solicitações Recebidas ──────────────────────────────────
const solicitacoes = [
  { nome: "Mariana Costa",    servico: "Limpeza completa",               horario: "Hoje, 14:30",  local: " Sambaíba Velha, Floriano - PI",   status: "EM ABERTO",  valor: "R$ 180,00", avatar: "MC", avatarBg: "#e0e7ff", avatarColor: "#4338ca" },
  { nome: "Carlos Mendes",    servico: "Instalação de chuveiro elétrico", horario: "Hoje, 10:15",  local: "Tiberão, Floriano - PI",           status: "EM ANÁLISE", valor: "R$ 150,00", avatar: "CM", avatarBg: "#fef3c7", avatarColor: "#b45309" },
  { nome: "Juliana Oliveira", servico: "Pintura interna",                 horario: "Ontem, 16:45", local: "Campo Velho, Floriano - PI",       status: "PENDENTE",   valor: "R$ 350,00", avatar: "JO", avatarBg: "#fce7f3", avatarColor: "#be185d" },
  { nome: "Ricardo Almeida",  servico: "Troca de tomadas",                horario: "Ontem, 11:20", local: "Vila Viana, Barão de Grajaú - MA", status: "ACEITA",     valor: "R$ 120,00", avatar: "RA", avatarBg: "#d1fae5", avatarColor: "#065f46" },
];

const statusStyle = {
  "EM ABERTO":  { bg: "#ede9fe", color: "#6d28d9" },
  "EM ANÁLISE": { bg: "#fef3c7", color: "#b45309" },
  "PENDENTE":   { bg: "#ffedd5", color: "#c2410c" },
  "ACEITA":     { bg: "#d1fae5", color: "#065f46" },
};

// ─── DADOS: Oportunidades para você ─────────────────────────────────
const oportunidades = [
  { titulo: "Pintura de apartamento",   local: "Princesinha, Floriano - PI", valor: "R$ 1.200,00", distancia: "2,1 km de distância", icon: FaPaintRoller, iconBg: "#ede9fe", iconColor: "#7c3aed" },
  { titulo: "Vazamento no banheiro",    local: "Catumbi, Floriano - PI",     valor: "R$ 250,00",    distancia: "3,4 km de distância", icon: FaTint,        iconBg: "#e0f2fe", iconColor: "#0284c7" },
  { titulo: "Instalação de luminária",  local: "Campo Velho, Floriano - PI", valor: "R$ 180,00",    distancia: "4,2 km de distância", icon: FaBolt,        iconBg: "#fef3c7", iconColor: "#d97706" },
  { titulo: "Limpeza pós-obra",         local: "Alto da Cruz, Floriano - PI",valor: "R$ 400,00",    distancia: "5,8 km de distância", icon: FaBroom,       iconBg: "#d1fae5", iconColor: "#059669" },
];

// ─── DADOS: Agenda de hoje ───────────────────────────────────────────
const agendamentos = [
  { horario: "14:00", titulo: "Instalação de TV",         cliente: "Ana Caroline", local: "Vila Mariana, São Paulo - SP" },
  { horario: "16:30", titulo: "Manutenção hidráulica",    cliente: "Bruno Lima",   local: "Moema, São Paulo - SP" },
];

// ─── DADOS: Seus Serviços ────────────────────────────────────────────
const servicos = [
  { titulo: "Instalação de torneira", categoria: "Hidráulica", preco: "A partir de R$ 120,00", ativo: true, imagem: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400" },
  { titulo: "Troca de tomadas",       categoria: "Elétrica",   preco: "A partir de R$ 80,00",  ativo: true, imagem: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400" },
  { titulo: "Pintura interna",        categoria: "Pintura",    preco: "A partir de R$ 250,00", ativo: true, imagem: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400" },
  { titulo: "Limpeza completa",       categoria: "Limpeza",    preco: "A partir de R$ 150,00", ativo: true, imagem: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400" },
];

export default function Tela_inicio_prestador() {
  const router = useRouter();

  // ── Trava o body nesta tela com layout fixo ──
  useEffect(() => {
    document.body.classList.add("layout-fixed");
    return () => document.body.classList.remove("layout-fixed");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f9fafb",
      }}
    >
      <SidebarPrestador />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
          marginLeft: 216,
        }}
      >
        <TopBarPrestador
          title="Olá, João! 👋"
          subtitle="Aqui está o resumo do seu dia!"
        />

        {/* ── CONTEÚDO PRINCIPAL ── */}
        <main style={{ flex: 1, overflowY: "auto", backgroundColor: "#f9fafb" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px" }}>

            {/* ═══ STAT CARDS ═══ */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
              {statCards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
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

            {/* ═══ SOLICITAÇÕES RECEBIDAS + OPORTUNIDADES ═══ */}
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>

              {/* Solicitações Recebidas */}
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
                        <div style={{ width: 42, height: 42, borderRadius: "50%", background: s.avatarBg, color: s.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13 }}>
                          {s.avatar}
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontWeight: 600, fontSize: 14, color: "#111827", margin: 0 }}>{s.nome}</p>
                          <p style={{ fontSize: 13, color: "#6b7280", margin: "1px 0" }}>{s.servico}</p>
                          <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, display: "flex", alignItems: "center", gap: 3 }}>
                            <FaMapMarkerAlt size={10} /> {s.local}
                          </p>
                        </div>

                        <span style={{ fontSize: 13, color: "#6b7280", textAlign: "center" }}>{s.horario}</span>

                        <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: st.bg, color: st.color, textAlign: "center", whiteSpace: "nowrap" }}>
                          {s.status}
                        </span>

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

              {/* Oportunidades para você */}
              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid rgba(0,0,0,0.10)", padding: "20px 24px", width: 380, flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Oportunidades para você</span>
                  <Link href="/pags/Oportunidades" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none" }}>
                    Ver todas
                  </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {oportunidades.map((op) => {
                    const OpIcon = op.icon;
                    return (
                      <div key={op.titulo} style={{ border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: "12px", cursor: "pointer" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: op.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                          <OpIcon size={18} color={op.iconColor} />
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
            </div>

            {/* ═══ AGENDA DE HOJE + SEUS SERVIÇOS ═══ */}
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>

              {/* Agenda de hoje */}
              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid rgba(0,0,0,0.10)", padding: "20px 24px", width: 380, flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Agenda de hoje</span>
                  <a href="#" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none" }}>Ver agenda completa</a>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {agendamentos.map((a) => (
                    <div key={a.horario} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", minWidth: 40, paddingTop: 2 }}>{a.horario}</span>

                      <div style={{ width: 3, borderRadius: 4, background: "#3b82f6", alignSelf: "stretch", flexShrink: 0 }} />

                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, fontSize: 14, color: "#111827", margin: "0 0 2px" }}>{a.titulo}</p>
                        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 1px" }}>Cliente: {a.cliente}</p>
                        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{a.local}</p>
                      </div>

                      <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: "#d1fae5", color: "#065f46", flexShrink: 0 }}>
                        Agendado
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seus Serviços */}
              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid rgba(0,0,0,0.10)", padding: "20px 24px", flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Seus serviços</span>
                    <span style={{ fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 20, background: "#e0e7ff", color: "#4338ca" }}>
                      12 serviços cadastrados
                    </span>
                  </div>
                  <button
                    onClick={() => router.push("/Pages/Tela_CadastroServico_Prestador")}
                    style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#fff", background: "#06104A", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer" }}
                  >
                    <FaPlus size={11} /> Adicionar serviço
                  </button>
                </div>

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
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}