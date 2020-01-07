const fileName = 'downloadtest'
const downloadsFolder = require('downloads-folder');
const TEST_LAYER = 'injlamoU67'

describe('Edit & Save Single Well', () => {
    before(() => {
        cy.login()
    })
      
    // it('Export SHP ', () => {
    //     cy.get('#mainnavlist').contains('Layers').click()
    //     cy.get('#mainnavlist').find('#LayerSubmenu').contains(TEST_LAYER).click()

    //     cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
    //         cy.get('#datatable1 tbody tr input[type="checkbox"]').first().check().then( $val => {
    //             cy.get('#exportFeatures').click().then(() => {
    //                cy.get('input[name="shp"]').check()
    //                cy.get('input[name="kml"]').check()
    //                cy.get('input[name="export_name"]').clear().type(fileName)
    //             //    cy.get('#ConfirmExport').click().then(() => {
    //             //         cy.visit('/')
    //             //    })
                  
    //             })
    //         })
    //     })
    // })
  })