function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const orderItems = document.getElementById('order-items');
    
    if (cart.length === 0) {
        window.location.href = 'panier.html';
        return;
    }
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const total = subtotal + shipping;
    
    orderItems.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
                <h6 class="mb-0">${item.name}</h6>
                <small class="text-muted">Quantité: ${item.quantity}</small>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)} €</span>
        </div>
    `).join('');
    
    document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)} €`;
    document.getElementById('shipping').textContent = `${shipping.toFixed(2)} €`;
    document.getElementById('total').textContent = `${total.toFixed(2)} €`;
}

function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    input.value = formattedValue;
}

function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    input.value = value;
}

function validatePaymentForm(formData) {
    const errors = [];
    
    const cardNumber = formData.get('cardNumber').replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumber)) {
        errors.push('Le numéro de carte doit contenir 16 chiffres');
    }
    
    const expiryDate = formData.get('expiryDate');
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        errors.push('La date d\'expiration doit être au format MM/AA');
    } else {
        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        if (parseInt(month) < 1 || parseInt(month) > 12) {
            errors.push('Le mois d\'expiration doit être entre 01 et 12');
        }
        
        if (parseInt(year) < currentYear || 
            (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            errors.push('La carte a expiré');
        }
    }
    
    const cvv = formData.get('cvv');
    if (!/^\d{3,4}$/.test(cvv)) {
        errors.push('Le CVV doit contenir 3 ou 4 chiffres');
    }
    
    return errors;
}

async function processPayment(formData) {
    try {
        const response = await simulatePaymentAPI(formData);
        
        if (response.success) {
            localStorage.removeItem('cart');
            window.location.href = 'confirmation.html';
        } else {
            showError(response.message);
        }
    } catch (error) {
        showError('Une erreur est survenue lors du traitement du paiement');
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger mt-3';
    errorDiv.textContent = message;
    
    const form = document.getElementById('paymentForm');
    form.insertAdjacentElement('beforebegin', errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function simulatePaymentAPI(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const cardNumber = formData.get('cardNumber').replace(/\s/g, '');
            
            if (cardNumber.endsWith('0')) {
                resolve({
                    success: false,
                    message: 'Paiement refusé. Veuillez vérifier vos informations.'
                });
            } else {
                resolve({
                    success: true,
                    message: 'Paiement traité avec succès'
                });
            }
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            formatCardNumber(this);
        });
    }
    
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            formatExpiryDate(this);
        });
    }
    
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const errors = validatePaymentForm(formData);
            
            if (errors.length > 0) {
                errors.forEach(error => showError(error));
                return;
            }
            
            await processPayment(formData);
        });
    }
}); 