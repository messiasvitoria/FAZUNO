import { useState } from "react";
import { Pencil } from "lucide-react";

const initialDays = [
  { day: "Segunda",  hours: "08:00 às 18:00", active: true, warn: false },
  { day: "Terça",    hours: "08:00 às 18:00", active: true, warn: false },
  { day: "Quarta",   hours: "08:00 às 18:00", active: true, warn: false },
  { day: "Quinta",   hours: "08:00 às 18:00", active: true, warn: false },
  { day: "Sexta",    hours: "08:00 às 18:00", active: true, warn: false },
  { day: "Sábado",   hours: "08:00 às 12:00", active: true, warn: true },
  { day: "Domingo",  hours: "Indisponível",    active: false, warn: false },
];

export default function WeeklyAvailability() {
  const [days, setDays] = useState(initialDays);

  const toggle = (i) => {
    setDays((prev) =>
      prev.map((d, idx) => (idx === i ? { ...d, active: !d.active } : d))
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Disponibilidade semanal</h3>
        <button className="text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1">
          <Pencil size={12} />
          Editar
        </button>
      </div>
      <div className="space-y-2">
        {days.map((d, i) => (
          <div key={d.day} className="flex items-center justify-between">
            <span className="text-sm text-gray-700 w-20">{d.day}</span>
            <span className={`text-xs font-medium flex-1 text-center ${
              !d.active ? "text-red-400" : d.warn ? "text-orange-400" : "text-gray-500"
            }`}>
              {d.hours}
            </span>
            <button
              onClick={() => toggle(i)}
              className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
                d.active ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                d.active ? "translate-x-4" : "translate-x-0.5"
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}