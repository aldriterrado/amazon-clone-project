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
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
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

addToCart.forEach((addBtn) => {
    addBtn.addEventListener('click', () => {
       const productId = addBtn.dataset.productId

       const existingProduct = cart.find(item => item.productId === productId)

       if(existingProduct){
        existingProduct.quantity++
       }else {
        cart.push({
            productId: productId,
            quantity: 1
        })
       }
       console.log(cart)
    })
})


