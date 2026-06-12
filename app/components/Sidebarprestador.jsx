"use client";

import { useRouter, usePathname } from "next/navigation";

// ─── ICON COMPONENT ───────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }: {
  name: string; size?: number; color?: string; strokeWidth?: number;
}) {
  const paths: Record<string, string[]> = {
    home:      ["M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z","M9 21V12h6v9"],
    list:      ["M8 6h13","M8 12h13","M8 18h13","M3 6h.01","M3 12h.01","M3 18h.01"],
    briefcase: ["M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z","M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"],
    calendar:  ["M3 4h18v18H3z","M16 2v4","M8 2v4","M3 10h18"],
    chat:      ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
    bell:      ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"],
    help:      ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3","M12 17h.01"],
    settings:  ["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
    chevDown:  ["M6 9l6 6 6-6"],
    user:      ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 7m-4 0a4 4 0 108 0 4 4 0 00-8 0"],
    zap:       ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
    xIcon:     ["M18 6L6 18","M6 6l12 12"],
  };
  const d = paths[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const navItems = [
  { icon: "home",      label: "Início",                route: "/Pages/Tela_Inicial_prestador" },
  { icon: "list",      label: "Solicitações Recebidas", route: "/Pages/Solicitacao_prestador"  },
  { icon: "zap",       label: "Oportunidades",          route: "/Pages/Oportunidades"          },
  { icon: "briefcase", label: "Meus Serviços",          route: "/Pages/MeusServicos"           },
  { icon: "calendar",  label: "Agenda",                 route: "/Pages/Agenda"                 },
  { icon: "chat",      label: "Chat",                   route: "/Pages/Chat"                   },
];

export default function SidebarPrestador() {
  const router   = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === "/Pages/Tela_Inicial_prestador") {
      return pathname === route;
    }
    return pathname.startsWith(route);
  };

  return (
    <div style={{
      width: 200,
      minWidth: 200,
      height: "100%",
      backgroundColor: "#0d1b3e",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      zIndex: 30,
      boxShadow: "4px 0 24px rgba(0,0,0,0.25)",
    }}>

      {/* Logo */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <img src="/Logo_branca.png" alt="FazUno" style={{ width: 100, height: "auto", objectFit: "contain" }} />
      </div>

      {/* Nav */}
      <nav style={{
        flex: 1,
        padding: "10px 8px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "stretch",
        overflowY: "auto",
      }}>
        {navItems.map((item) => {
          const active = isActive(item.route);
          return (
            <button
              key={item.route}
              onClick={() => router.push(item.route)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 10px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                backgroundColor: active ? "rgba(255,255,255,0.15)" : "transparent",
                color: active ? "white" : "rgba(255,255,255,0.55)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={e => {
                if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              <span style={{ flexShrink: 0 }}>
                <Icon name={item.icon} size={16} color={active ? "white" : "rgba(255,255,255,0.5)"} strokeWidth={2} />
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.3, flex: 1 }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}