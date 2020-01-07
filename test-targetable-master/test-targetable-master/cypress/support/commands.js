
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import * as CONSTS from '../constants'
import '@percy/cypress'

import './suggested_campaigns'

Cypress.Commands.add('login', (email, password) => {
  cy.visit(CONSTS.ADMIN_BASE)
  cy.url().then(async (url) => {
    if (url.indexOf(CONSTS.ADMIN_BASE) === -1) {
      debugger
      await cy.url().then((url) => {
        return cy.visit(`${url}&isTestMode=1`)
      })
      cy.get('#cnt-login').find('input[id="email"]').clear().type(email)
      cy.get('#cnt-login').find('input[id="password"]').clear().type(password)

      cy.get('[id="btn-login"]').click()
    }
  })
})


/**
 * @param options.sKey - when type = 'label', indicate the title of sKey
 * @param options.type - search by type 'label' || ''
 * @param options.value - value to fill
 * @param options.inputOnly - get input obj only, do not fill
 */
Cypress.Commands.add('fillTextInput', (options) => {
  const { type, sKey, value, inputOnly } = options

  if (type === 'label') {
    const input = cy.get('.MuiFormControl-root')
      .contains(sKey)
      .parent()
      .find('input.MuiInputBase-input')
      .first()

    if (inputOnly) {
      return input
    }

    input.clear()
      .type(value)
  }
})

/**
 * @param options.type - search by type 'placeholder' || ''
 * @param options.sKey - searchKey
 * @param options.value - value to fill
 */
Cypress.Commands.add('fillTextArea', (options) => {
  const { type, sKey, value } = options

  if (type === 'placeholder') {
    cy.get(`textarea[placeholder="${sKey}"]`)
      .first()
      .clear()
      .type(value)
  }
})

/**
 * Click the button by label
 * @param options.type - 0 ; from down, 1 from top
 * @param options.label
 */
Cypress.Commands.add('clickBtnByLabel', (options) => {
  const { label, type } = options

  if (type === 1) {
    // Sometimes dose not work when mui label found first
    cy.get('.MuiButton-label', { timeout: 10000 })
      .contains(label)
      .parent()
      .click()
  } else {
    // This is another way of doing this
    cy.contains(label, { timeout: 10000 })
      .filter('.MuiButton-root')
      .eq(0)
      .click()
  }
})


/**
 * Click topmost tabs in Stores
 * @param eq - if there's duplicated name, select the seq number
 * @param name - the name of the tab
 */
Cypress.Commands.add('clickStoreTab', (options) => {
  const { name, eq = 0 } = options

  cy.get(`.MuiTab-root:contains(${name})`)
    .eq(eq)
    .click()
})


/**
 * Upload image from image uploader/selector
 * @param actionType - 'accountUploads'
 * @param accountUploadsSeqNum - valid when actionType is 'accountUploads', select seq number of image.
 */
Cypress.Commands.add('doOnUploader', (options) => {
  const { actionType, accountUploadsSeqNum } = options

  if (actionType === 'accountUploads') {
    cy.contains('.MuiTab-wrapper', 'Account Uploads').click()

    cy.contains('p', 'Past Uploads').next().find(`div[role="img"]:eq(${accountUploadsSeqNum - 1})`).click()
  }
})

