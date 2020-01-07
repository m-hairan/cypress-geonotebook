/// <reference types="Cypress" />

import * as CONSTS from '../../constants'

context('businesses.details', () => {
  beforeEach(() => {
    // cy.login(CONSTS.AUTH_EMAIL, CONSTS.AUTH_PASSWORD)
    // cy.url().should('be.contain', `${CONSTS.ADMIN_BASE}`)
  })

  before(() => {
    cy.login(CONSTS.AUTH_EMAIL, CONSTS.AUTH_PASSWORD)
    cy.url().should('be.contain',  `${CONSTS.ADMIN_BASE}`)
    CONSTS.ENABLE_EYES && cy.eyesOpen({})
  })

  after(() => {
    CONSTS.ENABLE_EYES && cy.eyesClose({})
  })

  it('details page load and assert account, stores and users menus', () => {
    // - details page FB link
    cy.visit(`${CONSTS.ADMIN_BASE}businesses/${CONSTS.BIZ_ID}`)

    // assert account, stores and users menus
    cy.get('button:contains(Account)').should('be.have.length.gte', 1)
    cy.get('button:contains(Stores)').should('be.have.length.gte', 1)
    cy.get('button:contains(Users)').should('be.have.length.gte', 1)
  })

  it('Accounts tab', () => {
    // - details page FB link
    cy.visit(`${CONSTS.ADMIN_BASE}businesses/${CONSTS.BIZ_ID}`)

    cy.clickStoreTab({ name: 'Account' })

    // - assert Stripe badge
    cy.get('p:contains(Stripe Account Link)').parent().parent().parent()
      .find('img:first').should('have.attr', 'alt', 'Stripe')
    // - assert Stripe account link value =  STRIPE_LINK
    cy.get('p:contains(Stripe Account Link)').parent().parent().parent()
      .should('have.attr', 'href', CONSTS.STRIPE_LINK)

    // - assert HS badge
    // - assert HS link = HS_CONTACT_BIZ_LINK
    cy.get('p:contains(Hubspot Company Record)').parent().parent().parent()
      .find('img:first').should('have.attr', 'alt', 'Hubspot')
    cy.get('p:contains(Hubspot Company Record)').parent().parent().parent()
      .should('have.attr', 'href', CONSTS.HUBSPOT_LINK)

  })

  it('Stores tab', () => {
    // - details page FB link
    cy.visit(`${CONSTS.ADMIN_BASE}businesses/${CONSTS.BIZ_ID}`)

    cy.clickStoreTab({ name: 'Stores' })

    // - assert Business name = "Ben's Rockin Pancakes'
    // - assert address = "2955 NE Dogwood Dr.  Bend, OR 97701"
    // - assert link = https://admin.stage.targetable.io/stores/a5acd2ac-991f-4abc-b427-4a9b6b41e0fd
    cy.get('h6:contains(Ben\'s Rockin Pancakes)').should('be.have.length.gte', 1)
    cy.get('div:contains(2955 NE Dogwood Dr)').should('be.have.length.gte', 1)
    cy.get('h6:contains(Ben\'s Rockin Pancakes)').parent().parent().parent()
      .should('have.attr', 'href', `/stores/${CONSTS.STORE_ID}`)
  })

  it('Users tab', () => {
    // - details page FB link
    cy.visit(`${CONSTS.ADMIN_BASE}businesses/${CONSTS.BIZ_ID}`)

    cy.clickStoreTab({ name: 'Users' })

    // - assert name = "Benjamin Hyatt"
    // - assert email address = "benjaminhyatt@gmail.com"
    cy.get('h6:contains(Benjamin Hyatt)').should('be.have.length.gte', 1)
    cy.get('p:contains(benjaminhyatt@gmail.com)').should('be.have.length.gte', 1)

    // - tap on link
    cy.get('h6:contains(Benjamin Hyatt)').click()
    //     - assert name = "Benjamin Hyatt"
    cy.get('h1:contains(Benjamin Hyatt)').should('be.have.length.gte', 1)
    //     - assert FB_ID
    cy.get('p:contains(Facebook Id)').should('contain.html', CONSTS.FB_ID)
    //     - assert Auth0 ID = "facebook|AUTH0_ID"
    cy.get('p:contains(Auth0 Id)').should('contain.html', CONSTS.AUTH0_ID)
    //     - assert email = "benjaminhyatt@gmail.com"
    cy.get('p:contains(benjaminhyatt@gmail.com)').should('be.have.length.gte', 1)
    //     - assert HS badge
    //     - assert HS link = HS_CONTACT_CREATE_LINK
    cy.get('p:contains(Hubspot Contact Record)').parent().parent().parent()
      .find('img:first').should('have.attr', 'alt', 'Hubspot')
    cy.get('p:contains(Hubspot Contact Record)').parent().parent().parent()
      .should('have.attr', 'href', CONSTS.HS_CONTACT_CREATE_LINK)
  })
})
