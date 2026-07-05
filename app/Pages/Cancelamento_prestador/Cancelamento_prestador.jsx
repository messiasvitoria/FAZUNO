"use client";

import React, { useState } from "react";
import {
  FaArrowLeft,
  FaEllipsisH,
  FaTimes,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBell,
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCommentDots,
  FaShieldAlt,
  FaQuestionCircle,
  FaClipboardList,
  FaRedoAlt,
} from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
// ⚠️ Ajuste este caminho relativo conforme a pasta real deste arquivo
// (lib/notifications.js fica em app/lib/notifications.js)
import { addNotification } from "../../lib/notifications";

/* ---------------------------------------------------------
   Design tokens (mesmos usados nas outras telas do FazUno)
--------------------------------------------------------- */
const C = {
  navy: "#06104A",
  band: "#143660",
  orange: "#f1670f",
  muted: "#6975A8",
  border: "#E2E7F0",
  purple: "#7C5CFC",
  green: "#16A34A",
  star: "#F59E0B",
  red: "#DC2626",
  redBg: "#FEF2F2",
  blue: "#2563EB",
  blueBg: "#EEF4FF",
  bg: "#F6F7FB",
  white: "#FFFFFF",
};

const FONTS = {
  heading: "'Sora', sans-serif",
  body: "'DM Sans', sans-serif",
};

/* ---------------------------------------------------------
   Conteúdo mock
--------------------------------------------------------- */
const STEPS_INFO = [
  {
    id: 1,
    title: "Acessar solicitação",
    desc: "Prestador acessa os detalhes da solicitação.",
  },
  {
    id: 2,
    title: "Solicitar cancelamento",
    desc: "Prestador escolhe o motivo do cancelamento.",
  },
  {
    id: 3,
    title: "Confirmar cancelamento",
    desc: "Prestador revisa as informações e confirma.",
  },
  {
    id: 4,
    title: "Cancelamento realizado",
    desc: "Sistema registra e notifica o cliente.",
  },
  {
    id: 5,
    title: "Status atualizado",
    desc: "Solicitação é atualizada para cancelada.",
  },
];

const VISIBLE_STEPS = STEPS_INFO.slice(1, 4);

const MOTIVOS = [
  "Indisponibilidade",
  "Problema de agenda",
  "Problema operacional",
  "Impossibilidade de execução",
  "Outro motivo",
];

const DEFAULT_REQUEST = {
  servico: "Instalação elétrica completa",
  prestador: { nome: "João Silva", iniciais: "JE" },
  cliente: {
    nome: "Brenda Barbosa",
    iniciais: "BB",
    rating: "4,9",
    avaliacoes: 56,
  },
  dataAgendada: "10/06/2025 às 09:00",
  endereco: "Rua das Flores, 123 – Centro, Barão de Grajaú – MA",
  valor: "R$ 350,00",
  canceladoEm: "10/06/2025 às 16:45",
};

const REQUESTS_BY_ID = {
  "2": {
    servico: "Instalação de chuveiro elétrico",
    prestador: { nome: "João Silva", iniciais: "JS" },
    cliente: { nome: "Carlos Mendes", iniciais: "CM", rating: "4,6", avaliacoes: 7 },
    dataAgendada: "19/05/2024 às 09:15",
    endereco: "Santo André, São Paulo – SP",
    valor: "R$ 150,00",
    canceladoEm: "10/06/2025 às 16:45",
  },
  "3": {
    servico: "Pintura interna de sala",
    prestador: { nome: "João Silva", iniciais: "JS" },
    cliente: { nome: "Juliana Oliveira", iniciais: "JO", rating: "5,0", avaliacoes: 18 },
    dataAgendada: "18/05/2024 às 16:45",
    endereco: "Moema, São Paulo – SP",
    valor: "R$ 350,00",
    canceladoEm: "10/06/2025 às 16:45",
  },
};

let REQUEST = DEFAULT_REQUEST;

function statusStyle(status) {
  const map = {
    Aceita: { bg: "#F1ECFF", fg: C.purple },
    Cancelada: { bg: C.redBg, fg: C.red },
  };
  return map[status] || { bg: "#F1F2F6", fg: C.muted };
}

/* ---------------------------------------------------------
   Componente
--------------------------------------------------------- */
export default function CancelamentoPrestador() {
  const router = useRouter();
  const searchParams = useSearchParams();
  REQUEST = REQUESTS_BY_ID[searchParams.get("id")] || DEFAULT_REQUEST;
  const [step, setStep] = useState(2);
  const [motivo, setMotivo] = useState("");
  const [obs, setObs] = useState("");
  const [notifOpen, setNotifOpen] = useState(true);

  const irPara = (n) => setStep(n);

  const reiniciar = () => {
    setStep(2);
    setMotivo("");
    setObs("");
    setNotifOpen(true);
  };

  // Confirma o cancelamento E dispara a notificação para o CLIENTE
  const confirmarCancelamento = () => {
    addNotification({
      audience: "cliente", // quem recebe a notificação é o cliente
      type: "cancelamento",
      title: "Solicitação cancelada pelo prestador",
      message: `${REQUEST.prestador.nome} cancelou "${REQUEST.servico}". Motivo: ${motivo}.`,
      requestId: REQUEST.servico, // troque pelo ID real do pedido quando integrar com backend
    });
    irPara(4);
  };

  const podeContinuar = motivo !== "";
  const status = step >= 4 ? "Cancelada" : "Aceita";
  const statusColors = statusStyle(status);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        overflowY: "auto",
        background: C.bg,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');
        @keyframes cancelStepFadeP { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .cancel-step-anim-p { animation: cancelStepFadeP 0.35s ease; }
        .cancel-radio-p:hover { border-color: ${C.orange} !important; }
        .cancel-textarea-p::placeholder { color: ${C.muted}; }
      `}</style>

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "40px 28px 64px",
          fontFamily: FONTS.body,
        }}
      >
        {/* Cabeçalho */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 700,
              fontSize: 28,
              color: C.navy,
              margin: 0,
            }}
          >
            Cancelamento de solicitação
          </h1>
          <p style={{ color: C.muted, fontSize: 14.5, margin: "6px 0 0" }}>
            Seção para cancelamento de solicitações pelo prestador.
          </p>
        </div>

        {/* Stepper */}
        <div
          style={{
            display: "flex",
            gap: 4,
            overflowX: "auto",
            paddingBottom: 14,
            marginBottom: 24,
          }}
        >
          {VISIBLE_STEPS.map((s, idx) => {
            const isDone = step > s.id;
            const isCurrent = step === s.id;

            return (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  minWidth: 160,
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 140,
                    opacity: isDone || isCurrent ? 1 : 0.55,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      fontFamily: FONTS.heading,
                      flexShrink: 0,
                      background: isDone
                        ? C.green
                        : isCurrent
                          ? C.navy
                          : C.white,
                      color: isDone || isCurrent ? C.white : C.muted,
                      border:
                        isDone || isCurrent
                          ? "none"
                          : `1.5px solid ${C.border}`,
                    }}
                  >
                    {isDone ? <FaCheckCircle size={13} /> : idx + 1}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: isCurrent ? C.navy : C.muted,
                      fontFamily: FONTS.heading,
                      textAlign: "center",
                      lineHeight: "16px",
                      maxWidth: 120,
                    }}
                  >
                    {s.title}
                  </div>
                </div>

                {idx < VISIBLE_STEPS.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: 2,
                      background: isDone ? C.green : C.border,
                      marginTop: 14,
                      minWidth: 20,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Conteúdo principal + sidebar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: 24,
            alignItems: "start",
          }}
        >
          <div key={step} className="cancel-step-anim-p">
            {step === 2 && (
              <Step2
                motivo={motivo}
                setMotivo={setMotivo}
                obs={obs}
                setObs={setObs}
                podeContinuar={podeContinuar}
                onVoltar={() => router.back()}
                onContinuar={() => irPara(3)}
              />
            )}
            {step === 3 && (
              <Step3
                motivo={motivo}
                obs={obs}
                onVoltar={() => irPara(2)}
                onConfirmar={confirmarCancelamento}
              />
            )}
            {step === 4 && (
              <Step4
                motivo={motivo}
                onContinuar={() => router.push("/Pages/Solicitacao_prestador")}
              />
            )}
          </div>

          <Sidebar step={step} />
        </div>

        <FooterNotes />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Card base
--------------------------------------------------------- */
function Card({ children, style }) {
  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        padding: 28,
        boxShadow: "0 2px 10px rgba(6,16,74,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CardHeader({ title, onClose, onBack }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={iconBtnStyle}>
            <FaArrowLeft size={14} color={C.navy} />
          </button>
        )}
        <h2
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 700,
            fontSize: 18,
            color: C.navy,
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      {onClose && (
        <button onClick={onClose} style={iconBtnStyle}>
          <FaTimes size={14} color={C.muted} />
        </button>
      )}
    </div>
  );
}

const iconBtnStyle = {
  width: 32,
  height: 32,
  borderRadius: 9,
  border: `1px solid ${C.border}`,
  background: C.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const btnBase = {
  fontFamily: FONTS.heading,
  fontWeight: 700,
  fontSize: 14,
  borderRadius: 10,
  padding: "11px 20px",
  cursor: "pointer",
  border: "none",
  transition: "filter 0.15s ease",
};

function PrimaryButton({ children, onClick, color = C.navy, disabled, full }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{
        ...btnBase,
        background: disabled ? "#C9CEE3" : color,
        color: C.white,
        cursor: disabled ? "not-allowed" : "pointer",
        width: full ? "100%" : "auto",
      }}
      onMouseEnter={(e) =>
        !disabled && (e.currentTarget.style.filter = "brightness(0.92)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, onClick, color = C.navy }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...btnBase,
        background: C.white,
        color,
        border: `1.5px solid ${color === C.red ? C.red : C.border}`,
      }}
    >
      {children}
    </button>
  );
}

function InfoRow({ icon, label, value, valueColor }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        marginBottom: 14,
      }}
    >
      <div style={{ color: C.muted, marginTop: 2 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 2 }}>
          {label}
        </div>
        <div
          style={{
            fontSize: 14.5,
            fontWeight: 600,
            color: valueColor || C.navy,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   STEP 1 — Detalhes da solicitação
--------------------------------------------------------- */
function Step1({ status, statusColors, onCancelar }) {
  return (
    <Card>
      <CardHeader title="Detalhes da solicitação" onClose={null} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: statusColors.bg,
            color: statusColors.fg,
            fontSize: 12.5,
            fontWeight: 700,
            padding: "5px 12px",
            borderRadius: 999,
            marginBottom: 16,
          }}
        >
          {status}
        </span>
        <button style={{ ...iconBtnStyle, border: "none" }}>
          <FaEllipsisH size={14} color={C.muted} />
        </button>
      </div>

      <h3
        style={{
          fontFamily: FONTS.heading,
          fontSize: 19,
          fontWeight: 700,
          color: C.navy,
          margin: "0 0 16px",
        }}
      >
        {REQUEST.servico}
      </h3>

      <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 6 }}>
        Cliente
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <Avatar iniciais={REQUEST.cliente.iniciais} color={C.orange} />
        <div>
          <div style={{ fontWeight: 700, color: C.navy, fontSize: 14.5 }}>
            {REQUEST.cliente.nome}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 13,
              color: C.muted,
            }}
          >
            <FaStar size={11} color={C.star} /> {REQUEST.cliente.rating} (
            {REQUEST.cliente.avaliacoes} avaliações)
          </div>
        </div>
      </div>

      <InfoRow
        icon={<FaCalendarAlt size={14} />}
        label="Data agendada"
        value={REQUEST.dataAgendada}
      />
      <InfoRow
        icon={<FaMapMarkerAlt size={14} />}
        label="Endereço"
        value={REQUEST.endereco}
      />
      <InfoRow
        icon={<FaMoneyBillWave size={14} />}
        label="Valor do serviço"
        value={REQUEST.valor}
        valueColor={C.orange}
      />

      <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
        <OutlineButton color={C.purple}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FaCommentDots size={13} /> Abrir chat
          </span>
        </OutlineButton>
        <OutlineButton color={C.red} onClick={onCancelar}>
          Cancelar solicitação
        </OutlineButton>
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------
   STEP 2 — Cancelar solicitação (motivo)
--------------------------------------------------------- */
function Step2({
  motivo,
  setMotivo,
  obs,
  setObs,
  podeContinuar,
  onVoltar,
  onContinuar,
}) {
  return (
    <Card>
      <CardHeader title="Cancelar solicitação" onClose={onVoltar} />
      <p
        style={{
          fontSize: 14.5,
          fontWeight: 700,
          color: C.navy,
          margin: "0 0 14px",
        }}
      >
        Por que você deseja cancelar?
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {MOTIVOS.map((m) => {
          const selected = motivo === m;
          return (
            <label
              key={m}
              className="cancel-radio-p"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                border: `1.5px solid ${selected ? C.orange : C.border}`,
                background: selected ? "#FFF6EF" : C.white,
                borderRadius: 12,
                padding: "12px 14px",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: `2px solid ${selected ? C.orange : C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {selected && (
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: C.orange,
                    }}
                  />
                )}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: C.navy,
                  fontWeight: selected ? 700 : 500,
                }}
              >
                {m}
              </span>
              <input
                type="radio"
                name="motivo-prestador"
                checked={selected}
                onChange={() => setMotivo(m)}
                style={{ display: "none" }}
              />
            </label>
          );
        })}
      </div>

      <p
        style={{
          fontSize: 13.5,
          fontWeight: 700,
          color: C.navy,
          margin: "0 0 8px",
        }}
      >
        Observação (opcional)
      </p>
      <textarea
        className="cancel-textarea-p"
        value={obs}
        maxLength={200}
        onChange={(e) => setObs(e.target.value)}
        placeholder="Conte mais detalhes (opcional)..."
        style={{
          width: "100%",
          minHeight: 80,
          resize: "vertical",
          border: `1.5px solid ${C.border}`,
          borderRadius: 12,
          padding: 12,
          fontFamily: FONTS.body,
          fontSize: 14,
          color: C.navy,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          textAlign: "right",
          fontSize: 12,
          color: C.muted,
          margin: "4px 0 20px",
        }}
      >
        {obs.length}/200
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <OutlineButton onClick={onVoltar}>Voltar</OutlineButton>
        <PrimaryButton
          color={C.purple}
          disabled={!podeContinuar}
          onClick={onContinuar}
        >
          Continuar
        </PrimaryButton>
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------
   STEP 3 — Confirmar cancelamento
--------------------------------------------------------- */
function Step3({ motivo, obs, onVoltar, onConfirmar }) {
  return (
    <Card>
      <CardHeader title="Confirmar cancelamento" onClose={onVoltar} />
      <div
        style={{
          display: "flex",
          gap: 10,
          background: "#FFF6EF",
          border: "1px solid #FCE0C8",
          borderRadius: 12,
          padding: 14,
          marginBottom: 20,
        }}
      >
        <FaExclamationTriangle
          size={15}
          color={C.orange}
          style={{ marginTop: 2, flexShrink: 0 }}
        />
        <span style={{ fontSize: 13.5, color: C.navy }}>
          Ao confirmar, sua solicitação será cancelada e o cliente será
          notificado.
        </span>
      </div>

      <div
        style={{
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          padding: 18,
          marginBottom: 22,
        }}
      >
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: C.muted,
            textTransform: "uppercase",
            letterSpacing: 0.4,
            marginBottom: 14,
          }}
        >
          Resumo da solicitação
        </div>
        <SummaryLine label="Serviço" value={REQUEST.servico} />
        <SummaryLine label="Cliente" value={REQUEST.cliente.nome} />
        <SummaryLine label="Data agendada" value={REQUEST.dataAgendada} />
        <SummaryLine label="Valor do serviço" value={REQUEST.valor} />
        <SummaryLine label="Motivo do cancelamento" value={motivo} />
        <SummaryLine
          label="Observação"
          value={obs || "Não preencheu observação."}
          last
        />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <OutlineButton onClick={onVoltar}>Voltar</OutlineButton>
        <PrimaryButton color={C.red} onClick={onConfirmar}>
          Confirmar cancelamento
        </PrimaryButton>
      </div>
    </Card>
  );
}

function SummaryLine({ label, value, last }) {
  return (
    <div style={{ marginBottom: last ? 0 : 12 }}>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>
        {value}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   STEP 4 — Cancelamento realizado
--------------------------------------------------------- */
function Step4({ motivo, onContinuar }) {
  return (
    <Card style={{ textAlign: "center" }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "#E9F8EF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "8px auto 18px",
        }}
      >
        <FaCheckCircle size={30} color={C.green} />
      </div>
      <h2
        style={{
          fontFamily: FONTS.heading,
          fontSize: 20,
          fontWeight: 700,
          color: C.navy,
          margin: "0 0 8px",
        }}
      >
        Solicitação cancelada!
      </h2>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 22px" }}>
        Seu cancelamento foi realizado com sucesso.
      </p>

      <div
        style={{
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          padding: 18,
          textAlign: "left",
          marginBottom: 22,
        }}
      >
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: C.muted,
            textTransform: "uppercase",
            letterSpacing: 0.4,
            marginBottom: 14,
          }}
        >
          Resumo do cancelamento
        </div>
        <SummaryLine label="Data do cancelamento" value={REQUEST.canceladoEm} />
        <SummaryLine
          label="Cancelado por"
          value={`${REQUEST.prestador.nome} (Prestador)`}
        />
        <SummaryLine label="Motivo" value={motivo} last />
      </div>

      <PrimaryButton full onClick={onContinuar}>
        Ver minhas solicitações
      </PrimaryButton>
    </Card>
  );
}

/* ---------------------------------------------------------
   STEP 5 — Status atualizado
--------------------------------------------------------- */
function Step5({ motivo, statusColors, onReiniciar }) {
  return (
    <Card>
      <CardHeader title="Detalhes da solicitação" onClose={null} />
      <span
        style={{
          display: "inline-block",
          background: statusColors.bg,
          color: statusColors.fg,
          fontSize: 12.5,
          fontWeight: 700,
          padding: "5px 12px",
          borderRadius: 999,
          marginBottom: 16,
        }}
      >
        Cancelada
      </span>

      <h3
        style={{
          fontFamily: FONTS.heading,
          fontSize: 19,
          fontWeight: 700,
          color: C.navy,
          margin: "0 0 16px",
        }}
      >
        {REQUEST.servico}
      </h3>

      <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 6 }}>
        Cliente
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <Avatar iniciais={REQUEST.cliente.iniciais} color={C.orange} />
        <div style={{ fontWeight: 700, color: C.navy, fontSize: 14.5 }}>
          {REQUEST.cliente.nome}
        </div>
      </div>

      <InfoRow
        icon={<FaCalendarAlt size={14} />}
        label="Data agendada"
        value={REQUEST.dataAgendada}
      />
      <InfoRow
        icon={<FaMapMarkerAlt size={14} />}
        label="Endereço"
        value={REQUEST.endereco}
      />
      <InfoRow
        icon={<FaMoneyBillWave size={14} />}
        label="Valor do serviço"
        value={REQUEST.valor}
        valueColor={C.orange}
      />
      <InfoRow
        icon={<FaCalendarAlt size={14} />}
        label="Cancelada em"
        value={REQUEST.canceladoEm}
      />
      <InfoRow
        icon={<FaExclamationTriangle size={14} />}
        label="Motivo"
        value={motivo}
      />

      <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
        <PrimaryButton color={C.navy}>Ver detalhes</PrimaryButton>
        <OutlineButton color={C.muted} onClick={onReiniciar}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FaRedoAlt size={12} /> Reiniciar simulação
          </span>
        </OutlineButton>
      </div>
    </Card>
  );
}

function Avatar({ iniciais, color }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: color,
        color: C.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 13,
        fontFamily: FONTS.heading,
        flexShrink: 0,
      }}
    >
      {iniciais}
    </div>
  );
}

/* ---------------------------------------------------------
   Sidebar
--------------------------------------------------------- */
function Sidebar({ step }) {
  const itens = [{ label: "Aceita" }, { label: "Em andamento" }];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ padding: 20 }}>
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 700,
            fontSize: 14.5,
            color: C.navy,
            marginBottom: 12,
          }}
        >
          Quando o prestador pode cancelar?
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {itens.map((it) => (
            <div
              key={it.label}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <FaCheckCircle size={13} color={C.green} />
              <span style={{ fontSize: 13.5, color: C.navy }}>{it.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card
        style={{ padding: 20, background: "#FFF6EF", borderColor: "#FCE0C8" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <FaShieldAlt size={14} color={C.orange} />
          <span
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 700,
              fontSize: 14,
              color: C.navy,
            }}
          >
            Importante
          </span>
        </div>
        <p style={{ fontSize: 13, color: C.navy, margin: 0, lineHeight: 1.5 }}>
          Após o cancelamento, a solicitação não pode ser retomada.
        </p>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------
   Rodapé
--------------------------------------------------------- */
function FooterNotes() {
  const itens = [
    {
      icon: <FaClipboardList size={14} color={C.muted} />,
      text: "Todas as ações de cancelamento ficam registradas no histórico da solicitação e podem ser consultadas por ambas as partes.",
    },
  ];

  return (
    <div
      style={{
        marginTop: 28,
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "16px 20px",
        display: "flex",
        flexWrap: "wrap",
        gap: 24,
      }}
    >
      {itens.map((it, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            flex: "1 1 280px",
          }}
        >
          {it.icon}
          <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
            {it.text}
          </span>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          flex: "1 1 220px",
        }}
      >
        <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}></span>
      </div>
    </div>
  );
}
