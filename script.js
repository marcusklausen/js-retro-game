let wheel = document.querySelector('#wheel');
let sprite1 = document.querySelector('.sprite1');
let scene = document.querySelector('.scene');
let audio = document.querySelector('#audio');
let screenText = document.querySelector('.screen-text');
let scoreSpan = document.querySelector('#score');



// Grab enemy  class with querySelector
let enemy1 = document.querySelector('.sprite-enemy1');
let globalScore = 0;
let timer;
let url = window.location.href;

url = new URL(url);

let playerCar = url.searchParams.get('car');

let explotionCar;

if (playerCar == "porsche") {
    sprite1.setAttribute('src', "sprite1.png");
    explotionCar = "sprite1-explode.png";
    
} else if (playerCar == "cadillac") {
    sprite1.setAttribute('src', "sprite2.png");
    explotionCar = "sprite2-explode.png";
}




scene.addEventListener('click', function(e) {

    wheel.focus();
    screenText.style.display = "none";
    scene.classList.add('scene-active');

    //add enemy-active css class to enemy sprite class
    enemy1.classList.add('enemy-active');

    

    let enemyPositionX = getRandomNumber();
    enemy1.addEventListener('animationiteration', function() {
        enemyPositionX = getRandomNumber();
        enemy1.style.left = enemyPositionX*10+"%";

        console.log(enemy1.style.left);
        console.log(enemyPositionX);
        
    })

    timer = window.setInterval(function(){
        globalScore += 10;
        scoreSpan.innerHTML = globalScore;

        // debug
        console.log("Enemy Position X: " + enemyPositionX);
        // debug
        console.log("Enemy Position Y: " + enemy1.offsetTop);



        if (enemyPositionX == wheel.value && enemy1.offsetTop>350) {
            gameEnd();
        }

    }, 100);
});

wheel.addEventListener('input', function(e) {
    
    sprite1.style.left = this.value*10 + '%';
    
    if (this.value <2 || this.value >7) {
        gameEnd();
    }

    // debug
    console.log("Wheel: " + wheel.value);
})

// Helper functions


// Get random number within bounds of road
function getRandomNumber() {
    return Math.floor(Math.random()*(8-2)+2);
}

function gameEnd() {
    sprite1.setAttribute('src', explotionCar);
    scene.classList.remove('scene-active');
    enemy1.classList.remove('enemy-active');
    screenText.style.display = "flex";
    screenText.innerHTML = "<h1>Game over!<br>Score: " + globalScore + "</h1>";
    window.clearInterval(timer);
}