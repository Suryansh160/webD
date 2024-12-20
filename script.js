function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}
//this is comment
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">Rs.${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="decrease-quantity" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-quantity" data-id="${item.id}">+</button>
            </div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 10 : 0; // $10 shipping fee if cart is not empty
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `Rs.${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `Rs.${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `Rs.${total.toFixed(2)}`;
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('decrease-quantity')) {
        const itemId = e.target.dataset.id;
        const item = cart.find(item => item.id === itemId);
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter(item => item.id !== itemId);
        }
    } else if (e.target.classList.contains('increase-quantity')) {
        const itemId = e.target.dataset.id;
        const item = cart.find(item => item.id === itemId);
        item.quantity++;
    } else if (e.target.classList.contains('remove-item')) {
        const itemId = e.target.dataset.id;
        cart = cart.filter(item => item.id !== itemId);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
});

updateCartCount();
renderCartItems();

const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some items before checking out.');
        } else {
            alert('Thank you for your purchase! This is where you would normally be redirected to a payment gateway.');
            cart = [];
            localStorage.removeItem('cart');
            updateCartCount();
            renderCartItems();
        }
    });
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;
        const price = parseFloat(e.target.dataset.price);
        addToCart(id, name, price);
        alert(`${name} has been added to your cart!`);
    }
});
// njdn
