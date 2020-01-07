const TEST_PROJECT = 'injprioU68'
const FILENAME = 'test-well.zip';

describe('Import a shapefile to wells', () => {
    before(() => {
        cy.login()
    })
      
    // it('Test', () => {
    //     cy.get('#mainnavlist').contains('Projects').click()
    //     cy.get('#mainnavlist #addnewprojecticon').click()
    //     cy.get('#newprojectnameinput1').clear().type(TEST_PROJECT)
    //     cy.get('#projectnew').submit()

    //     cy.visit('/')
    //     cy.get('#mainnavlist').contains('Projects').click()
    //     cy.get('#mainnavlist').find('#ProjectsSubmenu').should('contain', TEST_PROJECT).then(() => {
    //         cy.log('Create project successful.')
    //     })
    // })
  })