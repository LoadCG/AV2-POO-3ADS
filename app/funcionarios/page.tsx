"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/layout/AppLayout";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import { getFuncionarios, excluirFuncionarios } from "@/lib/mock-api";
import type { Funcionario } from "@/lib/types";
import { Users, Plus, Shield, Trash2, Edit2, CheckSquare, Square } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string[] | null>(null);

  const loadData = () => {
    setLoading(true);
    getFuncionarios().then((data) => {
      setFuncionarios(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleSelect = (id: string) => {
    setSelecionados(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selecionados.length === funcionarios.length && funcionarios.length > 0) {
      setSelecionados([]);
    } else {
      setSelecionados(funcionarios.map(f => f.id));
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const res = await excluirFuncionarios(confirmDelete);
    if (res.ok) {
      toast.success(`${confirmDelete.length} funcionário(s) removido(s).`);
      setSelecionados([]);
      loadData();
    }
    setConfirmDelete(null);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Funcionários</h1>
            <p className="text-sm text-slate-500 mt-1">
              Gestão de acessos e equipe do SkyForge
            </p>
          </div>
          <Link
            href="/funcionarios/novo"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
          >
            <Plus className="w-4 h-4" />
            Novo Funcionário
          </Link>
        </div>

        {/* Bulk Actions Bar */}
        {selecionados.length > 0 && (
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-6 py-3 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-indigo-300">
                {selecionados.length} item{selecionados.length > 1 ? "s" : ""} selecionado{selecionados.length > 1 ? "s" : ""}
              </span>
              <button 
                onClick={() => setSelecionados([])}
                className="text-xs text-indigo-500 hover:text-indigo-400 font-semibold uppercase tracking-wider"
              >
                Desmarcar todos
              </button>
            </div>
            <button 
              onClick={() => setConfirmDelete(selecionados)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-semibold rounded-lg transition-all border border-red-500/20"
            >
              <Trash2 className="w-4 h-4" />
              Excluir Selecionados
            </button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <LoadingSkeleton type="table" rows={4} columns={5} />
        ) : funcionarios.length === 0 ? (
          <EmptyState
            icon={<Users className="w-8 h-8" />}
            title="Nenhum funcionário cadastrado"
            action={
              <Link href="/funcionarios/novo" className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-sm font-semibold mt-2">
                Cadastrar Primeiro Funcionário
              </Link>
            }
          />
        ) : (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-x-auto shadow-sm">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="px-5 py-3.5 w-10">
                    <button onClick={toggleSelectAll} className="text-slate-500 hover:text-indigo-400 transition-colors">
                      {selecionados.length === funcionarios.length && funcionarios.length > 0 ? (
                        <CheckSquare className="w-5 h-5 text-indigo-500" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase">ID</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase">Nome / Usuário</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase">Nível</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase">Contato</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map((f) => {
                  const isSelected = selecionados.includes(f.id);
                  return (
                    <tr 
                      key={f.id} 
                      className={`border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors ${isSelected ? 'bg-indigo-500/5' : ''}`}
                    >
                      <td className="px-5 py-4">
                        <button onClick={() => toggleSelect(f.id)} className="text-slate-600 hover:text-indigo-400 transition-colors">
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 text-indigo-500" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-sm font-mono text-slate-400">{f.id}</td>
                      <td className="px-5 py-4">
                        <div className="text-sm font-medium text-slate-200">{f.nome}</div>
                        <div className="text-xs text-slate-500">@{f.usuario}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border
                          ${f.nivelPermissao === 'ADMINISTRADOR' ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' :
                            f.nivelPermissao === 'ENGENHEIRO' ? 'bg-sky-500/15 text-sky-300 border-sky-500/30' :
                            'bg-slate-500/15 text-slate-300 border-slate-500/30'}`}>
                          {f.nivelPermissao === 'ADMINISTRADOR' && <Shield className="w-3 h-3" />}
                          {f.nivelPermissao}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-300">{f.telefone}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/funcionarios/editar/${f.id}`}
                            className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => setConfirmDelete([f.id])}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog 
        open={!!confirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir ${confirmDelete?.length} funcionário(s)? Esta ação não pode ser desfeita.`}
        confirmLabel="Sim, Excluir"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
        variant="danger"
      />
    </AppLayout>
  );
}
