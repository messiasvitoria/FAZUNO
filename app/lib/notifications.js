const STORAGE_KEY = "fazuno_notifications";
const EVENT_NAME = "fazuno-notifications-updated";

function readAll() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(list) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  // avisa qualquer tela aberta (mesma aba) que a lista mudou
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

/**
 * audience: "cliente" | "prestador"
 * Retorna as notificações de um público específico (ou todas, se omitido),
 * mais recentes primeiro.
 */
export function getNotifications(audience) {
  const all = readAll();
  return audience ? all.filter((n) => n.audience === audience) : all;
}

export function getUnreadCount(audience) {
  return getNotifications(audience).filter((n) => !n.read).length;
}

/**
 * Cria e salva uma nova notificação. Dispara um evento para que
 * qualquer tela aberta (Tela_inicio_prestador, Topbar do cliente, etc.)
 * se atualize na hora, sem precisar recarregar a página.
 */
export function addNotification({ audience, type = "solicitacao", title, message, requestId }) {
  const all = readAll();
  const notif = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    audience, // "cliente" | "prestador"
    type, // "solicitacao" | "servico" | "mensagem" | "pagamento" | "cancelamento" ...
    title,
    message,
    requestId: requestId || null,
    read: false,
    createdAt: new Date().toISOString(),
  };
  writeAll([notif, ...all]);
  return notif;
}

export function markAllAsRead(audience) {
  const all = readAll();
  writeAll(all.map((n) => (!audience || n.audience === audience ? { ...n, read: true } : n)));
}

export function markAsRead(id) {
  const all = readAll();
  writeAll(all.map((n) => (n.id === id ? { ...n, read: true } : n)));
}

/**
 * Assina mudanças no armazenamento de notificações (inclusive entre
 * abas/páginas diferentes). Retorna uma função para cancelar a inscrição.
 */
export function subscribeToNotifications(callback) {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback(readAll());
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", handler);
  };
}

/* ---------------------------------------------------------
   Tradução de "type" -> aparência (ícone/cor/categoria) usada
   pelas telas NotificacoesCliente, NotificacoesPrestador e
   TopBar_cliente, que esperam esses campos prontos.
--------------------------------------------------------- */
const META = {
  solicitacao: { icon: "doc", iconColor: "#4338ca", iconBg: "#e0e7ff", category: "Solicitações" },
  servico: { icon: "star", iconColor: "#d97706", iconBg: "#fef3c7", category: "Serviços" },
  mensagem: { icon: "chat", iconColor: "#059669", iconBg: "#d1fae5", category: "Solicitações" },
  pagamento: { icon: "payment", iconColor: "#7c3aed", iconBg: "#ede9fe", category: "Pagamentos" },
  cancelamento: { icon: "doc", iconColor: "#dc2626", iconBg: "#fee2e2", category: "Solicitações" },
};

export function getNotificationMeta(type) {
  return META[type] || META.solicitacao;
}

/**
 * Converte um timestamp ISO em texto relativo ("Há 5 min", "Há 2 dias"...)
 */
export function timeAgo(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Agora há pouco";
  if (diffMin < 60) return `Há ${diffMin} min`;

  const diffHoras = Math.floor(diffMin / 60);
  if (diffHoras < 24) return `Há ${diffHoras} ${diffHoras === 1 ? "hora" : "horas"}`;

  const diffDias = Math.floor(diffHoras / 24);
  return `Há ${diffDias} ${diffDias === 1 ? "dia" : "dias"}`;
}