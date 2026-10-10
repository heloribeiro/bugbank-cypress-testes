// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("register", () => {
  cy.visit("https://bugbank.netlify.app/");

  cy.contains("button", "Registrar").click();
});

Cypress.Commands.add(
  "registerInformation",
  (email, nome, senha, confirmaSenha) => {
    if (email) {
      cy.get('div.card__register input[placeholder="Informe seu e-mail"]').type(
        email,
      );
    }

    if (nome) {
      cy.get('div.card__register input[placeholder="Informe seu Nome"]').type(
        nome,
      );
    }

    if (senha) {
      cy.get('div.card__register input[placeholder="Informe sua senha"]').type(
        senha,
      );
    }

    if (confirmaSenha) {
      cy.get(
        'div.card__register input[placeholder="Informe a confirmação da senha"]',
      ).type(confirmaSenha);
    }
    cy.contains("button", "Cadastrar").click();
  },
);
