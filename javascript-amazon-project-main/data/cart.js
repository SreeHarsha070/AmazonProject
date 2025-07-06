export const cart = [];

export function addToCart(button) {
    let matchFound = false;
    let productId = button.dataset.productId;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchFound = true;
            item.quantity += 1;
        }
    });

    if (matchFound === false) {
        cart.push({
            productId: productId,
            productName: button.dataset.productName,
            quantity: 1
        });
    }
}

export function updateCartQuantity(document, cart){
    let cartQuantity = 0;
    cart.forEach((item)=>{
        cartQuantity += item.quantity
    })

    const quantityElement = document.querySelector('.js-cart-quantity');
    if (!quantityElement) {
        console.error(".js-cart-quantity not found in DOM");
        return;
    }

    quantityElement.innerHTML = cartQuantity;
}