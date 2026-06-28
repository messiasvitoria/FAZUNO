"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "Início" },
  { label: "Solicitações Recebidas" },
  { label: "Oportunidades" },
  { label: "Meus Serviços" },
  { label: "Agenda" },
  { label: "Chat", route: "/Pages/Chat?perfil=prestador" },
];

const STATS = [
  { icon: "📅", color: "#3b82f6", bg: "#eff6ff", label: "Hoje", value: "5", sub: "serviços" },
  { icon: "📊", color: "#10b981", bg: "#ecfdf5", label: "Esta Semana", value: "18", sub: "serviços" },
  { icon: "🕐", color: "#f59e0b", bg: "#fffbeb", label: "Em Andamento", value: "3", sub: "serviços" },
  { icon: "💳", color: "#8b5cf6", bg: "#f5f3ff", label: "Receita Prevista", value: "R$ 2.450", sub: "Esta semana" },
];

const WEEK_DAYS = [
  { short: "Seg", num: "08", today: true },
  { short: "Ter", num: "09" },
  { short: "Qua", num: "10" },
  { short: "Qui", num: "11" },
  { short: "Sex", num: "12" },
  { short: "Sáb", num: "13" },
  { short: "Dom", num: "14" },
];

const HOURS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

const EVENTS = [
  { day: 0, hour: 10, title: "Instalação de C...", client: "Brenda Barbosa", price: "R$ 180", tag: "Confirmado", color: "#dcfce7", border: "#16a34a", tagColor: "#16a34a", tagBg: "#dcfce7" },
  { day: 2, hour:  9, title: "Manutenção El...",  client: "Marcos Lima",    price: "R$ 200", tag: "Novo",       color: "#dbeafe", border: "#3b82f6", tagColor: "#1d4ed8", tagBg: "#dbeafe" },
  { day: 4, hour: 10, title: "Instalação de V...", client: "Fernanda Rocha", price: "R$ 150", tag: "Novo",      color: "#fce7f3", border: "#ec4899", tagColor: "#9d174d", tagBg: "#fce7f3" },
];

const UPCOMING = [
  { time: "10:00", dot: "#16a34a", title: "Instalação de Chuveiro", client: "Brenda Barbosa",  tag: "Confirmado",   tagColor: "#16a34a", tagBg: "#dcfce7" },
  { time: "14:00", dot: "#f59e0b", title: "Limpeza Residencial",    client: "Carlos Oliveira", tag: "Em andamento", tagColor: "#92400e", tagBg: "#fef3c7" },
  { time: "16:00", dot: "#3b82f6", title: "Formatação Notebook",    client: "Ana Souza",       tag: "Novo",         tagColor: "#1d4ed8", tagBg: "#dbeafe" },
];

const PENDING = [
  { title: "Instalação elétrica", time: "Recebida há 5 min" },
  { title: "Pintura residencial",  time: "Recebida há 12 min" },
  { title: "Limpeza pós-obra",     time: "Recebida há 34 min" },
];

const WEEK_AVAIL = [
  { day: "Seg", on: true,  from: "08:00", to: "18:00" },
  { day: "Ter", on: true,  from: "08:00", to: "18:00" },
  { day: "Qua", on: true,  from: "08:00", to: "18:00" },
  { day: "Qui", on: true,  from: "08:00", to: "18:00" },
  { day: "Sex", on: true,  from: "08:00", to: "17:00" },
  { day: "Sáb", on: false, from: "",      to: ""      },
  { day: "Dom", on: false, from: "",      to: ""      },
];

export default function TelaCalendarioPrestador() {
  const router = useRouter();
  const [activeView, setActiveView] = useState("Semana");
  const [activeNav,  setActiveNav]  = useState("Agenda");
  const [isActive,   setIsActive]   = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fb", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", position: "relative" }}>

      {/* ══ SIDEBAR ══ */}
      <aside style={{ width: 220, background: "#1a2035", display: "flex", flexDirection: "column", flexShrink: 0, minHeight: "100vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px", borderBottom: "0.5px solid rgba(255,255,255,0.10)" }}>
          <div style={{ width: 32, height: 32, background: "#fff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#1a2035", flexShrink: 0 }}>F</div>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: 14, letterSpacing: "0.06em" }}>FAZUNO</span>
        </div>
        <nav style={{ flex: 1, paddingTop: 10 }}>
          {NAV_ITEMS.map((item) => {
            const active = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => item.route ? router.push(item.route) : setActiveNav(item.label)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 18px", fontSize: 13,
                  background: active ? "rgba(255,255,255,0.10)" : "transparent",
                  color: active ? "#fff" : "rgba(255,255,255,0.50)",
                  borderLeft: active ? "3px solid #7c6fe0" : "3px solid transparent",
                  paddingLeft: active ? 15 : 18,
                  border: "none", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ══ MAIN ══ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* ── TOPBAR ── */}
        <header style={{ background: "#1a2035", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderLeft: "0.5px solid rgba(255,255,255,0.07)", gap: 12 }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>Olá, João! 👋</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 2 }}>Aqui está o resumo do seu dia!</div>
          </div>
          <button
            onClick={() => setIsActive(v => !v)}
            style={{
              display: "flex", alignItems: "center", gap: 6, borderRadius: 20,
              padding: "5px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer",
              background: isActive ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.08)",
              border: isActive ? "1px solid rgba(52,211,153,0.40)" : "1px solid rgba(255,255,255,0.15)",
              color: isActive ? "#6ee7b7" : "rgba(255,255,255,0.45)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: isActive ? "#34d399" : "rgba(255,255,255,0.3)", flexShrink: 0 }} />
            {isActive ? "Ativo para novos serviços" : "Inativo"} ▾
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginLeft: "auto" }}>
            <button style={{ position: "relative", background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "rgba(255,255,255,0.6)" }}>
              🔔
              <span style={{ position: "absolute", top: -4, right: -5, background: "#ef4444", color: "#fff", borderRadius: "50%", width: 14, height: 14, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>5</span>
            </button>
            <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "rgba(255,255,255,0.6)" }}>❓</button>
            <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "rgba(255,255,255,0.6)" }}>⚙️</button>
            <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.12)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#7c6fe0", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 600 }}>JS</div>
              <div>
                <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>João Silva</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10 }}>Prestador</div>
              </div>
            </div>
          </div>
        </header>

        {/* ── CONTEÚDO ── */}
        <main style={{ flex: 1, padding: 24, background: "#f8f9fb" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, maxWidth: 1400, margin: "0 auto" }}>

            {/* ══ COLUNA ESQUERDA ══ */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111827", margin: 0 }}>Minha Agenda</h1>
                <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>Segunda-feira, 08 de Junho de 2026</p>
              </div>

              {/* Stats cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
                {STATS.map((s) => (
                  <div key={s.label} style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e5e7eb", padding: "18px 16px" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12 }}>{s.icon}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: s.label === "Receita Prevista" ? 20 : 28, fontWeight: 700, color: "#111827", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{s.sub}</div>
                    <button style={{ marginTop: 10, background: "none", border: "none", color: "#3b82f6", fontSize: 12, cursor: "pointer", padding: 0 }}>Ver detalhes →</button>
                  </div>
                ))}
              </div>

              {/* Calendar toolbar */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 8, padding: 3 }}>
                  {["Dia","Semana","Mês"].map(v => (
                    <button key={v} onClick={() => setActiveView(v)} style={{ padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: activeView === v ? 600 : 400, background: activeView === v ? "#3b82f6" : "transparent", color: activeView === v ? "#fff" : "#374151", transition: "all 0.15s" }}>{v}</button>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 11, color: "#6b7280" }}>Categoria</span>
                  <select style={{ border: "0.5px solid #d1d5db", borderRadius: 8, padding: "6px 10px", fontSize: 13, color: "#374151", background: "#fff" }}>
                    <option>Todas</option>
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 11, color: "#6b7280" }}>Status</span>
                  <select style={{ border: "0.5px solid #d1d5db", borderRadius: 8, padding: "6px 10px", fontSize: 13, color: "#374151", background: "#fff" }}>
                    <option>Todos</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14 }}>
                  <div style={{ border: "0.5px solid #d1d5db", borderRadius: 8, padding: "6px 12px", fontSize: 13, color: "#374151", background: "#fff" }}>📅 08 a 14 Jun 2026</div>
                  <button style={{ border: "0.5px solid #d1d5db", borderRadius: 8, padding: "6px 10px", background: "#fff", color: "#374151", fontSize: 13, cursor: "pointer" }}>Hoje</button>
                  <button style={{ border: "0.5px solid #d1d5db", borderRadius: 8, padding: "6px 8px", background: "#fff", color: "#374151", cursor: "pointer" }}>‹</button>
                  <button style={{ border: "0.5px solid #d1d5db", borderRadius: 8, padding: "6px 8px", background: "#fff", color: "#374151", cursor: "pointer" }}>›</button>
                </div>
              </div>

              {/* Calendar grid */}
              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "56px repeat(7,1fr)", borderBottom: "0.5px solid #e5e7eb" }}>
                  <div />
                  {WEEK_DAYS.map(d => (
                    <div key={d.num} style={{ padding: "10px 0", textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{d.short}</div>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", margin: "0 auto", background: d.today ? "#3b82f6" : "transparent", color: d.today ? "#fff" : "#111827", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>{d.num}</div>
                    </div>
                  ))}
                </div>
                {HOURS.map((h) => (
                  <div key={h} style={{ display: "grid", gridTemplateColumns: "56px repeat(7,1fr)", borderBottom: "0.5px solid #f3f4f6", minHeight: 52 }}>
                    <div style={{ fontSize: 11, color: "#9ca3af", padding: "6px 8px 0", textAlign: "right" }}>{h}</div>
                    {WEEK_DAYS.map((d, di) => {
                      const ev = EVENTS.find(e => e.day === di && e.hour === parseInt(h));
                      return (
                        <div key={di} style={{ borderLeft: "0.5px solid #f3f4f6", padding: "3px 4px" }}>
                          {ev && (
                            <div style={{ background: ev.color, borderLeft: `3px solid ${ev.border}`, borderRadius: 6, padding: "4px 7px", fontSize: 11 }}>
                              <div style={{ fontWeight: 600, color: "#111827", marginBottom: 1 }}>{ev.title}</div>
                              <div style={{ color: "#6b7280" }}>{ev.client}</div>
                              <div style={{ color: "#374151", fontWeight: 500 }}>{ev.price}</div>
                              <span style={{ display: "inline-block", marginTop: 3, fontSize: 10, background: ev.tagBg, color: ev.tagColor, borderRadius: 4, padding: "1px 6px" }}>{ev.tag}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* ══ COLUNA DIREITA ══ */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e5e7eb", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Disponível para receber serviços</span>
                </div>
                <button style={{ background: "none", border: "0.5px solid #d1d5db", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: "#374151", cursor: "pointer" }}>Alterar disponibilidade ▾</button>
              </div>

              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e5e7eb", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Próximos serviços hoje</span>
                  <button style={{ background: "none", border: "none", color: "#3b82f6", fontSize: 12, cursor: "pointer" }}>Ver todos</button>
                </div>
                {UPCOMING.map((u, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderTop: i > 0 ? "0.5px solid #f3f4f6" : "none" }}>
                    <span style={{ fontSize: 12, color: "#374151", fontWeight: 500, minWidth: 36, marginTop: 2 }}>{u.time}</span>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: u.dot, flexShrink: 0, marginTop: 5 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{u.title}</div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>{u.client}</div>
                      <span style={{ display: "inline-block", marginTop: 4, fontSize: 11, background: u.tagBg, color: u.tagColor, borderRadius: 6, padding: "2px 8px", fontWeight: 500 }}>{u.tag}</span>
                    </div>
                    <span style={{ color: "#9ca3af", fontSize: 16 }}>›</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e5e7eb", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Solicitações pendentes</span>
                    <span style={{ background: "#ef4444", color: "#fff", borderRadius: "50%", width: 20, height: 20, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
                  </div>
                  <button style={{ background: "none", border: "none", color: "#3b82f6", fontSize: 12, cursor: "pointer" }}>Ver todas</button>
                </div>
                {PENDING.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: i > 0 ? "0.5px solid #f3f4f6" : "none" }}>
                    <span style={{ fontSize: 20 }}>📋</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{p.title}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>{p.time}</div>
                    </div>
                    <span style={{ background: "#dbeafe", color: "#1d4ed8", borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 500 }}>Nova</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e5e7eb", padding: "16px" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 12 }}>Disponibilidade semanal</div>
                {WEEK_AVAIL.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderTop: i > 0 ? "0.5px solid #f3f4f6" : "none" }}>
                    <span style={{ fontSize: 13, color: "#374151", width: 32 }}>{d.day}</span>
                    <div style={{ width: 36, height: 20, borderRadius: 10, background: d.on ? "#3b82f6" : "#e5e7eb", position: "relative", cursor: "pointer" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: d.on ? 18 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                    </div>
                    <span style={{ fontSize: 12, color: d.on ? "#374151" : "#9ca3af" }}>{d.on ? `${d.from} – ${d.to}` : "Indisponível"}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e5e7eb", padding: "16px" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 12 }}>Ações rápidas</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["+ Adicionar bloqueio de horário", "📤 Exportar agenda", "⚙️ Configurar horários"].map((a, i) => (
                    <button key={i} style={{ background: "#f9fafb", border: "0.5px solid #e5e7eb", borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>{a}</button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
