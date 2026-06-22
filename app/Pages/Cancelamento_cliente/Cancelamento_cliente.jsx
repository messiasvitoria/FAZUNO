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
  FaHome,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { addNotification } from "../../lib/notifications";
import SideBar_cliente from "../../components/SideBar_cliente";
import TopBar_cliente from "../../components/TopBar_cliente";

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

const STEPS_INFO = [
  { id: 1, title: "Acessar solicitação",       desc: "Cliente acessa os detalhes da solicitação." },
  { id: 2, title: "Solicitar cancelamento",    desc: "Cliente escolhe o motivo do cancelamento." },
  { id: 3, title: "Confirmar cancelamento",    desc: "Cliente revisa as informações e confirma." },
  { id: 4, title: "Cancelamento realizado",    desc: "Sistema registra e notifica o prestador." },
  { id: 5, title: "Status atualizado",         desc: "Solicitação é atualizada para cancelada." },
];

const MOTIVOS = [
  "Mudança de planos",
  "Serviço não é mais necessário",
  "Encontrei outra opção",
  "Problemas com agendamento",
  "Outro motivo",
];

const REQUEST = {
  servico: "Instalação elétrica completa",
  prestador: { nome: "João Silva", iniciais: "JS", rating: "4,8", avaliacoes: 128 },
  cliente: { nome: "Brenda Barbosa", iniciais: "BB" },
  dataAgendada: "10/06/2025 às 09:00",
  endereco: "Av. Eurípedes de Aguiar, 123 – Centro, Floriano – PI",
  valor: "R$ 350,00",
  canceladoEm: "10/06/2025 às 16:30",
};

function statusStyle(status) {
  const map = {
    "Em andamento": { bg: C.blueBg, fg: C.blue },
    Cancelada: { bg: C.redBg, fg: C.red },
  };
  return map[status] || { bg: "#F1F2F6", fg: C.muted };
}

export default function CancelamentoCliente() {
  const [step, setStep] = useState(1);
  const [motivo, setMotivo] = useState("");
  const [obs, setObs] = useState("");

  const irPara = (n) => setStep(n);

  const reiniciar = () => {
    setStep(1);
    setMotivo("");
    setObs("");
  };

  const confirmarCancelamento = () => {
    addNotification({
      audience: "prestador",
      type: "cancelamento",
      title: "Solicitação cancelada pelo cliente",
      message: `${REQUEST.cliente.nome} cancelou "${REQUEST.servico}". Motivo: ${motivo}.`,
      requestId: REQUEST.servico,
    });
    irPara(4);
  };

  const podeContinuar = motivo !== "";
  const status = step >= 6 ? "Cancelada" : "Em andamento";
  const statusColors = statusStyle(status);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: FONTS.body, backgroundColor: C.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');
        @keyframes cancelStepFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .cancel-step-anim { animation: cancelStepFade 0.35s ease; }
        .cancel-radio:hover { border-color: ${C.orange} !important; }
        .cancel-textarea::placeholder { color: ${C.muted}; }
      `}</style>

      {/* TOPBAR */}
      <TopBar_cliente />

      {/* BODY */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* SIDEBAR */}
        <div style={{ flexShrink: 0 }}>
          <SideBar_cliente />
        </div>

        {/* SCROLL AREA */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 28px 64px" }}>

            {/* Cabeçalho */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: FONTS.heading, fontWeight: 800, fontSize: 14, color: C.orange, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 6 }}>
                Fluxo do cliente
              </div>
              <h1 style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 28, color: C.navy, margin: 0 }}>
                Cancelamento de solicitação
              </h1>
              <p style={{ color: C.muted, fontSize: 14.5, margin: "6px 0 0" }}>
                Seção para cancelamento de solicitações abertas pelo cliente.
              </p>
            </div>

            {/* Stepper */}
            <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 14, marginBottom: 24 }}>
              {STEPS_INFO.map((s, idx) => {
                const isDone = step > s.id;
                const isCurrent = step === s.id;
                return (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", minWidth: 168, flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: isDone || isCurrent ? 1 : 0.55, textAlign: "center" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: FONTS.heading, flexShrink: 0, background: isDone ? C.green : isCurrent ? C.orange : C.white, color: isDone || isCurrent ? C.white : C.muted, border: isDone || isCurrent ? "none" : `1.5px solid ${C.border}` }}>
                        {isDone ? <FaCheckCircle size={13} /> : s.id}
                      </div>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: isCurrent ? C.navy : C.muted, fontFamily: FONTS.heading, whiteSpace: "nowrap" }}>
                          {s.title}
                        </div>
                      </div>
                    </div>
                    {idx < STEPS_INFO.length - 1 && (
                      <div style={{ flex: 1, height: 2, background: isDone ? C.green : C.border, margin: "0 8px", minWidth: 16 }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Conteúdo principal + sidebar */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
              <div key={step} className="cancel-step-anim">
                {step === 1 && <Step1 status={status} statusColors={statusColors} onCancelar={() => irPara(2)} />}
                {step === 2 && <Step2 motivo={motivo} setMotivo={setMotivo} obs={obs} setObs={setObs} podeContinuar={podeContinuar} onVoltar={() => irPara(1)} onContinuar={() => irPara(3)} />}
                {step === 3 && <Step3 motivo={motivo} obs={obs} onVoltar={() => irPara(2)} onConfirmar={confirmarCancelamento} />}
                {step === 4 && <Step4 motivo={motivo} onContinuar={() => irPara(5)} onReiniciar={reiniciar} />}
                {step === 5 && <Step5 motivo={motivo} statusColors={statusStyle("Cancelada")} onReiniciar={reiniciar} />}
              </div>

              <SidebarInfo step={step} />
            </div>

            <FooterNotes />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Card base ── */
function Card({ children, style }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, padding: 28, boxShadow: "0 2px 10px rgba(6,16,74,0.04)", ...style }}>
      {children}
    </div>
  );
}

function CardHeader({ title, onClose, onBack }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={iconBtnStyle}>
            <FaArrowLeft size={14} color={C.navy} />
          </button>
        )}
        <h2 style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 18, color: C.navy, margin: 0 }}>
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
  width: 32, height: 32, borderRadius: 9, border: `1px solid ${C.border}`,
  background: C.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
};

const btnBase = {
  fontFamily: FONTS.heading, fontWeight: 700, fontSize: 14, borderRadius: 10,
  padding: "11px 20px", cursor: "pointer", border: "none", transition: "filter 0.15s ease",
};

function PrimaryButton({ children, onClick, color = C.navy, disabled, full }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...btnBase, background: disabled ? "#C9CEE3" : color, color: C.white, cursor: disabled ? "not-allowed" : "pointer", width: full ? "100%" : "auto" }}
      onMouseEnter={e => !disabled && (e.currentTarget.style.filter = "brightness(0.92)")}
      onMouseLeave={e => (e.currentTarget.style.filter = "none")}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, onClick, color = C.navy }) {
  return (
    <button onClick={onClick} style={{ ...btnBase, background: C.white, color, border: `1.5px solid ${color === C.red ? C.red : C.border}` }}>
      {children}
    </button>
  );
}

function InfoRow({ icon, label, value, valueColor }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
      <div style={{ color: C.muted, marginTop: 2 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: valueColor || C.navy }}>{value}</div>
      </div>
    </div>
  );
}

function Avatar({ iniciais, color }) {
  return (
    <div style={{ width: 40, height: 40, borderRadius: "50%", background: color, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, fontFamily: FONTS.heading, flexShrink: 0 }}>
      {iniciais}
    </div>
  );
}

/* ── STEP 1 ── */
function Step1({ status, statusColors, onCancelar }) {
  return (
    <Card>
      <CardHeader title="Detalhes da solicitação" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ display: "inline-block", background: statusColors.bg, color: statusColors.fg, fontSize: 12.5, fontWeight: 700, padding: "5px 12px", borderRadius: 999, marginBottom: 16 }}>
          {status}
        </span>
        <button style={{ ...iconBtnStyle, border: "none" }}>
          <FaEllipsisH size={14} color={C.muted} />
        </button>
      </div>
      <h3 style={{ fontFamily: FONTS.heading, fontSize: 19, fontWeight: 700, color: C.navy, margin: "0 0 16px" }}>
        {REQUEST.servico}
      </h3>
      <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 6 }}>Prestador</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <Avatar iniciais={REQUEST.prestador.iniciais} color={C.purple} />
        <div>
          <div style={{ fontWeight: 700, color: C.navy, fontSize: 14.5 }}>{REQUEST.prestador.nome}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: C.muted }}>
            <FaStar size={11} color={C.star} /> {REQUEST.prestador.rating} ({REQUEST.prestador.avaliacoes} avaliações)
          </div>
        </div>
      </div>
      <InfoRow icon={<FaCalendarAlt size={14} />} label="Data agendada" value={REQUEST.dataAgendada} />
      <InfoRow icon={<FaMapMarkerAlt size={14} />} label="Endereço" value={REQUEST.endereco} />
      <InfoRow icon={<FaMoneyBillWave size={14} />} label="Valor do serviço" value={REQUEST.valor} valueColor={C.orange} />
      <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
        <OutlineButton color={C.purple}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCommentDots size={13} /> Abrir chat</span>
        </OutlineButton>
        <OutlineButton color={C.red} onClick={onCancelar}>Cancelar solicitação</OutlineButton>
      </div>
    </Card>
  );
}

/* ── STEP 2 ── */
function Step2({ motivo, setMotivo, obs, setObs, podeContinuar, onVoltar, onContinuar }) {
  return (
    <Card>
      <CardHeader title="Cancelar solicitação" onClose={onVoltar} />
      <p style={{ fontSize: 14.5, fontWeight: 700, color: C.navy, margin: "0 0 14px" }}>Por que você deseja cancelar?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {MOTIVOS.map(m => {
          const selected = motivo === m;
          return (
            <label key={m} className="cancel-radio" style={{ display: "flex", alignItems: "center", gap: 12, border: `1.5px solid ${selected ? C.orange : C.border}`, background: selected ? "#FFF6EF" : C.white, borderRadius: 12, padding: "12px 14px", cursor: "pointer" }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${selected ? C.orange : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {selected && <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.orange }} />}
              </span>
              <span style={{ fontSize: 14, color: C.navy, fontWeight: selected ? 700 : 500 }}>{m}</span>
              <input type="radio" name="motivo" checked={selected} onChange={() => setMotivo(m)} style={{ display: "none" }} />
            </label>
          );
        })}
      </div>
      <p style={{ fontSize: 13.5, fontWeight: 700, color: C.navy, margin: "0 0 8px" }}>Observação (opcional)</p>
      <textarea className="cancel-textarea" value={obs} maxLength={200} onChange={e => setObs(e.target.value)} placeholder="Conte mais detalhes (opcional)..." style={{ width: "100%", minHeight: 80, resize: "vertical", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: 12, fontFamily: FONTS.body, fontSize: 14, color: C.navy, outline: "none", boxSizing: "border-box" }} />
      <div style={{ textAlign: "right", fontSize: 12, color: C.muted, margin: "4px 0 20px" }}>{obs.length}/200</div>
      <div style={{ display: "flex", gap: 12 }}>
        <OutlineButton onClick={onVoltar}>Voltar</OutlineButton>
        <PrimaryButton color={C.purple} disabled={!podeContinuar} onClick={onContinuar}>Continuar</PrimaryButton>
      </div>
    </Card>
  );
}

/* ── STEP 3 ── */
function Step3({ motivo, obs, onVoltar, onConfirmar }) {
  return (
    <Card>
      <CardHeader title="Confirmar cancelamento" onClose={onVoltar} />
      <div style={{ display: "flex", gap: 10, background: "#FFF6EF", border: "1px solid #FCE0C8", borderRadius: 12, padding: 14, marginBottom: 20 }}>
        <FaExclamationTriangle size={15} color={C.orange} style={{ marginTop: 2, flexShrink: 0 }} />
        <span style={{ fontSize: 13.5, color: C.navy }}>Ao confirmar, sua solicitação será cancelada e o prestador será notificado.</span>
      </div>
      <div style={{ border: `1px solid ${C.border}`, borderRadius: 14, padding: 18, marginBottom: 22 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 14 }}>Resumo da solicitação</div>
        <SummaryLine label="Serviço" value={REQUEST.servico} />
        <SummaryLine label="Prestador" value={REQUEST.prestador.nome} />
        <SummaryLine label="Data agendada" value={REQUEST.dataAgendada} />
        <SummaryLine label="Valor do serviço" value={REQUEST.valor} />
        <SummaryLine label="Motivo do cancelamento" value={motivo} />
        <SummaryLine label="Observação" value={obs || "Não preencheu observação."} last />
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <OutlineButton onClick={onVoltar}>Voltar</OutlineButton>
        <PrimaryButton color={C.red} onClick={onConfirmar}>Confirmar cancelamento</PrimaryButton>
      </div>
    </Card>
  );
}

function SummaryLine({ label, value, last }) {
  return (
    <div style={{ marginBottom: last ? 0 : 12 }}>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{value}</div>
    </div>
  );
}

/* ── STEP 4 ── */
function Step4({ motivo, onContinuar, onReiniciar }) {
  const router = useRouter();
  return (
    <Card style={{ textAlign: "center" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E9F8EF", display: "flex", alignItems: "center", justifyContent: "center", margin: "8px auto 18px" }}>
        <FaCheckCircle size={30} color={C.green} />
      </div>
      <h2 style={{ fontFamily: FONTS.heading, fontSize: 20, fontWeight: 700, color: C.navy, margin: "0 0 8px" }}>Solicitação cancelada!</h2>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 22px" }}>Seu cancelamento foi realizado com sucesso.</p>
      <div style={{ border: `1px solid ${C.border}`, borderRadius: 14, padding: 18, textAlign: "left", marginBottom: 22 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 14 }}>Resumo do cancelamento</div>
        <SummaryLine label="Data do cancelamento" value={REQUEST.canceladoEm} />
        <SummaryLine label="Cancelado por" value={`${REQUEST.cliente.nome} (Cliente)`} />
        <SummaryLine label="Motivo" value={motivo} last />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <PrimaryButton full onClick={onContinuar}>Ver minhas solicitações</PrimaryButton>
      </div>
    </Card>
  );
}

/* ── STEP 5 ── */
function Step5({ motivo, statusColors, onReiniciar }) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader title="Detalhes da solicitação" />
      <span style={{ display: "inline-block", background: statusColors.bg, color: statusColors.fg, fontSize: 12.5, fontWeight: 700, padding: "5px 12px", borderRadius: 999, marginBottom: 16 }}>
        Cancelada
      </span>
      <h3 style={{ fontFamily: FONTS.heading, fontSize: 19, fontWeight: 700, color: C.navy, margin: "0 0 16px" }}>
        {REQUEST.servico}
      </h3>
      <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 6 }}>Prestador</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <Avatar iniciais={REQUEST.prestador.iniciais} color={C.purple} />
        <div style={{ fontWeight: 700, color: C.navy, fontSize: 14.5 }}>{REQUEST.prestador.nome}</div>
      </div>
      <InfoRow icon={<FaCalendarAlt size={14} />} label="Data agendada" value={REQUEST.dataAgendada} />
      <InfoRow icon={<FaMapMarkerAlt size={14} />} label="Endereço" value={REQUEST.endereco} />
      <InfoRow icon={<FaMoneyBillWave size={14} />} label="Valor do serviço" value={REQUEST.valor} valueColor={C.orange} />
      <InfoRow icon={<FaCalendarAlt size={14} />} label="Cancelada em" value={REQUEST.canceladoEm} />
      <InfoRow icon={<FaExclamationTriangle size={14} />} label="Motivo" value={motivo} />
      <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
        <PrimaryButton color={C.navy} onClick={() => router.push("/Pages/Minhas_Solicitacoes")}>
          Ver minhas solicitações
        </PrimaryButton>
        {/* ── BOTÃO VOLTAR AO INÍCIO ── */}
        <button
          onClick={() => router.push("/Pages/Tela_inicial_cliente")}
          style={{ padding: "11px 20px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.white, color: C.navy, fontFamily: FONTS.heading, fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.navy; e.currentTarget.style.background = "#F6F7FB"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.white; }}
        >
          <FaHome size={14} color={C.navy} /> Voltar ao início
        </button>
        <OutlineButton color={C.muted} onClick={onReiniciar}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}><FaRedoAlt size={12} /> Reiniciar simulação</span>
        </OutlineButton>
      </div>
    </Card>
  );
}

/* ── Sidebar informativa ── */
function SidebarInfo({ step }) {
  const itens = [
    { label: "Nova", ativo: true },
    { label: "Aceita", ativo: true },
    { label: "Em andamento", ativo: true },
    { label: "Aguardando confirmação do cliente", ativo: true },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ padding: 20 }}>
        <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 12 }}>
          Quando o cliente pode cancelar?
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {itens.map(it => (
            <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FaCheckCircle size={13} color={C.green} />
              <span style={{ fontSize: 13.5, color: C.navy }}>{it.label}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{ padding: 20, background: "#FFF6EF", borderColor: "#FCE0C8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <FaShieldAlt size={14} color={C.orange} />
          <span style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 14, color: C.navy }}>Importante</span>
        </div>
        <p style={{ fontSize: 13, color: C.navy, margin: 0, lineHeight: 1.5 }}>
          Após o cancelamento, a solicitação não pode ser retomada.
        </p>
      </Card>
    </div>
  );
}

/* ── Rodapé ── */
function FooterNotes() {
  return (
    <div style={{ marginTop: 28, background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 20px", display: "flex", flexWrap: "wrap", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: "1 1 280px" }}>
        <FaClipboardList size={14} color={C.muted} />
        <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
          Todas as ações de cancelamento ficam registradas no histórico da solicitação e podem ser consultadas por ambas as partes.
        </span>
      </div>
    </div>
  );
}