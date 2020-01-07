

/**
 * Click accoridan from edit screen
 */
Cypress.Commands.add('clickSuggestCampaignAccordian', (options) => {
  const { name } = options

  cy.contains(name, { timeout: 10000 })
    .parent()
    .filter('.MuiExpansionPanelSummary-content')
    .eq(0)
    .click()
})