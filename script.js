// TODO 1. Ustawić sprawdzanie dla wartości poza 1-20 zarówno w JS, jak i w HTML.
// TODO 2. Dodać efekty w CSS.

'use strict';

// Elements
const body = document.querySelector('body');
const again = document.querySelector('.again');
const number = document.querySelector('.number');
const message = document.querySelector('.message');
const guess = document.querySelector('.guess');
const check = document.querySelector('.check');
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
check.addEventListener('click', () => {
  const guessNumber = guess.value;

  if (currentScore > 1) {
    // No number
    if (!guessNumber) {
      message.textContent = 'No number!';
    } else {
      // Correct number
      if (Number(guessNumber) === secretNumber && !guessState) {
        message.textContent = 'Correct number!';
        number.textContent = secretNumber;
        body.style.backgroundColor = '#60b347';
        guessState = true;

        if (currentScore > highestScore)
          highestScore = highscore.textContent = currentScore;

        // Too high
      } else {
        if (Number(guessNumber) > secretNumber && !guessState) {
          message.textContent = 'Too high!';
          lowerScore();

          // Too low
        } else if (Number(guessNumber) < secretNumber && !guessState) {
          message.textContent = 'Too low!';
          lowerScore();

          // Hit again tip
        } else {
          message.textContent = 'Hit "Again" to reset';
        }
      }
    }

    // You lost
  } else {
    message.textContent = 'You lost!';
    if (currentScore > 0) lowerScore();
  }
});
