let cart = JSON.parse(localStorage.getItem('cart')) || [];

let addToCartBtn = document.querySelectorAll('.add-to-cart');
addToCartBtn.forEach(button =>{
    button.addEventListener('click',()=>{
        const name = button.getAttribute('data-name');
        const price = parseFloat( button.getAttribute('data-price'));
        const image = button.getAttribute('data-img');

        const ifItemIsInTheCart = cart.find(item => item.name === name);
        if(ifItemIsInTheCart){
            ifItemIsInTheCart.quantity += 1;
        }else{
            cart.push({name, price, image, quantity: 1});
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    })
})

function updateCartCount(){
    const cartCount = document.querySelector('.cart-count');
    cartCount.innerHTML = cart.length;
}
updateCartCount();