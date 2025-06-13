const auth = {
    isAuthenticated: false,
    user: null,

    init() {
        const user = localStorage.getItem('user');
        if (user) {
            this.isAuthenticated = true;
            this.user = JSON.parse(user);
        }
        this.updateAuthButtons();
    },

    updateAuthButtons() {
        const authButtons = document.querySelector('.auth-buttons');
        if (!authButtons) return;

        if (this.isAuthenticated) {
            authButtons.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user me-2"></i>${this.user.name}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="profil.html"><i class="fas fa-user-cog me-2"></i>Mon profil</a></li>
                        <li><a class="dropdown-item" href="commandes.html"><i class="fas fa-shopping-bag me-2"></i>Mes commandes</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="auth.logout()"><i class="fas fa-sign-out-alt me-2"></i>Déconnexion</a></li>
                    </ul>
                </div>
                <a href="panier.html" class="btn btn-light ms-2">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="badge bg-primary rounded-pill cart-count">0</span>
                </a>
            `;
        } else {
            authButtons.innerHTML = `
                <a href="connexion.html" class="btn btn-outline-light me-2">
                    <i class="fas fa-sign-in-alt me-2"></i>Connexion
                </a>
                <a href="inscription.html" class="btn btn-light">
                    <i class="fas fa-user-plus me-2"></i>Inscription
                </a>
            `;
        }
    },

    login(email, password) {
        if (email && password) {
            this.isAuthenticated = true;
            this.user = {
                id: 1,
                name: email.split('@')[0],
                email: email
            };
            localStorage.setItem('user', JSON.stringify(this.user));
            this.updateAuthButtons();
            return true;
        }
        return false;
    },

    logout() {
        this.isAuthenticated = false;
        this.user = null;
        localStorage.removeItem('user');
        this.updateAuthButtons();
        window.location.href = 'index.html';
    },

    checkAuth() {
        if (!this.isAuthenticated) {
            window.location.href = 'connexion.html';
            return false;
        }
        return true;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    auth.init();
});

const cart = {
    items: [],

    init() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
        this.updateCartCount();
    },

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    },

    addItem(product) {
        if (!auth.isAuthenticated) {
            window.location.href = 'connexion.html';
            return;
        }

        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Produit ajouté au panier !');
    },

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'alert alert-success position-fixed top-0 end-0 m-3 fade-in';
        notification.style.zIndex = '1000';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    cart.init();
}); 