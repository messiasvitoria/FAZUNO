// CadastroServicoPrestador_InformacoesBasicas
// Seção 1: informações básicas do serviço do prestador

export default function CadastroServicoPrestador_InformacoesBasicas({ dados = {}, onChange = () => {} }) {
  const handle = (campo) => (e) => onChange({ ...dados, [campo]: e.target.value });

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-base font-medium text-blue-900 mb-5">1. Informações Básicas</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500">
            Nome do serviço <span className="text-blue-700">*</span>
          </label>
          <input
            type="text"
            placeholder="Ex.: Instalação de Ar Condicionado"
            value={dados.nome || ""}
            onChange={handle("nome")}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500">
            Categoria <span className="text-blue-700">*</span>
          </label>
          <select
            value={dados.categoria || ""}
            onChange={handle("categoria")}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
          >
            <option value="">Selecione uma categoria</option>
            <option value="manutencao">Manutenção</option>
            <option value="limpeza">Limpeza</option>
            <option value="instalacao">Instalação</option>
            <option value="reforma">Reforma</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm text-gray-500 block mb-1">Subcategoria</label>
        <select
          value={dados.subcategoria || ""}
          onChange={handle("subcategoria")}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
        >
          <option value="">Selecione uma subcategoria (opcional)</option>
          <option value="ar-condicionado">Ar Condicionado</option>
          <option value="hidraulica">Hidráulica</option>
          <option value="eletrica">Elétrica</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="text-sm text-gray-500 block mb-1">
          Descrição do serviço <span className="text-blue-700">*</span>
        </label>
        <textarea
          placeholder="Descreva seu serviço, como é realizado, benefícios e diferenciais..."
          value={dados.descricao || ""}
          onChange={handle("descricao")}
          maxLength={500}
          rows={4}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-800"
        />
        <p className="text-xs text-gray-400 text-right mt-1">{(dados.descricao || "").length}/500</p>
      </div>

      <div>
        <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
          Este serviço é ideal para
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
          </svg>
        </label>
        <select
          value={dados.idealPara || ""}
          onChange={handle("idealPara")}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
        >
          <option value="">Selecione o tipo de cliente ou necessidade (opcional)</option>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial</option>
          <option value="empresarial">Empresarial</option>
        </select>
      </div>
    </section>
  );
}
