import { cart, handleAddToCart } from '../data/cart.js'
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

const productsContainer = document.querySelector('.js-products-grid')
const fragment = document.createDocumentFragment();

products.forEach((product) => {
    const div = document.createElement('div')
    div.className = 'product-container'
    div.innerHTML = `
        <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-quantity">
              ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
    `
    fragment.appendChild(div)
})

productsContainer.appendChild(fragment)

const addToCart = document.querySelectorAll('.js-add-to-cart')
const quantity = document.querySelector('.js-quantity')
let timeoutId;



//Function to update quantity
const updateQuantity = (addedCart) => {   
        let cartQuantity = 0;

        cart.forEach(item => cartQuantity+= item.quantity)
        quantity.textContent = cartQuantity

        addedCart.classList.add('js-added-to-cart')

        timeoutId = setTimeout(() => {
            addedCart.classList.remove('js-added-to-cart')
        }, 1500)
}

addToCart.forEach((addBtn) => {
    addBtn.addEventListener('click', () => {

        clearTimeout(timeoutId)

        const { productId } = addBtn.dataset;
        const select = addBtn.closest('.product-container').querySelector('.js-select-quantity');
        const addedCart = addBtn.closest('.product-container').querySelector('.added-to-cart')
        const selectedQty = Number(select.value);
        
        handleAddToCart(productId, selectedQty)
        updateQuantity(addedCart)

        })
})


