import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, User, CreditCard, Heart, Settings, LogOut, BadgeCheck } from "lucide-react";

/**
 * Menu de perfil do cliente.
 * Componente reutilizável — pode ser usado em qualquer página
 * (ex: dentro de um Header/Layout compartilhado).
 *
 * Navegação:
 * - Cada item aponta para a rota definida na prop correspondente (ex: `perfilPath`).
 *   No Pages Router, troque a tag <a> por <Link href={...}> do "next/link".
 */
export default function PerfilMenu_Cliente({
  userName = "Brenda Nogueira",
  notificationCount = 5,
  perfilPath = "/perfil",
  pagamentosPath = "/pagamentos",
  favoritosPath = "/favoritos",
  configuracoesPath = "/configuracoes",
  onSair = () => console.log("Sair clicado"),
  showBell = true,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex justify-end" ref={menuRef}>
      {/* Barra superior */}
      <div className="flex items-center gap-5 px-6 py-4">
        {showBell && (
          <button
            type="button"
            aria-label="Notificações"
            className="relative text-slate-900 hover:text-slate-600 transition-colors"
          >
            <Bell className="w-7 h-7" strokeWidth={1.8} />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[22px] h-[22px] px-1 rounded-full bg-red-500 text-white text-xs font-semibold">
                {notificationCount}
              </span>
            )}
          </button>
        )}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2"
          aria-haspopup="true"
          aria-expanded={open}
        >
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-200 border border-slate-200">
            <User className="w-6 h-6 text-slate-500" strokeWidth={1.8} />
          </span>
          <ChevronDown
            className={`w-5 h-5 text-slate-900 transition-transform ${open ? "rotate-180" : ""}`}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Painel dropdown */}
      {open && (
        <div className="absolute top-full right-6 mt-2 w-[420px] max-w-[90vw] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
          {/* Cabeçalho com avatar e nome */}
          <div className="flex items-center gap-4 px-6 py-6">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-200 border border-slate-200">
              <User className="w-8 h-8 text-slate-500" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-xl font-bold text-slate-900">{userName}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-slate-400 text-base">Cliente Verificado</span>
                <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-500 text-white" strokeWidth={0} />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Itens do menu */}
          <nav className="py-2">
            <a
              href={perfilPath}
              className="flex items-center gap-4 px-6 py-3.5 text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <User className="w-6 h-6" strokeWidth={1.8} />
              <span className="text-lg font-medium">Meu Perfil</span>
            </a>

            <a
              href={pagamentosPath}
              className="flex items-center gap-4 px-6 py-3.5 text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <CreditCard className="w-6 h-6" strokeWidth={1.8} />
              <span className="text-lg font-medium">Pagamentos e Reembolsos</span>
            </a>

            <a
              href={favoritosPath}
              className="flex items-center gap-4 px-6 py-3.5 text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <Heart className="w-6 h-6" strokeWidth={1.8} />
              <span className="text-lg font-medium">Favoritos</span>
            </a>

            <a
              href={configuracoesPath}
              className="flex items-center gap-4 px-6 py-3.5 text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <Settings className="w-6 h-6" strokeWidth={1.8} />
              <span className="text-lg font-medium">Configurações da Conta</span>
            </a>
          </nav>

          <hr className="border-slate-100" />

          {/* Sair */}
          <button
            type="button"
            onClick={onSair}
            className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 transition-colors text-left"
          >
            <LogOut className="w-6 h-6" strokeWidth={1.8} />
            <span className="text-lg font-medium">Sair</span>
          </button>
        </div>
      )}
    </div>
  );
}
