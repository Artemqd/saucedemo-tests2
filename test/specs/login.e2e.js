import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('Login', () => {

    beforeEach(async () => {
        await loginPage.open()
    })

    it('TC-1: should login with valid credentials', async () => {
        await loginPage.setUsername('standard_user')
        await loginPage.setPassword('secret_sauce')
        await loginPage.clickLogin()

        await expect(browser).toHaveUrl(expect.stringContaining('/inventory'))
        await expect(inventoryPage.inventoryList[0]).toBeDisplayed()
        await expect(inventoryPage.cartIcon).toBeDisplayed()
    })

    it('TC-2: should show error with invalid password', async () => {
        await loginPage.setUsername('standard_user')
        await loginPage.setPassword('wrong_password')
        await loginPage.clickLogin()

        await expect(loginPage.inputUsername).toHaveAttr('class', expect.stringContaining('error'))
        await expect(loginPage.inputPassword).toHaveAttr('class', expect.stringContaining('error'))
        await expect(loginPage.errorMessage).toBeDisplayed()
        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        )
    })

    it('TC-3: should show error for locked out user', async () => {
        await loginPage.setUsername('locked_out_user')
        await loginPage.setPassword('secret_sauce')
        await loginPage.clickLogin()

        await expect(loginPage.inputUsername).toHaveAttr('class', expect.stringContaining('error'))
        await expect(loginPage.inputPassword).toHaveAttr('class', expect.stringContaining('error'))
        await expect(loginPage.errorMessage).toBeDisplayed()
        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Sorry, this user has been locked out.'
        )
    })

    it('TC-10: should show error when fields are empty', async () => {
        await loginPage.clickLogin()

        await expect(loginPage.inputUsername).toHaveAttr('class', expect.stringContaining('error'))
        await expect(loginPage.inputPassword).toHaveAttr('class', expect.stringContaining('error'))
        await expect(loginPage.errorMessage).toBeDisplayed()
        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username is required'
        )
    })

    it('TC-11: should show error with invalid username', async () => {
        await loginPage.setUsername('invalid_user')
        await loginPage.setPassword('secret_sauce')
        await loginPage.clickLogin()

        await expect(loginPage.inputUsername).toHaveAttr('class', expect.stringContaining('error'))
        await expect(loginPage.inputPassword).toHaveAttr('class', expect.stringContaining('error'))
        await expect(loginPage.errorMessage).toBeDisplayed()
        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        )
    })
})