const TEST_PROJECT = 'injprioU68'
let ACTIVE = false

describe('Change Active Project', () => {
    before(() => {
        cy.login()
    })

    const changeActive = () => {
        cy.contains(TEST_PROJECT).first().find('.icongrow').last().then($pro => {
            if($pro.hasClass('projectactive'))
                ACTIVE = true
            else ACTIVE = false

            if(!ACTIVE)
                cy.get('.projectactive').click()

            cy.contains(TEST_PROJECT).first().find('.icongrow').last().click()
            cy.get('#Refreshproject').click()

            cy.get('#mainnavlist').contains('Projects').click()
            cy.contains(TEST_PROJECT).first().find('.icongrow').last().then($p => {
                if((!ACTIVE && $p.hasClass('projectactive')) || (ACTIVE && !$p.hasClass('projectactive')))
                    cy.log(!ACTIVE?'Successfully activated':'Successfully diactivated')
                else throw new Error("Failed")
            })
        })
    }
      
    it('Test', () => {
        cy.get('#mainnavlist').contains('Projects').click()
        changeActive()
        changeActive()
    })
  })