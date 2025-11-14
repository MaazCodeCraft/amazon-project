import { renderOrderSummary  } from "./checkout/orderSumary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { cart } from "../data/cart.js";
import { addOrder } from "../data/orders.js";

renderOrderSummary();
renderPaymentSummary();

// Add order form functionality
setupOrderForm();

function setupOrderForm() {
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
            
            const formData = new FormData(e.target);
            
            // Calculate total
            let totalCents = 0;
            cart.forEach(item => {
                // Get product price from cart calculation
                totalCents += 2500; // Default price for demo
            });
            
            // Create order
            const order = {
                id: 'order-' + Date.now(),
                orderTime: new Date().toISOString(),
                totalCostCents: totalCents,
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
            
            console.log('Creating order:', order);
            addOrder(order);
            
            // Clear cart
            cart.length = 0;
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Hide modal and redirect
            const modal = document.querySelector('.js-checkout-modal');
            if (modal) modal.style.display = 'none';
            alert('Order placed successfully!');
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