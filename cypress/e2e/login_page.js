///<reference types="cypress"/>

import { loginSelectors } from '../support/selectors';


describe ('Login page', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
      })
      

    it('[Login_Page_01] Login form is displayed', () => {
        cy.get('#user-name').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('#login-button').should('be.visible')

        cy.get('.login_credentials_wrap-inner div')
        .should('have.length', 2)
        .first().should('contain', 'Accepted usernames are:') //part of the text
        .last().should('have.text', 'Password for all users:secret_sauce') //full text
       
         cy.screenshot('[Login_Page_01]')
    })

    it('[Login_Page_02] validate empty data', () => {
        
        const submitButton = cy.get('input[type="submit"]')
        submitButton.click()
        
        cy.get('.error-message-container.error')
        .should('be.visible') 
        .should('contain', 'Epic sadface: Username is required')
    })

    it('[Login_Page_03] should allow user to log in', () => {
        const userName = cy.get('input[name="user-name"]')
        userName.type('standard_user{enter}') 

        const pass = 'secret_sauce'
        cy.get('input[name="password"]').type(pass) 

        cy.contains('Login').click()
        
        cy.url().should('include', '/inventory') 
        cy.contains('Login').should('not.exist')
    })


    it('[Login_Page_04] should allow user to log in', () => {
        cy.get(loginSelectors.usernameInput).type('standard_user')
        cy.get(loginSelectors.passwordInput).type('secret_sauce') 
        cy.get(loginSelectors.loginButton).click()
        
        cy.url().should('include', '/inventory') 
        cy.contains('Login').should('not.exist')
    })

    it.only('[Login_Page_05] should allow user to log in', () => {
        cy.login('standard_user', 'secret_sauce')
        
        cy.url().should('include', '/inventory') 
        cy.contains('Login').should('not.exist')
    })


    afterEach(() => {
        cy.clearCookies()
      })
})