    "use client";
    import { useState } from "react";
    import { FaBell, FaUser, FaChevronDown } from "react-icons/fa";
    import StatCards from "../../components/StatCards";
    import SolicitacoesRecebidas from "../../components/SolicitacoesRecebidas";
    import OportunidadesParaVoce from "../../components/OportunidadesParaVoce";
    import AgendaDeHoje from "../../components/AgendaDeHoje";
    import SeusServicos from "../../components/SeusServicos";
    import NotificacoesPrestador from "../../components/NotificacoesPrestador";

    const navLinks = ["Serviços", "Agendamentos", "Histórico", "Suporte"];

    export default function Tela_inicio_prestador() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hasNotification, setHasNotification] = useState(true);
    const [notifOpen, setNotifOpen] = useState(false);


    return (
        <div className="min-h-screen bg-white">

        {/* ── NAVBAR ── */}
        <header className="bg-white shadow-sm border-b border-gray-200">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

            <div className="hidden lg:flex flex-col">
                <span className="text-lg font-bold text-gray-900">Olá, João! 👋</span>
                <span className="text-sm text-gray-500">Aqui está o resumo do seu dia!</span>
            </div>

            {/* Ações direita */}
            <div className="flex items-center gap-4">

            <div style={{ position: "relative" }}>
                <button
                    onClick={() => setNotifOpen(!notifOpen)}
                    className="relative p-2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                    <FaBell className="text-xl" />
                    {hasNotification && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                    )}
                </button>
                {notifOpen && <NotificacoesPrestador onClose={() => setNotifOpen(false)} />}
            </div>

                {/* Perfil */}
                <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-500 ring-2 ring-indigo-400 flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                </div>
                <FaChevronDown className="text-gray-500 text-sm" />
                </div>

                {/* Botão mobile */}
                <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-gray-400 hover:text-gray-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </button>
            </div>
            </nav>
        </header>

        {/* ── MENU MOBILE ── */}
        {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 w-72 bg-gray-900 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                <span className="text-white font-bold text-lg">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                    <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                </div>

                <div className="flex items-center gap-3 mb-6 p-3 bg-gray-800 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-indigo-500 ring-2 ring-indigo-400 flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                </div>
                <div>
                    <p className="text-white font-semibold text-sm">João</p>
                    <p className="text-gray-400 text-xs">Prestador</p>
                </div>
                </div>

                <div className="space-y-1">
                {navLinks.map((link) => (
                    <a key={link} href="#" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
                    {link}
                    </a>
                ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                <a href="#" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-red-400 hover:bg-white/5">Sair</a>
                </div>
            </div>
            </div>
        )}

        {/* ── CONTEÚDO ── */}
        <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8 ">
            <StatCards />
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
            <SolicitacoesRecebidas />
            <OportunidadesParaVoce />
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
            <AgendaDeHoje />
            <SeusServicos />
            </div>
        </main>

        </div>
    );
    }