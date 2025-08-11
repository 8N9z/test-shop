// Product list
const products = [
    { name: "وجبة برجر لحم", price: "$15", image: "https://unsplash.com/photos/burger-with-cheese-and-lettuce-Op6iy0YoYzg" },
    { name: "برجر دجاج", price: "$7", image: "https://unsplash.com/photos/a-fried-chicken-sandwich-on-a-wooden-table-UDYjeBwFZf8" },
    { name: "دجاج مشوي", price: "$10", image: "https://unsplash.com/photos/fried-chicken-on-stainless-steel-tray-3Uj0GwVmOeY" },

];

// Render products
const productList = document.getElementById("product-list");
products.forEach(product => {
    const item = document.createElement("div");
    item.classList.add("product");
    item.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <button>Add to cart</button>
    `;
    productList.appendChild(item);
});

// Dark Mode toggle
const darkToggle = document.getElementById("darkModeToggle");

darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Change button text
    if (document.body.classList.contains("dark")) {
        darkToggle.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        darkToggle.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkToggle.textContent = "☀️ Light Mode";
}
