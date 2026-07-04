'use client';
import { useState } from "react";
import TopBar_Prestador  from "../../components/TopBar_Prestador";
import Parte_menulateral from "../../components/Parte_menulateral";
import {
  Briefcase,
  CheckCircle,
  PauseCircle,
  Star,
  Plus,
  Search,
  ChevronDown,
  Pencil,
  Copy,
  Info,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Droplets,
  Paintbrush,
  Wind,
  Wrench,
  Leaf,
  SlidersHorizontal,
} from "lucide-react";

const statusColors = {
  Ativo: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  Pausado: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  "Em revisão": { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" },
};

const categoryStyles = {
  Elétrica: { bg: "bg-blue-100", text: "text-blue-700", icon: <Zap size={13} /> },
  Hidráulica: { bg: "bg-cyan-100", text: "text-cyan-700", icon: <Droplets size={13} /> },
  Pintura: { bg: "bg-pink-100", text: "text-pink-700", icon: <Paintbrush size={13} /> },
  Climatização: { bg: "bg-sky-100", text: "text-sky-700", icon: <Wind size={13} /> },
  Montagem: { bg: "bg-orange-100", text: "text-orange-700", icon: <Wrench size={13} /> },
  Jardinagem: { bg: "bg-green-100", text: "text-green-700", icon: <Leaf size={13} /> },
};

const services = [
  {
    id: 1,
    name: "Instalação elétrica",
    description: "Instalações elétricas residenciais e comerciais completas.",
    category: "Elétrica",
    price: "R$ 120,00",
    contracts: 23,
    status: "Ativo",
    photo: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Instalação hidráulica",
    description: "Serviços hidráulicos em geral, reparos e instalações.",
    category: "Hidráulica",
    price: "R$ 100,00",
    contracts: 18,
    status: "Ativo",
    photo: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Pintura residencial",
    description: "Pintura interna e externa com acabamento profissional.",
    category: "Pintura",
    price: "R$ 150,00",
    contracts: 15,
    status: "Ativo",
    photo: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=120&h=120&fit=crop&auto=format",
  },
  {
  id: 4,
  name: "Instalação de ar-condicionado",
  description: "Instalação e manutenção de ar-condicionado.",
  category: "Climatização",
  price: "R$ 180,00",
  contracts: 9,
  status: "Pausado",
  photo: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=120&h=120&fit=crop&auto=format",
},
  {
    id: 5,
    name: "Montagem de móveis",
    description: "Montagem e desmontagem de móveis de todos os tipos.",
    category: "Montagem",
    price: "R$ 80,00",
    contracts: 7,
    status: "Ativo",
    photo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: 6,
    name: "Jardinagem",
    description: "Manutenção de jardins, poda e paisagismo.",
    category: "Jardinagem",
    price: "R$ 90,00",
    contracts: 5,
    status: "Em revisão",
    photo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=120&fit=crop&auto=format",
  },
];

const statCards = [
  {
    icon: <Briefcase size={22} className="text-indigo-500" />,
    bg: "bg-indigo-50",
    label: "Total de serviços",
    value: "12",
    sub: "Todos os serviços cadastrados",
  },
  {
    icon: <CheckCircle size={22} className="text-green-500" />,
    bg: "bg-green-50",
    label: "Serviços ativos",
    value: "9",
    sub: "Serviços visíveis para clientes",
  },
  {
    icon: <PauseCircle size={22} className="text-yellow-500" />,
    bg: "bg-yellow-50",
    label: "Serviços pausados",
    value: "2",
    sub: "Serviços desativados",
  },
  {
    icon: <Star size={22} className="text-blue-500" />,
    bg: "bg-blue-50",
    label: "Mais contratado",
    value: "Instalação elétrica",
    sub: "23 contratações",
    wide: true,
  },
];

function Select({ children }) {
  return (
    <div className="relative">
      <select className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer">
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

function StatusBadge({ status }) {
  const s = statusColors[status] || statusColors["Ativo"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

function CategoryBadge({ category }) {
  const c = categoryStyles[category] || { bg: "bg-gray-100", text: "text-gray-600", icon: null };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      {c.icon}
      {category}
    </span>
  );
}

export default function MeusServicos() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <TopBar_Prestador />

      <div className="flex flex-1 min-h-0">
        <div className="sticky top-0 h-screen shrink-0">
          <Parte_menulateral />
        </div>

        <main className="flex-1 min-w-0">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Meus Serviços</h1>
                <p className="text-sm text-gray-500 mt-0.5">Gerencie todos os serviços que você oferece na plataforma.</p>
              </div>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm">
                <Plus size={16} />
                Novo Serviço
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {statCards.map((card, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-3 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.bg}`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{card.label}</p>
                    <p className={`font-bold text-gray-900 leading-tight ${card.wide ? "text-sm" : "text-xl"}`}>{card.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-48">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar serviço por nome..."
                    className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <Select>
                  <option>Todas as categorias</option>
                  <option>Elétrica</option>
                  <option>Hidráulica</option>
                  <option>Pintura</option>
                  <option>Climatização</option>
                  <option>Montagem</option>
                  <option>Jardinagem</option>
                </Select>
                <Select>
                  <option>Todos os status</option>
                  <option>Ativo</option>
                  <option>Pausado</option>
                  <option>Em revisão</option>
                </Select>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 whitespace-nowrap">Ordenar por</span>
                  <Select>
                    <option>Mais recentes</option>
                    <option>Mais antigos</option>
                    <option>Mais contratados</option>
                  </Select>
                </div>
                <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-2 rounded-lg ml-auto">
                  <SlidersHorizontal size={14} />
                  Limpar filtros
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] px-5 py-3 border-b border-gray-100 bg-gray-50">
                {["Serviço", "Categoria", "Preço inicial", "Contratações", "Status", "Ações"].map((h) => (
                  <span key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {h}
                  </span>
                ))}
              </div>

              {services.map((svc, i) => (
                <div
                  key={svc.id}
                  className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center px-5 py-4 ${
                    i !== services.length - 1 ? "border-b border-gray-100" : ""
                  } hover:bg-gray-50 transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={svc.photo}
                      alt={svc.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{svc.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-snug max-w-48">{svc.description}</p>
                    </div>
                  </div>

                  <div>
                    <CategoryBadge category={svc.category} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">A partir de</p>
                    <p className="text-sm font-semibold text-gray-800">{svc.price}</p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-800">{svc.contracts}</p>
                    <p className="text-xs text-gray-400">contratações</p>
                  </div>

                  <div>
                    <StatusBadge status={svc.status} />
                  </div>

                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                      <Copy size={15} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                      <Info size={15} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">Mostrando 1 a 6 de 12 serviços</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <ChevronLeft size={15} />
                </button>
                {[1, 2].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      page === n
                        ? "bg-indigo-600 text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(2, p + 1))}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <ChevronRight size={15} />
                </button>
                <span className="text-sm text-gray-500 ml-2">Exibir</span>
                <Select>
                  <option>6 por página</option>
                  <option>12 por página</option>
                  <option>24 por página</option>
                </Select>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}