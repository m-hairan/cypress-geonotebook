const TEST_LAYER = 'injlamoU67'
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

describe('Edit & Save User Layer', () => {
    before(() => {
        cy.login()
    })
      
    it('Test', () => {
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
  })