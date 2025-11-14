export let cart;

loadFromStorage();

export function loadFromStorage () {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [];
  }
}


function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart (productId, quantity) {
    let matchingItems;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId){
        matchingItems = cartItem;
      }
    });
  
    if (matchingItems){
      matchingItems.quantity += quantity;
    } else {
      cart.push ({
        productId,
        quantity,
        deliveryOptionId: "1"
      });
    }

    saveToStorage();
  }
  

export function removeFromCart (productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity () {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}


export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption (productId, deliveryOptionId) {
  let matchingItems;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItems = cartItem;
    }
  });

  matchingItems.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}