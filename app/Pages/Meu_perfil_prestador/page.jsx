import MeuPerfilPrestador from "./Meu_perfil_prestador";
import PrestadorLayout from "../../components/PrestadorLayout";

export default function Page() {
  return (
    <PrestadorLayout title="Meu Perfil" subtitle="Visualize e atualize suas informações profissionais.">
      <MeuPerfilPrestador />
    </PrestadorLayout>
  );
}
