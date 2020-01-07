const TEST_PROJECT = 'injlamoU68' + new Date().getTime()
const FILENAME = 'test-well.zip';
let ACTIVE = false

describe('Project Overall Test', () => {
    beforeEach(() => {
        cy.login()
    })

    const changeActive = () => {
        cy.contains(TEST_PROJECT).first().find('.icongrow:last-child').then($pro => {
            if($pro.hasClass('projectactive'))
                ACTIVE = true
            else ACTIVE = false

            if(!ACTIVE)
                cy.get('.projectactive').click()

            cy.contains(TEST_PROJECT).first().find('.icongrow').last().click()
            cy.get('#Refreshproject').click()

            cy.get('#mainnavlist').contains('Projects').click()
            cy.contains(TEST_PROJECT).first().find('.icongrow:last-child').then($p => {
                if((!ACTIVE && $p.hasClass('projectactive')) || (ACTIVE && !$p.hasClass('projectactive')))
                    cy.log(!ACTIVE?'Successfully activated':'Successfully diactivated')
                else throw new Error("Failed")
            })
        })
    }
      
    it('New Project', () => {
        cy.get('#mainnavlist').contains('Projects').click()
        cy.get('#mainnavlist #addnewprojecticon').click()
        cy.get('#newprojectnameinput1').clear().type(TEST_PROJECT)
        cy.get('#projectnew').submit()

        cy.visit('/')
        cy.get('#mainnavlist').contains('Projects').click()
        cy.get('#mainnavlist').find('#ProjectsSubmenu').should('contain', TEST_PROJECT).then(() => {
            cy.log('Create project successful.')
        })
    })


    it('Change Project status', () => {
        cy.visit('/')
        cy.get('#mainnavlist').contains('Projects').click()
        changeActive()
        changeActive()
    })


    it('Delete Project', () => {
        cy.visit('/')
        cy.get('#mainnavlist').contains('Projects').click()

        cy.contains(TEST_PROJECT).then(() => {
            cy.contains(TEST_PROJECT).find('.projectsettings').click()
            cy.wait(2000)
            cy.url().should('be.contain', 'projects').then(url => {
                cy.log(url)
                cy.get('button[data-target="#deleteprojectmodal"]').click()

                cy.get('#deleteprojectmodal').should('have.class', 'show').then(() => {
                    cy.get('#deleteprojectinputname').clear().type(TEST_PROJECT).then(() => {
                        cy.get('#deleteprojectmodalsubmitbutton').click()
                    })
                })
            })
        })

        cy.visit('/')
        cy.get('#mainnavlist').contains('Projects').click()
        cy.get('#mainnavlist').should('not.contain', TEST_PROJECT).then(() => {
            cy.log('Delete Project Successful')
        })
    })
  })