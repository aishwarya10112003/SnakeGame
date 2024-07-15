//game constants & variables 
let board = document.querySelector("#board");
let velocity = { x: 0, y: 0 };
var highscorebox=document.querySelector("#highscorebox")
var scoreboard = document.querySelector("#scoreboard");
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio("gameover.mp3");
const movesound = new Audio("move.mp3");
const musicsound = new Audio("music.mp3");
let lastpainttime = 0;
let score = 0;
const speed = 6;
let highscoreval;
let snakearr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 8 }
//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }
    lastpainttime = ctime;
    gameEngine();


}
function iscollide(snake) {
    //if you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x <= 0 || snake[0].y <= 0 || snake[0].x >= 18 || snake[0].y >= 18) {
        return true;
    }




}
function gameEngine() {
    //part1 updating the snake array
    if (iscollide(snakearr)) {
        gameoversound.play();
        musicsound.pause();
        velocity = { x: 0, y: 0 };
        alert("game over.tap a any key to start again!");
        snakearr = [{ x: 13, y: 15 }];
        // musicsound.play();
        score = 0;
    }
    //setting highscore
// 


    //if you have eaten the food ,increament the score and regenerate the food
    if (snakearr[0].y == food.y && snakearr[0].x == food.x) {
        foodsound.play();
        score++;
          
        scoreboard.innerHTML = "score :" + score;
        snakearr.unshift({ x: snakearr[0].x + velocity.x, y: snakearr[0].y + velocity.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };


    }
    //moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };

    }
    snakearr[0].x += velocity.x;
    snakearr[0].y += velocity.y;
    //display the snake 
    board.innerHTML = " ";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}
//main logic starts here



window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    velocity = { x: 0, y: 1 }//start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            velocity.x = 0;
            velocity.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            velocity.x = 0;
            velocity.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            velocity.x = -1;
            velocity.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            velocity.x = 1;
            velocity.y = 0;
            break;

        default:
            break;
    }

})
