    "use client";

    import { useRef, useState } from "react";
    import { useRouter } from "next/navigation";
    import SidebarPrestador from "../../components/SidebarPrestador";
    import TopBarPrestador from "../../components/TopBarPrestador";
    import { adicionarServico } from "../../utils/servicosStore";

    const SIDEBAR_WIDTH = 216;

    // ═══ DADOS: Stepper ═══════════════════════════════════════════════════
    const etapas = [
    { numero: 1, label: "Informações Básicas" },
    { numero: 2, label: "Detalhes do Serviço" },
    { numero: 3, label: "Preço e Atendimento" },
    { numero: 4, label: "Finalizar" },
    ];

    // ═══ DADOS: Dicas ═══════════════════════════════════════════════════════
    const dicas = [
    "Use fotos reais do seu trabalho",
    "Descreva bem os benefícios",
    "Seja claro sobre o que está incluso",
    "Defina um preço competitivo",
    "Mantenha suas informações atualizadas",
    ];

    // ═══ DADOS: Cidades pré-cadastradas ══════════════════════════════════════
    const cidadesDisponiveis = ["Teresina", "Parnaíba", "Picos", "Floriano"];

    // Rota da tela "Meus Serviços" (pasta app/Pages/Seus_servicos_prestador).
    const ROTA_MEUS_SERVICOS = "/Pages/Seus_servicos_prestador";

    export default function Tela_CadastroServico_Prestador() {
    const router = useRouter();
    const fileInputRef = useRef(null);

    const [etapaAtual, setEtapaAtual] = useState(1);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [arrastandoArquivo, setArrastandoArquivo] = useState(false);
    const [erroFotos, setErroFotos] = useState("");

    // Fotos reais (com preview) enviadas pelo usuário
    const [fotos, setFotos] = useState([]); // [{ id, url, file }]

    // Controle da adição manual de cidade
    const [novaCidade, setNovaCidade] = useState("");
    const [mostrarInputCidade, setMostrarInputCidade] = useState(false);

    const [dados, setDados] = useState({
        nome: "",
        categoria: "",
        subcategoria: "",
        descricao: "",
        idealPara: "",
        incluso: "",
        naoIncluso: "",
        tipoCobranca: "fixo",
        preco: "",
        tempoExecucao: "",
        formasAtendimento: ["Presencial", "Online / Remoto"],
        cidades: [],
    });

    const handle = (campo) => (e) => setDados({ ...dados, [campo]: e.target.value });

    const toggleForma = (forma) => {
        const atual = dados.formasAtendimento || [];
        const nova = atual.includes(forma) ? atual.filter((f) => f !== forma) : [...atual, forma];
        setDados({ ...dados, formasAtendimento: nova });
    };

    // ── Upload real de fotos ──────────────────────────────────────────────
    const LIMITE_FOTOS = 5;
    const LIMITE_MB = 5;

    const adicionarArquivos = (fileList) => {
        const arquivos = Array.from(fileList || []);
        if (!arquivos.length) return;

        const espacoRestante = LIMITE_FOTOS - fotos.length;
        if (espacoRestante <= 0) {
        setErroFotos(`Você já atingiu o limite de ${LIMITE_FOTOS} imagens.`);
        return;
        }

        const validos = [];
        let mensagemErro = "";

        arquivos.slice(0, espacoRestante).forEach((file) => {
        const tipoValido = ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
        const tamanhoValido = file.size <= LIMITE_MB * 1024 * 1024;

        if (!tipoValido) {
            mensagemErro = "Apenas arquivos JPG ou PNG são permitidos.";
            return;
        }
        if (!tamanhoValido) {
            mensagemErro = `Cada imagem deve ter no máximo ${LIMITE_MB}MB.`;
            return;
        }
        validos.push({
            id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
            url: URL.createObjectURL(file),
            file,
        });
        });

        if (validos.length) setFotos((prev) => [...prev, ...validos].slice(0, LIMITE_FOTOS));
        setErroFotos(mensagemErro);
    };

    const handleInputFotos = (e) => {
        adicionarArquivos(e.target.files);
        e.target.value = ""; // permite selecionar o mesmo arquivo novamente
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setArrastandoArquivo(false);
        adicionarArquivos(e.dataTransfer.files);
    };

    const removerFoto = (id) => {
        setFotos((prev) => {
        const alvo = prev.find((f) => f.id === id);
        if (alvo) URL.revokeObjectURL(alvo.url);
        return prev.filter((f) => f.id !== id);
        });
    };

    // ── Cidades de atendimento ────────────────────────────────────────────
    const adicionarCidade = (cidade) => {
        const nome = cidade.trim();
        if (!nome) return;
        if (dados.cidades.some((c) => c.toLowerCase() === nome.toLowerCase())) return;
        setDados((prev) => ({ ...prev, cidades: [...prev.cidades, nome] }));
    };

    const handleSelectCidade = (e) => {
        if (e.target.value) adicionarCidade(e.target.value);
        e.target.value = "";
    };

    const confirmarNovaCidade = () => {
        adicionarCidade(novaCidade);
        setNovaCidade("");
        setMostrarInputCidade(false);
    };

    const removerCidade = (cidade) => {
        setDados((prev) => ({ ...prev, cidades: prev.cidades.filter((c) => c !== cidade) }));
    };

    // ── Navegação entre etapas ────────────────────────────────────────────
    const handleProximo = () => {
        if (etapaAtual < 4) setEtapaAtual((e) => e + 1);
    };

    const handleVoltar = () => {
        if (etapaAtual > 1) setEtapaAtual((e) => e - 1);
    };

    const handleCancelar = () => {
        if (window.confirm("Deseja cancelar o cadastro? As alterações não salvas serão perdidas.")) {
        fotos.forEach((f) => URL.revokeObjectURL(f.url));
        setFotos([]);
        setDados({
            nome: "", categoria: "", subcategoria: "", descricao: "", idealPara: "",
            incluso: "", naoIncluso: "", tipoCobranca: "fixo", preco: "", tempoExecucao: "",
            formasAtendimento: ["Presencial", "Online / Remoto"], cidades: [],
        });
        setEtapaAtual(1);
        }
    };

    const handleSalvarRascunho = () => {
        console.log("Rascunho salvo:", dados);
        alert("Rascunho salvo com sucesso!");
    };

    const handleConfirmarCadastro = () => {
        const novoServico = {
        id: Date.now(),
        name: dados.nome || "Serviço sem nome",
        description: dados.descricao || "",
        category: dados.categoria || "Outros",
        price: `R$ ${preco.toFixed(2).replace(".", ",")}`,
        priceValue: preco,
        contracts: 0,
        status: "Ativo",
        photo: fotos[0]?.url || "",
        cidades: dados.cidades,
        formasAtendimento: dados.formasAtendimento,
        };
        adicionarServico(novoServico);
        console.log("Serviço cadastrado:", novoServico);
        setShowConfirmacao(true);
    };

    const handleVerMeusServicos = () => {
        setShowConfirmacao(false);
        router.push(ROTA_MEUS_SERVICOS);
    };

    const formas = dados.formasAtendimento || [];
    const preco = parseFloat(dados.preco) || 0;

    return (
        <div style={{ minHeight: "100vh", width: "100%", maxWidth: "100vw", overflowX: "hidden", background: "#F7F8FA" }}>
        <SidebarPrestador />

        <div
            style={{
            marginLeft: SIDEBAR_WIDTH,
            width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
            minWidth: 0,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            }}
        >
            <div style={{ position: "fixed", top: 0, left: SIDEBAR_WIDTH, right: 0, zIndex: 80 }}>
            <TopBarPrestador
                title="Adicionar Serviço"
                subtitle="Cadastre um novo serviço e atraia mais clientes."
            />
            </div>

            <main style={{ flex: 1, minWidth: 0, maxWidth: "100%", overflowX: "hidden", paddingTop: 56, position: "relative" }}>
            <div className="min-h-screen bg-[#F7F8FA] pl-8 pr-10 py-6">
                <div className="w-full flex flex-col gap-6">

                {/* Breadcrumb */}
                <nav className="text-sm text-gray-400">
                    <span className="hover:text-blue-700 cursor-pointer">Início</span>
                    <span className="mx-2">›</span>
                    <span
                    className="hover:text-blue-700 cursor-pointer"
                    onClick={() => router.push(ROTA_MEUS_SERVICOS)}
                    >
                    Meus Serviços
                    </span>
                    <span className="mx-2">›</span>
                    <span className="text-gray-600">Adicionar Serviço</span>
                </nav>

                {/* Título */}
                <div className="-mt-2">
                    <h1 className="text-2xl font-bold text-gray-900">Adicionar Serviço</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                    Preencha as informações abaixo para cadastrar um novo serviço e atrair mais clientes.
                    </p>
                </div>

                {/* ═══ Cards de progresso (estilo "resumo" da tela de Início) ═══ */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {etapas.map((etapa) => {
                    const ativo = etapa.numero === etapaAtual;
                    const concluido = etapa.numero < etapaAtual;
                    return (
                        <button
                        key={etapa.numero}
                        onClick={() => setEtapaAtual(etapa.numero)}
                        className={`bg-white border rounded-xl p-4 flex items-center gap-3 text-left transition-colors ${
                            ativo ? "border-blue-300 ring-1 ring-blue-100" : "border-gray-200 hover:border-gray-300"
                        }`}
                        >
                        <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-semibold ${
                            ativo || concluido ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-400"
                            }`}
                        >
                            {concluido ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            ) : (
                            etapa.numero
                            )}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-400">Etapa {etapa.numero}</p>
                            <p className={`text-sm font-medium truncate ${ativo ? "text-blue-900" : "text-gray-700"}`}>
                            {etapa.label}
                            </p>
                        </div>
                        </button>
                    );
                    })}
                </div>

                {/* Grid principal */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">

                    {/* COLUNA ESQUERDA — conteúdo da etapa atual */}
                    <div className="flex flex-col gap-5">

                    {/* ═══ ETAPA 1: Informações Básicas ═══ */}
                    {etapaAtual === 1 && (
                        <section className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h2 className="text-base font-medium text-gray-900">Informações Básicas</h2>
                            </div>
                            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                            Etapa 1 de 4
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-500">
                                Nome do serviço <span className="text-blue-700">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ex.: Instalação de Ar Condicionado"
                                value={dados.nome || ""}
                                onChange={handle("nome")}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                            />
                            </div>
                            <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-500">
                                Categoria <span className="text-blue-700">*</span>
                            </label>
                            <select
                                value={dados.categoria || ""}
                                onChange={handle("categoria")}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                            >
                                <option value="">Selecione uma categoria</option>
                                <option value="manutencao">Manutenção</option>
                                <option value="limpeza">Limpeza</option>
                                <option value="instalacao">Instalação</option>
                                <option value="reforma">Reforma</option>
                            </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-sm text-gray-500 block mb-1">Subcategoria</label>
                            <select
                            value={dados.subcategoria || ""}
                            onChange={handle("subcategoria")}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                            >
                            <option value="">Selecione uma subcategoria (opcional)</option>
                            <option value="ar-condicionado">Ar Condicionado</option>
                            <option value="hidraulica">Hidráulica</option>
                            <option value="eletrica">Elétrica</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="text-sm text-gray-500 block mb-1">
                            Descrição do serviço <span className="text-blue-700">*</span>
                            </label>
                            <textarea
                            placeholder="Descreva seu serviço, como é realizado, benefícios e diferenciais..."
                            value={dados.descricao || ""}
                            onChange={handle("descricao")}
                            maxLength={500}
                            rows={4}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-800"
                            />
                            <p className="text-xs text-gray-400 text-right mt-1">{(dados.descricao || "").length}/500</p>
                        </div>

                        <div>
                            <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                            Este serviço é ideal para
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                            </svg>
                            </label>
                            <select
                            value={dados.idealPara || ""}
                            onChange={handle("idealPara")}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                            >
                            <option value="">Selecione o tipo de cliente ou necessidade (opcional)</option>
                            <option value="residencial">Residencial</option>
                            <option value="comercial">Comercial</option>
                            <option value="empresarial">Empresarial</option>
                            </select>
                        </div>
                        </section>
                    )}

                    {/* ═══ ETAPA 2: Detalhes do Serviço ═══ */}
                    {etapaAtual === 2 && (
                        <section className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-base font-medium text-gray-900">Detalhes do Serviço</h2>
                            </div>
                            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                            Etapa 2 de 4
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Upload de fotos — funcional */}
                            <div>
                            <label className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                                Fotos do serviço
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                                </svg>
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png, image/jpeg"
                                multiple
                                className="hidden"
                                onChange={handleInputFotos}
                            />

                            <div
                                onClick={() => fotos.length < LIMITE_FOTOS && fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setArrastandoArquivo(true); }}
                                onDragLeave={() => setArrastandoArquivo(false)}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                                fotos.length >= LIMITE_FOTOS
                                    ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                                    : "border-blue-300 bg-blue-50 cursor-pointer hover:bg-blue-100"
                                } ${arrastandoArquivo ? "bg-blue-100 border-blue-500" : ""}`}
                            >
                                <svg className="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="text-sm font-medium text-blue-700">
                                {fotos.length >= LIMITE_FOTOS
                                    ? "Limite de imagens atingido"
                                    : "Clique para enviar ou arraste as imagens"}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Formatos: JPG, PNG. Tamanho máximo: 5MB cada</p>
                            </div>

                            {erroFotos && (
                                <p className="text-xs text-red-500 mt-2">{erroFotos}</p>
                            )}

                            <p className="text-xs text-gray-400 mt-2">{fotos.length}/{LIMITE_FOTOS} imagens</p>

                            {fotos.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 mt-3">
                                {fotos.map((foto) => (
                                    <div key={foto.id} className="relative group">
                                    <img
                                        src={foto.url}
                                        alt="Prévia do serviço"
                                        className="w-full h-16 object-cover rounded-lg border border-gray-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); removerFoto(foto.id); }}
                                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-300"
                                        title="Remover foto"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    </div>
                                ))}
                                </div>
                            )}
                            </div>

                            {/* Inclusões */}
                            <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                                O que está incluso
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                                </svg>
                                </label>
                                <textarea
                                placeholder="Liste o que está incluso no serviço..."
                                value={dados.incluso || ""}
                                onChange={handle("incluso")}
                                maxLength={300}
                                rows={3}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-800"
                                />
                                <p className="text-xs text-gray-400 text-right">{(dados.incluso || "").length}/300</p>
                            </div>

                            <div>
                                <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                                O que não está incluso
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                                </svg>
                                </label>
                                <textarea
                                placeholder="Liste o que não está incluso no serviço..."
                                value={dados.naoIncluso || ""}
                                onChange={handle("naoIncluso")}
                                maxLength={300}
                                rows={3}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-800"
                                />
                                <p className="text-xs text-gray-400 text-right">{(dados.naoIncluso || "").length}/300</p>
                            </div>
                            </div>
                        </div>
                        </section>
                    )}

                    {/* ═══ ETAPA 3: Preço e Atendimento ═══ */}
                    {etapaAtual === 3 && (
                        <section className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 10v-2m9-4a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-base font-medium text-gray-900">Preço e Atendimento</h2>
                            </div>
                            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                            Etapa 3 de 4
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Coluna esquerda */}
                            <div className="flex flex-col gap-5">
                            <div>
                                <label className="text-sm text-gray-500 block mb-2">
                                Tipo de cobrança <span className="text-blue-700">*</span>
                                </label>
                                <div className="flex">
                                <button
                                    onClick={() => setDados({ ...dados, tipoCobranca: "fixo" })}
                                    className={`flex-1 text-sm py-2 px-3 border rounded-l-lg transition-colors
                                        ${(dados.tipoCobranca || "fixo") === "fixo"
                                        ? "bg-blue-900 text-white border-blue-900"
                                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}
                                >
                                    Por serviço / valor fixo
                                </button>
                                <button
                                    onClick={() => setDados({ ...dados, tipoCobranca: "hora" })}
                                    className={`flex-1 text-sm py-2 px-3 border-t border-b border-r rounded-r-lg transition-colors
                                        ${dados.tipoCobranca === "hora"
                                        ? "bg-blue-900 text-white border-blue-900"
                                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}
                                >
                                    Por hora
                                </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-500 block mb-2">
                                Preço a partir de <span className="text-blue-700">*</span>
                                </label>
                                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                                <span className="px-3 py-2 bg-gray-50 text-sm text-gray-500 border-r border-gray-200">R$</span>
                                <input
                                    type="number"
                                    placeholder="0,00"
                                    value={dados.preco || ""}
                                    onChange={(e) => setDados({ ...dados, preco: e.target.value })}
                                    className="flex-1 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                                />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                                Tempo médio de execução
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                                </svg>
                                </label>
                                <select
                                value={dados.tempoExecucao || ""}
                                onChange={(e) => setDados({ ...dados, tempoExecucao: e.target.value })}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                                >
                                <option value="">Selecione o tempo médio</option>
                                <option value="30min">30 minutos</option>
                                <option value="1h">1 hora</option>
                                <option value="2h">2 horas</option>
                                <option value="meio-dia">Meio período</option>
                                <option value="dia-inteiro">Dia inteiro</option>
                                </select>
                            </div>
                            </div>

                            {/* Coluna direita */}
                            <div className="flex flex-col gap-5">
                            <div>
                                <label className="text-sm text-gray-500 block mb-2">
                                Formas de atendimento <span className="text-blue-700">*</span>
                                </label>
                                <div className="flex flex-col gap-2">
                                {["Presencial", "Online / Remoto", "Ambos"].map((forma) => (
                                    <label key={forma} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={formas.includes(forma)}
                                        onChange={() => toggleForma(forma)}
                                        className="w-4 h-4 rounded accent-blue-900"
                                    />
                                    {forma}
                                    </label>
                                ))}
                                </div>
                            </div>

                            {/* Área de atendimento — funcional: seleção + adicionar cidade digitada */}
                            <div>
                                <label className="text-sm text-gray-500 block mb-2">
                                Área de atendimento <span className="text-blue-700">*</span>
                                </label>

                                <select
                                onChange={handleSelectCidade}
                                defaultValue=""
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                                >
                                <option value="">Selecione as cidades que atende</option>
                                {cidadesDisponiveis.map((cidade) => (
                                    <option key={cidade} value={cidade}>{cidade}</option>
                                ))}
                                </select>

                                {/* Chips das cidades já adicionadas */}
                                {dados.cidades.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {dados.cidades.map((cidade) => (
                                    <span
                                        key={cidade}
                                        className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 text-xs px-2.5 py-1 rounded-full"
                                    >
                                        {cidade}
                                        <button
                                        type="button"
                                        onClick={() => removerCidade(cidade)}
                                        className="hover:text-red-500"
                                        title={`Remover ${cidade}`}
                                        >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        </button>
                                    </span>
                                    ))}
                                </div>
                                )}

                                {/* Adicionar cidade digitando */}
                                {mostrarInputCidade ? (
                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                    autoFocus
                                    type="text"
                                    value={novaCidade}
                                    onChange={(e) => setNovaCidade(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") { e.preventDefault(); confirmarNovaCidade(); }
                                        if (e.key === "Escape") { setMostrarInputCidade(false); setNovaCidade(""); }
                                    }}
                                    placeholder="Digite o nome da cidade"
                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                                    />
                                    <button
                                    type="button"
                                    onClick={confirmarNovaCidade}
                                    className="text-sm text-white bg-blue-900 rounded-lg px-3 py-2 hover:bg-blue-800 transition-colors"
                                    >
                                    Adicionar
                                    </button>
                                    <button
                                    type="button"
                                    onClick={() => { setMostrarInputCidade(false); setNovaCidade(""); }}
                                    className="text-sm text-gray-400 hover:text-gray-600 px-2"
                                    >
                                    Cancelar
                                    </button>
                                </div>
                                ) : (
                                <button
                                    type="button"
                                    onClick={() => setMostrarInputCidade(true)}
                                    className="flex items-center gap-1 text-sm text-blue-700 mt-2 hover:text-blue-900 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Adicionar cidade
                                </button>
                                )}
                            </div>
                            </div>
                        </div>
                        </section>
                    )}

                    {/* ═══ ETAPA 4: Finalizar (revisão completa) ═══ */}
                    {etapaAtual === 4 && (
                        <section className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-base font-medium text-gray-900">Finalizar</h2>
                            </div>
                            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                            Etapa 4 de 4
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-5">
                            Revise as informações abaixo antes de confirmar o cadastro do seu serviço.
                        </p>

                        <div className="flex flex-col gap-3">
                            <div className="border border-gray-100 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">Nome do serviço</p>
                            <p className="text-sm font-medium text-gray-800">{dados.nome || "—"}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                            <div className="border border-gray-100 rounded-lg p-4">
                                <p className="text-xs text-gray-400 mb-1">Categoria</p>
                                <p className="text-sm font-medium text-gray-800">{dados.categoria || "—"}</p>
                            </div>
                            <div className="border border-gray-100 rounded-lg p-4">
                                <p className="text-xs text-gray-400 mb-1">Subcategoria</p>
                                <p className="text-sm font-medium text-gray-800">{dados.subcategoria || "—"}</p>
                            </div>
                            </div>
                            <div className="border border-gray-100 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">Descrição</p>
                            <p className="text-sm text-gray-700">{dados.descricao || "—"}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                            <div className="border border-gray-100 rounded-lg p-4">
                                <p className="text-xs text-gray-400 mb-1">Preço a partir de</p>
                                <p className="text-sm font-medium text-gray-800">R$ {preco.toFixed(2).replace(".", ",")}</p>
                            </div>
                            <div className="border border-gray-100 rounded-lg p-4">
                                <p className="text-xs text-gray-400 mb-1">Tempo médio de execução</p>
                                <p className="text-sm font-medium text-gray-800">{dados.tempoExecucao || "—"}</p>
                            </div>
                            </div>
                            <div className="border border-gray-100 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">Formas de atendimento</p>
                            <p className="text-sm text-gray-700">{formas.length ? formas.join(", ") : "—"}</p>
                            </div>
                            <div className="border border-gray-100 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">Cidades atendidas</p>
                            <p className="text-sm text-gray-700">{dados.cidades.length ? dados.cidades.join(", ") : "—"}</p>
                            </div>
                            {fotos.length > 0 && (
                            <div className="border border-gray-100 rounded-lg p-4">
                                <p className="text-xs text-gray-400 mb-2">Fotos</p>
                                <div className="flex gap-2 flex-wrap">
                                {fotos.map((foto) => (
                                    <img key={foto.id} src={foto.url} alt="" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                                ))}
                                </div>
                            </div>
                            )}
                        </div>
                        </section>
                    )}

                    {/* ── Ações do formulário ── */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                        <button
                            onClick={handleCancelar}
                            className="text-sm text-gray-500 border border-gray-200 rounded-lg px-5 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        {etapaAtual > 1 && (
                            <button
                            onClick={handleVoltar}
                            className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 rounded-lg px-5 py-2.5 hover:bg-gray-50 transition-colors"
                            >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Voltar
                            </button>
                        )}
                        </div>

                        <div className="flex items-center gap-3">
                        <button
                            onClick={handleSalvarRascunho}
                            className="text-sm text-blue-700 border border-blue-300 rounded-lg px-5 py-2.5 hover:bg-blue-50 transition-colors"
                        >
                            Salvar rascunho
                        </button>

                        {etapaAtual < 4 ? (
                            <button
                            onClick={handleProximo}
                            className="flex items-center gap-2 text-sm text-white bg-blue-900 rounded-lg px-5 py-2.5 hover:bg-blue-800 transition-colors"
                            >
                            Próximo passo
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            </button>
                        ) : (
                            <button
                            onClick={handleConfirmarCadastro}
                            className="flex items-center gap-2 text-sm text-white bg-green-600 rounded-lg px-5 py-2.5 hover:bg-green-700 transition-colors"
                            >
                            Confirmar cadastro
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            </button>
                        )}
                        </div>
                    </div>
                    </div>

                    {/* COLUNA DIREITA — Pré-visualização + Dicas (sempre visível) */}
                    <div className="flex flex-col gap-4">
                    {/* ── Pré-visualização ── */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-gray-900">Pré-visualização</h3>
                        <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                            Ao vivo
                        </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-4">Veja como seu serviço será exibido para os clientes.</p>

                        <div className="bg-gray-100 rounded-lg h-28 flex items-center justify-center mb-3 overflow-hidden">
                        {fotos[0] ? (
                            <img src={fotos[0].url} alt="Prévia" className="w-full h-full object-cover" />
                        ) : (
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        )}
                        </div>

                        <p className="text-sm font-medium text-gray-800 mb-1">
                        {dados.nome || "Nome do serviço"}
                        </p>

                        <span className="inline-block bg-blue-50 text-blue-800 text-xs px-2.5 py-0.5 rounded-md mb-2">
                        {dados.categoria || "Categoria"}
                        </span>

                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                        <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        4,9 <span className="text-gray-400">(128 avaliações)</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {dados.cidades.length ? dados.cidades.join(", ") : "Atendimento a combinar"}
                        </div>

                        {dados.descricao ? (
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{dados.descricao}</p>
                        ) : (
                        <p className="text-xs text-gray-400 mb-3">Descrição do serviço aparecerá aqui em até duas linhas de texto...</p>
                        )}

                        <div className="border-t border-gray-100 pt-3">
                        <p className="text-xs text-gray-400">A partir de</p>
                        <p className="text-lg font-medium text-gray-800">R$ {preco.toFixed(2).replace(".", ",")}</p>
                        </div>
                    </div>

                    {/* ── Ajuda ── */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-900">Precisa de ajuda?</h3>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">Dúvidas sobre como cadastrar seu serviço?</p>
                        <button className="w-full flex items-center justify-center gap-2 text-xs text-blue-700 border border-blue-300 bg-white rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Ver guia completo
                        </button>
                    </div>

                    {/* ── Dicas ── */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Dicas para um bom serviço</h3>
                        <ul className="flex flex-col gap-2">
                        {dicas.map((dica) => (
                            <li key={dica} className="flex items-start gap-2 text-xs text-gray-500">
                            <svg className="w-3.5 h-3.5 text-blue-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {dica}
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div>

                </div>
                </div>
            </div>

            {/* ═══ MODAL DE CONFIRMAÇÃO (sobreposto) ═══ */}
            {showConfirmacao && (
                <div
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(15, 23, 42, 0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                }}
                >
                <div
                    style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "28px 32px",
                    width: 340,
                    textAlign: "center",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                    }}
                >
                    <div
                    style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        background: "#DCFCE7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                    }}
                    >
                    <svg className="w-6 h-6" fill="none" stroke="#16A34A" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: "0 0 6px" }}>
                    Serviço cadastrado!
                    </h3>
                    <p style={{ fontSize: 13.5, color: "#64748B", margin: "0 0 20px" }}>
                    Seu serviço foi enviado com sucesso e já está disponível para os clientes.
                    </p>
                    <button
                    onClick={handleVerMeusServicos}
                    style={{
                        width: "100%",
                        background: "#0d1b3e",
                        color: "#fff",
                        border: "none",
                        borderRadius: 10,
                        padding: "10px 0",
                        fontSize: 13.5,
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                    >
                    Ver meus serviços
                    </button>
                </div>
                </div>
            )}
            </main>
        </div>
        </div>
    );
    }