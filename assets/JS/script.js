// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Language translations
  const translations = {
    nl: {
      orderHere: "BESTELLEN",
      eatIn: "Eat-in",
      takeOut: "Meenemen",
      cancel: "Annuleren",
      add: "Toevoegen",
      addedToOrder: "toegevoegd aan uw bestelling!",
      reviewOrder: "Bestelling Bekijken",
      total: "Totaal",
      pay: "Betalen",
      thankYou: "Bedankt voor uw bestelling!",
      orderNumber: "Bestelnummer",
      newOrder: "Nieuwe Bestelling",
      emptyCart: "Winkelwagen is leeg",
      remove: "Verwijderen",
      language: "Taal",
      noDescription: "Geen beschrijving beschikbaar",
      choosePayment: "Kies betaalmethode",
      processing: "Betaling wordt verwerkt...",
      chooseLanguage: "Taal",
    },
    en: {
      orderHere: "ORDER NOW",
      eatIn: "Eat-in",
      takeOut: "Take-out",
      cancel: "Cancel",
      add: "Add",
      addedToOrder: "added to your order!",
      reviewOrder: "Review Order",
      total: "Total",
      pay: "Pay",
      thankYou: "Thank you for your order!",
      orderNumber: "Order Number",
      newOrder: "New Order",
      emptyCart: "Cart is empty",
      remove: "Remove",
      language: "Language",
      noDescription: "No description available",
      choosePayment: "Choose payment method",
      processing: "Payment is being processed...",
      chooseLanguage: "Language",
    },
  };

  let currentLang = "nl";
  let cart = [];
  let currentCategory = "all";

  // Fetch products from API
  fetch("http://localhost/7.1-Module-Kiosk-2026/api/products.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data.items);
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

      // Add "All" category button first
      const allCategories = [
        {
          id: "all",
          name: "Alles",
          filename:
            "assets/images/logos/logo_big_happy_herbivore_transparent.png",
        },
      ];
      Object.values(categories).forEach((product) => {
        allCategories.push({
          id: product.category_id,
          name: product.category_name,
          filename: product.categoryfilename,
        });
      });

      // Loop through categories and create HTML
      allCategories.forEach((cat) => {
        const html = `
          <button class="scroll-item ${cat.id === "all" ? "active" : ""}" onclick="filterCategory('${cat.id}', this)">
            <img src="${cat.filename}">
            <p class="category-name">${cat.name}</p>
          </button>
        `;
        container.innerHTML += html;
      });

      // Store products globally for filtering
      window.allProducts = products;

      // Render all products initially
      renderProducts(products);
    });

  // Add popup HTML to body
  const detailOverlay = document.createElement("div");
  detailOverlay.className = "detail-overlay";
  detailOverlay.id = "detailOverlay";
  detailOverlay.onclick = closeProductDetail;

  const detailPopup = document.createElement("div");
  detailPopup.className = "detail-popup";
  detailPopup.id = "detailPopup";
  detailPopup.innerHTML = `
    <div class="details">
      <img class="detail-image" id="detailImage" src="" alt="">
      <h2 class="detail-title" id="detailTitle"></h2>
      <p class="detail-kcal" id="detailkcal"></p>
      <p class="detail-description" id="detailDescription"></p>
    </div>
    <div class="detail-actions">
      <button class="detail-cancel-btn" id="detailCancelBtn" onclick="closeProductDetail()">Annuleren</button>
      <div class="quantity-selector">
        <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
        <span class="quantity-display" id="quantityDisplay">1</span>
        <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
      </div>
      <button class="detail-add-btn" id="detailAddBtn" onclick="addToCart()">Toevoegen <span class="detail-price" id="detailPrice"></span></button>
    </div>
  `;

  // Create close button separately
  const detailClose = document.createElement("button");
  detailClose.className = "detail-close";
  detailClose.id = "detailClose";
  detailClose.innerHTML = "&times;";
  detailClose.onclick = closeProductDetail;

  // Create order review popup - FIXED STRUCTURE
  const reviewOverlay = document.createElement("div");
  reviewOverlay.className = "detail-overlay";
  reviewOverlay.id = "reviewOverlay";
  reviewOverlay.onclick = closeReviewOrder;

  const reviewPopup = document.createElement("div");
  reviewPopup.className = "detail-popup review-popup";
  reviewPopup.id = "reviewPopup";
  reviewPopup.innerHTML = `
    <h2 class="detail-title" id="reviewTitle">Bestelling Bekijken</h2>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-total">
      <span id="cartTotalText">Totaal:</span>
      <span id="cartTotal">€0.00</span>
    </div>
    <div class="detail-actions">
      <button class="detail-cancel-btn" id="reviewCancelBtn" onclick="closeReviewOrder()">Annuleren</button>
      <button class="detail-add-btn" id="reviewPayBtn" onclick="showPayment()">Betalen</button>
    </div>
  `;

  // Create payment popup
  const paymentOverlay = document.createElement("div");
  paymentOverlay.className = "detail-overlay";
  paymentOverlay.id = "paymentOverlay";
  paymentOverlay.onclick = closePayment;

  const paymentPopup = document.createElement("div");
  paymentPopup.className = "detail-popup payment-popup";
  paymentPopup.id = "paymentPopup";
  paymentPopup.innerHTML = `
    <h2 class="detail-title" id="paymentTitle">Kies betaalmethode</h2>
    <div class="payment-options">
      <button class="payment-btn" onclick="processPayment('card')">
        <div class="payment-icon card-icon">💳</div>
        <span>Pin/Creditcard</span>
      </button>
      <button class="payment-btn" onclick="processPayment('apple')">
        <div class="payment-icon apple-icon"></div>
        <span>Apple Pay</span>
      </button>
      <button class="payment-btn" onclick="processPayment('google')">
        <div class="payment-icon google-icon">G</div>
        <span>Google Pay</span>
      </button>
    </div>
    <button class="detail-cancel-btn" id="paymentCancelBtn" onclick="closePayment()">Annuleren</button>
  `;

  // Create processing popup
  const processingOverlay = document.createElement("div");
  processingOverlay.className = "detail-overlay";
  processingOverlay.id = "processingOverlay";

  const processingPopup = document.createElement("div");
  processingPopup.className = "detail-popup processing-popup";
  processingPopup.id = "processingPopup";
  processingPopup.innerHTML = `
    <img src="assets/images/animation/Gradient Loader  Spinner - Light Blue.gif" alt="Loading" class="processing-image">
    <h2 class="processing-title" id="processingTitle">Betaling wordt verwerkt...</h2>
  `;

  // Create thank you popup
  const thankYouOverlay = document.createElement("div");
  thankYouOverlay.className = "detail-overlay";
  thankYouOverlay.id = "thankYouOverlay";

  const thankYouPopup = document.createElement("div");
  thankYouPopup.className = "detail-popup thank-you-popup";
  thankYouPopup.id = "thankYouPopup";
  thankYouPopup.innerHTML = `
    <img src="assets/images/animation/Success.gif" alt="Success" class="thank-you-image">
    <h2 class="detail-title" id="thankYouTitle">Bedankt voor uw bestelling!</h2>
    <p class="order-number" id="orderNumberText">Bestelnummer: <span id="orderNumber"></span></p>
    <button class="detail-add-btn" id="newOrderBtn" onclick="startNewOrder()">Nieuwe Bestelling</button>
  `;

  // Create order review button (bottom right) - WITHOUT language toggle
  const orderReviewBtn = document.createElement("button");
  orderReviewBtn.className = "order-review-btn";
  orderReviewBtn.id = "orderReviewBtn";
  orderReviewBtn.innerHTML = `<span id="reviewBtnText">Bestelling Bekijken</span><span id="cartCount" class="cart-count">0</span>`;
  orderReviewBtn.onclick = showReviewOrder;

  // Append all elements to body
  document.body.appendChild(detailOverlay);
  document.body.appendChild(detailPopup);
  document.body.appendChild(detailClose);
  document.body.appendChild(reviewOverlay);
  document.body.appendChild(reviewPopup);
  document.body.appendChild(paymentOverlay);
  document.body.appendChild(paymentPopup);
  document.body.appendChild(processingOverlay);
  document.body.appendChild(processingPopup);
  document.body.appendChild(thankYouOverlay);
  document.body.appendChild(thankYouPopup);
  document.body.appendChild(orderReviewBtn);

  // Update language button text
  window.updateLangText = function () {
    const t = translations[currentLang];
    document.getElementById("reviewBtnText").textContent = t.reviewOrder;
  };
});

// Global variables
let currentProductName = "";
let currentProductPrice = 0;
let currentProductImage = "";
let currentQuantity = 1;
let currentLang = "nl";
let cart = [];

// Language translations - accessible globally
const translations = {
  nl: {
    orderHere: "BESTELLEN",
    eatIn: "Eat-in",
    takeOut: "Meenemen",
    cancel: "Annuleren",
    add: "Toevoegen",
    addedToOrder: "toegevoegd aan uw bestelling!",
    reviewOrder: "Bestelling Bekijken",
    total: "Totaal",
    pay: "Betalen",
    thankYou: "Bedankt voor uw bestelling!",
    orderNumber: "Bestelnummer",
    newOrder: "Nieuwe Bestelling",
    emptyCart: "Winkelwagen is leeg",
    remove: "Verwijderen",
    language: "Taal",
    noDescription: "Geen beschrijving beschikbaar",
    choosePayment: "Kies betaalmethode",
    processing: "Betaling wordt verwerkt...",
  },
  en: {
    orderHere: "ORDER NOW",
    eatIn: "Eat-in",
    takeOut: "Take-out",
    cancel: "Cancel",
    add: "Add",
    addedToOrder: "added to your order!",
    reviewOrder: "Review Order",
    total: "Total",
    pay: "Pay",
    thankYou: "Thank you for your order!",
    orderNumber: "Order Number",
    newOrder: "New Order",
    emptyCart: "Cart is empty",
    remove: "Remove",
    language: "Language",
    noDescription: "No description available",
    choosePayment: "Choose payment method",
    processing: "Payment is being processed...",
  },
};

// Toggle language for idle screen
function toggleIdleLanguage() {
  currentLang = currentLang === "nl" ? "en" : "nl";
  const langBtn = document.getElementById("idleLangToggle");
  langBtn.textContent = currentLang === "nl" ? "NL" : "EN";
  
  // Update idle screen text
  const t = translations[currentLang];
  document.getElementById("order-btn").textContent = t.orderHere;
  
  // Update order options text if visible
  const eatInBtn = document.querySelector('.begin.eat-in');
  const takeOutBtn = document.querySelector('.begin.takeout');
  if (eatInBtn) eatInBtn.textContent = t.eatIn;
  if (takeOutBtn) takeOutBtn.textContent = t.takeOut;
}

// Helper function to hide order review button
function hideOrderReviewButton() {
  document.getElementById("orderReviewBtn").classList.add("hidden");
}

// Helper function to show order review button
function showOrderReviewButton() {
  document.getElementById("orderReviewBtn").classList.remove("hidden");
}

// Filter products by category
function filterCategory(categoryId, element) {
  document
    .querySelectorAll(".scroll-item")
    .forEach((item) => item.classList.remove("active"));
  element.classList.add("active");

  const products_container = document.getElementById("products-container");
  products_container.innerHTML = "";
  const products = window.allProducts || [];

  const filteredProducts =
    categoryId === "all"
      ? products
      : products.filter((p) => p.category_id == categoryId);

  let categoryName = "Alle Producten";
  if (categoryId !== "all" && filteredProducts.length > 0) {
    categoryName = filteredProducts[0].category_name;
  }

  products_container.innerHTML += `<h2 class="category-title">${categoryName}</h2>`;

  filteredProducts.forEach((product) => {
    const html = `<a href='#' onclick="showProductDetail('${product.id}', '${product.name}', '${product.description}', '${product.price}', '${product.filename}', '${product.kcal || 0}')">
      <div class="product">
        <img src="${product.filename}">
        <p class="product-name">${product.name}</p>
        <p class="product-price">€${product.price}</p>
      </div>
    </a>`;
    products_container.innerHTML += html;
  });
}

// Toggle language
function toggleLanguage() {
  currentLang = currentLang === "nl" ? "en" : "nl";
  window.updateLangText();
  const t = translations[currentLang];

  if (document.getElementById("reviewTitle"))
    document.getElementById("reviewTitle").textContent = t.reviewOrder;
  if (document.getElementById("cartTotalText"))
    document.getElementById("cartTotalText").textContent = t.total + ":";
  if (document.getElementById("paymentTitle"))
    document.getElementById("paymentTitle").textContent = t.choosePayment;
  if (document.getElementById("processingTitle"))
    document.getElementById("processingTitle").textContent = t.processing;
  if (document.getElementById("thankYouTitle"))
    document.getElementById("thankYouTitle").textContent = t.thankYou;
  if (document.getElementById("orderNumberText"))
    document.getElementById("orderNumberText").textContent =
      t.orderNumber + ":";
  if (document.getElementById("newOrderBtn"))
    document.getElementById("newOrderBtn").textContent = t.newOrder;
  if (document.getElementById("detailCancelBtn"))
    document.getElementById("detailCancelBtn").textContent = t.cancel;
  if (document.getElementById("reviewCancelBtn"))
    document.getElementById("reviewCancelBtn").textContent = t.cancel;
  if (document.getElementById("reviewPayBtn"))
    document.getElementById("reviewPayBtn").textContent = t.pay;
  if (document.getElementById("paymentCancelBtn"))
    document.getElementById("paymentCancelBtn").textContent = t.cancel;
}

// Render products
function renderProducts(products) {
  const products_container = document.getElementById("products-container");
  products_container.innerHTML = "";

  products.forEach((product) => {
    const html = `<a href='#' onclick="showProductDetail('${product.id}', '${product.name}', '${product.description}', '${product.price}', '${product.filename}', '${product.kcal || 0}')">
      <div class="product">
        <img src="${product.filename}">
        <p class="product-name">${product.name}</p>
        <p class="product-price">€${product.price}</p>
      </div>
    </a>`;
    products_container.innerHTML += html;
  });
}

// Change quantity
function changeQuantity(delta) {
  const quantityDisplay = document.getElementById("quantityDisplay");
  currentQuantity += delta;
  if (currentQuantity < 1) currentQuantity = 1;
  if (currentQuantity > 99) currentQuantity = 99;
  quantityDisplay.textContent = currentQuantity;
}

// Show order options (Eat-in / Take-out)
function showOrderOptions() {
  document.getElementById("idle-main").style.display = "none";
  document.getElementById("order-options").style.display = "flex";
}

// Select order type (Eat-in or Take-out)
function selectOrderType(type, event) {
  if (event) {
    event.stopPropagation();
  }
  const idleScreen = document.getElementById("idle-screen");
  idleScreen.classList.add("hidden");
}

// Show product detail popup
function showProductDetail(id, name, description, price, image, kcal) {
  currentProductName = name;
  currentProductPrice = parseFloat(price);
  currentProductImage = image;
  currentQuantity = 1;
  const t = translations[currentLang];

  document.getElementById("quantityDisplay").textContent = "1";
  document.getElementById("detailImage").src = image;
  document.getElementById("detailTitle").textContent = name;
  document.getElementById("detailkcal").textContent = kcal
    ? "kcal: " + kcal
    : "";
  document.getElementById("detailDescription").textContent =
    description || t.noDescription;
  document.getElementById("detailPrice").textContent = "€" + price;
  document.getElementById("detailOverlay").classList.add("active");
  document.getElementById("detailPopup").classList.add("active");
  document.getElementById("detailClose").classList.add("visible");
  document.getElementById("detailCancelBtn").textContent = t.cancel;
  document.getElementById("detailAddBtn").innerHTML =
    t.add +
    ' <span class="detail-price" id="detailPrice">€' +
    price +
    "</span>";
  document.getElementById("orderReviewBtn").classList.add("hidden");
}

// Close product detail popup
function closeProductDetail() {
  document.getElementById("detailOverlay").classList.remove("active");
  document.getElementById("detailPopup").classList.remove("active");
  document.getElementById("detailClose").classList.remove("visible");
  document.getElementById("orderReviewBtn").classList.remove("hidden");
}

// Add to cart function
function addToCart() {
  const t = translations[currentLang];

  const existingItem = cart.find((item) => item.name === currentProductName);
  if (existingItem) {
    existingItem.quantity += currentQuantity;
  } else {
    cart.push({
      id: Date.now(),
      name: currentProductName,
      price: currentProductPrice,
      quantity: currentQuantity,
      image: currentProductImage,
    });
  }

  closeProductDetail();
  updateCartCount();

  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = currentProductName + " " + t.addedToOrder;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Update quantity in cart
function updateCartItemQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartCount();
  showReviewOrder();
}

// Update cart count
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = totalItems;
  document.getElementById("cartCount").style.display =
    totalItems > 0 ? "flex" : "none";
}

// Show review order
function showReviewOrder() {
  const t = translations[currentLang];
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  document.getElementById("reviewTitle").textContent = t.reviewOrder;
  document.getElementById("cartTotalText").textContent = t.total + ":";
  document.getElementById("reviewCancelBtn").textContent = t.cancel;
  document.getElementById("reviewPayBtn").textContent = t.pay;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">${t.emptyCart}</p>`;
    cartTotal.textContent = "€0.00";
  } else {
    let html = "";
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      html += `
        <div class="cart-item">
          <img class="cart-item-image" src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <div class="cart-item-quantity">
              <button class="qty-btn minus" onclick="updateCartItemQuantity(${i}, -1)">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn plus" onclick="updateCartItemQuantity(${i}, 1)">+</button>
            </div>
          <div class="cart-item-actions">
            <span class="cart-item-price">€${(item.price * item.quantity).toFixed(2)}</span>
            <button class="cart-remove-btn" onclick="removeFromCart(${i})">${t.remove}</button>
          </div>
      `;
    }
    cartItems.innerHTML = html;

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    cartTotal.textContent = "€" + total.toFixed(2);
  }

  hideOrderReviewButton();
  document.getElementById("reviewOverlay").classList.add("active");
  document.getElementById("reviewPopup").classList.add("active");
}

// Close review order
function closeReviewOrder() {
  document.getElementById("reviewOverlay").classList.remove("active");
  document.getElementById("reviewPopup").classList.remove("active");
  showOrderReviewButton();
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  showReviewOrder();
}

// Show payment
function showPayment() {
  closeReviewOrder();
  hideOrderReviewButton();
  const t = translations[currentLang];
  document.getElementById("paymentTitle").textContent = t.choosePayment;
  document.getElementById("paymentCancelBtn").textContent = t.cancel;
  document.getElementById("paymentOverlay").classList.add("active");
  document.getElementById("paymentPopup").classList.add("active");
}

// Close payment
function closePayment() {
  document.getElementById("paymentOverlay").classList.remove("active");
  document.getElementById("paymentPopup").classList.remove("active");
  showOrderReviewButton();
}

// Process payment
function processPayment(method) {
  closePayment();

  const t = translations[currentLang];
  document.getElementById("processingTitle").textContent = t.processing;
  document.getElementById("processingOverlay").classList.add("active");
  document.getElementById("processingPopup").classList.add("active");

  setTimeout(function () {
    document.getElementById("processingOverlay").classList.remove("active");
    document.getElementById("processingPopup").classList.remove("active");

    const orderNumber = Math.floor(Math.random() * 9000) + 1000;
    document.getElementById("orderNumber").textContent = orderNumber;
    document.getElementById("thankYouTitle").textContent = t.thankYou;
    document.getElementById("orderNumberText").textContent =
      t.orderNumber + ":";
    document.getElementById("newOrderBtn").textContent = t.newOrder;

    document.getElementById("thankYouOverlay").classList.add("active");
    document.getElementById("thankYouPopup").classList.add("active");

    cart = [];
    updateCartCount();
  }, 2000);
}

// Start new order
function startNewOrder() {
  document.getElementById("thankYouOverlay").classList.remove("active");
  document.getElementById("thankYouPopup").classList.remove("active");
  document.getElementById("idle-screen").classList.remove("hidden");
  document.getElementById("idle-main").style.display = "flex";
  document.getElementById("order-options").style.display = "none";
}
