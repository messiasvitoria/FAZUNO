// CadastroServicoPrestador_AcoesFormulario
// Botões de ação do formulário de cadastro de serviço do prestador

export default function CadastroServicoPrestador_AcoesFormulario({
  onCancelar = () => {},
  onSalvarRascunho = () => {},
  onProximo = () => {},
}) {
  return (
    <div className="flex items-center justify-between mt-2">
      <button
        onClick={onCancelar}
        className="text-sm text-gray-500 border border-gray-200 rounded-lg px-5 py-2.5 hover:bg-gray-50 transition-colors"
      >
        Cancelar
      </button>

      <div className="flex items-center gap-3">
        <button
          onClick={onSalvarRascunho}
          className="text-sm text-blue-700 border border-blue-300 rounded-lg px-5 py-2.5 hover:bg-blue-50 transition-colors"
        >
          Salvar rascunho
        </button>
        <button
          onClick={onProximo}
          className="flex items-center gap-2 text-sm text-white bg-blue-900 rounded-lg px-5 py-2.5 hover:bg-blue-800 transition-colors"
        >
          Próximo passo
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
