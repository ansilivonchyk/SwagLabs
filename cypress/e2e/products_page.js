// cypress/e2e/products_page.js


///<reference types="cypress"/>

import { inventorySelectors, loginSelectors } from '../support/selectors';


describe ('Products page', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
      })
      
    it('[Products_01] Verify product list loads', () => {
        cy.log('Ensure that the full list of products is displayed after a successful login')
        cy.login('standard_user', 'secret_sauce')

        cy.get(inventorySelectors.productsLabel).should('have.text', 'Products')
        cy.get(inventorySelectors.productItem).should('have.length', 6)
    })
    
    it('[Products_02] Open product detail page by clicking on its name', () => {
        cy.log('Validate that clicking product name opens the product details page')
        cy.login('standard_user', 'secret_sauce')

        cy.get(inventorySelectors.inventoryItemFirstName).click()
        cy.get(inventorySelectors.backToProductsButton).should('be.visible')
        cy.get(inventorySelectors.inventoryItemName).should('have.text', 'Sauce Labs Backpack')
    })

    it('[Products_03] Open product detail page by clicking on its image', () => {
        cy.log('Validate that clicking product image opens the product details page')
        cy.login('standard_user', 'secret_sauce')

        cy.get(inventorySelectors.inventoryItemFirstNImage).click()
        cy.get(inventorySelectors.backToProductsButton).should('be.visible')
        cy.get(inventorySelectors.inventoryItemName).should('have.text', 'Sauce Labs Backpack')
    })

    it('[Products_04] Verify "Add to Cart" functionality', () => {
        cy.log('Ensure that clicking on "Add to Cart" button add a product to the cart')
        cy.login('standard_user', 'secret_sauce')

        cy.get(inventorySelectors.addToCartButtonFirstItem).click()
        cy.get(inventorySelectors.cartBadge).should('have.text', '1')
        cy.get(inventorySelectors.addToCartButtonFirstItem).should('contain', 'Remove')
        cy.get(inventorySelectors.addToCartButtonFirstItem).click() // Remove the item
        cy.get(inventorySelectors.cartBadge).should('not.exist')
        
    })

    it('[Products_05] Verify sorting functionality (Name Z to A)', () => {
        cy.log('Ensure that selecting the "Name (Z to A)" option sorts the inventory items in descending alphabetical order, from Z to A.')
        cy.login('standard_user', 'secret_sauce')

        cy.sortItems('za') 
        cy.verifySorting('Test.allTheThings() T-Shirt (Red)', 'Name (Z to A)')  
    })

    it('[Products_06] Verify sorting functionality (Name A to Z)', () => {
        cy.log('Verify that when the sorting option "Name (A to Z)" is selected, the inventory items are sorted alphabetically in ascending order, from A to Z.')
        cy.login('standard_user', 'secret_sauce')

        cy.sortItems('za') 
        cy.sortItems('az') 
        cy.verifySorting('Sauce Labs Backpack', 'Name (A to Z)')  
    })

    it('[Products_07] Verify sorting functionality (Price low to high)', () => {
        cy.log('Ensure that when "Price (low to high)" is selected, the items are sorted correctly by price in ascending order, starting with the lowest-priced item.')
        cy.login('standard_user', 'secret_sauce')

        cy.sortItems('lohi') 
        cy.verifySorting('Sauce Labs Onesie', 'Price (low to high)')  
    })

    it('[Products_08] Verify sorting functionality (Price high to low)', () => {
        cy.log('Check whether selecting the "Price (high to low)" option results in items being sorted by price in descending order, with the most expensive item listed first.')
        cy.login('standard_user', 'secret_sauce')

        cy.sortItems('hilo') 
        cy.verifySorting('Sauce Labs Fleece Jacket', 'Price (high to low)')  
    })






    afterEach(() => {
        cy.clearCookies()
      })
})