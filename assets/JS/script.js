// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Fetch products from API
  fetch("http://localhost/7.1-Module-Kiosk-2026/api/products.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data.items);
      // data.data contains the products array
      const products = data.data.items;
      const container = document.getElementsByClassName("scroll-container")[0];
      const products_container = document.getElementById("products-container");
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
                          <button class="scroll-item" onclick="window.location.href='index.html?id=${product.category_id}'">
                          <img src="${product.categoryfilename}" >
                              <p class="category-name">${product.category_name}</p>
                          </button>
                      `;
        container.innerHTML += html;
      });

      products.forEach((product) => {
        const html = `<a href='#' onclick="showProductDetail('${product.id}', '${product.name}', '${product.description}', '${product.price}', '${product.filename}', '${product.kcal || 0}')">
                          <div class ="product">
                          <img src="${product.filename}" >
                              <p class="product-name">${product.name}</p>
                              <p class="product-price" >€${product.price}</p>
                          </div>
                          </a>
                      `;
        products_container.innerHTML += html;
      });
    });

  // Add popup HTML to body using appendChild instead of innerHTML
  const detailOverlay = document.createElement("div");
  detailOverlay.className = "detail-overlay";
  detailOverlay.id = "detailOverlay";
  detailOverlay.onclick = closeProductDetail;

  const detailPopup = document.createElement("div");
  detailPopup.className = "detail-popup";
  detailPopup.id = "detailPopup";
  detailPopup.innerHTML = `
   <div class = "details">
    <img class="detail-image" id="detailImage" src="" alt="">
    <h2 class="detail-title" id="detailTitle">kcal:</h2>
    <p class="detail-description" id="detailDescription"></p>
    <p class="detail-kcal" id="detailkcal"></p>
    
     </div>
    <div class="detail-actions">
      <button class="detail-cancel-btn" onclick="closeProductDetail()">Annuleren</button>
      <div class="quantity-selector">
        <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
        <span class="quantity-display" id="quantityDisplay">1</span>
        <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
      </div>
      <button class="detail-add-btn" id="detailAddBtn" onclick="addToCart()">Toevoegen<p class="detail-price" id="detailPrice"></p></button>
    </div>
  `;

  // Create close button separately
  const detailClose = document.createElement("button");
  detailClose.className = "detail-close";
  detailClose.id = "detailClose";
  detailClose.innerHTML = "&times;";
  detailClose.onclick = closeProductDetail;

  document.body.appendChild(detailOverlay);
  document.body.appendChild(detailPopup);
  document.body.appendChild(detailClose);
});

// Global variable to store current product name
let currentProductName = "";

// Quantity variable
let currentQuantity = 1;

// Change quantity
function changeQuantity(delta) {
  const quantityDisplay = document.getElementById("quantityDisplay");
  currentQuantity += delta;
  if (currentQuantity < 1) currentQuantity = 1;
  if (currentQuantity > 99) currentQuantity = 99;
  quantityDisplay.textContent = currentQuantity;
}

// Select order type (eat-in or take-out)
function selectOrderType(type, event) {
  if (event) {
    event.stopPropagation();
  }
  const idleScreen = document.getElementById("idle-screen");
  idleScreen.classList.add("hidden");
}

// Show order options after clicking idle screen
function showOrderOptions() {
  document.getElementById("idle-main").style.display = "none";
  document.getElementById("order-options").style.display = "flex";
}

// Show product detail popup
function showProductDetail(id, name, description, price, image, kcal) {
  currentProductName = name;
  currentQuantity = 1; // Reset quantity
  document.getElementById("quantityDisplay").textContent = "1";
  document.getElementById("detailImage").src = image;
  document.getElementById("detailTitle").textContent = name;
  document.getElementById("detailkcal").textContent = "kcal:"+ kcal;
  document.getElementById("detailDescription").textContent =
    description || "Geen beschrijving beschikbaar";
  document.getElementById("detailPrice").textContent = "€" + price;
  document.getElementById("detailOverlay").classList.add("active");
  document.getElementById("detailPopup").classList.add("active");
  document.getElementById("detailClose").classList.add("visible");
}

// Close product detail popup
function closeProductDetail() {
  document.getElementById("detailOverlay").classList.remove("active");
  document.getElementById("detailPopup").classList.remove("active");
  document.getElementById("detailClose").classList.remove("visible");
}

// Add to cart function
function addToCart() {
  closeProductDetail();

  // Create toast message with product name
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = currentProductName + " toegevoegd aan u order!";
  document.body.appendChild(toast);

  // Show toast
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // Hide and remove toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 5000);
}
