
var breeds = [
    "labrador",
    "malamute",
    "husky",
    "doberman",
    "rottweiler",
    "beagle",
    "pug",
    "chihuahua",
    "newfoundland",
    "schnauzer"
];
var isGameStarted = false;
var isGameOver = false;
var wins = 0;
var losses = 0;
var word = " ";
var guesses = 0;
var answerArray = [];
var wrongLetter = [];
var guessesText = document.getElementById("lettersGuess");
var wordDisplay = document.getElementById("underscore");
var header = document.getElementById("header");
var winsTotal = document.getElementById("wins");
var lossTotal = document.getElementById("losses");
var wrongGuess = document.getElementById("wrongLetters");
var newHeader = "Guess the breed of dog!";

document.onkeyup = function () {
    if (isGameStarted === false) {
        initializeGame();
    } else if (isGameStarted === true && isGameOver === false) {
        var userGuess = event.key;
        if(word.indexOf(userGuess) !== -1) {
            for (var j = 0; j < word.length; j++) {
                if (word[j] === userGuess) {
                    answerArray[j] = userGuess;
                } 
            }
        }else {
            guesses--;
            wrongLetter.push(userGuess);
            guessesText.textContent = "Guesses Remaining: " + guesses;
            console.log(wrongLetter);
            wrongGuess.textContent = "Wrong Letters: " + wrongLetter;
        }
        
        wordDisplay.textContent = (answerArray.join(" "));
        if (answerArray.indexOf("_") === -1) {
            isGameOver = true
            won();
            
        }
        if (guesses === 0) {
            wordDisplay.textContent = word;
            lost();
            
        }
        
    } else if (isGameStarted === true && isGameOver === true) {
        //restart
        //initializeGame();
        isGameStarted = true;
        isGameOver = false
        wordDisplay.textContent = (answerArray.join(" "));
    }
};

var won = function () {
    wins++
    header.textContent = "Press Any Key To Play Again";
    winsTotal.textContent = "Wins: " + wins;
    isGameStarted = false;
    word = "";
    answerArray = [];
    alert("You won!");
}
var lost = function () {
    losses++
    header.textContent = "Press Any Key To Play Again";
    lossTotal.textContent = "Losses: " + losses;
    isGameStarted = false;
    word = "";
    answerArray = [];
    alert("Aw, better luck next time!")
}

var initializeGame = function () {
    word = breeds[Math.floor(Math.random() * breeds.length)];
    guesses = word.length;
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    };
    wordDisplay.textContent = (answerArray.join(" "));
    guessesText.textContent = "Guesses Remaining: " + guesses;
    header.textContent = newHeader;
    isGameStarted = true;
    wrongLetter = [];
    wrongGuess.textContent = "Wrong Letters: ";
}
// make it so that;
// 1. an incorrect letter that has already been guessed does not remove one of the guess counts
// 2. user can only input letter characters as a guess
