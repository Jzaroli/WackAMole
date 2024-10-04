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
                mole1.addEventListener('click', givePoints);
            } else {
                mole1.setAttribute("hidden", "hidden");
            }
        } else if (secondsLeft === 0) {
            // Stops game
            clearInterval(timerInterval);
            // Creates end game alert
            endGame();
          }
    }, 1000); 
};

// Points Logic:
const givePoints = function(){
    sum = sum + 10;
    score.textContent = sum
};


// End Game Storage: 
const endGame = function () {
    const allScores = JSON.parse(localStorage.getItem('allScores')) || [];    
    allScores.push(sum);
    localStorage.setItem('allScores', JSON.stringify(allScores));
};

// Starts the Game:
startButton.addEventListener('click', gameLogic);


//Retrieve scores and post them to Aside:

// getitem from storage, iterate through loop, create HTML and pass information to aside, pass CSS to html tag as well