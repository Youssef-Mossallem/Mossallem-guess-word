let words = [];
let wrongSound = new Audio("sounds/cartoon-trombone-sound-effect-241387.mp3");
let correctSound = new Audio("sounds/the-correct-answer-33-183620.mp3");
let Until100S = new Audio("sounds/clock-ticking-sound-effect-240503.mp3");
let timerSpan = document.querySelector(".timer");
let timeLeft = 36;
let timer; // <-- متغير التايمر العالمي

const fileURL =
  "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";

fetch(fileURL)
  .then((response) => response.text())
  .then((text) => {
    const allWords = text.split("\n");

    words = allWords.filter((word) => {
      if (word.length > 4 && word.length <= 6) {
        const uniqueChars = new Set(word);
        return uniqueChars.size === word.length;
      }
      return false;
    });

    if (words.length === 0) {
      console.error("No valid words found after filtering.");
      return;
    }

    let gameName = "Guess the word";
    let h2 = document.querySelector("h2");
    document.title = gameName;
    document.querySelector("h1").innerHTML = `${gameName}
          <ul class="links">
        <li><a href="About.html" target="_blank">About</a></li>
        <li><a href="Contact.html" target="_blank">Contact</a></li>
        <li><a href="privacy.html" target="_blank">Terms&Privacy</a></li>
      </ul>`;
    document.querySelector(
      "footer"
    ).innerText = `${gameName} Made by Youssef Mossallem`;

    let message = document.querySelector(".message");
    let numOfTries = 5;
    let currentTry = 1;

    let level = localStorage.getItem("level");
    if (level === null) {
      level = 0;
      localStorage.setItem("level", level);
    } else {
      level = parseInt(level);
    }

    let usedWords = JSON.parse(localStorage.getItem("usedWords")) || [];

    function getNextWord() {
      if (usedWords.length === words.length) {
        usedWords = [];
      }

      let randomIndex;
      let wordToGuess;
      do {
        randomIndex = Math.floor(Math.random() * words.length);
        wordToGuess = words[randomIndex].toLowerCase();
      } while (usedWords.includes(wordToGuess));

      usedWords.push(wordToGuess);
      localStorage.setItem("usedWords", JSON.stringify(usedWords));
      return wordToGuess;
    }

    let wordToGuess = getNextWord();
    let numOfLetters = wordToGuess.length - 1;
    let numOfHints = 2;
    document.querySelector(
      ".hint"
    ).innerHTML = `<span>${numOfHints}</span> Hints`;

    let hintButton = document.querySelector(".hint");
    hintButton.addEventListener("click", hint);

    function generateInputs() {
      let inputscontainer = document.querySelector(".inputs");
      inputscontainer.innerHTML = "";
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
      console.log(wordToGuess);
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

    generateInputs();
    console.log(words.length);
    const checkbutton = document.querySelector(".check");
    checkbutton.addEventListener("click", check);

    function check() {
      let successGuess = true;
      for (let i = 1; i <= numOfLetters; i++) {
        const inputField = document.getElementById(
          `try-${currentTry}-letter-${i}`
        );
        let letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];

        if (letter === actualLetter) {
          inputField.classList.add("in-place");
        } else if (wordToGuess.includes(letter) && letter !== "") {
          inputField.classList.add("not-in-place");
          successGuess = false;
        } else {
          document.querySelector(`.try-${currentTry}`).classList.add("shake");
          setTimeout(() => {
            document
              .querySelector(`.try-${currentTry}`)
              .classList.remove("shake");
          }, 300);

          inputField.classList.add("wrong");
          successGuess = false;
        }
      }

      if (successGuess) {
        document.body.style.backgroundColor = "green"; // أخضر فاتح
        clearInterval(timer); // نوقف التايمر
        message.innerHTML = `Congratulations! You guessed the word <span>${wordToGuess}</span> <button class="Next word">Next word</button> 
        <button class="buy"><a href="https://www.amazon.com/Anker-PowerCore-Magnetic-Slim-B2C/dp/B099284SRR?crid=2M1X0LE8OJTH5&dib=eyJ2IjoiMSJ9.lxNSf2Yxv5Ot-SBsqBJDwzLkLXutdQwK1YxrOndyOpUAHLBrjdVYib178cOMkQ2ZResGDM1lSYlA58ViPP_xT8R9Qc2JNSDl8l-pcfxpZhQBtG9z2mgtHsdnoS_NVluS0K2c_RAvP45S9FlMXcpUMBUqlrhZJqQyqmwuzLNe4DExTKAFJcI5wYCMXh8ldN6EmLsMvWdn7uYI1K7_XS-rEc1EkGlaEGOHpErrZNGcteo.HGBDJA2PNNAkc3izCPiGqux659x8q-Eo4NDldR6IRrs&dib_tag=se&keywords=power%2Bbank&qid=1745063154&sprefix=powe%2Caps%2C359&sr=8-8&th=1&linkCode=ll1&tag=mossallem20-20&linkId=4af0ca1e17f3033bec257d95d66b3319&language=en_US&ref_=as_li_ss_tl" target="_blank">Buy Powerbank</a></button>`;
        const PlayAgainButton = document.querySelector(".message .Next.word");
        console.log(PlayAgainButton);
        correctSound.play();

        PlayAgainButton.addEventListener("click", playAgain);

        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => {
          tryDiv.classList.add("disabled");
        });

        checkbutton.disabled = true;
        checkbutton.classList.add("disabled");
        hintButton.disabled = true;
      } else {
        document.querySelector(`.try-${currentTry}`).classList.add("disabled");

        document
          .querySelectorAll(`.try-${currentTry} input`)
          .forEach((input) => {
            input.disabled = true;
          });
        currentTry++;
        let el = document.querySelector(`.try-${currentTry}`);
        if (el) {
          el.classList.remove("disabled");
          el.querySelector("input").focus();
          document
            .querySelectorAll(`.try-${currentTry} input`)
            .forEach((input) => {
              input.disabled = false;
            });
        } else {
          document.body.style.backgroundColor = "red"; // أحمر فاتح

          clearInterval(timer); // نوقف التايمر
          checkbutton.classList.add("disabled");
          checkbutton.disabled = true;
          hintButton.disabled = true;
          message.innerHTML = `Game Over! The word was <span>${wordToGuess}</span> <button class="play-again">Play Again</button><button class="buy"><a href="https://www.amazon.com/Anker-PowerCore-Magnetic-Slim-B2C/dp/B099284SRR?crid=2M1X0LE8OJTH5&dib=eyJ2IjoiMSJ9.lxNSf2Yxv5Ot-SBsqBJDwzLkLXutdQwK1YxrOndyOpUAHLBrjdVYib178cOMkQ2ZResGDM1lSYlA58ViPP_xT8R9Qc2JNSDl8l-pcfxpZhQBtG9z2mgtHsdnoS_NVluS0K2c_RAvP45S9FlMXcpUMBUqlrhZJqQyqmwuzLNe4DExTKAFJcI5wYCMXh8ldN6EmLsMvWdn7uYI1K7_XS-rEc1EkGlaEGOHpErrZNGcteo.HGBDJA2PNNAkc3izCPiGqux659x8q-Eo4NDldR6IRrs&dib_tag=se&keywords=power%2Bbank&qid=1745063154&sprefix=powe%2Caps%2C359&sr=8-8&th=1&linkCode=ll1&tag=mossallem20-20&linkId=4af0ca1e17f3033bec257d95d66b3319&language=en_US&ref_=as_li_ss_tl" target="_blank"  >Buy Powerbank</a></button>`;
          const PlayAgainButton = document.querySelector(
            ".message .play-again"
          );
          wrongSound.play();
          PlayAgainButton.addEventListener("click", playAgain2);
        }
      }
    }

    function startTimer() {
      clearInterval(timer); // نوقف التايمر القديم
      timeLeft = 36;
      timerSpan.innerText = `⏱️ ${timeLeft}s`;

      timer = setInterval(() => {
        timeLeft--;
        timerSpan.innerText = `⏱️ ${timeLeft}s`;
        if (timeLeft === 0) {
          Until100S.pause();
          clearInterval(timer);
          let el = document.querySelector(`.try-${currentTry}`);
          el.classList.add("disabled");
          el.querySelector("input").focus();
          document
            .querySelectorAll(`.try-${currentTry} input`)
            .forEach((input) => {
              input.disabled = true;
            });
          checkbutton.classList.add("disabled");
          checkbutton.disabled = true;
          hintButton.disabled = true;
          message.innerHTML = `Game Over! The word was <span>${wordToGuess}</span> <button class="play-again">Play Again</button>`;
          const PlayAgainButton = document.querySelector(
            ".message .play-again"
          );
          PlayAgainButton.addEventListener("click", playAgain2);
        }
        if (timeLeft <= 10) {
          timerSpan.style.color = "red";
          Until100S.play();
        }
      }, 1000);
    }

    startTimer();
    function playAgain() {
      document.body.style.backgroundColor = "";
      timerSpan.style.color = "black";
      clearInterval(timer);
      startTimer();
      timeLeft = 36;
      level++;
      localStorage.setItem("level", level);

      message.innerHTML = "";
      document.querySelector(".inputs").innerHTML = "";
      currentTry = 1;
      wordToGuess = getNextWord();
      numOfLetters = wordToGuess.length - 1;
      numOfHints = 2;
      h2.innerHTML = `Level ${level + 1}`;
      document.querySelector(
        ".hint"
      ).innerHTML = `<span>${numOfHints}</span> Hints`;
      hintButton.disabled = false;
      checkbutton.disabled = false;
      checkbutton.classList.remove("disabled");

      generateInputs();
    }

    function playAgain2() {
      document.body.style.backgroundColor = "";
      timerSpan.style.color = "black";

      clearInterval(timer);
      startTimer();
      message.innerHTML = "";
      timeLeft = 36;
      document.querySelector(".inputs").innerHTML = "";
      currentTry = 1;
      wordToGuess = getNextWord();
      numOfLetters = wordToGuess.length - 1;
      numOfHints = 2;
      h2.innerHTML = `Level ${level + 1}`;
      document.querySelector(
        ".hint"
      ).innerHTML = `<span>${numOfHints}</span> Hints`;
      hintButton.disabled = false;
      checkbutton.disabled = false;
      checkbutton.classList.remove("disabled");

      generateInputs();
    }

    function hint() {
      if (numOfHints > 0) {
        numOfHints--;
        document.querySelector(".hint span").innerHTML = numOfHints;
      }
      if (numOfHints === 0) {
        hintButton.disabled = true;
      }
      const EnabledInputs = document.querySelectorAll("input:not([disabled])");
      const emptyEnabledInputs = Array.from(EnabledInputs).filter(
        (input) => input.value === ""
      );
      if (emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * emptyEnabledInputs.length
        );
        let randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(EnabledInputs).indexOf(randomInput);
        if (indexToFill !== -1) {
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

    h2.innerHTML = `Level ${level + 1}`;
    document.addEventListener("keydown", handleBackSpace);
  });
