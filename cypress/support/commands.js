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
Cypress.Commands.add("login", () => { 
    cy.visit('/')
    cy.fixture('auth').then(auth => {
        cy.get('.form-signin').find('input[id="id_username"]').clear().type(auth.id)
        cy.get('.form-signin').find('input[id="id_password"]').clear().type(auth.password)
        cy.get('button[type="submit"]').click()
  
        // debugger
        cy.fixture('constants').then(async cons => {
            await cy.url().should('be.contain', cons.base_url).then((url) => {
                cy.log('Login succeed')
              })
        })
    })
})
//
//
// -- This is a child command --
Cypress.Commands.add("dragTo", { prevSubject: 'element'}, (subject, targetEl) => { 
    cy.wrap(subject).trigger("dragstart");
    cy.get(targetEl).trigger("drop");
})
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
