"use client";

export default function Login() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0A0B2D] font-sans text-[#E6E6E6]">
      <div className="w-screen h-screen flex items-center justify-start relative overflow-hidden">

        {/* Círculos decorativos */}
        <div className="absolute rounded-full bg-[rgba(230,230,230,0.06)] w-[340px] h-[340px] -top-20 right-[220px]" />
        <div className="absolute rounded-full bg-[rgba(230,230,230,0.06)] w-[180px] h-[180px] top-[60px] right-[60px]" />
        <div className="absolute rounded-full bg-[rgba(230,230,230,0.06)] w-[90px] h-[90px] bottom-[100px] right-[160px]" />
        <div className="absolute rounded-full bg-[rgba(230,230,230,0.06)] w-[55px] h-[55px] bottom-[200px] right-[80px]" />

        {/* Blob lado esquerdo */}
        <div className="absolute left-0 top-0 w-[52%] h-full z-[2]">

          <div
            className="absolute top-[3%] -left-[2%] w-full h-[94%] bg-white shadow-[12px_0_60px_rgba(10,11,45,0.18)]"
            style={{
              borderRadius: "0% 58% 52% 0% / 0% 46% 54% 0%",
            }}
          />

          <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center px-[12%] py-10 text-black">

            <div className="flex-1 flex flex-col items-center justify-center gap-[30px] w-full max-w-[440px]">

              <video
                className="w-[90%] h-auto max-h-[48vh] object-contain block"
                src="/animation.webm"
                autoPlay
                loop
                muted
                playsInline
              />

              <img
                className="w-full max-w-[410px] h-auto object-contain block"
                src="/brand-name.png"
                alt="Brand name"
              />

            </div>
          </div>
        </div>

        {/* Painel direito */}
        <div className="absolute right-0 top-0 w-[52%] h-full z-[2] flex items-center justify-center pl-[10%] pr-[8%]">

          <div className="w-full max-w-[340px]">

            <h1 className="text-[2.2rem] font-bold text-[#E6E6E6] tracking-[-1px] mb-8 leading-none">
              Entrar
            </h1>

            {/* Campo email */}
            <div className="mb-[6px]">

              <label className="block text-[0.78rem] font-medium text-[#DCDCDC] mb-[7px]">
                E-mail
              </label>

              <div className="relative">
                <input
  type="email"
  placeholder="TESTE LARANJA"
  onFocus={(e) => {
    e.target.style.border = "1px solid orange";
  }}
  onBlur={(e) => {
    e.target.style.border = "1px solid rgba(230,230,230,0.15)";
  }}
  className="
    w-full px-4 py-[13px]
    bg-[rgba(230,230,230,0.08)]
    border border-[rgba(230,230,230,0.15)]
    rounded-[10px]
    text-[#E6E6E6]
    outline-none
    placeholder:text-[rgba(230,230,230,0.3)]
  "
/>
              </div>
            </div>

            {/* Campo senha */}
            <div className="mb-0">

              <label className="block text-[0.78rem] font-medium text-[#DCDCDC] mb-[7px]">
                Senha
              </label>

              <div className="relative">

                <input
                  type="password"
                  placeholder="••••••••"
                  className="
                    w-full px-4 py-[13px]
                    bg-[rgba(230,230,230,0.08)]
                    border border-[rgba(32, 32, 32, 0.15)]
                    rounded-[10px]
                    text-[#E6E6E6]
                    outline-none
                    placeholder:text-[rgba(230,230,230,0.3)]
                  "
                />

                <button
                  type="button"
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    bg-transparent border-none cursor-pointer
                    opacity-40 hover:opacity-80
                  "
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>

              </div>
            </div>

            {/* Forgot */}
            <div className="flex justify-end mt-2 mb-[26px]">
              <a
                href="#"
                className="text-[0.78rem] text-[rgba(230,230,230,0.45)] hover:text-white"
              >
                Esqueceu a senha?
              </a>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="
                w-full py-[14px]
                bg-[#E6E6E6]
                text-[#0A0B2D]
                rounded-[10px]
                font-semibold
                hover:bg-[#DCDCDC]
                transition-all
              "
            >
              Entrar
            </button>

            {/* Cadastro */}
            <p className="text-center mt-[22px] text-[0.85rem] text-[rgba(230,230,230,0.4)]">
              Não tem conta?{" "}
              <a
                href="#"
                className="text-[#E6E6E6] font-medium border-b border-[rgba(230,230,230,0.3)]"
              >
                Cadastre-se
              </a>
            </p>

          </div>
        </div>

        {/* Rodapé */}
        <div className="absolute bottom-[26px] right-10 text-[0.7rem] text-[rgba(230,230,230,0.25)] text-right z-[5]">

          <a
            href="#"
            className="text-[rgba(230,230,230,0.4)] hover:text-white"
          >
            Termos de uso
          </a>

          {" · "}

          <a
            href="#"
            className="text-[rgba(230,230,230,0.4)] hover:text-white"
          >
            Privacidade
          </a>

        </div>

      </div>
    </div>
  );
}