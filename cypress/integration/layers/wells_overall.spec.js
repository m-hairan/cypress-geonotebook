import 'cypress-file-upload'

const TEST_LAYER = 'injlamoU68'
const FILENAME = 'test-well.zip';
const exportFile = 'downloadtest'

const TEST_DATA = {
    API_NUM: 99,
    POOL_CODE: 99, 
    POOL_NAME: 99,
    WELL_NAME: 99,
    WELL_NUM: 99,
    OP_NAME: 99,
    ELEVATION: 9999,
}

let TEST_ROW = null

describe('Wells Overall Test', () => {
    beforeEach(() => {
        cy.login()
    })
      
    it('Import wells', () => {
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

    it('Edit & Save Wells', () => {
        cy.visit('/')
        cy.get('#mainnavlist').contains('Layers').click()
        cy.get('#mainnavlist').find('#LayerSubmenu').contains('Wells').click()

        cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
            cy.get('#datatable1 tbody tr input[type="checkbox"]').first().check().then( $val => {
                TEST_ROW = $val.val()

                cy.log(`Well-${TEST_ROW} is selected.`)
                cy.get('.col-auto .editTableValues_button').click().then(async () => {
                    cy.wait(1000)
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
        cy.get('#mainnavlist').find('#LayerSubmenu').contains('Wells').click()

        cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
            Object.keys(TEST_DATA).map(key => {
                cy.get(`#datatable1 tbody tr td[id="${TEST_ROW};${key}"]`).should('be.contain', TEST_DATA[key])
            })

            cy.log('Edit & Save Single Well Successful!')
        })
    })


    it('Delete singlewell from wells', () => {
        cy.visit('/')
        cy.get('#mainnavlist').contains('Layers').click()
        cy.get('#mainnavlist').find('#LayerSubmenu').contains('Wells').click()

        cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
            cy.get('#datatable1 tbody tr input[type="checkbox"]').first().check().then($val => {
                TEST_ROW = $val.val()

                cy.log(`Well-${TEST_ROW} is selected.`)
                cy.get('.col-auto .editTableValues_button').click()
                cy.get('.col-auto #deleteTableValues').click()
                cy.get('#confirmdelete').find('button').contains('Delete').click()
                
                cy.visit('/')
                cy.get('#mainnavlist').contains('Layers').click()
                cy.get('#mainnavlist').find('#LayerSubmenu').contains('Wells').click()
                cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
                    if(TEST_ROW !== null){
                        cy.get('#datatable1 tbody tr input[type="checkbox"]').first().should('not.have.value', TEST_ROW)

                        cy.log(`Well-${TEST_ROW} is deleted.`)
                        cy.log('Delete Single Well Successful')
                    } else {
                        throw new Error("No well selected")
                    }
                })
            })
        })
    })


    it('Export SHP ', () => {
        cy.visit('/')
        cy.get('#mainnavlist').contains('Layers').click()
        cy.get('#mainnavlist').find('#LayerSubmenu').contains('Wells').click()

        cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
            cy.get('#datatable1 tbody tr input[type="checkbox"]').first().check().then( $val => {
                cy.get('#exportFeatures').click().then(() => {
                   cy.get('input[name="shp"]').check()
                   cy.get('input[name="kml"]').check()
                   cy.get('input[name="export_name"]').clear().type(exportFile)
                //    cy.get('#ConfirmExport').click()

                })
            })
        })
    })

  })