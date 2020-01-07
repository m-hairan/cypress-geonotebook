const TEST_LAYER = 'injlamoU67'
import '@4tw/cypress-drag-drop';

describe('Change Layer Order', () => {
    before(() => {
        cy.login()
    })
      
    // it('Test', () => {
    //     cy.get('#mainnavlist').contains('Layers').click()

    //     // cy.contains(TEST_LAYER).then(() => {
    //     //     cy.contains(TEST_LAYER).parent().parent()
    //     //     .trigger('mousedown', 'left', { which: 1, clientX: 24, clientY: 270, pageX:24})
    //     //     // .trigger('mousemove', { clientX: 23, clientY: 200 })
    //     //     .trigger('mouseup',  {force: true})
    //     // })


    //     cy.contains(TEST_LAYER).parent().parent().find('.drag-icon')
    //     .drag('.board-column-content', 'top')
    // })
  })