const quizContainer = document.getElementById("quiz-container");

let currentQuestion = 0;
let score = 0;

// sounds
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

/* ---------- SCREENS ---------- */

function showStartScreen() {
  quizContainer.innerHTML = `
    <div class="screen">
      <h2>Welcome to the Quiz</h2>
      <p>Test your knowledge.</p>
      <div class="button" id="start-btn">Start Quiz</div>
    </div>
  `;

  document.getElementById("start-btn").addEventListener("click", startQuiz);
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = quizQuestions[currentQuestion];

  quizContainer.innerHTML = `
    <div class="screen">
      <div class="question">${q.question}</div>
      <div id="answers"></div>
    </div>
  `;

  const answersBox = document.getElementById("answers");

  q.answers.forEach((answer, index) => {
    const div = document.createElement("div");
    div.className = "answer";
    div.textContent = answer;

    div.addEventListener("click", () => handleAnswer(index, div));

    answersBox.appendChild(div);
  });
}

function handleAnswer(selectedIndex, clickedElement) {
  const q = quizQuestions[currentQuestion];
  const answers = document.querySelectorAll(".answer");

  // lock answers
  answers.forEach(el => el.style.pointerEvents = "none");

  const isCorrect = selectedIndex === q.correctIndex;

  if (isCorrect) {
    score++;
    clickedElement.style.backgroundColor = "#c8f7c5";
    correctSound.play();
  } else {
    clickedElement.style.backgroundColor = "#f7c5c5";
    answers[q.correctIndex].style.backgroundColor = "#c8f7c5";
    wrongSound.play();
  }

  // delay before feedback screen
  setTimeout(() => {
    showFeedbackScreen(isCorrect);
  }, 1500);
}

function showFeedbackScreen(isCorrect) {
  quizContainer.innerHTML = `
    <div class="screen">
      <h2 class="feedback ${isCorrect ? "correct" : "wrong"}">
        ${isCorrect ? "Correct!" : "Incorrect"}
      </h2>

      <p>Score: <strong>${score}</strong> / ${quizQuestions.length}</p>

      <div class="button" id="next-btn">
        ${currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
      </div>
    </div>
  `;

  document.getElementById("next-btn").addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
      showQuestion();
    } else {
      showEndScreen();
    }
  });
}

function showEndScreen() {
  quizContainer.innerHTML = `
    <div class="screen">
      <h2>Quiz Finished 🎉</h2>
      <p>Final score: <strong>${score}</strong> / ${quizQuestions.length}</p>
      <div class="button" id="retry-btn">Retry</div>
    </div>
  `;

  document.getElementById("retry-btn").addEventListener("click", showStartScreen);
}

/* ---------- INIT ---------- */

showStartScreen();
