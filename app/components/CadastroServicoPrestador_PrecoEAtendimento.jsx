// CadastroServicoPrestador_PrecoEAtendimento
// Seção 3: preço, forma de cobrança e área de atendimento do prestador

export default function CadastroServicoPrestador_PrecoEAtendimento({ dados = {}, onChange = () => {} }) {
  const handle = (campo) => (valor) => onChange({ ...dados, [campo]: valor });

  const toggleForma = (forma) => {
    const atual = dados.formasAtendimento || [];
    const nova = atual.includes(forma) ? atual.filter((f) => f !== forma) : [...atual, forma];
    onChange({ ...dados, formasAtendimento: nova });
  };

  const formas = dados.formasAtendimento || [];

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-base font-medium text-blue-900 mb-5">3. Preço e Atendimento</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Coluna esquerda */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-sm text-gray-500 block mb-2">
              Tipo de cobrança <span className="text-blue-700">*</span>
            </label>
            <div className="flex">
              <button
                onClick={() => handle("tipoCobranca")("fixo")}
                className={`flex-1 text-sm py-2 px-3 border rounded-l-lg transition-colors
                  ${(dados.tipoCobranca || "fixo") === "fixo"
                    ? "bg-blue-900 text-white border-blue-900"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}
              >
                Por serviço / valor fixo
              </button>
              <button
                onClick={() => handle("tipoCobranca")("hora")}
                className={`flex-1 text-sm py-2 px-3 border-t border-b border-r rounded-r-lg transition-colors
                  ${dados.tipoCobranca === "hora"
                    ? "bg-blue-900 text-white border-blue-900"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}
              >
                Por hora
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-2">
              Preço a partir de <span className="text-blue-700">*</span>
            </label>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <span className="px-3 py-2 bg-gray-50 text-sm text-gray-500 border-r border-gray-200">R$</span>
              <input
                type="number"
                placeholder="0,00"
                value={dados.preco || ""}
                onChange={(e) => handle("preco")(e.target.value)}
                className="flex-1 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 flex items-center gap-1 mb-2">
              Tempo médio de execução
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              </svg>
            </label>
            <select
              value={dados.tempoExecucao || ""}
              onChange={(e) => handle("tempoExecucao")(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
            >
              <option value="">Selecione o tempo médio</option>
              <option value="30min">30 minutos</option>
              <option value="1h">1 hora</option>
              <option value="2h">2 horas</option>
              <option value="meio-dia">Meio período</option>
              <option value="dia-inteiro">Dia inteiro</option>
            </select>
          </div>
        </div>

        {/* Coluna direita */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-sm text-gray-500 block mb-2">
              Formas de atendimento <span className="text-blue-700">*</span>
            </label>
            <div className="flex flex-col gap-2">
              {["Presencial", "Online / Remoto", "Ambos"].map((forma) => (
                <label key={forma} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formas.includes(forma)}
                    onChange={() => toggleForma(forma)}
                    className="w-4 h-4 rounded accent-blue-900"
                  />
                  {forma}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-2">
              Área de atendimento <span className="text-blue-700">*</span>
            </label>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
            >
              <option value="">Selecione as cidades que atende</option>
              <option value="teresina">Teresina</option>
              <option value="parnaiba">Parnaíba</option>
              <option value="picos">Picos</option>
            </select>
            <button className="flex items-center gap-1 text-sm text-blue-700 mt-2 hover:text-blue-900 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar cidade
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
