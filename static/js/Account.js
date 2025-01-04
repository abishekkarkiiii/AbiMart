async function fetchData(url) {
    try {
        let response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },body: JSON.stringify({'email':document.querySelector('.email').getAttribute('data-email')})
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
// console.log(getCookie('csrftoken'))
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

document.addEventListener('DOMContentLoaded', function() {
fetchData('/all_productsByUser/').then(data=>{
    const productList = document.getElementById('product-list');
    data.forEach(product => {
        productList.innerHTML += createProductCard(product);
    })
}) 


function createProductCard(product) {
    return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Product ID: <input type="text" value="${product.id}" class="form-control product-id" readonly></h5>
                    <p class="card-text">Product Name: <input type="text" value="${product.product_name}" class="form-control product-name"></p>
                    <p class="card-text">Details: <input type="text" value="${product.details}" class="form-control product-details"></p>
                    <p class="card-text">Price: <input type="text" value="${product.price}" class="form-control product-price"></p>
                    <p class="card-text">Image: <img src="${product.image}" alt="Product Image" class="img-fluid" width="50"></p>
                    <p class="card-text">Upload Image: <input type="file" class="form-control-file image-upload" data-product-id="${product.id} product-image"></p>
                    <button class="btn btn-primary save-changes" data-product-id="${product.id}" onclick="saveChanges(${product.id})">Save Changes</button>
                    <button class="btn btn-primary save-changes" data-product-id="${product.id}" onclick="deleteProduct(${product.id})">Delete Product</button>
                </div>
            </div>
        </div>
    `;
}});

function saveChanges(productId) {
    const product_name = document.querySelector(`.product-name`).value;
    const details = document.querySelector(`.product-details`).value;
    const price = document.querySelector(`.product-price`).value;
    // const formData = new FormData();
    // if(document.querySelector('.product-image').files[0]){
    //     formData.append('image', document.querySelector('.product-image').files[0]);
    // }
    //Hami eta adkeko thyo geda muji code.
    fetch





    fetch('/update_product/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            'id': productId,
            'name': product_name,
            'details': details,
            'price': price,
            // 'image': document.querySelector('.product-image').files[0]
        })
    }).then(response => {
        if (response.ok) {
            console.log('Product updated successfully');
        } else {
            console.log('Product update failed');
        }
    });
}


function deleteProduct(productId) {
    fetch('/delete_product/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            'id': productId
        })
    }).then(response => {
        if (response.ok) {
            console.log('Product deleted successfully');
        } else {
            console.log('Product delete failed');
        }
    });
    
}