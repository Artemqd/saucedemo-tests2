import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'

describe('Cart', () => {

    beforeEach(async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')
    })

    it('TC-5: should save cart items after logout and login again', async () => {
        const itemName = await inventoryPage.firstItemName.getText()

        await inventoryPage.addFirstItemToCart()

        await expect(inventoryPage.cartBadge).toHaveText('1')

        await inventoryPage.clickBurgerMenu()

        await expect(inventoryPage.menuItems).toBeElementsArrayOfSize(4)

        await inventoryPage.clickLogout()

        await expect(browser).toHaveUrl(expect.stringContaining('saucedemo.com'))
        await expect(loginPage.inputUsername).toHaveValue('')
        await expect(loginPage.inputPassword).toHaveValue('')

        await loginPage.login('standard_user', 'secret_sauce')

        await inventoryPage.clickCart()

        await expect(browser).toHaveUrl(expect.stringContaining('/cart'))
        await expect(cartPage.cartItems).toBeElementsArrayOfSize(1)
        await expect(cartPage.cartItemName).toHaveText(itemName)
    })
})