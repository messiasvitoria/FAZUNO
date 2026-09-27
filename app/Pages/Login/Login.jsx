"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function EyeOpenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E6E6E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E6E6E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [mensagemErro, setMensagemErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setMensagemErro("");

    if (!username || !password) {
      setMensagemErro("Preencha o usuário e a senha.");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/Pages/Tela_de_perfil");
      } else {
        setMensagemErro(data.erro || "Usuário ou senha incorretos.");
      }
    } catch (err) {
      setMensagemErro("Erro ao se conectar com o servidor Django.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .eye-btn { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; padding:4px; display:flex; opacity:0.4; transition:opacity 0.2s; }
        .eye-btn:hover { opacity: 0.8; }
      `}</style>

      <div className="h-screen w-screen overflow-hidden bg-[#0A0B2D] font-sans text-[#E6E6E6]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="w-screen h-screen flex items-center justify-start relative overflow-hidden">
          {/* Círculos decorativos */}
          <div className="absolute rounded-full bg-[rgba(230,230,230,0.06)] w-[340px] h-[340px] -top-20 right-[220px]" />
          <div className="absolute rounded-full bg-[rgba(230,230,230,0.06)] w-[180px] h-[180px] top-[60px] right-[60px]" />
          <div className="absolute rounded-full bg-[rgba(230,230,230,0.06)] w-[90px] h-[90px] bottom-[100px] right-[160px]" />
          <div className="absolute rounded-full bg-[rgba(230,230,230,0.06)] w-[55px] h-[55px] bottom-[200px] right-[80px]" />

          {/* Blob lado esquerdo */}
          <div
            className="absolute left-0 top-0 w-[52%] h-full z-[1]"
            style={{
              background: "#FFFFFF",
              borderRadius: "0% 58% 52% 0% / 0% 46% 54% 0%",
            }}
          />

          {/* Conteúdo esquerdo */}
          <div className="absolute left-0 top-0 w-[52%] h-full z-[2] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[560px]">
              <video
                className="w-[70%] h-auto max-h-[100vh] object-contain"
                src="/animacao_FazUno.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <img
                className="w-full max-w-[410px] h-auto object-contain block"
                src="/imagem_nome_fazuno.jpeg"
                alt="Brand name"
              />
            </div>
          </div>

          {/* Painel direito */}
          <div className="absolute left-[52%] top-0 w-[48%] h-full z-[3] flex items-center justify-center px-10">
            <form onSubmit={handleLogin} className="w-full max-w-[340px]">
              <h1 className="text-[2.2rem] font-bold text-[#E6E6E6] tracking-[-1px] mb-8 leading-none"
              style={{ fontFamily: "'Sora', sans-serif" }}>
                Login
              </h1>

              {/* Alerta de erro */}
              {mensagemErro && (
                <div className="mb-4 p-3 rounded-[8px] bg-[rgba(255,77,77,0.15)] border border-[#FF4D4D] text-[#FF4D4D] text-[0.85rem]">
                  {mensagemErro}
                </div>
              )}

              {/* Campo usuário */}
              <div className="mb-4">
                <label className="block text-[0.78rem] font-medium text-[#DCDCDC] mb-[7px]">
                  Usuário
                </label>
                <input
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-neon w-full px-4 py-[13px] bg-[rgba(230,230,230,0.08)] border rounded-[10px] text-[#E6E6E6] outline-none placeholder:text-[rgba(230,230,230,0.3)] transition-all duration-300"
                  style={{ borderColor: "rgba(230,230,230,0.15)", boxSizing: "border-box" }}
                />
              </div>

              {/* Campo senha */}
              <div className="mb-0 mt-4">
                <label className="block text-[0.78rem] font-medium text-[#DCDCDC] mb-[7px]">
                  Senha
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-neon w-full bg-[rgba(230,230,230,0.08)] border rounded-[10px] text-[#E6E6E6] outline-none placeholder:text-[rgba(230,230,230,0.3)] transition-all duration-300"
                    style={{
                      borderColor: "rgba(230,230,230,0.15)",
                      padding: "13px 40px 13px 16px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                  </button>
                </div>
              </div>

              {/* Link esqueceu a senha */}
              <div className="flex justify-end mt-2 mb-[26px]">
                <Link
                  href="/Pages/Recuperacao_de_senha"
                  className="text-[0.78rem] transition-colors duration-200"
                  style={{ color: "rgba(210, 204, 204, 0.96)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(210, 204, 204, 0.96)")}
                >
                  Esqueceu a senha?
                </Link>
              </div>

              {/* Botão Entrar */}
              <button
                type="submit"
                disabled={carregando}
                className="w-full py-[14px] bg-[#E6E6E6] text-[#0A0B2D] rounded-[10px] font-semibold flex items-center justify-center cursor-pointer"
                style={{
                  border: "1.5px solid transparent",
                  transition: "border 0.2s, box-shadow 0.2s, background 0.2s",
                  boxSizing: "border-box",
                  opacity: carregando ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!carregando) {
                    e.currentTarget.style.border = "1.5px solid #E87722";
                    e.currentTarget.style.boxShadow = "0 0 10px rgba(232,119,34,0.45), 0 0 24px rgba(232,119,34,0.2)";
                    e.currentTarget.style.background = "#DCDCDC";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!carregando) {
                    e.currentTarget.style.border = "1.5px solid transparent";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#E6E6E6";
                  }
                }}
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>

              {/* Cadastro */}
              <p className="text-center mt-[22px] text-[0.85rem] text-[rgba(230,230,230,0.4)]">
                Não tem conta?{" "}
                <Link
                  href="/Pages/Cadastro"
                  className="text-[#E6E6E6] font-medium border-b border-[rgba(230,230,230,0.3)]"
                  style={{ textDecoration: "none" }}
                >
                  Cadastre-se
                </Link>
              </p>
            </form>
          </div>

          {/* Rodapé */}
          <div className="absolute bottom-[26px] right-10 text-[0.7rem] text-[rgba(230,230,230,0.25)] text-right z-[5]">
            © 2026
          </div>
        </div>
      </div>
    </>
  );
}