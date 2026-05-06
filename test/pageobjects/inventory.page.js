import Page from './page.js'

class InventoryPage extends Page {

    get inventoryList () {
        return $$('.inventory_item')
    }

    get cartIcon () {
        return $('.shopping_cart_link')
    }

    get cartBadge () {
        return $('.shopping_cart_badge')
    }

    get pageTitle () {
        return $('.title')
    }

    get burgerMenuBtn () {
        return $('#react-burger-menu-btn')
    }

    get logoutBtn () {
        return $('#logout_sidebar_link')
    }

    get menuItems () {
        return $$('.bm-item')
    }

    get firstAddToCartBtn () {
        return $('.btn_inventory')
    }

    get firstItemName () {
        return $('.inventory_item_name')
    }

    get sortDropdown () {
        return $('.product_sort_container')
    }

    get itemNames () {
        return $$('.inventory_item_name')
    }

    get itemPrices () {
        return $$('.inventory_item_price')
    }

    async clickCart () {
        await this.cartIcon.click()
    }

    async clickBurgerMenu () {
        await this.burgerMenuBtn.click()
    }

    async clickLogout () {
        await this.logoutBtn.click()
    }

    async addFirstItemToCart () {
        await this.firstAddToCartBtn.click()
    }

    async selectSortOption (option) {
        await this.sortDropdown.selectByVisibleText(option)
    }
}

const inventoryPage = new InventoryPage()
export default inventoryPage