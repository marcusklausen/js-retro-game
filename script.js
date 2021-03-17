// Variabler fanget fra DOM med querySelector
let wheel = document.querySelector('#wheel');
let sprite1 = document.querySelector('.sprite1');
let scene = document.querySelector('.scene');
let audio = document.querySelector('#audio');
let screenText = document.querySelector('.screen-text');
let scoreSpan = document.querySelector('#score');
let enemy1 = document.querySelector('.sprite-enemy1');

/* --- Globale variabler
-------------------------*/

// Sæt globalScore til 0 fra start
let globalScore = 0; 

// Sørg for at timer har global scope
let timer;

// Fang url streng fra browser url
let url = window.location.href;

// konveter url streng til URL objekt
url = new URL(url);

// Kør .searchParams på url objekt og find 'car'
let playerCar = url.searchParams.get('car');

// Sørg for at explosionCar har global scope
let explosionCar;

/* ----------------------------*/


/* ----------------------------*/
if (playerCar == "porsche") {
    sprite1.setAttribute('src', "sprite1.png");
    explosionCar = "sprite1-explode.png";
    
} else if (playerCar == "cadillac") {
    sprite1.setAttribute('src', "sprite2.png");
    explosionCar = "sprite2-explode.png";
}
/* ----------------------------*/


// Add Event listener, hvis scene bliver klikket på
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
scene.addEventListener('click', function(e) {

    // Sætter fokus på range-html-tagget så man kan bruge piletaster
    wheel.focus();

    // Fjern "start game" overlay
    screenText.style.display = "none";

    // Begynd at bevæge baggrund (tilføjer css .scene-active til .scene css class)
    scene.classList.add('scene-active');

    // Begynd at bevæge enemy (tilføjer css .enemy-active til .sprite-enemy1 css class)
    enemy1.classList.add('enemy-active');

    // deklarere enemyPosition uden for addEventListener scope, så den kan bruges i timer
    let enemyPositionX;

    // Add Event listener, for hver animationsrunde
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    enemy1.addEventListener('animationiteration', function() {

        // Giv enemyPositionX et tilfældigt nummer vha. vores helper function getRandomNumber();
        enemyPositionX = getRandomNumber();

        // Sætter enemy1's css position til (enemyPositionX*10)%
        enemy1.style.left = enemyPositionX*10+"%";

        // console.log(enemy1.style.left);
        // console.log(enemyPositionX);
        
    }) // enemy1.addEventlister slut />

    // Lav timer objekt, koden bliver eksekveret hvert 100 millisekund
    timer = window.setInterval(function(){

        // Forøg globalScore med 10 point, hvert 100 millisekund
        globalScore += 10;

        // Opdater html text i scoreSpan til globalScore, hvert 100 millisekund
        scoreSpan.innerHTML = globalScore;

        // Tjek om enemyPositionX (lastbil) er samme værdig som wheel.value (html range element, player bil) OG enemy1 er nået 350px ned fra toppen)
        if (enemyPositionX == wheel.value && enemy1.offsetTop>350) {

            // Slut spil vha. gameEnd() helper function
            gameEnd();
        }

    }, 100); // timer slut

}); // scene.addEventListener slut />


// Add Event listener, lyt efter ny værdi i wheel (html input type range element)
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
wheel.addEventListener('input', function(e) {
    
    // for hver gang værdi ændres

    // sæt sprite1 (player bil) css position til wheel.value*10 
    sprite1.style.left = this.value*10 + '%'; // this == wheel
    
    // Hvis wheel's værdi er over eller under rammerne for banen (hvis bilen kører ud over kanten)
    if (this.value <2 || this.value >7) {

        // Slut spil vha. gameEnd() helper function
        gameEnd();
    }

    // // debug
    // console.log("Wheel: " + wheel.value);
})


/* --- Helper functions
-------------------------*/

// Generer random nummer
function getRandomNumber() {
    return Math.floor(Math.random()*(8-2)+2); // Math.floor == rund til ned til nærmeste hele tal
}


// Slut spil helper function
function gameEnd() {

    // set sprite1 src attribute til explosionCar = billede sti 
    sprite1.setAttribute('src', explosionCar);

    // Fjern css class' som gør at enemy og baggrund bevæger sig
    scene.classList.remove('scene-active');
    enemy1.classList.remove('enemy-active');

    // Hvis screenText igen, nu med slutskærm (ændre display:none til display:flex i css)
    screenText.style.display = "flex";

    // Indsæt spil-slut-text i screenText element med globalScore som score
    screenText.innerHTML = "<h1>Game over!<br>Score: " + globalScore + "</h1>";

    // Afslut timer (let timer variable)
    window.clearInterval(timer);
}