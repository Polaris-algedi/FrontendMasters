// declare the variables
let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = 0;

// get the screen element
const screen = document.querySelector(".screen");

// get the buttons
const numbers = document.querySelectorAll(".number");
/* console.log(numbers);*/

// add event listener to each number button
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    /*  console.log(e.target.innerText);*/
    if (screen.innerText === "0") {
      screen.innerText = e.target.innerText;
    } else {
      screen.innerText += e.target.innerText;
    }
  });
});

// get the operator buttons
const operators = document.querySelectorAll(".operator");
/* console.log(operators); */

// add event listener to each operator button
operators.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (e) => {
    /*      console.log(e.target.innerText);*/
    switch (e.target.innerText) {
      case "C":
        screen.innerText = "0";
        firstNumber = "";
        secondNumber = "";
        operator = "";
        break;
      case "←":
        if (screen.innerText !== "0") {
          screen.innerText = screen.innerText.slice(0, -1);
          if (screen.innerText === "") {
            screen.innerText = "0";
          }
        }
        break;
      case "+":
        firstNumber = screen.innerText;
        operator = "+";
        screen.innerText = "0";
        break;
      case "−":
        firstNumber = screen.innerText;
        operator = "−";
        screen.innerText = "0";
        break;
      case "×":
        firstNumber = screen.innerText;
        operator = "×";
        screen.innerText = "0";
        break;
      case "÷":
        firstNumber = screen.innerText;
        operator = "÷";
        screen.innerText = "0";
        break;
      case "=":
        secondNumber = screen.innerText;
        calculate(firstNumber, operator, secondNumber);
    }
  });
});

// addition function
function add(a, b) {
  return a + b;
}
// subtraction function
function subtract(a, b) {
  return a - b;
}
// multiplication function
function multiply(a, b) {
  return a * b;
}
// division function
function divide(a, b) {
  return a / b;
}

function calculate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "+":
      result = add(parseInt(firstNumber), parseInt(secondNumber));
      break;
    case "−":
      result = subtract(parseInt(firstNumber), parseInt(secondNumber));
      break;
    case "×":
      result = multiply(parseInt(firstNumber), parseInt(secondNumber));
      break;
    case "÷":
      result = divide(parseInt(firstNumber), parseInt(secondNumber));
      break;
  }
  screen.innerText = result;
}
