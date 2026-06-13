"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBullhorn,
  FaCheck,
  FaClipboardList,
  FaRegCheckCircle,
  FaShieldAlt,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa";

const OPTIONS = [
  {
    key: "direta",
    title: "Solicitação Direta",
    description: "Encontre um profissional que já possui um serviço cadastrado e envie uma solicitação diretamente para ele.",
    color: "#F1670F",
    hover: "#EA580C",
    soft: "#FFF4EC",
    icon: FaClipboardList,
    bullets: [
      "Você escolhe o serviço",
      "Envia a solicitação",
      "Aguarda a confirmação",
    ],
  },
  {
    key: "oportunidade",
    title: "Publicar Oportunidade",
    description: "Descreva sua necessidade e receba propostas de profissionais interessados.",
    color: "#0B55F4",
    hover: "#0847CC",
    soft: "#EEF5FF",
    icon: FaBullhorn,
    bullets: [
      "Você publica sua necessidade",
      "Profissionais enviam propostas",
      "Você escolhe a melhor proposta",
    ],
  },
];

const MENU_ITEMS = [
  { icon: "home", label: "Início", route: "/Pages/Tela_inicial_cliente" },
  { icon: "plus", label: "Abrir novas solicitações", route: "/Pages/Escolha_contratacao" },
  { icon: "list", label: "Minhas solicitações", route: "/Pages/Tela_inicial_cliente" },
  { icon: "chat", label: "Chat", route: "/Pages/Tela_inicial_cliente" },
];

function SidebarIcon({ name, size = 17, color = "currentColor", strokeWidth = 2 }) {
  const paths = {
    home: ["M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z", "M9 21V12h6v9"],
    plus: ["M12 5v14", "M5 12h14"],
    list: ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
    chat: ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
    bell: ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 01-3.46 0"],
    help: ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3", "M12 17h.01"],
    settings: ["M12 15a3 3 0 100-6 3 3 0 000 6z", "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
    chevDown: ["M6 9l6 6 6-6"],
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function OptionIllustration({ option }) {
  const Icon = option.icon;
  const isOpportunity = option.key === "oportunidade";

  return (
    <div className="choice-illustration" style={{ "--accent": option.color, "--soft": option.soft }}>
      <span className="choice-glow" />
      <span className="choice-spark choice-spark--one">+</span>
      <span className="choice-spark choice-spark--two">+</span>
      <div className="choice-main-icon">
        <Icon />
      </div>
      {isOpportunity ? (
        <>
          <span className="choice-floating choice-floating--top">
            <FaUserCheck />
          </span>
          <span className="choice-floating choice-floating--bottom">
            <FaUsers />
          </span>
        </>
      ) : (
        <span className="choice-floating choice-floating--check">
          <FaCheck />
        </span>
      )}
    </div>
  );
}

function OptionCard({ option, selected, onSelect }) {
  return (
    <article className={`choice-card ${selected ? "choice-card--selected" : ""}`} style={{ "--accent": option.color, "--hover": option.hover }}>
      <OptionIllustration option={option} />
      <div className="choice-card-body">
        <span className="choice-card-kicker">Tipo de contratação</span>
        <h2>{option.title}</h2>
        <p>{option.description}</p>
        <ul>
          {option.bullets.map((bullet) => (
            <li key={bullet}>
              <span>
                <FaRegCheckCircle />
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={() => onSelect(option.key)}>
        <FaCheck />
        Continuar
      </button>
    </article>
  );
}

export default function EscolhaContratacao() {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  function handleSelect(value) {
    setSelected(value);
    window.sessionStorage.setItem("fazuno_tipo_contratacao", value);
  }

  return (
    <>
      <style>{`
        .choice-page,
        .choice-page * {
          box-sizing: border-box;
        }

        .choice-layout {
          width: 100%;
          min-height: 100vh;
          display: flex;
          overflow: hidden;
          background: #F5F7FB;
          font-family: Arial, Helvetica, sans-serif;
        }

        .choice-sidebar {
          width: 180px;
          min-width: 180px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          background: #0D1B3E;
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25);
          z-index: 3;
        }

        .choice-sidebar-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .choice-sidebar-logo img {
          width: 90px;
          height: auto;
          display: block;
        }

        .choice-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 12px 8px;
        }

        .choice-nav-item {
          width: 100%;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 12px;
          border: 0;
          border-radius: 12px;
          background: transparent;
          color: rgba(255, 255, 255, 0.55);
          font: inherit;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.3;
          text-align: left;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .choice-nav-icon {
          flex: 0 0 auto;
          margin-top: 1px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .choice-nav-item:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .choice-nav-item--active {
          background: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        .choice-main {
          flex: 1;
          min-width: 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .choice-appbar {
          height: 56px;
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          padding: 0 20px;
          background: #0D1B3E;
        }

        .choice-top-action {
          position: relative;
          padding: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: rgba(255, 255, 255, 0.75);
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .choice-top-action:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
        }

        .choice-notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 16px;
          height: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #F97316;
          color: #FFFFFF;
          font-size: 9px;
          font-weight: 700;
          line-height: 1;
        }

        .choice-top-divider {
          width: 1px;
          height: 28px;
          margin: 0 8px;
          background: rgba(255, 255, 255, 0.2);
        }

        .choice-user {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 0;
          background: transparent;
          cursor: pointer;
          padding: 0;
          color: #FFFFFF;
        }

        .choice-user-avatar {
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
          overflow: hidden;
          border: 2px solid #F97316;
          border-radius: 50%;
          background: #FFFFFF;
        }

        .choice-user-avatar img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .choice-user-name {
          display: block;
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.2;
          text-align: left;
        }

        .choice-user-role {
          display: block;
          color: rgba(255, 255, 255, 0.46);
          font-size: 11px;
          line-height: 1.2;
          text-align: left;
        }

        .choice-user-arrow {
          color: rgba(255, 255, 255, 0.45);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .choice-page {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          background: #F5F7FB;
          color: #0A0B2D;
        }

        .choice-shell {
          width: min(100%, 1220px);
          margin: 0 auto;
          padding: 44px 40px 32px;
        }

        .choice-header {
          text-align: left;
          margin-bottom: 26px;
        }

        .choice-header h1 {
          margin: 0;
          color: #0A0B2D;
          font-size: clamp(1.9rem, 3vw, 2.4rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: 0;
        }

        .choice-header p {
          margin: 10px 0 0;
          max-width: 660px;
          color: #666B7A;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.55;
        }

        .choice-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .choice-card {
          position: relative;
          min-height: 270px;
          display: grid;
          grid-template-columns: 176px minmax(0, 1fr);
          grid-template-rows: 1fr auto;
          gap: 0 22px;
          align-items: stretch;
          padding: 22px 24px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          box-shadow: 0 10px 30px rgba(10, 11, 45, 0.05);
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }

        .choice-card:hover,
        .choice-card--selected {
          transform: translateY(-1px);
          border-color: var(--hover);
          box-shadow: 0 16px 36px rgba(10, 11, 45, 0.08);
        }

        .choice-illustration {
          width: 154px;
          height: 154px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: center;
          margin: 0;
        }

        .choice-glow {
          position: absolute;
          width: 132px;
          height: 132px;
          border-radius: 8px;
          background: var(--soft);
        }

        .choice-main-icon {
          width: 76px;
          height: 76px;
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #FFFFFF;
          color: var(--accent);
          font-size: 2.65rem;
          box-shadow: 0 14px 28px rgba(10, 11, 45, 0.1);
        }

        .choice-floating {
          position: absolute;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #FFFFFF;
          border-radius: 50%;
          background: var(--accent);
          color: #FFFFFF;
          box-shadow: 0 10px 24px rgba(10, 11, 45, 0.12);
        }

        .choice-floating--check {
          width: 42px;
          height: 42px;
          right: 16px;
          top: 22px;
          font-size: 1rem;
        }

        .choice-floating--top,
        .choice-floating--bottom {
          width: 40px;
          height: 40px;
          right: 12px;
          font-size: 0.92rem;
          background: #E8F8EE;
          color: var(--accent);
        }

        .choice-floating--top {
          top: 14px;
        }

        .choice-floating--bottom {
          bottom: 14px;
        }

        .choice-spark {
          position: absolute;
          color: color-mix(in srgb, var(--accent) 42%, #D2DCFF);
          font-weight: 900;
        }

        .choice-spark--one {
          left: 10px;
          top: 34px;
        }

        .choice-spark--two {
          right: 0;
          bottom: 42px;
        }

        .choice-card-body {
          min-width: 0;
          padding-left: 22px;
          border-left: 1px solid #EEF0F5;
          text-align: left;
        }

        .choice-card-kicker {
          display: block;
          margin-bottom: 4px;
          color: #8A90A0;
          font-size: 0.72rem;
          font-weight: 800;
        }

        .choice-card h2 {
          margin: 0 0 12px;
          color: #0A0B2D;
          font-size: 1.16rem;
          line-height: 1.2;
          font-weight: 800;
        }

        .choice-card p {
          max-width: 420px;
          margin: 0 0 18px;
          color: #666B7A;
          font-size: 0.86rem;
          font-weight: 500;
          line-height: 1.55;
        }

        .choice-card ul {
          width: min(100%, 340px);
          margin: 0;
          padding: 0;
          list-style: none;
          text-align: left;
        }

        .choice-card li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #303449;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .choice-card li + li {
          margin-top: 13px;
        }

        .choice-card li span {
          width: 24px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #FFF4EC;
          color: var(--accent);
          font-size: 0.8rem;
        }

        .choice-card button {
          width: 100%;
          min-height: 38px;
          grid-column: 2;
          justify-self: end;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
          border: 1.5px solid transparent;
          border-radius: 8px;
          background: #0A0B2D;
          color: #FFFFFF;
          font: inherit;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .choice-card button:hover {
          border-color: var(--hover);
          background: var(--hover);
          box-shadow: 0 8px 22px rgba(241, 103, 15, 0.22);
        }

        .choice-feedback {
          width: min(100%, 720px);
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 22px auto 0;
          padding: 0 16px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font-size: 0.9rem;
          font-weight: 800;
          text-align: center;
        }

        .choice-feedback svg {
          color: #F1670F;
        }

        @media (max-width: 760px) {
          .choice-shell {
            padding: 24px 14px 22px;
          }

          .choice-header {
            margin-bottom: 18px;
            text-align: center;
          }

          .choice-header h1 {
            font-size: 1.55rem;
          }

          .choice-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .choice-card {
            min-height: 0;
            display: grid;
            grid-template-columns: 112px minmax(0, 1fr);
            align-items: center;
            gap: 14px;
            padding: 16px;
          }

          .choice-illustration {
            width: 112px;
            height: 112px;
            grid-row: span 2;
            margin: 0;
          }

          .choice-glow {
            width: 96px;
            height: 96px;
          }

          .choice-main-icon {
            width: 72px;
            height: 72px;
            border-radius: 18px;
            font-size: 2.5rem;
          }

          .choice-floating--check {
            width: 38px;
            height: 38px;
            right: 4px;
            top: 12px;
            border-width: 3px;
            font-size: 0.9rem;
          }

          .choice-floating--top,
          .choice-floating--bottom {
            width: 34px;
            height: 34px;
            right: 0;
            border-width: 3px;
            font-size: 0.78rem;
          }

          .choice-floating--top {
            top: 4px;
          }

          .choice-floating--bottom {
            bottom: 6px;
          }

          .choice-spark {
            display: none;
          }

          .choice-card-body {
            text-align: left;
            padding-left: 0;
            border-left: 0;
          }

          .choice-card h2 {
            font-size: 1rem;
          }

          .choice-card p {
            max-width: none;
            margin: 0;
            font-size: 0.78rem;
            line-height: 1.48;
          }

          .choice-card ul {
            display: none;
          }

          .choice-card button {
            grid-column: 1 / -1;
            min-height: 46px;
            margin-top: 0;
          }
        }

        @media (max-width: 680px) {
          .choice-layout {
            display: block;
            overflow: visible;
          }

          .choice-sidebar {
            width: 100%;
            min-width: 0;
            min-height: auto;
            position: sticky;
            top: 0;
          }

          .choice-sidebar-logo {
            display: none;
          }

          .choice-nav {
            flex-direction: row;
            overflow-x: auto;
            padding: 8px;
          }

          .choice-nav-item {
            min-width: max-content;
            align-items: center;
          }

          .choice-appbar {
            display: none;
          }

          .choice-main,
          .choice-page {
            min-height: auto;
            overflow: visible;
          }
        }
      `}</style>

      <div className="choice-layout">
        <aside className="choice-sidebar" aria-label="Menu do cliente">
          <div className="choice-sidebar-logo">
            <img src="/Logo_branca.png" alt="FazUno" />
          </div>
          <nav className="choice-nav">
            {MENU_ITEMS.map((item, index) => {
              const active = index === 1;
              const iconColor = active ? "white" : "rgba(255,255,255,0.5)";

              return (
                <button
                  key={item.label}
                  type="button"
                  className={`choice-nav-item ${active ? "choice-nav-item--active" : ""}`}
                  onClick={() => {
                    if (!active) router.push(item.route);
                  }}
                >
                  <span className="choice-nav-icon">
                    <SidebarIcon name={item.icon} size={17} color={iconColor} strokeWidth={2} />
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="choice-main">
          <div className="choice-appbar">
            <button type="button" className="choice-top-action" aria-label="Notificações">
              <SidebarIcon name="bell" size={20} color="rgba(255,255,255,0.75)" strokeWidth={2} />
              <span className="choice-notification-badge">3</span>
            </button>
            <button type="button" className="choice-top-action" aria-label="Ajuda">
              <SidebarIcon name="help" size={20} color="rgba(255,255,255,0.75)" strokeWidth={2} />
            </button>
            <button type="button" className="choice-top-action" aria-label="Configurações">
              <SidebarIcon name="settings" size={20} color="rgba(255,255,255,0.75)" strokeWidth={2} />
            </button>
            <span className="choice-top-divider" />
            <button type="button" className="choice-user" aria-label="Perfil do cliente Isaac">
              <span className="choice-user-avatar">
                <img src="/homem1.avif" alt="Isaac" />
              </span>
              <span>
                <span className="choice-user-name">Isaac</span>
                <span className="choice-user-role">Cliente</span>
              </span>
              <span className="choice-user-arrow">
                <SidebarIcon name="chevDown" size={14} color="rgba(255,255,255,0.4)" strokeWidth={2} />
              </span>
            </button>
          </div>
          <main className="choice-page">
            <div className="choice-shell">
              <section className="choice-header">
                <h1>Como você gostaria de contratar?</h1>
                <p>Escolha a opção que melhor atende à sua necessidade.</p>
              </section>

              <section className="choice-grid" aria-label="Tipos de contratação">
                {OPTIONS.map((option) => (
                  <OptionCard
                    key={option.key}
                    option={option}
                    selected={selected === option.key}
                    onSelect={handleSelect}
                  />
                ))}
              </section>

              {selected && (
                <div className="choice-feedback" role="status">
                  <FaShieldAlt />
                  {selected === "direta"
                    ? "Solicitação direta selecionada. Próxima etapa: escolher um serviço cadastrado."
                    : "Publicação de oportunidade selecionada. Próxima etapa: descrever sua necessidade."}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
