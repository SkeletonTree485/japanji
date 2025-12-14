const quizContainer = document.getElementById("quiz-container");
const backgroundEl = document.getElementById("background");

let currentQuestion = 0;
let score = 3;

// sounds
const correctSound = new Audio("assets/sounds/correct.mp3");
const wrongSound = new Audio("assets/sounds/wrong.mp3");
const startSound = new Audio("assets/sounds/start.mp3");
const winSound = new Audio("assets/sounds/win.mp3");

// list of theme classes defined in CSS - used to clear old theme classes
const THEME_CLASSES = ['theme-sun','theme-flame','theme-night','theme-start','theme-end','theme-error'];

function clearThemesFrom(el) {
  THEME_CLASSES.forEach(c => el.classList.remove(c));
}

function applyTheme(themeClass) {
  // apply to big background
  clearThemesFrom(backgroundEl);
  if (themeClass) backgroundEl.classList.add(themeClass);

  // apply to quiz container
  clearThemesFrom(quizContainer);
  if (themeClass) quizContainer.classList.add(themeClass);
}

/* ---------- SCREENS ---------- */

function showStartScreen() {
  applyTheme('theme-start');

  quizContainer.innerHTML = `
    <div class="screen screen--start">
      <h2>Welcome to Japanji</h2>
      <p></p>
      <div class="question">Are you ready to start?</div>
      <div class="button" id="start-btn">Play game</div>
    </div>
  `;

  const startBtn = document.getElementById("start-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      try { startSound.play(); } catch (e) {}
      startQuiz();
    });
  }
}

function startQuiz() {
  currentQuestion = 0;
  score = 3;
  showQuestion();
}

function showQuestion() {
  const q = quizQuestions[currentQuestion];

  // apply theme for this question (if defined), otherwise clear
  if (q && q.backgroundClass) {
    applyTheme(q.backgroundClass);
  } else {
    clearThemesFrom(backgroundEl);
    clearThemesFrom(quizContainer);
  }

  quizContainer.innerHTML = `
    <div class="screen">
      <div class="question" id="question-box">${q.question}</div>
      <p> What will be your choice? </p>
      <div id="answers" aria-live="polite"></div>
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
  const answers = Array.from(document.querySelectorAll(".answer"));

  // lock answers
  answers.forEach(el => el.style.pointerEvents = "none");

  const isCorrect = selectedIndex === q.correctIndex;

  if (isCorrect) {
    clickedElement.style.backgroundColor = "#c8f7c5";
    try { correctSound.play(); } catch (e) {}
  } else {
    score--;
    clickedElement.style.backgroundColor = "#f7c5c5";
    // highlight correct answer if present
    if (answers[q.correctIndex]) answers[q.correctIndex].style.backgroundColor = "#c8f7c5";
    try { wrongSound.play(); } catch (e) {}
  }

  // delay before feedback screen
  setTimeout(() => {
    showFeedbackScreen(isCorrect);
  }, 1500);
}

function showFeedbackScreen(isCorrect) {
  // keep the current question's theme (already applied), but feedback screen has its own additional layout
  quizContainer.innerHTML = `
    <div class="screen">
      <h2 class="feedback ${isCorrect ? "correct" : "wrong"}">
        ${isCorrect ? "Correct!" : "Incorrect"}
      </h2>

      <p>Score: <strong>${score}</strong> / ${quizQuestions.length}</p>

      <div class="button next-btn" id="next-btn">
        ${currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
      </div>
    </div>
  `;

  const nextBtn = document.getElementById("next-btn");
  nextBtn.addEventListener("click", () => {
    // small chance to show a random error screen instead of advancing
    const errorChance = 0.08; // 8% chance (tweakable)
    if (Math.random() < errorChance) {
      showErrorScreen();
      return;
    }

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
      showQuestion();
    } else {
      showEndScreen();
    }
  });
}

function showEndScreen() {
  applyTheme('theme-end');

  quizContainer.innerHTML = `
    <div class="screen screen--end">
      <h2>You Win!</h2>
      <p>Final score: <strong>${score}</strong> / ${quizQuestions.length}</p>
      <div class="question">Thanks for playing!</div>
      <div class="button" id="retry-btn">Retry</div>
    </div>
  `;

  document.getElementById("retry-btn").addEventListener("click", () => {
    showStartScreen();
  });
}

/* small random error screen (optional support you permitted) */
function showErrorScreen() {
  applyTheme('theme-error');

  quizContainer.innerHTML = `
    <div class="screen screen--error">
      <h2>Internal Error</h2>
      <p>Error code: NaN</p>
      <div class="question">Gathering error data....</div>
      <div class="button" id="error-retry">Back to question</div>
      <div class="button" id="error-home">Report error to the developer</div>
    </div>
  `;

  document.getElementById("error-retry").addEventListener("click", () => {
    // back to same question, keep score unchanged
    showQuestion();
  });
}

/* ---------- INIT ---------- */
showStartScreen();
