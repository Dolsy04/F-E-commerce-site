let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart(){
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const cartCount = document.querySelector('.cart-count');
    const cartMessage = document.querySelector('.empty-cart');

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
       cartMessage.style.display = 'block';
    } else {
        cartMessage.style.display = 'none';
    }    
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cartItem');

        cartItem.innerHTML = `
            <div class="item-container">
                <div class="img-details-container">
                <img src="${item.image}" alt="${item.name}" width="100" height="100">
                <div class="item-details">
                    <p class="name">${item.name}</p>
                    <p class="price">Price:<i class="fa-solid fa-naira-sign"></i>${item.price.toFixed(2)}</P>
                </div>
                </div>
                <div class="quantity-controls">
                <h3>Quantity:</h3>
                <div class="buttons-controls">
                        <button onclick="decreaseQuantity('${item.name}')">-</button>
                        <span class="quantity-count">${item.quantity}</span>
                        <button onclick="increaseQuantity('${item.name}')">+</button>
                    </div>
                    </div>
                <div class="delete-control">
                <h3>Delete Item</h3>
                <button><i onclick="removeItem('${item.name}')" class='bx bx-trash'></i></button>
                </div>
            </div>    
                `;

            cartItemsContainer.appendChild(cartItem);
    });
    cartCount.textContent = cart.length;
    totalPriceElement.textContent = total.toFixed(2)
}

function increaseQuantity(name){
    const item = cart.find(item => item.name === name);
    if(item){
        item.quantity += 1;
        updateCart()
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}
function decreaseQuantity(name){
    const item = cart.find(item => item.name === name);
    if(item && item.quantity > 1){
        item.quantity -= 1;
    }else{
        cart = cart.filter(item => item.name !== name);
    }
    updateCart()
    localStorage.setItem('cart', JSON.stringify(cart));
}
function removeItem(name){
    cart = cart.filter(item => item.name !== name);
    updateCart();
    localStorage.setItem('cart' , JSON.stringify(cart));
}

updateCart();

document.querySelector('.checkout').addEventListener('click', function() {
    // Get delivery information
    const fullName = document.querySelector('input[placeholder="Full Name"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const phone = document.querySelector('input[placeholder="Phone Number"]').value;
    const optionalPhone = document.querySelector('input[placeholder="Phone Number (Optional)"]').value;
    const address = document.querySelector('input[placeholder="Delivery Address"]').value;

    // Validate that necessary fields are filled
    if (!fullName || !email || !phone || !address) {
        alert('Please fill in all required fields');
        return;
    }

    // Save delivery information in localStorage
    const deliveryInfo = {
        fullName,
        email,
        phone,
        optionalPhone,
        address
    };
    localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));

    // Save cart items (already done in updateCart function)
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to checkout page
    window.location.href = 'checkout.html';
});
