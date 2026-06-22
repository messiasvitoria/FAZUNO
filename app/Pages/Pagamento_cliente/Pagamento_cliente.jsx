"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar_cliente from "@/app/components/TopBar_cliente";
import SideBar_cliente from "@/app/components/SideBar_cliente";

// ─── ICON COMPONENT ──────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    arrowLeft:    ["M19 12H5", "M12 19l-7-7 7-7"],
    arrowRight:   ["M5 12h14", "M12 5l7 7-7 7"],
    chevRight:    ["M9 18l6-6-6-6"],
    checkCircle:  ["M22 11.08V12a10 10 0 11-5.93-9.14", "M22 4L12 14.01l-3-3"],
    check:        ["M20 6L9 17l-5-5"],
    creditCard:   ["M1 4h22v16H1z", "M1 10h22"],
    smartphone:   ["M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2z", "M12 18h.01"],
    fileText:     ["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8", "M10 9H8"],
    wallet:       ["M20 12V22H4V12", "M22 7H2v5h20V7z", "M12 22V7", "M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z", "M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"],
    shield:       ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
    shieldCheck:  ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"],
    lock:         ["M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z", "M17 11V7a5 5 0 00-10 0v4"],
    info:         ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 8h.01", "M12 12v4"],
    calendar:     ["M3 4h18v18H3z", "M16 2v4", "M8 2v4", "M3 10h18"],
    mapPin:       ["M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z", "M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0"],
    user:         ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2", "M12 7m-4 0a4 4 0 108 0 4 4 0 00-8 0"],
    message:      ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
    copy:         ["M20 9h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z", "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"],
    zap:          ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
    eye:          ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 12m-3 0a3 3 0 106 0 3 3 0 00-6 0"],
    eyeOff:       ["M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24", "M1 1l22 22"],
    download:     ["M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"],
    home:         ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", "M9 22V12h6v10"],
    star:         null,
  };

  if (name === "star") {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  }
  const d = paths[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const contratacao = {
  prestador:      "João Eletricista",
  prestadorRole:  "Instalação elétrica",
  prestadorPhoto: "/foto_eletricista2.jpg",
  verificado:     true,
  servico:        "Instalação elétrica completa",
  codigo:         "#CON-4587",
  data:           "06/06/2025",
  dataAgendada:   "10/06/2025 às 09:00",
  endereco:       "Rua das Flores, 123 - Centro\nSão Paulo - SP",
  descricao:      "Instalação elétrica completa em apartamento 3 quartos.",
  valorServico:   350.00,
  taxaPlataforma: 17.50,
  descontoPix:    18.75,
};

// ─── GERADOR DE COMPROVANTE ───────────────────────────────────────────────────
function gerarComprovante() {
  const total = (contratacao.valorServico + contratacao.taxaPlataforma).toFixed(2).replace(".", ",");
  const agora = new Date();
  const dataHora = `${agora.toLocaleDateString("pt-BR")} às ${agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Comprovante FazUno — ${contratacao.codigo}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', 'Segoe UI', sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: flex-start; justify-content: center; padding: 40px 20px; }
    .page { width: 680px; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(13,27,62,0.15); }
    .header { background: linear-gradient(135deg, #0d1b3e 0%, #1a3060 60%, #0d1b3e 100%); padding: 36px 40px 32px; position: relative; overflow: hidden; }
    .header::before { content: ''; position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: rgba(249,115,22,0.12); }
    .header::after { content: ''; position: absolute; bottom: -80px; left: 30px; width: 240px; height: 240px; border-radius: 50%; background: rgba(255,255,255,0.04); }
    .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; }
    .logo-area { display: flex; align-items: center; gap: 10px; position: relative; z-index: 1; }
    .logo-box { width: 42px; height: 42px; background: #f97316; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 900; color: white; letter-spacing: -1px; }
    .logo-text { font-size: 22px; font-weight: 800; color: white; letter-spacing: -0.5px; }
    .logo-text span { color: #f97316; }
    .badge-aprovado { background: rgba(34,197,94,0.18); border: 1.5px solid rgba(34,197,94,0.5); color: #4ade80; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 20px; display: flex; align-items: center; gap: 6px; position: relative; z-index: 1; }
    .badge-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; }
    .header-title { position: relative; z-index: 1; }
    .header-title h1 { font-size: 28px; font-weight: 900; color: white; letter-spacing: -0.5px; margin-bottom: 4px; }
    .header-title p { font-size: 14px; color: rgba(255,255,255,0.55); font-weight: 400; }
    .header-meta { display: flex; gap: 32px; margin-top: 22px; position: relative; z-index: 1; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; }
    .header-meta-item label { font-size: 11px; color: rgba(255,255,255,0.45); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
    .header-meta-item span { font-size: 14px; color: white; font-weight: 600; }
    .header-meta-item span.accent { color: #f97316; }
    .orange-bar { height: 5px; background: linear-gradient(90deg, #f97316, #fb923c, #fdba74, #f97316); }
    .body { padding: 36px 40px; }
    .success-banner { background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 1.5px solid #86efac; border-radius: 16px; padding: 20px 22px; display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
    .success-icon { width: 52px; height: 52px; border-radius: 50%; background: #22c55e; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 6px 20px rgba(34,197,94,0.35); }
    .success-text h3 { font-size: 16px; font-weight: 800; color: #15803d; margin-bottom: 3px; }
    .success-text p { font-size: 13px; color: #16a34a; line-height: 1.4; }
    .section { margin-bottom: 28px; }
    .section-label { font-size: 11px; font-weight: 700; color: #f97316; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
    .section-label::after { content: ''; flex: 1; height: 1px; background: #f1f5f9; }
    .prestador-card { background: #f8faff; border: 1.5px solid #e0e7ff; border-radius: 14px; padding: 18px 20px; display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
    .avatar { width: 54px; height: 54px; border-radius: 50%; background: linear-gradient(135deg, #f97316, #fb923c); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: white; flex-shrink: 0; border: 2.5px solid #fed7aa; }
    .prestador-info h4 { font-size: 16px; font-weight: 700; color: #0d1b3e; margin-bottom: 2px; }
    .prestador-info p { font-size: 13px; color: #9ca3af; }
    .verified-badge { margin-left: auto; background: #f0fdf4; border: 1.5px solid #bbf7d0; color: #16a34a; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 20px; white-space: nowrap; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .info-cell { background: #f9fafb; border: 1px solid #f1f5f9; border-radius: 12px; padding: 14px 16px; }
    .info-cell.full { grid-column: 1 / -1; }
    .info-cell label { font-size: 11px; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; display: block; margin-bottom: 5px; }
    .info-cell span { font-size: 14px; color: #111827; font-weight: 600; line-height: 1.4; display: block; }
    .valores-box { background: #f9fafb; border: 1px solid #f1f5f9; border-radius: 14px; overflow: hidden; }
    .valor-row { display: flex; justify-content: space-between; align-items: center; padding: 13px 18px; border-bottom: 1px solid #f1f5f9; }
    .valor-row:last-child { border-bottom: none; }
    .valor-row .vlabel { font-size: 14px; color: #6b7280; font-weight: 500; }
    .valor-row .vval { font-size: 14px; color: #111827; font-weight: 700; }
    .valor-row.total { background: linear-gradient(135deg, #0d1b3e, #1a3060); }
    .valor-row.total .vlabel { color: rgba(255,255,255,0.7); font-size: 15px; font-weight: 700; }
    .valor-row.total .vval { color: #f97316; font-size: 22px; font-weight: 900; }
    .metodo-box { background: #f9fafb; border: 1px solid #f1f5f9; border-radius: 14px; padding: 16px 18px; display: flex; align-items: center; justify-content: space-between; }
    .metodo-icon { width: 40px; height: 40px; border-radius: 10px; background: #0d1b3e; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .metodo-info { flex: 1; margin-left: 12px; }
    .metodo-info h4 { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 2px; }
    .metodo-info p { font-size: 13px; color: #9ca3af; }
    .visa-badge { font-size: 11px; font-weight: 800; color: white; background: #1a1f71; padding: 4px 9px; border-radius: 5px; }
    .divider { height: 1px; background: #f1f5f9; margin: 0 0 28px; }
    .seguranca-row { display: flex; gap: 12px; }
    .seg-card { flex: 1; background: #f9fafb; border: 1px solid #f1f5f9; border-radius: 12px; padding: 14px 16px; display: flex; align-items: flex-start; gap: 10px; }
    .seg-icon { width: 32px; height: 32px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .seg-icon.green { background: #f0fdf4; }
    .seg-icon.blue { background: #eff6ff; }
    .seg-text h5 { font-size: 12px; font-weight: 700; color: #374151; margin-bottom: 2px; }
    .seg-text p { font-size: 11px; color: #9ca3af; line-height: 1.4; }
    .footer { background: #0d1b3e; padding: 22px 40px; display: flex; justify-content: space-between; align-items: center; }
    .footer-left { display: flex; align-items: center; gap: 10px; }
    .footer-logo-box { width: 32px; height: 32px; background: #f97316; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 900; color: white; }
    .footer-brand { font-size: 16px; font-weight: 800; color: white; }
    .footer-brand span { color: #f97316; }
    .footer-right { text-align: right; }
    .footer-right p { font-size: 12px; color: rgba(255,255,255,0.4); }
    .footer-right span { font-size: 12px; color: rgba(255,255,255,0.25); display: block; margin-top: 2px; }
    @media print { body { background: white; padding: 0; } .page { box-shadow: none; border-radius: 0; width: 100%; } }
  </style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="header-top">
      <div class="logo-area">
        <div class="logo-box">F</div>
        <span class="logo-text">Faz<span>Uno</span></span>
      </div>
      <div class="badge-aprovado"><div class="badge-dot"></div>Pagamento Aprovado</div>
    </div>
    <div class="header-title">
      <h1>Comprovante de Pagamento</h1>
      <p>Documento gerado automaticamente pela plataforma FazUno</p>
    </div>
    <div class="header-meta">
      <div class="header-meta-item"><label>Código da contratação</label><span class="accent">${contratacao.codigo}</span></div>
      <div class="header-meta-item"><label>Data e hora</label><span>${dataHora}</span></div>
      <div class="header-meta-item"><label>Cód. da transação</label><span>TXN-20250606-4587</span></div>
    </div>
  </div>
  <div class="orange-bar"></div>
  <div class="body">
    <div class="success-banner">
      <div class="success-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
      <div class="success-text"><h3>Pagamento realizado com sucesso!</h3><p>O prestador <strong>${contratacao.prestador}</strong> foi notificado e seu serviço está confirmado para ${contratacao.dataAgendada}.</p></div>
    </div>
    <div class="section">
      <div class="section-label">Prestador de serviço</div>
      <div class="prestador-card">
        <div class="avatar">JE</div>
        <div class="prestador-info"><h4>${contratacao.prestador}</h4><p>${contratacao.prestadorRole}</p></div>
        <div class="verified-badge">✓ Verificado</div>
      </div>
    </div>
    <div class="section">
      <div class="section-label">Detalhes do serviço</div>
      <div class="info-grid">
        <div class="info-cell full"><label>Serviço contratado</label><span>${contratacao.servico}</span></div>
        <div class="info-cell"><label>Data da contratação</label><span>${contratacao.data}</span></div>
        <div class="info-cell"><label>Data agendada</label><span>${contratacao.dataAgendada}</span></div>
        <div class="info-cell full"><label>Endereço do serviço</label><span>${contratacao.endereco.replace("\n", " — ")}</span></div>
        <div class="info-cell full"><label>Descrição</label><span>${contratacao.descricao}</span></div>
      </div>
    </div>
    <div class="section">
      <div class="section-label">Valores</div>
      <div class="valores-box">
        <div class="valor-row"><span class="vlabel">Valor do serviço</span><span class="vval">R$ ${contratacao.valorServico.toFixed(2).replace(".", ",")}</span></div>
        <div class="valor-row"><span class="vlabel">Taxa da plataforma</span><span class="vval">R$ ${contratacao.taxaPlataforma.toFixed(2).replace(".", ",")}</span></div>
        <div class="valor-row total"><span class="vlabel">Total pago</span><span class="vval">R$ ${total}</span></div>
      </div>
    </div>
    <div class="section">
      <div class="section-label">Método de pagamento</div>
      <div class="metodo-box">
        <div class="metodo-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div>
        <div class="metodo-info"><h4>Cartão de crédito</h4><p>•••• •••• •••• 1234</p></div>
        <span class="visa-badge">VISA</span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="section" style="margin-bottom:0">
      <div class="seguranca-row">
        <div class="seg-card"><div class="seg-icon green"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></div><div class="seg-text"><h5>Dados protegidos</h5><p>Suas informações financeiras não são compartilhadas com o prestador.</p></div></div>
        <div class="seg-card"><div class="seg-icon blue"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></div><div class="seg-text"><h5>Compra garantida</h5><p>O pagamento só é liberado ao prestador após a conclusão do serviço.</p></div></div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="footer-left"><div class="footer-logo-box">F</div><span class="footer-brand">Faz<span>Uno</span></span></div>
    <div class="footer-right"><p>fazuno.com.br • suporte@fazuno.com.br</p><span>© 2026 FazUno. Todos os direitos reservados.</span></div>
  </div>
</div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `comprovante-fazuno-${contratacao.codigo.replace("#", "")}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── STEP INDICATOR ──────────────────────────────────────────────────────────
function StepIndicator({ currentStep }) {
  const steps = ["Método de pagamento", "Revisão", "Confirmação", "Comprovante"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = idx < currentStep;
        const active = idx === currentStep;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, flexShrink: 0 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", backgroundColor: done ? "#22c55e" : active ? "#0d1b3e" : "#e5e7eb", color: done || active ? "white" : "#9ca3af", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, transition: "all 0.3s" }}>
                {done ? <Icon name="check" size={17} color="white" strokeWidth={2.5} /> : idx}
              </div>
              <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? "#0d1b3e" : done ? "#22c55e" : "#9ca3af", whiteSpace: "nowrap" }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, backgroundColor: done ? "#22c55e" : "#e5e7eb", margin: "0 8px", marginBottom: 22, transition: "background 0.3s" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── RESUMO CARD ─────────────────────────────────────────────────────────────
function ResumoCard({ title = "Resumo da contratação", showProvider = true, showPix = true, children }) {
  const total = contratacao.valorServico + contratacao.taxaPlataforma - (showPix ? contratacao.descontoPix : 0);
  return (
    <div style={{ backgroundColor: "white", borderRadius: 18, padding: 26, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1.5px solid #f1f5f9", width: 320, flexShrink: 0 }}>
      {/* ↓ gap: 12 corrige o "colado" entre título e "Ver detalhes" */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0d1b3e", margin: 0 }}>{title}</h3>
        {showProvider && <button style={{ fontSize: 14, color: "#6366f1", fontWeight: 600, background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>Ver detalhes</button>}
      </div>

      {showProvider && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid #f1f5f9", marginBottom: 16 }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", overflow: "hidden", border: "2px solid #fed7aa", flexShrink: 0 }}>
            <img src={contratacao.prestadorPhoto} alt={contratacao.prestador} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>{contratacao.prestador}</p>
              {contratacao.verificado && <Icon name="checkCircle" size={16} color="#22c55e" strokeWidth={2.5} />}
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#9ca3af" }}>{contratacao.prestadorRole}</p>
          </div>
        </div>
      )}

      {showProvider && (
        <div style={{ marginBottom: 16 }}>
          <Row label="Serviço" value={contratacao.servico} small />
          <Row label="Código da contratação" value={contratacao.codigo} small />
          <Row label="Data da contratação" value={contratacao.data} small />
        </div>
      )}

      <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: "#0d1b3e", margin: "0 0 12px" }}>Resumo do pagamento</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, color: "#6b7280" }}>Valor do serviço</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>R$ {contratacao.valorServico.toFixed(2).replace(".", ",")}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 14, color: "#6b7280" }}>Taxa da plataforma</span>
              <Icon name="info" size={13} color="#9ca3af" />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>R$ {contratacao.taxaPlataforma.toFixed(2).replace(".", ",")}</span>
          </div>
          {showPix && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, color: "#22c55e", fontWeight: 600 }}>Desconto (PIX)</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>- R$ {contratacao.descontoPix.toFixed(2).replace(".", ",")}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #f1f5f9" }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#0d1b3e" }}>Total</span>
            <span style={{ fontSize: 19, fontWeight: 800, color: "#6366f1" }}>R$ {total.toFixed(2).replace(".", ",")}</span>
          </div>
        </div>
      </div>

      {children}

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", backgroundColor: "#f0fdf4", borderRadius: 12, border: "1px solid #bbf7d0" }}>
          <Icon name="shieldCheck" size={18} color="#16a34a" strokeWidth={2} />
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#15803d" }}>Pagamento seguro</p>
            <p style={{ margin: 0, fontSize: 12, color: "#16a34a", lineHeight: 1.4 }}>Seus dados financeiros estão protegidos e não são compartilhados com o prestador.</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", backgroundColor: "#eff6ff", borderRadius: 12, border: "1px solid #bfdbfe" }}>
          <Icon name="shieldCheck" size={18} color="#2563eb" strokeWidth={2} />
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#1d4ed8" }}>Compra garantida FazUno</p>
            <p style={{ margin: 0, fontSize: 12, color: "#2563eb", lineHeight: 1.4 }}>Seu pagamento só será liberado após a conclusão do serviço.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, small }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 7 }}>
      <span style={{ fontSize: small ? 13 : 14, color: "#9ca3af", flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: small ? 13 : 14, fontWeight: 600, color: "#374151", textAlign: "right" }}>{value}</span>
    </div>
  );
}

// ─── SHARED BUTTON ───────────────────────────────────────────────────────────
function NavBtn({ children, onClick, secondary }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", borderRadius: 12, border: secondary ? "1.5px solid #e5e7eb" : "none", backgroundColor: secondary ? "white" : hovered ? "#f97316" : "#0d1b3e", color: secondary ? "#374151" : "white", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", boxShadow: !secondary ? "0 4px 14px rgba(13,27,62,0.25)" : "none" }}
    >
      {children}
    </button>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box", padding: "12px 14px",
  fontSize: 15, color: "#374151", backgroundColor: "white",
  border: "1.5px solid #e5e7eb", borderRadius: 12, outline: "none",
};

// ─── STEP 1 — MÉTODO DE PAGAMENTO ────────────────────────────────────────────
function Step1({ onNext }) {
  const router = useRouter();
  const [method, setMethod]     = useState("credit");
  const [showCvv, setShowCvv]   = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const methods = [
    { id: "credit",  icon: "creditCard", label: "Cartão de crédito",  sub: "Pague com seu cartão de crédito em até 12x.", badge: null },
    { id: "pix",     icon: "zap",        label: "PIX",                sub: "Aprovação imediata.",                          badge: "Desconto de 5%" },
    { id: "boleto",  icon: "fileText",   label: "Boleto bancário",    sub: "Aprovação em até 2 dias úteis.",               badge: null },
    { id: "wallet",  icon: "wallet",     label: "Carteira FazUno",    sub: "Saldo disponível: R$ 120,00",                  badge: "Usar saldo" },
  ];

  return (
    <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        {/* ── BREADCRUMB / BOTÃO VOLTAR AO INÍCIO ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <button
            onClick={() => router.push("/Pages/Tela_inicial_cliente")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: "1.5px solid #e5e7eb", background: "white", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#0d1b3e"; e.currentTarget.style.color = "#0d1b3e"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}
          >
            <Icon name="home" size={14} color="currentColor" strokeWidth={2} />
            Início
          </button>
          <span style={{ color: "#d1d5db", fontSize: 14 }}>›</span>
          <span style={{ fontSize: 13, color: "#9ca3af" }}>Minhas Solicitações</span>
          <span style={{ color: "#d1d5db", fontSize: 14 }}>›</span>
          <span style={{ fontSize: 13, color: "#0d1b3e", fontWeight: 600 }}>Pagamento</span>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0d1b3e", margin: "0 0 6px" }}>Realizar Pagamento</h2>
        <p style={{ fontSize: 15, color: "#9ca3af", margin: "0 0 28px" }}>Finalize o pagamento para confirmar sua contratação.</p>

        <StepIndicator currentStep={1} />

        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f97316", margin: "0 0 16px" }}>1. Escolha o método de pagamento</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {methods.map(m => (
            <div key={m.id} onClick={() => setMethod(m.id)}
              style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", borderRadius: 14, border: `2px solid ${method === m.id ? "#0d1b3e" : "#e5e7eb"}`, backgroundColor: method === m.id ? "#f8faff" : "white", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ width: 21, height: 21, borderRadius: "50%", border: `2px solid ${method === m.id ? "#0d1b3e" : "#d1d5db"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {method === m.id && <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#0d1b3e" }} />}
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={m.icon} size={19} color="#0d1b3e" strokeWidth={2} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>{m.label}</p>
                <p style={{ margin: 0, fontSize: 13, color: "#9ca3af" }}>{m.sub}</p>
              </div>
              {m.id === "credit" && (
                <div style={{ display: "flex", gap: 5 }}>
                  {["VISA", "MC", "ELO"].map(b => (
                    <span key={b} style={{ fontSize: 10, fontWeight: 800, color: "white", backgroundColor: b === "VISA" ? "#1a1f71" : b === "MC" ? "#eb001b" : "#00a4e0", padding: "3px 6px", borderRadius: 4 }}>{b}</span>
                  ))}
                </div>
              )}
              {m.badge && (
                <span style={{ fontSize: 12, fontWeight: 700, color: m.id === "pix" ? "#16a34a" : "#6366f1", backgroundColor: m.id === "pix" ? "#dcfce7" : "#ede9fe", padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>{m.badge}</span>
              )}
            </div>
          ))}
        </div>

        {method === "credit" && (
          <div style={{ backgroundColor: "#f8faff", borderRadius: 16, padding: 22, border: "1.5px solid #e0e7ff", marginBottom: 24 }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0d1b3e", margin: "0 0 16px" }}>Dados do cartão</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Número do cartão</label>
                  <div style={{ position: "relative" }}>
                    <input placeholder="0000 0000 0000 0000" style={inputStyle} />
                    <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
                      <Icon name="creditCard" size={18} color="#9ca3af" />
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Nome no cartão</label>
                  <input placeholder="Nome como está no cartão" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Validade</label>
                  <input placeholder="MM/AA" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Código de segurança</label>
                  <div style={{ position: "relative" }}>
                    <input placeholder="CVV" type={showCvv ? "text" : "password"} style={inputStyle} />
                    <button onClick={() => setShowCvv(!showCvv)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      <Icon name={showCvv ? "eyeOff" : "eye"} size={17} color="#9ca3af" />
                    </button>
                  </div>
                </div>
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
                <input type="checkbox" checked={saveCard} onChange={e => setSaveCard(e.target.checked)} style={{ width: 16, height: 16, accentColor: "#0d1b3e" }} />
                <span style={{ fontSize: 14, color: "#374151" }}>Salvar cartão para futuras compras</span>
              </label>
            </div>
          </div>
        )}

        {method === "pix" && (
          <div style={{ backgroundColor: "#f0fdf4", borderRadius: 16, padding: 22, border: "1.5px solid #bbf7d0", marginBottom: 24, textAlign: "center" }}>
            <div style={{ width: 96, height: 96, backgroundColor: "#e2e8f0", borderRadius: 10, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>QR CODE</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#15803d", margin: "0 0 5px" }}>Escaneie o QR Code com seu banco</p>
            <p style={{ fontSize: 13, color: "#16a34a", margin: "0 0 14px" }}>Ou copie o código PIX abaixo</p>
            <div style={{ display: "flex", gap: 10 }}>
              <input value="00020126580014br.gov.bcb.pix..." readOnly style={{ ...inputStyle, flex: 1, fontSize: 13 }} />
              <button style={{ padding: "12px 16px", backgroundColor: "#0d1b3e", color: "white", borderRadius: 10, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 600 }}>
                <Icon name="copy" size={15} color="white" /> Copiar
              </button>
            </div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 24 }}>
          <Icon name="lock" size={15} color="#9ca3af" />
          <span style={{ fontSize: 13, color: "#9ca3af" }}>Seus dados estão protegidos com criptografia de ponta a ponta.</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <NavBtn secondary onClick={() => router.push("/Pages/Minhas_Solicitacoes")}>
            <Icon name="arrowLeft" size={15} color="#374151" strokeWidth={2} /> Voltar
          </NavBtn>
          <NavBtn onClick={onNext}>
            Continuar para revisão <Icon name="arrowRight" size={15} color="white" strokeWidth={2} />
          </NavBtn>
        </div>
      </div>

      <ResumoCard showPix={method === "pix"} />
    </div>
  );
}

// ─── STEP 2 — REVISÃO ────────────────────────────────────────────────────────
function Step2({ onNext, onBack }) {
  return (
    <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0d1b3e", margin: "0 0 6px" }}>Revisão do pagamento</h2>
        <p style={{ fontSize: 15, color: "#9ca3af", margin: "0 0 28px" }}>Confira os detalhes da sua contratação e do pagamento.</p>

        <StepIndicator currentStep={2} />

        <div style={{ backgroundColor: "white", borderRadius: 18, padding: 24, border: "1.5px solid #f1f5f9", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 18 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0d1b3e", margin: "0 0 18px" }}>Detalhes da contratação</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, padding: "14px", backgroundColor: "#f8faff", borderRadius: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", border: "2px solid #fed7aa", flexShrink: 0 }}>
              <img src={contratacao.prestadorPhoto} alt={contratacao.prestador} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>{contratacao.prestador}</p>
                <Icon name="checkCircle" size={16} color="#22c55e" strokeWidth={2.5} />
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#9ca3af" }}>{contratacao.prestadorRole}</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { icon: "fileText", label: "Serviço",               value: contratacao.servico },
              { icon: "copy",     label: "Código da contratação", value: contratacao.codigo },
              { icon: "calendar", label: "Data da contratação",   value: contratacao.data },
              { icon: "calendar", label: "Data agendada",         value: contratacao.dataAgendada },
              { icon: "mapPin",   label: "Endereço",              value: contratacao.endereco },
              { icon: "fileText", label: "Descrição",             value: contratacao.descricao },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, paddingBottom: 14, borderBottom: i < 5 ? "1px solid #f9fafb" : "none" }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <Icon name={item.icon} size={15} color="#6b7280" strokeWidth={2} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, color: "#9ca3af" }}>{item.label}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 14, fontWeight: 600, color: "#111827", whiteSpace: "pre-line" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: "white", borderRadius: 18, padding: 24, border: "1.5px solid #f1f5f9", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0d1b3e", margin: "0 0 16px" }}>Método de pagamento</h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="creditCard" size={19} color="#0d1b3e" strokeWidth={2} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#111827" }}>Cartão de crédito</p>
                <p style={{ margin: 0, fontSize: 13, color: "#9ca3af" }}>•••• •••• •••• 1234</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "white", backgroundColor: "#1a1f71", padding: "3px 7px", borderRadius: 4 }}>VISA</span>
              <button style={{ fontSize: 14, color: "#6366f1", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Alterar</button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <NavBtn secondary onClick={onBack}>
            <Icon name="arrowLeft" size={15} color="#374151" strokeWidth={2} /> Voltar
          </NavBtn>
          <NavBtn onClick={onNext}>
            Confirmar pagamento <Icon name="arrowRight" size={15} color="white" strokeWidth={2} />
          </NavBtn>
        </div>
      </div>

      <ResumoCard title="Resumo do pagamento" showProvider={false} showPix={false} />
    </div>
  );
}

// ─── STEP 3 — CONFIRMAÇÃO ────────────────────────────────────────────────────
function Step3({ onNext, onBack }) {
  return (
    <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0d1b3e", margin: "0 0 6px" }}>Confirmação do pagamento</h2>
        <p style={{ fontSize: 15, color: "#9ca3af", margin: "0 0 28px" }}>Aguarde enquanto processamos o seu pagamento.</p>

        <StepIndicator currentStep={3} />

        <div style={{ backgroundColor: "white", borderRadius: 18, padding: 48, border: "1.5px solid #f1f5f9", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 18, textAlign: "center" }}>
          <div style={{ position: "relative", width: 116, height: 116, margin: "0 auto 24px" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "#ede9fe", animation: "pulse 2s infinite" }} />
            <div style={{ position: "absolute", inset: 9, borderRadius: "50%", backgroundColor: "#ddd6fe", animation: "pulse 2s infinite 0.3s" }} />
            <div style={{ position: "absolute", inset: 18, borderRadius: "50%", backgroundColor: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="lock" size={32} color="white" strokeWidth={2} />
            </div>
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <div key={i} style={{ position: "absolute", width: 7, height: 7, borderRadius: "50%", backgroundColor: i % 2 === 0 ? "#f97316" : "#6366f1", top: "50%", left: "50%", transform: `rotate(${deg}deg) translateX(58px) translateY(-50%)` }} />
            ))}
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0d1b3e", margin: "0 0 7px" }}>Processando pagamento...</h3>
          <p style={{ fontSize: 15, color: "#9ca3af", margin: "0 0 32px" }}>Isso pode levar alguns segundos. Não feche esta página.</p>
          <div style={{ backgroundColor: "#f9fafb", borderRadius: 14, padding: 18, textAlign: "left" }}>
            {[
              { label: "Método de pagamento", value: "Cartão de crédito" },
              { label: "Valor total",          value: "R$ 348,75" },
              { label: "Status",               value: null },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? "1px solid #f1f5f9" : "none" }}>
                <span style={{ fontSize: 14, color: "#9ca3af" }}>{item.label}</span>
                {item.value
                  ? <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{item.value}</span>
                  : <span style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b", backgroundColor: "#fef3c7", padding: "4px 12px", borderRadius: 20 }}>Processando...</span>
                }
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          <Icon name="lock" size={15} color="#9ca3af" />
          <span style={{ fontSize: 13, color: "#9ca3af" }}>Seus dados estão protegidos com criptografia de ponta a ponta.</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
          <NavBtn onClick={onNext}>
            Ver comprovante <Icon name="arrowRight" size={15} color="white" strokeWidth={2} />
          </NavBtn>
        </div>
      </div>

      <ResumoCard title="Resumo do pagamento" showProvider={false} showPix={false} />
    </div>
  );
}

// ─── STEP 4 — COMPROVANTE ────────────────────────────────────────────────────
function Step4({ onRestart }) {
  const router = useRouter();
  const [baixando, setBaixando] = useState(false);

  function handleBaixar() {
    setBaixando(true);
    setTimeout(() => {
      gerarComprovante();
      setBaixando(false);
    }, 400);
  }

  return (
    <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0d1b3e", margin: "0 0 6px" }}>Pagamento realizado com sucesso!</h2>
        <p style={{ fontSize: 15, color: "#9ca3af", margin: "0 0 28px" }}>Seu pagamento foi aprovado e o prestador foi notificado.</p>

        <StepIndicator currentStep={4} />

        <div style={{ backgroundColor: "white", borderRadius: 18, padding: 38, border: "1.5px solid #f1f5f9", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 18, textAlign: "center" }}>
          <div style={{ position: "relative", width: 104, height: 104, margin: "0 auto 18px" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "#dcfce7" }} />
            <div style={{ position: "absolute", inset: 11, borderRadius: "50%", backgroundColor: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="check" size={34} color="white" strokeWidth={3} />
            </div>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <div key={i} style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", backgroundColor: i % 2 === 0 ? "#22c55e" : "#86efac", top: "50%", left: "50%", transform: `rotate(${deg}deg) translateX(56px) translateY(-50%)` }} />
            ))}
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0d1b3e", margin: "0 0 5px" }}>Pagamento aprovado!</h3>
          <p style={{ fontSize: 15, color: "#9ca3af", margin: "0 0 28px" }}>Obrigado! Seu pagamento foi realizado com sucesso.<br/>O prestador {contratacao.prestador} foi notificado.</p>
          <div style={{ backgroundColor: "#f9fafb", borderRadius: 14, padding: 18, textAlign: "left" }}>
            {[
              { label: "Código da transação", value: "PIX123456789O" },
              { label: "Data e hora",          value: "06/06/2025 às 14:32" },
              { label: "Método de pagamento",  value: "Cartão de crédito •••• 1234" },
              { label: "Valor pago",           value: "R$ 348,75" },
              { label: "Status",               value: null },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 4 ? "1px solid #f1f5f9" : "none" }}>
                <span style={{ fontSize: 14, color: "#9ca3af" }}>{item.label}</span>
                {item.value
                  ? <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{item.value}</span>
                  : <span style={{ fontSize: 13, fontWeight: 700, color: "#16a34a", backgroundColor: "#dcfce7", padding: "4px 12px", borderRadius: 20 }}>Aprovado</span>
                }
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTÃO BAIXAR COMPROVANTE ── */}
        <div style={{ marginBottom: 18 }}>
          <button
            onClick={handleBaixar}
            style={{ width: "100%", padding: "15px 26px", borderRadius: 14, border: "2px dashed #e0e7ff", backgroundColor: baixando ? "#f8faff" : "white", color: "#0d1b3e", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#f97316"; e.currentTarget.style.backgroundColor = "#fff7ed"; e.currentTarget.style.color = "#f97316"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e7ff"; e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color = "#0d1b3e"; }}
          >
            <Icon name="download" size={18} color="currentColor" strokeWidth={2.2} />
            {baixando ? "Gerando comprovante..." : "Baixar comprovante"}
          </button>
          <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: 8 }}>
            O comprovante será salvo como arquivo HTML — abra no navegador e use Ctrl+P para imprimir ou salvar em PDF.
          </p>
        </div>

        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <button
            onClick={() => router.push("/Pages/Minhas_Solicitacoes")}
            style={{ padding: "13px 26px", borderRadius: 12, border: "1.5px solid #e5e7eb", backgroundColor: "white", color: "#374151", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#0d1b3e"; e.currentTarget.style.color = "#0d1b3e"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}
          >
            Ver detalhes da contratação
          </button>
          <button
            onClick={() => router.push("/Pages/Tela_inicial_cliente")}
            style={{ padding: "13px 26px", borderRadius: 12, border: "none", backgroundColor: "#0d1b3e", color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8 }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f97316"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0d1b3e"}
          >
            <Icon name="home" size={16} color="white" strokeWidth={2} />
            Voltar ao início
          </button>
        </div>
      </div>

      <ResumoCard title="Resumo do pagamento" showProvider={false} showPix={false} />
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Pagamento() {
  const [step, setStep] = useState(1);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f9fafb", display: "flex", flexDirection: "column" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.05)} }
        input:focus { border-color: #f97316 !important; box-shadow: 0 0 0 3px rgba(249,115,22,0.15) !important; }
      `}</style>

      {/* TOPBAR */}
      <TopBar_cliente />

      {/* BODY */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden", alignItems: "stretch" }}>
          {/* SIDEBAR */}
          <div style={{ flexShrink: 0 }}>
            <SideBar_cliente />
          </div>

        {/* SCROLL AREA */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 28px" }}>
            {step === 1 && <Step1 onNext={() => setStep(2)} />}
            {step === 2 && <Step2 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <Step3 onNext={() => setStep(4)} onBack={() => setStep(2)} />}
            {step === 4 && <Step4 onRestart={() => setStep(1)} />}
          </div>

          {/* FOOTER */}
          <footer style={{ backgroundColor: "#0d1b3e", color: "white", marginTop: 40 }}>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img src="/Logo_branca.png" alt="Fazuno" style={{ height: 36, width: "auto", display: "block" }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>© 2026 FazUno. Todos os direitos reservados.</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}