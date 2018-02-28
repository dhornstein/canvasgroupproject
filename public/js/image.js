// let canvasReal = document.getElementById('canvas-real');
// let contextReal = canvasReal.getContext('2d');
// let canvasDraft = document.getElementById('canvas-draft');
// let contextDraft = canvasDraft.getContext('2d');
let pic;
function handleFiles(files) {
    // canvasReal.innerHTML = "";
    var img = document.createElement("img");
    img.src = window.URL.createObjectURL(files[0]);
    img.onload = function () {
        contextReal.drawImage(img, 0, 0, canvasReal.width, canvasReal.height);
        pic = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
    }
}
function invertColor() {
    let pixels = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
    let d = pixels.data;
    for (let i = 0; i < d.length; i += 4) { //r,g,b,a 
        d[i] = 255 - d[i];
        d[i + 1] = 255 - d[i + 1];
        d[i + 2] = 255 - d[i + 2];
    }
    contextReal.putImageData(pixels, 0, 0);
}
function greyScale() {
    let pixels = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
    let d = pixels.data;
    for (let i = 0; i < d.length; i += 4) { //r,g,b,a 
        d[i] = d[i + 1] = d[i + 2] = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]
    }
    contextReal.putImageData(pixels, 0, 0);
}
function brighten(){
    let pixels = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
    let d = pixels.data;
    for (let i = 0; i < d.length; i += 4) { //r,g,b,a 
        d[i] = 1.2*d[i];
        d[i + 1] = 1.2*d[i + 1];
        d[i + 2] = 1.2*d[i + 2];
    }
    contextReal.putImageData(pixels, 0, 0);
}
function threshold(){
    let pixels = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
    let d = pixels.data;
    for (let i = 0; i < d.length; i += 4) { //r,g,b,a 
        let v = (0.2126*d[i] + 0.7152*d[i+1] + 0.0722*d[i+2] >= 100) ? 255 : 0;
        d[i] = d[i + 1] = d[i + 2] = v;
    }
    contextReal.putImageData(pixels, 0, 0);
}
function recover() {
    contextReal.putImageData(pic, 0, 0);
}
function saveFile(){
    $.ajax({
        type: "POST",
        url: "/uploads",
        data: { 
           imgBase64:canvasReal.toDataURL()
        }
      }).done(function(o) {
        console.log('saved'); 
        // If you want the file to be visible in the browser 
        // - please modify the callback in javascript. All you
        // need is to return the url to the file, you just saved 
        // and than put the image in your browser.
      });
}
