const fileName = 'downloadtest'
const downloadsFolder = require('downloads-folder');

describe('Export Well', () => {
    before(() => {
        cy.login()
    })
      
    it('Export SHP ', () => {
        cy.get('#mainnavlist').contains('Layers').click()
        cy.get('#mainnavlist').find('#LayerSubmenu').contains('Wells').click()

        cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
            cy.get('#datatable1 tbody tr input[type="checkbox"]').first().check().then( $val => {
                cy.get('#exportFeatures').click().then(() => {
                   cy.get('input[name="shp"]').check()
                   cy.get('input[name="kml"]').check()
                   cy.get('input[name="export_name"]').clear().type(fileName)
                //    cy.get('#ConfirmExport').click()

                })
            })
        })
    })
  })