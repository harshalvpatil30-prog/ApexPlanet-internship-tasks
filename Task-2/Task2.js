// Tab switching
function openTab(tabId, element) {
  let tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.classList.remove("active"));

  let buttons = document.querySelectorAll(".tablink");
  buttons.forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  element.classList.add("active");
}

// Contact Form validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (name === "" || email === "" || message === "") {
    alert("All fields are required!");
  } else if (!email.match(emailPattern)) {
    alert("Please enter a valid email address!");
  } else {
    alert("Form submitted successfully!");
    this.reset();
  }
});

// Add Image with Remove Option
function addImage() {
  let url = document.getElementById("imageUrl").value.trim();
  if (url !== "") {
    let gallery = document.getElementById("gallery");

    let wrapper = document.createElement("div");
    wrapper.classList.add("gallery-item");

    let img = document.createElement("img");
    img.src = url;
    img.alt = "User Image";

    let btn = document.createElement("button");
    btn.innerHTML = "×";
    btn.classList.add("remove-btn");
    btn.onclick = function() { removeImage(btn); };

    wrapper.appendChild(img);
    wrapper.appendChild(btn);
    gallery.appendChild(wrapper);

    document.getElementById("imageUrl").value = "";
  } else {
    alert("Please enter a valid image URL!");
  }
}

// Remove Image
function removeImage(button) {
  button.parentElement.remove();
}

