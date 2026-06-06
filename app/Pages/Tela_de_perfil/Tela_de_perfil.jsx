"use client";
import { useState } from 'react';
import { useLogin } from '../../Script/Tela_de_perfil';
import { FaUser, FaHammer } from "react-icons/fa";

export default function Login() {
  const { handleSubmit } = useLogin();
  const [tipoConta, setTipoConta] = useState('cliente');

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-[#0A0B2D] font-['DM_Sans',sans-serif]">

      {/* Círculos decorativos */}
      <div className="absolute rounded-full pointer-events-none bg-white/[0.06]"
          style={{ width: 340, height: 340, top: -80, right: 220 }} />
      <div className="absolute rounded-full pointer-events-none bg-white/[0.06]"
          style={{ width: 180, height: 180, top: 60, right: 60 }} />
      <div className="absolute rounded-full pointer-events-none bg-white/[0.06]"
          style={{ width: 90, height: 90, bottom: 100, right: 160 }} />
      <div className="absolute rounded-full pointer-events-none bg-white/[0.06]"
          style={{ width: 55, height: 55, bottom: 200, right: 80 }} />

      {/* Painel */}
      <div className="w-full flex items-center justify-center">
        <form
          className="w-full max-w-[500px] p-6"
          style={{ animation: 'fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both' }}
          onSubmit={handleSubmit}
        >

          {/* Logo */}
          <img
            className="block w-[230px] h-auto mx-auto mb-7"
            src="/Logo_branca.png"
            alt="FazUno"
          />

          {/* Título */}
          <h1 className="text-center font-bold leading-tight mb-2 font-['Sora',sans-serif] text-[1.4rem] text-[#E6E6E6]">
            Como deseja utilizar o FazUno?
          </h1>

          {/* Subtítulo */}
          <p className="text-center text-[0.95rem] leading-relaxed mb-7 text-[#D0D0D0]">
            Escolha o tipo de conta que melhor descreve você.
          </p>

          {/* Card Cliente */}
            <div
              onClick={() => setTipoConta('cliente')}
              className={`flex items-center gap-4 w-full p-[18px] mb-3 rounded-[20px] cursor-pointer transition-all duration-200
                ${tipoConta === 'cliente'
                  ? 'bg-[#1a1d50] outline outline-2 outline-[#E6E6E6]'
                  : 'bg-[#12143a] outline outline-2 outline-transparent hover:bg-[#1a1d50]'
                }`}
            >
            <div className={`w-14 h-14 flex items-center justify-center flex-shrink-0 rounded-full text-[1.8rem]
              ${tipoConta === 'cliente'
                ? 'bg-[#F1670F]/20 text-[#F1670F]'
                : 'bg-white/[0.08] text-white'
              }`}>
              <FaUser />
            </div>

            <div className="flex-1">
              <h2 className="text-[1.05rem] font-bold mb-1 text-[#E6E6E6]">Cliente</h2>
              <p className="text-[0.82rem] leading-snug text-[#D0D0D0]">
                Encontre profissionais confiáveis para suas necessidades.
              </p>
            </div>

            <div className={`w-[34px] h-[34px] flex items-center justify-center flex-shrink-0 rounded-full font-bold border-2 text-[#0A0B2D]
              ${tipoConta === 'cliente'
                ? 'bg-[#E6E6E6] border-[#E6E6E6]'
                : 'bg-transparent border-[#D0D0D0]'
              }`}>
              {tipoConta === 'cliente' && "✓"}
            </div>
          </div>

          {/* Card Prestador */}
          <div
            onClick={() => setTipoConta('prestador')}
            className={`flex items-center gap-4 w-full p-[18px] mb-3 rounded-[20px] cursor-pointer transition-all duration-200
              ${tipoConta === 'prestador'
                ? 'bg-[#1a1d50] outline outline-2 outline-[#E6E6E6]'
                : 'bg-[#12143a] outline outline-2 outline-transparent hover:bg-[#1a1d50]'
              }`}
          >
            <div className={`w-14 h-14 flex items-center justify-center flex-shrink-0 rounded-full text-[1.8rem]
              ${tipoConta === 'prestador'
                ? 'bg-[#F1670F]/20 text-[#F1670F]'
                : 'bg-white/[0.08] text-white'
              }`}>
              <FaHammer />
            </div>

            <div className="flex-1">
              <h2 className="text-[1.05rem] font-bold mb-1 text-[#E6E6E6]">Prestador</h2>
              <p className="text-[0.82rem] leading-snug text-[#D0D0D0]">
                Ofereça seus serviços e encontre novos clientes.
              </p>
            </div>

            <div className={`w-[34px] h-[34px] flex items-center justify-center flex-shrink-0 rounded-full font-bold border-2 text-[#0A0B2D]
              ${tipoConta === 'prestador'
                ? 'bg-[#E6E6E6] border-[#E6E6E6]'
                : 'bg-transparent border-[#D0D0D0]'
              }`}>
              {tipoConta === 'prestador' && "✓"}
            </div>
          </div>

        <button
          type="submit"
          className="w-full h-[52px] mt-[18px] ml-[16px] border-none rounded-[20px] font-['Sora',sans-serif] text-base font-bold cursor-pointer transition-all duration-200 bg-[#E6E6E6] text-[#0A0B2D] flex items-center justify-center hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_28px_rgba(230,230,230,0.2)] active:translate-y-0"
        >
          Continuar
        </button>

        </form>
      </div>

      {/* Rodapé */}
      <div className="absolute bottom-[26px] right-10 text-[0.7rem] text-right leading-relaxed z-10 text-white/25">
        Algum problema? Fale conosco em<br />
        <a href="mailto:suporte@fazuno.com" className="text-white/40 no-underline hover:text-[#E6E6E6] transition-colors duration-200">
          suporte@fazuno.com
        </a>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}