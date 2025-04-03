document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on page load
    updateCartCount();
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Add to cart buttons (for product listings)
    const quickAddBtns = document.querySelectorAll('.quick-add-to-cart');
    if (quickAddBtns.length > 0) {
        quickAddBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-product-id');
                
                // Add to cart AJAX request
                fetch('/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId,
                        quantity: 1
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Update cart count
                        updateCartCount(data.cart.items.length);
                        
                        // Show success message
                        showAlert('Product added to cart!', 'success');
                    } else {
                        showAlert('Error adding product to cart', 'danger');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showAlert('Error adding product to cart', 'danger');
                });
            });
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email && validateEmail(email)) {
                // In a real application, you would send this to your server
                // For now, just show a success message
                showAlert('Thanks for subscribing!', 'success');
                this.reset();
            } else {
                showAlert('Please enter a valid email address', 'danger');
            }
        });
    }
    
    // Product filters (Sort by, category filters)
    const filterSelects = document.querySelectorAll('.filter-select');
    if (filterSelects.length > 0) {
        filterSelects.forEach(select => {
            select.addEventListener('change', function() {
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                
                // Update or add the parameter
                params.set(this.name, this.value);
                
                // Redirect to the new URL
                window.location.href = `${url.pathname}?${params.toString()}`;
            });
        });
    }
});

// Helper functions
function updateCartCount(count) {
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    if (count !== undefined) {
        // Update with provided count
        cartCountElements.forEach(element => {
            element.textContent = count;
        });
    } else {
        // Check if there's cart data in sessionStorage
        const cart = JSON.parse(sessionStorage.getItem('cart') || '{"items":[]}');
        cartCountElements.forEach(element => {
            element.textContent = cart.items.length;
        });
    }
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    
    // Add content
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add to DOM
    document.body.appendChild(alertDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => {
            alertDiv.remove();
        }, 150);
    }, 3000);
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
