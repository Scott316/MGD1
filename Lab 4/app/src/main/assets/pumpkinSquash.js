var canvas;
var canvasContext;
var canvasX;
var canvasY;
var mouseIsDown = 0;

var thePumpkin;
var tempPumpkin;

var imageToDraw = new Image();

var lastPt = null;
var gameOverScreen = false;

var score = 0;
var lives = 3;

var startTimeMS;

//window.onload =
function load(){
canvas = document.getElementById('gameCanvas');
canvasContext = canvas.getContext('2d');

init();

canvasX = canvas.width/2;
canvasY = canvas.height - 30;

if(!gameOverScreen)
{
 gameLoop();
}

}
function aPumpkin(xPosition, yPosition){
this.xPos = xPosition;
this.yPos = yPosition;
};

function init(){

if(canvas.getContext){
//Set Event Listeners for window, mouse and touch

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);

canvas.addEventListener("touchstart", touchDown, false);
canvas.addEventListener("touchmove", touchXY, true);
canvas.addEventListener("touchend", touchUp, false);

document.body.addEventListener("touchcancel", touchUp, false);

resizeCanvas();
createPumpkin();
imageToDraw.src = "HalloweenPumpkinScary.png";
startTimeMS = new Date().getTime();
}
}

function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

function gameLoop(){
var elapsed = new Date().getTime() - startTimeMS;
update(elapsed);
render();
requestAnimationFrame(gameLoop);
}

function render(){
drawPumpkin();
}

function update(delta){
if((delta>1000))
{
startTimeMS = new Date().getTime();
clearPumpkin();
tempPumpkin.xPos = Math.round(Math.random() * (canvas.width - 50));
tempPumpkin.yPos = Math.round(Math.random() * (canvas.height - 50));
}
}

function clearPumpkin(){
canvasContext.clearRect(tempPumpkin.xPos, tempPumpkin.yPos, imageToDraw.width, imageToDraw.height);
}

function createPumpkin(){
var rndX = Math.round(Math.random() * (canvas.width - 50));
var rndY = Math.round(Math.random() * (canvas.height - 50));
tempPumpkin = new aPumpkin(rndX, rndY);
}

function drawPumpkin(){
canvasContext.drawPumpkin(imageToDraw, tempPumpkin.xPos, tempPumpkin.yPos);
}

function collisionDetection(){

}

function styleText(txtColour, txtFont, txtAlign, txtBaseline)
{
canvasContext.fillStyle = txtColour;
canvasContext.font = txtFont;
canvasContext.textAlign = txtAlign;
canvasContext.textBaseline = txtBaseline;
}

function touchUp(evt){
evt.preventDefault();
//Terminate touch path
lastPt = null;
}

function touchDown(evt){
evt.preventDefault();
if(gameOverScreenScreen){
//player1Score = 0;
//player2Score = 0;
//showingWinScreen = false;
return;
}
touchXY(evt);
}

function touchXY(evt){
evt.preventDefault();
if(lastPt != null){
var touchX = evt.touches[0].pageX - canvas.offsetLeft;
var touchY = evt.touches[0].pageY - canvas.offsetTop;
}
lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};
}