export function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

export function addOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}