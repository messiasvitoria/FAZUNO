import { ChevronRight } from "lucide-react";

const services = [
  {
    time: "10:00",
    title: "Instalação de Chuveiro",
    client: "Brenda Barbosa",
    status: "Confirmado",
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-700",
  },
  {
    time: "14:00",
    title: "Limpeza Residencial",
    client: "Carlos Oliveira",
    status: "Em andamento",
    dot: "bg-orange-400",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    time: "16:00",
    title: "Formatação Notebook",
    client: "Ana Souza",
    status: "Novo",
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },
];

export default function UpcomingServices() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Próximos serviços hoje</h3>
        <button className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">
          Ver todos
        </button>
      </div>
      <div className="space-y-1">
        {services.map((s, i) => (
          <button
            key={i}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <span className="text-sm font-semibold text-gray-700 w-10 shrink-0">{s.time}</span>
            <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{s.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">{s.client}</span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${s.badge}`}>
                  {s.status}
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
