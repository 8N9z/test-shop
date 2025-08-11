const products = [
  { 
    name: "وجبة برجر لحم", 
    price: 15, 
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "برجر دجاج", 
    price: 7, 
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "دجاج مشوي", 
    price: 10, 
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
  },
  {
    name: "سلطة خضراء",
    price: 6,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "عصير برتقال طازج",
    price: 5,
    image: "https://images.unsplash.com/photo-1570968915860-95a6900e2d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "عصير تفاح طبيعي",
    price: 5,
    image: "https://images.unsplash.com/photo-1510626176961-4b0a46bbf78c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "بطاطس مقلية",
    price: 4,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "عصير مانجو",
    price: 6,
    image: "https://images.unsplash.com/photo-1510626176961-4b0a46bbf78c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "عصير أناناس",
    price: 6,
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "وجبة دجاج ناجتس",
    price: 12,
    image: "https://images.unsplash.com/photo-1605478817353-d7d13f7a7a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "بيتزا مارجريتا",
    price: 18,
    image: "https://images.unsplash.com/photo-1548365328-6e39222b4bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const productList = document.getElementById("product-list");
const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
const closeCartBtn = document.getElementById("closeCart");
const darkToggle = document.getElementById("darkModeToggle");

// سلة المشتريات (مصفوفة الكائنات)
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// عرض المنتجات
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

// تحديث عداد السلة
function updateCartCount() {
  let totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalCount;
}

// عرض محتويات السلة
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

// حفظ السلة في التخزين المحلي
function saveCart()
