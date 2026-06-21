import { ClipboardList, Circle } from "lucide-react";

const requests = [
  { icon: <ClipboardList size={16} className="text-gray-400" />, title: "Instalação elétrica", time: "Recebida há 5 min" },
  { icon: <ClipboardList size={16} className="text-gray-400" />, title: "Pintura residencial", time: "Recebida há 12 min" },
  { icon: <Circle size={16} className="text-gray-300" />, title: "Desentupimento", time: "Recebida há 20 min" },
];

export default function PendingRequests() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-800">Solicitações pendentes</h3>
          <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            3
          </span>
        </div>
        <button className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">
          Ver todas
        </button>
      </div>
      <div className="space-y-2">
        {requests.map((r, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2.5">
              {r.icon}
              <div>
                <p className="text-sm font-medium text-gray-800">{r.title}</p>
                <p className="text-xs text-gray-400">{r.time}</p>
              </div>
            </div>
            <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
              Nova
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
