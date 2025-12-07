let currentQuestion = 0;
let score = 0;  // score??????????

const questionBox = document.getElementById("question-box");
const answersBox = document.getElementById("answers-box");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  const q = quizQuestions[currentQuestion];

  questionBox.innerHTML = `<div class="question">${q.question}</div>`;
  answersBox.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const answerDiv = document.createElement("div");
    answerDiv.classList.add("answer");
    answerDiv.textContent = answer;

    answerDiv.addEventListener("click", () => {
      handleAnswer(index);
    });

    answersBox.appendChild(answerDiv);
  });
}

function handleAnswer(selectedIndex) {
  const q = quizQuestions[currentQuestion];

  // score system????
  if (selectedIndex === q.correctIndex) {
    score++;
  }

  // answers
  [...answersBox.children].forEach((el, i) => {
    el.style.pointerEvents = "none";
    el.style.opacity = "0.6";

    if (i === q.correctIndex) el.style.backgroundColor = "#c8f7c5";
    if (i === selectedIndex && i !== q.correctIndex) el.style.backgroundColor = "#f7c5c5";
  });

  if (currentQuestion < quizQuestions.length - 1) {
    nextBtn.style.display = "inline-block";
  } else {
    nextBtn.textContent = "Finish";
    nextBtn.style.display = "inline-block";
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion >= quizQuestions.length) {
    showResults();
  } else {
    nextBtn.style.display = "none";
    loadQuestion();
  }
});

function showResults() {
  questionBox.innerHTML = `<h2>Quiz Finished!</h2>`;
  answersBox.innerHTML = `
    <p>Your score: <strong>${score}</strong> / ${quizQuestions.length}</p>
    <button id="retry-btn">Retry</button>
  `;
  nextBtn.style.display = "none";

  // Attach Retry button click handler
  document.getElementById("retry-btn").addEventListener("click", retryQuiz);
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  nextBtn.textContent = "Next Question";
  nextBtn.style.display = "none";
  loadQuestion();
}

// Start quiz
loadQuestion();
