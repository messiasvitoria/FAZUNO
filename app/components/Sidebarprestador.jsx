"use client";

import { usePathname, useRouter } from "next/navigation";

function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    home: ["M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z", "M9 21V12h6v9"],
    list: ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
    briefcase: ["M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z", "M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"],
    calendar: ["M3 4h18v18H3z", "M16 2v4", "M8 2v4", "M3 10h18"],
    chat: ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
    zap: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  };
  const d = paths[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const navItems = [
  { icon: "home", label: "Início", route: "/Pages/Tela_Inicial_prestador", activePaths: ["/Pages/Tela_Inicial_prestador"] },
  { icon: "list", label: "Solicitações Recebidas", route: "/Pages/Solicitacao_prestador", activePaths: ["/Pages/Solicitacao_prestador", "/Pages/Detalhes_solicitacao_prestador", "/Pages/Cancelamento_prestador"] },
  { icon: "zap", label: "Oportunidades", route: "/Pages/Oportunidades", activePaths: ["/Pages/Oportunidades"] },
  { icon: "briefcase", label: "Meus Serviços", route: "/Pages/Seus_servicos_prestador", activePaths: ["/Pages/Seus_servicos_prestador", "/Pages/Tela_CadastroServico_Prestador"] },
  { icon: "calendar", label: "Agenda", route: "/Pages/Tela_Calendario_Prestador", activePaths: ["/Pages/Tela_Calendario_Prestador"] },
  { icon: "chat", label: "Chat", route: "/Pages/Chat?perfil=prestador", activePaths: ["/Pages/Chat"] },
];

export default function SidebarPrestador() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (item) =>
    item.activePaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  return (
    <aside style={{
      width: 216,
      minWidth: 216,
      height: "100vh",
      minHeight: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      backgroundColor: "#0d1b3e",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      zIndex: 30,
      boxShadow: "4px 0 24px rgba(0,0,0,0.25)",
      overflow: "hidden",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <img src="/Logo_branca.png" alt="FazUno" style={{ width: 100, height: "auto", objectFit: "contain" }} />
      </div>

      <nav style={{
        flex: 1,
        padding: "10px 8px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "stretch",
        overflowY: "auto",
      }}>
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <button
              key={item.route}
              type="button"
              onClick={() => router.push(item.route)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                backgroundColor: active ? "rgba(255,255,255,0.15)" : "transparent",
                color: active ? "white" : "rgba(255,255,255,0.68)",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(event) => {
                if (!active) event.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(event) => {
                if (!active) event.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span style={{ flexShrink: 0, height: 18, display: "inline-flex", alignItems: "center" }}>
                <Icon name={item.icon} size={17} color={active ? "white" : "rgba(255,255,255,0.58)"} strokeWidth={2} />
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2, flex: 1, whiteSpace: "nowrap" }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
