const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// All generator functions in one obj
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
  const password = resultEl.innerText;
  if (!password) return;
  navigator.clipboard.writeText(password);
  alert('Password copied to clipboard!');
});

// Generate password on button click
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value; // Password length
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  // Set the generated password to the result
  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Function to generate password
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol; // Total active options
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (type) => Object.values(type)[0] // Include only checked options
  );

  if (typesCount === 0) return ''; // No options selected

  // Loop to create password
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  // Trim password to desired length
  return generatedPassword.slice(0, length);
}

// Generate random lowercase letter
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Generate random uppercase letter
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Generate random number
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Generate random symbol
function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
