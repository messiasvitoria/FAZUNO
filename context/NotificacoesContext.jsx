"use client";

import { createContext, useContext, useState } from "react";

const NotificacoesContext = createContext(null);

const notificacoesIniciais = [
  { id: 1,  icon: "doc",     title: "Serviço Aceito",                       desc: "O prestador João Silva aceitou sua solicitação de Instalação de Ar Condicionado.", time: "Há 5 min",       sortOrder: 1,  unread: true,  category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 2,  icon: "chat",    title: "Nova Mensagem",                         desc: "Você recebeu uma nova mensagem do prestador João Silva.",                           time: "Há 20 min",      sortOrder: 2,  unread: true,  category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 3,  icon: "payment", title: "Pagamento Aprovado",                    desc: "Seu pagamento de R$ 350,00 foi aprovado com sucesso.",                             time: "Há 1 hora",      sortOrder: 3,  unread: true,  category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
  { id: 4,  icon: "star",    title: "Avalie seu Serviço",                    desc: "Seu serviço de Limpeza Residencial foi concluído. Conte como foi sua experiência!", time: "Ontem às 10:30", sortOrder: 6,  unread: false, category: "serviços",     iconColor: "#f59e0b", iconBg: "#fef3c7" },
  { id: 5,  icon: "eye",     title: "Prestador Visualizou sua Solicitação",  desc: "O prestador Maria Santos visualizou sua solicitação de Pintura Residencial.",      time: "Ontem às 09:15", sortOrder: 7,  unread: false, category: "solicitações", iconColor: "#f97316", iconBg: "#ffedd5" },
  { id: 6,  icon: "doc",     title: "Serviço Concluído",                     desc: "Carlos Lima marcou o serviço de Reparo Elétrico como concluído. Tudo certo?",       time: "Ontem às 14:00", sortOrder: 5,  unread: false, category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 7,  icon: "chat",    title: "Nova Mensagem",                         desc: "Ana Faxineira enviou uma mensagem: 'Posso chegar às 8h amanhã?'",                   time: "Há 2 dias",      sortOrder: 8,  unread: false, category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 8,  icon: "payment", title: "Cobrança Gerada",                       desc: "Foi gerada uma cobrança de R$ 180,00 pelo serviço de Encanamento.",               time: "Há 2 dias",      sortOrder: 9,  unread: false, category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
  { id: 9,  icon: "star",    title: "Avalie seu Serviço",                    desc: "Seu serviço de Instalação de Prateleiras foi concluído.",                           time: "Há 3 dias",      sortOrder: 10, unread: false, category: "serviços",     iconColor: "#f59e0b", iconBg: "#fef3c7" },
  { id: 10, icon: "doc",     title: "Novo Prestador Disponível",             desc: "Roberto Souza está disponível para sua solicitação de Pintura de Quarto.",          time: "Há 3 dias",      sortOrder: 11, unread: false, category: "solicitações", iconColor: "#3b82f6", iconBg: "#dbeafe" },
  { id: 11, icon: "chat",    title: "Nova Mensagem",                         desc: "Fernanda Pintora enviou fotos do trabalho finalizado para sua aprovação.",          time: "Há 4 dias",      sortOrder: 12, unread: false, category: "serviços",     iconColor: "#22c55e", iconBg: "#dcfce7" },
  { id: 12, icon: "payment", title: "Reembolso Processado",                  desc: "Seu reembolso de R$ 90,00 foi processado e será creditado em até 5 dias úteis.",  time: "Há 5 dias",      sortOrder: 13, unread: false, category: "pagamentos",   iconColor: "#8b5cf6", iconBg: "#ede9fe" },
];

export function NotificacoesProvider({ children }) {
  const [notifs, setNotifs] = useState(notificacoesIniciais);

  function addNotificacao(novaNotif) {
    setNotifs((prev) => [
      {
        id: Date.now(),
        unread: true,
        sortOrder: 0,
        time: "Agora",
        ...novaNotif,
      },
      ...prev,
    ]);
  }

  return (
    <NotificacoesContext.Provider value={{ notifs, setNotifs, addNotificacao }}>
      {children}
    </NotificacoesContext.Provider>
  );
}

export function useNotificacoes() {
  return useContext(NotificacoesContext);
}