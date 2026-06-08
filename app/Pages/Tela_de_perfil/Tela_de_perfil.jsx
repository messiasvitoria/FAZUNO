"use client"; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/Tela_de_perfil.css';
import { useLogin } from '../../Script/Tela_de_perfil';
import { FaUser } from "react-icons/fa";
import { FaHammer} from "react-icons/fa";

function EyeOpenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#E6E6E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#E6E6E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function Login() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    togglePassword,
    handleRipple,
    handleSubmit,
    btnRef,
  } = useLogin();

  const router = useRouter();
  const [tipoConta, setTipoConta] = useState('cliente');

 function handleContinuar() {
  if (tipoConta === 'cliente') {
    router.push('/Pages/Tela_inicial_cliente');
  } else if (tipoConta === 'prestador') {
    router.push('/Pages/Tela_Inicial_prestador');
  }
}

return (
  <div className="page">

    {/* Círculos decorativos no fundo */}
    <div className="bg-dot bd1" />
    <div className="bg-dot bd2" />
    <div className="bg-dot bd3" />
    <div className="bg-dot bd4" />

    {/* FORMULÁRIO */}
    <div className="panel-right">
      <form className="login-form" onSubmit={handleSubmit}>

        <img
          className="logo"
          src="/Logo_branca.png"
          alt="FazUno"
        />

        <h1 className="login-title">
          Como deseja utilizar o FazUno?
        </h1>

        <p className="login-subtitle">
          Escolha o tipo de conta que melhor descreve você.
        </p>

        <div
        className={`option-card ${tipoConta === 'cliente' ? 'selected' : ''}`}
        onClick={() => setTipoConta('cliente')}
      >
       <div className="option-icon">
        <FaUser/>
        </div>

        <div className="option-content">
          <h2>Cliente</h2>
          <p>Encontre profissionais confiáveis para suas necessidades.</p>
        </div>

        <div className="radio-circle">
          {tipoConta === 'cliente' && '✓'}
        </div>
      </div>

      <div
        className={`option-card ${tipoConta === 'prestador' ? 'selected' : ''}`}
        onClick={() => setTipoConta('prestador')}
      >
        <div className="option-icon">
          <FaHammer />
          </div>

        <div className="option-content">
          <h2>Prestador</h2>
          <p>Ofereça seus serviços e encontre novos clientes.</p>
        </div>

        <div className="radio-circle">
          {tipoConta === 'prestador' && '✓'}
        </div>
      </div>

        <button type="button" className="btn-submit" onClick={handleContinuar}>
          Continuar
        </button>

      </form>
    </div>

    <div className="page-footnote">
      Algum problema? Fale conosco em<br />
      <a href="mailto:suporte@fazuno.com">
        suporte@fazuno.com
      </a>
    </div>

  </div>
);
}