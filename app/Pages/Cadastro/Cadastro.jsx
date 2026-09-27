"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagemErro("");
    setMensagemSucesso("");

    if (!nome || !email || !senha || !confirmarSenha) {
      setMensagemErro("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagemErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: nome,
          email: email,
          password: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagemSucesso("Conta criada com sucesso! Redirecionando...");
        setTimeout(() => {
          router.push("/Pages/Login");
        }, 1500);
      } else {
        setMensagemErro(data.erro || "Ocorreu um erro ao cadastrar.");
      }
    } catch (err) {
      setMensagemErro("Erro ao se conectar com o servidor Django.");
    } finally {
      setCarregando(false);
    }
  }

  const inputBase = {
    width: "100%",
    padding: "13px 18px",
    background: "rgba(230,230,230,0.08)",
    border: "1.5px solid rgba(230,230,230,0.15)",
    borderRadius: 12,
    fontSize: "1.05rem",
    color: "#E6E6E6",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "'DM Sans', sans-serif",
  };

  const focusHandlers = {
    onMouseEnter: (e) => {
      e.target.style.borderColor = "#E87722";
      e.target.style.boxShadow = "0 0 10px rgba(232,119,34,0.45), 0 0 24px rgba(232,119,34,0.2)";
    },
    onMouseLeave: (e) => {
      e.target.style.borderColor = "rgba(230,230,230,0.15)";
      e.target.style.boxShadow = "none";
    },
    onFocus: (e) => {
      e.target.style.borderColor = "#E87722";
      e.target.style.boxShadow = "0 0 10px rgba(232,119,34,0.45), 0 0 24px rgba(232,119,34,0.2)";
    },
    onBlur: (e) => {
      e.target.style.borderColor = "rgba(230,230,230,0.15)";
      e.target.style.boxShadow = "none";
    }
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.92rem",
    fontWeight: 500,
    color: "#DCDCDC",
    marginBottom: 8,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        html, body, #__next { margin: 0; padding: 0; width: 100%; overflow-x: hidden; }
        * { box-sizing: border-box; }
        @keyframes rippleAnim { to { transform: scale(5); opacity: 0; } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0B2D",
          width: "100vw",
          height: "100vh",
          fontFamily: "'DM Sans', sans-serif",
          color: "#E6E6E6",
        }}
      >
        <div style={{ position:"absolute", borderRadius:"50%", width:340, height:340, top:-80, right:220, background:"rgba(230,230,230,0.06)" }} />
        <div style={{ position:"absolute", borderRadius:"50%", width:180, height:180, top:60, right:60, background:"rgba(230,230,230,0.06)" }} />

        <form
          className="animate-fadeUp"
          style={{
            maxWidth: 460,
            width: "90%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 10,
          }}
          onSubmit={handleSubmit}
        >
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "#E6E6E6",
            marginBottom: 6,
          }}>
            Criar conta
          </h1>

          <p style={{
            fontSize: "0.85rem",
            color: "rgba(230,230,230,0.5)",
            marginBottom: 20,
          }}>
            Preencha os campos abaixo para criar sua conta.
          </p>

          {/* Mensagens de feedback */}
          {mensagemErro && (
            <div style={{
              marginBottom: 16,
              padding: "12px",
              borderRadius: "8px",
              background: "rgba(255, 77, 77, 0.15)",
              border: "1px solid #FF4D4D",
              color: "#FF4D4D",
              fontSize: "0.85rem"
            }}>
              {mensagemErro}
            </div>
          )}

          {mensagemSucesso && (
            <div style={{
              marginBottom: 16,
              padding: "12px",
              borderRadius: "8px",
              background: "rgba(77, 255, 136, 0.15)",
              border: "1px solid #4DFF88",
              color: "#4DFF88",
              fontSize: "0.85rem"
            }}>
              {mensagemSucesso}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Nome de usuário</label>
            <input
              type="text"
              placeholder="Digite seu nome de usuário"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={inputBase}
              {...focusHandlers}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputBase}
              {...focusHandlers}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={inputBase}
              {...focusHandlers}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Confirmar senha</label>
            <input
              type="password"
              placeholder="Repita sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              style={inputBase}
              {...focusHandlers}
            />
          </div>

          <button
            ref={btnRef}
            type="submit"
            disabled={carregando}
            onClick={handleRipple}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
              transition: "background 0.2s, box-shadow 0.2s, border 0.2s",
              boxShadow: "0 4px 20px rgba(230,230,230,0.15)",
              opacity: carregando ? 0.7 : 1,
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              if (!carregando) {
                e.currentTarget.style.background = "#DCDCDC";
                e.currentTarget.style.border = "1.5px solid #E87722";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(232,119,34,0.45), 0 0 24px rgba(232,119,34,0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (!carregando) {
                e.currentTarget.style.background = "#E6E6E6";
                e.currentTarget.style.border = "1.5px solid transparent";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(230,230,230,0.15)";
              }
            }}
          >
            {carregando ? "Criando conta..." : "Criar conta"}
          </button>

          <div style={{ textAlign: "center", marginTop: 24, fontSize: "0.85rem", color: "rgba(230,230,230,0.4)" }}>
            Já tem uma conta?{" "}
            <Link href="/Pages/Login" style={{ color: "#E6E6E6", textDecoration: "none", fontWeight: 500 }}>
              Entrar
            </Link>
          </div>
        </form>

        <div style={{
          position: "absolute",
          bottom: 26,
          right: 40,
          fontSize: "0.7rem",
          color: "rgba(230,230,230,0.25)",
          textAlign: "right",
        }}>
          © 2026
        </div>
      </div>
    </>
  );
}