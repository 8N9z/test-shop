// Example products (you can edit or add more)
const products = [
    { name: "Cool T-shirt", price: "$15", image: "https://via.placeholder.com/200" },
    { name: "Sneakers", price: "$40", image: "https://via.placeholder.com/200" },
    { name: "Cap", price: "$10", image: "https://via.placeholder.com/200" }
];

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
