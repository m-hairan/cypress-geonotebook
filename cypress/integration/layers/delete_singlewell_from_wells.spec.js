let TEST_ROW = null

describe('Delete Singlewell From Wells', () => {
    before(() => {
        cy.login()
    })
      
    it('Test', () => {
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
  })