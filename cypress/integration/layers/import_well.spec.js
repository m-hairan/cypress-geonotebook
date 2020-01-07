import 'cypress-file-upload'

const TEST_LAYER = 'injlamoU68'
const FILENAME = 'test-well.zip';

describe('Import a shapefile to wells', () => {
    before(() => {
        cy.login()
    })
      
    it('Test', () => {
        cy.get('#mainnavlist').contains('Layers').click()
        cy.get('#mainnavlist').find('#LayerSubmenu').contains('Wells').parent().parent().find('.uploadlayer').click()

        cy.get('#layernew').should('have.css', 'display', 'block').then(() => {
            cy.fixture(FILENAME).then(fileContent => {
                cy.get('#USER_layer_file').upload(
                    { fileContent: fileContent, fileName:FILENAME, mimeType: 'application/zip'}
                ).then(() => {
                    cy.url().should('be.contain', 'upload/WELLS').then(() => {
                        cy.get('#content-block button[type="submit"]').contains('Submit').click()

                        cy.get('.alert-success').contains('succesfully uploaded').then(() => {
                            cy.get('#mainnavlist').contains('Layers').click()
                            cy.get('#mainnavlist').find('#LayerSubmenu').contains('Wells').click()
                            cy.log('Import Well Successful')
                        })
                        
                    })
                })
            });
        })
    })
  })