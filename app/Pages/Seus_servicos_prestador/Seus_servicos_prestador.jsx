'use client';
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
  Image as ImageIcon,
} from "lucide-react";
import { getServicos, removerServico, EVENTO_ATUALIZACAO } from "../../utils/servicosStore";

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

// Serviços de exemplo (mock) exibidos junto com os que o usuário cadastrar de verdade
const servicosExemplo = [
  {
    id: "mock-1",
    name: "Instalação elétrica",
    description: "Instalações elétricas residenciais e comerciais completas.",
    category: "Elétrica",
    price: "R$ 120,00",
    contracts: 23,
    status: "Ativo",
    photo: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: "mock-2",
    name: "Instalação hidráulica",
    description: "Serviços hidráulicos em geral, reparos e instalações.",
    category: "Hidráulica",
    price: "R$ 100,00",
    contracts: 18,
    status: "Ativo",
    photo: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: "mock-3",
    name: "Pintura residencial",
    description: "Pintura interna e externa com acabamento profissional.",
    category: "Pintura",
    price: "R$ 150,00",
    contracts: 15,
    status: "Ativo",
    photo: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: "mock-4",
    name: "Instalação de ar-condicionado",
    description: "Instalação e manutenção de ar-condicionado.",
    category: "Climatização",
    price: "R$ 180,00",
    contracts: 9,
    status: "Pausado",
    photo: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: "mock-5",
    name: "Montagem de móveis",
    description: "Montagem e desmontagem de móveis de todos os tipos.",
    category: "Montagem",
    price: "R$ 80,00",
    contracts: 7,
    status: "Ativo",
    photo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: "mock-6",
    name: "Jardinagem",
    description: "Manutenção de jardins, poda e paisagismo.",
    category: "Jardinagem",
    price: "R$ 90,00",
    contracts: 5,
    status: "Em revisão",
    photo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=120&fit=crop&auto=format",
  },
];

function Select({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
      >
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

const POR_PAGINA_OPCOES = [6, 12, 24];

export default function MeusServicos() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas as categorias");
  const [statusFiltro, setStatusFiltro] = useState("Todos os status");
  const [ordenacao, setOrdenacao] = useState("Mais recentes");
  const [page, setPage] = useState(1);
  const [porPagina, setPorPagina] = useState(6);

  const [servicosCadastrados, setServicosCadastrados] = useState([]);

  const carregarServicos = () => setServicosCadastrados(getServicos());

  useEffect(() => {
    carregarServicos();
    // Atualiza se um serviço for cadastrado nesta mesma aba
    window.addEventListener(EVENTO_ATUALIZACAO, carregarServicos);
    // Atualiza se for cadastrado em outra aba/janela
    window.addEventListener("storage", carregarServicos);
    return () => {
      window.removeEventListener(EVENTO_ATUALIZACAO, carregarServicos);
      window.removeEventListener("storage", carregarServicos);
    };
  }, []);

  // Serviços reais primeiro, depois os de exemplo
  const todosServicos = useMemo(
    () => [...servicosCadastrados, ...servicosExemplo],
    [servicosCadastrados]
  );

  const servicosFiltrados = useMemo(() => {
    let lista = [...todosServicos];

    if (search.trim()) {
      const termo = search.trim().toLowerCase();
      lista = lista.filter((s) => s.name.toLowerCase().includes(termo));
    }
    if (categoriaFiltro !== "Todas as categorias") {
      lista = lista.filter((s) => s.category === categoriaFiltro);
    }
    if (statusFiltro !== "Todos os status") {
      lista = lista.filter((s) => s.status === statusFiltro);
    }

    if (ordenacao === "Mais contratados") {
      lista.sort((a, b) => (b.contracts || 0) - (a.contracts || 0));
    } else if (ordenacao === "Mais antigos") {
      lista.reverse();
    }
    // "Mais recentes" já é a ordem natural (cadastrados entram no topo)

    return lista;
  }, [todosServicos, search, categoriaFiltro, statusFiltro, ordenacao]);

  const totalPaginas = Math.max(1, Math.ceil(servicosFiltrados.length / porPagina));
  const paginaAtual = Math.min(page, totalPaginas);
  const inicio = (paginaAtual - 1) * porPagina;
  const servicosPagina = servicosFiltrados.slice(inicio, inicio + porPagina);

  const stats = useMemo(() => {
    const total = todosServicos.length;
    const ativos = todosServicos.filter((s) => s.status === "Ativo").length;
    const pausados = todosServicos.filter((s) => s.status === "Pausado").length;
    const maisContratado = [...todosServicos].sort((a, b) => (b.contracts || 0) - (a.contracts || 0))[0];

    return { total, ativos, pausados, maisContratado };
  }, [todosServicos]);

  const statCards = [
    {
      icon: <Briefcase size={22} className="text-indigo-500" />,
      bg: "bg-indigo-50",
      label: "Total de serviços",
      value: String(stats.total),
      sub: "Todos os serviços cadastrados",
    },
    {
      icon: <CheckCircle size={22} className="text-green-500" />,
      bg: "bg-green-50",
      label: "Serviços ativos",
      value: String(stats.ativos),
      sub: "Serviços visíveis para clientes",
    },
    {
      icon: <PauseCircle size={22} className="text-yellow-500" />,
      bg: "bg-yellow-50",
      label: "Serviços pausados",
      value: String(stats.pausados),
      sub: "Serviços desativados",
    },
    {
      icon: <Star size={22} className="text-blue-500" />,
      bg: "bg-blue-50",
      label: "Mais contratado",
      value: stats.maisContratado ? stats.maisContratado.name : "—",
      sub: stats.maisContratado ? `${stats.maisContratado.contracts} contratações` : "Nenhum serviço ainda",
      wide: true,
    },
  ];

  const limparFiltros = () => {
    setSearch("");
    setCategoriaFiltro("Todas as categorias");
    setStatusFiltro("Todos os status");
    setOrdenacao("Mais recentes");
    setPage(1);
  };

  const handleExcluir = (servico) => {
    if (String(servico.id).startsWith("mock-")) {
      alert("Este é um serviço de exemplo e não pode ser excluído.");
      return;
    }
    if (window.confirm(`Deseja excluir o serviço "${servico.name}"?`)) {
      removerServico(servico.id);
      carregarServicos();
    }
  };

  return (
    <div className="bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meus Serviços</h1>
            <p className="text-sm text-gray-500 mt-0.5">Gerencie todos os serviços que você oferece na plataforma.</p>
          </div>
          <button
            onClick={() => router.push("/Pages/Tela_CadastroServico_Prestador")}
            className="flex items-center gap-2 bg-[#06104A] hover:bg-[#0A1663] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Plus size={16} />
            Novo Serviço
          </button>
        </div>

        {/* Stat Cards */}
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
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Buscar serviço por nome..."
                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <Select value={categoriaFiltro} onChange={(e) => { setCategoriaFiltro(e.target.value); setPage(1); }}>
              <option>Todas as categorias</option>
              <option>Elétrica</option>
              <option>Hidráulica</option>
              <option>Pintura</option>
              <option>Climatização</option>
              <option>Montagem</option>
              <option>Jardinagem</option>
            </Select>
            <Select value={statusFiltro} onChange={(e) => { setStatusFiltro(e.target.value); setPage(1); }}>
              <option>Todos os status</option>
              <option>Ativo</option>
              <option>Pausado</option>
              <option>Em revisão</option>
            </Select>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 whitespace-nowrap">Ordenar por</span>
              <Select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                <option>Mais recentes</option>
                <option>Mais antigos</option>
                <option>Mais contratados</option>
              </Select>
            </div>
            <button
              onClick={limparFiltros}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-2 rounded-lg ml-auto"
            >
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

          {servicosPagina.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-gray-400">
              Nenhum serviço encontrado com os filtros selecionados.
            </div>
          )}

          {servicosPagina.map((svc, i) => (
            <div
              key={svc.id}
              className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center px-5 py-4 ${
                i !== servicosPagina.length - 1 ? "border-b border-gray-100" : ""
              } hover:bg-gray-50 transition-colors`}
            >
              <div className="flex items-center gap-3">
                {svc.photo ? (
                  <img
                    src={svc.photo}
                    alt={svc.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <ImageIcon size={20} className="text-gray-300" />
                  </div>
                )}
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
                <button
                  onClick={() => handleExcluir(svc)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            {servicosFiltrados.length === 0
              ? "Nenhum serviço encontrado"
              : `Mostrando ${inicio + 1} a ${Math.min(inicio + porPagina, servicosFiltrados.length)} de ${servicosFiltrados.length} serviços`}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPaginas }, (_, idx) => idx + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  paginaAtual === n
                    ? "bg-indigo-600 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPaginas, p + 1))}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <ChevronRight size={15} />
            </button>
            <span className="text-sm text-gray-500 ml-2">Exibir</span>
            <Select
              value={porPagina}
              onChange={(e) => { setPorPagina(Number(e.target.value)); setPage(1); }}
            >
              {POR_PAGINA_OPCOES.map((n) => (
                <option key={n} value={n}>{n} por página</option>
              ))}
            </Select>
          </div>
        </div>

      </div>
    </div>
  );
}