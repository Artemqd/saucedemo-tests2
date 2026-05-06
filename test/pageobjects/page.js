export default class Page {

    async open (path) {
        return browser.url(`https://www.saucedemo.com/${path}`)
    }
}