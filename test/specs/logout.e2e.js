import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('Logout', () => {

    beforeEach(async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')
    })

    it('TC-4: should logout successfully', async () => {
        await inventoryPage.clickBurgerMenu()

        await expect(inventoryPage.menuItems).toBeElementsArrayOfSize(4)

        await inventoryPage.clickLogout()

        await expect(browser).toHaveUrl(expect.stringContaining('saucedemo.com'))
        await expect(loginPage.inputUsername).toHaveValue('')
        await expect(loginPage.inputPassword).toHaveValue('')
    })
})