// Initialize an empty cart object
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Function to add item to cart
function addToCart(name, price) {
    if (cart[name]) {
        cart[name].quantity += 1;
    } else {
        cart[name] = { price: price, quantity: 1 };
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    updateCart();
}

// Function to remove item from cart
function removeFromCart(name) {
    delete cart[name];
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    let total = 0;

    cartItemsContainer.innerHTML = ''; // Clear existing cart items

    for (let item in cart) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.id = `cart-item-${item}`;

        itemElement.innerHTML = `
            <span class="item-name">${item} (x${cart[item].quantity})</span>
            <span class="item-price">$${cart[item].price.toFixed(2)}</span>
            <button class="remove-button" data-item="${item}">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);

        total += cart[item].price * cart[item].quantity;
    }

    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Attach event listeners to remove buttons
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', () => {
            removeFromCart(button.getAttribute('data-item'));
        });
    });
}

// Initialize cart display
updateCart();
