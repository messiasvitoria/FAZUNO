import { colors, card, btnLink } from "../styles/tokens";
import { UPCOMING, PENDING, WEEK_AVAIL, QUICK_ACTIONS } from "../data/agenda";
import { Dropdown, DropdownItem, AVAILABILITY_ACTIONS } from "./Topbar";

export default function RightPanel({ weekAvail, onToggleDay }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <AvailabilityBanner />
      <UpcomingServices />
      <PendingRequests />
      <WeeklyAvailability week={weekAvail} onToggleDay={onToggleDay} />
      <QuickActions />
    </div>
  );
}

/* ── 1. Banner disponibilidade ── */
function AvailabilityBanner() {
  return (
    <div style={{ ...card, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: colors.textPrimary }}>
          Disponível para receber serviços
        </span>
      </div>
      <Dropdown align="right" width={230} trigger={(toggle) => (
        <button onClick={toggle} style={{
          background: "none", border: `0.5px solid ${colors.borderLight}`,
          borderRadius: 8, padding: "4px 8px", fontSize: 11, color: "#374151", cursor: "pointer",
        }}>
          Alterar ▾
        </button>
      )}>
        {(close) => AVAILABILITY_ACTIONS.map((a) => (
          <DropdownItem key={a.label} icon={a.icon} label={a.label} onClick={close} />
        ))}
      </Dropdown>
    </div>
  );
}

/* ── 2. Próximos serviços ── */
function UpcomingServices() {
  return (
    <div style={card}>
      <PanelHeader title="Próximos serviços hoje" actionLabel="Ver todos" />
      {UPCOMING.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 0", borderTop: i > 0 ? `0.5px solid ${colors.borderXLight}` : "none" }}>
          <span style={{ fontSize: 11, color: "#374151", fontWeight: 500, minWidth: 34, marginTop: 2 }}>{item.time}</span>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: item.dot, flexShrink: 0, marginTop: 4 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textPrimary }}>{item.title}</div>
            <div style={{ fontSize: 11, color: colors.textSecondary }}>{item.client}</div>
            <Badge label={item.tag} color={item.tagColor} bg={item.tagBg} />
          </div>
          <span style={{ color: colors.textMuted, fontSize: 14 }}>›</span>
        </div>
      ))}
    </div>
  );
}

/* ── 3. Pendentes ── */
function PendingRequests() {
  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary }}>Solicitações pendentes</span>
          <span style={{ background: colors.red, color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {PENDING.length}
          </span>
        </div>
        <button style={btnLink}>Ver todas</button>
      </div>
      {PENDING.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderTop: i > 0 ? `0.5px solid ${colors.borderXLight}` : "none" }}>
          <span style={{ fontSize: 18 }}>📋</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textPrimary }}>{item.title}</div>
            <div style={{ fontSize: 10, color: colors.textMuted }}>{item.time}</div>
          </div>
          <Badge label="Nova" color="#1d4ed8" bg="#dbeafe" />
        </div>
      ))}
    </div>
  );
}

/* ── 4. Disponibilidade semanal ── */
function WeeklyAvailability({ week, onToggleDay }) {
  const data = week ?? WEEK_AVAIL;
  return (
    <div style={card}>
      <div style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary, marginBottom: 10 }}>Disponibilidade semanal</div>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderTop: i > 0 ? `0.5px solid ${colors.borderXLight}` : "none" }}>
          <span style={{ fontSize: 12, color: "#374151", width: 30 }}>{d.day}</span>
          <button
            onClick={() => onToggleDay?.(i)}
            aria-pressed={d.on}
            style={{ width: 34, height: 18, borderRadius: 10, background: d.on ? colors.blue : colors.borderLight, position: "relative", cursor: "pointer", border: "none", padding: 0 }}
          >
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: d.on ? 18 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
          </button>
          <span style={{ fontSize: 11, color: d.on ? "#374151" : colors.textMuted }}>{d.on ? `${d.from} – ${d.to}` : "Indisponível"}</span>
        </div>
      ))}
    </div>
  );
}

/* ── 5. Ações rápidas ── */
function QuickActions() {
  return (
    <div style={card}>
      <div style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary, marginBottom: 10 }}>Ações rápidas</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {QUICK_ACTIONS.map((label, i) => (
          <button key={i} style={{ background: "#f9fafb", border: `0.5px solid ${colors.borderLight}`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#374151", cursor: "pointer", textAlign: "left" }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Utilitários ── */
function PanelHeader({ title, actionLabel }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary }}>{title}</span>
      <button style={btnLink}>{actionLabel}</button>
    </div>
  );
}

function Badge({ label, color, bg }) {
  return (
    <span style={{ display: "inline-block", marginTop: 3, fontSize: 10, background: bg, color, borderRadius: 6, padding: "2px 7px", fontWeight: 500 }}>
      {label}
    </span>
  );
}
