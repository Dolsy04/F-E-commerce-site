const cart = JSON.parse(localStorage.getItem('cart')) || [];
const deliveryInfo = JSON.parse(localStorage.getItem('deliveryInfo')) || {};

// Display cart items in the checkout page with images and containers
const cartItemsContainer = document.getElementById('checkout-cart-items');
let totalPrice = 0;

if (cart.length > 0) {
    cart.forEach(item => {
        // Create a div container with a class for styling
        const cartItemContainer = document.createElement('div');
        cartItemContainer.classList.add('cart-item'); // You can style this class in your CSS
        
        // Add product image, name, price, and quantity
        cartItemContainer.innerHTML = `
            <div class="item-details">
                <img src="${item.image}" alt="${item.name}" class="product-image" width="100" height="100">
                <div class="info">
                    <p><strong>Item:</strong> ${item.name}</p>
                    <p><strong>Price:</strong> <i class="fa-solid fa-naira-sign"></i>${item.price.toFixed(2)}</p>
                    <p><strong>Quantity:</strong> ${item.quantity}</p>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(cartItemContainer);
        totalPrice += item.price * item.quantity;
    });

    // Display total price
    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<h3>Total Price:<i class="fa-solid fa-naira-sign"></i>${totalPrice.toFixed(2)}</h3>`;
    cartItemsContainer.appendChild(totalElement);
} else {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
}

// Display delivery information
if (deliveryInfo.fullName) {
    document.getElementById('full-name').innerHTML = `<h4>Full Name:</h4> ${deliveryInfo.fullName}`;
    document.getElementById('email').innerHTML = `<h4>Email:</h4> ${deliveryInfo.email}`;
    document.getElementById('phone').innerHTML = `<h4>Phone:</h4> ${deliveryInfo.phone}`;
    document.getElementById('optionalPhone').innerHTML = `<h4>Optional Phone:</h4> ${deliveryInfo.optionalPhone || 'N/A'}`;
    document.getElementById('address').innerHTML = `<h4>Address:</h4> ${deliveryInfo.address}`;
} else {
    document.querySelector('.delivery-info').innerHTML = '<p>No delivery information available.</p>';
}

// Paystack payment integration
document.getElementById('proceed-to-payment').addEventListener('click', function() {
    const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 100; // Amount in kobo

    const handler = PaystackPop.setup({
        key: 'pk_test_e09323e8a7244cb7d8c0364612cb420d148d6f27', // Replace with your Paystack public key
        email: deliveryInfo.email, // Customer email
        amount: totalAmount, // Amount in kobo
        currency: 'NGN',
        ref: 'CLO-STE-24-' + Math.floor(Math.random() * 1000000000), // Generate a unique reference

        // Additional customer info in metadata
        metadata: {
            custom_fields: [
                {
                    display_name: "Full Name",
                    // variable_name: "full_name",
                    value: deliveryInfo.fullName // Pass customer's full name
                },
                {
                    display_name: "Phone Number",
                    // variable_name: "phone_number",
                    value: deliveryInfo.phone // Pass customer's phone number
                }
            ]
        },

        callback: function(response) {
            alert('Payment successful. Transaction reference: ' + response.reference);
            // Redirect to success page or clear cart
            localStorage.removeItem('cart'); // Clear cart after payment
            window.location.href = 'success.html'; // Redirect to success page
        },
        onClose: function() {
            alert('Payment was not completed.');
        }
    });

    handler.openIframe(); // Open the Paystack payment modal
});
