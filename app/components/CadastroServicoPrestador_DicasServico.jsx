// CadastroServicoPrestador_DicasServico
// Card lateral de dicas para um bom serviço do prestador

const dicas = [
  "Use fotos reais do seu trabalho",
  "Descreva bem os benefícios",
  "Seja claro sobre o que está incluso",
  "Defina um preço competitivo",
  "Mantenha suas informações atualizadas",
];

export default function CadastroServicoPrestador_DicasServico() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4">
      <h3 className="text-sm font-medium text-blue-900 mb-3">Dicas para um bom serviço</h3>
      <ul className="flex flex-col gap-2">
        {dicas.map((dica) => (
          <li key={dica} className="flex items-start gap-2 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5 text-blue-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {dica}
          </li>
        ))}
      </ul>
    </div>
  );
}
