// Données de test pour les produits
const products = [
    {
        id: 1,
        name: "iPhone 14",
        price: 450000,
        category: "electronics",
        rating: 4.8,
        image: "images/iphone 14.jpeg",
        description: "Le dernier iPhone avec des fonctionnalités révolutionnaires."
    },
    {
        id: 2,
        name: "iPhone 11",
        price: 350000,
        category: "electronics",
        rating: 4.7,
        image: "images/iphone11.jpg",
        description: "Un iPhone performant avec un excellent rapport qualité-prix."
    },
    {
        id: 3,
        name: "iPhone Classique",
        price: 250000,
        category: "electronics",
        rating: 4.5,
        image: "images/Iphone.jpeg",
        description: "Un iPhone fiable et éprouvé."
    },
    {
        id: 4,
        name: "Samsung Galaxy",
        price: 400000,
        category: "electronics",
        rating: 4.6,
        image: "images/samsung.jpeg",
        description: "Un smartphone Android puissant avec un excellent appareil photo."
    },
    {
        id: 5,
        name: "Samsung S6",
        price: 300000,
        category: "electronics",
        rating: 4.4,
        image: "images/samsung 6.jpeg",
        description: "Un smartphone Samsung élégant et performant."
    },
    {
        id: 6,
        name: "T-shirt Premium",
        price: 15000,
        category: "clothing",
        rating: 4.2,
        image: "images/tshirt.jpeg",
        description: "T-shirt en coton bio de haute qualité."
    },
    {
        id: 7,
        name: "Collection de Livres",
        price: 12000,
        category: "books",
        rating: 4.7,
        image: "images/livres.jpeg",
        description: "Une sélection de livres à succès."
    },
    {
        id: 8,
        name: "Livre Premium",
        price: 8000,
        category: "books",
        rating: 4.6,
        image: "images/livre.jpeg",
        description: "Un livre de qualité pour enrichir votre bibliothèque."
    },
    {
        id: 9,
        name: "Livre Spécial",
        price: 6000,
        category: "books",
        rating: 4.5,
        image: "images/livre3.jpeg",
        description: "Une édition spéciale d'un livre populaire."
    },
    {
        id: 10,
        name: "Télévision 4K",
        price: 500000,
        category: "electronics",
        rating: 4.5,
        image: "images/tele.jpeg",
        description: "Télévision 4K avec technologie HDR."
    },
    {
        id: 11,
        name: "Projecteur HD",
        price: 200000,
        category: "electronics",
        rating: 4.3,
        image: "images/projecteur.jpeg",
        description: "Projecteur HD pour une expérience cinéma à la maison."
    },
    {
        id: 12,
        name: "Vélo Premium",
        price: 350000,
        category: "sports",
        rating: 4.8,
        image: "images/velo.jpeg",
        description: "Un vélo de haute qualité pour vos aventures."
    }
];

// Fonction pour créer une carte de produit
function createProductCard(product) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card product-card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="price">${formatPrice(product.price)}</span>
                        <div class="rating">
                            ${generateStars(product.rating)}
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-white border-top-0">
                    <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Fonction pour générer les étoiles de notation
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    // Étoiles pleines
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-warning"></i>';
    }
    
    // Demi-étoile
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    
    // Étoiles vides
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star text-warning"></i>';
    }
    
    return stars;
}

// Fonction pour formater le prix en XOF
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Fonction pour afficher les produits
function displayProducts(productsToShow = products) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
}

// Fonction pour filtrer les produits
function filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    const minRating = parseFloat(document.getElementById('rating').value) || 0;
    
    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
        const ratingMatch = product.rating >= minRating;
        
        return categoryMatch && priceMatch && ratingMatch;
    });
    
    displayProducts(filteredProducts);
}

// Fonction pour ajouter au panier
function addToCart(productId) {
    if (!auth.isAuthenticated) {
        window.location.href = 'connexion.html';
        return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Fonction pour afficher une notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
    notification.style.zIndex = '1000';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Gestionnaire d'événements pour le formulaire de filtrage
document.addEventListener('DOMContentLoaded', function() {
    const filterForm = document.getElementById('filterForm');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            filterProducts();
        });
    }
    
    // Afficher les produits au chargement
    displayProducts();
}); 