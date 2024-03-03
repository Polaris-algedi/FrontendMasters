const NUMBER_OF_ROWS = 6;
const NUMBER_OF_CELLS = 5;
const keyOutputDiv = document.querySelectorAll(".row");
const WORD_API_URL = "https://words.dev-apis.com/word-of-the-day?random=1";
const WORD_CHECK_API_URL = "https://words.dev-apis.com/validate-word";
const CORRECT_ANSWER = getWord();
let won = false;

let rowIndex = 0;
let cellIndex = 0;
let word = "";

/*
 Welcome to Word Masters, a game inspired by the popular word guessing phenomenon.

Here's the deal:

You have six tries to guess a secret five-letter word.
Each guess receives visual feedback:
Green: Letter is in the correct position.
Yellow: Letter is in the word but in the wrong position.
Gray: Letter is not in the word.
Can you crack the code and guess the word before you run out of chances?
Ready to test your vocabulary? Dive in and let the wordplay begin!
 */

game();

const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownList = document.querySelector(".dropdown-list");

dropdownToggle.addEventListener("click", () => {
  dropdownList.classList.toggle("open");
  const arrow = dropdownToggle.querySelector(".arrow");
  arrow.classList.toggle("arrow-down");
  arrow.classList.toggle("arrow-up");
});

/* 
  The following function is used to check if a key is a letter.
  It returns true if it is a letter and false if it is not.
  It uses a regular expression to check if the key is a letter.
*/
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function updateCellContent(key, rowIndex, cellIndex) {
  keyOutputDiv[rowIndex].children[cellIndex].textContent = key.toUpperCase();
}

async function isCorrect(word) {
  return word === (await CORRECT_ANSWER);
}

// The FUNCTION BELOW IS NOT WORKING AS INTENDED!!!!!!
// The FUNCTION BELOW IS NOT WORKING AS INTENDED!!!!!!
// The FUNCTION BELOW IS NOT WORKING AS INTENDED!!!!!!
// The FUNCTION BELOW IS NOT WORKING AS INTENDED!!!!!!
// The FUNCTION BELOW IS NOT WORKING AS INTENDED!!!!!!
// The FUNCTION BELOW IS NOT WORKING AS INTENDED!!!!!!
/* 
  The following function is used to apply the redSignal class to the cells of a row.
  It takes a rowIndex and an apply parameter.
*/
function notWordStyle(rowIndex) {
  row = document.querySelectorAll(".row")[rowIndex];

  for (let i = 0; i < NUMBER_OF_CELLS; i++) {
    row.classList.remove("redSignal");
    void row.offsetWidth;
  }

  for (let i = 0; i < NUMBER_OF_CELLS; i++) {
    row.classList.add("redSignal");
  }
}

// The FUNCTION BELOW WAS LIKE THIS "function rowStyle(rowIndex, playerAnswer, correctAnswer)" !!!!!!
// IT DIDN'T WORK !!!!!!
// I DONT KNOW WHY !!!!!!
// I TRIED TO USE "const CORRECT_ANSWER = await getWord();" !!!!!!
// SAME PROBLEM !!!!!!
// I CHANGED IT TO "async function rowStyle(rowIndex, playerAnswer)" !!!!!!
// I USED "const correctAnswer = await CORRECT_ANSWER;" !!!!!!
// IT WORKED !!!!!!

async function rowStyle(rowIndex, playerAnswer) {
  row = document.querySelectorAll(".row")[rowIndex];
  const correctAnswer = await CORRECT_ANSWER;
  for (let i = 0; i < NUMBER_OF_CELLS; i++) {
    // If the character in the correct position
    if (playerAnswer[i] === correctAnswer[i]) {
      row.children[i].style.backgroundColor = "green";
      row.children[i].style.color = "white";
    } // If the character is in the wrong position
    else if (correctAnswer.includes(playerAnswer[i])) {
      row.children[i].style.backgroundColor = "goldenrod";
      row.children[i].style.color = "white";
    } // If the character is not in the correct answer
    else {
      row.children[i].style.backgroundColor = "#888";
      row.children[i].style.color = "white";
    }
  }
}

async function getWord() {
  const promise = await fetch(WORD_API_URL);
  const data = await promise.json();
  console.log(data.word);
  console.log(typeof data.word);
  return data.word;
}

async function isWord(url, word) {
  const promise = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: word }),
  });
  const data = await promise.json();
  console.log(data);
  console.log(data.validWord);
  return data.validWord;
}

async function play(event) {
  //keyOutputDiv.textContent += event.key;
  /*  console.log(event.key);
  console.log(keyOutputDiv[0].children[0]);
  console.log(cellIndex); */
  if (
    isLetter(event.key) &&
    cellIndex < NUMBER_OF_CELLS &&
    rowIndex < NUMBER_OF_ROWS
  ) {
    updateCellContent(event.key, rowIndex, cellIndex);
    cellIndex++;
    word += event.key;
  }

  if (event.key === "Backspace") {
    if (word.length > 0) {
      word = word.slice(0, -1);
      cellIndex--;
    }

    //console.log(word);
    keyOutputDiv[rowIndex].children[cellIndex].textContent = "";
  }

  if (event.key === "Enter" && cellIndex === NUMBER_OF_CELLS) {
    const wait = document.querySelector(".wait-emoji");
    wait.classList.toggle("invisible");
    if (await isCorrect(word)) {
      rowStyle(rowIndex, word);
      wait.classList.toggle("invisible");
      won = true;
    } else if (await isWord(WORD_CHECK_API_URL, word)) {
      rowStyle(rowIndex, word);
      wait.classList.toggle("invisible");
      rowIndex++;
      cellIndex = 0;
      word = "";
    } else {
      wait.classList.toggle("invisible");
      console.log("not a word");
      notWordStyle(rowIndex);
    }
  }
}

function game() {
  if (won) {
    gameEnd();
  } else {
    gameStart();
  }
}

function resetGame() {
  console.log("Game reset");
  rowIndex = 0;
  cellIndex = 0;
  word = "";
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    for (let j = 0; j < NUMBER_OF_CELLS; j++) {
      keyOutputDiv[i].children[j].textContent = "";
      keyOutputDiv[i].children[j].style.backgroundColor = "white";
      keyOutputDiv[i].children[j].style.color = "black";
    }
  }
}
function gameStart() {
  console.log("Game started");
  // The following event listener listens for a keydown event.
  document.addEventListener("keydown", play);
}

function gameEnd() {
  console.log("Game ended");
  document.removeEventListener("keydown", play);
}
