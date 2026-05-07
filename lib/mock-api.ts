// lib/mock-api.ts — CRUD com persistência em localStorage simulando chamadas de API
import type { Aeronave, Etapa, Funcionario, Peca, StatusEtapa, StatusPeca, Teste } from "./types";
import { MOCK_AERONAVES, MOCK_FUNCIONARIOS } from "./mock-data";

const STORAGE_KEY_AERONAVES = "skyforge_aeronaves";
const STORAGE_KEY_FUNCIONARIOS = "skyforge_funcionarios";

// Inicialização com persistência
function getStorageData<T>(key: string, initialData: T): T {
  if (typeof window === "undefined") return initialData;
  const saved = localStorage.getItem(key);
  if (!saved) {
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(saved);
}

function saveStorageData<T>(key: string, data: T) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

let aeronaves: Aeronave[] = getStorageData(STORAGE_KEY_AERONAVES, MOCK_AERONAVES);
let funcionarios: Funcionario[] = getStorageData(STORAGE_KEY_FUNCIONARIOS, MOCK_FUNCIONARIOS);

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

// ─── Aeronaves ────────────────────────────────────────────────────────────────

export async function getAeronaves(): Promise<Aeronave[]> {
  await delay();
  return JSON.parse(JSON.stringify(aeronaves));
}

export async function getAeronave(codigo: string): Promise<Aeronave | null> {
  await delay();
  const found = aeronaves.find((a) => a.codigo === codigo);
  return found ? JSON.parse(JSON.stringify(found)) : null;
}

export async function criarAeronave(data: Omit<Aeronave, "pecas" | "etapas" | "testes">): Promise<{ ok: boolean; erro?: string }> {
  await delay();
  if (aeronaves.find((a) => a.codigo === data.codigo)) {
    return { ok: false, erro: `Código "${data.codigo}" já está em uso.` };
  }
  aeronaves.push({ ...data, pecas: [], etapas: [], testes: [] });
  saveStorageData(STORAGE_KEY_AERONAVES, aeronaves);
  return { ok: true };
}

export async function atualizarAeronave(codigo: string, data: Partial<Aeronave>): Promise<{ ok: boolean; erro?: string }> {
  await delay();
  const idx = aeronaves.findIndex((a) => a.codigo === codigo);
  if (idx === -1) return { ok: false, erro: "Aeronave não encontrada." };
  
  // Se mudar o código, verificar se o novo já existe
  if (data.codigo && data.codigo !== codigo && aeronaves.find(a => a.codigo === data.codigo)) {
    return { ok: false, erro: `Novo código "${data.codigo}" já está em uso.` };
  }

  aeronaves[idx] = { ...aeronaves[idx], ...data };
  saveStorageData(STORAGE_KEY_AERONAVES, aeronaves);
  return { ok: true };
}

export async function excluirAeronaves(codigos: string[]): Promise<{ ok: boolean }> {
  await delay();
  aeronaves = aeronaves.filter((a) => !codigos.includes(a.codigo));
  saveStorageData(STORAGE_KEY_AERONAVES, aeronaves);
  return { ok: true };
}

// ─── Peças ────────────────────────────────────────────────────────────────────

export async function adicionarPeca(codigoAeronave: string, peca: Omit<Peca, "status">): Promise<{ ok: boolean; erro?: string }> {
  await delay();
  const aeronave = aeronaves.find((a) => a.codigo === codigoAeronave);
  if (!aeronave) return { ok: false, erro: "Aeronave não encontrada." };
  aeronave.pecas.push({ ...peca, status: "EM_PRODUCAO" });
  saveStorageData(STORAGE_KEY_AERONAVES, aeronaves);
  return { ok: true };
}

export async function evoluirStatusPeca(codigoAeronave: string, indicePeca: number): Promise<{ ok: boolean; erro?: string; novoStatus?: StatusPeca }> {
  await delay();
  const aeronave = aeronaves.find((a) => a.codigo === codigoAeronave);
  if (!aeronave) return { ok: false, erro: "Aeronave não encontrada." };
  const peca = aeronave.pecas[indicePeca];
  if (!peca) return { ok: false, erro: "Peça não encontrada." };

  if (peca.status === "EM_PRODUCAO") {
    peca.status = "EM_TRANSPORTE";
  } else if (peca.status === "EM_TRANSPORTE") {
    peca.status = "PRONTA";
  } else {
    return { ok: false, erro: `Peça "${peca.nome}" já está no status final (PRONTA).` };
  }
  saveStorageData(STORAGE_KEY_AERONAVES, aeronaves);
  return { ok: true, novoStatus: peca.status };
}

// ─── Etapas ───────────────────────────────────────────────────────────────────

export async function adicionarEtapa(codigoAeronave: string, etapa: Pick<Etapa, "nome" | "prazo">): Promise<{ ok: boolean; erro?: string }> {
  await delay();
  const aeronave = aeronaves.find((a) => a.codigo === codigoAeronave);
  if (!aeronave) return { ok: false, erro: "Aeronave não encontrada." };
  aeronave.etapas.push({ ...etapa, status: "PENDENTE", funcionarios: [] });
  saveStorageData(STORAGE_KEY_AERONAVES, aeronaves);
  return { ok: true };
}

export async function iniciarEtapa(codigoAeronave: string, indiceEtapa: number): Promise<{ ok: boolean; erro?: string }> {
  await delay();
  const aeronave = aeronaves.find((a) => a.codigo === codigoAeronave);
  if (!aeronave) return { ok: false, erro: "Aeronave não encontrada." };
  const etapa = aeronave.etapas[indiceEtapa];
  if (!etapa) return { ok: false, erro: "Etapa não encontrada." };

  if (indiceEtapa > 0) {
    const anterior = aeronave.etapas[indiceEtapa - 1];
    if (anterior.status !== "CONCLUIDA") {
      return { ok: false, erro: `A etapa anterior "${anterior.nome}" ainda não foi concluída.` };
    }
  }

  if (etapa.status !== "PENDENTE") {
    return { ok: false, erro: `Etapa "${etapa.nome}" não está pendente.` };
  }

  etapa.status = "ANDAMENTO";
  saveStorageData(STORAGE_KEY_AERONAVES, aeronaves);
  return { ok: true };
}

export async function finalizarEtapa(codigoAeronave: string, indiceEtapa: number): Promise<{ ok: boolean; erro?: string }> {
  await delay();
  const aeronave = aeronaves.find((a) => a.codigo === codigoAeronave);
  if (!aeronave) return { ok: false, erro: "Aeronave não encontrada." };
  const etapa = aeronave.etapas[indiceEtapa];
  if (!etapa) return { ok: false, erro: "Etapa não encontrada." };

  if (etapa.status !== "ANDAMENTO") {
    return { ok: false, erro: `Etapa "${etapa.nome}" não está em andamento.` };
  }

  etapa.status = "CONCLUIDA";
  saveStorageData(STORAGE_KEY_AERONAVES, aeronaves);
  return { ok: true };
}

export async function associarFuncionarioEtapa(
  codigoAeronave: string,
  indiceEtapa: number,
  idFuncionario: string
): Promise<{ ok: boolean; erro?: string }> {
  await delay();
  const aeronave = aeronaves.find((a) => a.codigo === codigoAeronave);
  if (!aeronave) return { ok: false, erro: "Aeronave não encontrada." };
  const etapa = aeronave.etapas[indiceEtapa];
  if (!etapa) return { ok: false, erro: "Etapa não encontrada." };
  if (etapa.funcionarios.includes(idFuncionario)) {
    return { ok: false, erro: "Funcionário já está associado." };
  }
  etapa.funcionarios.push(idFuncionario);
  saveStorageData(STORAGE_KEY_AERONAVES, aeronaves);
  return { ok: true };
}

// ─── Testes ───────────────────────────────────────────────────────────────────

export async function registrarTeste(codigoAeronave: string, teste: Teste): Promise<{ ok: boolean; erro?: string }> {
  await delay();
  const aeronave = aeronaves.find((a) => a.codigo === codigoAeronave);
  if (!aeronave) return { ok: false, erro: "Aeronave não encontrada." };
  aeronave.testes.push(teste);
  saveStorageData(STORAGE_KEY_AERONAVES, aeronaves);
  return { ok: true };
}

// ─── Funcionários ─────────────────────────────────────────────────────────────

export async function getFuncionarios(): Promise<Funcionario[]> {
  await delay();
  return JSON.parse(JSON.stringify(funcionarios));
}

export async function criarFuncionario(funcionario: Funcionario): Promise<{ ok: boolean; erro?: string }> {
  await delay();
  if (funcionarios.find((f) => f.id === funcionario.id)) {
    return { ok: false, erro: `ID "${funcionario.id}" já está em uso.` };
  }
  if (funcionarios.find((f) => f.usuario === funcionario.usuario)) {
    return { ok: false, erro: `Usuário "${funcionario.usuario}" já está em uso.` };
  }
  funcionarios.push(funcionario);
  saveStorageData(STORAGE_KEY_FUNCIONARIOS, funcionarios);
  return { ok: true };
}

export async function atualizarFuncionario(id: string, data: Partial<Funcionario>): Promise<{ ok: boolean; erro?: string }> {
  await delay();
  const idx = funcionarios.findIndex((f) => f.id === id);
  if (idx === -1) return { ok: false, erro: "Funcionário não encontrado." };
  
  if (data.usuario && data.usuario !== funcionarios[idx].usuario && funcionarios.find(f => f.usuario === data.usuario)) {
    return { ok: false, erro: "Nome de usuário já existe." };
  }

  funcionarios[idx] = { ...funcionarios[idx], ...data };
  saveStorageData(STORAGE_KEY_FUNCIONARIOS, funcionarios);
  return { ok: true };
}

export async function excluirFuncionarios(ids: string[]): Promise<{ ok: boolean }> {
  await delay();
  funcionarios = funcionarios.filter((f) => !ids.includes(f.id));
  saveStorageData(STORAGE_KEY_FUNCIONARIOS, funcionarios);
  return { ok: true };
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function autenticar(usuario: string, senha: string): Promise<Funcionario | null> {
  await delay(500);
  return funcionarios.find((f) => f.usuario === usuario && f.senha === senha) ?? null;
}

// ─── Dashboard stats ──────────────────────────────────────────────────────────

export async function getDashboardStats() {
  await delay(200);
  const all = aeronaves;
  const totalAeronaves = all.length;
  const etapasEmAndamento = all.flatMap((a) => a.etapas).filter((e) => e.status === "ANDAMENTO").length;
  const testesReprovados = all.flatMap((a) => a.testes).filter((t) => t.resultado === "REPROVADO").length;
  const pecasProntas = all.flatMap((a) => a.pecas).filter((p) => p.status === "PRONTA").length;
  return { totalAeronaves, etapasEmAndamento, testesReprovados, pecasProntas };
}
