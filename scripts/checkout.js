import {cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../data/cart.js'
import {products} from '../data/products.js' 
import { formatCurrency } from './utils/money.js'
import { calculateCartQuantity } from './utils/calculateCartQuantity.js'
import { deliveryOptions } from '../data/deliveryOptions.js'

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'


const todayDate = dayjs()
const deliveryDate = todayDate.add(7, 'days')

console.log(deliveryDate.format('dddd, MMMM D'))

const cartContainer = document.querySelector('.order-summary')
const fragment = document.createDocumentFragment()

calculateCartQuantity(cart, '.js-item-label')

renderOrderSummary(cart)

function renderOrderSummary(cart)  {

    cartContainer.innerHTML = ''

    cart.forEach((item) => {

    const {deliveryDays} = deliveryOptions.find(option => option.id === item.deliveryOptionsId)

    const {name, image, priceCents} = products.find(p => p.id === item.productId)


    const today = dayjs();
    const deliveryDate = today.add(deliveryDays, 'days')

    const dateString = deliveryDate.format('dddd, MMMM D')
    const div = document.createElement('div')

    div.className = 'cart-item-container'
    div.dataset.productId = item.productId
    div.innerHTML = `
        <div class="delivery-date">
              Delivery date: ${dateString}
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

              ${deliveryOptionHTML(item.productId,  item.deliveryOptionsId)}

              </div>
            </div>
    `
    fragment.appendChild(div)
})
cartContainer.appendChild(fragment)
calculateCartQuantity(cart, '.js-item-label')

}

function deliveryOptionHTML(productId, deliveryOptionsId) {
  // Wrap options in a container so CSS targeting `.delivery-options` applies
  let optionsHtml = '';
  deliveryOptions.forEach((option) => {
    const priceString = option.priceCents === 0 ? 'Free' : formatCurrency(option.priceCents)
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'days')

    const dateString = deliveryDate.format('dddd, MMMM D')
    const isChecked = option.id === deliveryOptionsId

    optionsHtml += `
      <div class="delivery-option">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${productId}"
          value="${option.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
    `
  })

  return `
    <div class="delivery-options">
      <div class="delivery-options-title">Delivery options</div>
      ${optionsHtml}
    </div>
  `
}

//Event Deligation instead of using QuerySelectorAll on button
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


// Listen for delivery option changes and update cart
cartContainer.addEventListener('change', (e) => {
  if (!e.target.classList.contains('delivery-option-input')) return
  const productEl = e.target.closest('.cart-item-container')
  if (!productEl) return
  const productId = productEl.dataset.productId
  const deliveryOptionId = e.target.value

  updateDeliveryOption(productId, deliveryOptionId)
  renderOrderSummary(cart)
})