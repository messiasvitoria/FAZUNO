"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── ICON COMPONENT ───────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    home:      ["M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z","M9 21V12h6v9"],
    list:      ["M8 6h13","M8 12h13","M8 18h13","M3 6h.01","M3 12h.01","M3 18h.01"],
    briefcase: ["M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z","M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"],
    calendar:  ["M3 4h18v18H3z","M16 2v4","M8 2v4","M3 10h18"],
    chat:      ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
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
  { icon: "home",      label: "Início",                 route: "/Pages/Tela_Inicial_prestador"                         },
  { icon: "list",      label: "Solicitações Recebidas", route: "/Pages/Solicitacao_prestador"         },
  { icon: "zap",       label: "Oportunidades",          route: "/Pages/Oportunidades"                 },
  { icon: "briefcase", label: "Meus Serviços",          route: "/Pages/Seus_servicos_prestador"       },
  { icon: "calendar",  label: "Agenda",                 route: "/Pages/Tela_calendarioPrestador"     },
  { icon: "chat",      label: "Chat",                   route: "/Pages/Chat_prestador"                },
];

export default function Parte_menulateral({ activeRoute = "" }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (route) => {
    if (route) router.push(route);
    setMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <>
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
        {navItems.map((item, i) => {
          const active = activeRoute === item.route;
          return (
            <button
              key={i}
              onClick={() => handleNavClick(item.route)}
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
              onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = active ? "rgba(255,255,255,0.15)" : "transparent"; }}
            >
              <span style={{ flexShrink: 0 }}>
                <Icon name={item.icon} size={16} color={active ? "white" : "rgba(255,255,255,0.5)"} strokeWidth={2} />
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.3, flex: 1 }}>{item.label}</span>
              {item.badge != null && (
                <span style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  fontSize: 10,
                  fontWeight: 700,
                  borderRadius: 9999,
                  padding: "1px 6px",
                  lineHeight: 1.6,
                  flexShrink: 0,
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* SIDEBAR DESKTOP */}
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
        <SidebarContent />
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <div
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)" }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div style={{
            position: "fixed", top: 0, left: 0, bottom: 0, width: 220,
            backgroundColor: "#0d1b3e", display: "flex", flexDirection: "column",
            boxShadow: "4px 0 40px rgba(0,0,0,0.4)",
          }}>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 12px 0" }}>
              <button onClick={() => setMobileMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
                <Icon name="xIcon" size={20} color="rgba(255,255,255,0.6)" strokeWidth={2.5} />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}