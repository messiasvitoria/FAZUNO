import { Suspense } from "react";
import Chat from "./Chat";

export default async function Page({ searchParams }) {
  const params = await searchParams;

  return (
    <Suspense fallback={null}>
      <Chat
        initialPerfil={params?.perfil}
        initialTipo={params?.tipo}
        initialOrigem={params?.origem}
      />
    </Suspense>
  );
}
