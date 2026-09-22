import CancelamentoPrestador from "./Cancelamento_prestador";
import PrestadorLayout from "../../components/PrestadorLayout";

export default function Page() {
  return (
    <PrestadorLayout title="Cancelamento de solicitação" subtitle="Registre e acompanhe o cancelamento do atendimento.">
      <CancelamentoPrestador />
    </PrestadorLayout>
  );
}
