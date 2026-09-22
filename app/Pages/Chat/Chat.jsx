"use client";

import { useSearchParams } from "next/navigation";
import ChatCliente from "../Chat_cliente/chat_cliente";
import ChatPrestador from "../Chat_prestador/chat_prestador";
import SidebarCliente from "../../components/SideBar_cliente";
import TopbarCliente from "../../components/TopBar_cliente";
import PrestadorLayout from "../../components/PrestadorLayout";

export default function Chat({ initialPerfil, initialTipo, initialOrigem }) {
  const searchParams = useSearchParams();
  const browserParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const perfil = searchParams.get("perfil") || browserParams?.get("perfil") || initialPerfil;
  const tipo = searchParams.get("tipo") || browserParams?.get("tipo") || initialTipo;
  const origem = searchParams.get("origem") || browserParams?.get("origem") || initialOrigem;

  const isPrestador =
    perfil === "prestador" ||
    tipo === "cliente" ||
    origem === "solicitacao-prestador";

  if (isPrestador) {
    return (
      <PrestadorLayout title="Chat" subtitle="Converse com seus clientes." contentStyle={{ overflow: "hidden" }}>
        <div style={{ height: "calc(100vh - 56px)", minHeight: 0, overflow: "hidden" }}>
          <ChatPrestador />
        </div>
      </PrestadorLayout>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", minHeight: "100vh", overflow: "hidden", background: "#F5F7FB" }}>
      <div style={{ height: "100vh", minHeight: "100vh", flexShrink: 0 }}>
        <SidebarCliente />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <TopbarCliente />
        <main style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <ChatCliente />
        </main>
      </div>
    </div>
  );
}
