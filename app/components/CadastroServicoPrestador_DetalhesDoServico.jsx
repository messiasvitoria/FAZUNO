// CadastroServicoPrestador_DetalhesDoServico
// Seção 2: fotos e detalhes do serviço do prestador

export default function CadastroServicoPrestador_DetalhesDoServico({ dados = {}, onChange = () => {} }) {
  const handle = (campo) => (e) => onChange({ ...dados, [campo]: e.target.value });

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-base font-medium text-blue-900 mb-5">2. Detalhes do Serviço</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Upload de fotos */}
        <div>
          <label className="text-sm text-gray-500 flex items-center gap-1 mb-2">
            Fotos do serviço
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
            </svg>
          </label>
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors">
            <svg className="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm font-medium text-blue-700">Clique para enviar ou arraste as imagens</p>
            <p className="text-xs text-gray-400 mt-1">Formatos: JPG, PNG. Tamanho máximo: 5MB cada</p>
          </div>
          <p className="text-xs text-gray-400 mt-2">Até 5 imagens</p>
        </div>

        {/* Inclusões */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
              O que está incluso
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              </svg>
            </label>
            <textarea
              placeholder="Liste o que está incluso no serviço..."
              value={dados.incluso || ""}
              onChange={handle("incluso")}
              maxLength={300}
              rows={3}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            <p className="text-xs text-gray-400 text-right">{(dados.incluso || "").length}/300</p>
          </div>

          <div>
            <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
              O que não está incluso
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              </svg>
            </label>
            <textarea
              placeholder="Liste o que não está incluso no serviço..."
              value={dados.naoIncluso || ""}
              onChange={handle("naoIncluso")}
              maxLength={300}
              rows={3}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            <p className="text-xs text-gray-400 text-right">{(dados.naoIncluso || "").length}/300</p>
          </div>
        </div>
      </div>
    </section>
  );
}
