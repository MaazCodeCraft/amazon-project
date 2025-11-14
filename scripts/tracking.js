import { getOrders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function renderTrackingPage() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  
  if (!orderId || !productId) {
    renderTrackingError('Invalid tracking information');
    return;
  }
  
  const orders = getOrders();
  const order = orders.find(order => order.id === orderId);
  if (!order) {
    renderTrackingError('Order not found');
    return;
  }
  
  const productDetails = order.products.find(product => product.productId === productId);
  if (!productDetails) {
    renderTrackingError('Product not found in this order');
    return;
  }
  
  const product = getProduct(productId);
  const deliveryDate = dayjs(productDetails.estimatedDeliveryTime);
  const orderDate = dayjs(order.orderTime);
  const currentDate = dayjs();
  
  // Calculate delivery status
  const totalDays = deliveryDate.diff(orderDate, 'day');
  const daysPassed = currentDate.diff(orderDate, 'day');
  const progress = Math.min(Math.max(daysPassed / totalDays, 0), 1);
  
  let currentStatus = 'Preparing';
  let progressPercentage = 0;
  
  if (progress < 0.5) {
    currentStatus = 'Preparing';
    progressPercentage = progress * 100;
  } else if (progress < 1) {
    currentStatus = 'Shipped';
    progressPercentage = 50 + (progress - 0.5) * 100;
  } else {
    currentStatus = 'Delivered';
    progressPercentage = 100;
  }
  
  const trackingHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>
      
      <div class="delivery-date">
        ${currentStatus === 'Delivered' ? 'Delivered on' : 'Arriving on'} ${deliveryDate.format('dddd, MMMM D')}
      </div>
      
      <div class="product-info">${product.name}</div>
      <div class="product-info">Quantity: ${productDetails.quantity}</div>
      
      <img class="product-image" src="${product.image}">
      
      <div class="progress-labels-container">
        <div class="progress-label ${currentStatus === 'Preparing' ? 'current-status' : ''}">
          Preparing
        </div>
        <div class="progress-label ${currentStatus === 'Shipped' ? 'current-status' : ''}">
          Shipped
        </div>
        <div class="progress-label ${currentStatus === 'Delivered' ? 'current-status' : ''}">
          Delivered
        </div>
      </div>
      
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${progressPercentage}%"></div>
      </div>
      
      <div class="tracking-details">
        <div class="tracking-info">
          <strong>Order ID:</strong> ${orderId}
        </div>
        <div class="tracking-info">
          <strong>Order Date:</strong> ${orderDate.format('MMMM D, YYYY')}
        </div>
        <div class="tracking-info">
          <strong>Status:</strong> ${currentStatus}
        </div>
        ${currentStatus === 'Shipped' ? `
          <div class="tracking-info">
            <strong>Estimated Delivery:</strong> ${deliveryDate.format('dddd, MMMM D')}
          </div>
        ` : ''}
        ${order.customerInfo ? `
          <div class="tracking-info">
            <strong>Shipping Address:</strong><br>
            ${order.customerInfo.fullName}<br>
            ${order.customerInfo.address}<br>
            ${order.customerInfo.city}, ${order.customerInfo.zipCode}
          </div>
        ` : ''}
      </div>
    </div>
  `;
  
  document.querySelector('.main').innerHTML = trackingHTML;
}

function renderTrackingError(message) {
  const errorHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>
      
      <div class="tracking-error">
        <h2>Tracking Error</h2>
        <p>${message}</p>
        <a href="orders.html" class="button-primary">Back to Orders</a>
      </div>
    </div>
  `;
  
  document.querySelector('.main').innerHTML = errorHTML;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('tracking.html')) {
    renderTrackingPage();
  }
});