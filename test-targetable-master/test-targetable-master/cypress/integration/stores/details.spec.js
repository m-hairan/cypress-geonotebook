/// <reference types="Cypress" />

import * as CONSTS from '../../constants'

context('stores.details', () => {
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

  it('details page load and assert it all', () => {

    // - details page FB link
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    cy.clickStoreTab({ name: 'Details' })


    // cy.eyesCheckWindow('Detail first landing page')


    // cy.eyesCheckWindow({
    //   tag: 'select',
    //   target: 'region',
    //   selector: 'header',
    // })

    // - assert FB badge
    // - assert FB link = FACEBOOK_LINK
    cy.get('p:contains(Facebook Business Page)').parent().parent().parent()
      .find('img:first').should('have.attr', 'alt', 'Facebook')
    cy.get('p:contains(Facebook Business Page)').parent().parent().parent()
      .should('have.attr', 'href', CONSTS.FACEBOOK_LINK)

    // - details FB business manager
    // - assert FB badge
    // - assert FB business propery value 106979024006804

    cy.get('p:contains(Facebook Business Manager)').parent().parent()
      .find('img:first').should('have.attr', 'alt', 'Facebook')
    cy.get('p:contains(Facebook Business Manager)')
      .should('to.contain', CONSTS.FB_BIZ_MANAGER_ID)

    // - details FB ad account
    // - assert FB badge
    // - assert FB ad account property value 339551100261688

    cy.get('p:contains(Facebook Ad Account)').parent().parent()
      .find('img:first').should('have.attr', 'alt', 'Facebook')
    cy.get('p:contains(Facebook Ad Account)')
      .should('to.contain', CONSTS.FB_AD_ADDOUNT_ID)

    // - details Hubspot link
    // - assert HS badge
    // - assert HS link = HUBSPOT_LINK_STORE1  
    cy.get('p:contains(Hubspot Company Record)').parent().parent().parent()
      .find('img:first').should('have.attr', 'alt', 'Hubspot')
    cy.get('p:contains(Hubspot Company Record)').parent().parent().parent()
      .should('have.attr', 'href', CONSTS.HUBSPOT_LINK_STORE1)

  })
})
