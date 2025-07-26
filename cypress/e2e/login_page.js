// cypress/e2e/login_page.js


///<reference types="cypress"/>

import { loginSelectors } from '../support/selectors';


describe ('Login page', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
      })
      

    it('[Login_00] Login form is displayed', () => {
        cy.get('#user-name').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('#login-button').should('be.visible')

        cy.get('.login_credentials_wrap-inner div')
        .should('have.length', 2)
        cy.get('.login_credentials').should('contain', 'Accepted usernames are:') //part of the text
        cy.get('.login_password').should('have.text', 'Password for all users:secret_sauce') //full text
       
         cy.screenshot('[Login_Page_01]')
    })



    it('[Login_01_1] Successful login with a standard user', () => {
        const userName = cy.get('input[name="user-name"]')
        userName.type('standard_user{enter}') 

        const pass = 'secret_sauce'
        cy.get('input[name="password"]').type(pass) 

        cy.contains('Login').click()
        
        cy.url().should('include', '/inventory') 
        cy.contains('Login').should('not.exist')
    })

    it('[Login_01_2] Successful login with a standard user', () => {
        cy.get(loginSelectors.usernameInput).type('standard_user')
        cy.get(loginSelectors.passwordInput).type('secret_sauce') 
        cy.get(loginSelectors.loginButton).click()
        
        cy.url().should('include', '/inventory') 
        cy.contains('Login').should('not.exist')
    })

    it('[Login_01] Successful login with a standard user', () => {
        cy.login('standard_user', 'secret_sauce')
        
        cy.url().should('include', '/inventory') 
        cy.contains('Login').should('not.exist')
    })

    it('[Login_02] Login attempt with a locked-out user', () => {
        cy.login('locked_out_user', 'secret_sauce')
        
        cy.error('Epic sadface: Sorry, this user has been locked out.')
    })

    it('[Login_03] Login attempt with an incorrect password', () => {
        cy.login('standard_user', 'secret_sauce1')
        
        cy.error('Epic sadface: Username and password do not match any user in this service')
    })

    it('[Login_03] Login attempt with an incorrect username', () => {
        cy.login('standard_user1', 'secret_sauce')
        
        cy.error('Epic sadface: Username and password do not match any user in this service')
    })

    it('[Login_04 Login attempt with empty fields', () => {
        
        cy.loginButton()
        cy.error('Epic sadface: Username is required')
    })

    it('[Login_05] Login attempt with an empty password', () => {
        cy.get(loginSelectors.usernameInput).type('standard_user')
        cy.loginButton()
        
        cy.error('Epic sadface: Password is required')
    })
    
    it('[Login_06] Login attempt with an empty username', () => {
        cy.get(loginSelectors.passwordInput).type('secret_sauce')
        cy.loginButton()

        cy.error('Epic sadface: Username is required')
    })




    it('[Products_01] Verify product list loads', () => {
        cy.log('Ensure that the full list of products is displayed after a successful login')
        cy.login('standard_user', 'secret_sauce')

        cy.get('.header_secondary_container .title').should('have.text', 'Products')
        cy.get('.inventory_item').should('have.length', 6)
    })
    
    it.only('[Products_02] Open product detail page', () => {
        cy.log('Validate that clicking product name/image opens the product details page')
        cy.login('standard_user', 'secret_sauce')

        cy.get('.inventory_item:first-of-type .inventory_item_name').click()
        cy.get('#back-to-products').should('be.visible')
        cy.get('.inventory_details_name').should('have.text', 'Sauce Labs Backpack')
    })






    afterEach(() => {
        cy.clearCookies()
      })
})