// CadastroServicoPrestador_AcoesFormulario

export default function CadastroServicoPrestador_AcoesFormulario({
  etapaAtual = 1,
  totalEtapas = 4,
  onCancelar = () => {},
  onAnterior = () => {},
  onSalvarRascunho = () => {},
  onProximo = () => {},
  onPublicar = () => {},
}) {
  const isUltimaEtapa = etapaAtual === totalEtapas;
  const isPrimeiraEtapa = etapaAtual === 1;

  return (
    <div className="flex items-center justify-between mt-2">
      {/* Esquerda */}
      {isPrimeiraEtapa ? (
        <button
          onClick={onCancelar}
          className="text-sm text-gray-500 border border-gray-200 rounded-lg px-5 py-2.5 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      ) : (
        <button
          onClick={onAnterior}
          className="flex items-center gap-2 text-sm text-gray-500 border border-gray-200 rounded-lg px-5 py-2.5 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </button>
      )}

      {/* Direita */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSalvarRascunho}
          className="text-sm text-blue-700 border border-blue-300 rounded-lg px-5 py-2.5 hover:bg-blue-50 transition-colors"
        >
          Salvar rascunho
        </button>

        {isUltimaEtapa ? (
          <button
            onClick={onPublicar}
            className="flex items-center gap-2 text-sm text-white bg-green-600 rounded-lg px-5 py-2.5 hover:bg-green-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Cadastrar
          </button>
        ) : (
          <button
            onClick={onProximo}
            className="flex items-center gap-2 text-sm text-white bg-blue-900 rounded-lg px-5 py-2.5 hover:bg-blue-800 transition-colors"
          >
            Próximo passo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}