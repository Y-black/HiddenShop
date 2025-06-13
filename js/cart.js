function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItems = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cart.length === 0) {
        cartItems.style.display = 'none';
        emptyCart.style.display = 'block';
        checkoutBtn.disabled = true;
        updateOrderSummary(0);
        return;
    }
    
    cartItems.style.display = 'block';
    emptyCart.style.display = 'none';
    checkoutBtn.disabled = false;
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    updateOrderSummary(subtotal);
    
    cartItems.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
}

function createCartItemHTML(item) {
    return `
        <div class="cart-item" data-id="${item.id}">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                </div>
                <div class="col-md-4">
                    <h5 class="mb-1">${item.name}</h5>
                    <p class="text-muted mb-0">Prix unitaire: ${formatPrice(item.price)}</p>
                </div>
                <div class="col-md-3">
                    <div class="input-group">
                        <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="form-control text-center" value="${item.quantity}" 
                               min="1" onchange="updateQuantity(${item.id}, this.value - ${item.quantity})">
                        <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-2 text-end">
                    <p class="mb-0 fw-bold">${formatPrice(item.price * item.quantity)}</p>
                </div>
                <div class="col-md-1 text-end">
                    <button class="btn btn-link text-danger" onclick="removeItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function updateQuantity(itemId, change) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        const newQuantity = cart[itemIndex].quantity + change;
        
        if (newQuantity > 0) {
            cart[itemIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        } else {
            removeItem(itemId);
        }
    }
}

function removeItem(itemId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart();
}

function updateOrderSummary(subtotal) {
    const shipping = subtotal > 50000 ? 0 : 5000;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = formatPrice(shipping);
    document.getElementById('total').textContent = formatPrice(total);
}

function proceedToCheckout() {
    if (!auth.isAuthenticated) {
        window.location.href = 'connexion.html';
        return;
    }
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        alert('Votre panier est vide. Veuillez ajouter des produits avant de procéder au paiement.');
        return;
    }
    
    window.location.href = 'paiement.html';
}

function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cartItems) {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item mb-3">
                <div class="row align-items-center">
                    <div class="col-2">
                        <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
                    </div>
                    <div class="col-4">
                        <h6 class="mb-0">${item.name}</h6>
                        <p class="text-muted mb-0">Prix unitaire: ${formatPrice(item.price)}</p>
                    </div>
                    <div class="col-3">
                        <div class="input-group">
                            <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="number" class="form-control text-center" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                            <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="col-2 text-end">
                        <p class="mb-0 fw-bold">${formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <div class="col-1">
                        <button class="btn btn-link text-danger" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateCartSummary();
}

function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 50000 ? 0 : 5000;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = formatPrice(shipping);
    document.getElementById('total').textContent = formatPrice(total);
}

document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
    
    loadCart();
});