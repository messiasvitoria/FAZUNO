"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, ClipboardList, Circle, Calendar, Clock, Wallet, Pencil } from "lucide-react";
import SidebarPrestador from "../../components/SidebarPrestador";
import TopBarPrestador from "../../components/TopBarPrestador";

const SIDEBAR_WIDTH = 216;

// ═══ DADOS: Calendário (Junho/2026, dia 1 = Segunda) ═══════════════════
const weekLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const weekLabelsFull = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const hours = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];

// day = número do dia no mês (junho/2026). value = valor numérico p/ soma de receita.
const appointments = [
  { day: 8,  row: 3,   span: 2.3, title: "Instalação de chuveiro", name: "Brenda Barbosa",  price: "R$ 120", value: 120, category: "Hidráulica", status: "Confirmado",   accent: "#22C55E", bg: "#F0FDF4" },
  { day: 9,  row: 1,   span: 1.7, title: "Manutenção preventiva",  name: "Marcos Lima",      price: "R$ 200", value: 200, category: "Elétrica",   status: "Novo",         accent: "#3B82F6", bg: "#EFF6FF" },
  { day: 12, row: 2,   span: 1.6, title: "Instalação de tomada",   name: "Fernanda Rocha",   price: "R$ 110", value: 110, category: "Elétrica",   status: "Cancelado",    accent: "#EF4444", bg: "#FEF2F2" },
  { day: 12, row: 4,   span: 1.7, title: "Troca de torneira",      name: "Juliane Costa",    price: "R$ 130", value: 130, category: "Hidráulica", status: "Confirmado",   accent: "#22C55E", bg: "#F0FDF4" },
  { day: 12, row: 7,   span: 1.8, title: "Limpeza residencial",    name: "Carlos Oliveira",  price: "R$ 150", value: 150, category: "Limpeza",    status: "Em andamento", accent: "#F59E0B", bg: "#FFF8EE" },
  { day: 14, row: 2,   span: 1.5, title: "Formatação notebook",    name: "Ana Souza",        price: "R$ 90",  value: 90,  category: "Informática", status: "Novo",        accent: "#3B82F6", bg: "#EFF6FF" },
  { day: 20, row: 5,   span: 1.5, title: "Pintura de sala",        name: "Ricardo Alves",    price: "R$ 380", value: 380, category: "Pintura",     status: "Confirmado",  accent: "#22C55E", bg: "#F0FDF4" },
  { day: 25, row: 3,   span: 1.4, title: "Reparo elétrico",        name: "Bianca Souza",     price: "R$ 160", value: 160, category: "Elétrica",    status: "Em andamento", accent: "#F59E0B", bg: "#FFF8EE" },
];

const CELL_H = 68;

// ═══ DADOS: Toolbar ═══════════════════════════════════════════════════
const views = ["Dia", "Semana", "Mês"];
const categories = ["Todos os serviços", "Elétrica", "Hidráulica", "Limpeza", "Pintura", "Informática"];
const statusesToolbar = ["Todos os status", "Novo", "Confirmado", "Em andamento", "Cancelado"];

// ═══ DADOS: Próximos serviços hoje ════════════════════════════════════
const upcomingServices = [
  { time: "10:00", title: "Instalação de chuveiro", client: "Brenda Barbosa",  status: "Confirmado",   dot: "#22C55E", badgeColor: "#15803D" },
  { time: "14:00", title: "Limpeza residencial",     client: "Carlos Oliveira", status: "Em andamento", dot: "#F59E0B", badgeColor: "#B45309" },
  { time: "16:00", title: "Formatação notebook",     client: "Ana Souza",       status: "Novo",         dot: "#3B82F6", badgeColor: "#1D4ED8" },
];

// ═══ DADOS: Solicitações pendentes ════════════════════════════════════
const pendingRequests = [
  { icon: <ClipboardList size={16} color="#94A3B8" />, title: "Instalação elétrica", time: "Recebida há 5 min" },
  { icon: <ClipboardList size={16} color="#94A3B8" />, title: "Pintura residencial", time: "Recebida há 12 min" },
  { icon: <Circle size={16} color="#CBD5E1" />, title: "Desentupimento", time: "Recebida há 20 min" },
];

// ═══ DADOS: Disponibilidade semanal ════════════════════════════════════
const initialWeekAvailability = [
  { day: "Segunda", hours: "08:00 - 18:00", active: true },
  { day: "Terça",   hours: "08:00 - 18:00", active: true },
  { day: "Quarta",  hours: "08:00 - 18:00", active: true },
  { day: "Quinta",  hours: "08:00 - 18:00", active: true },
  { day: "Sexta",   hours: "08:00 - 18:00", active: true },
  { day: "Sábado",  hours: "08:00 - 12:00", active: true },
  { day: "Domingo", hours: "Indisponível",  active: false },
];

// ═══ Gera a grade de semanas (Seg-Dom) de qualquer mês/ano real ═══════
function generateMonthGrid(year, monthIndex0) {
  const daysInMonth = new Date(year, monthIndex0 + 1, 0).getDate();
  const firstWeekday = new Date(year, monthIndex0, 1).getDay();
  const leadingBlanks = (firstWeekday + 6) % 7;

  const cells = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function AppointmentCard({ apt, top, height, left, width }) {
  return (
    <div
      style={{
        position: "absolute", top, minHeight: height, left, width,
        borderRadius: 8, borderLeft: `3px solid ${apt.accent}`, background: apt.bg,
        padding: "8px 10px", cursor: "pointer", overflow: "visible", boxSizing: "border-box", zIndex: 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: apt.accent, marginTop: 5, flexShrink: 0 }} />
        <p style={{ fontSize: 12, fontWeight: 700, color: "#1E293B", margin: 0, lineHeight: 1.35, wordBreak: "break-word" }}>
          {apt.title}
        </p>
      </div>
      <p style={{ fontSize: 11.5, color: "#64748B", margin: "3px 0 2px 11px", wordBreak: "break-word", whiteSpace: "normal" }}>
        {apt.name}
      </p>
      <p style={{ fontSize: 11.5, fontWeight: 600, color: "#334155", margin: "0 0 0 11px" }}>
        {apt.price}
      </p>
    </div>
  );
}

const formatBRL = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

export default function TelaCalendarioPrestador() {
  const [activeView, setActiveView] = useState("Semana");
  const [category, setCategory] = useState("Todos os serviços");
  const [statusFilter, setStatusFilter] = useState("Todos os status");
  const [weekAvailability, setWeekAvailability] = useState(initialWeekAvailability);

  const TODAY = 8;

  const [currentDay, setCurrentDay] = useState(TODAY);
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);

  const weekStart = 8 + weekOffset * 7;
  const calendarDays = weekLabels.map((label, i) => {
    const num = weekStart + i;
    return { label, num, today: num === TODAY };
  });

  const totalMonthIndex = 5 + monthOffset;
  const yearOffset = Math.floor(totalMonthIndex / 12);
  const normalizedMonthIndex = ((totalMonthIndex % 12) + 12) % 12;
  const currentYear = 2026 + yearOffset;
  const monthLabel = `${monthNames[normalizedMonthIndex]} ${currentYear}`;
  const monthGrid = generateMonthGrid(currentYear, normalizedMonthIndex);
  const isBaseMonth = normalizedMonthIndex === 5 && currentYear === 2026; // Junho/2026 = mês com dados mockados

  const handlePrev = () => {
    if (activeView === "Dia") setCurrentDay((d) => Math.max(1, d - 1));
    else if (activeView === "Semana") setWeekOffset((w) => w - 1);
    else setMonthOffset((m) => m - 1);
  };

  const handleNext = () => {
    if (activeView === "Dia") setCurrentDay((d) => Math.min(30, d + 1));
    else if (activeView === "Semana") setWeekOffset((w) => w + 1);
    else setMonthOffset((m) => m + 1);
  };

  const handleToday = () => {
    setCurrentDay(TODAY);
    setWeekOffset(0);
    setMonthOffset(0);
  };

  const toggleAvailability = (index) => {
    setWeekAvailability((prev) =>
      prev.map((item, i) => (i === index ? { ...item, active: !item.active } : item))
    );
  };

  // ── Aplica os filtros de categoria e status (usados no calendário) ──
  const filteredAppointments = appointments.filter((a) => {
    const matchCategory = category === "Todos os serviços" || a.category === category;
    const matchStatus = statusFilter === "Todos os status" || a.status === statusFilter;
    return matchCategory && matchStatus;
  });

  // ── Calcula quais compromissos caem dentro do período/navegação atual ──
  const periodAppointments = useMemo(() => {
    if (!isBaseMonth && activeView === "Mês") return []; // fora de Junho/2026 não há dados mockados
    if (activeView === "Dia") {
      return filteredAppointments.filter((a) => a.day === currentDay);
    }
    if (activeView === "Semana") {
      const daysInWeek = calendarDays.map((d) => d.num);
      return filteredAppointments.filter((a) => daysInWeek.includes(a.day));
    }
    // Mês
    return filteredAppointments; // todos os compromissos mockados pertencem a Junho/2026
  }, [activeView, currentDay, weekStart, filteredAppointments, isBaseMonth]);

  // ── Stats reais, derivadas do período selecionado ──
  const totalServicos = periodAppointments.length;
  const emAndamento = periodAppointments.filter((a) => a.status === "Em andamento").length;
  const receitaPrevista = periodAppointments.reduce((sum, a) => sum + a.value, 0);

  const periodLabel = activeView === "Dia" ? "hoje" : activeView === "Semana" ? "esta semana" : "este mês";
  const servicosLabel = activeView === "Dia" ? "Hoje" : activeView === "Semana" ? "Esta semana" : "Este mês";

  const dateLabel =
    activeView === "Mês"
      ? monthLabel
      : activeView === "Dia"
      ? `${currentDay} de Junho de 2026`
      : `${weekStart} a ${weekStart + 6} Jun 2026`;

  const currentDayLabelFull = weekLabelsFull[(currentDay - 1) % 7] || "Segunda-feira";

  return (
    <div style={{ minHeight: "100vh", width: "100%", maxWidth: "100vw", overflowX: "hidden", background: "#F7F8FA" }}>
      <SidebarPrestador />

      <div
        style={{
          marginLeft: SIDEBAR_WIDTH,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          minWidth: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ position: "fixed", top: 0, left: SIDEBAR_WIDTH, right: 0, zIndex: 80 }}>
          <TopBarPrestador
            title="Bom dia, Brenda! 👋"
            subtitle="Aqui está o resumo dos seus serviços e agenda."
          />
        </div>

        <main style={{ flex: 1, minWidth: 0, maxWidth: "100%", overflowX: "hidden", paddingTop: 56 }}>
          <div style={{ padding: "28px 32px" }}>

            {/* ═══ SELETOR ÚNICO DE PERÍODO ═══ */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div style={{ display: "flex", background: "#F1F4F9", borderRadius: 10, padding: 3, gap: 2 }}>
                {views.map((v) => (
                  <button
                    key={v}
                    onClick={() => setActiveView(v)}
                    style={{
                      padding: "8px 20px",
                      borderRadius: 8,
                      fontSize: 13.5,
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      background: activeView === v ? "#FDECD8" : "transparent",
                      color: activeView === v ? "#B45309" : "#64748B",
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <span style={{ fontSize: 13, color: "#94A3B8" }}>
                Exibindo dados de: <strong style={{ color: "#334155" }}>{periodLabel}</strong>
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" }}>

              {/* ═══ COLUNA PRINCIPAL ═══ */}
              <div style={{ minWidth: 0 }}>

                {/* ── Stats Cards (calculados a partir dos compromissos reais) ── */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>

                  <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #EEF1F6", padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Calendar size={16} color="#3B82F6" />
                      </div>
                      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>{servicosLabel}</p>
                    </div>
                    <p style={{ margin: 0, lineHeight: 1.1 }}>
                      <span style={{ fontSize: 24, fontWeight: 700, color: "#0F172A" }}>{totalServicos}</span>
                      <span style={{ fontSize: 12.5, color: "#94A3B8", marginLeft: 6 }}>serviços</span>
                    </p>
                  </div>

                  <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #EEF1F6", padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#FEF3E2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Clock size={16} color="#F59E0B" />
                      </div>
                      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Em andamento</p>
                    </div>
                    <p style={{ margin: 0, lineHeight: 1.1 }}>
                      <span style={{ fontSize: 24, fontWeight: 700, color: "#0F172A" }}>{emAndamento}</span>
                      <span style={{ fontSize: 12.5, color: "#94A3B8", marginLeft: 6 }}>serviços</span>
                    </p>
                  </div>

                  <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #EEF1F6", padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#F3EEFE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Wallet size={16} color="#8B5CF6" />
                      </div>
                      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Receita prevista</p>
                    </div>
                    <p style={{ margin: 0, lineHeight: 1.1 }}>
                      <span style={{ fontSize: 24, fontWeight: 700, color: "#0F172A" }}>{formatBRL(receitaPrevista)}</span>
                      <span style={{ fontSize: 12.5, color: "#94A3B8", marginLeft: 6 }}>{periodLabel}</span>
                    </p>
                  </div>

                </div>

                {/* ── Calendário ── */}
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 18 }}>

                  <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "flex-start", gap: 10, marginBottom: 16 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, flex: "1 1 auto", minWidth: 0 }}>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ border: "1px solid #E5E9F0", borderRadius: 9, padding: "8px 12px", fontSize: 13, color: "#334155", background: "#fff", cursor: "pointer" }}
                      >
                        {categories.map((c) => <option key={c}>{c}</option>)}
                      </select>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ border: "1px solid #E5E9F0", borderRadius: 9, padding: "8px 12px", fontSize: 13, color: "#334155", background: "#fff", cursor: "pointer" }}
                      >
                        {statusesToolbar.map((s) => <option key={s}>{s}</option>)}
                      </select>

                      <div style={{ display: "flex", alignItems: "center", gap: 7, border: "1px solid #E5E9F0", borderRadius: 9, padding: "8px 12px", fontSize: 13, color: "#334155" }}>
                        <CalendarDays size={14} color="#94A3B8" />
                        {dateLabel}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      <button
                        onClick={handleToday}
                        style={{ padding: "8px 16px", fontSize: 13, fontWeight: 600, borderRadius: 9, border: "1px solid #E5E9F0", background: "#fff", color: "#334155", cursor: "pointer" }}
                      >
                        Hoje
                      </button>
                      <button
                        onClick={handlePrev}
                        style={{ padding: 8, borderRadius: 9, border: "1px solid #E5E9F0", background: "#fff", color: "#64748B", cursor: "pointer", display: "flex" }}
                      >
                        <ChevronLeft size={15} />
                      </button>
                      <button
                        onClick={handleNext}
                        style={{ padding: 8, borderRadius: 9, border: "1px solid #E5E9F0", background: "#fff", color: "#64748B", cursor: "pointer", display: "flex" }}
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>

                  {/* ═══ VISÃO: SEMANA ═══ */}
                  {activeView === "Semana" && (
                    <div style={{ border: "1px solid #F1F4F9", borderRadius: 12, overflow: "hidden" }}>
                      <div style={{ display: "grid", gridTemplateColumns: `48px repeat(7, 1fr)` }}>
                        <div />
                        {calendarDays.map((d) => (
                          <div key={d.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0" }}>
                            <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>{d.label}</span>
                            <span
                              style={{
                                fontSize: 15, fontWeight: 700, marginTop: 4, width: 30, height: 30, borderRadius: "50%",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                background: d.today ? "#FDECD8" : "transparent", color: d.today ? "#B45309" : "#334155",
                              }}
                            >
                              {d.num}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div style={{ position: "relative" }}>
                        {hours.map((h) => (
                          <div key={h} style={{ display: "grid", gridTemplateColumns: `48px repeat(7, 1fr)`, height: CELL_H }}>
                            <div style={{ fontSize: 11, color: "#B0B8C4", padding: "2px 8px 0 0", textAlign: "right" }}>{h}</div>
                            {calendarDays.map((_, di) => (
                              <div key={di} style={{ borderLeft: "1px solid #F5F7FA", borderTop: "1px solid #F5F7FA" }} />
                            ))}
                          </div>
                        ))}

                        {periodAppointments.map((apt, i) => {
                          const col = calendarDays.findIndex((d) => d.num === apt.day);
                          if (col === -1) return null;
                          const top = apt.row * CELL_H + 4;
                          const height = apt.span * CELL_H - 8;
                          const left = `calc(48px + ${col} * (100% - 48px) / 7 + 4px)`;
                          const width = `calc((100% - 48px) / 7 - 8px)`;
                          return <AppointmentCard key={i} apt={apt} top={top} height={height} left={left} width={width} />;
                        })}
                      </div>
                    </div>
                  )}

                  {/* ═══ VISÃO: DIA ═══ */}
                  {activeView === "Dia" && (
                    <div style={{ border: "1px solid #F1F4F9", borderRadius: 12, overflow: "hidden" }}>
                      <div style={{ display: "grid", gridTemplateColumns: `48px 1fr` }}>
                        <div />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0" }}>
                          <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>{currentDayLabelFull}</span>
                          <span
                            style={{
                              fontSize: 15, fontWeight: 700, marginTop: 4, width: 30, height: 30, borderRadius: "50%",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              background: currentDay === TODAY ? "#FDECD8" : "transparent",
                              color: currentDay === TODAY ? "#B45309" : "#334155",
                            }}
                          >
                            {String(currentDay).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      <div style={{ position: "relative" }}>
                        {hours.map((h) => (
                          <div key={h} style={{ display: "grid", gridTemplateColumns: `48px 1fr`, height: CELL_H }}>
                            <div style={{ fontSize: 11, color: "#B0B8C4", padding: "2px 8px 0 0", textAlign: "right" }}>{h}</div>
                            <div style={{ borderLeft: "1px solid #F5F7FA", borderTop: "1px solid #F5F7FA" }} />
                          </div>
                        ))}

                        {periodAppointments.map((apt, i) => {
                          const top = apt.row * CELL_H + 4;
                          const height = apt.span * CELL_H - 8;
                          return <AppointmentCard key={i} apt={apt} top={top} height={height} left="calc(48px + 4px)" width="calc(100% - 48px - 8px)" />;
                        })}
                      </div>
                    </div>
                  )}

                  {/* ═══ VISÃO: MÊS ═══ */}
                  {activeView === "Mês" && (
                    <div style={{ border: "1px solid #F1F4F9", borderRadius: 12, overflow: "hidden" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", background: "#FAFBFD", borderBottom: "1px solid #F1F4F9" }}>
                        {weekLabels.map((label) => (
                          <div key={label} style={{ textAlign: "center", padding: "10px 0", fontSize: 12, fontWeight: 600, color: "#94A3B8" }}>
                            {label}
                          </div>
                        ))}
                      </div>

                      {monthGrid.map((week, wi) => (
                        <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: wi < monthGrid.length - 1 ? "1px solid #F5F7FA" : "none" }}>
                          {week.map((dayNum, di) => {
                            const dayAppointments = dayNum && isBaseMonth ? periodAppointments.filter((a) => a.day === dayNum) : [];
                            const isToday = isBaseMonth && dayNum === TODAY;
                            return (
                              <div
                                key={di}
                                style={{
                                  minHeight: 96,
                                  borderLeft: di > 0 ? "1px solid #F5F7FA" : "none",
                                  padding: 8,
                                  background: isToday ? "#FFFBF5" : "transparent",
                                }}
                              >
                                {dayNum && (
                                  <>
                                    <span
                                      style={{
                                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                                        width: 24, height: 24, borderRadius: "50%", fontSize: 13, fontWeight: 700,
                                        background: isToday ? "#FDECD8" : "transparent", color: isToday ? "#B45309" : "#334155", marginBottom: 6,
                                      }}
                                    >
                                      {dayNum}
                                    </span>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                      {dayAppointments.slice(0, 2).map((apt, i) => (
                                        <div
                                          key={i}
                                          style={{
                                            fontSize: 10.5, fontWeight: 600, color: "#1E293B", background: apt.bg,
                                            borderLeft: `3px solid ${apt.accent}`, borderRadius: 5, padding: "3px 6px",
                                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                          }}
                                        >
                                          {apt.title}
                                        </div>
                                      ))}
                                      {dayAppointments.length > 2 && (
                                        <span style={{ fontSize: 10, color: "#94A3B8", paddingLeft: 4 }}>
                                          +{dayAppointments.length - 2} mais
                                        </span>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ═══ COLUNA DIREITA ═══ */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "#334155", margin: 0 }}>Próximos serviços hoje</h3>
                    <button style={{ fontSize: 12, fontWeight: 500, color: "#94A3B8", background: "transparent", border: "none", cursor: "pointer" }}>
                      Ver todos
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {upcomingServices.map((s, i) => (
                      <div
                        key={s.time}
                        style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 0", borderTop: i > 0 ? "1px solid #F4F6F9" : "none" }}
                      >
                        <span style={{ fontSize: 12, fontWeight: 500, color: "#B0B8C4", width: 36, flexShrink: 0, paddingTop: 2 }}>{s.time}</span>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, marginTop: 6, flexShrink: 0, opacity: 0.85 }} />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <p style={{ fontSize: 13, fontWeight: 500, color: "#1E293B", margin: "0 0 2px" }}>{s.title}</p>
                          <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>{s.client}</p>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 500, color: s.badgeColor, flexShrink: 0, paddingTop: 2, whiteSpace: "nowrap" }}>
                          {s.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <h3 style={{ fontSize: 14.5, fontWeight: 700, color: "#0F172A", margin: 0 }}>Solicitações pendentes</h3>
                      <span
                        style={{
                          width: 20, height: 20, borderRadius: "50%", background: "#FEF3E2", color: "#B45309",
                          fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        3
                      </span>
                    </div>
                    <button style={{ fontSize: 12.5, fontWeight: 500, color: "#3B82F6", background: "transparent", border: "none", cursor: "pointer" }}>
                      Ver todas
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {pendingRequests.map((r, i) => (
                      <div
                        key={i}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderTop: i > 0 ? "1px solid #F1F4F9" : "none" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {r.icon}
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", margin: 0 }}>{r.title}</p>
                            <p style={{ fontSize: 11.5, color: "#94A3B8", margin: 0 }}>{r.time}</p>
                          </div>
                        </div>
                        <span style={{ fontSize: 11.5, fontWeight: 600, background: "#DCFCE7", color: "#15803D", padding: "3px 10px", borderRadius: 999 }}>
                          Nova
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EEF1F6", padding: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <h3 style={{ fontSize: 14.5, fontWeight: 700, color: "#0F172A", margin: 0 }}>Disponibilidade semanal</h3>
                    <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12.5, fontWeight: 500, color: "#3B82F6", background: "transparent", border: "none", cursor: "pointer" }}>
                      <Pencil size={13} />
                      Editar
                    </button>
                  </div>
                  <div>
                    {weekAvailability.map((d, i) => (
                      <div
                        key={d.day}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderTop: i > 0 ? "1px solid #F1F4F9" : "none" }}
                      >
                        <span style={{ fontSize: 13, color: "#334155", width: 70 }}>{d.day}</span>
                        <span style={{ fontSize: 12.5, color: d.active ? "#64748B" : "#CBD5E1" }}>{d.hours}</span>
                        <button
                          onClick={() => toggleAvailability(i)}
                          style={{
                            fontSize: 11.5, fontWeight: 600, padding: "3px 12px", borderRadius: 999, border: "none", cursor: "pointer",
                            background: d.active ? "#DCFCE7" : "#F1F5F9", color: d.active ? "#15803D" : "#94A3B8",
                          }}
                        >
                          {d.active ? "Ativo" : "Inativo"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}