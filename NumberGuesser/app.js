const numberPicked = document.querySelector('#guess-input');
const submitBtn = document.querySelector('#guess-btn');
let low = document.querySelector('.min-num');
let high = document.querySelector('.max-num');
let randomlyPickedNumber;
let numberOfGuesses = 4;

initializePage();

function initializePage() {
  low.textContent = 3;
  high.textContent = 13;
  randomlyPickedNumber = Math.floor(Math.random() * (high.textContent - low.textContent + 1) + low.textContent);
  addEventListeners();
}

function addEventListeners() {
  submitBtn.addEventListener('click', processTheGuess);
}

function printPrompt(prompt) {
  const promptBlock = document.createElement('div');
  promptBlock.className = 'failure';
  const internalDiv = document.createElement('div');
  internalDiv.className = 'internal-boundary'
  
  const text = document.createTextNode(prompt);

  internalDiv.appendChild(text);
  promptBlock.appendChild(internalDiv);
  const message = document.querySelector('.message');
  message.appendChild(promptBlock);
}

function processTheGuess(event) {
  const num = parseInt(numberPicked.value, 10);
  console.log(num, low.textContent, high.textContent);
  console.log(randomlyPickedNumber);
  console.log(num === randomlyPickedNumber);
  if(num === null) {
    printPrompt('Select value first!');
  } else if(num < parseInt(low.textContent, 10) || num > parseInt(high.textContent, 10)) {
    printPrompt('Your guess value is not in correct boundaries!');
  } else if(num === randomlyPickedNumber) {
    printPrompt('You guessed correctly!', 'success');
    printResults();
  } else if (num > randomlyPickedNumber) {
    numberOfGuesses--;
    if(numberOfGuesses === 0) {
      printGameOver('failure');
    } else {
      printPrompt('To high!');
    }
  } else {
    numberOfGuesses--;
    if(numberOfGuesses === 0) {
      printGameOver('failure');
    } else {
      printPrompt('To low!');
    }
  }
  
  event.preventDefault();
}
