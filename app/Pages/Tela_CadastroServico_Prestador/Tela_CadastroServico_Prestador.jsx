    "use client";

    import { useState } from "react";

    import CadastroServicoPrestador_Stepper           from "../../components/CadastroServicoPrestador_Stepper";
    import CadastroServicoPrestador_InformacoesBasicas from "../../components/CadastroServicoPrestador_InformacoesBasicas";
    import CadastroServicoPrestador_DetalhesDoServico  from "../../components/CadastroServicoPrestador_DetalhesDoServico";
    import CadastroServicoPrestador_PrecoEAtendimento  from "../../components/CadastroServicoPrestador_PrecoEAtendimento";
    import CadastroServicoPrestador_AcoesFormulario    from "../../components/CadastroServicoPrestador_AcoesFormulario";
    import CadastroServicoPrestador_PreVisualizacao    from "../../components/CadastroServicoPrestador_PreVisualizacao";
    import CadastroServicoPrestador_DicasServico       from "../../components/CadastroServicoPrestador_DicasServico";
    import CadastroServicoPrestador_CentralDeAjuda     from "../../components/CadastroServicoPrestador_CentralDeAjuda";

    export default function Tela_CadastroServico_Prestador() {
    const [etapaAtual, setEtapaAtual] = useState(1);
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
        if (etapaAtual < 4) setEtapaAtual((e) => e + 1);
    };

    const handleCancelar = () => {
        if (window.confirm("Deseja cancelar o cadastro? As alterações não salvas serão perdidas.")) {
        setDados({});
        setEtapaAtual(1);
        }
    };

    const handleSalvarRascunho = () => {
        console.log("Rascunho salvo:", dados);
        alert("Rascunho salvo com sucesso!");
    };

    return (
        <div className="min-h-screen bg-white p-6">
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
                <CadastroServicoPrestador_InformacoesBasicas dados={dados} onChange={setDados} />
                <CadastroServicoPrestador_DetalhesDoServico  dados={dados} onChange={setDados} />
                <CadastroServicoPrestador_PrecoEAtendimento  dados={dados} onChange={setDados} />
                <CadastroServicoPrestador_AcoesFormulario
                onCancelar={handleCancelar}
                onSalvarRascunho={handleSalvarRascunho}
                onProximo={handleProximo}
                />
            </div>

            {/* COLUNA DIREITA */}
            <div>
                <CadastroServicoPrestador_PreVisualizacao dados={dados} />
                <CadastroServicoPrestador_DicasServico />
                <CadastroServicoPrestador_CentralDeAjuda />
            </div>

            </div>
        </div>
        </div>
    );
    }