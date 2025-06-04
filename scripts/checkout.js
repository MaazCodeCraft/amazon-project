import { renderOrderSummary  } from "./checkout/orderSumary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js'
// import '../data/car.js';
// import '../data/backend-practice.js';


renderOrderSummary ();
renderPaymentSummary();

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