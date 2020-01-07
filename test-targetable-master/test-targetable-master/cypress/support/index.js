// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@applitools/eyes-cypress/commands'


// Import commands.js using ES2015 syntax:
import './commands'
// Disable cookies and storage
// import './localStorage'
// import './cookies'


// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(function () {
  // cy.restoreLocalStorage()
  // cy.restoreCookieStorage()
})

afterEach(() => {
  // cy.saveLocalStorage()
  // cy.saveCookieStorage()
})
Cypress.Cookies.defaults({
  whitelist: (cookie) => {
    return true
    // implement your own logic here
    // if the function returns truthy
    // then the cookie will not be cleared
    // before each test runs
  }
  // whitelist: ['ASP.NET_SessionId', '__cfduid', 'ARRAffinity'],
})

Cypress.on('uncaught:exception', (err, runnable) => {
  cy.log('uncaught:exception', err)

  return false
})

Cypress.on('fail', (err) => {
  cy.log('fail', err)
})
