/// <reference types="Cypress" />

import * as CONSTS from '../../constants'

context('user.auth', () => {
  before(() => {
    cy.visit(CONSTS.ADMIN_BASE)
  })

  it('should fail with wrong email/password', () => {
    cy.login(CONSTS.AUTH_EMAIL, 'wrong')
    cy.url().should('not.contain', `${CONSTS.ADMIN_BASE}`)
  })

  it('should login email/password', () => {
    cy.login(CONSTS.AUTH_EMAIL, CONSTS.AUTH_PASSWORD)
    cy.url().should('be.contain', `${CONSTS.ADMIN_BASE}`)
  })

  // disable this test as we are not logging in google
  it.skip('should redirect to google login', () => {
    // cy.url().should('have.string', CONSTS.ADMIN_AUTH_BASE)

    // cy.url().then(url => {

    //   const username = CONSTS.AUTH_EMAIL
    //   const password = CONSTS.AUTH_PASSWORD

    //   const cookieName = Cypress.env('cookieName')
    //   const socialLoginOptions = {
    //     username,
    //     password,
    //     loginUrl: url,
    //     headless: false,
    //     logs: true,
    //     loginSelector: '#btn-google > div',
    //     postLoginSelector: '#root',
    //     getAllBrowserCookies: true
    //   }

    //   return cy.task('GoogleSocialLogin', socialLoginOptions).then(({ cookies }) => {
    //     console.log(cookies);
    //     const cookie = cookies.filter((cookie) => cookie.name === cookieName).pop()

    //     if (cookie) {
    //       cy.setCookie(cookie.name, cookie.value, {
    //         domain: cookie.domain,
    //         expiry: cookie.expires,
    //         httpOnly: cookie.httpOnly,
    //         path: cookie.path,
    //         secure: cookie.secure,
    //       })

    //       Cypress.Cookies.defaults({
    //         whitelist: cookieName,
    //       })
    //     }
    //   })
    // })

    cy.get('#btn-google').click()
    cy.visit('https://admin.stage.targetable.io/stores/c1878687-1432-435f-9834-12ed46c4fce5')
    // cy.visit('https://accounts.google.com/signin/oauth?hd=targetable.com&client_id=756053477623-g9tdro6ng68e8hmb62gbq5qihjm85u3d.apps.googleusercontent.com&as=GXAA_AmR03g6LB8jH9epuQ&destination=https://login-admin.stage.targetable.io&approval_state=!ChQxN1BoZUFZY21JSnIyZlNnYkJMYhIfczVvYXlQbkNsYlVlVUEyYUd3VDlRSnlReG0yVzVoWQ%E2%88%99AJDr988AAAAAXc56K6iSUzaB0Z-mz7REeZl7GxLNTIPd&oauthgdpr=1&xsrfsig=ChkAeAh8T8BNj8ePYxrawqTH2q0PbGNUKREGEg5hcHByb3ZhbF9zdGF0ZRILZGVzdGluYXRpb24SBXNvYWN1Eg9vYXV0aHJpc2t5c2NvcGU')
  })

  // it('', () => {

  // })
})
