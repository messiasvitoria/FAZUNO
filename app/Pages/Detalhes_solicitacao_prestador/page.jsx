"use client"
import ModalDetalhesSolicitacao from "./Detalhes_solicitacao_prestador";

export default function Page() {
    const item = {
    id: 1,
    title: "Limpeza Residencial",
    status: "nova",
    client: "Maria Silva",
    avatar: "https://via.placeholder.com/80",
    rating: 4.8,
    reviews: 23,
    category: "Limpeza",
    date: "07/06/2026",
    time: "08:00",
    neighborhood: "Centro",
    valueLabel: "Valor",
    value: 150,
    distance: 2.5,
    description: "Limpeza completa da residência.",
    };

    return (
    <ModalDetalhesSolicitacao
    solicitacao={item}
    onClose={() => {}}
/>
    );
}
