// بيانات المنتجات - غيرها أو أضف منتجات جديدة هنا
const products = [
  { 
    name: "وجبة برجر لحم", 
    price: "$15", 
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "برجر دجاج", 
    price: "$7", 
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "دجاج مشوي", 
    price: "$10", 
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
  },
];

// تحميل وعرض المنتجات في الصفحة
const productList = document.getElementById("product-list");
productList.innerHTML = ""; // تنظيف المحتوى القديم

products.forEach(product => {
  const item = document.createElement("div");
  item.classList.add("product");
  item.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>${product.price}</p>
    <button>إضافة للسلة</button>
  `;
  productList.appendChild(item);
});

// زر تبديل الوضع الليلي مع حفظ الحالة
const darkToggle = document.getElementById("darkModeToggle");

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

// تفعيل الوضع المحفوظ تلقائيًا عند تحميل الصفحة
if(localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  darkToggle.textContent = "☀️ وضع نهاري";
}
