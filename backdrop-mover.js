const magPercent = 0.1;
const lerpRate = 0.05;



var mouseX = 0;
var mouseY = 0;

var lastMoveX = 0;
var lastMoveY = 0;

var moveX = 0;
var moveY = 0;

function getMousePos(event) {
    mouseX = -(window.innerWidth/2) + event.clientX;
    mouseY = -(-(window.innerHeight/2) + event.clientY);
}

function normalize(xPos, yPos) {
    let mag = getMag(xPos, yPos);
    return {    //return object containing the normalized x and y
        x: xPos / mag,  
        y: yPos / mag
    };
}

function setMag(xPos, yPos, mag) {
    let newVector = normalize(xPos, yPos);
    return {    //return object containing x and y multiplied by mag
        x: newVector.x * mag,  
        y: newVector.y * mag
    };
}

function getMag(xPos, yPos) {
    let mag = Math.sqrt((xPos ** 2) + (yPos ** 2)); //calc magnitude
    return mag;
}

function test(event) {
    getMousePos(event);
    backdrop.style.backgroundPositionX = -mouseX + "px";
    backdrop.style.backgroundPositionY = mouseY + "px";
}

function moveBackdrop(event, maxMag) {
    getMousePos(event);     //update mouse position
    moveX = mouseX;
    moveY = mouseY;
    //console.log(getMag(mouseX, mouseY));
    let tempVector = setMag(mouseX, mouseY, getMag(mouseX, mouseY) * magPercent);   //get a vector with a new magnitude, 5 percent the mouse's mag
    //apply position
    moveX = tempVector.x;
    moveY = tempVector.y;
}

backdrop = document.querySelector("body");

window.addEventListener("load", function(event) {
    applyListener(backdrop);
    requestAnimationFrame(lerpBackdrop);
});

function applyListener(elm) {
    elm.addEventListener("mousemove", function(event) {
        moveBackdrop(event, magPercent);
    });
}

function lerp(a, b, f){
    return a * (1.0 - f) + (b * f);
}

function lerpBackdrop(timestamp) {
    lastMoveX = lerp(lastMoveX, -moveX, lerpRate) ;
    lastMoveY = lerp(lastMoveY, moveY, lerpRate);   //NOTE: you would think this should be 
                                                    //negative but its because when I get the 
                                                    //mouseY it feels backwards so I'm undoing my inversion
    
    backdrop.style.backgroundPositionX = lastMoveX + "px";
    backdrop.style.backgroundPositionY = lastMoveY + "px";
    console.log(lastMoveX);
    requestAnimationFrame(lerpBackdrop);
}