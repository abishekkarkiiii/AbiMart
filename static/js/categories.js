// Function to generate Product Grid
function generateProductItems(products) {
    console.log("Received Products:", products);  // Log received products for debugging
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
      const productHTML = `
        <div class="col">
          <div class="product-item">
            <figure>
              <a href="index.html" title="${product.product_name}">
                <img src="${product.image}" alt="Product Thumbnail" class="tab-image">
              </a>
            </figure>
            <div class="d-flex flex-column text-center">
              <h3 class="fs-6 fw-normal">${product.product_name}</h3>
              <div>
                <span class="rating">
                  ${Array.from({ length: 5 }, (_, i) => {
                    const rating = product.rating || 0; // Default to 0 if no rating
                    const isFull = rating >= i + 1;
                    const isHalf = rating > i && rating < i + 1;
                    const isEmpty = rating <= i;

                    const starClass = isFull ? "text-warning" : isHalf ? "text-warning" : "text-body";
                    return `<svg width="18" height="18" class="${starClass}">
                              <use xlink:href="${isFull ? "#star-full" : isHalf ? "#star-half" : "#star-empty"}"></use>
                            </svg>`;
                  }).join('')}
                </span>
                <span>(${product.reviews || 0})</span>  <!-- Default to 0 reviews if not present -->
              </div>
              <div class="d-flex justify-content-center align-items-center gap-2">
                <del>$${product.price.toFixed(2)}</del>
                <span class="text-dark fw-semibold">$${(product.price * 0.9).toFixed(2)}</span>  <!-- Example discounted price -->
                <span class="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">${product.discount || "10%"}</span>  <!-- Default discount if not present -->
              </div>
              <div class="button-area p-3 pt-0">
                <div class="row g-1 mt-2">
                  <div class="col-3"><input type="number" name="quantity" class="form-control border-dark-subtle input-number quantity" value="1"></div>
                  <div class="col-7"><a href="#" class="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlink:href="#cart"></use></svg> Add to Cart</a></div>
                  <div class="col-2"><a href="#" class="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlink:href="#heart"></use></svg></a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      productGrid.insertAdjacentHTML('beforeend', productHTML);
    });
}


// Fetch the products from the backend dynamically
document.addEventListener('DOMContentLoaded', () => {
    const category = 'Electronics';  // Adjust dynamically if necessary
    fetch(`/categories/?categories=${category}`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Data:", data);  // Log the full response
        if (data.products) {
            window.
           
          generateProductItems(data.products);
        } else {
          console.error("No products found in the response.");
        }
      })
      .catch(error => console.error('Error fetching products:', error));
});
