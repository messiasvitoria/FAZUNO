"use client";
import { useEffect } from "react";
import TopBar_Prestador from "../../components/TopBar_Prestador";
import Parte_menulateral from "../../components/Parte_menulateral";
import StatCards from "../../components/StatCards";
import SolicitacoesRecebidas from "../../components/SolicitacoesRecebidas";
import OportunidadesParaVoce from "../../components/OportunidadesParaVoce";
import AgendaDeHoje from "../../components/AgendaDeHoje";
import SeusServicos from "../../components/SeusServicos";

export default function Tela_Inicio_prestador() {
  // ── Trava o body nesta tela com layout fixo ──
  useEffect(() => {
    document.body.classList.add("layout-fixed");
    return () => document.body.classList.remove("layout-fixed");
  }, []);

  return (
    <div style={{
      display: "flex",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f9fafb",
    }}>

      {/* ── SIDEBAR ── */}
      <Parte_menulateral activeRoute="/Pages/Tela_Inicio_prestador" />

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* ── TOPBAR ── */}
        <TopBar_Prestador />

        {/* ── CONTEÚDO PRINCIPAL ── */}
        <main style={{ flex: 1, overflowY: "auto", backgroundColor: "#f9fafb" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px" }}>
            <StatCards />
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              <SolicitacoesRecebidas />
              <OportunidadesParaVoce />
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              <AgendaDeHoje />
              <SeusServicos />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}