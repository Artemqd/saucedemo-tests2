import Page from './page.js'

class CartPage extends Page {

    get cartItems () {
        return $$('.cart_item')
    }

    get cartItemName () {
        return $('.inventory_item_name')
    }

    async clickCheckout () {
        await this.checkoutBtn.click()
    }
}

const cartPage = new CartPage()
export default cartPage