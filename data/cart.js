export let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionsId: '1'
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionsId: '2'
    }

];

const saveToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

//Function to add to cart
export const handleAddToCart = (productId, selectedQty) => {

    const existingProduct = cart.find(item => item.productId === productId)

    if(existingProduct){
        existingProduct.quantity += selectedQty
    }else {
        cart.push({
            productId: productId,
            quantity: selectedQty,
            deliveryOptionsId: '1'
        })
    }

    saveToStorage()
}

export const removeFromCart = (productId) => {
    cart = cart.filter(item => item.productId !== productId)
    saveToStorage()
}

export const updateQuantity = (productId, newQuantity) => {
    const existingProduct = cart.find(item => item.productId === productId)

    existingProduct.quantity = newQuantity

    saveToStorage()
}

export const updateDeliveryOption = (productId, deliveryOptionId) => {
    const existingProduct = cart.find(item => item.productId === productId)

    if(!existingProduct) return

    // The cart items use `deliveryOptionsId` (plural) — keep the data shape consistent
    existingProduct.deliveryOptionsId = deliveryOptionId

    saveToStorage()
}