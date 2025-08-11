// Product list
const products = [
    { name: "جمال", price: "$3", image: "" },
    { name: "سعد", price: "$2", image: "" },
    { name: "احمد", price: "$2.5", image: "" },

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
