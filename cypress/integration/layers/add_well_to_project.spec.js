import '@4tw/cypress-drag-drop';

const PROJECT_NAME = 'injprioU68'

describe('Add Well To Project', () => {
    before(() => {
        cy.login()
    })
      
    // it('Test', () => {
    //     cy.get('#mainnavlist').contains('Layers').click()
    //     cy.get('#mainnavlist').find('#LayerSubmenu').contains('Wells').click()

    //     cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {

    //         cy.get('#datatable1 tbody tr .sorting_1 .tablerowmenu button').first().click()
    //         cy.get('#datatable1 tbody tr .sorting_1 .tablerowmenu .dropdown-menu').first().contains('Projects').click()


    //         cy.get('#projectboardmodal').should('have.class', 'show')

    //         cy.wait(1000)


    //         cy.get('#projectboardmodal').contains(PROJECT_NAME).parent()
    //             .parent().dragTo("#projectboardmodal #add_P_feature");

    //         // cy.get('#projectboardmodal').contains(PROJECT_NAME).parent()
    //         //     .parent()
    //         //     .trigger('mousedown', { which: 1})
    //         //     .trigger('mousemove', { screenX: 327, screenY: 383 }, {force: true})
    //         //     .trigger('mouseup',  {force: true})

    //         // cy.get('#projectboardmodal .myprojects').contains(PROJECT_NAME).parent()
    //         //     .parent().drag('#projectboardmodal .featureprojects .projectboard-item:last-child', {force: true})

            
    //         // cy.get('#projectboardmodal #updateP_feature').click()
           
            
    //         // cy.get('#datatable1 tbody tr input[type="checkbox"]').first().check().then( $val => {
    //         //     TEST_ROW = $val.val()

    //         //     cy.log(`Well-${TEST_ROW} is selected.`)
    //         //     cy.get('.col-auto .editTableValues_button').click().then(async () => {
    //         //         await Object.keys(TEST_DATA).map(key => {
    //         //             cy.get(`#datatable1 tbody tr input[name="${TEST_ROW};${key}"]`).then(el => {
    //         //                 el.prop("disabled", false)
    //         //                 cy.get(`#datatable1 tbody tr input[name="${TEST_ROW};${key}"]`).clear().type(TEST_DATA[key])
    //         //             })
    //         //         })
    //         //         cy.get('.col-auto #saveTableValues').click()
    //         //     })
    //         // })
    //     })

    //     // cy.visit('/')
    //     // cy.get('#mainnavlist').contains('Layers').click()
    //     // cy.get('#mainnavlist').find('#LayerSubmenu').contains('Wells').click()

    //     // cy.get('#PanelB').should('not.have.class', 'panel-bottom-hide').then(() => {
    //     //     Object.keys(TEST_DATA).map(key => {
    //     //         cy.get(`#datatable1 tbody tr td[id="${TEST_ROW};${key}"]`).should('be.contain', TEST_DATA[key])
    //     //     })

    //     //     cy.log('Edit & Save Single Well Successful!')
    //     // })
    // })
  })