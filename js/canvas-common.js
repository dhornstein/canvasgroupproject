let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;
let rgbaColor2
let rgbaColor1
let rgbaColor3


//always interact with canvas-draft

function set() {
    let pixels = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
    contextReal.canvas.width = window.innerWidth;
    contextReal.canvas.height = window.innerHeight;
    contextDraft.canvas.width = window.innerWidth;
    contextDraft.canvas.height = window.innerHeight;
    contextReal.putImageData(pixels, 0, 0);
    $('#canvas-draft').mousedown(function (e) {
        let mouseX = e.pageX - this.offsetLeft; 
        let mouseY = e.pageY - this.offsetTop;
        currentFunction.onMouseDown([mouseX, mouseY], e); 
        dragging = true;
    });
    $('#canvas-draft').mousemove(function (e) {
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        if (dragging) {
            currentFunction.onDragging([mouseX, mouseY], e);
        }
        currentFunction.onMouseMove([mouseX, mouseY], e);
    });
    $('#canvas-draft').mouseup(function (e) {
        dragging = false;
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        currentFunction.onMouseUp([mouseX, mouseY], e);
    });
    $('#canvas-draft').mouseleave(function (e) {
        dragging = false;
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        currentFunction.onMouseLeave([mouseX, mouseY], e);
    });
    $('#canvas-draft').mouseenter(function (e) {
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        currentFunction.onMouseEnter([mouseX, mouseY], e);
    });

    //mobile version    
    function start(e){
        e.preventDefault();
        let mouseX = e.changedTouches[0].pageX - this.offsetLeft;
        let mouseY = e.changedTouches[0].pageY - this.offsetTop;
        currentFunction.onMouseDown([mouseX, mouseY], e);
        dragging = true;
    }
    function draw(e){
        e.preventDefault();
        let mouseX = e.touches[0].pageX - this.offsetLeft;
        let mouseY = e.touches[0].pageY - this.offsetTop;
        if (dragging) {
            currentFunction.onDragging([mouseX, mouseY], e);
        }
        currentFunction.onMouseMove([mouseX, mouseY], e);
    }
    function finish(e){
        e.preventDefault();
        dragging = false;
        let mouseX = e.changedTouches[0].pageX - this.offsetLeft;
        let mouseY = e.changedTouches[0].pageY - this.offsetTop;
        currentFunction.onMouseUp([mouseX, mouseY], e);
    }
    canvasDraft.addEventListener("touchstart", start, false);
    canvasDraft.addEventListener("touchmove", draw, false);
    canvasDraft.addEventListener("touchend", finish, false);
}
set();
window.addEventListener('resize', set, false);




class PaintFunction {
    constructor() {

    } //to select different color, strokeWidth
    onMouseDown() {

    } //apply characteristics, 
    onDragging() { }
    onMouseMove() { } //move real img data to preview img data
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }

}


