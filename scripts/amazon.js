import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formateCurrency } from "./Utils/money.js";

let productHTML = '';

products.forEach ((product) => {
    productHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>`
});

document.querySelector('.js-products-grid').innerHTML = productHTML;

const addedMessageTimeouts = {};

function updateCartQuantity () {
  const cartQuantity = calculateCartQuantity();
  
  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

updateCartQuantity();

// Simple search functionality
const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');

function performSearch() {
  const searchTerm = searchBar.value.toLowerCase().trim();
  
  if (!searchTerm) {
    renderAllProducts();
    return;
  }
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    (product.keywords && product.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)))
  );
  
  renderProducts(filteredProducts);
}

function renderProducts(productsToRender) {
  let productHTML = '';
  
  if (productsToRender.length === 0) {
    productHTML = `
      <div class="no-results">
        <h2>No results found</h2>
        <p>Try different keywords or browse all products</p>
        <button class="show-all-button button-primary" onclick="renderAllProducts()">Show All Products</button>
      </div>
    `;
    document.querySelector('.js-products-grid').innerHTML = productHTML;
    return;
  }
  
  productsToRender.forEach((product) => {
    productHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>
        <div class="product-name limit-text-to-2-lines">${product.name}</div>
        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarUrl()}">
          <div class="product-rating-count link-primary">${product.rating.count}</div>
        </div>
        <div class="product-price">${product.getPrice()}</div>
        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        ${product.extraInfoHTML()}
        <div class="product-spacer"></div>
        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>
        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });
  
  document.querySelector('.js-products-grid').innerHTML = productHTML;
  attachAddToCartListeners();
}

function renderAllProducts() {
  renderProducts(products);
  searchBar.value = '';
}

// Make function globally available
window.renderAllProducts = renderAllProducts;

function attachAddToCartListeners() {
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = Number(quantitySelector.value);
      
      addToCart(productId, quantity);
      updateCartQuantity();
      
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
      addedMessage.classList.add('added-to-cart-visible');
      
      setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 1200);
    });
  });
}

// Real-time search as user types
searchBar.addEventListener('input', performSearch);
searchButton.addEventListener('click', performSearch);
searchBar.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    performSearch();
  }
});

document.querySelectorAll('.js-add-to-cart')
  .forEach ((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;

      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );

      const quantity = Number(quantitySelector.value);
      
      addToCart(productId, quantity);
      updateCartQuantity();

      const addedMessage = document.querySelector(`
        .js-added-to-cart-${productId}
        `);

      addedMessage.classList.add('added-to-cart-visible');

      const previousTimeoutId = addedMessageTimeouts[productId];
      
      if (previousTimeoutId){
        clearTimeout(previousTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 1200);

      addedMessageTimeouts[productId] = timeoutId;
    });
  });