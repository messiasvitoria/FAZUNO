"use client";

import { useState } from "react";
import PrestadorLayout from "../../components/PrestadorLayout";
import AvailabilityHeader from "../../components/AvailabilityHeader";
import CalendarGrid from "../../components/CalendarGrid";
import CalendarToolbar from "../../components/CalendarToolbar";
import PendingRequests from "../../components/PendingRequests";
import StatsCards from "../../components/StatsCards2";
import WeeklyAvailability from "../../components/WeeklyAvailability";

function UpcomingServicesPanel() {
  const services = [
    { time: "10:00", title: "Instalação de chuveiro", client: "Brenda Barbosa", status: "Confirmado", color: "#16A34A" },
    { time: "14:00", title: "Limpeza residencial", client: "Carlos Oliveira", status: "Em andamento", color: "#F1670F" },
    { time: "16:00", title: "Formatação notebook", client: "Ana Souza", status: "Novo", color: "#2563EB" },
  ];

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Próximos serviços hoje</h3>
        <button className="text-xs font-semibold text-[#0A0B2D]">Ver todos</button>
      </div>
      <div className="space-y-3">
        {services.map((service) => (
          <div key={`${service.time}-${service.title}`} className="flex items-start gap-3">
            <strong className="w-11 text-sm text-[#0A0B2D]">{service.time}</strong>
            <span className="mt-1.5 h-2 w-2 rounded-full" style={{ background: service.color }} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">{service.title}</p>
              <p className="text-xs text-gray-500">{service.client}</p>
              <span className="mt-1 inline-flex rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-[#F1670F]">
                {service.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickActionsPanel() {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-900">Ações rápidas</h3>
      <div className="grid grid-cols-2 gap-2">
        {["Bloquear horário", "Ver solicitações", "Abrir chat", "Relatórios"].map((action) => (
          <button
            key={action}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-[#0A0B2D] transition hover:border-[#F1670F] hover:text-[#F1670F]"
          >
            {action}
          </button>
        ))}
      </div>
    </section>
  );
}

export default function TelaCalendarioPrestador() {
  const [activeView, setActiveView] = useState("Semana");

  return (
    <PrestadorLayout title="Minha Agenda" subtitle="Organize seus atendimentos e disponibilidade.">
      <div className="min-h-screen bg-[#F4F6FA] px-8 py-7 text-[#0A0B2D]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <section className="min-w-0">
            <div className="mb-5">
              <h1 className="text-4xl font-bold tracking-tight text-[#0A0B2D]">Minha Agenda</h1>
              <p className="mt-1 text-sm text-gray-500">Segunda-feira, 08 de Junho de 2026</p>
            </div>

            <StatsCards />

            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <CalendarToolbar activeView={activeView} onViewChange={setActiveView} />
              <CalendarGrid />
            </section>
          </section>

          <aside className="space-y-4">
            <AvailabilityHeader />
            <UpcomingServicesPanel />
            <PendingRequests />
            <WeeklyAvailability />
            <QuickActionsPanel />
          </aside>
        </div>
      </div>
    </PrestadorLayout>
  );
}
