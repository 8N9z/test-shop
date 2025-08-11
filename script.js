// تأكد من تحميل products.js قبل هذا السكريبت

const productList = document.getElementById("product-list");
const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
const closeCartBtn = document.getElementById("closeCart");
const darkToggle = document.getElementById("darkModeToggle");

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function renderProducts() {
  productList.innerHTML = '';
  products.forEach((product, index) => {
    const item = document.createElement('div');
    item.classList.add('product');
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button data-index="${index}">إضافة للسلة</button>
    `;
    productList.appendChild(item);
  });
}

function updateCartCount() {
  let totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalCount;
}

function renderCart() {
  if(cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p>السلة فارغة.</p>';
    cartTotalPrice.textContent = '0.00';
    return;
  }

  cartItemsContainer.innerHTML = '';
  let totalPrice = 0;

  cartItems.forEach((item, index) => {
    const product = products[item.productIndex];
    const itemTotal = product.price * item.quantity;
    totalPrice += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="cart-item-details">
        <h4>${product.name}</h4>
        <p>$${product.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
      </div>
      <div class="cart-item-qty">
        <button class="dec" data-index="${index}">−</button>
        <span>${item.quantity}</span>
        <button class="inc" data-index="${index}">+</button>
      </div>
      <button class="remove" data-index="${index}" title="حذف المنتج">×</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalPrice.textContent = totalPrice.toFixed(2);
}

function saveCart() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartCount();
  renderCart();
}

function addToCart(productIndex) {
  const existingIndex = cartItems.findIndex(item => item.productIndex === productIndex);
  if(existingIndex > -1) {
    cartItems[existingIndex].quantity++;
  } else {
    cartItems.push({ productIndex, quantity: 1 });
  }
  saveCart();
  alert('تمت إضافة المنتج للسلة');
}

function removeFromCart(cartIndex) {
  cartItems.splice(cartIndex, 1);
  saveCart();
}

function changeQuantity(cartIndex, delta) {
  cartItems[cartIndex].quantity += delta;
  if(cartItems[cartIndex].quantity < 1) {
    removeFromCart(cartIndex);
  } else {
    saveCart();
  }
}

cartBtn.addEventListener('click', () => {
  cart.classList.toggle('hidden');
});

closeCartBtn.addEventListener('click', () => {
  cart.classList.add('hidden');
});

productList.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON') {
    const productIndex = parseInt(e.target.getAttribute('data-index'));
    addToCart(productIndex);
  }
});

cartItemsContainer.addEventListener('click', e => {
  if(e.target.classList.contains('inc')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    changeQuantity(index, +1);
  }
  else if(e.target.classList.contains('dec')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    changeQuantity(index, -1);
  }
  else if(e.target.classList.contains('remove')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    removeFromCart(index);
  }
});

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if(document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    darkToggle.textContent = "☀️ وضع نهاري";
  } else {
    localStorage.setItem("theme", "light");
    darkToggle.textContent = "🌙 وضع داكن";
  }
});

if(localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  darkToggle.textContent = "☀️ وضع نهاري";
}

// شغّل العرض أول مرة
renderProducts();
updateCartCount();
renderCart();
