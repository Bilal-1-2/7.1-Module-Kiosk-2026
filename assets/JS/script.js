// Fetch products from API
fetch("http://localhost/7.1-Module-Kiosk-2026/api/products.php")
  .then((response) => response.json())
  .then((data) => {
    // data.data contains the products array
    const products = data.data.items;
    const container = document.getElementsByClassName("scroll-container")[0];
    const products_container =
      document.getElementsByClassName("products-container")[0];
    // Group products by category
    const categories = {};
    products.forEach((product) => {
      if (!categories[product.category_name]) {
        categories[product.category_name] = product;
      }
    });

    
    // Loop through categories and create HTML (one product per category)
    Object.values(categories).forEach((product) => {
      const html = `
                        <button class="scroll-item" onclick="window.location.href='test2.html?id=${product.category_id}'">
                        <img src="${product.filename}" >
                            <p class="category-name">${product.category_name}</p>
                        </button>
                    `;
      container.innerHTML += html;
    });
  });
// <p>${product.description}</p>
// <p>Price: $${product.price}</p>
