export const cart = [
    {
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1
    },
    {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:2
    },
    {
        productId:"54e0eccd-8f36-462b-b68a-8182611d9add",
        quantity:3
    }
];

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

export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })
    return newCart;
}

export function removeQuantityFromCart(productId, products){
    let product = FetchFromCartById(productId, products);
    console.log(product.productId, product.quantity);
    if(product.quantity === 0){
        return product.quantity;
    }
    product.quantity -= 1;
    return product.quantity;
}

export function FetchAndReturnProduct(Id, products){
    let isFound = false;
    const product = products.find(product => product.id === Id);
    if (!product) {
        console.log('No matching product found with Id - ' + Id);
        return products[0];
    }
    return product;
}

export function FetchFromCartById(Id){
    const product = cart.find(item => item.productId === Id);
    if (!product) {
        console.log('No matching product found with Id - ' + Id);
        return cart[0];
    }
    return product;
}