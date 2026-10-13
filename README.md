# BugBank – Testes de Cadastro (Manual + Cypress)

Projeto de prática de QA: planejamento, execução manual, registro de evidências e bugs, e automação com **Cypress** do fluxo de **cadastro** do [BugBank](https://bugbank.netlify.app/), um banco fictício feito para treinar testes.

> Projeto em andamento, feito para fins de estudo. Próximo cenário previsto: Login.

## O que foi feito

- **Planejamento:** cenário, casos de teste positivos e negativos, com passos, dados de entrada, resultado esperado e obtido.
- **Execução manual:** evidências (prints) de cada caso.
- **Registro de bugs:** com passos para reproduzir, esperado × obtido, severidade e evidência.
- **Automação:** os 6 casos automatizados com Cypress, usando comandos personalizados (`cy.register` e `cy.registerInformation`).

## Cenário e casos de teste

**CE-001 – Cadastro**

| ID | Caso de teste | Tipo | Resultado na planilha | Cypress |
|---|---|---|---|---|
| CT-001 | Cadastro com dados válidos | Positivo | Aprovado | Verde |
| CT-002 | Cadastro com senhas divergentes | Negativo | Aprovado | Verde |
| CT-003 | Cadastro sem preencher dados obrigatórios | Negativo | Aprovado | Verde |
| CT-004 | Cadastro com e-mail em formato inválido | Negativo | Aprovado | Verde |
| CT-005 | Cadastro com o campo Nome vazio | Negativo | **Reprovado** (BUG-001) | Verde* |
| CT-006 | Cadastro com o campo Nome preenchido apenas com espaço | Negativo | **Reprovado** (BUG-002) | Verde* |

\* **Por que verde se está reprovado?** O CT-005 e o CT-006 automatizam o **comportamento atual** do site, que é onde o bug aparece. Na planilha, o status Reprovado compara o resultado com o esperado. Quando os bugs forem corrigidos, esses dois testes precisarão ser ajustados.

## Bugs encontrados

| ID | Descrição | Severidade |
|---|---|---|
| BUG-001 | Com o campo Nome vazio, o sistema exibe uma tela de erro ("Nome não pode ser vazio") em vez do aviso "É campo obrigatório" abaixo do campo, como nos demais campos obrigatórios. | Baixa |
| BUG-002 | O sistema aceita o campo Nome preenchido apenas com espaço e conclui o cadastro. | Média |

Detalhes, passos e evidências na pasta `docs/`.

## Tecnologias

- Cypress
- JavaScript
- Node.js
- Excel (planejamento e registro)

## Estrutura do projeto

```
BugBank/
├── cypress/
│   ├── e2e/register.cy.js        # os 6 casos de teste
│   └── support/commands.js       # comandos personalizados
├── docs/
│   ├── Planejamento_de_Testes.xlsx
│   ├── Evidências/CE-001/        # prints das execuções manuais
│   └── BUGS/                     # prints dos bugs
├── cypress.config.js
└── package.json
```

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
git clone https://github.com/heloribeiro/bugbank-cypress-testes.git
cd bugbank-cypress-testes
npm install
npx cypress open     # modo interativo
npx cypress run      # modo terminal
```

## Desafios e o que aprendi

- **Campos repetidos na página:** login e cadastro têm campos com o mesmo `name`, e o Cypress acusava "2 elementos". Resolvi delimitando o bloco do cadastro (`div.card__register`) antes de buscar o campo, em vez de usar a posição (`:nth-child`).
- **Campos vazios:** o Cypress não aceita `.type("")`. Usei `if` no comando personalizado para só digitar quando há valor, deixando o campo realmente vazio.
- **Validação nativa do navegador:** o balão "Inclua um @..." é do Chrome e não aparece no HTML. No CT-004 validei a mensagem "Formato inválido" do próprio site.
- **Validação de cor:** o Cypress compara a cor em `rgb(...)`, e um espaço a mais no valor faz o teste falhar.
- **Documentação × automação:** manter IDs iguais na planilha e nos nomes dos testes (CT-001, CT-002...) facilita ligar uma coisa à outra.

## Autora

**Heloisa Ribeiro** – estudando QA e automação de testes.
[LinkedIn](https://www.linkedin.com/in/heloisa-ribeiro/)
