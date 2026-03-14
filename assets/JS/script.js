// Pairing rules for sides - "Best with..." suggestions
const sidePairings = {
  "Oven-Baked Sweet Potato Wedges": {
    suggestedDip: "Avocado Lime Crema",
    suggestedDipId: 42,
    price: 1.0,
    kcal: 110,
  },
  "Zucchini Fries": {
    suggestedDip: "Greek Yogurt Ranch",
    suggestedDipId: 43,
    price: 1.0,
    kcal: 90,
  },
};

// Global variables
let currentProductId = 0;
let currentProductName = "";
let currentProductPrice = 0;
let currentProductImage = "";
let currentQuantity = 1;
let currentLang = "en";
let cart = [];
let orderType = null;
let lastOrder = null;
let apiBaseUrl = "";

// Get product info by name from the products list
function getProductByName(name) {
  const products = window.allProducts || [];
  return products.find((p) => p.name === name);
}

// Language translations - accessible globally
const translations = {
  nl: {
    orderHere: "BESTELLEN",
    eatIn: "Hier eten",
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
    allCategory: "Alles",
    printReceipt: "Bon Afdrukken",
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
    allCategory: "All",
    printReceipt: "Print Receipt",
  },
};

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Set API base URL based on environment
  if (
    window.location.hostname === "127.0.0.1" &&
    window.location.port === "5501"
  ) {
    // Live Server - point to XAMPP
    apiBaseUrl = "http://localhost/7.1-Module-Kiosk-2026";
  } else if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    // Direct XAMPP access
    apiBaseUrl = "http://localhost/7.1-Module-Kiosk-2026";
  } else {
    // Live domain
    apiBaseUrl = "https://u240653.gluwebsite.nl/Kiosk";
  }

  console.log("API Base URL:", apiBaseUrl);
  window.apiBaseUrl = apiBaseUrl;

  // Initialize language to English on page load
  setLanguage("en");

  // Fetch products from API
  fetch(apiBaseUrl + "/api/products.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Products loaded:", data.data.items);
      const products = data.data.items;
      const container = document.getElementsByClassName("scroll-container")[0];

      // Group products by category
      const categories = {};
      products.forEach((product) => {
        if (!categories[product.category_name]) {
          categories[product.category_name] = product;
        }
      });

      // Add translated "All" category button first
      const allCategories = [
        {
          id: "all",
          name: translations[currentLang].allCategory,
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

      // Clear container first
      container.innerHTML = "";

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
    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });

  // Add popup HTML to body (your existing popup creation code)
  createPopups();
});

// Function to create all popups
function createPopups() {
  // Detail popup
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
      <button class="detail-cancel-btn" id="detailCancelBtn" onclick="closeProductDetail()">Cancel</button>
      <div class="quantity-selector">
        <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
        <span class="quantity-display" id="quantityDisplay">1</span>
        <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
      </div>
      <button class="detail-add-btn" id="detailAddBtn" onclick="addToCart()">Add <span class="detail-price" id="detailPrice"></span></button>
    </div>
  `;

  const detailClose = document.createElement("button");
  detailClose.className = "detail-close";
  detailClose.id = "detailClose";
  detailClose.innerHTML = "&times;";
  detailClose.onclick = closeProductDetail;

  // Review popup
  const reviewOverlay = document.createElement("div");
  reviewOverlay.className = "detail-overlay";
  reviewOverlay.id = "reviewOverlay";
  reviewOverlay.onclick = closeReviewOrder;

  const reviewPopup = document.createElement("div");
  reviewPopup.className = "detail-popup review-popup";
  reviewPopup.id = "reviewPopup";
  reviewPopup.innerHTML = `
    <h2 class="detail-title" id="reviewTitle">Review Order</h2>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-total">
      <span id="cartTotalText">Total:</span>
      <span id="cartTotal">€0.00</span>
    </div>
    <div class="detail-actions">
      <button class="detail-cancel-btn" id="reviewCancelBtn" onclick="closeReviewOrder()">Cancel</button>
      <button class="detail-add-btn" id="reviewPayBtn" onclick="showPayment()">Pay</button>
    </div>
  `;

  // Payment popup
  const paymentOverlay = document.createElement("div");
  paymentOverlay.className = "detail-overlay";
  paymentOverlay.id = "paymentOverlay";
  paymentOverlay.onclick = closePayment;

  const paymentPopup = document.createElement("div");
  paymentPopup.className = "detail-popup payment-popup";
  paymentPopup.id = "paymentPopup";

  paymentPopup.innerHTML = `
    <h2 class="detail-title" id="paymentTitle">Choose payment method</h2>
    <div class="payment-options">
      <button type="button" class="payment-btn" id="cardPaymentBtn">
        <div class="payment-icon card-icon">💳</div>
        <span>Card</span>
      </button>
      <button type="button" class="payment-btn" id="applePaymentBtn">
        <div class="payment-icon apple-icon"></div>
        <span>Apple Pay</span>
      </button>
      <button type="button" class="payment-btn" id="googlePaymentBtn">
        <div class="payment-icon google-icon">G</div>
        <span>Google Pay</span>
      </button>
    </div>
    <button type="button" class="detail-cancel-btn" id="paymentCancelBtn">Cancel</button>
`;

  // Then add event listeners after creating the popup
  // In createPopups() function, update the setTimeout section:

  setTimeout(() => {
    document
      .getElementById("cardPaymentBtn")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        processPayment("card", e); // Pass the event
        return false;
      });

    document
      .getElementById("applePaymentBtn")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        processPayment("apple", e); // Pass the event
        return false;
      });

    document
      .getElementById("googlePaymentBtn")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        processPayment("google", e); // Pass the event
        return false;
      });

    document
      .getElementById("paymentCancelBtn")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closePayment();
        return false;
      });
  }, 100);

  // Processing popup
  const processingOverlay = document.createElement("div");
  processingOverlay.className = "detail-overlay";
  processingOverlay.id = "processingOverlay";

  const processingPopup = document.createElement("div");
  processingPopup.className = "detail-popup processing-popup";
  processingPopup.id = "processingPopup";
  processingPopup.innerHTML = `
    <img src="assets/images/animation/Gradient Loader  Spinner - Light Blue.gif" alt="Loading" class="processing-image">
    <h2 class="processing-title" id="processingTitle">Processing payment...</h2>
  `;

  // Thank you popup
  const thankYouOverlay = document.createElement("div");
  thankYouOverlay.className = "detail-overlay";
  thankYouOverlay.id = "thankYouOverlay";

  const thankYouPopup = document.createElement("div");
  thankYouPopup.className = "detail-popup thank-you-popup";
  thankYouPopup.id = "thankYouPopup";
  thankYouPopup.innerHTML = `
    <img src="assets/images/animation/Success.gif" alt="Success" class="thank-you-image">
    <h2 class="detail-title" id="thankYouTitle">Thank you for your order!</h2>
    <p class="order-number" id="orderNumberText">Order Number: <span id="orderNumber"></span></p>
    <div id="autoFlowStatus" style="text-align: center; margin-top: 30px; font-size: 1.8rem; font-weight: bold;">
      Printing...
    </div>
    <div style="display: none; gap: 20px; justify-content: center; margin-top: 20px; opacity: 0.5;">
        <button class="detail-add-btn" id="printReceiptBtn" onclick="printReceipt()" style="width: auto; padding: 15px 30px;">Print Receipt</button>
        <button class="detail-cancel-btn" id="newOrderBtn" onclick="startNewOrder()" style="width: auto; padding: 15px 30px;">New Order</button>
    </div>
  `;

  // Order review button
  const orderReviewBtn = document.createElement("button");
  orderReviewBtn.className = "order-review-btn";
  orderReviewBtn.id = "orderReviewBtn";
  orderReviewBtn.innerHTML = `<span id="reviewBtnText">Review Order</span><span id="cartCount" class="cart-count">0</span>`;
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
}

// Toggle language for idle screen
function setLanguage(lang) {
  currentLang = lang;

  // Update button styles
  const langNL = document.getElementById("langNL");
  const langEN = document.getElementById("langEN");

  if (langNL) langNL.classList.toggle("active", lang === "nl");
  if (langEN) langEN.classList.toggle("active", lang === "en");

  // Update idle screen text
  const t = translations[currentLang];
  const orderBtn = document.getElementById("order-btn");
  if (orderBtn) orderBtn.textContent = t.orderHere;

  // Update order options text if visible
  const eatInBtn = document.querySelector(".begin.eat-in");
  const takeOutBtn = document.querySelector(".begin.takeout");
  if (eatInBtn) eatInBtn.textContent = t.eatIn;
  if (takeOutBtn) takeOutBtn.textContent = t.takeOut;

  // Update review button text
  if (document.getElementById("reviewBtnText")) {
    document.getElementById("reviewBtnText").textContent = t.reviewOrder;
  }
}

// Helper function to hide order review button
function hideOrderReviewButton() {
  const btn = document.getElementById("orderReviewBtn");
  if (btn) btn.classList.add("hidden");
}

// Helper function to show order review button
function showOrderReviewButton() {
  const btn = document.getElementById("orderReviewBtn");
  if (btn) btn.classList.remove("hidden");
}

// Filter products by category
function filterCategory(categoryId, element) {
  document
    .querySelectorAll(".scroll-item")
    .forEach((item) => item.classList.remove("active"));
  element.classList.add("active");

  const products_wrapper = document.getElementById("products-wrapper");
  const products = window.allProducts || [];

  const filteredProducts =
    categoryId === "all"
      ? products
      : products.filter((p) => p.category_id == categoryId);

  let categoryName = "All Products";
  if (categoryId !== "all" && filteredProducts.length > 0) {
    categoryName = filteredProducts[0].category_name;
  }

  // Clear wrapper and add title first, then container
  products_wrapper.innerHTML = `<h2 class="category-title">${categoryName}</h2><div id="products-container"></div>`;

  // Get the new products-container reference
  const newProductsContainer = document.getElementById("products-container");

  filteredProducts.forEach((product) => {
    const html = `<a href='#' onclick="showProductDetail(${product.product_id}, '${product.name.replace(/'/g, "\\'")}', '${(product.description || "").replace(/'/g, "\\'")}', ${product.price}, '${product.filename}', ${product.kcal || 0})">
      <div class="product">
        <img src="${product.filename}">
        <p class="product-name">${product.name}</p>
        <p class="product-price">€${product.price}</p>
      </div>
    </a>`;
    newProductsContainer.innerHTML += html;
  });
}

// Render products with VG/V badges
function renderProducts(products) {
  const products_container = document.getElementById("products-container");
  if (!products_container) return;

  products_container.innerHTML = "";

  products.forEach((product) => {
    // dietary badge
    let badge = "";
    if (product.is_vegan == 1) {
      badge = '<span class="dietary-badge vg">VG</span>';
    } else if (product.is_vegetarian == 1) {
      badge = '<span class="dietary-badge v">V</span>';
    }

    const html = `<a href='#' onclick="showProductDetail(${product.product_id}, '${product.name.replace(/'/g, "\\'")}', '${(product.description || "").replace(/'/g, "\\'")}', ${product.price}, '${product.filename}', ${product.kcal || 0})">
      <div class="product">
        <img src="${product.filename}">
        ${badge}
        <p class="product-name">${product.name}</p>
        <p class="product-price">€${product.price}</p>
      </div>
    </a>`;
    products_container.innerHTML += html;
  });
}

// Create pairing suggestion popup
function createPairingPopup() {
  if (document.getElementById("pairingOverlay")) return;

  const pairingOverlay = document.createElement("div");
  pairingOverlay.className = "detail-overlay pairing-overlay";
  pairingOverlay.id = "pairingOverlay";

  const pairingPopup = document.createElement("div");
  pairingPopup.className = "detail-popup pairing-popup";
  pairingPopup.id = "pairingPopup";
  pairingPopup.innerHTML = `
    <div class="pairing-content">
      <h2 class="pairing-title">Best with...</h2>
      <p class="pairing-message">Would you like to add <span id="suggestedDipName"></span> (€<span id="suggestedDipPrice"></span>) to your order?</p>
      <div class="pairing-buttons">
        <button class="pairing-accept-btn" id="pairingAcceptBtn" onclick="acceptPairing()">Yes, add it!</button>
        <button class="pairing-decline-btn" id="pairingDeclineBtn" onclick="declinePairing()">No thanks</button>
      </div>
    </div>
  `;

  document.body.appendChild(pairingOverlay);
  document.body.appendChild(pairingPopup);
}

// Initialize pairing popup on load
document.addEventListener("DOMContentLoaded", function () {
  createPairingPopup();
});

// Current pairing suggestion data
let currentPairing = null;

// Show pairing suggestion
function showPairingSuggestion(sideName) {
  const pairing = sidePairings[sideName];
  if (!pairing) return false;

  // Check if the suggested dip is already in cart
  const alreadyInCart = cart.some((item) => item.name === pairing.suggestedDip);
  if (alreadyInCart) return false;

  currentPairing = {
    sideName: sideName,
    dipName: pairing.suggestedDip,
    dipPrice: pairing.price,
    dipKcal: pairing.kcal,
    dipId: pairing.suggestedDipId,
  };

  const dipNameEl = document.getElementById("suggestedDipName");
  const dipPriceEl = document.getElementById("suggestedDipPrice");
  const pairingOverlay = document.getElementById("pairingOverlay");
  const pairingPopup = document.getElementById("pairingPopup");

  if (dipNameEl) dipNameEl.textContent = currentPairing.dipName;
  if (dipPriceEl) dipPriceEl.textContent = currentPairing.dipPrice.toFixed(2);
  if (pairingOverlay) pairingOverlay.classList.add("active");
  if (pairingPopup) pairingPopup.classList.add("active");

  return true;
}

// Accept pairing - add the suggested dip
function acceptPairing() {
  if (currentPairing) {
    const dipProduct = getProductByName(currentPairing.dipName);

    const existingItem = cart.find(
      (item) => item.name === currentPairing.dipName,
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: Date.now(),
        product_id: currentPairing.dipId,
        name: currentPairing.dipName,
        price: currentPairing.dipPrice,
        quantity: 1,
        image: dipProduct ? dipProduct.filename : "",
        kcal: currentPairing.dipKcal,
      });
    }

    updateCartCount();

    const t = translations[currentLang];
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = currentPairing.dipName + " " + t.addedToOrder;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  closePairingPopup();
}

// Decline pairing
function declinePairing() {
  closePairingPopup();
}

// Close pairing popup
function closePairingPopup() {
  const pairingOverlay = document.getElementById("pairingOverlay");
  const pairingPopup = document.getElementById("pairingPopup");

  if (pairingOverlay) pairingOverlay.classList.remove("active");
  if (pairingPopup) pairingPopup.classList.remove("active");
  currentPairing = null;
}

// Change quantity
function changeQuantity(delta) {
  const quantityDisplay = document.getElementById("quantityDisplay");
  if (!quantityDisplay) return;

  currentQuantity = parseInt(quantityDisplay.textContent) || 1;
  currentQuantity += delta;
  if (currentQuantity < 1) currentQuantity = 1;
  if (currentQuantity > 99) currentQuantity = 99;
  quantityDisplay.textContent = currentQuantity;
}

// Show order options (Eat-in / Take-out)
function showOrderOptions() {
  const idleMain = document.getElementById("idle-main");
  const orderOptions = document.getElementById("order-options");

  if (idleMain) idleMain.style.display = "none";
  if (orderOptions) orderOptions.style.display = "flex";
}

// Select order type (Eat-in or Take-out)
function selectOrderType(type, event) {
  if (event) {
    event.stopPropagation();
  }
  orderType = type;
  const idleScreen = document.getElementById("idle-screen");
  if (idleScreen) idleScreen.classList.add("hidden");
}

// Show product detail popup
function showProductDetail(id, name, description, price, image, kcal) {
  currentProductId = parseInt(id);
  currentProductName = name;
  currentProductPrice = parseFloat(price);
  currentProductImage = image;
  currentQuantity = 1;
  const t = translations[currentLang];

  const quantityDisplay = document.getElementById("quantityDisplay");
  const detailImage = document.getElementById("detailImage");
  const detailTitle = document.getElementById("detailTitle");
  const detailkcal = document.getElementById("detailkcal");
  const detailDescription = document.getElementById("detailDescription");
  const detailPrice = document.getElementById("detailPrice");
  const detailOverlay = document.getElementById("detailOverlay");
  const detailPopup = document.getElementById("detailPopup");
  const detailClose = document.getElementById("detailClose");
  const detailCancelBtn = document.getElementById("detailCancelBtn");
  const detailAddBtn = document.getElementById("detailAddBtn");
  const orderReviewBtn = document.getElementById("orderReviewBtn");

  if (quantityDisplay) quantityDisplay.textContent = "1";
  if (detailImage) detailImage.src = image;
  if (detailTitle) detailTitle.textContent = name;
  if (detailkcal) detailkcal.textContent = kcal ? "kcal: " + kcal : "";
  if (detailDescription)
    detailDescription.textContent = description || t.noDescription;
  if (detailPrice) detailPrice.textContent = "€" + price;
  if (detailOverlay) detailOverlay.classList.add("active");
  if (detailPopup) detailPopup.classList.add("active");
  if (detailClose) detailClose.classList.add("visible");
  if (detailCancelBtn) detailCancelBtn.textContent = t.cancel;
  if (detailAddBtn) {
    detailAddBtn.innerHTML =
      t.add + ' <span class="detail-price">€' + price + "</span>";
  }
  if (orderReviewBtn) orderReviewBtn.classList.add("hidden");

  console.log("Product ID set to:", currentProductId);
}

// Close product detail popup
function closeProductDetail() {
  const detailOverlay = document.getElementById("detailOverlay");
  const detailPopup = document.getElementById("detailPopup");
  const detailClose = document.getElementById("detailClose");
  const orderReviewBtn = document.getElementById("orderReviewBtn");

  if (detailOverlay) detailOverlay.classList.remove("active");
  if (detailPopup) detailPopup.classList.remove("active");
  if (detailClose) detailClose.classList.remove("visible");
  if (orderReviewBtn) orderReviewBtn.classList.remove("hidden");
}

// Add to cart function
function addToCart() {
  const t = translations[currentLang];

  // Get product info for kcal and product_id
  const productInfo = getProductByName(currentProductName);
  const kcal = productInfo ? productInfo.kcal : 0;
  const product_id = productInfo ? productInfo.product_id : currentProductId;

  console.log("Adding to cart - Product ID:", product_id);

  const existingItem = cart.find((item) => item.name === currentProductName);
  if (existingItem) {
    existingItem.quantity += currentQuantity;
  } else {
    cart.push({
      id: Date.now(),
      product_id: product_id,
      name: currentProductName,
      price: currentProductPrice,
      quantity: currentQuantity,
      image: currentProductImage,
      kcal: kcal,
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

  // Check for pairing suggestion
  setTimeout(() => {
    showPairingSuggestion(currentProductName);
  }, 500);
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
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "flex" : "none";
  }
}

// Show review order with calories
function showReviewOrder() {
  const t = translations[currentLang];
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const reviewTitle = document.getElementById("reviewTitle");
  const cartTotalText = document.getElementById("cartTotalText");
  const reviewCancelBtn = document.getElementById("reviewCancelBtn");
  const reviewPayBtn = document.getElementById("reviewPayBtn");

  if (reviewTitle) reviewTitle.textContent = t.reviewOrder;
  if (cartTotalText) cartTotalText.textContent = t.total + ":";
  if (reviewCancelBtn) reviewCancelBtn.textContent = t.cancel;
  if (reviewPayBtn) reviewPayBtn.textContent = t.pay;

  if (cart.length === 0) {
    if (cartItems)
      cartItems.innerHTML = `<p class="empty-cart">${t.emptyCart}</p>`;
    if (cartTotal)
      cartTotal.innerHTML = `<div class="total-info"><span>€0.00</span><span class="total-kcal">0 kcal</span></div>`;
  } else {
    let html = "";
    let totalKcal = 0;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      const itemKcal = item.kcal ? item.kcal * item.quantity : 0;
      totalKcal += itemKcal;
      html += `
        <div class="cart-item">     
          <div class="cart-item-quantity">
            <button class="qty-btn minus" onclick="updateCartItemQuantity(${i}, -1)">-</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn plus" onclick="updateCartItemQuantity(${i}, 1)">+</button>
          </div>
          <img class="cart-item-image" src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-kcal">${itemKcal > 0 ? itemKcal + " kcal" : ""}</span>
          </div>
          <div class="cart-item-actions">
            <span class="cart-item-price">€${(item.price * item.quantity).toFixed(2)}</span>
            <button class="cart-remove-btn" onclick="removeFromCart(${i})">${t.remove}</button>
          </div>
        </div>
      `;
    }
    if (cartItems) cartItems.innerHTML = html;

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    if (cartTotal) {
      cartTotal.innerHTML = `<div class="total-info"><span>€${total.toFixed(2)}</span><span class="total-kcal">${totalKcal} kcal</span></div>`;
    }
  }

  hideOrderReviewButton();
  const reviewOverlay = document.getElementById("reviewOverlay");
  const reviewPopup = document.getElementById("reviewPopup");

  if (reviewOverlay) reviewOverlay.classList.add("active");
  if (reviewPopup) reviewPopup.classList.add("active");
}

// Close review order
function closeReviewOrder() {
  const reviewOverlay = document.getElementById("reviewOverlay");
  const reviewPopup = document.getElementById("reviewPopup");

  if (reviewOverlay) reviewOverlay.classList.remove("active");
  if (reviewPopup) reviewPopup.classList.remove("active");
  showOrderReviewButton();
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  showReviewOrder();
}
// Show payment
// Show payment
function showPayment() {
  console.log("showPayment called");
  closeReviewOrder();
  hideOrderReviewButton();
  const t = translations[currentLang];
  const paymentTitle = document.getElementById("paymentTitle");
  const paymentCancelBtn = document.getElementById("paymentCancelBtn");

  if (paymentTitle) paymentTitle.textContent = t.choosePayment;
  if (paymentCancelBtn) paymentCancelBtn.textContent = t.cancel;

  const paymentOverlay = document.getElementById("paymentOverlay");
  const paymentPopup = document.getElementById("paymentPopup");

  if (paymentOverlay) paymentOverlay.classList.add("active");
  if (paymentPopup) paymentPopup.classList.add("active");

  // Make sure buttons have the correct type AND prevent default
  document.querySelectorAll(".payment-btn").forEach((btn) => {
    btn.setAttribute("type", "button");

    // Remove any existing click listeners and add new ones with preventDefault
    btn.replaceWith(btn.cloneNode(true));
  });

  // Re-attach event listeners after replacing buttons
  setTimeout(() => {
    document
      .getElementById("cardPaymentBtn")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        processPayment("card", e);
      });

    document
      .getElementById("applePaymentBtn")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        processPayment("apple", e);
      });

    document
      .getElementById("googlePaymentBtn")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        processPayment("google", e);
      });

    document
      .getElementById("paymentCancelBtn")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closePayment();
      });
  }, 50);
}

// Close payment
function closePayment() {
  const paymentOverlay = document.getElementById("paymentOverlay");
  const paymentPopup = document.getElementById("paymentPopup");

  if (paymentOverlay) paymentOverlay.classList.remove("active");
  if (paymentPopup) paymentPopup.classList.remove("active");
  showOrderReviewButton();
}

// Process payment and send to backend
function processPayment(method, event) {
  // Prevent page reload
  if (event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("Event prevented");
  } else {
    console.warn("No event received in processPayment");
  }

  console.log("Payment method selected:", method);
  console.log("Current cart:", cart);

  closePayment();

  const t = translations[currentLang];
  document.getElementById("processingTitle").textContent = t.processing;
  document.getElementById("processingOverlay").classList.add("active");
  document.getElementById("processingPopup").classList.add("active");

  // FIX: Send products with quantities instead of duplicate IDs
  const productsWithQuantity = [];

  cart.forEach((item) => {
    console.log("Cart item:", item);
    if (!item.product_id) {
      console.error("Product missing ID:", item);
      alert("Error: Product missing ID. Please try adding the item again.");
      document.getElementById("processingOverlay").classList.remove("active");
      document.getElementById("processingPopup").classList.remove("active");
      showOrderReviewButton();
      return;
    }

    // Add the product with its quantity
    productsWithQuantity.push({
      product_id: item.product_id,
      quantity: item.quantity,
    });
  });

  console.log("Products with quantity:", productsWithQuantity);

  // Generate pickup number (2 digits)
  const pickupNumber = Math.floor(Math.random() * 90 + 10).toString();

  // Prepare order data with the new format
  const orderData = {
    products: productsWithQuantity, // Now sending objects with product_id and quantity
    pickup_number: pickupNumber,
  };

  const url = apiBaseUrl + "/api/orders.php";
  console.log("Sending to URL:", url);
  console.log("Order data:", orderData);

  // Send order to backend
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      console.log("Response status:", response.status);

      if (!response.ok) {
        return response.text().then((text) => {
          console.error("Error response:", text);
          throw new Error(`HTTP error! status: ${response.status}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response data:", data);

      // Hide processing popup
      document.getElementById("processingOverlay").classList.remove("active");
      document.getElementById("processingPopup").classList.remove("active");

      if (data.success) {
        // Get the actual database ID
        const actualOrderId = data.data.order_id;

        // Calculate cyclic number (1-99)
        const displayNumber = ((actualOrderId - 1) % 99) + 1;
        const paddedDisplayNumber = displayNumber.toString().padStart(2, "0");

        console.log(
          `Order #${actualOrderId} displayed as #${paddedDisplayNumber}`,
        );

        // Store order data for receipt - ensure total is a number
        lastOrder = {
          order_id: actualOrderId,
          display_number: displayNumber,
          pickup_number: data.data.pickup_number,
          total: parseFloat(data.data.price_total) || 0, // Convert to number
          items: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            product_id: item.product_id,
          })),
        };

        // Show thank you popup with the cyclic display number
        document.getElementById("orderNumber").textContent =
          paddedDisplayNumber;
        document.getElementById("thankYouTitle").textContent = t.thankYou;
        document.getElementById("orderNumberText").innerHTML =
          t.orderNumber +
          ': <span id="orderNumber">' +
          paddedDisplayNumber +
          "</span>";

        document.getElementById("newOrderBtn").textContent = t.newOrder;
        document.getElementById("thankYouOverlay").classList.add("active");
        document.getElementById("thankYouPopup").classList.add("active");

        // Hide order review button on thank-you
        hideOrderReviewButton();

        // Clear cart
        cart = [];
        updateCartCount();

        // Auto print after 3 seconds (TODO step 2)
        let countdown = 3;
        const countdownEl = document.getElementById("printCountdown");
        const statusEl = document.getElementById("autoFlowStatus");
        const timer = setInterval(() => {
          countdown--;
          if (countdownEl) countdownEl.textContent = countdown;
          if (countdown <= 0) {
            clearInterval(timer);
            printReceipt();
          }
        }, 1000);
      } else {
        alert("Error creating order: " + (data.error || "Unknown error"));
        document.getElementById("processingOverlay").classList.remove("active");
        document.getElementById("processingPopup").classList.remove("active");
        showOrderReviewButton();
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      document.getElementById("processingOverlay").classList.remove("active");
      document.getElementById("processingPopup").classList.remove("active");
      alert("Error processing order. Please try again.");
      showOrderReviewButton();
    });
}
// Start new order
function startNewOrder() {
  document.getElementById("thankYouOverlay").classList.remove("active");
  document.getElementById("thankYouPopup").classList.remove("active");
  document.getElementById("idle-screen").classList.remove("hidden");
  document.getElementById("idle-main").style.display = "flex";
  document.getElementById("order-options").style.display = "none";
}

// Print receipt function
function printReceipt() {
  if (!lastOrder) {
    console.error("No order to print");
    alert("No order to print");
    return;
  }

  const t = translations[currentLang];
  const order = lastOrder;

  // Calculate display number for receipt
  const displayNumber = ((order.order_id - 1) % 99) + 1;
  const paddedDisplayNumber = displayNumber.toString().padStart(2, "0");

  // Ensure total is a number
  const totalAmount =
    typeof order.total === "number"
      ? order.total
      : parseFloat(order.total) || 0;

  // Create receipt HTML
  const receiptContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Order Receipt</title>
        <style>
            body {
                font-family: 'Courier New', monospace;
                width: 300px;
                margin: 0 auto;
                padding: 20px;
                font-size: 14px;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
                border-bottom: 2px dashed #000;
                padding-bottom: 10px;
            }
            .header h1 {
                font-size: 20px;
                margin: 5px 0;
            }
            .order-info {
                margin-bottom: 15px;
            }
            .order-number {
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                margin: 10px 0;
            }
            .items {
                margin: 15px 0;
                border-top: 1px solid #000;
                border-bottom: 1px solid #000;
                padding: 10px 0;
            }
            .item {
                display: flex;
                justify-content: space-between;
                margin: 5px 0;
            }
            .item-name {
                flex: 2;
            }
            .item-qty {
                flex: 1;
                text-align: center;
            }
            .item-price {
                flex: 1;
                text-align: right;
            }
            .total {
                display: flex;
                justify-content: space-between;
                font-weight: bold;
                font-size: 16px;
                margin-top: 10px;
                padding-top: 10px;
                border-top: 2px solid #000;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                border-top: 1px dashed #000;
                padding-top: 10px;
            }
            .datetime {
                text-align: center;
                font-size: 12px;
                margin: 5px 0;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Happy Herbivore</h1>
            <p>Healthy Plant-Based Kitchen</p>
        </div>
        
        <div class="order-info">
            <div class="order-number">#${paddedDisplayNumber}</div>
            <div class="datetime">${new Date().toLocaleString()}</div>
            <div>Order Type: ${orderType === "eat-in" ? "Eat-in" : "Take-out"}</div>
        </div>

        <div class="items">
            ${
              order.items
                ? order.items
                    .map(
                      (item) => `
                <div class="item">
                    <span class="item-name">${item.name}</span>
                    <span class="item-qty">x${item.quantity}</span>
                    <span class="item-price">€${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              `,
                    )
                    .join("")
                : ""
            }
        </div>

        <div class="total">
            <span>${t.total}:</span>
            <span>€${totalAmount.toFixed(2)}</span>
        </div>

        <div class="footer">
            <p>Thank you for your order!</p>
            <p>Please show this receipt when picking up</p>
            <p>Enjoy your meal! 🌱</p>
        </div>
    </body>
    </html>
  `;

  // Open print window
  const printWindow = window.open("", "_blank");
  printWindow.document.write(receiptContent);
  printWindow.document.close();
  printWindow.focus();

  // Wait for content to load then print
  setTimeout(function () {
    printWindow.print();
  }, 250);

  // Auto start new order 3 seconds after print (TODO step 3)
  setTimeout(() => {
    startNewOrder();
  }, 3000);
}
document.addEventListener(
  "click",
  function (e) {
    // If the clicked element is a payment button or inside a payment popup
    if (e.target.closest(".payment-btn") || e.target.closest("#paymentPopup")) {
      e.preventDefault();
      console.log("Global click handler prevented default on payment button");
    }
  },
  true,
); // Use capture phase to catch events early
// Run this in the console to check for forms
console.log(document.querySelectorAll("form"));
