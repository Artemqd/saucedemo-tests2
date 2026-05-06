import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('Sorting', () => {

    beforeEach(async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')
    })

    const sortingOptions = [
        {
            option: 'Price (low to high)',
            verify: async () => {
                const priceElements = await inventoryPage.itemPrices
                const prices = []
                for (const el of priceElements) {
                    const text = await el.getText()
                    prices.push(parseFloat(text.replace('$', '')))
                }
                const sortedPrices = [...prices].sort((a, b) => a - b)
                await expect(prices).toEqual(sortedPrices)
            }
        },
        {
            option: 'Price (high to low)',
            verify: async () => {
                const priceElements = await inventoryPage.itemPrices
                const prices = []
                for (const el of priceElements) {
                    const text = await el.getText()
                    prices.push(parseFloat(text.replace('$', '')))
                }
                const sortedPrices = [...prices].sort((a, b) => b - a)
                await expect(prices).toEqual(sortedPrices)
            }
        },
        {
            option: 'Name (A to Z)',
            verify: async () => {
                const nameElements = await inventoryPage.itemNames
                const names = []
                for (const el of nameElements) {
                    names.push(await el.getText())
                }
                const sortedNames = [...names].sort()
                await expect(names).toEqual(sortedNames)
            }
        },
        {
            option: 'Name (Z to A)',
            verify: async () => {
                const nameElements = await inventoryPage.itemNames
                const names = []
                for (const el of nameElements) {
                    names.push(await el.getText())
                }
                const sortedNames = [...names].sort().reverse()
                await expect(names).toEqual(sortedNames)
            }
        }
    ]

    for (const { option, verify } of sortingOptions) {
        it(`TC-6: should sort products by ${option}`, async () => {
            await inventoryPage.selectSortOption(option)
            await verify()
        })
    }
})