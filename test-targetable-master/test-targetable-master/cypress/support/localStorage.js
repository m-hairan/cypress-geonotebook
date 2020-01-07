let LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add('saveLocalStorage', () => {
  cy.log('Saving localStorage....', localStorage)
  
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key]
  })
})

Cypress.Commands.add('restoreLocalStorage', () => {
  cy.log('Restoring localStorage....', localStorage)

  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})

Cypress.Commands.add('clearLocalStorage', () => {
  cy.log('Clearing localStorage....', localStorage)

  Object.keys(localStorage).forEach((key) => {
    localStorage.removeItem(key)
  })
})
