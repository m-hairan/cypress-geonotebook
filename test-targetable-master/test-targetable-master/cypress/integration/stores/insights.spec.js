/// <reference types="Cypress" />

import * as CONSTS from '../../constants'

context('stores.insights', () => {
  const fillInsightForm = (form) => {
    for (let key in form) {
      if (key === 'headline') {
        // Insight Headline
        cy.fillTextInput({
          type: 'label',
          sKey: 'Insight Headline',
          value: form[key],
        })
      } else if (key === 'content') {
        // Insight Content
        cy.fillTextArea({
          type: 'placeholder',
          sKey: 'We have identified a trend in families and children liking your menu for...',
          value: form[key],
        })
      } else if (key === 'date') {
        // Insight Date
        // cy.get('p:contains(Appear in Smartfeed)').parent().children('input:eq(0)')
        //   .then((ele) => {
        //     ele.val('some text');
        //   })
        // cy.get('.MuiFormControl-root:nth(2) input:first')
        //   .type('November 22th', { force: true })

      }
    }
  }
  const newDraftInsight = {
    headline: 'Test Draft Insight',
    content: 'lorem ipsum',
    // date: new Date(),
  }
  const newPublishInsight = {
    headline: 'Test New Publish Insight',
    content: 'lorem ipsum',
    // date: new Date(),
  }
  const newDirectPublishInsight = {
    headline: 'Test Direct Publish Insight1',
    content: 'lorem ipsum',
    // date: new Date(),
  }
  const newDirectPublishInsightFuture = {
    headline: 'Test Direct Publish Insight Future',
    content: 'lorem ipsum',
    date: new Date(),
  }


  before(() => {
    cy.login(CONSTS.AUTH_EMAIL, CONSTS.AUTH_PASSWORD)
    cy.url().should('be.contain',  `${CONSTS.ADMIN_BASE}`)
    CONSTS.ENABLE_EYES && cy.eyesOpen({})

    // cy.eyesOpen({
    //   browser: { width: 400, height: 600 },
    // })
  })

  after(() => {
    CONSTS.ENABLE_EYES && cy.eyesClose({})
  })

  it('should do validation', () => {
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    cy.clickBtnByLabel({ label: 'Insights', type: 1 })
  
    // headline should not be empty
    cy.get('.MuiFormControl-root:nth(0) input:first').trigger('focus')
    cy.get('.MuiFormControl-root:nth(0) input:first').trigger('blur')
    cy.contains('Save Draft').should('not.exist')
    cy.get('.MuiFormControl-root').eq(0).find('.Mui-error').should('have.length.gte', 1)
  })

  it('should create an insight and save as draft', () => {
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    cy.clickBtnByLabel({ label: 'Insights', type: 1 })
  
    // Fill form and save
    fillInsightForm(newDraftInsight)
    cy.clickBtnByLabel({ label: 'Save Draft' })


    // Check if it's created properly
    cy.url().should('be.equal', `${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)

    cy.contains(newDraftInsight.headline)
      .should('have.length.gte', 1)
      .should('contain', newDraftInsight.content)
    
    // Confirm buttons are existing
    
    cy.contains(newDraftInsight.headline)
      .parent()
      .within(() => {
        cy.root().find('button:nth(1)').contains('Publish')
        cy.root().find('button:nth(2)').contains('edit')
      })
  })

  it('should edit => yes/no work', () => {
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
  
    /*  Check edit and click cancel => no */
    // Click edit, modify and cancel
    cy.clickBtnByLabel({ label: 'edit' })
    newDraftInsight.headline = 'New Test Draft Headline'
    fillInsightForm({ headline: newDraftInsight.headline })
    cy.clickBtnByLabel({ label: 'Cancel' })
    // should show modal and click no
    cy.get('.MuiDialog-root').should('have.length.gte', 1)
    cy.get('.MuiDialog-root').within(() => {
      cy.clickBtnByLabel({ label: 'No' })
    })
    cy.url().should('not.eq', `${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)


    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
  
    /*  Check edit and click cancel => yes */
    // Click edit, modify and cancel
    cy.clickBtnByLabel({ label: 'edit' })
    newDraftInsight.headline = 'New Test Draft Headline'
    fillInsightForm({ headline: newDraftInsight.headline })
    cy.clickBtnByLabel({ label: 'Cancel' })
    // should show modal and click no
    cy.get('.MuiDialog-root').should('have.length.gte', 1)
    cy.get('.MuiDialog-root').within(() => {
      cy.clickBtnByLabel({ label: 'Yes' })
    })
    cy.url().should('be.eq', `${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
  })
  
  it('should create an insight and save as draft and publish', () => {
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    cy.clickBtnByLabel({ label: 'Insights', type: 1 })
  
    // Fill form and save
    fillInsightForm(newPublishInsight)
    cy.clickBtnByLabel({ label: 'Save Draft' })


    // Check if it's created properly
    cy.url().should('be.equal', `${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)

    cy.contains(newPublishInsight.headline)
      .should('have.length.gte', 1)
      .should('contain', newPublishInsight.content)

    // Click Publish button
    cy.contains(newPublishInsight.headline)
      .parent()
      .within(() => {
        cy.root().find('button:nth(1)').click()
        cy.root().contains('Published').should('have.length.gte', 1)
      })
  })

  it('should create an insight and publish', () => {
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    cy.clickBtnByLabel({ label: 'Insights', type: 1 })
  
    // Fill form and save
    fillInsightForm(newDirectPublishInsight)
    cy.clickBtnByLabel({ label: 'Publish' })


    // Check if it's created properly
    cy.url().should('be.equal', `${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)

    cy.get(`h2:contains(${newDirectPublishInsight.headline})`)
      .should('have.length.gte', 1)

    cy.get(`p:contains(${newDirectPublishInsight.content})`)
      .should('have.length.gte', 1)

    // Confirm it's published already
    cy.contains(newDirectPublishInsight.headline)
      .parent()
      .within(() => {
        cy.root().contains('published').should('have.length.gte', 1)
      })
  })
  

  it('should create an insight of future date and publish', () => {
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    cy.clickBtnByLabel({ label: 'Insights', type: 1 })
  
    // Fill form and save
    fillInsightForm(newDirectPublishInsightFuture)

    // Select nextmonth/10
    // open modal
    cy.get('p:contains(Appear in Smartfeed)').parent().find('button').click()
    // Next month
    cy.get('.MuiPickersCalendarHeader-switchHeader > button:eq(1)').click()
    // Select first day
    cy.get('.MuiPickersCalendar-week button:contains(10):eq(0)').click()
    // Click ok
    cy.get('button:contains(OK)').click()
    
    
    cy.clickBtnByLabel({ label: 'Publish' })


    // Check if it's created properly
    cy.url().should('be.equal', `${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)

    cy.get(`h2:contains(${newDirectPublishInsight.headline})`)
      .should('have.length.gte', 1)

    cy.get(`p:contains(${newDirectPublishInsight.content})`)
      .should('have.length.gte', 1)

    // Confirm it's published already
    cy.contains(newDirectPublishInsight.headline)
      .parent()
      .within(() => {
        cy.root().contains('published').should('have.length.gte', 1)
      })
  })
  
})
