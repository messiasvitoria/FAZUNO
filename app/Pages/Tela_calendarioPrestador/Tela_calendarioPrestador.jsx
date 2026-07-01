    "use client";

    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import TopBar_Prestador  from "../../components/TopBar_Prestador";
    import Parte_menulateral from "../../components/Parte_menulateral";

    const STATS = [
    { icon: "📅", bg: "#eff6ff", label: "Hoje",             value: "5",        sub: "serviços"    },
    { icon: "📊", bg: "#ecfdf5", label: "Esta Semana",      value: "18",       sub: "serviços"    },
    { icon: "🕐", bg: "#fffbeb", label: "Em Andamento",     value: "3",        sub: "serviços"    },
    { icon: "💳", bg: "#f5f3ff", label: "Receita Prevista", value: "R$ 2.450", sub: "esta semana" },
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
    { day: 0, hour: 10, title: "Instalação de Chuveiro",   client: "Brenda Barbosa", price: "R$ 180", tag: "Confirmado", color: "#dcfce7", border: "#16a34a", tagColor: "#166534", tagBg: "#dcfce7" },
    { day: 2, hour:  9, title: "Manutenção Elétrica",      client: "Marcos Lima",    price: "R$ 200", tag: "Novo",       color: "#dbeafe", border: "#3b82f6", tagColor: "#1d4ed8", tagBg: "#dbeafe" },
    { day: 4, hour: 10, title: "Inst. Ventilador",         client: "Fernanda Rocha", price: "R$ 150", tag: "Novo",       color: "#fce7f3", border: "#ec4899", tagColor: "#9d174d", tagBg: "#fce7f3" },
    ];

    const UPCOMING = [
    { time: "10:00", dot: "#16a34a", title: "Instalação de Chuveiro", client: "Brenda Barbosa",  tag: "Confirmado",   tagColor: "#166534", tagBg: "#dcfce7" },
    { time: "14:00", dot: "#f59e0b", title: "Limpeza Residencial",    client: "Carlos Oliveira", tag: "Em andamento", tagColor: "#92400e", tagBg: "#fef3c7" },
    { time: "16:00", dot: "#3b82f6", title: "Formatação Notebook",    client: "Ana Souza",       tag: "Novo",         tagColor: "#1d4ed8", tagBg: "#dbeafe" },
    ];

    const PENDING = [
    { title: "Instalação elétrica", time: "Recebida há 5 min"  },
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

    export default function Tela_CalendarioPrestador() {
    const [activeView, setActiveView] = useState("Semana");

    return (
        <div style={{
        display: "flex", width: "100vw", height: "100vh",
        overflow: "hidden",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        backgroundColor: "#f8f9fb",
        }}>

        {/* ── SIDEBAR ── */}
        <Parte_menulateral activeRoute="/Pages/Tela_Calendario_Prestador" />

        {/* ── DIREITA ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

            {/* ── TOPBAR ── */}
            <TopBar_Prestador />

            {/* ── CONTEÚDO ── */}
            <main style={{ flex: 1, overflowY: "auto", backgroundColor: "#f8f9fb" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 28px 40px" }}>

                {/* ── CABEÇALHO ── */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Agenda</p>
                    <h1 style={{ margin: "2px 0 4px", fontSize: 24, fontWeight: 800, color: "#111827" }}>Minha Agenda</h1>
                    <p style={{ margin: 0, fontSize: 13, color: "#9ca3af" }}>Segunda-feira, 08 de junho de 2026</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {/* Badge de status */}
                    <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                    borderRadius: 12, padding: "8px 14px",
                    }}>
                    <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "block" }} />
                        <span style={{ position: "absolute", width: 18, height: 18, borderRadius: "50%", background: "#22c55e", opacity: 0.2, animation: "pulse 1.5s infinite" }} />
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#15803d" }}>Disponível para serviços</span>
                    <span style={{ fontSize: 11, color: "#9ca3af", borderLeft: "1px solid #d1fae5", paddingLeft: 10, cursor: "pointer" }}>Alterar ▾</span>
                    </div>
                    <button style={{
                    display: "flex", alignItems: "center", gap: 6,
                    backgroundColor: "#0d1b3e", color: "white",
                    border: "none", borderRadius: 10, padding: "9px 18px",
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    }}>
                    + Novo agendamento
                    </button>
                </div>
                </div>

                {/* ── STATS ── */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
                {STATS.map(s => (
                    <div key={s.label} style={{
                    background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9",
                    padding: "18px 20px", display: "flex", alignItems: "center", gap: 14,
                    }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                        {s.icon}
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{s.value}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{s.sub}</div>
                    </div>
                    </div>
                ))}
                </div>

                {/* ── GRID PRINCIPAL ── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>

                {/* ── COLUNA CALENDÁRIO ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {/* Toolbar */}
                    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 8, padding: 3 }}>
                        {["Dia", "Semana", "Mês"].map(v => (
                        <button key={v} onClick={() => setActiveView(v)} style={{
                            padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                            fontSize: 13, fontWeight: activeView === v ? 600 : 400,
                            background: activeView === v ? "#0d1b3e" : "transparent",
                            color:      activeView === v ? "#fff"    : "#6b7280",
                        }}>
                            {v}
                        </button>
                        ))}
                    </div>
                    <select style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 10px", fontSize: 13, color: "#374151", background: "#fff" }}>
                        <option>Todas categorias</option>
                    </select>
                    <select style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 10px", fontSize: 13, color: "#374151", background: "#fff" }}>
                        <option>Todos status</option>
                    </select>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}>
                        <button style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 8px", background: "#fff", color: "#374151", cursor: "pointer" }}>‹</button>
                        <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 12px", fontSize: 13, color: "#374151", background: "#fff", whiteSpace: "nowrap" }}>08 a 14 Jun 2026</div>
                        <button style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 8px", background: "#fff", color: "#374151", cursor: "pointer" }}>›</button>
                        <button style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 12px", background: "#fff", color: "#374151", fontSize: 13, cursor: "pointer" }}>Hoje</button>
                    </div>
                    </div>

                    {/* Grade semanal */}
                    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "52px repeat(7,1fr)", borderBottom: "1px solid #f1f5f9" }}>
                        <div style={{ borderRight: "1px solid #f1f5f9" }} />
                        {WEEK_DAYS.map(d => (
                        <div key={d.num} style={{ padding: "12px 0", textAlign: "center", borderRight: "1px solid #f1f5f9" }}>
                            <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>{d.short}</div>
                            <div style={{
                            width: 30, height: 30, borderRadius: "50%", margin: "0 auto",
                            background: d.today ? "#0d1b3e" : "transparent",
                            color:      d.today ? "#fff"    : "#111827",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 13, fontWeight: 700,
                            }}>
                            {d.num}
                            </div>
                        </div>
                        ))}
                    </div>
                    {HOURS.map(h => (
                        <div key={h} style={{ display: "grid", gridTemplateColumns: "52px repeat(7,1fr)", borderBottom: "1px solid #f9fafb", minHeight: 56 }}>
                        <div style={{ fontSize: 11, color: "#9ca3af", padding: "8px 8px 0", textAlign: "right", borderRight: "1px solid #f1f5f9" }}>{h}</div>
                        {WEEK_DAYS.map((_, di) => {
                            const ev = EVENTS.find(e => e.day === di && e.hour === parseInt(h));
                            return (
                            <div key={di} style={{ borderRight: "1px solid #f9fafb", padding: "3px 4px" }}>
                                {ev && (
                                <div style={{ background: ev.color, borderLeft: `3px solid ${ev.border}`, borderRadius: 7, padding: "5px 8px", fontSize: 11, cursor: "pointer" }}>
                                    <div style={{ fontWeight: 700, color: "#111827", marginBottom: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.title}</div>
                                    <div style={{ color: "#6b7280" }}>{ev.client}</div>
                                    <div style={{ color: "#374151", fontWeight: 600 }}>{ev.price}</div>
                                    <span style={{ display: "inline-block", marginTop: 3, fontSize: 10, background: ev.tagBg, color: ev.tagColor, borderRadius: 4, padding: "1px 6px", fontWeight: 600 }}>{ev.tag}</span>
                                </div>
                                )}
                            </div>
                            );
                        })}
                        </div>
                    ))}
                    </div>

                </div>

                {/* ── COLUNA DIREITA ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {/* Próximos serviços */}
                    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Próximos serviços</span>
                        <button style={{ background: "none", border: "none", color: "#3b82f6", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Ver todos</button>
                    </div>
                    {UPCOMING.map((u, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderTop: i > 0 ? "1px solid #f9fafb" : "none" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#374151", minWidth: 38 }}>{u.time}</span>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: u.dot, flexShrink: 0, marginTop: 4 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.title}</div>
                            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>{u.client}</div>
                            <span style={{ display: "inline-block", marginTop: 4, fontSize: 11, background: u.tagBg, color: u.tagColor, borderRadius: 6, padding: "2px 8px", fontWeight: 600 }}>{u.tag}</span>
                        </div>
                        </div>
                    ))}
                    </div>

                    {/* Pendentes */}
                    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Pendentes</span>
                        <span style={{ background: "#ef4444", color: "#fff", borderRadius: 9999, minWidth: 20, height: 20, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>3</span>
                        </div>
                        <button style={{ background: "none", border: "none", color: "#3b82f6", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Ver todas</button>
                    </div>
                    {PENDING.map((p, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: i > 0 ? "1px solid #f9fafb" : "none" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📋</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{p.time}</div>
                        </div>
                        <span style={{ background: "#dbeafe", color: "#1d4ed8", borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>Nova</span>
                        </div>
                    ))}
                    </div>

                    {/* Ações rápidas */}
                    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "16px" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Ações rápidas</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {[
                        { icon: "🚫", label: "Bloquear horário"   },
                        { icon: "📤", label: "Exportar agenda"     },
                        { icon: "⚙️", label: "Configurar horários" },
                        ].map((a, i) => (
                        <button key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#374151", cursor: "pointer", textAlign: "left" }}>
                            <span>{a.icon}</span>
                            <span style={{ fontWeight: 500 }}>{a.label}</span>
                        </button>
                        ))}
                    </div>
                    </div>

                </div>
                </div>

                {/* ── DISPONIBILIDADE SEMANAL — abaixo do grid, full width ── */}
                <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "16px", marginTop: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Disponibilidade semanal</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
                    {WEEK_AVAIL.map((d, i) => (
                    <div key={i} style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                        padding: "12px 6px", borderRadius: 10,
                        background: d.on ? "#f0fdf4" : "#f9fafb",
                        border: `1px solid ${d.on ? "#bbf7d0" : "#f1f5f9"}`,
                    }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.on ? "#22c55e" : "#e5e7eb" }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#374151" }}>{d.day}</span>
                        <span style={{ fontSize: 10, color: d.on ? "#6b7280" : "#d1d5db", textAlign: "center", lineHeight: 1.4 }}>
                        {d.on ? `${d.from}–${d.to}` : "Indisponível"}
                        </span>
                    </div>
                    ))}
                </div>
                </div>

            </div>
            </main>
        </div>
        </div>
    );
    }