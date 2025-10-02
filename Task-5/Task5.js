// Tabs
function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

/* Products */
const products = [
  {
    name: "Iphone 15 pro",
    category: "electronics",
    price: 500,
    rating: 4.5,
    image: "iphone.webp"
  },
  {
    name: "Macbook M3",
    category: "electronics",
    price: 1000,
    rating: 4.7,
    image: "laptop.jpeg"
  },
  {
    name: "T-Shirt",
    category: "clothing",
    price: 20,
    rating: 4.2,
    image: "Tshirt.jpg"
  },
  {
    name: "Harry Potter Novels",
    category: "books",
    price: 15,
    rating: 4.8,
    image: "novel.jpg"
  },
  {
    name: "JBL Headphones",
    category: "electronics",
    price: 80,
    rating: 4.3,
    image: "headphone.webp"
  },
  {
    name: "Jeans",
    category: "clothing",
    price: 40,
    rating: 4.0,
    image: "jeans.jpeg"
  }
];

function renderProducts(list) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";
  list.forEach((p, index) => {
    let card = document.createElement("div");
    card.className = "product-box";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-img">
      <h4>${p.name}</h4>
      <p>Category: ${p.category}</p>
      <p>💲 ${p.price}</p>
      <p>⭐ ${p.rating}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>`;
    grid.appendChild(card);
  });
}

function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  let filtered = (category === "all") ? products : products.filter(p => p.category === category);
  renderProducts(filtered);
}

function sortProducts() {
  const sortOption = document.getElementById("sortOption").value;
  let sorted = [...products];

  if (sortOption === "priceLowHigh") sorted.sort((a, b) => a.price - b.price);
  if (sortOption === "priceHighLow") sorted.sort((a, b) => b.price - a.price);
  if (sortOption === "ratingHighLow") sorted.sort((a, b) => b.rating - a.rating);
  if (sortOption === "ratingLowHigh") sorted.sort((a, b) => a.rating - b.rating);

  renderProducts(sorted);
}

/* Cart */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    let div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button onclick="removeFromCart(${index})">Remove</button>`;
    cartItems.appendChild(div);
  });

  document.getElementById("cartTotal").innerText = total.toFixed(2);
  document.getElementById("cartCount").innerText = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(index) {
  cart.push(products[index]);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

/* Checkout */
function checkout() {
  document.getElementById("checkoutForm").style.display = "block";
}

function submitOrder(event) {
  event.preventDefault();
  cart = [];
  localStorage.removeItem("cart");
  updateCart();
  document.getElementById("checkoutForm").style.display = "none";
  document.getElementById("orderMessage").innerText = "✅ Order placed successfully!";
}

/* Init */
window.onload = function () {
  renderProducts(products);
  updateCart();
};
