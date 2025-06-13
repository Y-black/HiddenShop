function generateOrderNumber() {
    return 'CMD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function createOrderItemHTML(item) {
    return `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
                <span class="fw-bold">${item.name}</span>
                <br>
                <small class="text-muted">Quantité: ${item.quantity}</small>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)} €</span>
        </div>
    `;
}

function loadOrderDetails() {
    const orderInfo = JSON.parse(localStorage.getItem('orderInfo')) || {};
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'produits.html';
        return;
    }

    if (!orderInfo.orderNumber) {
        orderInfo.orderNumber = generateOrderNumber();
        orderInfo.orderDate = new Date().toISOString();
        localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
    }

    document.getElementById('order-number').textContent = orderInfo.orderNumber;
    document.getElementById('order-date').textContent = formatDate(orderInfo.orderDate);
    document.getElementById('shipping-address').textContent = orderInfo.shippingAddress || 'Non spécifiée';

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 4.99;
    const total = subtotal + shipping;

    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = cart.map(item => createOrderItemHTML(item)).join('');

    document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)} €`;
    document.getElementById('shipping').textContent = `${shipping.toFixed(2)} €`;
    document.getElementById('total').textContent = `${total.toFixed(2)} €`;

    localStorage.removeItem('cart');
}

document.addEventListener('DOMContentLoaded', () => {
    loadOrderDetails();
}); 