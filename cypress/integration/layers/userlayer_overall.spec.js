import 'cypress-file-upload'

const TEST_LAYER = 'injlamoU67'
const FILENAME = 'test-layer.zip';

const TEST_DATA = {
    OBJECTID: 99,
    STATE: 99, 
    COUNTY: 99,
    MERIDIAN: 99,
    TDIR: 99,
    RNG: 99,
    RDIR: 99,
    TWP: 99
}

let TEST_ROW = null

describe('User Layer', () => {
    beforeEach(() => {
        cy.login()
    })
      
    it('Import Test', () => {
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


    it('Edit & Save Test', () => {
        cy.get('#mainnavlist').contains('Layers').click()
        cy.get('#mainnavlist').find('#LayerSubmenu').contains(TEST_LAYER).click()

        cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
            cy.get('#datatable1 tbody tr input[type="checkbox"]').first().check().then( $val => {
                TEST_ROW = $val.val()

                cy.log(`Feature-${TEST_ROW} is selected.`)
                cy.get('.col-auto .editTableValues_button').click().then(async () => {
                    await Object.keys(TEST_DATA).map(key => {
                        cy.get(`#datatable1 tbody tr input[name="${TEST_ROW};${key}"]`).then(el => {
                            el.prop("disabled", false)
                            cy.get(`#datatable1 tbody tr input[name="${TEST_ROW};${key}"]`).clear().type(TEST_DATA[key])
                        })
                    })
                    cy.get('.col-auto #saveTableValues').click()
                })
            })
        })

        cy.visit('/')
        cy.get('#mainnavlist').contains('Layers').click()
        cy.get('#mainnavlist').find('#LayerSubmenu').contains(TEST_LAYER).click()

        cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
            Object.keys(TEST_DATA).map(key => {
                cy.get(`#datatable1 tbody tr td[id="${TEST_ROW};${key}"]`).should('be.contain', TEST_DATA[key])
            })

            cy.log('Edit & Save User Layer Successful!')
        })
    })


    it('Delete User Tesr', () => {
        cy.get('#mainnavlist').contains('Layers').click()

        cy.contains(TEST_LAYER).then(() => {
            cy.contains(TEST_LAYER).parent().parent().find('.layerinfo').click()
            cy.url().should('be.contain', 'layerinfo').then(url => {
                cy.log(url)
                cy.get('button[data-target="#deleteprojectmodal"]').click()

                cy.get('#deleteprojectmodal').should('have.class', 'show').then(() => {
                    cy.get('#deleteprojectinputname').clear().type(TEST_LAYER).then(() => {
                        cy.get('#deleteprojectmodalsubmitbutton').click()

                        cy.get('.alert-success').contains('Layer deleted').then(() => {
                            cy.log('Success alert!')
                            cy.contains('Layers').click()
                            cy.get('#mainnavlist').should('not.contain', TEST_LAYER).then(() => {
                                cy.log('Delete User Layer Successful')
                            })
                        })
                    })
                })
            })
        })
    })
  })