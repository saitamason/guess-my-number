'use strict';

// Elements
const body = document.querySelector('body');
const again = document.querySelector('.again');
const number = document.querySelector('.number');
const message = document.querySelector('.message');
const guess = document.querySelector('.guess');
const check = document.querySelector('.check');
const numberForm = document.querySelector('#number-form');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');

// Functions
const lowerScore = () => (currentScore = score.textContent = currentScore - 1);
const randomNumber = () => Math.trunc(Math.random() * 20) + 1;

// Variables and objects
const defaultBody = {
  backgroundColor: body.style.backgroundColor,
};

const defaultNumber = {
  textContent: number.textContent,
};

const defaultGuess = {
  value: guess.value,
};

const defaultMessage = {
  textContent: message.textContent,
};

const defaultScore = 20;
let secretNumber = randomNumber();
let currentScore = defaultScore;
let guessState = false;
let highestScore = 0;

// Again / Reset
again.addEventListener('click', function () {
  guessState = false;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  currentScore = defaultScore;
  score.textContent = currentScore;

  body.style.backgroundColor = defaultBody.backgroundColor;
  number.textContent = defaultNumber.textContent;
  message.textContent = defaultMessage.textContent;
  guess.value = defaultGuess.value;
});

// Check
check.addEventListener('click', e => {
  e.preventDefault();
  const guessNumber = Number(guess.value);

  if (guessState) {
    message.textContent = 'Hit "Again" to reset';
    return;
  }

  if (guessNumber < 1 || guessNumber > 20 || !guessNumber) {
    message.textContent = 'The number must be between 1 and 20!';
    return;
  }

  if (currentScore <= 1) {
    message.textContent = 'You lost!';
    number.textContent = secretNumber;
    body.style.backgroundColor = 'red';
    lowerScore();
    guessState = true;
    return;
  }

  if (guessNumber === secretNumber && !guessState) {
    message.textContent = 'Correct number!';
    number.textContent = secretNumber;
    body.style.backgroundColor = '#60b347';
    guessState = true;
    if (currentScore > highestScore)
      highestScore = highscore.textContent = currentScore;
    return;
  }

  if (guessNumber > secretNumber && !guessState) {
    message.textContent = 'Too high!';
    lowerScore();
    return;
  }

  if (guessNumber < secretNumber && !guessState) {
    message.textContent = 'Too low!';
    lowerScore();
    return;
  }
});
