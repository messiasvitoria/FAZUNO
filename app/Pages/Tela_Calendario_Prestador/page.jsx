"use client";

import { useState } from "react";

import StatsCards         from "../../components/StatsCards2";
import CalendarToolbar    from "../../components/CalendarToolbar";
import CalendarGrid       from "../../components/CalendarGrid";
import AvailabilityHeader from "../../components/AvailabilityHeader";
import UpcomingServices   from "../../components/UpcomingServices";
import PendingRequests    from "../../components/PendingRequests";
import WeeklyAvailability from "../../components/WeeklyAvailability";
import QuickActions       from "../../components/QuickActions";

export default function AgendaPage() {
  const [activeView, setActiveView] = useState("Semana");

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 p-6">  {/* ← aqui */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        {/* COLUNA ESQUERDA */}
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Minha Agenda</h1>
            <p className="text-sm text-gray-500 mt-0.5">Segunda-feira, 08 de Junho de 2026</p>
          </div>

          <StatsCards />
          <CalendarToolbar activeView={activeView} onViewChange={setActiveView} />
          <CalendarGrid />
        </div>

        {/* COLUNA DIREITA */}
        <div>
          <AvailabilityHeader />
          <UpcomingServices />
          <PendingRequests />
          <WeeklyAvailability />
          <QuickActions />
        </div>

      </div>
    </div>
  );
}