/* ================================
   errors.js
   Non-blocking annoying errors with visual glitches + popups with random chaotic styles + images + rare fullscreen loading + meme integration
================================= */

let fakeConsole;
let popupInterval;
let loadingInterval;
let quizWobbleInterval;
let fullscreenLoadingInterval;

// =====================
// Random Meme Fetcher (NEW – non-blocking)
// =====================
function fetchRandomMeme(callback) {
  fetch("https://meme-api.com/gimme")
    .then(res => res.json())
    .then(data => {
      if (data && data.url) callback(data.url);
    })
    .catch(() => {});
}

// =====================
// Fake Console
// =====================
function createFakeConsole() {
  if (fakeConsole) return fakeConsole;

  fakeConsole = document.createElement("div");
  fakeConsole.id = "fake-console";
  fakeConsole.style = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 350px;
    height: 200px;
    background: rgba(0,0,0,0.95);
    color: lime;
    font-family: monospace;
    font-size: 12px;
    padding: 5px;
    overflow-y: auto;
    border: 3px dashed lime;
    z-index: 9998;
    mix-blend-mode: difference;
    text-shadow: 0 0 3px lime;
  `;
  document.body.appendChild(fakeConsole);
  return fakeConsole;
}

function spamFakeConsole() {
  const consoleEl = createFakeConsole();
  setInterval(() => {
    const errors = [
      "ALERT!!! CRITICAL ERROR DETECTED!!! CALL SUPPORT NOW!!!",
      "MEMORY OVERLOAD! SYSTEM MAY EXPLODE! DO NOT IGNORE!",
      "Warning!!! Unexpected token detected at line " + Math.floor(Math.random() * 100) + "!!!",
      "OH NO! Cannot read property 'foo'! Your system in DANGER!",
      "SYSTEM PANIC: Stack overflow! RUN QUICK!",
      "EMERGENCY! System failure imminent! Contact support immediately!!!",
      "SEGFAULT!!! Something went VERY wrong!",
      "GRAPHICS CRASH!!! Texture error in renderer!",
      "PLAYER DATA CORRUPTION!!! Proceed with caution!!!",
      "SCRIPT HALT!!! Unable to continue game logic!",
      "NO CONNECTION: Check your network!",
      "HACK DETECTED!!! Unauthorized memory access!",
      "RUNTIME PANIC!!! Game world may implode!",
      "ERROR 0xDEADBEEF!!!",
      "WARNING!!! Life support systems at 1%!!!",
      "FATAL ERROR!!! Cyberdeck has exploded!",
      "BUG REPORTED!!! You cannot save the game anymore!",
      "UNKNOWN ERROR",
      "WARN: Critical temperature detected!!!",
      "ERROR: 'your mum' is too large!",
    ];
    const msg = errors[Math.floor(Math.random() * errors.length)];
    const glitchColor = ["lime", "red", "yellow", "cyan", "magenta"][Math.floor(Math.random() * 5)];
    const flicker = Math.random() < 0.1 ? "█" : "";
    consoleEl.innerHTML += `<span style="color:${glitchColor}">${msg} ${flicker}</span><br>`;
    consoleEl.scrollTop = consoleEl.scrollHeight;

    if (Math.random() < 0.1) {
      consoleEl.style.transform = `translate(${Math.random()*3-1.5}px, ${Math.random()*3-1.5}px)`;
      setTimeout(() => consoleEl.style.transform = "translate(0,0)", 100);
    }

    if (Math.random() < 0.05) {
      consoleEl.style.color = ["lime","red","yellow","cyan","magenta"][Math.floor(Math.random()*5)];
    }

  }, 250);
}
function spamPopups() {
  popupInterval = setInterval(() => {

    const messages = [
      "WARNING!!! System unstable! Call support NOW!!!",
      "OH MY GOD!!! Error cannot be ignored!!!",
      "Attention!!! Do you want TECHNICAL HELP immediately?",
      "URGENT!!! Invalid operation detected!!!",
      "DANGER!!! Something went very VERY wrong!!!",
      "GAME CRASH!!! Save files corrupted!!!",
      "NETWORK FAILURE!!! Cannot reach main server!!!",
      "GRAPHICS ERROR!!! Textures missing!!!",
      "INPUT ERROR!!! Controller disconnected!!!",
      "SCRIPT LOCK!!! Game loop frozen!!!",
      "UI BUG!!! Buttons overlapping!!!",
      "PLAYER DATA LOST!!! OH FUCK!!!!!!!!!!!!",
      "LAUNCHING NUKES NOW!!!! INPUT YOUR CREDIT CARD INFORMATION TO STOP!!!!",
      "ILLEGAL ACTION DETECTED!!! CALLING FBI NOW!!!",
      "YOUR COMPUTER HAS A VIRUS!!!!!",
      "WARNING: WARNING",
      ""
    ];

    const msg = messages[Math.floor(Math.random() * messages.length)];

    const popup = document.createElement("div");

    // Random style properties
    const bgColors = ["rgba(255,0,0,0.9)", "rgba(0,0,0,0.8)", "rgba(0,0,255,0.8)", "rgba(255,255,0,0.8)", "rgba(0,255,0,0.8)"];
    const borderColors = ["yellow","red","lime","cyan","magenta"];
    const fonts = ["monospace","Courier New","Arial Black","Impact","Comic Sans MS"];
    const fontSizes = [12,14,16,18,20];

    popup.style = `
      position: fixed;
      top: ${Math.random()*70 + 10}%;
      left: ${Math.random()*70 + 10}%;
      padding: ${Math.floor(Math.random()*12+8)}px ${Math.floor(Math.random()*12+8)}px;
      background: ${bgColors[Math.floor(Math.random()*bgColors.length)]};
      color: ${borderColors[Math.floor(Math.random()*borderColors.length)]};
      font-family: ${fonts[Math.floor(Math.random()*fonts.length)]};
      font-size: ${fontSizes[Math.floor(Math.random()*fontSizes.length)]}px;
      border: 2px dashed ${borderColors[Math.floor(Math.random()*borderColors.length)]};
      z-index: ${Math.floor(Math.random()*10000)};
      transform: rotate(${Math.random()*10-5}deg);
      display: flex;
      flex-direction: column;
      gap: ${Math.floor(Math.random()*10+2)}px;
      min-width: ${Math.floor(Math.random()*150+150)}px;
      box-shadow: ${Math.floor(Math.random()*5-2)}px ${Math.floor(Math.random()*5-2)}px 8px ${borderColors[Math.floor(Math.random()*borderColors.length)]};
    `;

    // image / meme
    if (Math.random() < 0.4) {
      const img = document.createElement("img");

      const staticPics = [
        "https://picsum.photos/200?random=" + Math.floor(Math.random()*1000),
        "https://placekitten.com/200/200",
        "https://placebear.com/200/200",
        "https://loremflickr.com/200/200",
        "https://i.imgflip.com/1bij.jpg",
        "https://i.imgflip.com/26am.jpg",
        "https://i.imgflip.com/2fm6x.jpg"
      ];

      if (Math.random() < 0.5) {
        fetchRandomMeme(url => img.src = url);
      } else {
        img.src = staticPics[Math.floor(Math.random() * staticPics.length)];
      }

      img.style = `
        width: ${Math.random()*100 + 50}px;
        height: auto;
        filter: blur(${Math.random()*3}px) contrast(${Math.random()*2+0.5});
      `;
      popup.appendChild(img);
    }

    // add the randomized message
    const msgEl = document.createElement("div");
    msgEl.textContent = msg;
    popup.appendChild(msgEl);

    const numButtons = Math.floor(Math.random() * 4);
    if (numButtons > 0) {
      const buttonContainer = document.createElement("div");
      buttonContainer.style = "display:flex; gap:6px; justify-content:flex-end";
      for (let i=0;i<numButtons;i++){
        const btn = document.createElement("button");
        btn.textContent = ["Close","Report","Ignore","Retry"][Math.floor(Math.random()*4)];
        btn.style = `
          padding: ${Math.floor(Math.random()*6+3)}px ${Math.floor(Math.random()*6+3)}px;
          font-size: ${Math.floor(Math.random()*4+10)}px;
          cursor: pointer;
          background: ${Math.random()<0.5?"white":"yellow"};
          color: ${Math.random()<0.5?"black":"red"};
          border: 1px solid ${Math.random()<0.5?"black":"red"};
        `;
        buttonContainer.appendChild(btn);
      }
      popup.appendChild(buttonContainer);
    }

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), Math.random()*5000 + 2000);

    // standalone meme/image
    if (Math.random() < 0.5) {
      const img = document.createElement("img");

      if (Math.random() < 0.5) {
        fetchRandomMeme(url => img.src = url);
      } else {
        img.src = "https://picsum.photos/300?random=" + Math.floor(Math.random()*1000);
      }

      img.style = `
        position: fixed;
        top: ${Math.random()*80 + 10}%;
        left: ${Math.random()*80 + 10}%;
        width: ${Math.random()*200 + 100}px;
        height: auto;
        filter: blur(${Math.random()*2}px) contrast(${Math.random()*2});
        z-index: ${Math.floor(Math.random()*10000)};
      `;

      document.body.appendChild(img);
      setTimeout(() => img.remove(), Math.random()*6000 + 3000);
    }

  }, 3000);
}

// =====================
// Randomly Positioned Small Loading Bars
// =====================
function spawnLoadingBar() {
  loadingInterval = setInterval(() => {
    const bar = document.createElement("div");
    bar.style = `
      position: fixed;
      top: ${Math.random()*80 + 10}%;
      left: ${Math.random()*80 + 10}%;
      width: 200px;
      height: 20px;
      background: rgba(255,255,255,0.1);
      border: 1px solid #fff;
      z-index: ${Math.floor(Math.random()*10000)};
      font-size: 10px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: monospace;
      mix-blend-mode: difference;
    `;
    bar.textContent = "LOADING... 0% ALERT ALERT!!!";
    document.body.appendChild(bar);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15);
      bar.textContent = `LOADING... ${progress}% !!!GAME MAY CRASH!!!`;
      bar.style.backgroundColor = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.2)`;
      bar.style.color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => bar.remove(), 300);
      }
    }, 80);
  }, 2500);
}

// =====================
// Rare Fullscreen Loading Screen
// =====================
function spawnFullscreenLoading() {
  fullscreenLoadingInterval = setInterval(() => {
    if (Math.random() < 0.03) {
      const fs = document.createElement("div");
      fs.style = `
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.9);
        color: lime;
        display:flex;
        justify-content:center;
        align-items:center;
        font-family: monospace;
        font-size: 24px;
        z-index: 20000;
        text-align:center;
        flex-direction: column;
      `;
      fs.textContent = "LOADING YOUR MUM PLS WAIT... PLEASE WAIT!!!";
      document.body.appendChild(fs);

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5);
        fs.textContent = `LOADING... ${progress}%`;
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => fs.remove(), 500);
        }
      }, 100);
    }
  }, 5000);
}

// =====================
// Quiz Screen Wobble
// =====================
function wobbleQuizScreen() { 
  const quizContainer = document.getElementById("quiz-container"); 
  quizWobbleInterval = setInterval(() => { 
    const x = Math.random()*8 - 4; 
    const y = Math.random()*8 - 4; 
    const rot = Math.random()*4 - 2; 
    quizContainer.style.transform = `translate(${x}px,${y}px) rotate(${rot}deg)`; 
    setTimeout(() => quizContainer.style.transform = "translate(0,0) rotate(0deg)", 150); 
  }, 500); 
}

// =====================
// Start All Annoyances
// =====================
function startAnnoyingErrors() {
  spamFakeConsole();
  spamPopups();
  spawnLoadingBar(); 
  spawnFullscreenLoading(); 
  wobbleQuizScreen();
}

window.addEventListener("load", startAnnoyingErrors);

function stopAnnoyingErrors() {
  if (popupInterval) clearInterval(popupInterval);
  if (loadingInterval) clearInterval(loadingInterval);
  if (quizWobbleInterval) clearInterval(quizWobbleInterval);
  if (fullscreenLoadingInterval) clearInterval(fullscreenLoadingInterval);
  if (fakeConsole) fakeConsole.remove();
}

/* =========================
   Optional CSS animations
========================= */
const styleEl = document.createElement("style");
styleEl.innerHTML = `
@keyframes glitch-popup {
  0% { transform: translate(0,0) rotate(0deg); }
  25% { transform: translate(2px,-2px) rotate(1deg); }
  50% { transform: translate(-2px,2px) rotate(-1deg); }
  75% { transform: translate(2px,2px) rotate(1deg); }
  100% { transform: translate(-2px,-2px) rotate(-1deg); }
}
`;
document.head.appendChild(styleEl);
