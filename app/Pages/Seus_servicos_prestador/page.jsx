import MeusServicos from './Seus_servicos_prestador'
import PrestadorLayout from '../../components/PrestadorLayout'

export default function MeusServicosPage_prestador() {
  return (
    <PrestadorLayout title="Meus Serviços" subtitle="Gerencie todos os serviços que você oferece.">
      <MeusServicos />
    </PrestadorLayout>
  );
}
