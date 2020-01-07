'use strict'

const puppeteer = require('puppeteer')

/**
 *
 * @param {options.username} string username
 * @param {options.password} string password
 * @param {options.loginUrl} string password
 * @param {options.loginSelector} string a selector on the loginUrl page for the social provider button
 * @param {options.postLoginSelector} string a selector on the app's post-login return page to assert that login is successful
 * @param {options.headless} boolean launch puppeteer in headless more or not
 * @param {options.logs} boolean whether to log cookies and other metadata to console
 * @param {options.getAllBrowserCookies} boolean whether to get all browser cookies instead of just for the loginUrl
 */
module.exports.GoogleSocialLogin = async function GoogleSocialLogin(options = {}) {
  validateOptions(options)

  const browser = await puppeteer.launch({headless: !!options.headless})
  const page = await browser.newPage()
  await page.setViewport({width: 1400, height: 800})

  await page.goto(options.loginUrl)

  await login({page, options})
  await typeUsername({page, options})
  await typePassword({page, options})

  const url = page.url();
  console.log(url);

  const cookies = await getCookies({page, options})
  
  page.on('response', response => {
    const status = response.status()
    if ((status >= 300) && (status <= 399)) {
      console.log('Redirect from', response.url(), 'to', response.headers()['location'])
    }
  })


  // await finalizeSession({page, browser, options})

  return {
    cookies,
    url  
  }
}

function validateOptions(options) {
  if (!options.username || !options.password) {
    throw new Error('Username or Password missing for social login')
  }
}

async function login({page, options} = {}) {
  await page.waitForSelector(options.loginSelector)
  await page.click(options.loginSelector)
}

async function typeUsername({page, options} = {}) {
  await page.waitForSelector('input[type="email"]')
  await page.type('input[type="email"]', options.username)
  await page.click('#identifierNext')
}

async function typePassword({page, options} = {}) {
  await page.waitForSelector('input[type="password"]', {visible: true})
  await page.type('input[type="password"]', options.password)
  await page.waitForSelector('#passwordNext', {visible: true})
  await page.click('#passwordNext')
}

async function getCookies({page, options} = {}) {
  await page.waitForSelector(options.postLoginSelector)

  const cookies = options.getAllBrowserCookies
    ? await getCookiesForAllDomains(page)
    : await page.cookies(options.loginUrl)

  if (options.logs) {
    console.log(cookies)
  }

  return cookies
}

async function getCookiesForAllDomains(page) {
  const cookies = await page._client.send('Network.getAllCookies', {})
  return cookies.cookies
}

async function finalizeSession({page, browser, options} = {}) {
  await browser.close()
}
