import { Ban, ClipboardList, MessageCircle, BarChart2 } from "lucide-react";

const actions = [
  { icon: <Ban size={16} className="text-blue-500" />, label: "Bloquear horário" },
  { icon: <ClipboardList size={16} className="text-blue-500" />, label: "Ver solicitações" },
  { icon: <MessageCircle size={16} className="text-blue-500" />, label: "Abrir chat" },
  { icon: <BarChart2 size={16} className="text-blue-500" />, label: "Relatórios" },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Ações rápidas</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((a, i) => (
          <button
            key={i}
            className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-colors font-medium"
          >
            {a.icon}
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}