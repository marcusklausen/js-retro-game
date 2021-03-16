let wheel = document.querySelector('#wheel');
let sprite1 = document.querySelector('.sprite1');
let scene = document.querySelector('.scene');
let audio = document.querySelector('#audio');
let screenText = document.querySelector('.screen-text');

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
});

wheel.addEventListener('input', function(e) {
    
    sprite1.style.left = this.value*10 + '%';
    
    if (this.value <2 || this.value >7) {
        sprite1.setAttribute('src', explotionCar);
        scene.classList.remove('scene-active');
        screenText.style.display = "flex";
        screenText.innerHTML = "<h1>Game over!</h1>";
    }
})