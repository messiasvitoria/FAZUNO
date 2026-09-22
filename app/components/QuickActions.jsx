<<<<<<< HEAD
"use client";

import { Ban, ClipboardList, MessageCircle, BarChart2 } from "lucide-react";
import { useRouter } from "next/navigation";
=======
import { Ban, ClipboardList, MessageCircle, BarChart2 } from "lucide-react";
>>>>>>> bbd136c22832df1cac739ce4c8ace8c00814fd4b

const actions = [
  { icon: <Ban size={16} className="text-blue-500" />, label: "Bloquear horário" },
  { icon: <ClipboardList size={16} className="text-blue-500" />, label: "Ver solicitações" },
<<<<<<< HEAD
  { icon: <MessageCircle size={16} className="text-blue-500" />, label: "Abrir chat", route: "/Pages/Chat?perfil=prestador" },
=======
  { icon: <MessageCircle size={16} className="text-blue-500" />, label: "Abrir chat" },
>>>>>>> bbd136c22832df1cac739ce4c8ace8c00814fd4b
  { icon: <BarChart2 size={16} className="text-blue-500" />, label: "Relatórios" },
];

export default function QuickActions() {
<<<<<<< HEAD
  const router = useRouter();

=======
>>>>>>> bbd136c22832df1cac739ce4c8ace8c00814fd4b
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Ações rápidas</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((a, i) => (
          <button
            key={i}
<<<<<<< HEAD
            onClick={() => {
              if (a.route) router.push(a.route);
            }}
=======
>>>>>>> bbd136c22832df1cac739ce4c8ace8c00814fd4b
            className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-colors font-medium"
          >
            {a.icon}
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> bbd136c22832df1cac739ce4c8ace8c00814fd4b
