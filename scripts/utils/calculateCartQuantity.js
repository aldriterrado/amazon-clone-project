export function calculateCartQuantity(cart, selector) {
    const element = document.querySelector(selector)
    if(!element) return

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
    element.textContent = totalItems
}