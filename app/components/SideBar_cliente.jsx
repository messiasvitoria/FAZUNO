"use client";

import { useRouter, usePathname } from "next/navigation";

// ─── ICON ─────────────────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    home: ["M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z", "M9 21V12h6v9"],
    plus: ["M12 5v14", "M5 12h14"],
    list: ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
    chat: ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
  };

  const d = paths[name];
  if (!d) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

// ─── ROTAS ────────────────────────────────────────────────────────────────────
const navItems = [
  { icon: "home", label: "Início",                   route: "/Pages/Tela_inicial_cliente" },
  { icon: "plus", label: "Abrir novas solicitações", route: "/Pages/Escolha_contratacao" },
  { icon: "list", label: "Minhas solicitações",      route: "/Pages/Minhas_Solicitacoes" },
  { icon: "chat", label: "Chat",                     route: "/Pages/Chat?perfil=cliente" },
];

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
export default function Sidebar() {
  const router   = useRouter();
  const pathname = usePathname();

  const isActive = (item) => {
    if (!item.route) return false;
    if (item.route === "/Pages/Tela_inicial_cliente") {
      return pathname === item.route || pathname === "/Pages/Busca_cliente";
    }
    return pathname === item.route;
  };

  const handleClick = (item) => {
    if (item.route) router.push(item.route);
  };

  return (
    <div
      style={{
        width: 180,
        minWidth: 180,
        maxWidth: 180,   
        height: "100vh",
        minHeight: "100vh",
        backgroundColor: "#0d1b3e",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        zIndex: 30,
        boxShadow: "4px 0 24px rgba(0,0,0,0.25)",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <img src="/Logo_branca.png" alt="FazUno" style={{ width: 90, height: "auto" }} />
        </div>
      </div>

      {/* NAV ITEMS */}
      <nav
        style={{
          flex: 1,
          padding: "12px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {navItems.map((item, i) => {
          const active = isActive(item);
          return (
            <button
              key={i}
              onClick={() => handleClick(item)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                backgroundColor: active ? "rgba(255,255,255,0.15)" : "transparent",
                color: active ? "white" : "rgba(255,255,255,0.55)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!active)
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                if (!active)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span style={{ flexShrink: 0, marginTop: 1 }}>
                <Icon
                  name={item.icon}
                  size={17}
                  color={active ? "white" : "rgba(255,255,255,0.5)"}
                  strokeWidth={2}
                />
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
