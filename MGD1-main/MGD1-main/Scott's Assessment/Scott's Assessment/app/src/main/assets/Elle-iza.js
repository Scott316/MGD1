var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;

var canvas = document.getElementById("gameCanvas");
var width = 1400;
var height = 700;
var ctx = canvas.getContext("2d");

var player = {
x: width / 2,
y: height / 1.65,
width: 100,
height: 100,
velX: 0,
velY: 0
};

var enemy = {
x: width / 1,
y: height / 1.65,
width: 100,
height: 100,
velX: 0,
velY: 0
};

var keys = [];
var friction = 0.8;
var themeMusic;
var soundEffect;
var startTimeMS = 0;
var frameX = 0;
var frameXMax = 3;
var frameY = 0;
var frameYMax = 4;
var frame = 0;
var frameMax = 9;
var frameTimer = 0.08;
var frameTimeMax = 0.5;
var spriteWidth = 180;
var spriteHeight = 330;
var enemySpritewidth = 307;
var enemySpriteHeight = 485;
var img = new Image();
var enemyimg = new Image();
var isKeyPressed = false;
var level = 5;
var myScore;
//these are for the menu===========================================================================
var buttonX = [550, 700];
var buttonY = [350, 350];
var buttonWidth = [100, 100];
var buttonHeight = [100, 100];

var mouseX;
var mouseY;

var playImage = new Image();
var quit = new Image();
var WASD = new Image();
var AlexanderMenu = new Image();
var ElleMenu = new Image();
var buttonClicked;
//====================================================================================================

function load() {
console.log("tests");
}

window.addEventListener("load", function () {
init();
showMenu();
});

function init()
{
   canvas.width = width;
   canvas.height = height;


   buttonClicked = 0;
}


document.body.addEventListener("keydown", function (e) {
keys[e.keyCode] = true;
isKeyPressed = true;
});

document.body.addEventListener("keyup", function (e) {
keys[e.keyCode] = false;
isKeyPressed = false;
});



function startGame() {
img.src = 'Elle.png';
enemyimg.src = 'Alexander.png';
soundEffect = new sound("Yoda.mp3")
themeMusic = new sound("Circle Of Life.mp3");

themeMusic.play();
if (canvas.getContext)
   {

     window.addEventListener("touchstart", touchingDown, false);
     window.addEventListener("touchmove", touchXY, true);
     window.addEventListener("touchend", touchUp, false);
   }

   update();
}

function update() {
ctx.clearRect(0, 20, width, height);

if (keys[83] && player.y < (canvas.height - player.height - 100)) {
player.velY++;

}
if (keys[87] && player.y > 405) {
player.velY--;
}


if (keys[68] && player.x < (canvas.width - player.width - 20)) {
player.velX++;

}

if(keys[86]){
soundEffect.play();
let health = document.getElementById("health")
health.value -= 1;
}

if (keys[65] && player.x > player.width) {
player.velX--;

}

player.velX *= friction;
player.velY *= friction;
player.x += player.velX;
player.y += player.velY;



if (keys[65] || keys[68] || keys[83] || keys[87]) {
animationFrame();
ctx.drawImage(img, spriteWidth * frameX, spriteHeight * frameY, spriteWidth, spriteHeight, player.x, player.y, player.width, player.height);
} else
ctx.drawImage(img, spriteWidth * 2, spriteHeight * 1, spriteWidth, spriteHeight, player.x, player.y, player.width, player.height);


if (enemy.x > enemy.width) {
animationFrame();
ctx.drawImage(enemyimg, enemySpritewidth * frameX, enemySpriteHeight * frameY, enemySpritewidth, enemySpriteHeight, enemy.x, enemy.y, enemy.width, enemy.height);
enemy.velX--;
} else {
ctx.drawImage(enemyimg,  enemySpritewidth * 2, enemySpriteHeight * 1,  enemySpritewidth, enemySpriteHeight, enemy.x, enemy.y, enemy.width, enemy.height);
}


enemy.velX *= friction;
enemy.velY *= friction;
enemy.x += enemy.velX;
enemy.y += enemy.velY;

requestAnimationFrame(update);

}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function animationFrame() {
var elapsed = (Date.now() - startTimeMS) / 1000;
startTimeMS = Date.now();

//only update frames when timer is below 0
frameTimer = frameTimer - elapsed;
if (frameTimer <= 0) {
frameTimer = frameTimeMax;
frameX++;
if (frameX > frameXMax) {
frameX = 0;
frameY++;
//end of row, move down to next row in sheet
if (frameY > frameYMax) {
frameY = 0;
}
}
frame++;
//reset frames to 0 in event that there are empty spaces on sprite sheet
if (frame > frameMax) {
frame = 0;
frameX = 0;
frameY = 0;
}
}

}

function touchUp(evt)
{
   evt.preventDefault();

   var touchX = evt.touches[0].pageX - canvas.offsetLeft;
   var touchY = evt.touches[0].pageY - canvas.offsetTop;

   lastPt = null;
}


function touchingDown(evt)
{
    evt.preventDefault();

    touchXY(evt);
}


function touchXY(evt)
{
   evt.preventDefault();

   if (lastPt!=null)
   {
      var touchX = evt.touches[0].pageX - canvas.offsetLeft;
      var touchY = evt.touches[0].pageY - canvas.offsetTop;
      player.x = touchX - (player.width / 8);
   }

   lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};
}

function showMenu(){
playImage.src = "playbutton.png";
playImage.addEventListener('load', e => {
ctx.drawImage(playImage, buttonX[0], buttonY[0], buttonWidth[0], buttonHeight[0]);
});

WASD.src = "WASD.jpg";
WASD.addEventListener('load', e => {
ctx.drawImage(WASD, 450, 50, 150, 100)});

ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "yellow";
ctx.textAlign - "center";
ctx.fillText("Tit-elle In Progress", 550, 30);
ctx.fillText(" - Moves the character", 600, 100);
ctx.fillText(" - Main enemy", 160, 260);
ctx.fillText(" - Player character", 600, 260);

AlexanderMenu.src = "Alexander Menu.png";
AlexanderMenu.addEventListener('load', e => {
ctx.drawImage(AlexanderMenu, 50, 200, 150, 100)});

ElleMenu.src="ElleMenu.png";
ElleMenu.addEventListener('load', e => {
ctx.drawImage(ElleMenu, 475, 200, 150, 100)});

quit.src = "quitbutton.png";
quit.addEventListener('load', e => {
ctx.drawImage(quit, buttonX[1], buttonY[1], buttonWidth[1], buttonHeight[1]);
});
canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);
};

function checkPos(event){
coords = canvas.relMouseCoords(event);
mouseX = coords.x;
mouseY = coords.y;
}


HTMLCanvasElement.prototype.relMouseCoords = function(event){
var totalOffsetX = 0;
var totalOffsetY = 0;
var canvasX = 0;
var canvasY = 0;
var currentElement = this;

do{
totalOffsetX += currentElement.offsetLeft;
totalOffsetY += currentElement.offsetTop;
}
while (currentElement = currentElement.offsetParent)

canvasX = event.pageX - totalOffsetX;
canvasY = event.pageY - totalOffsetY;

//fix for variable canvas width
canvasX = Math.round( canvasX * (this.width / this.offsetWidth));
canvasY = Math.round( canvasY * (this.height / this.offsetHeight));

return {x:canvasX, y:canvasY};
}

function checkClick(mouseEvent){
if(mouseX > buttonX[0] && mouseX < (buttonX[0] + buttonWidth[0])){
if(mouseY > buttonY[0] && mouseY < (buttonY[0] + buttonHeight[0]) ) {
buttonClicked = 1;
startGame();
}
}

if(mouseX > buttonX[1] && mouseX < (buttonX[1] + buttonWidth[1])){
if(mouseY > buttonY[1] && mouseY < (buttonY[1] + buttonHeight[1]) ) {
buttonClicked = 2;
quitGame();
}
}
 if(buttonClicked>0){
 canvas.removeEventListener("mousemove", checkPos);
 canvas.removeEventListener("mouseup", checkClick);
 }
}

function quitGame(){
window.close();
}