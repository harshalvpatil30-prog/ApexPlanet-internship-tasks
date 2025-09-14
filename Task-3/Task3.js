// Tabs
function showTab(tabId) {
  let tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

// Quiz Questions
const quizData = [
  {
    question: "Which language is used for web development?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript"
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h1>", "<h6>", "<header>", "<p>"],
    answer: "<h1>"
  },
  {
    question: "Which tag is used for JavaScript?",
    options: ["<script>", "<js>", "<code>", "<javascript>"],
    answer: "<script>"
  },
  {
    question: "CSS stands for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
      "Creative Style System"
    ],
    answer: "Cascading Style Sheets"
  }
];

// Load Quiz (fixed to prevent rendering tags as HTML)
function loadQuiz() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = "";

  quizData.forEach((q, index) => {
    let questionBlock = document.createElement("div");
    questionBlock.classList.add("question-block");

    let questionTitle = document.createElement("h3");
    questionTitle.innerText = `Q${index + 1}: ${q.question}`;
    questionBlock.appendChild(questionTitle);

    q.options.forEach(option => {
      let label = document.createElement("label");
      let input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index}`;
      input.value = option;

      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + option));
      questionBlock.appendChild(label);
      questionBlock.appendChild(document.createElement("br"));
    });

    quizContainer.appendChild(questionBlock);
  });
}

// Submit Quiz
function submitQuiz() {
  let score = 0;

  quizData.forEach((q, index) => {
    let options = document.querySelectorAll(`input[name="q${index}"]`);
    options.forEach(opt => {
      let parentLabel = opt.parentElement;
      parentLabel.style.color = ""; // reset colors first

      // disable all options after submission
      opt.disabled = true;

      if (opt.checked) {
        if (opt.value === q.answer) {
          score++;
          parentLabel.style.color = "green"; // correct selected
        } else {
          parentLabel.style.color = "red";   // wrong selected
        }
      }

      // highlight correct answer always
      if (opt.value === q.answer) {
        parentLabel.style.color = "green";
      }
    });
  });

  let resultBox = document.getElementById("quizResult");

  // Show result with styling
  if (score === quizData.length) {
    resultBox.innerText = `🎉 Excellent! You scored full marks: ${score} / ${quizData.length}`;
    resultBox.style.color = "green";
    document.getElementById("retakeBtn").style.display = "none";
  } else {
    resultBox.innerText = `You scored ${score} / ${quizData.length}`;
    resultBox.style.color = "red";
    document.getElementById("retakeBtn").style.display = "inline-block";
  }
}

// Retake Quiz
function retakeQuiz() {
  document.getElementById("quizResult").innerText = "";
  document.getElementById("quizResult").style.color = "";
  document.getElementById("retakeBtn").style.display = "none";
  loadQuiz(); // reload quiz fresh
}

// Load quiz on page load
window.onload = loadQuiz;

// Weather API
function fetchWeather() {
  let city = document.getElementById("city").value.trim();
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  const apiKey = "6cfdec80b60df361675c33829d3c0bb0"; // 🔑 Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      document.getElementById("weather").innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>🌡️ Temp: ${data.main.temp}°C</p>
        <p>☁️ Condition: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(error => {
      document.getElementById("weather").innerText = "⚠️ " + error.message;
    });
}
