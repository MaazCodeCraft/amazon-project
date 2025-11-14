import { renderOrderSummary  } from "./checkout/orderSumary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { cart } from "../data/cart.js";
import { addOrder } from "../data/orders.js";

renderOrderSummary();
renderPaymentSummary();

// Optimized order form functionality
setupOrderForm();

function setupOrderForm() {
    let isProcessing = false;
    
    // Use event delegation for reliable event handling
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('js-place-order')) {
            if (e.target.disabled || cart.length === 0) return;
            const modal = document.querySelector('.js-checkout-modal');
            if (modal) modal.style.display = 'flex';
        }
        
        if (e.target.classList.contains('js-cancel-order')) {
            const modal = document.querySelector('.js-checkout-modal');
            if (modal) modal.style.display = 'none';
        }
    });
    
    document.addEventListener('submit', (e) => {
        if (e.target.classList.contains('js-checkout-form')) {
            e.preventDefault();
            
            if (isProcessing) return;
            isProcessing = true;
            
            const submitBtn = e.target.querySelector('.confirm-btn');
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            const formData = new FormData(e.target);
            
            // Create order immediately
            const order = {
                id: 'order-' + Date.now(),
                orderTime: new Date().toISOString(),
                totalCostCents: 2500,
                customerInfo: {
                    fullName: formData.get('fullName'),
                    address: formData.get('address'),
                    city: formData.get('city'),
                    zipCode: formData.get('zipCode'),
                    phone: formData.get('phone'),
                    paymentMethod: formData.get('paymentMethod'),
                    cardNumber: formData.get('cardNumber')
                },
                products: cart.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    estimatedDeliveryTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                }))
            };
            
            addOrder(order);
            
            // Clear cart
            cart.length = 0;
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart quantity in header
            const cartQuantityElement = document.querySelector('.js-cart-quantity');
            if (cartQuantityElement) {
                cartQuantityElement.innerHTML = '0';
            }
            
            // Hide modal and redirect immediately
            const modal = document.querySelector('.js-checkout-modal');
            if (modal) modal.style.display = 'none';
            
            window.location.href = 'orders.html';
        }
    });
}

/*
Promise.all([
    new Promise ((resolve) => {
        console.log('Promise');
        resolve('value1');
    }),
    new Promise((resolve) => {
        console.log('Promise2');
        resolve();
    })
]).then ((values) => {
    console.log(values);
    console.log('Next Step!');
});
*/

/*
new Promise ((resolve) => {
    console.log('Promise');
    resolve('value1');

}).then ((value) => {
    console.log(value);
    return new Promise((resolve) => {
        console.log('Promise2');
        resolve();
    })

}).then (() => {
    console.log('Next Step!');
});
*/