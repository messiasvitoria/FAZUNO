    "use client";

    import { useState } from "react";
    import { useRouter } from "next/navigation";

    import CadastroServicoPrestador_Stepper            from "../../components/CadastroServicoPrestador_Stepper";
    import CadastroServicoPrestador_InformacoesBasicas from "../../components/CadastroServicoPrestador_InformacoesBasicas";
    import CadastroServicoPrestador_DetalhesDoServico  from "../../components/CadastroServicoPrestador_DetalhesDoServico";
    import CadastroServicoPrestador_PrecoEAtendimento  from "../../components/CadastroServicoPrestador_PrecoEAtendimento";
    import CadastroServicoPrestador_AcoesFormulario    from "../../components/CadastroServicoPrestador_AcoesFormulario";
    import CadastroServicoPrestador_PreVisualizacao    from "../../components/CadastroServicoPrestador_PreVisualizacao";
    import CadastroServicoPrestador_DicasServico       from "../../components/CadastroServicoPrestador_DicasServico";
    import CadastroServicoPrestador_CentralDeAjuda     from "../../components/CadastroServicoPrestador_CentralDeAjuda";
    import TopBar_Prestador                            from "../../components/TopBar_Prestador";
    import Parte_menulateral                           from "../../components/Parte_menulateral";

    const TOTAL_ETAPAS = 4;

    function ModalSucessoCadastro({ nomeServico, onIrParaInicio, onVerServico }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col items-center text-center">

            {/* Ícone de sucesso */}
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-1">Serviço cadastrado!</h2>
            <p className="text-sm text-gray-500 mb-1">
            <span className="font-medium text-gray-700">{nomeServico || "Seu serviço"}</span> foi publicado com sucesso.
            </p>
            <p className="text-sm text-gray-400 mb-8">
            Clientes já podem encontrar e contratar seu serviço na plataforma.
            </p>

            {/* Ações */}
            <div className="flex flex-col gap-3 w-full">
            <button
                onClick={onVerServico}
                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-blue-900 rounded-xl px-5 py-3 hover:bg-blue-800 transition-colors"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Ver em Meus Serviços
            </button>

            <button
                onClick={onIrParaInicio}
                className="w-full text-sm text-gray-500 border border-gray-200 rounded-xl px-5 py-3 hover:bg-gray-50 transition-colors"
            >
                Voltar para o Início
            </button>
            </div>
        </div>
        </div>
    );
    }

    export default function Tela_CadastroServico_Prestador() {
    const router = useRouter();
    const [etapaAtual, setEtapaAtual] = useState(1);
    const [modalSucesso, setModalSucesso] = useState(false);
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

    const handleProximo = () => {
        if (etapaAtual < TOTAL_ETAPAS) setEtapaAtual((e) => e + 1);
    };

    const handleAnterior = () => {
        if (etapaAtual > 1) setEtapaAtual((e) => e - 1);
    };

    const handleCancelar = () => {
        if (window.confirm("Deseja cancelar o cadastro? As alterações não salvas serão perdidas.")) {
        setDados({
            nome: "", categoria: "", subcategoria: "", descricao: "",
            idealPara: "", incluso: "", naoIncluso: "", tipoCobranca: "fixo",
            preco: "", tempoExecucao: "",
            formasAtendimento: ["Presencial", "Online / Remoto"],
            cidades: [],
        });
        setEtapaAtual(1);
        }
    };

    const handleSalvarRascunho = () => {
        console.log("Rascunho salvo:", dados);
        alert("Rascunho salvo com sucesso!");
    };

    const handlePublicar = () => {
        console.log("Serviço publicado:", dados);
        setModalSucesso(true);
    };

    const handleIrParaInicio = () => {
        setModalSucesso(false);
        router.push("/Pages/Login");
    };

    const handleVerServico = () => {
        setModalSucesso(false);
        router.push("/Pages/Seus_servicos_prestador");
    };

    const renderEtapa = () => {
        switch (etapaAtual) {
        case 1:
            return <CadastroServicoPrestador_InformacoesBasicas dados={dados} onChange={setDados} />;
        case 2:
            return <CadastroServicoPrestador_DetalhesDoServico  dados={dados} onChange={setDados} />;
        case 3:
            return <CadastroServicoPrestador_PrecoEAtendimento  dados={dados} onChange={setDados} />;
        case 4:
            return (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Revisão final</h2>
                <p className="text-sm text-gray-500 mb-4">
                Confira as informações antes de publicar o serviço.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                <li><span className="font-medium">Nome:</span> {dados.nome || "—"}</li>
                <li><span className="font-medium">Categoria:</span> {dados.categoria || "—"}</li>
                <li><span className="font-medium">Preço:</span> {dados.preco ? `R$ ${dados.preco}` : "—"}</li>
                <li><span className="font-medium">Tempo de execução:</span> {dados.tempoExecucao || "—"}</li>
                <li>
                    <span className="font-medium">Formas de atendimento:</span>{" "}
                    {dados.formasAtendimento?.join(", ") || "—"}
                </li>
                </ul>
            </div>
            );
        default:
            return null;
        }
    };

    return (
        <>
        {/* Modal de sucesso */}
        {modalSucesso && (
            <ModalSucessoCadastro
            nomeServico={dados.nome}
            onIrParaInicio={handleIrParaInicio}
            onVerServico={handleVerServico}
            />
        )}

        <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>

            {/* MENU LATERAL */}
            <Parte_menulateral activeRoute="/Pages/CadastroServico_prestador" />

            {/* CONTEÚDO */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

            <TopBar_Prestador />

            <div className="bg-white p-6" style={{ flex: 1, overflowY: "auto" }}>
                <div className="max-w-5xl mx-auto">

                {/* Breadcrumb */}
                <nav className="text-sm text-gray-400 mb-4">
                    <span className="hover:text-blue-700 cursor-pointer">Início</span>
                    <span className="mx-2">›</span>
                    <span className="hover:text-blue-700 cursor-pointer">Meus Serviços</span>
                    <span className="mx-2">›</span>
                    <span className="text-gray-600">Adicionar Serviço</span>
                </nav>

                {/* Título */}
                <h1 className="text-2xl font-bold text-gray-900">Adicionar Serviço</h1>
                <p className="text-sm text-gray-500 mt-0.5 mb-6">
                    Preencha as informações abaixo para cadastrar um novo serviço e atrair mais clientes.
                </p>

                {/* Stepper */}
                <CadastroServicoPrestador_Stepper etapaAtual={etapaAtual} />

                {/* Grid principal */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">

                    {/* COLUNA ESQUERDA */}
                    <div className="flex flex-col gap-5">
                    {renderEtapa()}

                    <CadastroServicoPrestador_AcoesFormulario
                        etapaAtual={etapaAtual}
                        totalEtapas={TOTAL_ETAPAS}
                        onCancelar={handleCancelar}
                        onAnterior={handleAnterior}
                        onSalvarRascunho={handleSalvarRascunho}
                        onProximo={handleProximo}
                        onPublicar={handlePublicar}
                    />

                    <CadastroServicoPrestador_CentralDeAjuda />
                    </div>

                    {/* COLUNA DIREITA */}
                    <div>
                    <CadastroServicoPrestador_PreVisualizacao dados={dados} />
                    <CadastroServicoPrestador_DicasServico />
                    </div>

                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
    }