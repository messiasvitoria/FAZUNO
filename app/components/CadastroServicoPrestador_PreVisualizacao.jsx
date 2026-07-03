// CadastroServicoPrestador_PreVisualizacao
// Card lateral de pré-visualização do serviço do prestador

export default function CadastroServicoPrestador_PreVisualizacao({ dados = {} }) {
  const preco = parseFloat(dados.preco) || 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-4">
      <h3 className="text-sm font-medium text-blue-900 mb-1">Pré-visualização do serviço</h3>
      <p className="text-xs text-gray-400 mb-4">Veja como seu serviço será exibido para os clientes.</p>

      {/* Imagem placeholder */}
      <div className="bg-gray-100 rounded-lg h-28 flex items-center justify-center mb-3">
        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <p className="text-sm font-medium text-gray-800 mb-1">
        {dados.nome || "Nome do serviço"}
      </p>

      <span className="inline-block bg-blue-50 text-blue-800 text-xs px-2.5 py-0.5 rounded-md mb-2">
        {dados.categoria || "Categoria"}
      </span>

      <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
        <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        4,9 <span className="text-gray-400">(128 avaliações)</span>
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Atendimento a combinar
      </div>

      {dados.descricao && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{dados.descricao}</p>
      )}
      {!dados.descricao && (
        <p className="text-xs text-gray-400 mb-3">Descrição do serviço aparecerá aqui em até duas linhas de texto...</p>
      )}

      <div className="border-t border-gray-100 pt-3">
        <p className="text-xs text-gray-400">A partir de</p>
        <p className="text-lg font-medium text-gray-800">R$ {preco.toFixed(2).replace(".", ",")}</p>
      </div>
    </div>
  );
}
