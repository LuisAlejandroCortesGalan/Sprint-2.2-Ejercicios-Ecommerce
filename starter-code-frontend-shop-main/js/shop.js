// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.

var cart = [];

var total = 0;

// Exercise 1
function buy(id) {

    // 1. Loop for to the array products to get the item to add to cart
    let productSelected = products[id - 1];
    let productInCart = cart.find(product => product.id === productSelected.id)

    // 2. Add found product to the cart array

    if (productInCart) {
        productInCart.quantity += 1
    } else {
        productSelected.quantity = 1
        cart.push(productSelected)
        document.getElementById(id).style.display = "inline";
    }
    console.log(" Producto seleceted", productSelected);


    for (let i = 0; i < cart.length; i++) {
        console.log(cart[i].name, "y cantidad ", cart[i].quantity);
    }
    applyPromotionsCart();
    calculateTotal();
    printCart();
}

// Exercise 2
function cleanCart() {
    // Vaciar el carrito
    cart.length = 0; // Esto vacía el array sin eliminar su referencia

    let modal = document.getElementById("cart_list");
    let mensaje = "";
    for (let i = 0; i < cart.length; i++) {
        mensaje += `		<tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td>
                                    </td>                                 
                            </tr>`;
    }
    modal.innerHTML = mensaje;
    document.getElementById("total_price").innerHTML = ``;

    // Confirmación en la consola
    console.log("Carrito vaciado. Contenido actual del carrito:", cart);
    
    let sub = document.getElementsByClassName("sub");

    for (let i = 0; i < sub.length; i++) {
        sub[i].style.display = "none";
    }

}


// // Exercise 3
function calculateTotal() {
    // Calcular el precio total del carrito
    let total = cart.reduce((accumulator, item) => accumulator + item.price * (item.quantity || 1), 0);

    // Actualizar el contenido del elemento con id "count_product"
    document.getElementById("count_product").innerHTML = `Total: $${total.toFixed(2)}`;

}


// Exercise 4
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    for (let i = 0; i < cart.length; i++) {
        // Asegúrate de tener un precio original registrado
        if (!cart[i].originalPrice) {
            cart[i].originalPrice = cart[i].price; // Guarda el precio original al principio
        }

        // Cooking oil: aplicar o revertir el descuento
        if (cart[i].name === "cooking oil") {
            if (cart[i].quantity >= 3) {
                cart[i].subtotalWithDiscount = cart[i].originalPrice * 0.80; // Aplica descuento
                cart[i].price = cart[i].subtotalWithDiscount;
            } else {
                cart[i].subtotalWithDiscount = undefined; // Revertir descuento
                cart[i].price = cart[i].originalPrice; // Reasigna el precio original
            }
        }

        // Instant cupcake mixture: aplicar o revertir el descuento
        if (cart[i].name === "Instant cupcake mixture") {
            if (cart[i].quantity >= 10) {
                cart[i].subtotalWithDiscount = cart[i].originalPrice * 0.70; // Aplica descuento
                cart[i].price = cart[i].subtotalWithDiscount;
            } else {
                cart[i].subtotalWithDiscount = undefined; // Revertir descuento
                cart[i].price = cart[i].originalPrice; // Reasigna el precio original
            }
        }
    }

    calculateTotal(); // Recalcula el total
}


// Exercise 5
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    let modal = document.getElementById("cart_list");
    let total = document.getElementById("total_price");
    let totalPrice = 0;
    let mensaje = "";

    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            // Calcular el subtotal por producto
            let subtotal = cart[i].subtotalWithDiscount ? cart[i].subtotalWithDiscount * cart[i].quantity : cart[i].price * cart[i].quantity;
    
            // Sumar el subtotal al total general
            totalPrice += subtotal;
    
            // Crear el mensaje HTML para mostrar en el carrito
            mensaje += `		<tr>
                                    <th scope="row">${cart[i].name}</th>
                                    <td>${cart[i].price}</td>
                                    <td>${cart[i].quantity}</td>
                                    <td>${subtotal.toFixed(2)}</td>                                 
                                </tr>`;
        }
    
        // Mostrar el total calculado en el elemento de precio total
        total.innerHTML = `$${totalPrice.toFixed(2)}`;
    
        // Mostrar el mensaje HTML generado en el modal
        modal.innerHTML = mensaje;
    } else {
        modal.innerHTML = `<tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td>
                                    </td>                                 
                            </tr>`;
        total.innerHTML = ``;
    }
        
    

}



// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
    console.log("removing from cart");
    let index = cart.findIndex(item => item.id === id);

    if (cart[index].quantity > 0) {
        cart[index].quantity -= 1
        console.log("borrado del cart el indice:", index, "Nueva cantidad", cart[index].quantity);
        applyPromotionsCart();
        calculateTotal();
        printCart();
    }
    if(cart[index].quantity === 0){
        let borrado = cart.splice(index, 1);
        console.log("borrado del cart el indice:", index, "borramos:", borrado);
        document.getElementById(id).style.display = "none";
        applyPromotionsCart();
        calculateTotal();
        printCart();
    }
}

function open_modal() {
    printCart();
}