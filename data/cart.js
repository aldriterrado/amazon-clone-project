export const cart = [];

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