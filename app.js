let input = "";
let formInput = document.forms[0].elements.operation;
let displayResult = document.querySelector("form span");

// Touch buttons

const digits = document.querySelectorAll(
  ".digit, .parenthesis, .plus, .minus, .decimal"
);

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    digit.blur();
    handleError();
    formInput.value += digit.innerText;
    input += digit.innerText;
  });
});

function addInput(uiValue, mathOperator) {
  formInput.value += uiValue;
  input += mathOperator;
}

const multiply = document.querySelector(".multiply");
multiply.addEventListener("click", () => {
  multiply.blur();
  handleError();
  addInput("×", "*");
});

const division = document.querySelector(".division");
division.addEventListener("click", () => {
  division.blur();
  handleError();
  addInput("÷", "/");
});

const exponent = document.querySelector(".exponent");
exponent.addEventListener("click", () => {
  exponent.blur();
  handleError();
  addInput("^", "^");
});

const percent = document.querySelector(".percent");
percent.addEventListener("click", () => {
  percent.blur();
  handleError();
  addInput("%", "%");
});

document.querySelector(".equals").addEventListener("click", () => {
  handleError();
  calculateResult();
});

// Remove entry

function removeEntry() {
  handleError();
  formInput.value = formInput.value.slice(0, -1);
  input = input.slice(0, -1);
}
document.querySelector(".clearEntry").addEventListener("click", removeEntry);

// Clear input

function ClearInput() {
  handleError();
  formInput.value = "";
  input = "";
  displayResult.innerText = "";
}
document.querySelector(".clear").addEventListener("click", ClearInput);

// Keyboard functionality

document.addEventListener("keydown", (e) => {
  for (let i = 0; i < 10; i++) {
    if (e.key == i) {
      handleError();
      addInput(e.key, e.key);
    }
  }
  if (e.key === "Backspace") {
    handleError();
    removeEntry();
  } else if (e.key === "Delete") {
    handleError();
    ClearInput();
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case ".":
      handleError();
      addInput(".", ".");
      break;
    case "+":
      handleError();
      addInput("+", "+");
      break;
    case "-":
      handleError();
      addInput("-", "-");
      break;
    case "*":
      handleError();
      addInput("×", "*");
      break;
    case "/":
      handleError();
      addInput("÷", "/");
      break;
    case "(":
      handleError();
      addInput("(", "(");
      break;
    case ")":
      handleError();
      addInput(")", ")");
      break;
    case "^":
      handleError();
      addInput("^", "**");
      break;
    case "%":
      handleError();
      addInput("%", "%");
      break;
    case "Enter":
      handleError();
      calculateResult();
      break;
  }
});

// Calculate functionality

function checkEmptyParentheses() {
  if (input.includes("()")) {
    input = input.replace("()", "");
    formInput.value = formInput.value.replace("()", "");
  }
}

function calculateResult() {
  if (input.includes("(") && !input.includes(")")) {
    input += ")";
    formInput.value += ")";
    checkEmptyParentheses();
  } else if (!input.includes("(") && input.includes(")")) {
    input = input.replace(")", "");
    formInput.value = formInput.value.replace(")", "");
  }

  try {
    if (typeof math.evaluate(input) === "number") {
      displayResult.innerText = formInput.value;
      input = math.evaluate(input).toString();
      formInput.value = input;
    }
  } catch {
    input = "";
    formInput.style.color = "red";
    formInput.value = "Format Error";
  }
}

function handleError() {
  if (formInput.value === "Format Error") {
    formInput.style.color = "white";
    formInput.value = input;
  }
}

// Touchscreen button effect
const mobileEffect = document.querySelectorAll(
  ".digit, .decimal, .operator, .parenthesis"
);

if (matchMedia("(pointer:coarse)").matches) {
  mobileEffect.forEach((button) => {
    let currentColor = button.style.backgroundColor;
    button.style.transition = "all 0.1s";
    button.addEventListener("touchstart", () => {
      button.style.backgroundColor = "#3b3b3b";
    });
    button.addEventListener("touchend", () => {
      button.style.backgroundColor = currentColor;
    });
  });
}
