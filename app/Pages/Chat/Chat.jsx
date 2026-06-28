"use client";

import { useSearchParams } from "next/navigation";
import ChatCliente from "../Chat_cliente/chat_cliente";
import ChatPrestador from "../Chat_prestador/chat_prestador";

export default function Chat() {
  const searchParams = useSearchParams();
  const perfil = searchParams.get("perfil");
  const tipo = searchParams.get("tipo");

  const isPrestador =
    perfil === "prestador" ||
    tipo === "cliente" ||
    searchParams.get("origem") === "solicitacao-prestador";

  return isPrestador ? <ChatPrestador /> : <ChatCliente />;
}
