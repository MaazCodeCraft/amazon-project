import { getOrders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { addToCart, calculateCartQuantity } from "../data/cart.js";
import { formateCurrency } from "./Utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

function renderOrdersPage() {
  const ordersGrid = document.querySelector('.orders-grid');
  if (!ordersGrid) return;
  
  const orders = getOrders();
  console.log('Loading orders:', orders);
  let ordersHTML = '';
  
  if (orders.length === 0) {
    ordersHTML = `
      <div class="no-orders">
        <h2>You haven't placed any orders yet</h2>
        <p>When you place your first order, it will appear here.</p>
        <a href="amazon.html" class="button-primary">Start Shopping</a>
      </div>
    `;
  } else {
    orders.forEach((order) => {
      const orderDate = new Date(order.orderTime);
      const orderTimeString = orderDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      
      ordersHTML += `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formateCurrency(order.totalCostCents)}</div>
              </div>
            </div>
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          ${order.customerInfo ? `
            <div class="customer-info">
              <div class="customer-details">
                <strong>Ship to:</strong> ${order.customerInfo.fullName}<br>
                ${order.customerInfo.address}, ${order.customerInfo.city} ${order.customerInfo.zipCode}<br>
                <strong>Payment:</strong> ${order.customerInfo.paymentMethod} ending in ${order.customerInfo.cardNumber.slice(-4)}
              </div>
            </div>
          ` : ''}
          <div class="order-details-grid">
            ${generateOrderProductsHTML(order)}
          </div>
        </div>
      `;
    });
  }
  
  ordersGrid.innerHTML = ordersHTML;
  attachBuyAgainListeners();
  updateCartQuantityDisplay();
}

function generateOrderProductsHTML(order) {
  let productsHTML = '';
  
  order.products.forEach((productDetails) => {
    const product = getProduct(productDetails.productId);
    const deliveryTimeString = dayjs(productDetails.estimatedDeliveryTime).format('MMMM D');
    
    productsHTML += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>
      <div class="product-details">
        <div class="product-name">${product.name}</div>
        <div class="product-delivery-date">Arriving on: ${deliveryTimeString}</div>
        <div class="product-quantity">Quantity: ${productDetails.quantity}</div>
        <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>
      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button class="track-package-button button-secondary">Track package</button>
        </a>
      </div>
    `;
  });
  
  return productsHTML;
}

function attachBuyAgainListeners() {
  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId, 1);
      updateCartQuantityDisplay();
      
      // Show feedback
      button.innerHTML = `
        <img class="buy-again-icon" src="images/icons/checkmark.png">
        <span class="buy-again-message">Added to cart!</span>
      `;
      
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 2000);
    });
  });
}

function updateCartQuantityDisplay() {
  const cartQuantity = calculateCartQuantity();
  const cartQuantityElement = document.querySelector('.cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
}

// Initialize when DOM is loaded
renderOrdersPage();