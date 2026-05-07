# SkyForge — User Flow Completo

## Fluxograma Principal

```mermaid
flowchart TD
    START([Acesso à aplicação]) --> LOGIN[/Tela de Login\]

    LOGIN -->|Credenciais inválidas| ERR_LOGIN[❌ Erro: Usuário ou senha incorretos]
    ERR_LOGIN --> LOGIN

    LOGIN -->|ADMINISTRADOR autenticado| DASH_ADMIN[Dashboard — ADMINISTRADOR]
    LOGIN -->|ENGENHEIRO autenticado| DASH_ENG[Dashboard — ENGENHEIRO]
    LOGIN -->|OPERADOR autenticado| DASH_OP[Dashboard — OPERADOR]

    %% ─── DASHBOARD ───────────────────────────────────────────────
    DASH_ADMIN & DASH_ENG & DASH_OP --> DASH{Dashboard}
    DASH --> |Cards de resumo| CARDS[Total Aeronaves · Etapas em Andamento · Testes Reprovados · Peças Prontas]

    %% ─── NAVEGAÇÃO PRINCIPAL ────────────────────────────────────
    DASH --> NAV_AERONAVES[Aeronaves]
    DASH --> NAV_FUNC[Funcionários]

    %% ─── AERONAVES ───────────────────────────────────────────────
    NAV_AERONAVES --> LISTA_AER[Lista de Aeronaves]
    LISTA_AER -->|Lista vazia| EMPTY_AER[🗒 Empty State: Nenhuma aeronave]
    LISTA_AER -->|Dados presentes| TABLE_AER[Tabela: Código · Modelo · Tipo · Progresso]
    TABLE_AER -->|Clica na linha| DETAIL_AER[/Detalhe da Aeronave\]

    LISTA_AER -->|ENGENHEIRO+ clica em Nova| NOVA_AER[Formulário: Nova Aeronave]
    NOVA_AER -->|Campos inválidos| NOVA_AER_ERR[❌ Validação: campo obrigatório]
    NOVA_AER_ERR --> NOVA_AER
    NOVA_AER -->|Código duplicado| DUP_ERR[❌ Código já existe]
    DUP_ERR --> NOVA_AER
    NOVA_AER -->|Salva com sucesso| LISTA_AER

    %% ─── DETALHE DA AERONAVE (TABS) ─────────────────────────────
    DETAIL_AER --> TAB_PECAS[Tab: Peças]
    DETAIL_AER --> TAB_ETAPAS[Tab: Etapas]
    DETAIL_AER --> TAB_TESTES[Tab: Testes]
    DETAIL_AER --> TAB_RELATORIO[Tab: Relatório]

    %% ─── TAB PEÇAS ───────────────────────────────────────────────
    TAB_PECAS -->|Sem peças| EMPTY_PECA[🗒 Empty State: Nenhuma peça]
    TAB_PECAS -->|Com peças| LIST_PECA[Lista: Nome · Tipo · Fornecedor · Status]
    LIST_PECA -->|OPERADOR+ clica em Evoluir| STATUS_PECA{Status atual?}
    STATUS_PECA -->|EM_PRODUCAO| ST_P1[→ EM_TRANSPORTE ✅ toast]
    STATUS_PECA -->|EM_TRANSPORTE| ST_P2[→ PRONTA ✅ toast]
    STATUS_PECA -->|PRONTA| ST_P3[❌ Já está no status final]

    TAB_PECAS -->|ENGENHEIRO+ clica em Nova Peça| FORM_PECA[Modal: Nova Peça]
    FORM_PECA -->|Salva| LIST_PECA

    %% ─── TAB ETAPAS ──────────────────────────────────────────────
    TAB_ETAPAS -->|Sem etapas| EMPTY_ETAPA[🗒 Empty State: Nenhuma etapa]
    TAB_ETAPAS -->|Com etapas| LIST_ETAPA[Lista sequencial: Ordem · Nome · Prazo · Status · Funcionários]

    LIST_ETAPA -->|Clica em Iniciar| INIT_ETAPA{Etapa anterior CONCLUIDA?}
    INIT_ETAPA -->|Não| ERR_SEQ[❌ Etapa anterior não concluída]
    INIT_ETAPA -->|Sim ou é a 1ª| ETAPA_ANDAMENTO[Status → ANDAMENTO ✅ toast]

    LIST_ETAPA -->|Clica em Finalizar| FINAL_ETAPA{Status = ANDAMENTO?}
    FINAL_ETAPA -->|Não| ERR_FINAL[❌ Etapa não está em andamento]
    FINAL_ETAPA -->|Sim| ETAPA_CONCLUIDA[Status → CONCLUIDA ✅ toast]

    TAB_ETAPAS -->|ENGENHEIRO+ clica em Nova Etapa| FORM_ETAPA[Modal: Nova Etapa]
    FORM_ETAPA -->|Salva| LIST_ETAPA

    LIST_ETAPA -->|Clica em Associar Funcionário| MODAL_FUNC_ETAPA[Modal: Selecionar Funcionário]
    MODAL_FUNC_ETAPA -->|Confirma| ASSOC_OK[Funcionário associado ✅ toast]

    %% ─── TAB TESTES ──────────────────────────────────────────────
    TAB_TESTES -->|Sem testes| EMPTY_TESTE[🗒 Empty State: Nenhum teste]
    TAB_TESTES -->|Com testes| LIST_TESTE[Lista: Tipo · Resultado badge]
    TAB_TESTES -->|ENGENHEIRO+ clica em Registrar Teste| FORM_TESTE[Modal: Registrar Teste]
    FORM_TESTE -->|Tipo + APROVADO| TESTE_OK[Teste APROVADO ✅ badge verde]
    FORM_TESTE -->|Tipo + REPROVADO| TESTE_NOK[Teste REPROVADO ❌ badge vermelho]
    TESTE_OK & TESTE_NOK --> LIST_TESTE

    %% ─── TAB RELATÓRIO ───────────────────────────────────────────
    TAB_RELATORIO -->|ENGENHEIRO+ acessa| FORM_RELATORIO[Formulário: Cliente + Data de Entrega]
    FORM_RELATORIO -->|Há pendências| WARN_RELATORIO[⚠️ Aviso: etapas pendentes ou testes reprovados]
    WARN_RELATORIO -->|Usuário confirma| RELATORIO_VIEW[Prévia do Relatório formatado]
    WARN_RELATORIO -->|Usuário cancela| TAB_RELATORIO
    FORM_RELATORIO -->|Sem pendências| RELATORIO_VIEW

    %% ─── FUNCIONÁRIOS (só ADMIN) ─────────────────────────────────
    NAV_FUNC -->|ENGENHEIRO ou OPERADOR tenta acessar| REDIRECT_DASH[🔀 Redirect → Dashboard]
    NAV_FUNC -->|ADMINISTRADOR| LISTA_FUNC[Lista de Funcionários]
    LISTA_FUNC -->|Lista vazia| EMPTY_FUNC[🗒 Empty State: Nenhum funcionário]
    LISTA_FUNC -->|Com dados| TABLE_FUNC[Tabela: ID · Nome · Nível · Telefone]
    LISTA_FUNC -->|Clica em Novo Funcionário| FORM_FUNC[Formulário: Novo Funcionário]
    FORM_FUNC -->|Campos inválidos| FORM_FUNC_ERR[❌ Validação]
    FORM_FUNC_ERR --> FORM_FUNC
    FORM_FUNC -->|ID duplicado| DUP_FUNC[❌ ID já existe]
    DUP_FUNC --> FORM_FUNC
    FORM_FUNC -->|Salva| LISTA_FUNC

    %% ─── LOGOUT ──────────────────────────────────────────────────
    DASH --> LOGOUT[Logout]
    LOGOUT --> CLEAR_SESSION[Limpa sessionStorage] --> LOGIN

    %% ─── MIDDLEWARE / PROTEÇÃO ───────────────────────────────────
    RELOAD([Reload / Acesso direto a rota protegida]) --> CHECK_SESSION{sessionStorage tem sessão?}
    CHECK_SESSION -->|Sim| RESTORE[Restaura sessão → página solicitada]
    CHECK_SESSION -->|Não| LOGIN
```

---

## Mapa de Telas × Níveis de Acesso

| Tela | OPERADOR | ENGENHEIRO | ADMINISTRADOR |
|---|:---:|:---:|:---:|
| Login (`/`) | ✅ | ✅ | ✅ |
| Dashboard (`/dashboard`) | ✅ | ✅ | ✅ |
| Lista Aeronaves (`/aeronaves`) | ✅ | ✅ | ✅ |
| Nova Aeronave (`/aeronaves/nova`) | ❌ redirect | ✅ | ✅ |
| Detalhe Aeronave (`/aeronaves/[codigo]`) | ✅ | ✅ | ✅ |
| → Tab Peças (ver) | ✅ | ✅ | ✅ |
| → Tab Peças (nova peça) | ❌ botão oculto | ✅ | ✅ |
| → Tab Peças (evoluir status) | ✅ | ✅ | ✅ |
| → Tab Etapas (ver) | ✅ | ✅ | ✅ |
| → Tab Etapas (nova etapa) | ❌ botão oculto | ✅ | ✅ |
| → Tab Etapas (iniciar/finalizar) | ✅ | ✅ | ✅ |
| → Tab Testes (ver) | ✅ | ✅ | ✅ |
| → Tab Testes (registrar) | ❌ botão oculto | ✅ | ✅ |
| → Tab Relatório | ❌ tab oculta | ✅ | ✅ |
| Funcionários (`/funcionarios`) | ❌ redirect | ❌ redirect | ✅ |
| Novo Funcionário (`/funcionarios/novo`) | ❌ redirect | ❌ redirect | ✅ |

---

## Regras de Negócio no Frontend

1. **Sequência de etapas:** A etapa N só pode ser iniciada se a etapa N-1 estiver `CONCLUIDA`
2. **Status de peça:** Só avança em ordem (`EM_PRODUCAO → EM_TRANSPORTE → PRONTA`); não regride
3. **Relatório com pendências:** Exibe aviso se houver etapas não `CONCLUIDA` ou testes `REPROVADO`
4. **Sessão:** Persistida em `sessionStorage`; ao fechar o navegador, a sessão é descartada
5. **Permissões:** Hierarquia `ADMINISTRADOR > ENGENHEIRO > OPERADOR`

---

## Credenciais Mockadas

| Usuário | Senha | Nível |
|---|---|---|
| `admin` | `admin123` | ADMINISTRADOR |
| `eng01` | `eng123` | ENGENHEIRO |
| `eng02` | `eng456` | ENGENHEIRO |
| `op01` | `op123` | OPERADOR |
