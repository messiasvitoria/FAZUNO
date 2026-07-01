// CadastroServicoPrestador_DicasServico

const dicas = [
  "Use fotos reais do seu trabalho",
  "Descreva bem os benefícios",
  "Seja claro sobre o que está incluso",
  "Defina um preço competitivo",
  "Mantenha suas informações atualizadas",
];

export default function CadastroServicoPrestador_DicasServico() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
      <h3 className="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-3">
        Dicas para um bom serviço
      </h3>
      <ul className="flex flex-col gap-2.5">
        {dicas.map((dica) => (
          <li key={dica} className="flex items-start gap-2 text-xs text-blue-800 leading-relaxed">
            <svg
              className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {dica}
          </li>
        ))}
      </ul>
    </div>
  );
}