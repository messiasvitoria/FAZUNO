import SolicitacaoPrestador from "./Solicitacao_prestador";
import PrestadorLayout from "../../components/PrestadorLayout";

export default function Page() {
  return (
    <PrestadorLayout title="Solicitações Recebidas" subtitle="Acompanhe e gerencie os pedidos dos clientes.">
      <SolicitacaoPrestador />
    </PrestadorLayout>
  );
}
