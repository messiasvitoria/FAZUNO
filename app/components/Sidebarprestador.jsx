import { useEffect, useRef, useState } from "react";
import {
  Home, ClipboardList, Zap, Briefcase, CalendarDays, MessageSquare,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Início",                icon: Home },
  { label: "Solicitações Recebidas",icon: ClipboardList },
  { label: "Oportunidades",         icon: Zap },
  { label: "Meus Serviços",         icon: Briefcase },
  { label: "Agenda",                icon: CalendarDays },
  { label: "Chat",                  icon: MessageSquare },
];

function FazunoLogo({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 18 L20 6 L34 18 V34 H6 V18 Z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M20 18 V34 M6 26 H34" stroke="#fff" strokeWidth="1.4" />
      <path d="M10.5 23 L14 19.5 M13 19 L14.7 20.7" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M24.5 19.5 L29 23" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="27.5" y="21" width="2.6" height="2.6" rx="0.5" transform="rotate(45 28.8 22.3)" fill="#fff" />
      <rect x="9" y="29" width="7" height="2.4" rx="1" stroke="#fff" strokeWidth="1.2" />
      <path d="M12.5 31.4 V33.2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M28.8 32.6c-2.8-1.7-4-3-4-4.5a1.9 1.9 0 0 1 3.5-1.1.4.4 0 0 0 .6 0 1.9 1.9 0 0 1 3.5 1.1c0 1.5-1.2 2.8-4 4.5a.3.3 0 0 1-.3 0Z" fill="#fff" />
    </svg>
  );
}

export default function Sidebar({ activeNav, onNav }) {
  return (
    <aside style={{
      width: 220,
      background: "#0d1b3e",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      minHeight: "100vh",
    }}>
      {/* Logo */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: "22px 16px 18px",
        borderBottom: "0.5px solid rgba(255,255,255,0.10)",
      }}>
        <FazunoLogo size={42} />
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "0.12em" }}>
          FAZUNO
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(({ label, icon: Icon }) => {
          const active = activeNav === label;
          return (
            <button
              key={label}
              onClick={() => onNav(label)}
              aria-current={active ? "page" : undefined}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                borderRadius: 10,
                background: active ? "rgba(255,255,255,0.12)" : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.55)",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <Icon size={17} strokeWidth={active ? 2.4 : 2} style={{ flexShrink: 0 }} />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}