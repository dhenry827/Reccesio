const categories = {
    colors: ["RED", "BLUE", "GREEN", "YELLOW", "PURPLE", "ORANGE", "PINK", "BROWN", "GRAY", "BLACK"],
};

let selectedCategory = null;
let wordToGuess = '';
let guessedLetters = [];
let remainingAttempts = 8;


function startGame() {

    const categoryKeys = Object.keys(categories);
    selectedCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];

  
    wordToGuess = categories[selectedCategory][Math.floor(Math.random() * categories[selectedCategory].length)];

   
    guessedLetters = [];
    remainingAttempts = 8;

  
    //document.querySelector('.hangman').innerHTML = '';
    document.querySelector('.game-result').textContent = '';

    
    generateKeyboard(); 
    displayWordToGuess();
}


function generateKeyboard() {
    const keyboard = document.querySelector('.keyboard');
    keyboard.innerHTML = '';

    for (let letterCode = 65; letterCode <= 90; letterCode++) {
        const letter = String.fromCharCode(letterCode);
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('keyboard-button');
        button.addEventListener('click', () => guessLetter(letter));
        keyboard.appendChild(button);
    }
}

function displayWordToGuess() {
    const wordToGuessDisplay = document.querySelector('.word-to-guess');
    const displayedWord = wordToGuess.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
    wordToGuessDisplay.textContent = displayedWord;
}

function guessLetter(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);

        if (!wordToGuess.includes(letter)) {
            remainingAttempts--;
            updateHangmanImage();
        }

        displayWordToGuess();
        checkGameResult();

        const letterButton = document.querySelector(`.keyboard-button:contains('${letter}')`);
        letterButton.disabled = true;
        letterButton.classList.add('disabled');
    }
}


let mistakes = 0; 

function updateHangmanImage() {
    console.log("mistakes",mistakes)
    console.log("remainingAttempts",remainingAttempts)
    const hangmanPic = document.getElementById('hangmanPic');

    if (remainingAttempts > 0 ) {
        hangmanPic.src = './images/' + mistakes + '.png';
    }
    mistakes++; 
}

function disableKeyboard() {
    const btnNodes = document.querySelectorAll('.keyboard-button');
    console.log(btnNodes)
    for (let i=0;i< btnNodes.length;i++){
      let currentBtn = btnNodes[i] 
       currentBtn.disabled=true
    }
}

function checkGameResult() {
    if (remainingAttempts === 0) {
        document.querySelector('.game-result').textContent = 'Game over. You lose!';
        disableKeyboard();
    } else if (!wordToGuess.split('').some(letter => !guessedLetters.includes(letter))) {
        document.querySelector('.game-result').textContent = 'Congratulations! You win!'
        disableKeyboard();
    }
}


startGame();