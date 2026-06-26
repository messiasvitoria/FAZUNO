import { Plus } from "lucide-react";

const days = [
  { label: "Seg", num: "08", today: true },
  { label: "Ter", num: "09" },
  { label: "Qua", num: "10" },
  { label: "Qui", num: "11" },
  { label: "Sex", num: "12" },
  { label: "Sáb", num: "13" },
  { label: "Dom", num: "14" },
];

const hours = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];

// row = hour index (0=08:00), col = day index (0=Seg)
const appointments = [
  {
    col: 0, row: 2, span: 1,
    title: "Instalação de Chuveiro", name: "Brenda Barbosa",
    price: "R$ 120", status: "Confirmado",
    color: "bg-green-100 border-green-400",
    badge: "bg-green-100 text-green-700",
  },
  {
    col: 0, row: 6, span: 1.5,
    title: "Limpeza Residencial", name: "Carlos Oliveira",
    price: "R$ 160", status: "Em andamento",
    color: "bg-orange-100 border-orange-400",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    col: 0, row: 8, span: 1,
    title: "Formatação Notebook", name: "Ana Souza",
    price: "R$ 150", status: "Novo",
    color: "bg-blue-100 border-blue-400",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    col: 2, row: 1, span: 1.5,
    title: "Manutenção Elétrica", name: "Marcos Lima",
    price: "R$ 200", status: "Novo",
    color: "bg-blue-100 border-blue-400",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    col: 4, row: 3, span: 1.5,
    title: "Troca de Torneira", name: "Juliane Costa",
    price: "R$ 130", status: "Confirmado",
    color: "bg-green-100 border-green-400",
    badge: "bg-green-100 text-green-700",
  },
  {
    col: 5, row: 2, span: 1,
    title: "Instalação de Varal", name: "Fernanda Rocha",
    price: "R$ 110", status: "Cancelado",
    color: "bg-red-100 border-red-400",
    badge: "bg-red-100 text-red-700",
  },
  {
    col: 5, row: 7, span: 1,
    title: "Pintura - 1 Quarto", name: "Roberto Alves",
    price: "R$ 250", status: "Agendado",
    color: "bg-gray-100 border-gray-400",
    badge: "bg-gray-100 text-gray-600",
  },
];

const CELL_H = 56; // px per hour row

export default function CalendarGrid() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-4">
      {/* Day headers */}
      <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-gray-100">
        <div className="border-r border-gray-100" />
        {days.map((d) => (
          <div key={d.num} className="flex flex-col items-center py-2 border-r border-gray-100 last:border-r-0">
            <span className="text-xs text-gray-500">{d.label}</span>
            <span className={`text-sm font-bold mt-0.5 w-7 h-7 flex items-center justify-center rounded-full ${
              d.today ? "bg-blue-500 text-white" : "text-gray-700"
            }`}>{d.num}</span>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="relative">
        {hours.map((h, hi) => (
          <div key={h} className="grid grid-cols-[56px_repeat(7,1fr)]" style={{ height: `${CELL_H}px` }}>
            <div className="border-r border-gray-100 text-xs text-gray-400 px-2 pt-1">{h}</div>
            {days.map((_, di) => (
              <div key={di} className="border-r border-b border-gray-50 last:border-r-0 relative" />
            ))}
          </div>
        ))}

        {/* Appointment overlays */}
        {appointments.map((apt, i) => {
          const top = apt.row * CELL_H + 2;
          const height = apt.span * CELL_H - 6;
          const left = `calc(56px + ${apt.col} * (100% - 56px) / 7 + 2px)`;
          const width = `calc((100% - 56px) / 7 - 4px)`;
          return (
            <div
              key={i}
              className={`absolute rounded-lg border-l-4 px-2 py-1.5 cursor-pointer hover:opacity-90 transition-opacity ${apt.color}`}
              style={{ top, height, left, width }}
            >
              <p className="text-xs font-semibold text-gray-800 leading-tight truncate">{apt.title}</p>
              <p className="text-xs text-gray-500 truncate">{apt.name}</p>
              <p className="text-xs font-medium text-gray-700">{apt.price}</p>
              <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-full mt-0.5 ${apt.badge}`}>
                {apt.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100">
        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap text-xs text-gray-500">
          {[
            { color: "bg-blue-500", label: "Novo" },
            { color: "bg-green-500", label: "Confirmado" },
            { color: "bg-orange-400", label: "Em andamento" },
            { color: "bg-gray-400", label: "Concluído" },
            { color: "bg-red-500", label: "Cancelado" },
            { color: "bg-gray-300 border border-dashed border-gray-400", label: "Bloqueado" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1">
              <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
              {l.label}
            </span>
          ))}
        </div>
        <button className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">
          <Plus size={14} />
          Bloquear horário
        </button>
      </div>
    </div>
  );
}
