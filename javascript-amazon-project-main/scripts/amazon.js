let productHtml = '';

products.forEach((product, index)=>{
    productHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">$${(product.priceCents/100).toFixed(2)}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" 
          data-product-id = "${product.id}"
          data-product-name = "${product.name}">
          Add to Cart
          </button>
        </div>`        
});

document.querySelector('.js-products-grid').innerHTML = productHtml;

document.querySelectorAll('.js-add-to-cart-button')
    .forEach((button)=>{
        button.addEventListener
        ('click', ()=>{
            AddToCart(button);  
            UpdateCartQuantity(document, cart);         
        })
    });

function AddToCart(button) {
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
    // console.log(cart);
}

function UpdateCartQuantity(document, cart){
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