const startButton = document.getElementById('startButton');
const mole1 = document.getElementById('mole1');
const score = document.getElementById('score');
const aside = document.getElementById('aside');
let secondsLeft = 30;
let sum = 0;

// Game Logic:
const gameLogic = function() {
    const timerInterval = setInterval(function () {
        secondsLeft--;
        if (secondsLeft > 0) {
            if (secondsLeft % 5 === 0){
                mole1.removeAttribute("hidden");
                mole1.addEventListener('click', givePoints, {once: true});
            } else {
                mole1.setAttribute("hidden", "hidden");
            }
        } else if (secondsLeft === 0) {
            // Stops game
            clearInterval(timerInterval);
            // End game:
            storeScore();
            renderScores();
            mole1.removeAttribute("hidden");
            mole1.removeEventListener('click', givePoints);
            score.innerHTML = "score"; 
          }
    }, 500); 
    secondsLeft = 30;
    sum = 0;
};

// Starts the Game:
startButton.addEventListener('click', gameLogic);

// Points Logic:
const givePoints = function(){
    sum = sum + 10;
    score.textContent = sum
};


// Stores scores to Local Storage: 
const storeScore = function () {
    const allScores = JSON.parse(localStorage.getItem('allScores')) || [];    
    allScores.push(sum);
    localStorage.setItem('allScores', JSON.stringify(allScores));
};


// Builds p tag in aside:
const builElement = function (){
    const createP = document.createElement("p");
    aside.append(createP);
    return {createP};
};

// Passes score to innerHTML for score message:
const renderScores = function () {
    const getScores = JSON.parse(localStorage.getItem('allScores'));
    aside.innerHTML = "";
    if (!getScores) {
        return; // Exit function since there's nothing to render
    }
    for (let i = 0; i < getScores.length; i++) {
        const gameScores = getScores[i];
        if (gameScores !== null) {
            const {createP} = builElement();
            const score = gameScores;
            createP.innerHTML = `You scored ${score} points! Try again!`;
        }
    }
};

renderScores();