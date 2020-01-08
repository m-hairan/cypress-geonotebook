describe('Login', () => {
  it('Login Action', () => {
    cy.visit('/')
    cy.url().should('be.contain',  'qweqweqeqw').then(async (url) => {
      cy.log('Page loaded')
      cy.login()
    })
  })
})
