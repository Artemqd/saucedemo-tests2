import Page from './page.js'

class LoginPage extends Page {

    get inputUsername () {
        return $('#user-name')
    }

    get inputPassword () {
        return $('#password')
    }

    get btnLogin () {
        return $('#login-button')
    }

    get errorMessage () {
        return $('[data-test="error"]')
    }

    async setUsername (username) {
        await this.inputUsername.setValue(username)
    }

    async setPassword (password) {
        await this.inputPassword.setValue(password)
    }

    async clickLogin () {
        await this.btnLogin.click()
    }

    async login (username, password) {
        await this.setUsername(username)
        await this.setPassword(password)
        await this.clickLogin()
    }

    async open () {
        return super.open('')
    }
}

export default new LoginPage()