import Page from './page.js'

class CheckoutPage extends Page {

    get checkoutBtn () {
        return $('[data-test="checkout"]')
    }

    get firstNameField () {
        return $('[data-test="firstName"]')
    }

    get lastNameField () {
        return $('[data-test="lastName"]')
    }

    get postalCodeField () {
        return $('[data-test="postalCode"]')
    }

    get continueBtn () {
        return $('[data-test="continue"]')
    }

    get finishBtn () {
        return $('[data-test="finish"]')
    }

    get backHomeBtn () {
        return $('[data-test="back-to-products"]')
    }

    get confirmationMessage () {
        return $('[data-test="complete-header"]')
    }

    get overviewItems () {
        return $$('.cart_item')
    }

    get totalPrice () {
        return $('[data-test="subtotal-label"]')
    }

    get errorMessage () {
        return $('[data-test="error"]')
    }

    async clickCheckout () {
        await this.checkoutBtn.click()
    }

    async fillFirstName (firstName) {
        await this.firstNameField.setValue(firstName)
    }

    async fillLastName (lastName) {
        await this.lastNameField.setValue(lastName)
    }

    async fillPostalCode (postalCode) {
        await this.postalCodeField.setValue(postalCode)
    }

    async clickContinue () {
        await this.continueBtn.click()
    }

    async clickFinish () {
        await this.finishBtn.click()
    }

    async clickBackHome () {
        await this.backHomeBtn.click()
    }

    async fillForm (firstName, lastName, postalCode) {
        await this.fillFirstName(firstName)
        await this.fillLastName(lastName)
        await this.fillPostalCode(postalCode)
    }
}

const checkoutPage = new CheckoutPage()
export default checkoutPage