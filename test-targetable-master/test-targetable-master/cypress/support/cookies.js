
let COOKIE_MEMORY = {}

// Cypress.Cookies.debug(true)


Cypress.Commands.add('saveCookieStorage', () => {
  const cookies = cy.getCookies({ log: true })

  cy.log('Saving cookies....', cookies)

  COOKIE_MEMORY = cookies
})

Cypress.Commands.add('restoreCookieStorage', () => {
  cy.log('Restoring cookies....', COOKIE_MEMORY)

//   Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
//     localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
//   })
})

Cypress.Commands.add('clearCookieStorage', () => {
  cy.log('Clearing cookie....', COOKIE_MEMORY)

  cy.clearCookies()
  COOKIE_MEMORY = {}
})
