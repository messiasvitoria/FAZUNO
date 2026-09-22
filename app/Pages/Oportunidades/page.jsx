import Oportunidades from "./Oportunidades";
import PrestadorLayout from "../../components/PrestadorLayout";

export default function Page() {
  return (
    <PrestadorLayout title="Oportunidades" subtitle="Encontre serviços compatíveis com seu perfil.">
      <Oportunidades />
    </PrestadorLayout>
  );
}
