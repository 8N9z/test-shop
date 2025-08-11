// Example products (you can edit or add more)
const products = [
    { name: "احمد", price: "$1", image: "https://www.freepik.com/free-photo/portrait-african-american-man_17625343.htm#fromView=search&page=1&position=3&uuid=ce711983-3766-4aee-a1e7-f5a9d7b98dc0&query=Black+Man" },
    { name: "سعد", price: "$3.5", image: "https://www.freepik.com/free-photo/portrait-handsome-bearded-male_8511709.htm#fromView=search&page=1&position=20&uuid=ce711983-3766-4aee-a1e7-f5a9d7b98dc0&query=Black+Man" },
    { name: "جمال", price: "$5", image: "https://www.freepik.com/free-photo/vertical-shot-attractive-african-american-male-smiling-camera_14704257.htm#fromView=search&page=1&position=22&uuid=ce711983-3766-4aee-a1e7-f5a9d7b98dc0&query=Black+Man" }
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
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}
