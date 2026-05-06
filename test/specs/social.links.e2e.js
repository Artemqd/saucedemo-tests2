import loginPage from '../pageobjects/login.page.js'
import footerPage from '../pageobjects/footer.page.js'

describe('Social Media Links', () => {

    beforeEach(async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')
    })

    const socialLinks = [
        { name: 'Twitter', click: () => footerPage.clickTwitter(), urlPattern: /twitter\.com|x\.com/ },
        { name: 'Facebook', click: () => footerPage.clickFacebook(), urlPattern: /facebook\.com/ },
        { name: 'LinkedIn', click: () => footerPage.clickLinkedin(), urlPattern: /linkedin\.com/ }
    ]

    for (const { name, click, urlPattern } of socialLinks) {
        it(`TC-7: should open ${name} on a new tab`, async () => {

            await click()

            await browser.waitUntil(
                async () => (await browser.getWindowHandles()).length > 1,
                { timeout: 5000, timeoutMsg: 'New tab did not open' }
            )

            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1])

            const url = await browser.getUrl()
            await expect(url).toMatch(urlPattern)

            await browser.closeWindow()
            await browser.switchToWindow(handles[0])
        })
    }
})