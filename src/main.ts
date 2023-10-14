//purposely bad code so students can fix it - can make it worse

import './style.css'

const dino = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const bird = document.getElementById("bird")
const bird1 = document.getElementById("bird1");
const cactus1 = document.getElementById("cactus1");

const scoreText = document.getElementById("scoreText")
let score = 0
let currentSpeed = 1;  
setText("click to start!")


var isJumping = false
let gameOver = true

document.addEventListener('mousedown', () => jump())


let gameInterval = setInterval(function () { main(); }, currentSpeed);

function main()
{
    if(gameOver == false)
    {
        score = score + 1;
        setText("Score: " + score)

        CheckGameOver()
    }
    if (score % 100 === 0) {  // For example, every 100 points
        clearInterval(gameInterval);
        currentSpeed *= 0.9  // Increase speed by 10%
        gameInterval = setInterval(function () { main(); }, currentSpeed)
      }
}


function jump()
{
    if(gameOver === false)
    {
        if(isJumping == false)
        {
            isJumping = true
            dino?.classList.add("jump")
            setTimeout(RemoveJump, 500)
        }
    }
    else
    {
        startGame();
    }
    
}


function RemoveJump()
{
    dino?.classList.remove("jump")
    isJumping = false;
    //mainLoop = mainLoop //bug fix?
}

function RemoveObstacles()
{
    cactus?.classList.remove("cactusMove")
    bird?.classList.remove("birdMove")
    bird1?.classList.remove("bird1Move");
    cactus1?.classList.remove("cactus1Move");
}


function CheckGameOver()
{
    
    if(gameOver == false && dino != null && cactus != null && bird != null  && bird1 != null && cactus1 != null)
    {
        //get is dinosaur jumping
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))

        //get cactus position
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

        //get bird position
        let birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"))

        let bird1Left = parseInt(window.getComputedStyle(bird1).getPropertyValue("left"));
        let cactus1Left = parseInt(window.getComputedStyle(cactus1).getPropertyValue("left"));

        //detect cactus collision
        if(dinoTop >= 150 && (Math.abs(cactusLeft) < 7 || Math.abs(cactus1Left) < 7))
        {
            //end game
            console.log("player died!")
            setText("Final Score: " + score + "! Click To Play Again!")
            gameOver = true

            //reset player
            RemoveJump()
            
            //reset cactus and birds
            RemoveObstacles()
        }

        //detect bird collision
        if(dinoTop <= 80 && dinoTop >= -20 && 
        (birdLeft >= -60 && birdLeft <= 60 || bird1Left >= -60 && bird1Left <= 60))
        {
            //end game
            console.log("player died!")
            setText("Final Score: " + score + "! Click To Play Again!")
            gameOver = true

            //reset player
            RemoveJump()
            
            //reset cactus and birds
            RemoveObstacles()
        }
        console.log(`Dino top: ${dinoTop}, Cactus left: ${cactusLeft}, Bird left: ${birdLeft}`);
    }
}


function startGame()
{
    console.log("Game started!")
    gameOver = false
    score = 0
    cactus?.classList.add("cactusMove")
    bird?.classList.add("birdMove")
    bird1?.classList.add("bird1Move");
    cactus1?.classList.add("cactus1Move");
}

function setText(s: string)
{
    if(scoreText)
    {
        scoreText.textContent = s
    }
}
