const quizContainer = document.getElementById("quiz-container");
const backgroundEl = document.getElementById("background");

let currentQuestion = 0;
let score = 3;

// sounds
const correctSound = new Audio("assets/sounds/correct2.mp3");
const wrongSound = new Audio("assets/sounds/wrong2.mp3");
const startSound = new Audio("assets/sounds/start2.mp3");
const winSound = new Audio("assets/sounds/win.mp3");
const creeperSound = new Audio("assets/sounds/creeper.mp3");

// themes
const THEME_CLASSES = [
  'theme-sumo',
  'theme-bath',
  'theme-karaoke',
  'theme-start',
  'theme-end',
  'theme-error'
];

function clearThemesFrom(el) {
  THEME_CLASSES.forEach(c => el.classList.remove(c));
}

function applyTheme(themeClass) {
  clearThemesFrom(backgroundEl);
  clearThemesFrom(quizContainer);
  if (themeClass) {
    backgroundEl.classList.add(themeClass);
    quizContainer.classList.add(themeClass);
  }
}

/* ---------- Fake Console & Errors ---------- */
function createFakeConsole() {
  const fc = document.createElement("div");
  fc.id = "fake-console";
  fc.style = `
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 300px;
    height: 150px;
    background: rgba(0,0,0,0.85);
    color: lime;
    font-family: monospace;
    font-size: 12px;
    padding: 5px;
    overflow-y: auto;
    border: 1px solid lime;
    z-index: 2;
  `;
  document.body.appendChild(fc);
  return fc;
}

function triggerRandomErrors() {
  const fakeConsole = document.getElementById("fake-console") || createFakeConsole();
  setInterval(() => {
    const errors = [
      "CRITICAL ERROR: NullReferenceException at QuizEngine.js",
      "Memory Leak Detected...",
      "Unexpected token at line " + Math.floor(Math.random() * 100),
      "Error: Cannot read property 'foo' of undefined",
      "Warning: Stack overflow in main thread",
      "SYSTEM FAILURE: Attempting recovery..."
    ];
    const msg = errors[Math.floor(Math.random() * errors.length)];
    fakeConsole.innerHTML += msg + "<br>";
    fakeConsole.scrollTop = fakeConsole.scrollHeight;
  }, 500);
}

/* ---------- SCREENS ---------- */
let mainMusic;

function showStartScreen() {
  applyTheme('theme-start');

  quizContainer.innerHTML = `
    <div class="screen screen--start">
      <h2>Welcome to Japanji!</h2>
      <p class="nice-container-info">Are you ready to start?</p>
      <div class="button" id="start-btn">Play the game</div>
    </div>
  `;

  const startBtn = document.getElementById("start-btn");
  startBtn.addEventListener("click", () => {
    if (!mainMusic) {
      mainMusic = new Audio("assets/sounds/correct3.mp3");
      mainMusic.loop = true;
      try { mainMusic.play(); } catch {}
    }

    try { startSound.play(); } catch {}

    if (mainMusic) {
      mainMusic.pause();
      mainMusic.currentTime = 0;
    }

    // start random console errors
    triggerRandomErrors();

    startQuiz();
  });
}

function startQuiz() {
  currentQuestion = 0;
  score = 3;
  showQuestion();
}

function showQuestion() {
  const q = quizQuestions[currentQuestion];

  if (q.backgroundClass) applyTheme(q.backgroundClass);
  else clearThemesFrom(backgroundEl);

  quizContainer.innerHTML = `
    <div class="screen">
      <div class="nice-container-header">${q.question}</div>
      <p class="nice-container-info">What will be your choice?</p>
      <div id="answers"></div>
    </div>
  `;

  const answersBox = document.getElementById("answers");

  q.answers.forEach((answer, index) => {
    const div = document.createElement("div");
    div.className = "answer";
    div.textContent = answer;
    div.onclick = () => handleAnswer(index, div);
    answersBox.appendChild(div);
  });
}

function handleAnswer(selectedIndex, clickedElement) {
  const q = quizQuestions[currentQuestion];
  const answers = document.querySelectorAll(".answer");

  answers.forEach(a => a.style.pointerEvents = "none");

  const isCorrect = selectedIndex === q.correctIndex;

  if (isCorrect) {
    clickedElement.style.backgroundColor = "#c8f7c5";
    try { correctSound.play(); } catch {}
  } else {
    score--;
    clickedElement.style.backgroundColor = "#f7c5c5";
    answers[q.correctIndex].style.backgroundColor = "#c8f7c5";
    try { wrongSound.play(); } catch {}
  }

  setTimeout(() => showFeedbackScreen(isCorrect), 1500);
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
    const showError = Math.random() < 0.5;

    if (showError) {
      showErrorScreen();
    } else {
      currentQuestion++;
      continueQuiz();
    }
  });
}

function continueQuiz() {
  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    showEndScreen();
  }
}

function showErrorScreen() {
  applyTheme('theme-error');
  try { wrongSound.play(); } catch {}

  quizContainer.innerHTML = `
    <div class="screen screen--error">
      <h2>Internal Error</h2>
      <p class="nice-container-header">Error code: NaN</p>
      <div class="nice-container-info">Gathering error data.... 0%</div>
      <div class="button" id="error-retry">Close</div>
      <div class="button" id="error-report">Report it to the developer</div>
    </div>
  `;

  document.getElementById("error-retry").addEventListener("click", () => {
    currentQuestion++;
    continueQuiz();
  });
}

function show404Screen() {
  applyTheme('theme-error');
  try { creeperSound.play(); } catch {}

  quizContainer.innerHTML = `
    <div class="screen screen--error">
      <h2>404 Not Found</h2>
      <p class="nice-container-header">This page doesn't exist</p>
      <div class="nice-container-info">Returning to results...</div>
      <div class="button" id="404-continue">Continue</div>
    </div>
  `;

  document.getElementById("404-continue").addEventListener("click", showActualEndScreen);
}

function showEndScreen() {
  // prank 404 first
  show404Screen();
}

function showActualEndScreen() {
  applyTheme('theme-end');

  quizContainer.innerHTML = `
    <div class="screen screen--end">
      <h2>You Win!</h2>
      <p>Final score: <strong>${score}</strong></p>
      <div class="button" id="retry-btn">Restart</div>
    </div>
  `;

  document.getElementById("retry-btn").addEventListener("click", showStartScreen);
}

/* ---------- INIT ---------- */
showStartScreen();
