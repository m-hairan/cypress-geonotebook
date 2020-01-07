/// <reference types="Cypress" />

import * as CONSTS from '../../constants'

context('user.navbar', () => {
  before(() => {

    CONSTS.ENABLE_EYES && cy.eyesOpen({})
  })

  beforeEach(() => {
    cy.login(CONSTS.AUTH_EMAIL, CONSTS.AUTH_PASSWORD)
    cy.url().should('be.contain', `${CONSTS.ADMIN_BASE}`)
  })

  after(() => {
    CONSTS.ENABLE_EYES && cy.eyesClose({})
  })

  it('Admin Portal menu', () => {
    // - details page FB link
    cy.visit(`${CONSTS.ADMIN_BASE}`)
    // - tap on Hamburger link (upper left hand corner)
    cy.get('svg[data-cy="menu"]').click()
    // - assert name = "Benjamin Hyatt"
    cy.get(`h2:contains(${CONSTS.AUTH_NAME})`).should('be.have.length.gte', 1)
    // - assert email = "benjamin@targetable.com
    cy.get(`:contains(${CONSTS.AUTH_EMAIL})`).should('be.have.length.gte', 1)
    // - tap on Settings
    cy.get(`[data-cy="settings"]`).click()
    //     - assert email text = "benjamin@targetable.com"
    cy.get(`:contains(${CONSTS.AUTH_EMAIL})`).should('be.have.length.gte', 1)
    //     - assert build text = "1.0.1508"
    cy.get(`:contains(${CONSTS.BUILD_VERSION})`).should('be.have.length.gte', 1)
    //     - assert LOGOUT CTA button
    //     - tap "LOGOUT" CTA
    cy.get('button[data-cy="logout"]').click()
    //         - assert redirected back to the admin login page
    cy.url().should('have.contain', 'login-admin.stage.targetable.io')
  })
})
