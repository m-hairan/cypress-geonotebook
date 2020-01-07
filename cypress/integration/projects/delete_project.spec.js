const TEST_PROJECT = 'injprioU68'

describe('Delete Project', () => {
    before(() => {
        cy.login()
    })
      
    it('Test', () => {
        cy.get('#mainnavlist').contains('Projects').click()

        cy.contains(TEST_PROJECT).then(() => {
            cy.contains(TEST_PROJECT).find('.projectsettings').click()
            cy.url().should('be.contain', 'projects').then(url => {
                cy.log(url)
                cy.get('button[data-target="#deleteprojectmodal"]').click()

                cy.get('#deleteprojectmodal').should('have.class', 'show').then(() => {
                    cy.get('#deleteprojectinputname').clear().type(TEST_PROJECT).then(() => {
                        cy.get('#deleteprojectmodalsubmitbutton').click()
                    })
                })
            })
        })

        cy.visit('/')
        cy.get('#mainnavlist').contains('Projects').click()
        cy.get('#mainnavlist').should('not.contain', TEST_PROJECT).then(() => {
            cy.log('Delete Project Successful')
        })
    })
  })