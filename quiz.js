const quizContainer = document.getElementById("quiz-container");
const backgroundEl = document.getElementById("background");

let currentQuestion = 0;
let score = 3;

// sounds
const correctSound = new Audio("assets/sounds/correct.mp3");
const wrongSound = new Audio("assets/sounds/wrong.mp3");
const startSound = new Audio("assets/sounds/start.mp3");
const winSound = new Audio("assets/sounds/win.mp3");

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

/* ---------- SCREENS ---------- */

let mainMusic = new Audio("assets/sounds/main.mp3");
mainMusic.loop = true; // loop the music

function showStartScreen() {
  applyTheme('theme-start');

  quizContainer.innerHTML = `
    <div class="screen screen--start">
      <h2>Welcome to Japanji!</h2>
      <p class="nice-container-info">Are you ready to start?</p>
      <div class="button" id="start-btn">Play the game</div>
    </div>
  `;

  // Start playing the main background music
  try { mainMusic.play(); } catch {}

  document.getElementById("start-btn").addEventListener("click", () => {
    try { 
      startSound.play(); 
    } catch {}

    // Stop the main music when quiz starts
    mainMusic.pause();
    mainMusic.currentTime = 0;

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
  else {
    clearThemesFrom(backgroundEl);
    clearThemesFrom(quizContainer);
  }

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
    // advance ONCE
    currentQuestion++;

    const showError = Math.random() < 0.5;

    if (showError) {
      showErrorScreen();
    } else {
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

  quizContainer.innerHTML = `
    <div class="screen screen--error">
      <h2>Internal Error</h2>
      <p class="nice-container-header">Error code: NaN</p>
      <div class="nice-container-info">Gathering error data.... 0%</div>
      <div class="button" id="error-retry">Close</div>
      <div class="button" id="error-retry">Report it to the developer</div>
    </div>
  `;

  document.getElementById("error-retry").addEventListener("click", continueQuiz);
}

function showEndScreen() {
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
