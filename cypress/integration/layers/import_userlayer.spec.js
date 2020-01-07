import 'cypress-file-upload'

const TEST_LAYER = 'injlamoU67'
const FILENAME = 'test-layer.zip';

describe('Import User Layer', () => {
    before(() => {
        cy.login()
    })
      
    it('Test', () => {
        cy.get('#mainnavlist').contains('Layers').click()
        cy.get('#mainnavlist').contains('Layers').parent().get('#addnewlayericon').click()

        cy.get('#layernew').should('have.css', 'display', 'block').then(() => {
            cy.fixture(FILENAME).then(fileContent => {
                cy.get('#USER_layer_file').upload(
                    { fileContent: fileContent, fileName:FILENAME, mimeType: 'application/zip'}
                ).then(() => {
                    cy.url().should('be.contain', 'addlayer').then(() => {
                        cy.get('#content-block form input[name="name"]').first().clear().type(TEST_LAYER).then(() => {
                            cy.get('button[type="submit"]').contains('Submit').click()
                            cy.contains('Layers').click()
                            cy.get('#mainnavlist').should('contain', TEST_LAYER).then(() => {
                                cy.log('Import User Layer Successful')
                            })
                        })
                    })
                })
            });
        })
    })
  })