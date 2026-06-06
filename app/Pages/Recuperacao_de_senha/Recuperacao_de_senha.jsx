"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const btnRef = useRef(null);

  function handleRipple(e) {
    const btn = btnRef.current;
    if (!btn) return;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.cssText = `
      position:absolute;
      border-radius:50%;
      background:rgba(10,11,45,0.12);
      transform:scale(0);
      animation:rippleAnim 0.5s linear;
      pointer-events:none;
      width:${diameter}px;
      height:${diameter}px;
      left:${e.clientX - rect.left - radius}px;
      top:${e.clientY - rect.top - radius}px;
    `;
    btn.appendChild(circle);
    circle.addEventListener("animationend", () => circle.remove());
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.push('/Pages/Recuperacao_de_senha_codigo');
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes rippleAnim { to { transform: scale(5); opacity: 0; } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .animate-fadeUp { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both; }
        .reset-input::placeholder { color: rgba(230,230,230,0.3); font-weight: 300; }
        .reset-input:focus { outline: none; border-color: #E87722 !important; background: rgba(230,230,230,0.12) !important; box-shadow: 0 0 10px rgba(232,119,34,0.45), 0 0 24px rgba(232,119,34,0.2) !important; }
        .reset-input:hover { border-color: #E87722 !important; box-shadow: 0 0 10px rgba(232,119,34,0.35), 0 0 20px rgba(232,119,34,0.15) !important; }
        .reset-btn:hover { border: 1.5px solid #E87722 !important; box-shadow: 0 0 10px rgba(232,119,34,0.45), 0 0 24px rgba(232,119,34,0.2) !important; }
      `}</style>

      <div
        className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
        style={{ background: "#0A0B2D", fontFamily: "'DM Sans', sans-serif", color: "#E6E6E6" }}
      >
        {/* Círculos decorativos */}
        <div className="absolute rounded-full pointer-events-none" style={{ width: 340, height: 340, top: -80, right: 220, background: "rgba(230,230,230,0.06)" }} />
        <div className="absolute rounded-full pointer-events-none" style={{ width: 180, height: 180, top: 60, right: 60, background: "rgba(230,230,230,0.06)" }} />
        <div className="absolute rounded-full pointer-events-none" style={{ width: 90, height: 90, bottom: 100, right: 160, background: "rgba(230,230,230,0.06)" }} />
        <div className="absolute rounded-full pointer-events-none" style={{ width: 55, height: 55, bottom: 200, right: 80, background: "rgba(230,230,230,0.06)" }} />

        {/* Formulário */}
        <form
          className="animate-fadeUp w-full z-10 flex flex-col"
          style={{ maxWidth: 340, fontFamily: "'DM Sans', sans-serif" }}
          onSubmit={handleSubmit}
        >
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "2.2rem", fontWeight: 700, color: "#E6E6E6", letterSpacing: "-1px", lineHeight: 1, marginBottom: 12 }}>
            Redefinir senha
          </h1>

          <p style={{ fontSize: "0.85rem", color: "rgba(230,230,230,0.5)", lineHeight: 1.6, marginBottom: 32 }}>
            Digite seu email para receber um código e redefinir sua senha.
          </p>

          {/* Campo de Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 500, color: "#DCDCDC", letterSpacing: "0.01em", marginBottom: 7 }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Digite seu email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="reset-input"
              style={{
                width: "100%",
                padding: "13px 16px",
                background: "rgba(230,230,230,0.08)",
                border: "1.5px solid rgba(230,230,230,0.15)",
                borderRadius: 10,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.94rem",
                color: "#E6E6E6",
                transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Botão de Confirmação */}
          <button
            type="submit"
            ref={btnRef}
            onMouseDown={(e) => { handleRipple(e); e.currentTarget.style.transform = "translateY(0)"; }}
            className="w-full relative overflow-hidden reset-btn"
            style={{
              width: "100%",
              padding: "14px",
              background: "#E6E6E6",
              color: "#0A0B2D",
              border: "1.5px solid transparent",
              borderRadius: 10,
              fontFamily: "'Sora', sans-serif",
              fontSize: "0.97rem",
              fontWeight: 600,
              letterSpacing: "0.01em",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
              boxShadow: "0 4px 20px rgba(230,230,230,0.15)",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#DCDCDC";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(230,230,230,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E6E6E6";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(230,230,230,0.15)";
            }}
          >
            Confirmar
          </button>

          {/* Link Voltar ao Login */}
          <div style={{ textAlign: "center", marginTop: 22, fontSize: "0.85rem", color: "rgba(230,230,230,0.4)" }}>
            Lembrou a senha?{" "}
            <Link
              href="/Pages/Login"
              style={{ color: "#E6E6E6", fontWeight: 500, textDecoration: "none", borderBottom: "1px solid rgba(230,230,230,0.3)", paddingBottom: 1, transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#E6E6E6")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(230,230,230,0.3)")}
            >
              Voltar ao login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}