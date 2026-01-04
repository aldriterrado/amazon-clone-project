import {cart, removeFromCart, updateQuantity} from '../data/cart.js'
import {products} from '../data/products.js' 
import { formatCurrency } from './utils/money.js'
import { calculateCartQuantity } from './utils/calculateCartQuantity.js'


const cartContainer = document.querySelector('.order-summary')
const fragment = document.createDocumentFragment()

calculateCartQuantity(cart, '.js-item-label')

renderOrderSummary(cart)

function renderOrderSummary(cart)  {

    cartContainer.innerHTML = ''

    cart.forEach((item) => {

    const {name, image, priceCents} = products.find(p => p.id === item.productId)

    const div = document.createElement('div')
    div.className = 'cart-item-container'
    div.dataset.productId = item.productId
    div.innerHTML = `
        <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${name}
                </div>
                <div class="product-price">
                  ${formatCurrency(priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update" data-product-id=${item.productId}>
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary js-save" data-product-id=${item.productId}>
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete" data-product-id=${item.productId}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${item.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${item.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${item.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `
    fragment.appendChild(div)
})
cartContainer.appendChild(fragment)
calculateCartQuantity(cart, '.js-item-label')

}

cartContainer.addEventListener('click', (e) => {
    if(!e.target.dataset.productId) return
    let productId = e.target.dataset.productId
    const productEl = e.target.closest('.cart-item-container')

    if(e.target.classList.contains('js-delete')){
        removeFromCart(productId)          
        renderOrderSummary(cart)
        calculateCartQuantity(cart, '.js-item-label')
    }

    if(e.target.classList.contains('js-update')){     

      if(!productEl) return

       const inputQuantity = productEl.querySelector('.quantity-input')
       const quantityLabel = productEl.querySelector('.quantity-label')
       const deleteBtn = productEl.querySelector('.js-delete')
       const save = productEl.querySelector('.js-save')
       inputQuantity.classList.add('is-editing-quantity')
       save.classList.add('is-editing-quantity')

       quantityLabel.style.display = 'none'
       deleteBtn.style.display = 'none'
    }

    if(e.target.classList.contains('js-save')){
      if(!productEl) return
      const inputQuantity = productEl.querySelector('.quantity-input')
      const newQty = Number(inputQuantity.value)

      if(isNaN(newQty) || newQty <= 0){
          alert('Quantity must be a positive number')
          return
      }

      updateQuantity(productId, newQty)
      renderOrderSummary(cart)
      calculateCartQuantity(cart, '.js-item-label')
      
    }

   
})