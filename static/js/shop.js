
// for cordinates of user

// function getUserLocation() {
//     return new Promise((resolve, reject) => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     resolve({ latitude, longitude });
//                 },
//                 (error) => {
//                     reject(`Error getting location: ${error.message}`);
//                 }
//             );
//         } else {
//             reject("Geolocation is not supported by this browser.");
//         }
//     });
// }


// getUserLocation()
//     .then(location => {
//         console.log(location)
//         fetch('/getlocation/',{
//             method:'post',
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify({
//                 'latitude':location.latitude,
//                 'longitude':location.longitude,
//             })
//         })
        
//         console.log("User location:", location);
//     })
//     .catch(error => {
//         console.error(error);
//     });



let cartItems = [];

// Function to add an item to the cart
function addToCart(productId, productName, productPrice) {
    // Get the quantity input field
    const quantityInput = document.querySelector(`#productnumber${productId}`);
    if (!quantityInput) {
        console.error(`Quantity input for product ID ${productId} not found.`);
        return;
    }

    // Fetch and validate the current quantity
    let currentQuantity = parseInt(quantityInput.value) || 0; // Default to 0 if empty or invalid

    if (currentQuantity <= 0) {
        console.warn("Quantity must be greater than zero.");
        return;
        
    }

    // Check if the item already exists in the cart
    const existingItem = cartItems.find(item => item.id ==="productnumber"+productId);

    if (existingItem) {
        // If item exists, update its quantity
        console.log("Item already exists in the cart. Updating quantity.");
        removeFromCart(existingItem.id);
        // existingItem.quantity = currentQuantity;
        cartItems.push({ id: "productnumber" + productId, name: productName, price: productPrice, quantity: currentQuantity });
    } else {
        // Add new item to the cart with the current quantity
        console.log("Item added to the cart.");
        cartItems.push({ id: "productnumber" + productId, name: productName, price: productPrice, quantity: currentQuantity });
    }
        // Add new item to the cart with the current quantity
       
        console.log("Cart items:", JSON.stringify(cartItems,null,2));
    

    // Update the cart UI
    updateCartUI();

    // Show the overflow button
    const overflowButton = document.getElementById("overflow-button");
    if (overflowButton) {
        overflowButton.classList.remove("d-none");
    }
}


// Function to update the cart UI dynamically
function updateCartUI() {
    
    const cartList = document.querySelector("#list-group .list-group");
    const cartBadge = document.querySelector(".offcanvas-body .badge");

    // Check if cart elements exist
    if (!cartList || !cartBadge) {
        console.error("Cart elements not found in the DOM.");
        return;
    }

    // Clear the existing cart list
    cartList.innerHTML = "";

    let total = 0;

    // Loop through cart items and create list items
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
    
        const listItem = `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${item.name}</h6>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-outline-secondary btn-sm me-2" data-product-id="${item.id}" onclick="decreaseQuantity('${item.id}')">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-outline-secondary btn-sm ms-2" data-product-id="${item.id}" onclick="increaseQuantity('${item.id}')">+</button>
                    </div>
                </div>
                <div class="d-flex flex-column align-items-end">
                    <span class="text-body-secondary">NPR ${itemTotal.toFixed(2)}</span>
                  
                   <button class="btn btn-danger btn-sm mt-2" data-product-id="${item.id}" onclick="removeFromCart('${item.id}')">Remove</button>
                   
                </div>
            </li>
        `;
        cartList.insertAdjacentHTML("beforeend", listItem);
    });

    // Add total to the cart
    cartList.insertAdjacentHTML(
        "beforeend",
        `
        <li class="list-group-item d-flex justify-content-between">
            <span>Total (NPR)</span>
            <strong>NPR ${total.toFixed(2)}</strong>
        </li>
        `
    );

    // Update the badge with the total number of items
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

}


function goToCart() {
    console.log('hello working function')
    // Redirect to cart page or toggle the cart offcanvas
    const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasCart'));
    cartOffcanvas.show();
    document.getElementById("overflow-button").classList.add("d-none");
}


function increaseQuantity(productId) {
    const item = cartItems.find(item => item.id === productId);
    
    if (item) {
        item.quantity += 1;
        document.getElementById(productId).value=item.quantity;
        updateCartUI();
    }
}


function decreaseQuantity(productId) {
    console.log(productId)
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity -= 1;
        document.getElementById(productId).value=item.quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId); // Remove item if quantity is zero
        } else {
            updateCartUI();
        }
    }
}


function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCartUI();
}
document.getElementById("cart_close").addEventListener("click", function() {
   if(cartItems.length>0){
    document.getElementById("overflow-button").classList.remove("d-none");
   }
});

// for buying the product
function buy(){
    fetch('/buy/',{
      method:'post',
      headers:{
          'Content-Type':'application/json',
          'X-CSRFToken': getCookie('csrftoken')
      },
      body:JSON.stringify({
            'cartItems':cartItems, 
      })
    })}

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

