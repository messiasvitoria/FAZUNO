import Tela_CadastroServico_Prestador from "./Tela_CadastroServico_Prestador";
import PrestadorLayout from "../../components/PrestadorLayout";

export default function Page() {
  return (
    <PrestadorLayout title="Adicionar Serviço" subtitle="Cadastre um novo serviço para seus clientes.">
      <Tela_CadastroServico_Prestador />
    </PrestadorLayout>
  );
}
