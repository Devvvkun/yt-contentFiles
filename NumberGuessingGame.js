
const display = document.getElementById("guessGame");
const chancesText = document.querySelector("h3 span");
const numberButtons = document.querySelectorAll(".btn");
const functionbtn = document.querySelectorAll(".functionbtn button");

const startBtn = functionbtn[0]
const pauseBtn = functionbtn[1]
const stopBtn = functionbtn[2]
let randomNumber;
let chancesLeft = 5;
let gameStarted = false;
let gamePaused = false;
let gameOver = false;

function startGame(){
    randomNumber = Math.floor(Math.random()*9)+1;

    chancesLeft = 5;
    gameStarted = true;
    gamePaused = false;
    gameOver = false;
    display.value = "";
    chancesText.textContent = chancesLeft;
    display.placeholder = 'Guess a number b/w 1 to 9';
}

numberButtons.forEach(button => {
    button.addEventListener("click" , ()=>{
        if(!gameStarted || gamePaused || gameOver) return;
        const guess = Number(button.textContent);
        display.value = guess;

        if(guess == randomNumber){
            display.value = `Correct! ${guess}`;
            gameOver = true;
            gameStarted = false;
            confetti({
                particleCount : 150,
                spread : 100,
                origin : {y:0.6}
            });

            setTimeout(()=>{
                confetti({
                    particleCount:80,
                    angle:60,
                    spread: 70,
                    origin: {x:0,y:0.6}
                });
                confetti({
                    particleCount:80,
                    angle: 120,
                    spread : 70,
                    origin : {x:1 ,  y:0.6}
                });

            },250);
        return;
        }
    chancesLeft--;
    chancesText.textContent = chancesLeft;
    if(chancesLeft === 0){
        display.value = `Game Over!! ${randomNumber}`;
        gameOver = true;
        gameStarted = false;
        return;
    }
    display.value = guess;
    if(guess < randomNumber){
        display.placeholder = "Too Low!! Try Again";
    }
    else{
        display.placeholder = "Too High!! Try Again";
    }
    })
});

startBtn.addEventListener("click" , startGame);

pauseBtn.addEventListener("click", ()=>{
    if(!gameStarted || gameOver ) return;
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? "Resume" : "Pause";
})

stopBtn.addEventListener("click", ()=>{
    gameStarted = false;
    gamePaused = false;
    gameOver = true;

    display.value = "Game Stopped!";
    pauseBtn.textContent="Pause";
});

display.placeholder = "Press Start to Play";