const TEST_LAYER = 'injlamoU67'
let TEST_ROW = null

describe('Delete Single Feature From User Layer', () => {
    before(() => {
        cy.login()
    })
      
    it('Test', () => {
        cy.get('#mainnavlist').contains('Layers').click()
        cy.get('#mainnavlist').find('#LayerSubmenu').contains(TEST_LAYER).click()

        cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
            cy.get('#datatable1 tbody tr input[type="checkbox"]').first().check().then($val => {
                TEST_ROW = $val.val()

                cy.log(`Feature-${TEST_ROW} is selected.`)
                cy.get('.col-auto .editTableValues_button').click()
                cy.get('.col-auto #deleteTableValues').click()
                cy.get('#confirmdelete').find('button').contains('Delete').click()
                
                cy.visit('/')
                cy.get('#mainnavlist').contains('Layers').click()
                cy.get('#mainnavlist').find('#LayerSubmenu').contains(TEST_LAYER).click()
                cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
                    if(TEST_ROW !== null){
                        cy.get('#datatable1 tbody tr input[type="checkbox"]').first().should('not.have.value', TEST_ROW)

                        cy.log(`Feature-${TEST_ROW} is deleted.`)
                        cy.log('Delete Single Feature Successful')
                    } else {
                        throw new Error("No feature selected")
                    }
                })
            })
        })
    })
  })