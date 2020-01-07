
const TEST_LAYER = 'injlamoU67' + new Date().getTime()
let TEST_ROW = null

describe('Edit Menu from Feature Menu', () => {
    before(() => {
        cy.login()
    })
      
    // it('Test', () => {
    //     cy.get('#mainnavlist').contains('Layers').click()
    //     cy.get('#mainnavlist').find('#LayerSubmenu').contains(TEST_LAYER).click()

    //     cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
    //         cy.get('#datatable1 tbody tr .tablerowmenu button').first().click().then(() => {
    //             cy.get('#datatable1 tbody tr .tablerowmenu').contains('Edit').click()

    //             cy.get('#PanelB #accordion').contains('Geometry').click()
    //             cy.get('#geogra_coor tbody tr').first().find('input').first().clear().type('99')
    //             cy.get('#geogra_coor tbody tr').first().find('input').last().clear().type('99')

    //             cy.get('#saveEditedFeatures').click()
    //         })
    //     })
    // })
  })