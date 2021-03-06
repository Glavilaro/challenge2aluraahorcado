// variables and constants for the game
let word = "";
let fontSize = 60;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let lives = 9;
let failsCounter = 0;
let gameStarted = false;
let failLetters = "";
let writedLetters = "";
const startButton = document.querySelector("#start_button");
let dummyInput;
const addButton = document.querySelector("#add_button");
const inputNewWord = document.querySelector("#input_new_word");
const showWordsListLink = document.querySelector("#show_words_list_link");
const wordsList = document.querySelector("#words_list");
const startedMessage = document.querySelector("#started_message");
const you_are_acerted_message = document.querySelector(
  "#you_are_acerted_message"
);
const you_are_wrong_message = document.querySelector("#you_are_wrong_message");
const you_repeated_letter_message = document.querySelector(
  "#you_repeated_letter_message"
);
let dummyInputCreated = false;


const words = bancoDePalabras.map((word) => word.toUpperCase());



const randomWord = () => {
  // get a random word from the list
  let random = Math.floor(Math.random() * words.length);
  return words[random];
};

const drawSpaces = (word) => {
  // draw "_" for each letter in the word in the canvas
  for (let i = 0; i < word.length; i++) {
    ctx.fillStyle = "#ff80ff";
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(
      "_",
      i * 70 + (canvasWidth - word.length * fontSize) / 2 + 50,
      canvasHeight - 300
    );
  }
};
const start = () => {
  // start the game
  startedMessage.style.display = "inherit";
  startGame();
  word = randomWord();
  drawSpaces(word);
  drawFloor();
  drawHeart();
  drawLives(lives);
    RevealWordButton();
  gameStarted = true;
  openKeyBoard();
  dummyInput = document.querySelector("#dummy_input");
  dummyInput.focus();
  startedMessage.classList.add("started_message_show");
  setTimeout(() => {
    startedMessage.classList.remove("started_message_show");
    startedMessage.innerHTML = "";
    startedMessage.remove();
  }, 1600);
    window.scrollTo(0, 120);
    
  dummyInput.addEventListener("input", () => {
    check(dummyInput.value);
  });

};

const restart = () => {
 
  window.location.reload();
};

const addNewWord = () => {
  
  let newWord = inputNewWord.value;
  words.push(newWord);
  inputNewWord.value = "";
  showWordsList();
};

const showWordsList = () => {
 
  wordsList.style.display = "block";
  wordsList.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = words[i];
    wordsList.appendChild(li);
  }
};

const inputToUppercase = (input) => {
  
  input.value = input.value.toUpperCase();
};

const createRestartButton = () => {
  
  const restartButton = document.createElement("button");
  restartButton.innerHTML = "Reiniciar";
  restartButton.classList.add("restart_button");
  restartButton.style.display = "inherit";
  restartButton.addEventListener("click", () => {
    restart();
  });
  canvas.parentNode.insertBefore(restartButton, canvas);
};

const addLetterInWritedLetters = (letter) => {
 
  let ammountOfLetterInWord = word
    .split("")
    .filter((el) => el === letter).length;
  let ammountOfletterInWritedLetters = writedLetters
    .split("")
    .filter((el) => el === letter).length;
    if(writedLetters.includes(letter) && ammountOfletterInWritedLetters === ammountOfLetterInWord) {
      you_repeated_letter_message.style.display = "inherit";
      you_repeated_letter_message.classList.add("you_repeated_letter_message_show");
      setTimeout(() => {
        you_repeated_letter_message.style.display = "none";
      }
      , 800);
    }
  if (ammountOfLetterInWord > ammountOfletterInWritedLetters) {
    writedLetters += letter;
  }
};

const checkLetter = (letter) => {
  // check if letter is in word
  let correct = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter && failLetters.includes(letter) === false) {
      correct = true;
    }
  }

  if (correct && writedLetters.includes(letter) === false) {
    you_are_acerted_message.style.display = "inherit";
    you_are_acerted_message.classList.add("you_are_acerted_message_show");
    setTimeout(() => {
      you_are_acerted_message.style.display = "none";
    }, 800);
  }
  else if (!correct && failLetters.includes(letter) === false &&gameStarted) {
    you_are_wrong_message.style.display = "inherit";
    you_are_wrong_message.classList.add("you_are_wrong_message_show");
    setTimeout(() => {
      you_are_wrong_message.style.display = "none";
    }, 800);
  }
  return correct;
};

const checkIfWon = () => {
  // check if the user won
  if (writedLetters.length === word.length) {
    return true;
  }
  return false;
};

const checkIfLost = () => {
  
  if (failsCounter === 9) {
    return true;
  }
};

function openKeyBoard() {
  
  if (!dummyInputCreated) {
    let dummyInput = document.createElement("input");
    dummyInput.setAttribute("type", "text");
    dummyInput.setAttribute("id", "dummy_input");
    dummyInput.classList.add("dummy_input");
    document.body.appendChild(dummyInput);
    dummyInput.focus();
    dummyInputCreated = true;
  }
}

function closeKeyBoard() {
  
  let dummyInput = document.querySelector("#dummy_input");
  dummyInput.value = "";
 
}

function focusOnDummyInput() {
  
  let dummyInput = document.querySelector("#dummy_input");
  dummyInput.focus();
}



canvas.addEventListener("click", (e) => {
  if (e.offsetX < 340 && e.offsetY < 100) {
    console.log(e.offsetX, e.offsetY);
    RevealWord(word)
  } 
  openKeyBoard();
  let dummyInput = document.querySelector("#dummy_input").focus();
  window.scrollTo(0, 120);
});




startButton.addEventListener("click", start);


inputNewWord.addEventListener("keyup", (e) => {
  inputToUppercase(e.target);
});


addButton.addEventListener("click", addNewWord);


showWordsListLink.addEventListener("click", showWordsList);



function check(letterInput) {

  let letter = letterInput.toUpperCase();
  

  if (checkLetter(letter)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hit = true;
        ctx.fillStyle = "#ff0000";
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(
          letter,
          i * 70 + (canvasWidth - word.length * fontSize) / 2 + 50,
          canvasHeight - 300
        );
        addLetterInWritedLetters(letter);
      }
    }
  }
  drawFail(checkLetter(letter), letter);

  if (checkIfWon()) {
    drawWinMessage();
    let dummyInput = document.querySelector("#dummy_input");
    dummyInput.blur();

  }
  if (checkIfLost()) {
    drawLostMessage();
    dummyInput.blur();

  }

  if (window.innerWidth < 600) {
    closeKeyBoard();
  }

  dummyInput.value = "";
};