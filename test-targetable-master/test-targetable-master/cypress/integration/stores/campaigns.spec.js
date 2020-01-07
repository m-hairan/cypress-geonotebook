/// <reference types="Cypress" />

import * as CONSTS from '../../constants'

context('stores.campaigns', () => {
  const openCampaigns = () => {
    // select the campaigns menu
    cy.visit(`${CONSTS.ADMIN_BASE}stores/${CONSTS.STORE_ID}`)
    cy.clickStoreTab({ name: 'Campaigns', eq: 1 })

    // tap on "CAMPAIGNS" button
    cy.clickBtnByLabel({ label: 'Campaigns', type: 1 })

    // campaigns page loads and should default to the live menu tab
    cy.url().should('contain', '/campaigns')
  }


  const newDraftCampaign = {
    title: 'Test Campaign',
    mainAddMsg: 'Test Main Add Msg',
    imgDesc: 'Image description',
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

  it('campaign page load', () => {
    openCampaigns()
    
    // live ads should be shown in a card view with title and live as of date value
    cy.get('.Mui-selected').contains('Live')
  })

  it('campaign live detail view', () => {
    openCampaigns()

    // select the live menu tab
    cy.clickStoreTab({ name: 'Live' })

    // live ads should be shown in a card view with title and live as of date value
    let title = ''
    let asOfDate = ''
    const seqNum = 0

    cy.get('[data-cy="card-campaign"]').should('have.length.greaterThan', 0)
    cy.get('[data-cy="card-campaign"]')
      .eq(seqNum)
      .find('h6').then(( ele ) => {
        expect(ele).have.length.greaterThan(0)
        title = ele[0].innerHTML
        asOfDate = ele[1].innerHTML
        cy.log(title, asOfDate)

        expect(asOfDate).contain('Live as of')


        // tap on any live detail card
        cy.get('[data-cy="card-campaign"]')
          .eq(seqNum)
          .click()

        // card title and title in the detail view should match
        cy.get('span:contains(Campaign Title)')
          .next().contains(title)

        // assert button (LIVE) is not active
        cy.get('button:contains(Live)').should('be.disabled')
      })

  })

  it('campaign upcoming', () => {
    openCampaigns()

    // select the upcoming menu tab in campaigns
    cy.clickStoreTab({ name: 'Upcoming' })

    // if there are no upcoming campaigns
    // assert the page text, "You have no upcoming campaigns"
    cy.get('body')
      .then(($body) => {
        if ($body.find('[data-cy="card-campaign"]').length > 0) {
          cy.contains('no upcoming campaigns').should('have.have.length.greaterThan', 0)
        }
      })
  })


  it('campaign draft', () => {
    openCampaigns()

    // select the draft menu tab in campaigns
    cy.clickStoreTab({ name: 'Draft' })

    // draft page loads and should list draft cards
    cy.url().should('contain', 'tab=draft')
  })

  it('campaign draft detail', () => {
    openCampaigns()

    // select the draft menu tab in campaigns
    cy.clickStoreTab({ name: 'Draft' })

    // draft page loads and should list draft cards
    cy.url().should('contain', 'tab=draft')


    // tap on a completed draft
    // card title and title shown in the detail view should match
    // assert button (LIVE) is not active
    let title = ''
    const seqNum = 0

    cy.get('[data-cy="card-campaign"]').should('have.length.greaterThan', 0)
    cy.get('[data-cy="card-campaign"]')
      .eq(seqNum)
      .find('h6').then(( ele ) => {
        expect(ele).have.length.greaterThan(0)
        title = ele[0].innerHTML

        // tap on any live detail card
        cy.get('[data-cy="card-campaign"]')
          .eq(seqNum)
          .click()

        // card title and title in the detail view should match
        cy.get('span:contains(Campaign Title)')
          .next().contains(title)

        // assert button (LIVE) is not active
        cy.get('button:contains(Live)').should('be.disabled')
      })
  })

  it('campaign history', () => {
    openCampaigns()

    // select the draft menu tab in campaigns
    cy.clickStoreTab({ name: 'History' })

    // draft page loads and should list draft cards
    cy.url().should('contain', 'tab=history')
  })


  it('campaign draft detail', () => {
    openCampaigns()

    // select the draft menu tab in campaigns
    cy.clickStoreTab({ name: 'History' })

    // draft page loads and should list draft cards
    cy.url().should('contain', 'tab=history')


    // tap on a completed draft
    // card title and title shown in the detail view should match
    // assert button (LIVE) is not active
    let title = ''
    const seqNum = 0

    cy.get('[data-cy="card-campaign"]').should('have.length.greaterThan', 0)
    cy.get('[data-cy="card-campaign"]')
      .eq(seqNum)
      .find('h6').then(( ele ) => {
        expect(ele).have.length.greaterThan(0)
        title = ele[0].innerHTML

        // tap on any live detail card
        cy.get('[data-cy="card-campaign"]')
          .eq(seqNum)
          .click()

        // card title and title in the detail view should match
        cy.get('span:contains(Campaign Title)')
          .next().contains(title)

        // assert button (LIVE) is not active
        cy.get('button:contains(Live)').should('be.disabled')
      })
  })
})
