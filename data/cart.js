export let cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }

];

//Function to add to cart
export const handleAddToCart = (productId, selectedQty) => {

    const existingProduct = cart.find(item => item.productId === productId)

    if(existingProduct){
        existingProduct.quantity += selectedQty
    }else {
        cart.push({
            productId: productId,
            quantity: selectedQty
        })
    }
}

export const removeFromCart = (productId) => {
    cart = cart.filter(item => item.productId !== productId)
}