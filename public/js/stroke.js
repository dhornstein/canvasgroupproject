var strokeBlock = document.getElementById('stroke-block');
var ctx3 = strokeBlock.getContext('2d');
var width3 = strokeBlock.width;
var height3 = strokeBlock.height;

var strokeStrip = document.getElementById('stroke-strip');
var ctx4 = strokeStrip.getContext('2d');
var width4 = strokeStrip.width;
var height4 = strokeStrip.height;

var strokeLabel = document.getElementById('stroke-label');
// var canvasreal = document.getElementById('canvas-real');

var a = 0;
var b = 0;
var drag = false;
var rgbaColor = 'rgba(255,0,0,1)';

ctx3.rect(0, 0, width3, height3);
fillGradient3();



ctx4.rect(0, 0, width4, height4);
var grd1 = ctx4.createLinearGradient(0, 0, 0, height3);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx4.fillStyle = grd1;
ctx4.fill();

function click3(e) {
    c = e.offsetX;
    d = e.offsetY;
    var imageData = ctx4.getImageData(c, d, 1, 1).data;
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    fillGradient3();
}

function fillGradient3() {
    ctx3.fillStyle = rgbaColor;
    ctx3.fillRect(0, 0, width3, height3);

    var grdWhite = ctx4.createLinearGradient(0, 0, width3, 0);
    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    ctx3.fillStyle = grdWhite;
    ctx3.fillRect(0, 0, width3, height3);

    var grdBlack = ctx4.createLinearGradient(0, 0, 0, height3);
    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    ctx3.fillStyle = grdBlack;
    ctx3.fillRect(0, 0, width3, height3);
}

function mousedown(e) {
    drag = true;
    changeColor3(e);
}

function mousemove(e) {
    if (drag) {
        changeColor3(e);
    }
}

function mouseup(e) {
    drag = false;
}

function changeColor3(e) {
    c = e.offsetX;
    d = e.offsetY;
    var imageData = ctx3.getImageData(c, d, 1, 1).data;
    rgbaColor3 = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    strokeLabel.style.backgroundColor = rgbaColor3;
    // canvasreal.style.backgroundColor = rgbaColor;
}

strokeStrip.addEventListener("click", click3, false);
strokeBlock.addEventListener("mousedown", mousedown, false);
strokeBlock.addEventListener("mouseup", mouseup, false);
strokeBlock.addEventListener("mousemove", mousemove, false);