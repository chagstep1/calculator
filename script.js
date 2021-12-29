const PLUS = "+";
const MINUS = "-";
const MULTI = "*";
const DIVIDE = "/";
const CLEAR = "clear";
const EQUAL = "=";

const ERROR = "ERROR";
const DIVIDEBYZERO = "DIV BY ZERO";
const OVERFLOW = "OVERFLOW";

const MAX_INT_NUMBERS = 10;
const MAX_POINT_NUMBERS = 2;

const displayDiv = document.querySelector("#display");

let s_current_number = "";
let s_last_number = "";
let last_operator = null;

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

function operate(numLast, numNew, operator) {
	let num;
	switch (operator) {
		case PLUS:
			num = add(numLast, numNew);
			break;
		case MINUS:
			num = substract(numLast, numNew);
			break;
		case MULTI:
			num = multiply(numLast, numNew);
			break;
		case DIVIDE:
			num = divide(numLast, numNew);
			break;
		case NONE:
			return numLast;
		default:
			alert("ERROR operate!");
			break;
	}
	num = (Math.round(num*(10 ** MAX_POINT_NUMBERS))/(10 ** MAX_POINT_NUMBERS);
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
	s_current_number = "";
	s_last_number = "";
	last_operator = null;
	updateDisplay(num);
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
			if (last_operator === EQUAL)
			{
				s_current_number = "";
				last_operator = null;
			}
			if (s_current_number.length >= MAX_INT_NUMBERS)
				break;
			s_current_number += button;
			updateDisplay(s_current_number);
			break;
			
		case CLEAR:
			clearVarsAndDisplay("");
			break;
			
		case PLUS:
		case MINUS:
		case MULTI:
		case DIVIDE:
			if (s_current_number !== "")
			{
				if (s_last_number !== "" && last_operator !== null)
				{
					if (Number(s_current_number) === 0 && last_operator === DIVIDE) {
						clearVarsAndDisplay(DIVIDEBYZERO);
						break;
					}
						
					s_last_number = operate(Number(s_last_number), Number(s_current_number), last_operator);
					
					/*let dotIndex = s_last_number.indexOf(".");
					if (dotIndex !== -1 && s_last_number > s_last_number.substring(0, dotIndex))
					{
						clearVarsAndDisplay(OVERFLOW);
						break;
					}*/
					
					updateDisplay(s_last_number);
				}
				else {
					s_last_number = s_current_number;
				}
				s_current_number = "";
			}
			last_operator = button;
			break;
			
		case EQUAL:
			if (last_operator !== null && s_last_number !== "" && s_current_number !== "") {
				if (Number(s_current_number) === 0 && last_operator === DIVIDE) {
					clearVarsAndDisplay(DIVIDEBYZERO);
					break;
				}
				
				s_current_number = operate(Number(s_last_number), Number(s_current_number), last_operator);
				updateDisplay(s_current_number);
				s_last_number = "";
				last_operator = EQUAL;
			}
			break;
		default:
			alert("ERROR pressedButton!");
			break;
	}
}

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

