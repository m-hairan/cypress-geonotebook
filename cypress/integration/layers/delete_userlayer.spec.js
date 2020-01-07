const TEST_LAYER = 'injlamoU67'

describe('Delete User Layer', () => {
    before(() => {
        cy.login()
    })
      
    // it('Test', () => {
    //     cy.get('#mainnavlist').contains('Layers').click()

    //     cy.contains(TEST_LAYER).then(() => {
    //         cy.contains(TEST_LAYER).parent().parent().find('.layerinfo').click()
    //         cy.url().should('be.contain', 'layerinfo').then(url => {
    //             cy.log(url)
    //             cy.get('button[data-target="#deleteprojectmodal"]').click()

    //             cy.get('#deleteprojectmodal').should('have.class', 'show').then(() => {
    //                 cy.get('#deleteprojectinputname').clear().type(TEST_LAYER).then(() => {
    //                     cy.get('#deleteprojectmodalsubmitbutton').click()

    //                     cy.get('.alert-success').contains('Layer deleted').then(() => {
    //                         cy.log('Success alert!')
    //                         cy.contains('Layers').click()
    //                         cy.get('#mainnavlist').should('not.contain', TEST_LAYER).then(() => {
    //                             cy.log('Delete User Layer Successful')
    //                         })
    //                     })
    //                 })
    //             })
    //         })
    //     })
    // })
  })