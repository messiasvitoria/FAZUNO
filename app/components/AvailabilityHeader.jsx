import { ChevronDown } from "lucide-react";

export default function AvailabilityHeader() {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 mb-4">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-sm font-medium text-gray-700">Disponível para receber serviços</span>
      </div>
      <button className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors">
        Alterar disponibilidade
        <ChevronDown size={14} />
      </button>
    </div>
  );
}
