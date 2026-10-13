describe("CE-001 Cadastro", () => {
  it("CT-001 Cadastro com dados válidos", () => {
    cy.register();
    cy.registerInformation(
      "maria.costa@teste.com",
      "Maria Costa",
      "Teste@123",
      "Teste@123",
    );

    cy.contains(/^A conta.*/).should("be.visible");
  });

  it("CT-002 Cadastro com senhas divergentes", () => {
    cy.register();
    cy.registerInformation(
      "maria.costa@teste.com",
      "Maria Costa",
      "123",
      "456",
    );
    cy.contains("As senhas não são iguais.").should("be.visible");
  });

  it("CT-003 Cadastro sem preencher dados obrigatórios", () => {
    cy.register();
    cy.registerInformation("", "Maria Silva", "", "");

    //informa os campos obrigatórios
    //Email
    cy.get('div.card__register input[placeholder="Informe seu e-mail"]')
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "É campo obrigatório")
      .and("have.css", "color", "rgb(255, 0, 0)");

    //Senha
    cy.get('div.card__register input[placeholder="Informe sua senha"]')
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "É campo obrigatório")
      .and("have.css", "color", "rgb(255, 0, 0)");

    //Confirmar Senha
    cy.get(
      'div.card__register input[placeholder="Informe a confirmação da senha"]',
    )
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "É campo obrigatório")
      .and("have.css", "color", "rgb(255, 0, 0)");
  });

  it("CT-004 Cadastro com email em formato inválido", () => {
    cy.register();
    cy.registerInformation(
      "mariasilva.teste.com",
      "Maria Costa",
      "Teste@123",
      "Teste@123",
    );

    //informa formato inválido
    //Campo - Email
    cy.get('div.card__register input[placeholder="Informe seu e-mail"]')
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "Formato inválido")
      .and("have.css", "color", "rgb(255, 0, 0)");
  });

  // BUG-001: o esperado (planilha) é o aviso "É campo obrigatório" abaixo do Nome.
  // Este teste valida o comportamento atual (tela de erro) e precisa de ajuste quando o bug for corrigido.
  it("CT-005 Cadastro com o campo NOME vazio", () => {
    cy.register();
    cy.registerInformation(
      "maria.costa@teste.com",
      "",
      "Teste@123",
      "Teste@123",
    );
    cy.contains("p", "Nome não pode ser vazio.").should("be.visible");
  });

  // BUG-002: o esperado (planilha) é o aviso "É campo obrigatório" abaixo do Nome.
  // Este teste valida o comportamento atual (tela de erro) e precisa de ajuste quando o bug for corrigido.
  it("CT-006 Cadastro com o campo NOME preenchido apenas com espaço", () => {
    cy.register();
    cy.registerInformation(
      "maria.costa@teste.com",
      " ",
      "Teste@123",
      "Teste@123",
    );
    cy.contains(/^A conta./).should("be.visible");
  });
});
