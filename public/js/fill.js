var fillBlock = document.getElementById('fill-block');
var ctx5 = fillBlock.getContext('2d');
var width3 = fillBlock.width;
var height3 = fillBlock.height;

var fillStrip = document.getElementById('fill-strip');
var ctx6 = fillStrip.getContext('2d');
var width4 = fillStrip.width;
var height4 = fillStrip.height;

var fillLabel = document.getElementById('fill-label');
// var canvasreal = document.getElementById('canvas-real');

var a = 0;
var b = 0;
var drag = false;
var rgbaColor = 'rgba(255,0,0,1)';

ctx5.rect(0, 0, width3, height3);
fillGradient2();



ctx6.rect(0, 0, width4, height4);
var grd1 = ctx6.createLinearGradient(0, 0, 0, height3);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx6.fillStyle = grd1;
ctx6.fill();

function click2(e) {
  a = e.offsetX;
  b = e.offsetY;
  var imageData = ctx6.getImageData(a, b, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  fillGradient2();
}

function fillGradient2() {
  ctx5.fillStyle = rgbaColor;
  ctx5.fillRect(0, 0, width3, height3);

  var grdWhite = ctx6.createLinearGradient(0, 0, width3, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx5.fillStyle = grdWhite;
  ctx5.fillRect(0, 0, width3, height3);

  var grdBlack = ctx6.createLinearGradient(0, 0, 0, height3);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx5.fillStyle = grdBlack;
  ctx5.fillRect(0, 0, width3, height3);
}

function mousedown(e) {
  drag = true;
  changeColor2(e);
}

function mousemove(e) {
  if (drag) {
    changeColor2(e);
  }
}

function mouseup(e) {
  drag = false;
}

function changeColor2(e) {
  a = e.offsetX;
  b = e.offsetY;
  var imageData = ctx5.getImageData(a, b, 1, 1).data;
  rgbaColor2 = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  fillLabel.style.backgroundColor = rgbaColor2;
  // canvasreal.style.backgroundColor = rgbaColor;
}

fillStrip.addEventListener("click", click2, false);
fillBlock.addEventListener("mousedown", mousedown, false);
fillBlock.addEventListener("mouseup", mouseup, false);
fillBlock.addEventListener("mousemove", mousemove, false);