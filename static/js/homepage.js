const categories = [
    { image: "/static/images/category-thumb-1.jpg", title: "Fruits ", link: "/categories/" ,value:"readytoeat"},
    { image: "/static/images/category-thumb-2.jpg", title: "Breads & Sweets", link: "/categories/",value:"Bakery_items"},
    { image: "/static/images/category-thumb-3.jpg", title: "Beverages", link: "/categories/" ,value:"Dairy"},
    { image: "/static/images/category-thumb-4.jpg", title: "Meat Products", link: "/categories/",value:"grocery"},
    { image: "/static/images/category-thumb-5.jpg", title: "Breads", link: "category.html" }
  ];




  const featuredProducts = [
    {
      title: "Featured Greek Style Plain Yogurt",
      image: "/static/images/product-thumb-10.png",
      rating: 4.5, // rating is 4.5 stars
      reviews: 222,
      oldPrice: 24.00,
      newPrice: 18.00,
      discount: "10% OFF"
    },
    {
      title: "Featured Organic Fresh Milk",
      image: "/static/images/product-thumb-11.png",
      rating: 3, // rating is 3 stars
      reviews: 150,
      oldPrice: 20.00,
      newPrice: 15.00,
      discount: "10% OFF"
    }
  ];
  // Function to generate Category Carousel
  function generateCategoryCarousel(categories) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    console.log('hello')
    if (!swiperWrapper) {
      console.error("Swiper wrapper not found!");
      return;
    }

    swiperWrapper.innerHTML = ''; // Clear existing content

    categories.forEach(category => {
      const slide = document.createElement('a');
      slide.href = category.link;
      console.log(slide.href) 
      slide.href = `${category.link}?categories=${category.value}`;  
      slide.className = 'nav-link swiper-slide text-center';

      const img = document.createElement('img');
      img.src = category.image;
      img.className = 'rounded-circle';
      img.alt = 'Category Thumbnail';

      const title = document.createElement('h4');
      title.className = 'fs-6 mt-3 fw-normal category-title';
      title.textContent = category.title;

      slide.appendChild(img);
      slide.appendChild(title);
      swiperWrapper.appendChild(slide);
    });
  }

  // Product data array
  const products = [
    {
      title: "Whole Wheat Sandwich Bread",
      imgSrc: "/static/images/product-thumb-1.png",
      rating: 4.5,
      reviews: 222,
      originalPrice: 24.00,
      discountedPrice: 18.00,
      discount: "10% OFF",
    },
    {
      title: "Whole Grain Oatmeal",
      imgSrc: "/static/images/product-thumb-2.png",
      rating: 2,
      reviews: 41,
      originalPrice: 54.00,
      discountedPrice: 50.00,
      discount: "10% OFF",
    },
    // Add more products here
  ];

  const productGrid = document.querySelector('.product-grid');

  // Function to generate Product Grid
  function generateProductItems(products) {
    products.forEach(product => {
      const productHTML = `
        <div class="col">
          <div class="product-item">
            <figure>
              <a href="index.html" title="${product.title}">
                <img src="${product.imgSrc}" alt="Product Thumbnail" class="tab-image">
              </a>
            </figure>
            <div class="d-flex flex-column text-center">
              <h3 class="fs-6 fw-normal">${product.title}</h3>
              <div>
              <span class="rating">
  ${Array.from({ length: 5 }, (_, i) => {
    const rating = product.rating || 0; // Default to 0 if no rating
    const isFull = rating >= i + 1;
    const isHalf = rating > i && rating < i + 1;
    const isEmpty = rating <= i;

    // Choose class based on the star's state
    const starClass = isFull ? "text-warning" : isHalf ? "text-warning" : "text-body"; // grey for empty stars

    return `<svg width="18" height="18" class="${starClass}">
              <use xlink:href="${isFull ? "#star-full" : isHalf ? "#star-half" : "#star-empty"}"></use>
            </svg>`;
  }).join('')}
</span>

                <span>(${product.reviews})</span>
              </div>
              <div class="d-flex justify-content-center align-items-center gap-2">
                <del>$${product.originalPrice.toFixed(2)}</del>
                <span class="text-dark fw-semibold">$${product.discountedPrice.toFixed(2)}</span>
                <span class="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">${product.discount}</span>
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
  




  // Initialize Category Carousel and Product Grid on page load
  document.addEventListener('DOMContentLoaded', () => {
    generateCategoryCarousel(categories);
    // generateProductItems(products);
    generateFeaturedProducts(featuredProducts)
  });





 
  
  // Function to generate featured product item HTML dynamically
  // Function to generate featured product item HTML dynamically
function generateFeaturedProducts(featuredProducts) {
    const productList = document.getElementById('featured-product-list');
    productList.innerHTML = ''; // Clear previous items (if any)
  
    featuredProducts.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item', 'swiper-slide');
  
      productItem.innerHTML = `
        <figure>
          <a href="index.html" title="${product.title}">
            <img src="${product.image}" alt="Product Thumbnail" class="tab-image">
          </a>
        </figure>
        <div class="d-flex flex-column text-center">
          <h3 class="fs-6 fw-normal">${product.title}</h3>
          <div>
            <span class="rating">
              ${generateRating(product.rating)} <!-- Dynamically generated stars -->
            </span>
          </div>
          <div class="d-flex justify-content-center align-items-center gap-2">
            <del>$${product.oldPrice}</del>
            <span class="text-dark fw-semibold">$${product.newPrice}</span>
            <span class="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">${product.discount}</span>
          </div>
          <div class="button-area p-3 pt-0">
            <div class="row g-1 mt-2">
              <div class="col-3"><input type="number" name="quantity" class="form-control border-dark-subtle input-number quantity" value="1"></div>
              <div class="col-7"><a href="#" class="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlink:href="#cart"></use></svg> Add to Cart</a></div>
              <div class="col-2"><a href="#" class="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlink:href="#heart"></use></svg></a></div>
            </div>
          </div>
        </div>
      `;
  
      productList.appendChild(productItem);
    });
  }
  
  // Function to generate rating stars
  function generateRating(rating) {
    return Array.from({ length: 5 }, (_, i) => {
      const isFull = rating >= i + 1;
      const isHalf = rating > i && rating < i + 1;
      const isEmpty = rating <= i;
  
      const starClass = isFull ? "text-warning" : isHalf ? "text-warning" : "text-body"; // grey for empty stars
  
      return `<svg width="18" height="18" class="${starClass}">
                <use xlink:href="${isFull ? "#star-full" : isHalf ? "#star-half" : "#star-empty"}"></use>
              </svg>`;
    }).join('');
  }
  
  
