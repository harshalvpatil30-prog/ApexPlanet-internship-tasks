// Tabs
function showTab(tabId) {
  let tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

/* ---------------- To-Do App ---------------- */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration:${task.done ? 'line-through' : 'none'}">
        ${task.text}
      </span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>`;
    todoList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("todoInput");
  if (input.value.trim() === "") return;
  tasks.push({ text: input.value, done: false });
  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

/* ---------------- Products ---------------- */
const products = [
  { name: "Smartphone", category: "electronics", price: 500, rating: 4.5 },
  { name: "Laptop", category: "electronics", price: 1000, rating: 4.7 },
  { name: "T-Shirt", category: "clothing", price: 20, rating: 4.2 },
  { name: "Novel", category: "books", price: 15, rating: 4.8 },
  { name: "Headphones", category: "electronics", price: 80, rating: 4.3 },
  { name: "Jeans", category: "clothing", price: 40, rating: 4.0 }
];

function renderProducts(list) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";
  list.forEach(p => {
    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h4>${p.name}</h4>
      <p>Category: ${p.category}</p>
      <p>💲 ${p.price}</p>
      <p>⭐ ${p.rating}</p>`;
    grid.appendChild(card);
  });
}

function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  let filtered = products;
  if (category !== "all") {
    filtered = products.filter(p => p.category === category);
  }
  renderProducts(filtered);
}

function sortProducts() {
  const sortOption = document.getElementById("sortOption").value;
  let sorted = [...products];

  if (sortOption === "priceLowHigh") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortOption === "ratingHighLow") {
    sorted.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === "ratingLowHigh") {
    sorted.sort((a, b) => a.rating - b.rating);
  }

  renderProducts(sorted);
}

/* ---------------- Init ---------------- */
window.onload = function () {
  renderTasks();
  renderProducts(products);
};
