// utils/servicosStore.js
// Armazenamento compartilhado de serviços do prestador.
// Usa localStorage para que o cadastro feito em uma tela apareça
// imediatamente na tela "Meus Serviços", sem precisar de backend.

const STORAGE_KEY = "prestador_servicos";
export const EVENTO_ATUALIZACAO = "servicos-atualizados";

export function getServicos() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Erro ao ler serviços do localStorage:", e);
    return [];
  }
}

function salvar(lista) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  // Notifica quem estiver ouvindo (ex: página Meus Serviços já aberta)
  window.dispatchEvent(new Event(EVENTO_ATUALIZACAO));
}

export function adicionarServico(servico) {
  if (typeof window === "undefined") return [];
  const atuais = getServicos();
  const atualizados = [{ ...servico }, ...atuais];
  salvar(atualizados);
  return atualizados;
}

export function removerServico(id) {
  if (typeof window === "undefined") return [];
  const atualizados = getServicos().filter((s) => s.id !== id);
  salvar(atualizados);
  return atualizados;
}

export function atualizarStatusServico(id, novoStatus) {
  if (typeof window === "undefined") return [];
  const atualizados = getServicos().map((s) =>
    s.id === id ? { ...s, status: novoStatus } : s
  );
  salvar(atualizados);
  return atualizados;
}
