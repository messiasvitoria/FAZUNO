"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NotificacoesPrestador from "./NotificacoesPrestador";

function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    bell: ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 01-3.46 0"],
    help: ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3", "M12 17h.01"],
    settings: ["M12 15a3 3 0 100-6 3 3 0 000 6z", "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
    chevDown: ["M6 9l6 6 6-6"],
    user: ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2", "M12 7m-4 0a4 4 0 108 0 4 4 0 00-8 0"],
    briefcase: ["M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z", "M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"],
    creditCard: ["M3 6h18v12H3z", "M3 10h18"],
    barChart: ["M4 19V9", "M12 19V5", "M20 19v-8"],
    logOut: ["M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4", "M16 17l5-5-5-5", "M21 12H9"],
    shield: ["M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z", "M9 12l2 2 4-4"],
  };
  const d = paths[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, index) => <path key={index} d={p} />)}
    </svg>
  );
}

function StatusDropdown({ isOnline, onChange, onClose }) {
  const options = [
    { online: true, title: "Ativo para novos serviços", sub: "Você está visível para receber solicitações." },
    { online: false, title: "Ficar offline", sub: "Você não receberá novas solicitações." },
  ];

  return (
    <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", width: 270, backgroundColor: "white", borderRadius: 14, boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 200, overflow: "hidden", border: "1px solid #f1f5f9" }}>
      {options.map((option) => (
        <button
          key={String(option.online)}
          type="button"
          onClick={() => {
            onChange(option.online);
            onClose();
          }}
          style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", cursor: "pointer", backgroundColor: isOnline === option.online ? "#f8fafc" : "white", border: "none", textAlign: "left" }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: option.online ? "#22c55e" : "#94a3b8", flexShrink: 0, marginTop: 4 }} />
          <span>
            <span style={{ display: "block", margin: 0, fontSize: 13, fontWeight: 600, color: "#0d1b3e" }}>{option.title}</span>
            <span style={{ display: "block", marginTop: 2, fontSize: 11.5, color: "#64748b" }}>{option.sub}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

function ProfileMenu({ onClose }) {
  const router = useRouter();
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const menuItems = [
    { icon: "user", label: "Meu Perfil", route: "/Pages/Meu_perfil_prestador" },
    { icon: "creditCard", label: "Financeiro e Repasses", route: null },
    { icon: "barChart", label: "Desempenho", route: null },
    { icon: "settings", label: "Configurações da Conta", route: null },
  ];

  const goTo = (route) => {
    if (!route) return;
    onClose();
    router.push(route);
  };

  const logout = () => {
    onClose();
    router.push("/Pages/Login");
  };

  return (
    <>
      <style>{`
        @keyframes providerProfileMenuIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div
        ref={menuRef}
        style={{
          position: "fixed",
          top: 64,
          right: 16,
          width: 320,
          backgroundColor: "white",
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          zIndex: 1000,
          overflow: "hidden",
          border: "1px solid #f1f5f9",
          animation: "providerProfileMenuIn 0.18s ease",
        }}
      >
        <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: "2.5px solid #22c55e", flexShrink: 0 }}>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="João Silva" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#0d1b3e", lineHeight: 1.2 }}>João Silva</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Prestador Verificado</span>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 17, height: 17, borderRadius: "50%", background: "#22c55e" }}>
                <Icon name="shield" size={12} color="white" strokeWidth={2.4} />
              </span>
            </div>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: "#f1f5f9", margin: "0 20px" }} />

        <div style={{ padding: "8px 10px" }}>
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => goTo(item.route)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "13px 12px",
                borderRadius: 12,
                border: "none",
                backgroundColor: "transparent",
                cursor: item.route ? "pointer" : "default",
                textAlign: "left",
                transition: "background 0.15s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor = "#f8fafc";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Icon name={item.icon} size={20} color="#0d1b3e" strokeWidth={1.8} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#0d1b3e" }}>{item.label}</span>
            </button>
          ))}
        </div>

        <div style={{ height: 1, backgroundColor: "#f1f5f9", margin: "0 20px" }} />

        <div style={{ padding: "8px 10px 10px" }}>
          <button
            type="button"
            onClick={logout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "13px 12px",
              borderRadius: 12,
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.15s",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.backgroundColor = "#fff1f2";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Icon name="logOut" size={20} color="#ef4444" strokeWidth={1.8} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#ef4444" }}>Sair</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default function TopBarPrestador({ title = "Olá, João!", subtitle = "Aqui está o resumo do seu dia!" }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const notifRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setNotifOpen(false);
      if (statusRef.current && !statusRef.current.contains(event.target)) setStatusOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header style={{ height: 56, backgroundColor: "#0d1b3e", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px", flexShrink: 0, position: "relative", zIndex: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
      <div />

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div ref={statusRef} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <button type="button" onClick={() => setStatusOpen((open) => !open)} style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.1)", border: "none", borderRadius: 999, padding: "6px 14px", cursor: "pointer" }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: isOnline ? "#22c55e" : "#94a3b8" }} />
            <span style={{ color: "white", fontSize: 13, fontWeight: 500 }}>{isOnline ? "Ativo para novos serviços" : "Offline"}</span>
            <Icon name="chevDown" size={13} color="rgba(255,255,255,0.55)" />
          </button>
          {statusOpen && <StatusDropdown isOnline={isOnline} onChange={setIsOnline} onClose={() => setStatusOpen(false)} />}
        </div>

        <div ref={notifRef} style={{ position: "relative" }}>
          <button type="button" onClick={() => setNotifOpen((open) => !open)} style={{ position: "relative", padding: 8, borderRadius: 8, border: "none", backgroundColor: notifOpen ? "rgba(255,255,255,0.15)" : "transparent", cursor: "pointer" }}>
            <Icon name="bell" size={20} color="rgba(255,255,255,0.75)" />
            <span style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, borderRadius: "50%", backgroundColor: "#f97316", color: "white", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>5</span>
          </button>
          {notifOpen && (
            <div style={{ position: "fixed", top: 60, right: 20, zIndex: 999 }}>
              <NotificacoesPrestador onClose={() => setNotifOpen(false)} />
            </div>
          )}
        </div>

        <button type="button" style={{ padding: 8, borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer" }}>
          <Icon name="help" size={20} color="rgba(255,255,255,0.75)" />
        </button>
        <button type="button" style={{ padding: 8, borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer" }}>
          <Icon name="settings" size={20} color="rgba(255,255,255,0.75)" />
        </button>
        <div style={{ width: 1, height: 28, backgroundColor: "rgba(255,255,255,0.2)" }} />
        <button
          type="button"
          onClick={() => setProfileOpen((open) => !open)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: "none",
            background: profileOpen ? "rgba(255,255,255,0.12)" : "transparent",
            cursor: "pointer",
            padding: "4px 8px 4px 4px",
            borderRadius: 999,
          }}
        >
          <span style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #f97316", overflow: "hidden", flexShrink: 0 }}>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="João Silva" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </span>
          <span style={{ textAlign: "left" }}>
            <span style={{ display: "block", color: "white", fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>João Silva</span>
            <span style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 11, lineHeight: 1.2 }}>Prestador</span>
          </span>
          <Icon name="chevDown" size={14} color="rgba(255,255,255,0.45)" />
        </button>
        {profileOpen && <ProfileMenu onClose={() => setProfileOpen(false)} />}
      </div>
    </header>
  );
}
