import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'
import checkoutPage from '../pageobjects/checkout.page.js'

describe('Checkout', () => {

    beforeEach(async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')
    })

    it('TC-8: should complete checkout successfully', async () => {
        const itemName = await inventoryPage.firstItemName.getText()
        const itemPriceText = await (await inventoryPage.itemPrices)[0].getText()
        const itemPrice = parseFloat(itemPriceText.replace('$', ''))

        await inventoryPage.addFirstItemToCart()
        await expect(inventoryPage.cartBadge).toHaveText('1')

        await inventoryPage.clickCart()
        await expect(browser).toHaveUrl(expect.stringContaining('/cart'))
        await expect(cartPage.cartItems).toBeElementsArrayOfSize(1)
        await expect(cartPage.cartItemName).toHaveText(itemName)

        await checkoutPage.clickCheckout()
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one'))

        await checkoutPage.fillFirstName('John')
        await checkoutPage.fillLastName('Doe')
        await checkoutPage.fillPostalCode('12345')

        await checkoutPage.clickContinue()
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-two'))
        await expect(checkoutPage.overviewItems).toBeElementsArrayOfSize(1)

        const totalText = await checkoutPage.totalPrice.getText()
        const totalPrice = parseFloat(totalText.replace('Item total: $', ''))
        await expect(totalPrice).toEqual(itemPrice)

        await checkoutPage.clickFinish()
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout-complete'))
        await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!')

        await checkoutPage.clickBackHome()
        await expect(browser).toHaveUrl(expect.stringContaining('/inventory'))
        await expect(inventoryPage.inventoryList[0]).toBeDisplayed()
        await expect(inventoryPage.cartBadge).not.toBeDisplayed()
    })

    it('TC-9: should not allow checkout with empty cart', async () => {
        await inventoryPage.clickCart()
        await expect(browser).toHaveUrl(expect.stringContaining('/cart'))
        await expect(cartPage.cartItems).toBeElementsArrayOfSize(0)

        await checkoutPage.clickCheckout()
        await expect(browser).toHaveUrl(expect.stringContaining('/cart'))
        await expect(checkoutPage.errorMessage).toBeDisplayed()
        await expect(checkoutPage.errorMessage).toHaveText('Cart is empty')
    })

    it('TC-12: should show error when First Name is empty', async () => {
        await inventoryPage.addFirstItemToCart()
        await inventoryPage.clickCart()
        await checkoutPage.clickCheckout()
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one'))

        await checkoutPage.fillLastName('Doe')
        await checkoutPage.fillPostalCode('12345')
        await checkoutPage.clickContinue()

        await expect(checkoutPage.errorMessage).toBeDisplayed()
        await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required')
    })

    it('TC-13: should show error when Last Name is empty', async () => {
        await inventoryPage.addFirstItemToCart()
        await inventoryPage.clickCart()
        await checkoutPage.clickCheckout()
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one'))

        await checkoutPage.fillFirstName('John')
        await checkoutPage.fillPostalCode('12345')
        await checkoutPage.clickContinue()

        await expect(checkoutPage.errorMessage).toBeDisplayed()
        await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required')
    })

    it('TC-14: should show error when Postal Code is empty', async () => {
        await inventoryPage.addFirstItemToCart()
        await inventoryPage.clickCart()
        await checkoutPage.clickCheckout()
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one'))

        await checkoutPage.fillFirstName('John')
        await checkoutPage.fillLastName('Doe')
        await checkoutPage.clickContinue()

        await expect(checkoutPage.errorMessage).toBeDisplayed()
        await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required')
    })
})