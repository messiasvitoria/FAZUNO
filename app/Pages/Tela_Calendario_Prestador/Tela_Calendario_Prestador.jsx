"use client";

import { useState } from "react";
import { fontBase } from "./styles/tokens";
import Sidebar      from "./components/Sidebar";
import Topbar       from "./components/Topbar";
import StatsRow     from "./components/StatsRow";
import CalendarGrid from "./components/CalendarGrid";
import RightPanel   from "./components/RightPanel";

const INITIAL_WEEK_AVAIL = [
  { day: "Seg", on: true,  from: "08:00", to: "18:00" },
  { day: "Ter", on: true,  from: "08:00", to: "18:00" },
  { day: "Qua", on: true,  from: "08:00", to: "18:00" },
  { day: "Qui", on: true,  from: "08:00", to: "18:00" },
  { day: "Sex", on: true,  from: "08:00", to: "17:00" },
  { day: "Sáb", on: false, from: "",      to: ""      },
  { day: "Dom", on: false, from: "",      to: ""      },
];

export default function TelaCalendarioPrestador() {
  const [activeNav,  setActiveNav]  = useState("Agenda");
  const [status,     setStatus]     = useState("active");
  const [weekAvail,  setWeekAvail]  = useState(INITIAL_WEEK_AVAIL);

  function toggleDay(index) {
    setWeekAvail((prev) => prev.map((d, i) => (i === index ? { ...d, on: !d.on } : d)));
  }

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#f8f9fb",
      fontFamily: fontBase,
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); button,select,input{font-family:inherit}`}</style>

      <Sidebar activeNav={activeNav} onNav={setActiveNav} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar status={status} onStatusChange={setStatus} />

        <main style={{ flex: 1, padding: 24, background: "#f8f9fb" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, maxWidth: 1400, margin: "0 auto" }}>

            {/* Coluna esquerda */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111827", margin: 0 }}>Minha Agenda</h1>
                <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>Segunda-feira, 08 de Junho de 2026</p>
              </div>
              <StatsRow />
              <CalendarGrid />
            </div>

            {/* Coluna direita */}
            <RightPanel weekAvail={weekAvail} onToggleDay={toggleDay} />
          </div>
        </main>
      </div>
    </div>
  );
}