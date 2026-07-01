// CadastroServicoPrestador_CentralDeAjuda
// Layout horizontal — fica abaixo do formulário na coluna esquerda

export default function CadastroServicoPrestador_CentralDeAjuda() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
      {/* Texto */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 leading-tight">Precisa de ajuda?</p>
          <p className="text-xs text-gray-400 leading-tight mt-0.5">Dúvidas sobre como cadastrar seu serviço?</p>
        </div>
      </div>

      {/* Botão */}
      <button className="flex-shrink-0 flex items-center gap-2 text-xs text-blue-700 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors whitespace-nowrap">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Ver guia completo
      </button>
    </div>
  );
}