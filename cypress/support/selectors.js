// cypress/support/selectors.js

export const loginSelectors = {
  usernameInput: 'input[name="user-name"]',
  passwordInput: 'input[name="password"]',
  loginButton: '#login-button',
  errorMessage: '[data-test="error"]'
};


export const inventorySelectors = {
  productsLabel: '.header_secondary_container .title',
  productItem: '.inventory_item',
  inventoryItemFirstName: '.inventory_item:first-of-type .inventory_item_name',
  inventoryItemFirstNImage: '.inventory_item:first-of-type .inventory_item_img .inventory_item_img',
  backToProductsButton: '#back-to-products',
  inventoryItemName: '.inventory_details_name',
  addToCartButtonFirstItem: '.inventory_item:first-of-type .btn_inventory',
  cartBadge: '.shopping_cart_badge',
  sortingDropdown: '.select_container',
  selectedSortingOption: '.select_container .active_option',
  
};





