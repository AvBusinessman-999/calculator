// 1. Core Math Functions
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
if (b === 0) return "Nice Try! can't didvide by zero";
return a / b; }

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "null";
    }
}

// 2.State Variables
let firstNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector("#equals-btn");
const clearBtn = document.querySelector("#clear-btn");
const decimalBtn = document.querySelector("#decimal-btn");
const backspaceBtn = document.querySelector("#backspace-btn");

function roundResult(number) {
    if (typeof number === "string") return number; // return error messages as-is
    return Math.round(number * 100000) / 100000;
}

function appendNumber(number) {
    if (display.textContent === "0" || shouldResetDisplay || display.textContent.includes("Nice try")) {
        display.textContent = number;
        shouldResetDisplay = false;
    } else {
        if (display.textContent.length < 14) {
            display.textContent += number;
        }
    }
}

function appendDecimal() {
    if (shouldResetDisplay || display.textContent.includes("Nice try")) {
        display.textContent = "0.";
        shouldResetDisplay = false;
        return;
    }
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}
 function setOperator(operator) {
    if (display.textContent.includes("Nice try")) clearcalculator();
    // Evaluate existing pair first if user chains operators (e.g., 12 + 7 -)
    if (currentOperator !== null && !shouldResetDisplay) {
        evaluate(); }
        firstNumber = display.textContent;
        currentOperator = operator;
        shouldResetDisplay = true;
 }

 function evaluate() {
    // Prevent running if missing operator or if user clicked 2 operators in a row.
    if (currentOperator === null || shouldResetDisplay) return;
    
    const secondNumber = display.textContent;
    const rawResult = operate(currentOperator, firstNumber, secondNumber);
    display.textContent = roundResult(rawResult);
    currentOperator = null;
    shouldResetDisplay = true;
 }

 function clearCalculator() {
    display.textContent = "0";
    firstNumber = "";
    currentOperator = null;
    shouldResetDisplay = false;
    }

function deleteLastDigit() {
    if (display.textContent === "0" || shouldResetDisplay || display.textContent.includes("Nice try")) return;
    display.textContent = display.textContent.slice(0, -1) || "0";
}

// 3. Event Listeners
digitButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
);
operatorButtons.forEach(btn =>
    btn.addEventListener("click", () => setOperator(btn.dataset.op))
);
equalsBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clearCalculator);
decimalBtn.addEventListener("click", appendDecimal);
backspaceBtn.addEventListener("click", deleteLastDigit);

// Extra Credit: Keyboard Support
window.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
    if (e.key === ".") appendDecimal();
    if (e.key === "=" || e.key === "Enter") {e.preventDefault(); evaluate();}
    if (e.key === "Backspace") deleteLastDigit();
    if (e.key === "Escape") clearCalculator();
    if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
});