import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const views = ["Dia", "Semana", "Mês"];
const categories = ["Todas", "Elétrica", "Limpeza", "Pintura", "Informática"];
const statuses = ["Todos", "Novo", "Confirmado", "Em andamento", "Cancelado"];

export default function CalendarToolbar({ activeView, onViewChange }) {
  const [category, setCategory] = useState("Todas");
  const [status, setStatus] = useState("Todos");

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      {/* View Toggle */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
        {views.map((v) => (
          <button
            key={v}
            onClick={() => onViewChange(v)}
            className={`px-4 py-1.5 font-medium transition-colors ${
              activeView === v
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Categoria */}
      <div className="flex flex-col text-xs text-gray-500">
        <span className="mb-0.5 font-medium">Categoria</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Status */}
      <div className="flex flex-col text-xs text-gray-500">
        <span className="mb-0.5 font-medium">Status</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Date Range */}
      <div className="flex flex-col text-xs text-gray-500">
        <span className="mb-0.5 font-medium">&nbsp;</span>
        <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-sm text-gray-700">
          <CalendarDays size={14} className="text-gray-400" />
          <span>08 a 14 Jun 2026</span>
        </div>
      </div>

      {/* Hoje + Arrows */}
      <div className="flex items-end gap-1 pb-0">
        <button className="mt-4 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
          Hoje
        </button>
        <button className="mt-4 p-1.5 border border-gray-200 rounded-lg bg-white text-gray-500 hover:bg-gray-50 transition-colors">
          <ChevronLeft size={16} />
        </button>
        <button className="mt-4 p-1.5 border border-gray-200 rounded-lg bg-white text-gray-500 hover:bg-gray-50 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
