// CadastroServicoPrestador_Stepper
const etapas = [
  { numero: 1, label: "Informações Básicas" },
  { numero: 2, label: "Detalhes do Serviço" },
  { numero: 3, label: "Preço e Atendimento" },
  { numero: 4, label: "Finalizar" },
];

export default function CadastroServicoPrestador_Stepper({ etapaAtual = 1 }) {
  return (
    <div className="flex items-start w-full mb-8">
      {etapas.map((etapa, index) => {
        const ativo = etapa.numero === etapaAtual;
        const concluido = etapa.numero < etapaAtual;
        const isLast = index === etapas.length - 1;

        return (
          <div key={etapa.numero} className="flex items-start flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10 relative
                  ${ativo || concluido ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-400 border border-gray-200"}`}
              >
                {concluido ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : etapa.numero}
              </div>
              <span className={`text-xs mt-1.5 text-center leading-tight ${ativo ? "text-blue-900 font-medium" : "text-gray-400"}`}>
                {etapa.label}
              </span>
            </div>
            {!isLast && <div className="flex-1 h-px bg-gray-200 mt-4 mx-1" />}
          </div>
        );
      })}
    </div>
  );
}