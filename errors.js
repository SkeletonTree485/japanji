
let fakeConsole;
let popupInterval;
let loadingInterval;
let quizWobbleInterval;
let fullscreenLoadingInterval;


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
  }, 250);
}

// =====================
// Random Popups with Random Styles & Images
// =====================
function spamPopups() {
  popupInterval = setInterval(() => {

    const popup = document.createElement("div");

    popup.style = `
      position: fixed;
      top: ${Math.random()*70 + 10}%;
      left: ${Math.random()*70 + 10}%;
      padding: 12px;
      background: rgba(0,0,0,0.8);
      color: lime;
      font-family: monospace;
      border: 2px dashed lime;
      z-index: ${Math.floor(Math.random()*10000)};
      transform: rotate(${Math.random()*10-5}deg);
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 200px;
    `;

    // image / meme (UNCHANGED + MEME INTEGRATED)
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
        width: ${Math.random()*100 + 80}px;
        filter: blur(${Math.random()*3}px) contrast(${Math.random()*2+0.5});
      `;
      popup.appendChild(img);
    }

    popup.appendChild(document.createTextNode("CRITICAL ERROR"));

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), Math.random()*5000 + 2000);

    // standalone meme/image (ALSO INTEGRATED)
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
        width: ${Math.random()*200 + 120}px;
        z-index: ${Math.floor(Math.random()*10000)};
      `;

      document.body.appendChild(img);
      setTimeout(() => img.remove(), Math.random()*6000 + 3000);
    }

  }, 3000);
}

// =====================
// Everything else untouched
// =====================
function startAnnoyingErrors() {
  spamFakeConsole();
  spamPopups();
}

window.addEventListener("load", startAnnoyingErrors);
