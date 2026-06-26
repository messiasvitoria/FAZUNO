import { Calendar, BarChart2, Clock, Wallet } from "lucide-react";

const cards = [
  {
    icon: <Calendar size={22} className="text-blue-500" />,
    bg: "bg-blue-50",
    label: "Hoje",
    value: "5",
    sub: "serviços",
    link: "Ver detalhes →",
  },
  {
    icon: <BarChart2 size={22} className="text-green-500" />,
    bg: "bg-green-50",
    label: "Esta Semana",
    value: "18",
    sub: "serviços",
    link: "Ver detalhes →",
  },
  {
    icon: <Clock size={22} className="text-orange-400" />,
    bg: "bg-orange-50",
    label: "Em Andamento",
    value: "3",
    sub: "serviços",
    link: "Ver detalhes →",
  },
  {
    icon: <Wallet size={22} className="text-purple-500" />,
    bg: "bg-purple-50",
    label: "Receita Prevista",
    value: "R$ 2.450",
    sub: "Esta semana",
    link: "Ver detalhes →",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {cards.map((c, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className={`w-9 h-9 ${c.bg} rounded-lg flex items-center justify-center mb-3`}>
            {c.icon}
          </div>
          <p className="text-xs text-gray-500 font-medium mb-0.5">{c.label}</p>
          <p className="text-2xl font-bold text-gray-800 leading-tight">{c.value}</p>
          <p className="text-xs text-gray-400 mb-2">{c.sub}</p>
          <button className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">
            {c.link}
          </button>
        </div>
      ))}
    </div>
  );
}
