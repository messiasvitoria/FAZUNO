"use client";

import { useEffect, useState } from "react";
import { getNotifications, subscribeToNotifications } from "../lib/notifications";

/**
 * Hook que mantém a lista de notificações de um público
 * ("cliente" ou "prestador") sempre atualizada — inclusive quando a
 * notificação é criada em outra tela/aba (ex: o cliente cancela em
 * /cancelamento-cliente e o prestador está com a Tela_inicio_prestador aberta
 * em outra aba).
 */
export function useNotifications(audience) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getNotifications(audience));
    const unsubscribe = subscribeToNotifications((all) => {
      setItems(audience ? all.filter((n) => n.audience === audience) : all);
    });
    return unsubscribe;
  }, [audience]);

  return items;
}