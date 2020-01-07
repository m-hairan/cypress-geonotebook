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

describe('Edit & Save Single Well', () => {
    before(() => {
        cy.login()
    })
      
    it('Test', () => {
        cy.get('#mainnavlist').contains('Layers').click()
        cy.get('#mainnavlist').find('#LayerSubmenu').contains('Wells').click()

        cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
            cy.get('#datatable1 tbody tr input[type="checkbox"]').first().check().then( $val => {
                TEST_ROW = $val.val()

                cy.log(`Well-${TEST_ROW} is selected.`)
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
        cy.get('#mainnavlist').find('#LayerSubmenu').contains('Wells').click()

        cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
            Object.keys(TEST_DATA).map(key => {
                cy.get(`#datatable1 tbody tr td[id="${TEST_ROW};${key}"]`).should('be.contain', TEST_DATA[key])
            })

            cy.log('Edit & Save Single Well Successful!')
        })
    })
  })