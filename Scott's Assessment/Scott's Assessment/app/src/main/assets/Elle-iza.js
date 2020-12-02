var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;

var canvas = document.getElementById("gameCanvas");
var width = 1400;
var height = 700;
var ctx = canvas.getContext("2d");

var player = {
x: width / 2,
y: height / 2,
width: 100,
height: 100,
velX: 0,
velY: 0
};

var enemy = {
x: width / 2,
y: height / 2,
width: 100,
height: 100,
velX: 0,
velY: 0
};

var keys = [];
var friction = 0.8;

var startTimeMS = 0;
var frameX = 0;
var frameXMax = 3;
var frameY = 0;
var frameYMax = 4;
var frame = 0;
var frameMax = 9;
var frameTimer = 0.18;
var frameTimeMax = 0.2;
var spriteWidth = 183;
var spriteHeight = 330;
var enemySpritewidth = 307;
var enemySpriteHeight = 485;
var img = new Image();
var enemyimg = new Image();
var isKeyPressed = false;
var level = 5;


//canvas.width = width;
//canvas.height = height;

function load() {
console.log("tests");
}

window.addEventListener("load", function () {
init();
load();

start();
update();
});

function init()
{
   if (canvas.getContext)
   {

     window.addEventListener("touchstart", touchingDown, false);
     window.addEventListener("touchmove", touchXY, true);
     window.addEventListener("touchend", touchUp, false);
   }

   //if (soundMgr != null) soundMgr.playMusic(0);


}


document.body.addEventListener("keydown", function (e) {
keys[e.keyCode] = true;
isKeyPressed = true;
});

document.body.addEventListener("keyup", function (e) {
keys[e.keyCode] = false;
isKeyPressed = false;
});



function start() {

canvas.width = width;
canvas.height = height;



img.src = 'Elle.png';
enemyimg.src = 'Alexander.png';
}




function update() {
ctx.clearRect(0, 20, width, height);
if (keys[40] && player.y < (canvas.height - player.height - 20)) {
player.velY++;

}

if (keys[83] && player.y < (canvas.height - player.height - 20)) {
player.velY++;

}
if (keys[38] && player.y > 400) {
player.velY--;
}


if (keys[39] && player.x < (canvas.width - player.width - 20)) {
player.velX++;

}


if (keys[37] && player.x > player.width) {
player.velX--;

}

player.velX *= friction;
player.velY *= friction;
player.x += player.velX;
player.y += player.velY;



if (isKeyPressed) {
animationFrame();
ctx.drawImage(img, spriteWidth * frameX, spriteHeight * frameY, spriteWidth, spriteHeight, player.x, player.y, player.width, player.height);
} else
ctx.drawImage(img, spriteWidth * 2, spriteHeight * 1, spriteWidth, spriteHeight, player.x, player.y, player.width, player.height);

ctx.drawImage(enemyimg,  enemySpritewidth * 2, enemySpriteHeight * 1,  enemySpritewidth, enemySpriteHeight, enemy.x, enemy.y, enemy.width, enemy.height);
if (enemy.x > enemy.width) {
enemy.velX--;
}


enemy.velX *= friction;
enemy.velY *= friction;
enemy.x += enemy.velX;
enemy.y += enemy.velY;

requestAnimationFrame(update);

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
//

