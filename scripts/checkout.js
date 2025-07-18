import {cart, FetchAndReturnProduct, removeFromCart} from '../data/cart.js'
import { products } from '../data/products.js';
import {formatPrice} from '../scripts/utils/moneyHelper.js';

let cartContainerHTML = ''
cart.forEach((item)=>{
    var matchingProduct = FetchAndReturnProduct(item.productId, products);
    cartContainerHTML += `<div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatPrice(matchingProduct.priceCents, 2)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label js-quantity-label">${item.quantity}</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link"
                  data-product-id = '${matchingProduct.id}'>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
})

document.querySelector('.js-order-summary')
    .innerHTML = cartContainerHTML;

document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link)=>{
    link.addEventListener(('click'), () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        document.querySelector(
          `.js-cart-item-container-${productId}`
        ).remove();
      });
    });