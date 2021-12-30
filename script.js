const PLUS = "+";
const MINUS = "-";
const MULTI = "*";
const DIVIDE = "/";
const CLEAR = "clear";
const EQUAL = "=";
const DOT = ".";
const BACKSPACE = "<--"

const ERROR = "ERROR";
const DIVIDEBYZERO = "DIV BY ZERO";
const OVERFLOW = "OVERFLOW";

const MAX_INT_NUMBERS = 10;
const MAX_DEC_NUMBERS = 2;

const displayDiv = document.querySelector("#display");

let left_operant = null;
let operator = null;
let s_input = "";

function add(num1, num2) {
	return num1 + num2;
}

function substract(numFrom, numBy) {
	return numFrom - numBy;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(numFrom, numBy) {
	return numFrom / numBy;
}

// Always compare return value to DIVIDEBYZERO and OVERFLOW first! aka not Number;
// Returns opLeft on any non-standard case.
function operate(opLeft, opRight, operator) {
	let num;
	switch (operator) {
		case PLUS:
			num = add(opLeft, opRight);
			break;
		case MINUS:
			num = substract(opLeft, opRight);
			break;
		case MULTI:
			num = multiply(opLeft, opRight);
			break;
		case DIVIDE:
			if (opRight === 0) return DIVIDEBYZERO;
			num = divide(opLeft, opRight);
			break;
		default:
			return opLeft;
	}
	if (num  >= 10 ** MAX_INT_NUMBERS) return OVERFLOW;
	num = (Math.round(num*(10 ** MAX_DEC_NUMBERS))/(10 ** MAX_DEC_NUMBERS));
	return num;
}

function updateDisplay(num) {
	if (num === null) {
		displayDiv.textContent = "";
	}
	else {
		displayDiv.textContent = num;
	}
}

function clearVarsAndDisplay(num) {
	left_operant = null;
	operator = null;
	s_input = "";
	updateDisplay(num);
}

function canInputMoreDigit() {
	const dotIndex = s_input.indexOf('.');
	return (dotIndex === -1) ? (s_input.length < MAX_INT_NUMBERS) : (s_input.length - dotIndex <= MAX_DEC_NUMBERS);
}

function onDigitPress(digit) {
	if (operator === EQUAL)
		clearVarsAndDisplay("");
	
	if (canInputMoreDigit()) {
		s_input += digit;
		updateDisplay(s_input);
	}
}

function onDotPress() {
	if (operator === EQUAL)
		clearVarsAndDisplay("");
	
	if (s_input === "")
	{
		s_input = "0.";
		updateDisplay(s_input);
	}
	else if (s_input.indexOf('.') === -1)
	{
		s_input += '.';
		updateDisplay(s_input);
	}
}

function onBackspacePress() {
	if (operator === EQUAL)
		clearVarsAndDisplay("");
	
	s_input = s_input.slice(0, -1);
	updateDisplay(s_input);
}

function onEqualPress() {
	if (left_operant !== null && operator !== null && s_input !== "") {		
		left_operant = operate(Number(left_operant), Number(s_input), operator);
		if (typeof left_operant !== "number") 
		{
			clearVarsAndDisplay(left_operant);
			return;
		}
		
		updateDisplay(left_operant);
		operator = EQUAL;
		s_input = "";
	}
}

//does not account for EQUAL!
function onOperatorPress(opButton) {
	if (s_input !== "")
	{
		if (left_operant === null) {
			left_operant = Number(s_input);
		}
		else {
			left_operant = operate(Number(left_operant), Number(s_input), operator);
			if (typeof left_operant !== "number") 
			{
				clearVarsAndDisplay(left_operant);
				return;
			}
			updateDisplay(left_operant);
		}
	}
	
	s_input = "";
	operator = opButton;
}

function pressedButton(button) {
	switch (button) {
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			onDigitPress(button);
			break;
		
		case DOT:
			onDotPress();
			break;
			
		case CLEAR:
			clearVarsAndDisplay("");
			break;
			
		case PLUS:
		case MINUS:
		case MULTI:
		case DIVIDE:
			onOperatorPress(button);
			break;
			
		case EQUAL:
			onEqualPress();
			break;
		
		case DOT:
			onDotPress();
			break;
		
		case BACKSPACE:
			onBackspacePress();
			break;
			
		default:
			alert("ERROR pressedButton!");
			break;
	}
}

document.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
	case "0":
	case "1":
	case "2":
	case "3":
	case "4":
	case "5":
	case "6":
	case "7":
	case "8":
	case "9":
		onDigitPress(Number(event.key));
		break;
	case "Add":
	case "+":
		onOperatorPress(PLUS);
		break;
	case "Subtract":
	case "-":
		onOperatorPress(MINUS);
		break;
	case "Multiply":
	case "*":
		onOperatorPress(MULTI);
		break;
	case "Divide":
	case "/":
		onOperatorPress(DIVIDE);
		break;
    case "Esc":
    case "Escape":
    case "Clear":
    case "Delete":
		clearVarsAndDisplay("");
		break;
	case ".":
	case "Decimal":
		onDotPress();
		break;
    case "Enter":
	case "=":
		onEqualPress();
		break;
    case "Backspace":
		onBackspacePress();
		break;
	default:
		return;
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

document.querySelector("#button-0").addEventListener('click', () => pressedButton("0"));
document.querySelector("#button-1").addEventListener('click', () => pressedButton("1"));
document.querySelector("#button-2").addEventListener('click', () => pressedButton("2"));
document.querySelector("#button-3").addEventListener('click', () => pressedButton("3"));
document.querySelector("#button-4").addEventListener('click', () => pressedButton("4"));
document.querySelector("#button-5").addEventListener('click', () => pressedButton("5"));
document.querySelector("#button-6").addEventListener('click', () => pressedButton("6"));
document.querySelector("#button-7").addEventListener('click', () => pressedButton("7"));
document.querySelector("#button-8").addEventListener('click', () => pressedButton("8"));
document.querySelector("#button-9").addEventListener('click', () => pressedButton("9"));
document.querySelector("#button-clear").addEventListener('click', () => pressedButton(CLEAR));
document.querySelector("#button-equal").addEventListener('click', () => pressedButton(EQUAL));
document.querySelector("#button-plus").addEventListener('click', () => pressedButton(PLUS));
document.querySelector("#button-minus").addEventListener('click', () => pressedButton(MINUS));
document.querySelector("#button-multi").addEventListener('click', () => pressedButton(MULTI));
document.querySelector("#button-divide").addEventListener('click', () => pressedButton(DIVIDE));
document.querySelector("#button-dot").addEventListener('click', () => pressedButton(DOT));
document.querySelector("#button-backspace").addEventListener('click', () => pressedButton(BACKSPACE));

