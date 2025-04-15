let gameName = "Guess the word";
document.title = gameName;
document.querySelector("h1").innerText = gameName;
document.querySelector(
  "footer"
).innerText = `${gameName} Made by Salma Mossallem`;
let message = document.querySelector(".message");
let numOfTries = 5;
let currentTry = 1;
const words = [
  "apple",
  "banana",
  "school",
  "garden",
  "friend",
  "travel",
  "window",
  "laptop",
  "coffee",
  "camera",
  "summer",
  "winter",
  "father",
  "mother",
  "animal",
  "doctor",
  "people",
  "singer",
  "artist",
  "driver",
  "player",
  "runner",
  "writer",
  "planet",
  "forest",
  "castle",
  "mirror",
  "button",
  "dollar",
  "danger",
  "hunter",
  "island",
  "pillow",
  "screen",
  "yellow",
  "purple",
  "orange",
  "circle",
  "square",
  "number",
  "letter",
  "rocket",
  "bridge",
  "engine",
  "market",
  "ticket",
  "flight",
  "signal",
  "update",
  "option",
  "folder",
  "memory",
  "backup",
  "cookie",
  "stream",
  "system",
  "remote",
  "manual",
  "motion",
  "native",
  "silver",
  "beauty",
  "golden",
  "leader",
  "random",
  "silent",
  "global",
  "future",
  "honest",
  "normal",
  "formal",
  "public",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let numOfLetters = wordToGuess.length;
let numOfHints = 2;
document.querySelector(".hint").innerHTML = `<span>${numOfHints}</span> Hints`;
let hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", hint);
function generateInputs() {
  let inputscontainer = document.querySelector(".inputs");
  for (let i = 1; i <= numOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) {
      tryDiv.classList.add("disabled");
    }
    for (let j = 1; j <= numOfLetters; j++) {
      const input = document.createElement("input");
      input.setAttribute("maxlength", "1");
      input.setAttribute("type", "text");
      input.setAttribute("id", `try-${i}-letter-${j}`);
      input.setAttribute("autoComplete", "off");
      tryDiv.appendChild(input);
    }
    inputscontainer.appendChild(tryDiv);
  }
  inputscontainer.children[0].children[1].focus();
  let disabledInputs = document.querySelectorAll(".disabled input");
  disabledInputs.forEach((input) => {
    input.disabled = true;
  });
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextinput = inputs[index + 1];
      if (nextinput) {
        nextinput.focus();
      }
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}
const checkbutton = document.querySelector(".check");

checkbutton.addEventListener("click", check);
function check() {
  let successGuess = true;
  for (let i = 1; i <= numOfLetters; i++) {
    const inputField = document.getElementById(`try-${currentTry}-letter-${i}`);
    let letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    if (letter === actualLetter) {
      inputField.classList.add("in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("wrong");
      successGuess = false;
    }
  }
  if (successGuess == true) {
    message.innerHTML = `congratulations you guessed the word <span>${wordToGuess}</span> <button class= "Next word">Next word</button>`;
    const PlayAgainButton = document.querySelector(".message button");
    function playAgain() {
      location.reload();
    }
    PlayAgainButton.addEventListener("click", playAgain);
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => {
      tryDiv.classList.add("disabled");
      checkbutton.disabled = true;
      checkbutton.classList.add("disabled");
    });
    hintButton.disabled = true;
  } else {
    document.querySelector(`.try-${currentTry}`).classList.add("disabled");
    document.querySelectorAll(`.try-${currentTry} input`).forEach((input) => {
      input.disabled = true;
    });
    currentTry++;
    document.querySelectorAll(`.try-${currentTry} input`).forEach((input) => {
      input.disabled = false;
    });
    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled");
      el.children[1].focus();
    } else {
      checkbutton.classList.add("disabled");
      checkbutton.disabled = true;
      hintButton.disabled = true;
      message.innerHTML = `Game Over! The word was <span>${wordToGuess}</span> <button class= "play-again">Play Again</button>`;
      const PlayAgainButton = document.querySelector(".message button");
      function playAgain() {
        location.reload();
      }
      PlayAgainButton.addEventListener("click", playAgain);
    }
  }
}
function hint() {
  if (numOfHints > 0) {
    numOfHints--;
    document.querySelector(".hint span").innerHTML = numOfHints;
  }
  if (numOfHints == 0) {
    hintButton.disabled = true;
  }
  const EnabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEbableInputs = Array.from(EnabledInputs).filter(
    (input) => input.value === ""
  );
  if (emptyEbableInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEbableInputs.length);
    let randomInput = emptyEbableInputs[randomIndex];
    const indexToFill = Array.from(EnabledInputs).indexOf(randomInput);
    if (indexToFill != -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}
function handleBackSpace(event) {
  const inputs = document.querySelectorAll("input:not([disabled])");
  if (event.key === "Backspace") {
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown", handleBackSpace);
window.onload = function () {
  generateInputs();
};
