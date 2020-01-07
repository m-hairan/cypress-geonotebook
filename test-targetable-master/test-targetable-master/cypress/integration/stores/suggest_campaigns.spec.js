/// <reference types="Cypress" />

import * as CONSTS from '../../constants'
import { chmodSync } from 'fs';

context('stores.suggest_campaigns', () => {

  const assertValidAndFill = ({ value, sKey }) => {
    const mainAddMsgInput = cy.fillTextInput({
      type: 'label',
      sKey,
      inputOnly: true,
    })

    mainAddMsgInput.trigger('focus')
    mainAddMsgInput.trigger('blur')
    cy.contains('Save Draft').should('not.exist')
    cy.fillTextInput({
      type: 'label',
      sKey: sKey,
      inputOnly: true,
    }).parent().parent().find('.Mui-error').should('have.length.gte', 1)
    cy.fillTextInput({
      type: 'label',
      sKey: sKey,
      inputOnly: true,
    }).clear().type(value)
  }


  const newDraftCampaign = {
    title: 'Test Campaign',
    mainAddMsg: 'Test Main Add Msg',
    imgDesc: 'Image description',
  }

  const newDraftCampaignFutureDate = {
    title: 'Test Campaign',
    mainAddMsg: 'Test Main Add Msg',
    imgDesc: 'Image description',
  }

  before(() => {
    cy.login(CONSTS.AUTH_EMAIL, CONSTS.AUTH_PASSWORD)
    cy.wait(50000)
    cy.url().should('be.contain',  `${CONSTS.ADMIN_BASE}`)
    CONSTS.ENABLE_EYES && cy.eyesOpen({})

    // cy.eyesOpen({
    //   browser: { width: 400, height: 600 },
    // })
  })

  after(() => {
    CONSTS.ENABLE_EYES && cy.eyesClose({})
  })


  it('should do validation and create a draft', () => {
    // Navigate and Click tab "suggested campaigns"
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    cy.clickStoreTab({ name: 'Suggested Campaigns' })

    // tap on "Suggest Campaign" button
    cy.clickBtnByLabel({ label: 'Suggest Campaign', type: 1 })

    // enter title (assert title required)
    assertValidAndFill({ value: newDraftCampaign.title, sKey: 'Campaign Title' })

    // expand "ad preview section"
    cy.clickSuggestCampaignAccordian({ name: 'Ad Preview' })

    // Fill out main ad message (assert required field)
    assertValidAndFill({ value: newDraftCampaign.mainAddMsg, sKey: 'Main Ad Message' })

    // Fill out Image description (assert required field)
    assertValidAndFill({ value: newDraftCampaign.imgDesc, sKey: 'Image Description' })

    // (Assert "Ad Placement" section with Facebook checkbox Checked)
    cy.contains('Ad Placements').parent().next().find('input').first().should('be.checked')
    // Uncheck instagram
    cy.contains('Ad Placements').parent().next().find('input:nth(1)').click()
    
    // Featured Image, tap on pencil edit icon, and pick an image from account uploads section
    cy.contains('Featured Image').parent().parent().find('button').first().click()
    cy.doOnUploader({
      actionType: 'accountUploads',
      accountUploadsSeqNum: 1,
    })

    // tap on "Save Draft"
    cy.clickBtnByLabel({ label: 'Save Draft' })


    // draft is saved successfully
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    cy.clickStoreTab({ name: 'Suggested Campaigns' })

    cy.contains(newDraftCampaign.title, { timeout: 10000 })
      .should('have.length.gte', 1)
    
    // Confirm buttons are existing
    cy.contains(newDraftCampaign.title)
      .parent()
      .within(() => {
        cy.root().find('button:nth(1)').contains('Publish')
        cy.root().find('button:nth(2)').contains('edit')
      })
  })


  // use case 2 (edit suggested campaign draft)
  it('should edit a campaign and save', () => {
    // Navigate and Click tab "suggested campaigns"
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    
    // tap on suggested campaign link in admin portal
    cy.clickStoreTab({ name: 'Suggested Campaigns' })
    
    // tap on edit for a suggested campaign
    // cy.contains(newDraftCampaign.title, { timeout: 10000 })
    //   .parent()
    //   .within(() => {
    //     cy.root().contains('edit').click()
    //   })
    cy.contains('edit').click()

    
    // expand "ad preview section"
    cy.clickSuggestCampaignAccordian({ name: 'Ad Preview' })

    // Uncheck instagram
    cy.contains('Ad Placements').parent().next().find('input:nth(1)').click()

    // change title
    newDraftCampaign.title = 'New Suggested Campaign Title'
    cy.fillTextInput({
      type: 'label',
      sKey: 'Campaign Title',
      value: newDraftCampaign.title,
    })

    // tap on "Save Draft"
    cy.clickBtnByLabel({ label: 'Save Draft' })

    // tap on the up caret to return to admin page for store
    cy.wait(5000)
    cy.get('header button').first().click()

    // tap on suggested campaigns
    cy.clickStoreTab({ name: 'Suggested Campaigns' })

    // edited draft shows the update title (assert title)
    cy.contains(newDraftCampaign.title)
      .should('have.length.gte', 1)
  })


  // use case 3 (publish suggested campaign)
  it('should publish a campaign', () => {
    // Navigate and Click tab "suggested campaigns"
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    
    // tap on suggested campaign link in admin portal
    cy.clickStoreTab({ name: 'Suggested Campaigns' })
    
    // tap on edit for a suggested campaign
    // cy.contains('New Suggested Campaign Title', { timeout: 10000 })
    //   .parent()
    //   .within(() => {
    //     cy.root().contains('edit').click()
    //   })
    cy.contains('edit').click()

    // expand "ad preview section"
    cy.clickSuggestCampaignAccordian({ name: 'Ad Preview' })

    // Uncheck instagram
    cy.contains('Ad Placements').parent().next().find('input:nth(1)').click()


    // tap on "Save Draft"
    cy.clickBtnByLabel({ label: 'Save Draft' })
    cy.wait(5000)
    cy.clickBtnByLabel({ label: 'Publish' })

    // // tap on the up caret to return to admin page for store
    // cy.wait(5000)
    // cy.get('header button').first().click()

    // tap on suggested campaigns
    cy.clickStoreTab({ name: 'Suggested Campaigns' })

    // edited draft shows the update title (assert title)
    cy.contains('published').should('have.length.gte', 1)
  })

  it('should do validation and publish', () => {
    // Navigate and Click tab "suggested campaigns"
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    cy.clickStoreTab({ name: 'Suggested Campaigns' })

    // tap on "Suggest Campaign" button
    cy.clickBtnByLabel({ label: 'Suggest Campaign', type: 1 })

    // enter title (assert title required)
    assertValidAndFill({ value: newDraftCampaignFutureDate.title, sKey: 'Campaign Title' })

    // expand "ad preview section"
    cy.clickSuggestCampaignAccordian({ name: 'Ad Preview' })

    // Fill out main ad message (assert required field)
    assertValidAndFill({ value: newDraftCampaignFutureDate.mainAddMsg, sKey: 'Main Ad Message' })

    // Fill out Image description (assert required field)
    assertValidAndFill({ value: newDraftCampaignFutureDate.imgDesc, sKey: 'Image Description' })

    // (Assert "Ad Placement" section with Facebook checkbox Checked)
    cy.contains('Ad Placements').parent().next().find('input').first().should('be.checked')
    // Uncheck instagram
    cy.contains('Ad Placements').parent().next().find('input:nth(1)').click()
    

    // Select nextmonth/10
    // open modal
    cy.get('p:contains(Appear in Smartfeed)').parent().find('button').click()
    // Next month
    cy.get('.MuiPickersCalendarHeader-switchHeader > button:eq(1)').click()
    // Select first day
    cy.get('.MuiPickersCalendar-week button:contains(10):eq(0)').click()
    // Click ok
    cy.get('button:contains(OK)').click()


    // Featured Image, tap on pencil edit icon, and pick an image from account uploads section
    cy.contains('Featured Image').parent().parent().find('button').first().click()
    cy.doOnUploader({
      actionType: 'accountUploads',
      accountUploadsSeqNum: 1,
    })

    // tap on "Save Draft"
    cy.clickBtnByLabel({ label: 'Save Draft' })
    cy.wait(5000)
    cy.clickBtnByLabel({ label: 'Publish' })
  })

  it('should assert upload modal with invalid text', () => {
    // Navigate and Click tab "suggested campaigns"
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    cy.clickStoreTab({ name: 'Suggested Campaigns' })

    // tap on "Suggest Campaign" button
    cy.clickBtnByLabel({ label: 'Suggest Campaign', type: 1 })

    // enter title (assert title required)
    assertValidAndFill({ value: newDraftCampaign.title, sKey: 'Campaign Title' })

    // expand "ad preview section"
    cy.clickSuggestCampaignAccordian({ name: 'Ad Preview' })

    // Featured Image, tap on pencil edit icon, and pick an image from account uploads section
    cy.contains('Featured Image').parent().parent().find('button').first().click()
    // select the targetable library tab
    cy.contains('.MuiTab-wrapper', 'Targetable Library').click()
    // in the query field, supply an invalid query, e.g "asdf"
    cy.fillTextInput({
      type: 'label',
      sKey: 'Search Our Library',
      inputOnly: true,
    }).clear().type('asdf')
    // tap on search
    cy.clickBtnByLabel({
      label: 'Search',
      type: 1,
    })
    // assert the text response, "No results for "adsf', please check your spelling and search again
    cy.get('[data-test="no-results-message"]').contains('please check your spelling')
  })


  it('should assert upload modal with valid text', () => {
    // Navigate and Click tab "suggested campaigns"
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    cy.clickStoreTab({ name: 'Suggested Campaigns' })

    // tap on "Suggest Campaign" button
    cy.clickBtnByLabel({ label: 'Suggest Campaign', type: 1 })

    // enter title (assert title required)
    assertValidAndFill({ value: newDraftCampaign.title, sKey: 'Campaign Title' })

    // expand "ad preview section"
    cy.clickSuggestCampaignAccordian({ name: 'Ad Preview' })

    // Featured Image, tap on pencil edit icon, and pick an image from account uploads section
    cy.contains('Featured Image').parent().parent().find('button').first().click()
    // select the targetable library tab
    cy.contains('.MuiTab-wrapper', 'Targetable Library').click()
    // in the query field, supply an invalid query, e.g "asdf"
    cy.fillTextInput({
      type: 'label',
      sKey: 'Search Our Library',
      inputOnly: true,
    }).clear().type('pizza')
    // tap on search
    cy.clickBtnByLabel({
      label: 'Search',
      type: 1,
    })
    // response should list a bunch of images with pizza
    cy.get('[data-test="search-form"]')
      .parent()
      .find('[role="img"]').should('have.length.greaterThan', 0)
    // select the first image and it should be listed in the featured image ad preview section
    cy.get('[data-test="search-form"]')
      .parent()
      .find('[role="img"]').first().click({ force: true })
    cy.get('img').should('have.length.greaterThan', 0)
    // it should be listed in the featured image ad preview section
    cy.contains('Featured Image').parent().parent().parent()
      .find('img').should('have.length.greaterThan', 0)
  })

  // it('should Approved View exists, details layout', () => {
  //   // Navigate and Click tab "suggested campaigns"
  //   cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
  //   cy.clickStoreTab({ name: 'Suggested Campaigns' })


  //   // Card should have approved badge
  //   cy.get('button:contains(Approved View)')
  //     .find('span:contains(approved)').should('have.length.greaterThan', 0)

  // })

})
