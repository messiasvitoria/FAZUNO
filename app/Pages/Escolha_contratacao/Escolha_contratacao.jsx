"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBullhorn,
  FaCalendarAlt,
  FaCheck,
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaFilter,
  FaHeart,
  FaMapMarkerAlt,
  FaRegCheckCircle,
  FaSearch,
  FaShareAlt,
  FaShieldAlt,
  FaStar,
  FaUpload,
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

const DIRECT_STEPS = [
  "Buscar serviço",
  "Resultados dos serviços",
  "Detalhes do serviço",
  "Preencher solicitação",
  "Confirmação",
];

const DIRECT_CATEGORIES = [
  { label: "Limpeza", icon: "droplet" },
  { label: "Reformas", icon: "home" },
  { label: "Elétrica", icon: "zap" },
  { label: "Hidráulica", icon: "droplet" },
  { label: "Mais", icon: "plus" },
];

const DIRECT_SERVICES = [
  {
    id: 1,
    title: "Instalação de chuveiro",
    professional: "João Silva",
    rating: "4.9",
    reviews: "128",
    price: "R$ 120",
    distance: "3 km",
    eta: "10 min",
    image: "/foto_encanador.jpg",
    category: "Elétrica",
    description: "Instalação completa de chuveiro com revisão do ponto elétrico e teste de funcionamento.",
    address: "Rua das Flores, 123, Vila Madalena, São Paulo - SP",
  },
  {
    id: 2,
    title: "Instalação de torneira",
    professional: "Ana Paula",
    rating: "4.8",
    reviews: "97",
    price: "R$ 100",
    distance: "5 km",
    eta: "15 min",
    image: "/foto_encanador2.jpg",
    category: "Hidráulica",
    description: "Troca ou instalação de torneira com vedação, teste de vazamento e orientação de uso.",
    address: "Av. Liberdade, 1120, Moema, São Paulo - SP",
  },
  {
    id: 3,
    title: "Troca de tomada",
    professional: "Carlos Mendes",
    rating: "4.7",
    reviews: "46",
    price: "R$ 80",
    distance: "4 km",
    eta: "20 min",
    image: "/foto_eletricista.jpg",
    category: "Elétrica",
    description: "Substituição de tomadas, revisão básica da fiação e teste de segurança após a troca.",
    address: "Rua Augusta, 450, Consolação, São Paulo - SP",
  },
  {
    id: 4,
    title: "Pintura residencial",
    professional: "Mariana Costa",
    rating: "4.8",
    reviews: "82",
    price: "R$ 160",
    distance: "6 km",
    eta: "30 min",
    image: "/foto_pintora.avif",
    category: "Reformas",
    description: "Pintura de ambientes internos com acabamento limpo, proteção de móveis e organização final.",
    address: "Rua Vergueiro, 880, Vila Mariana, São Paulo - SP",
  },
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
    droplet: ["M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"],
    zap: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
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

function StepIndicator({ step }) {
  return (
    <div className="direct-steps" aria-label="Etapas da solicitação direta">
      {DIRECT_STEPS.map((label, index) => {
        const active = step === index + 1;
        const done = step > index + 1;

        return (
          <div key={label} className={`direct-step ${active ? "direct-step--active" : ""} ${done ? "direct-step--done" : ""}`}>
            <span>{done ? <FaCheck /> : index + 1}</span>
            <p>{label}</p>
          </div>
        );
      })}
    </div>
  );
}

function MiniServiceCard({ service, onClick }) {
  return (
    <button type="button" className="direct-mini-card" onClick={onClick}>
      <img src={service.image} alt={service.title} />
      <span>
        <strong>{service.title}</strong>
        <small>A partir de {service.price}</small>
      </span>
      <FaArrowRight />
    </button>
  );
}

function ProfessionalCard({ service, onDetails, onRequest }) {
  return (
    <article className="direct-result-card">
      <img src={service.image} alt={service.title} />
      <div className="direct-result-info">
        <h3>{service.title}</h3>
        <strong>{service.professional}</strong>
        <p>
          <FaStar />
          {service.rating} ({service.reviews})
          <span>
            <FaCheckCircle />
            Verificado
          </span>
        </p>
        <p>
          <FaClock />
          Responde em {service.eta}
        </p>
        <p>
          <FaMapMarkerAlt />
          {service.distance} de você
        </p>
        <small>A partir de {service.price}</small>
      </div>
      <div className="direct-result-actions">
        <button type="button" className="direct-secondary" onClick={onDetails}>
          Ver perfil
        </button>
        <button type="button" className="direct-primary" onClick={onRequest}>
          Solicitar
        </button>
      </div>
    </article>
  );
}

function DirectSearchStep({ onNext, onSelect }) {
  return (
    <section className="direct-panel">
      <div className="direct-panel-header">
        <button type="button" className="direct-back" aria-label="Voltar">
          <FaArrowLeft />
        </button>
        <h2>Buscar serviço</h2>
      </div>

      <label className="direct-search">
        <FaSearch />
        <input type="search" placeholder="O que você precisa?" />
      </label>

      <div className="direct-section-title">
        <h3>Categorias</h3>
        <button type="button">Ver todas</button>
      </div>

      <div className="direct-categories">
        {DIRECT_CATEGORIES.map((category) => (
        <button key={category.label} type="button">
          <span>
              <SidebarIcon name={category.icon} size={18} color="#F1670F" strokeWidth={2} />
          </span>
          {category.label}
        </button>
        ))}
      </div>

      <div className="direct-section-title">
        <h3>Mais procurados</h3>
      </div>

      <div className="direct-mini-list">
        {DIRECT_SERVICES.slice(0, 3).map((service) => (
          <MiniServiceCard
            key={service.id}
            service={service}
            onClick={() => {
              onSelect(service);
              onNext(2);
            }}
          />
        ))}
      </div>

      <button type="button" className="direct-wide-secondary" onClick={() => onNext(2)}>
        Ver todas as categorias
      </button>
    </section>
  );
}

function DirectResultsStep({ onBack, onDetails, onRequest }) {
  return (
    <section className="direct-panel">
      <div className="direct-panel-header">
        <button type="button" className="direct-back" onClick={onBack} aria-label="Voltar">
          <FaArrowLeft />
        </button>
        <h2>Serviços encontrados</h2>
      </div>

      <div className="direct-result-top">
        <p>{DIRECT_SERVICES.length * 42} serviços encontrados</p>
        <button type="button">
          <FaFilter />
          Filtrar
        </button>
      </div>

      <div className="direct-results">
        {DIRECT_SERVICES.map((service) => (
          <ProfessionalCard
            key={service.id}
            service={service}
            onDetails={() => onDetails(service)}
            onRequest={() => onRequest(service)}
          />
        ))}
      </div>
    </section>
  );
}

function DirectDetailsStep({ service, onBack, onRequest }) {
  return (
    <section className="direct-panel direct-panel--details">
      <div className="direct-detail-media">
        <button type="button" className="direct-floating-back" onClick={onBack} aria-label="Voltar">
          <FaArrowLeft />
        </button>
        <img src={service.image} alt={service.title} />
        <div className="direct-floating-actions">
          <button type="button" aria-label="Compartilhar">
            <FaShareAlt />
          </button>
          <button type="button" aria-label="Favoritar">
            <FaHeart />
          </button>
        </div>
        <span>{service.category}</span>
      </div>

      <div className="direct-detail-content">
        <h2>{service.title}</h2>
        <strong>{service.professional}</strong>
        <p className="direct-rating">
          <FaStar />
          {service.rating} ({service.reviews} avaliações)
        </p>

        <div className="direct-badges">
          <span>
            <FaCheckCircle />
            Verificado
          </span>
          <span>Prestador destaque</span>
        </div>

        <div className="direct-detail-facts">
          <p>
            <FaClock />
            Responde em {service.eta}
          </p>
          <p>
            <FaMapMarkerAlt />
            {service.distance} de você
          </p>
          <p>
            <FaCheckCircle />
            Disponível hoje
          </p>
          <p>
            <FaCalendarAlt />
            Próximo horário: hoje após 14h
          </p>
          <p>
            <FaShieldAlt />
            124 serviços realizados
          </p>
        </div>

        {["Sobre o serviço", "O que está incluso", "O que não está incluso", "Perguntas frequentes"].map((item) => (
          <button key={item} type="button" className="direct-detail-row">
            {item}
            <FaArrowRight />
          </button>
        ))}

        <button type="button" className="direct-wide-secondary">
          Ver perfil completo
        </button>
        <button type="button" className="direct-wide-primary" onClick={onRequest}>
          Solicitar serviço
        </button>
      </div>
    </section>
  );
}

function DirectFormStep({ service, onBack, onConfirm }) {
  return (
    <section className="direct-panel direct-panel--form">
      <div className="direct-panel-header">
        <button type="button" className="direct-back" onClick={onBack} aria-label="Voltar">
          <FaArrowLeft />
        </button>
        <h2>Solicitar serviço</h2>
      </div>

      <div className="direct-form-grid">
        <label>
          Endereço
          <span className="direct-input-wrap">
            <input defaultValue={service.address} />
            <FaMapMarkerAlt />
          </span>
        </label>
        <label>
          Data desejada
          <span className="direct-input-wrap">
            <input defaultValue="25/05/2025" />
            <FaCalendarAlt />
          </span>
        </label>
        <label>
          Horário desejado
          <select defaultValue="manha">
            <option value="manha">Manhã (08h - 12h)</option>
            <option value="tarde">Tarde (13h - 18h)</option>
            <option value="noite">Noite (18h - 21h)</option>
          </select>
        </label>
      </div>

      <fieldset className="direct-urgency">
        <legend>Urgência</legend>
        {["Hoje", "Até 3 dias", "Esta semana", "Sem pressa"].map((item, index) => (
          <label key={item}>
            <input type="radio" name="urgency" defaultChecked={index === 0} />
            {item}
          </label>
        ))}
      </fieldset>

      <label className="direct-textarea">
        Descrição do serviço
        <textarea maxLength={500} placeholder="Descreva mais detalhes sobre sua necessidade..." />
        <span>0/500</span>
      </label>

      <div className="direct-attachments">
        <p>Fotos (opcional)</p>
        <div>
          {DIRECT_SERVICES.slice(0, 3).map((item) => (
            <img key={item.id} src={item.image} alt="" />
          ))}
          <button type="button" aria-label="Adicionar foto">
            <FaUpload />
          </button>
        </div>
      </div>

      <button type="button" className="direct-wide-primary" onClick={onConfirm}>
        Continuar
      </button>
    </section>
  );
}

function DirectConfirmationStep({ service, onHome }) {
  return (
    <section className="direct-panel direct-panel--success">
      <div className="direct-success-icon">
        <FaCheck />
      </div>
      <h2>Solicitação enviada com sucesso!</h2>
      <p>O profissional foi notificado e em breve entrará em contato com você.</p>

      <div className="direct-summary">
        <h3>Resumo da solicitação</h3>
        <dl>
          <div>
            <dt>Serviço</dt>
            <dd>{service.title}</dd>
          </div>
          <div>
            <dt>Profissional</dt>
            <dd>{service.professional}</dd>
          </div>
          <div>
            <dt>Data</dt>
            <dd>25/05/2025 - Manhã</dd>
          </div>
          <div>
            <dt>Endereço</dt>
            <dd>{service.address}</dd>
          </div>
        </dl>
        <strong>#SOL-2025-000123</strong>
      </div>

      <button type="button" className="direct-wide-primary">
        Ver minhas solicitações
      </button>
      <button type="button" className="direct-link-button" onClick={onHome}>
        Ir para o início
      </button>
    </section>
  );
}

function DirectSolicitationFlow({ step, service, setStep, setService, onBackToChoice, onHome }) {
  const selectedService = service || DIRECT_SERVICES[0];

  return (
    <div className="direct-flow">
      <div className="direct-flow-title">
        <button type="button" className="direct-back-to-choice" onClick={onBackToChoice}>
          <FaArrowLeft />
          Tipo de contratação
        </button>
        <div>
          <h1>Solicitação Direta</h1>
          <p>Encontre e contrate um profissional rapidamente.</p>
        </div>
      </div>

      <StepIndicator step={step} />

      <div className="direct-step-shell">
        {step === 1 && <DirectSearchStep onNext={setStep} onSelect={setService} />}
        {step === 2 && (
          <DirectResultsStep
            onBack={() => setStep(1)}
            onDetails={(nextService) => {
              setService(nextService);
              setStep(3);
            }}
            onRequest={(nextService) => {
              setService(nextService);
              setStep(4);
            }}
          />
        )}
        {step === 3 && <DirectDetailsStep service={selectedService} onBack={() => setStep(2)} onRequest={() => setStep(4)} />}
        {step === 4 && <DirectFormStep service={selectedService} onBack={() => setStep(3)} onConfirm={() => setStep(5)} />}
        {step === 5 && <DirectConfirmationStep service={selectedService} onHome={onHome} />}
      </div>
    </div>
  );
}

export default function EscolhaContratacao() {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [flow, setFlow] = useState("choice");
  const [directStep, setDirectStep] = useState(1);
  const [selectedService, setSelectedService] = useState(DIRECT_SERVICES[0]);

  function handleSelect(value) {
    setSelected(value);
    window.sessionStorage.setItem("fazuno_tipo_contratacao", value);

    if (value === "direta") {
      setFlow("direta");
      setDirectStep(1);
      setSelectedService(DIRECT_SERVICES[0]);
    }
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
          height: 100vh;
          display: flex;
          overflow: hidden;
          background: #F5F7FB;
          font-family: Arial, Helvetica, sans-serif;
        }

        .choice-sidebar {
          width: 180px;
          min-width: 180px;
          height: 100vh;
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
          height: 100vh;
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
          overflow-x: hidden;
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

        .direct-flow {
          width: 100%;
        }

        .direct-flow-title {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 22px;
        }

        .direct-flow-title h1 {
          margin: 0;
          color: #0A0B2D;
          font-size: clamp(1.9rem, 3vw, 2.4rem);
          line-height: 1.1;
          font-weight: 800;
        }

        .direct-flow-title p {
          margin: 8px 0 0;
          color: #666B7A;
          font-size: 0.96rem;
          font-weight: 600;
        }

        .direct-back-to-choice {
          min-height: 28px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
        }

        .direct-back-to-choice:hover {
          color: #F1670F;
        }

        .direct-steps {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 18px;
        }

        .direct-step {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 12px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #7A8192;
          font-size: 0.74rem;
          font-weight: 800;
        }

        .direct-step span {
          width: 24px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #EEF2F7;
          color: #7A8192;
          font-size: 0.74rem;
        }

        .direct-step p {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .direct-step--active,
        .direct-step--done {
          border-color: rgba(241, 103, 15, 0.28);
          color: #0A0B2D;
        }

        .direct-step--active span,
        .direct-step--done span {
          background: #F1670F;
          color: #FFFFFF;
        }

        .direct-step-shell {
          width: min(100%, 760px);
          margin: 0 auto;
        }

        .direct-panel {
          min-height: 520px;
          padding: 20px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          box-shadow: 0 10px 30px rgba(10, 11, 45, 0.05);
        }

        .direct-panel-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .direct-panel-header h2,
        .direct-panel h2 {
          margin: 0;
          color: #0A0B2D;
          font-size: 1.08rem;
          font-weight: 800;
        }

        .direct-back,
        .direct-floating-back {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #0A0B2D;
          cursor: pointer;
        }

        .direct-back:hover {
          background: #FFF4EC;
          color: #F1670F;
        }

        .direct-floating-back {
          background: #FFFFFF;
          border: 1.5px solid #E6E8EF;
        }

        .direct-search {
          height: 44px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          color: #98A2B3;
        }

        .direct-search input {
          width: 100%;
          border: 0;
          outline: 0;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.86rem;
        }

        .direct-section-title,
        .direct-result-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin: 18px 0 10px;
        }

        .direct-section-title h3,
        .direct-result-top p {
          margin: 0;
          color: #0A0B2D;
          font-size: 0.86rem;
          font-weight: 800;
        }

        .direct-section-title button,
        .direct-result-top button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 0;
          background: transparent;
          color: #F1670F;
          font: inherit;
          font-size: 0.74rem;
          font-weight: 800;
          cursor: pointer;
        }

        .direct-categories {
          display: flex;
          gap: 9px;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 2px 2px 8px;
          scroll-snap-type: x mandatory;
          scrollbar-width: thin;
          scrollbar-color: #F1670F transparent;
        }

        .direct-categories::-webkit-scrollbar {
          height: 5px;
        }

        .direct-categories::-webkit-scrollbar-track {
          background: transparent;
        }

        .direct-categories::-webkit-scrollbar-thumb {
          background: #F1670F;
          border-radius: 999px;
        }

        .direct-categories button {
          width: 138px;
          min-width: 138px;
          min-height: 74px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.72rem;
          font-weight: 800;
          cursor: pointer;
          scroll-snap-align: start;
        }

        .direct-categories button span {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #FFF4EC;
        }

        .direct-mini-list,
        .direct-results {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .direct-mini-card,
        .direct-result-card {
          width: 100%;
          display: grid;
          grid-template-columns: 72px minmax(0, 1fr) auto;
          gap: 12px;
          align-items: center;
          padding: 10px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
          text-align: left;
        }

        .direct-mini-card {
          cursor: pointer;
        }

        .direct-mini-card img,
        .direct-result-card > img {
          width: 72px;
          height: 72px;
          border-radius: 8px;
          object-fit: cover;
        }

        .direct-mini-card strong,
        .direct-result-info h3 {
          display: block;
          margin: 0 0 5px;
          color: #0A0B2D;
          font-size: 0.9rem;
          font-weight: 800;
        }

        .direct-mini-card small,
        .direct-result-info small {
          color: #F1670F;
          font-size: 0.74rem;
          font-weight: 800;
        }

        .direct-wide-secondary,
        .direct-wide-primary,
        .direct-secondary,
        .direct-primary {
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 8px;
          font: inherit;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
        }

        .direct-wide-secondary,
        .direct-secondary {
          border: 1.5px solid #FFE0CC;
          background: #FFFFFF;
          color: #F1670F;
        }

        .direct-wide-primary,
        .direct-primary {
          border: 1.5px solid #0B55F4;
          background: #0B55F4;
          color: #FFFFFF;
        }

        .direct-wide-secondary,
        .direct-wide-primary {
          width: 100%;
          margin-top: 14px;
        }

        .direct-result-card {
          grid-template-columns: 76px minmax(0, 1fr) 180px;
        }

        .direct-result-info strong {
          display: block;
          margin-bottom: 5px;
          color: #0A0B2D;
          font-size: 0.78rem;
        }

        .direct-result-info p {
          display: flex;
          align-items: center;
          gap: 6px;
          margin: 3px 0;
          color: #667085;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .direct-result-info svg {
          color: #F1670F;
        }

        .direct-result-info p span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #16A34A;
        }

        .direct-result-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .direct-detail-media {
          position: relative;
          height: 220px;
          overflow: hidden;
          border-radius: 8px;
          background: #E6E8EF;
        }

        .direct-detail-media img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .direct-floating-back {
          position: absolute;
          left: 12px;
          top: 12px;
          z-index: 2;
        }

        .direct-floating-actions {
          position: absolute;
          right: 12px;
          top: 12px;
          z-index: 2;
          display: flex;
          gap: 8px;
        }

        .direct-floating-actions button {
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.92);
          color: #0A0B2D;
          cursor: pointer;
        }

        .direct-detail-media > span {
          position: absolute;
          left: 14px;
          bottom: 14px;
          padding: 5px 10px;
          border-radius: 8px;
          background: #0B55F4;
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
        }

        .direct-detail-content {
          padding-top: 18px;
        }

        .direct-detail-content > strong {
          display: block;
          margin-top: 6px;
          color: #667085;
          font-size: 0.84rem;
        }

        .direct-rating,
        .direct-detail-facts p {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 8px 0;
          color: #667085;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .direct-rating svg,
        .direct-detail-facts svg {
          color: #F1670F;
        }

        .direct-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 12px 0;
        }

        .direct-badges span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 8px;
          background: #FFF4EC;
          color: #F1670F;
          font-size: 0.72rem;
          font-weight: 800;
        }

        .direct-badges span:first-child {
          background: #ECFDF3;
          color: #16A34A;
        }

        .direct-detail-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 42px;
          border: 0;
          border-top: 1px solid #EEF0F5;
          background: #FFFFFF;
          color: #0A0B2D;
          font: inherit;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
        }

        .direct-form-grid,
        .direct-panel--form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .direct-form-grid label,
        .direct-textarea,
        .direct-urgency legend {
          color: #0A0B2D;
          font-size: 0.78rem;
          font-weight: 800;
        }

        .direct-input-wrap,
        .direct-form-grid select,
        .direct-textarea textarea {
          width: 100%;
          min-height: 42px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 6px;
          padding: 0 12px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          background: #FFFFFF;
          color: #0A0B2D;
        }

        .direct-input-wrap input,
        .direct-form-grid select {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          font: inherit;
          color: #0A0B2D;
        }

        .direct-input-wrap svg,
        .direct-textarea span {
          color: #0B55F4;
        }

        .direct-urgency {
          margin: 0;
          padding: 12px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
        }

        .direct-urgency label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          color: #667085;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .direct-textarea {
          position: relative;
          display: block;
        }

        .direct-textarea textarea {
          min-height: 96px;
          padding: 12px;
          resize: none;
          font: inherit;
          outline: 0;
        }

        .direct-textarea span {
          position: absolute;
          right: 12px;
          bottom: 10px;
          font-size: 0.68rem;
          font-weight: 800;
        }

        .direct-attachments p {
          margin: 0 0 8px;
          color: #0A0B2D;
          font-size: 0.78rem;
          font-weight: 800;
        }

        .direct-attachments div {
          display: flex;
          gap: 10px;
        }

        .direct-attachments img,
        .direct-attachments button {
          width: 62px;
          height: 62px;
          border-radius: 8px;
        }

        .direct-attachments img {
          object-fit: cover;
        }

        .direct-attachments button {
          border: 1.5px dashed #C8D5F2;
          background: #F8FAFF;
          color: #0B55F4;
          cursor: pointer;
        }

        .direct-panel--success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 42px 28px;
        }

        .direct-success-icon {
          width: 88px;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #16A34A;
          color: #FFFFFF;
          font-size: 2.4rem;
          box-shadow: 0 18px 36px rgba(22, 163, 74, 0.2);
        }

        .direct-panel--success h2 {
          margin-top: 22px;
          font-size: 1.24rem;
        }

        .direct-panel--success > p {
          max-width: 360px;
          margin: 10px 0 22px;
          color: #667085;
          font-size: 0.88rem;
          line-height: 1.5;
        }

        .direct-summary {
          width: 100%;
          padding: 18px;
          border: 1.5px solid #E6E8EF;
          border-radius: 8px;
          text-align: left;
        }

        .direct-summary h3 {
          margin: 0 0 14px;
          color: #0A0B2D;
          font-size: 0.9rem;
          font-weight: 800;
        }

        .direct-summary dl {
          display: grid;
          gap: 10px;
          margin: 0 0 16px;
        }

        .direct-summary div {
          display: grid;
          grid-template-columns: 120px minmax(0, 1fr);
          gap: 12px;
        }

        .direct-summary dt {
          color: #667085;
          font-size: 0.76rem;
          font-weight: 800;
        }

        .direct-summary dd {
          margin: 0;
          color: #0A0B2D;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .direct-summary strong {
          color: #0B55F4;
          font-size: 1rem;
        }

        .direct-link-button {
          margin-top: 14px;
          border: 0;
          background: transparent;
          color: #0B55F4;
          font: inherit;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
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

          .direct-steps {
            grid-template-columns: 1fr;
          }

          .direct-step-shell {
            width: 100%;
          }

          .direct-result-card {
            grid-template-columns: 72px minmax(0, 1fr);
          }

          .direct-result-actions {
            grid-column: 1 / -1;
          }

          .direct-flow-title {
            flex-direction: column;
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
              {flow === "direta" ? (
                <DirectSolicitationFlow
                  step={directStep}
                  service={selectedService}
                  setStep={setDirectStep}
                  setService={setSelectedService}
                  onBackToChoice={() => {
                    setFlow("choice");
                    setSelected("");
                  }}
                  onHome={() => router.push("/Pages/Tela_inicial_cliente")}
                />
              ) : (
                <>
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
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
