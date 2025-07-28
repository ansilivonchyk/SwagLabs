// cypress/support/commands.js
// https://on.cypress.io/custom-commands


import { inventorySelectors, loginSelectors } from './selectors';

Cypress.Commands.add('login', (username, password) => {
    cy.get(loginSelectors.usernameInput).type(username);
    cy.get(loginSelectors.passwordInput).type(password);
    cy.get(loginSelectors.loginButton).click();
  });

Cypress.Commands.add('error', (text) =>{
    cy.get(loginSelectors.errorMessage).should('have.text', text);
  });

  Cypress.Commands.add('loginButton',() =>{
    cy.get(loginSelectors.loginButton).click();
  });

  Cypress.Commands.add('sortItems',(name) =>{
    cy.get(inventorySelectors.sortingDropdown).click();
    cy.get('.select_container select').select(name);
  });

  Cypress.Commands.add('verifySorting', (item, type) => {
    cy.get(inventorySelectors.inventoryItemFirstName).should('have.text', item);
    cy.get(inventorySelectors.selectedSortingOption).should('have.text', type);

  });