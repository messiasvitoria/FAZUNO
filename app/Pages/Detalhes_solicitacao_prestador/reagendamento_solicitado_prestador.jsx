"use client";
import { useState } from "react";
import { useNotificacoes } from "@/context/NotificacoesContext";
export default function ReagendamentoSolicitadoPrestador({ onClose, onConcluir }) {
  const [step, setStep] = useState(1);
  const [novaData, setNovaData] = useState("");
  const [novoHorario, setNovoHorario] = useState("");
  const [motivo, setMotivo] = useState("");
  const [observacao, setObservacao] = useState("");
  const { addNotificacao } = useNotificacoes();
  const IconCalendar = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
  );
  const IconClock = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
  );
  const IconClose = () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
  );
  const IconAlert = () => (
    <svg width="18" height="18" fill="none" stroke="#92400E" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  );
  const IconBell = () => (
    <svg width="16" height="16" fill="none" stroke="#7C3AED" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  );

  const overlayStyle = {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
    zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    fontFamily: "'Inter', sans-serif",
  };

  const boxStyle = {
    background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB",
    width: "100%", maxWidth: 440, boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
    maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden",
  };

  const headerStyle = {
    padding: "16px 20px", borderBottom: "1px solid #E5E7EB",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    flexShrink: 0,
  };

  const bodyStyle = {
    padding: 20, overflowY: "auto",
  };

  const podeProsseguir = novaData && novoHorario && motivo;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={boxStyle} onClick={(e) => e.stopPropagation()}>

        {step === 1 && (
          <>
            <div style={headerStyle}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Reagendar serviço</span>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex" }}><IconClose /></button>
            </div>
            <div style={bodyStyle}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 8, fontWeight: 500 }}>Data e horário atuais</div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 14, color: "#374151" }}>
                    <IconCalendar /> 20/05/2024
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 14, color: "#374151" }}>
                    <IconClock /> 14:30
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Nova data</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", border: "1.5px solid #7C3AED", borderRadius: 8 }}>
                  <IconCalendar />
                  <input type="text" placeholder="DD/MM/AAAA" value={novaData} onChange={(e) => setNovaData(e.target.value)} style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#374151" }} />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Novo horário</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", border: "1.5px solid #7C3AED", borderRadius: 8 }}>
                  <IconClock />
                  <input type="text" placeholder="HH:MM" value={novoHorario} onChange={(e) => setNovoHorario(e.target.value)} style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#374151" }} />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
                  Motivo do reagendamento <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <select value={motivo} onChange={(e) => setMotivo(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 14, color: motivo ? "#374151" : "#9CA3AF", outline: "none", background: "#fff" }}>
                  <option value="">Selecione um motivo</option>
                  <option>Conflito de agenda</option>
                  <option>Imprevisto pessoal</option>
                  <option>Problema de deslocamento</option>
                  <option>Condições climáticas</option>
                  <option>Ajuste operacional</option>
                  <option>Outro motivo</option>
                </select>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Observação (opcional)</label>
                <textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} maxLength={200} rows={3} placeholder="Adicione uma justificativa opcional..." style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 14, color: "#374151", outline: "none", resize: "none" }} />
                <div style={{ textAlign: "right", fontSize: 12, color: "#9CA3AF" }}>{observacao.length}/200</div>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={onClose} style={{ flex: 1, padding: "12px", border: "1.5px solid #E5E7EB", borderRadius: 10, background: "#fff", color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Cancelar</button>
                <button onClick={() => { if (podeProsseguir) setStep(2); }} style={{ flex: 2, padding: "12px", border: "none", borderRadius: 10, background: podeProsseguir ? "#7C3AED" : "#D1D5DB", color: "#fff", fontWeight: 600, fontSize: 14, cursor: podeProsseguir ? "pointer" : "not-allowed" }}>
                  Enviar solicitação
                </button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={headerStyle}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Confirmar reagendamento</span>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex" }}><IconClose /></button>
            </div>
            <div style={bodyStyle}>
              <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, padding: "12px 14px", display: "flex", gap: 10, marginBottom: 20 }}>
                <IconAlert />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#92400E" }}>O cliente irá analisar sua solicitação</div>
                  <div style={{ fontSize: 13, color: "#92400E", marginTop: 2 }}>Aguardamos a resposta do cliente.</div>
                </div>
              </div>

              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Resumo da solicitação</div>
              {[
                { label: "Serviço", value: "Instalação de Torneira" },
                { label: "Cliente", value: "Mariana Costa" },
                { label: "Data e horário atuais", value: "20/05/2024 às 14:30" },
                { label: "Nova data e horário", value: `${novaData} às ${novoHorario}` },
                { label: "Motivo", value: motivo },
                ...(observacao ? [{ label: "Observação", value: observacao }] : []),
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, gap: 16 }}>
                  <span style={{ fontSize: 13, color: "#6B7280", flexShrink: 0 }}>{item.label}</span>
                  <span style={{ fontSize: 13, color: "#111827", textAlign: "right" }}>{item.value}</span>
                </div>
              ))}

              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: "12px", border: "1.5px solid #E5E7EB", borderRadius: 10, background: "#fff", color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Voltar</button>
                <button
                onClick={() => {
                  setStep(3);
                  addNotificacao({
                    icon: "doc",
                    iconColor: "#7C3AED",
                    iconBg: "#F5F3FF",
                    title: "Reagendamento solicitado",
                    desc: `Você solicitou reagendar para ${novaData} às ${novoHorario}. Aguardando resposta do cliente.`,
                    category: "solicitações",
                  });
                }}
                style={{ flex: 2, padding: "12px", border: "none", borderRadius: 10, background: "#7C3AED", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
              >
                Confirmar e enviar
              </button>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div style={headerStyle}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Solicitação enviada</span>
            </div>
            <div style={{ ...bodyStyle, padding: 32, textAlign: "center" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <IconBell />
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: "#7C3AED" }}>Solicitação enviada!</div>
              <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 20 }}>O cliente foi notificado e irá analisar sua proposta de reagendamento.</p>

              <div style={{ background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 10, padding: "12px 16px", marginBottom: 20, textAlign: "left" }}>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 6 }}>Nova proposta</div>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#374151" }}><IconCalendar /> {novaData}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#374151" }}><IconClock /> {novoHorario}</div>
                </div>
              </div>

              <div style={{ background: "#F5F3FF", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#7C3AED", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <IconBell /> Você será notificado quando o cliente responder.
              </div>

              <button onClick={() => { onConcluir && onConcluir(); onClose(); }} style={{ width: "100%", padding: "12px", border: "none", borderRadius: 10, background: "#7C3AED", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                Fechar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}