# SkyForge — Wireframes de Baixa Fidelidade

> Convenções: `[BTN]` = botão, `[INP]` = input, `[SEL]` = select/dropdown, `[TBL]` = tabela, `[---]` = separador, `(●)` = ativo/selecionado, `(○)` = inativo

---

## 1. TELA DE LOGIN (`/`)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│          🛩️  SKYFORGE                               │
│     Sistema de Gestão de Aeronaves                  │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │               ACESSO AO SISTEMA               │  │
│  │                                               │  │
│  │  Usuário                                      │  │
│  │  [INP: admin                               ]  │  │
│  │                                               │  │
│  │  Senha                                        │  │
│  │  [INP: ••••••••                            ]  │  │
│  │                                               │  │
│  │           [BTN: Entrar →              ]        │  │
│  │                                               │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  Estado de erro:                                    │
│  ┌───────────────────────────────────────────────┐  │
│  │ ❌ Usuário ou senha incorretos                │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  Estado de loading:                                 │
│           [BTN: ⏳ Entrando...          ]           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 2. LAYOUT BASE (Header + Sidebar)

```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER                                                           │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ 🛩️ SkyForge   [≡ Menu]          Carlos Silva  [ADMIN] [Sair]│ │
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌──────────┐  ┌────────────────────────────────────────────────┐ │
│ │ SIDEBAR  │  │ ÁREA DE CONTEÚDO                               │ │
│ │          │  │                                                │ │
│ │ 🏠 Dashboard   │  │  (página renderizada aqui)                     │ │
│ │          │  │                                                │ │
│ │ ✈️ Aeronaves│  │                                                │ │
│ │          │  │                                                │ │
│ │ 👥 Funcionários│ │                                               │ │
│ │  (só ADMIN)│ │                                                │ │
│ │          │  │                                                │ │
│ │          │  │                                                │ │
│ └──────────┘  └────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘

Badge de nível:
  ADMINISTRADOR → badge azul-escuro
  ENGENHEIRO    → badge índigo
  OPERADOR      → badge cinza
```

---

## 3. DASHBOARD (`/dashboard`)

```
┌─────────────────────────────────────────────────────────────────┐
│  Dashboard                                                      │
│  Bem-vindo de volta, Carlos!                                    │
│─────────────────────────────────────────────────────────────────│
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────┐ │
│  │ ✈️ Aeronaves  │ │ ⚙️ Em Andamento│ │ ❌ Reprovados│ │ ✅ Prontas│ │
│  │              │ │              │ │              │ │        │ │
│  │     3        │ │     2        │ │     1        │ │   8    │ │
│  │  cadastradas │ │   etapas     │ │   testes     │ │  peças │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └────────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  Aeronaves Recentes                          [Ver todas →]      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Código  │ Modelo           │ Tipo      │ Progresso       │   │
│  │─────────┼──────────────────┼───────────┼────────────────│   │
│  │ SF-001  │ Embraer E195-E2  │ COMERCIAL │ ████░░░░ 2/4   │   │
│  │ SF-002  │ F-39 Gripen      │ MILITAR   │ ██████░░ 3/4   │   │
│  │ SF-003  │ Cessna 172       │ COMERCIAL │ ░░░░░░░░ 0/3   │   │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. LISTA DE AERONAVES (`/aeronaves`)

### 4a. Estado: Lista com dados

```
┌─────────────────────────────────────────────────────────────────┐
│  Aeronaves                      [BTN: + Nova Aeronave]          │
│  3 aeronaves cadastradas        (visível só ENGENHEIRO+)        │
│─────────────────────────────────────────────────────────────────│
│  [INP: 🔍 Buscar por código ou modelo...                     ]  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Código │ Modelo          │ Tipo      │ Cap. │ Progresso  │   │
│  │────────┼─────────────────┼───────────┼──────┼───────────│   │
│  │ SF-001 │ Embraer E195-E2 │ COMERCIAL │ 146  │ ██░░ 2/4  │   │
│  │ SF-002 │ F-39 Gripen     │ MILITAR   │   1  │ ███░ 3/4  │   │
│  │ SF-003 │ Cessna 172      │ COMERCIAL │   4  │ ░░░░ 0/3  │   │
│  └─────────────────────────────────────────────────────────┘    │
│  (clicar em qualquer linha → /aeronaves/[codigo])               │
└─────────────────────────────────────────────────────────────────┘
```

### 4b. Estado: Lista vazia

```
┌─────────────────────────────────────────────────────────────────┐
│  Aeronaves                      [BTN: + Nova Aeronave]          │
│─────────────────────────────────────────────────────────────────│
│                                                                 │
│                       ✈️                                        │
│              Nenhuma aeronave cadastrada                        │
│          Comece cadastrando a primeira aeronave                 │
│          [BTN: + Cadastrar Aeronave]                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. FORMULÁRIO: NOVA AERONAVE (`/aeronaves/nova`)

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Voltar   Nova Aeronave                                       │
│─────────────────────────────────────────────────────────────────│
│                                                                 │
│  Código *                      Modelo *                         │
│  [INP: ex: SF-004           ] [INP: ex: Boeing 737 MAX       ]  │
│                                                                 │
│  Tipo *                        Capacidade (pax) *               │
│  [SEL: ▾ Selecione o tipo   ] [INP: ex: 189                  ]  │
│    ○ COMERCIAL                                                  │
│    ○ MILITAR                                                    │
│                                                                 │
│  Alcance (km) *                                                 │
│  [INP: ex: 6500                                              ]  │
│                                                                 │
│  Estado de erro inline:                                         │
│  [INP: SF-001  ] ← ❌ Este código já está em uso               │
│                                                                 │
│              [BTN: Cancelar]  [BTN: ✓ Cadastrar Aeronave]       │
│                                                                 │
│  Loading state do botão:                                        │
│              [BTN: Cancelar]  [BTN: ⏳ Salvando...]             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. DETALHE DA AERONAVE (`/aeronaves/[codigo]`)

### 6a. Topo — Resumo da Aeronave

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Aeronaves                                                    │
│                                                                 │
│  ✈️  SF-001 — Embraer E195-E2                 [COMERCIAL]        │
│  Capacidade: 146 pax · Alcance: 4.200 km                        │
│                                                                 │
│  Progresso das Etapas:                                          │
│  [████████░░░░░░░░░░░░]  2 de 4 etapas concluídas  (50%)       │
│                                                                 │
│  Resumo:                                                        │
│  ⚠️  2 peça(s) ainda em produção/transporte                     │
│  ❌  1 teste(s) reprovado(s)                                    │
│  ℹ️  Produção em andamento (2/4 etapas)                         │
│                                                                 │
│─────────────────────────────────────────────────────────────────│
│  [Tab: Peças (●)]  [Tab: Etapas (○)]  [Tab: Testes (○)]  [Tab: Relatório (○)]  │
└─────────────────────────────────────────────────────────────────┘
```

### 6b. Tab — Peças (com dados)

```
│  PEÇAS                                    [BTN: + Nova Peça]   │
│                                           (visível ENGENHEIRO+) │
│─────────────────────────────────────────────────────────────────│
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Nome          │ Tipo      │ Fornecedor  │ Status  │ Ação  │  │
│  │───────────────┼───────────┼─────────────┼─────────┼───── │  │
│  │ Motor CFM56   │ IMPORTADA │ CFM Intl.   │🟡 PROD. │ [→]  │  │
│  │ Asa Composta  │ NACIONAL  │ Embraer S/A │🔵 TRANS.│ [→]  │  │
│  │ Trem Pouso    │ IMPORTADA │ Safran      │🟢 PRONTA│  —   │  │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Badges de status:                                              │
│  🟡 EM_PRODUCAO   🔵 EM_TRANSPORTE   🟢 PRONTA                  │
│                                                                 │
│  [→] = botão "Evoluir Status" (visível para OPERADOR+)          │
│  Quando PRONTA: botão desabilitado / oculto                     │
```

### 6c. Tab — Peças (vazia)

```
│                    🔩                                           │
│         Nenhuma peça cadastrada nesta aeronave                  │
│     [BTN: + Adicionar Primeira Peça] (ENGENHEIRO+)             │
```

### 6d. Tab — Etapas (com dados — regra sequencial)

```
│  ETAPAS DE PRODUÇÃO               [BTN: + Nova Etapa]          │
│                                   (visível ENGENHEIRO+)         │
│─────────────────────────────────────────────────────────────────│
│                                                                 │
│  #1  Estrutura do Fuselagem                   Prazo: 2025-06-30 │
│      Status: 🟢 CONCLUÍDA                                       │
│      Funcionários: eng01, op01                                  │
│      [BTN: Associar Funcionário]                                │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  #2  Instalação de Sistemas                   Prazo: 2025-09-30 │
│      Status: 🟡 ANDAMENTO                    [BTN: Finalizar]   │
│      Funcionários: eng02                                        │
│      [BTN: Associar Funcionário]                                │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  #3  Pintura e Acabamento                     Prazo: 2025-11-30 │
│      Status: ⚪ PENDENTE                     [BTN: Iniciar 🔒]  │
│      Bloqueada: etapa #2 não concluída                          │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  #4  Testes em Solo                           Prazo: 2025-12-31 │
│      Status: ⚪ PENDENTE                     [BTN: Iniciar 🔒]  │
│      Bloqueada: etapa #3 não concluída                          │
```

### 6e. Tab — Testes (com dados)

```
│  TESTES                           [BTN: + Registrar Teste]     │
│                                   (visível ENGENHEIRO+)         │
│─────────────────────────────────────────────────────────────────│
│  ┌──────────────────────────────────────────┐                  │
│  │ Tipo           │ Resultado               │                  │
│  │────────────────┼─────────────────────────│                  │
│  │ ELETRICO       │ ✅ APROVADO             │                  │
│  │ HIDRAULICO     │ ❌ REPROVADO            │                  │
│  │ AERODINAMICO   │ ✅ APROVADO             │                  │
│  └──────────────────────────────────────────┘                  │
│                                                                 │
│  Badges:  ✅ verde = APROVADO   ❌ vermelho = REPROVADO         │
```

### 6f. Tab — Testes (vazia)

```
│                    🧪                                           │
│        Nenhum teste registrado nesta aeronave                   │
│     [BTN: + Registrar Primeiro Teste] (ENGENHEIRO+)            │
```

### 6g. Tab — Relatório (ENGENHEIRO+)

```
│  RELATÓRIO DE ENTREGA                                           │
│─────────────────────────────────────────────────────────────────│
│                                                                 │
│  Estado: com pendências                                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ⚠️  ATENÇÃO — Existem pendências na aeronave             │  │
│  │   • 2 etapa(s) não concluída(s)                          │  │
│  │   • 1 teste(s) reprovado(s)                              │  │
│  │   Deseja gerar o relatório mesmo assim?                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Nome do Cliente *                                              │
│  [INP: ex: Força Aérea Brasileira                            ]  │
│                                                                 │
│  Data de Entrega *                                              │
│  [INP: ex: 2025-12-31                                        ]  │
│                                                                 │
│             [BTN: Cancelar]  [BTN: 📄 Gerar Relatório]          │
│                                                                 │
│  ─────────────────── PRÉVIA ──────────────────────────────────  │
│  ╔═══════════════════════════════════════════╗                  │
│  ║  RELATÓRIO DE ENTREGA — SKYFORGE          ║                  │
│  ║  Data: 2025-12-31  Cliente: FAB           ║                  │
│  ║  Aeronave: SF-001 — Embraer E195-E2       ║                  │
│  ║  COMERCIAL · 146 pax · 4200 km            ║                  │
│  ║  ...peças, etapas, testes...              ║                  │
│  ╚═══════════════════════════════════════════╝                  │
│                                                                 │
│  Tab oculta para OPERADOR (sem acesso)                          │
```

---

## 7. MODAL: NOVA PEÇA

```
  ┌────────────────────────────────────────┐
  │  Nova Peça                          [X]│
  │────────────────────────────────────────│
  │  Nome da Peça *                        │
  │  [INP: ex: Motor CFM56              ]  │
  │                                        │
  │  Fornecedor *                          │
  │  [INP: ex: CFM International        ]  │
  │                                        │
  │  Tipo *                                │
  │  [SEL: ▾ Selecione o tipo           ]  │
  │    ○ NACIONAL                          │
  │    ○ IMPORTADA                         │
  │                                        │
  │  Nota: Status inicia como EM_PRODUCAO  │
  │                                        │
  │    [BTN: Cancelar]  [BTN: ✓ Adicionar] │
  └────────────────────────────────────────┘
```

---

## 8. MODAL: NOVA ETAPA

```
  ┌────────────────────────────────────────┐
  │  Nova Etapa                         [X]│
  │────────────────────────────────────────│
  │  Nome da Etapa *                       │
  │  [INP: ex: Testes em Solo           ]  │
  │                                        │
  │  Prazo *                               │
  │  [INP: type=date  2025-12-31        ]  │
  │                                        │
  │  Nota: Status inicia como PENDENTE     │
  │                                        │
  │    [BTN: Cancelar]  [BTN: ✓ Adicionar] │
  └────────────────────────────────────────┘
```

---

## 9. MODAL: REGISTRAR TESTE

```
  ┌────────────────────────────────────────┐
  │  Registrar Teste                    [X]│
  │────────────────────────────────────────│
  │  Tipo de Teste *                       │
  │  [SEL: ▾ Selecione o tipo           ]  │
  │    ○ ELETRICO                          │
  │    ○ HIDRAULICO                        │
  │    ○ AERODINAMICO                      │
  │                                        │
  │  Resultado *                           │
  │  (●) ✅ APROVADO   (○) ❌ REPROVADO    │
  │                                        │
  │    [BTN: Cancelar]  [BTN: ✓ Registrar] │
  └────────────────────────────────────────┘
```

---

## 10. MODAL: ASSOCIAR FUNCIONÁRIO À ETAPA

```
  ┌────────────────────────────────────────┐
  │  Associar Funcionário               [X]│
  │  Etapa: Instalação de Sistemas         │
  │────────────────────────────────────────│
  │  Selecione o funcionário *             │
  │  [SEL: ▾ Selecione...               ]  │
  │    ○ eng01 — João Engenheiro           │
  │    ○ eng02 — Maria Técnica             │
  │    ○ op01  — Pedro Operador            │
  │                                        │
  │  Já associados: eng02                  │
  │                                        │
  │    [BTN: Cancelar]  [BTN: ✓ Associar]  │
  └────────────────────────────────────────┘
```

---

## 11. LISTA DE FUNCIONÁRIOS (`/funcionarios` — só ADMIN)

### 11a. Estado: Lista com dados

```
┌─────────────────────────────────────────────────────────────────┐
│  Funcionários                 [BTN: + Novo Funcionário]         │
│  4 funcionários cadastrados                                     │
│─────────────────────────────────────────────────────────────────│
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ ID    │ Nome              │ Nível         │ Telefone      │  │
│  │───────┼───────────────────┼───────────────┼───────────── │  │
│  │ 001   │ Carlos Admin      │ [ADMINISTRADOR│ 11-9999-0001  │  │
│  │ 002   │ João Engenheiro   │ [ENGENHEIRO]  │ 11-9999-0002  │  │
│  │ 003   │ Maria Técnica     │ [ENGENHEIRO]  │ 11-9999-0003  │  │
│  │ 004   │ Pedro Operador    │ [OPERADOR]    │ 11-9999-0004  │  │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 11b. Estado: Lista vazia

```
│                    👥                                           │
│          Nenhum funcionário cadastrado                          │
│      [BTN: + Cadastrar Primeiro Funcionário]                   │
```

---

## 12. FORMULÁRIO: NOVO FUNCIONÁRIO (`/funcionarios/novo`)

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Voltar   Novo Funcionário                                    │
│─────────────────────────────────────────────────────────────────│
│                                                                 │
│  ID *                          Nome *                           │
│  [INP: ex: 005               ] [INP: ex: Ana Souza           ]  │
│                                                                 │
│  Telefone *                    Endereço *                       │
│  [INP: ex: 11-9999-0005      ] [INP: ex: Rua das Flores, 10 ]  │
│                                                                 │
│  Usuário (login) *             Senha *                          │
│  [INP: ex: ana.souza         ] [INP: ••••••••                ]  │
│                                                                 │
│  Nível de Permissão *                                           │
│  [SEL: ▾ Selecione o nível                                  ]  │
│    ○ ADMINISTRADOR                                              │
│    ○ ENGENHEIRO                                                 │
│    ○ OPERADOR                                                   │
│                                                                 │
│              [BTN: Cancelar]  [BTN: ✓ Cadastrar Funcionário]    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 13. TOAST NOTIFICATIONS (Feedback Visual)

```
  Sucesso:    ┌──────────────────────────────────┐
              │ ✅ Aeronave cadastrada com sucesso│
              └──────────────────────────────────┘

  Erro:       ┌──────────────────────────────────┐
              │ ❌ Etapa anterior não concluída   │
              └──────────────────────────────────┘

  Aviso:      ┌──────────────────────────────────┐
              │ ⚠️  Há pendências na aeronave     │
              └──────────────────────────────────┘
```

---

## 14. ESTADOS GLOBAIS REUTILIZÁVEIS

### Skeleton (Loading)

```
│  ┌──────────────────────────────────────────────────┐  │
│  │ ░░░░░░░░░  │ ░░░░░░░░░░░░░░░░  │ ░░░░  │ ░░░░░  │  │
│  │ ░░░░░░░░░  │ ░░░░░░░░░░░░░░░░  │ ░░░░  │ ░░░░░  │  │
│  │ ░░░░░░░░░  │ ░░░░░░░░░░░░░░░░  │ ░░░░  │ ░░░░░  │  │
│  └──────────────────────────────────────────────────┘  │
```

### 403 / Acesso Negado (não-ADMIN em /funcionarios)

```
│                    🔒                                  │
│              Acesso Negado                             │
│   Você não tem permissão para acessar esta página      │
│         Redirecionando para o Dashboard...             │
```
