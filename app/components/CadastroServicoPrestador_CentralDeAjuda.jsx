// CadastroServicoPrestador_CentralDeAjuda
// Card lateral de central de ajuda do cadastro de serviço do prestador

export default function CadastroServicoPrestador_CentralDeAjuda() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4">
      <h3 className="text-sm font-medium text-gray-800 mb-1">Precisa de ajuda?</h3>
      <p className="text-xs text-gray-400 mb-3">Dúvidas sobre como cadastrar seu serviço?</p>
      <button className="flex items-center gap-2 text-xs text-blue-700 border border-blue-300 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Ver guia completo
      </button>
    </div>
  );
}
