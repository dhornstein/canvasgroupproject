class DrawingCircle extends PaintFunction{
    constructor(contextReal) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord,event){
        this.contextReal.fillStyle = "#f44";
        this.origX = coord[0];
        this.origY = coord[1];
    }

    onDragging(coord,event){
        this.contextDraft.fillStyle = "#f44";
        this.contextDraft.lineWidth = 2;
        this.contextDraft.beginPath();
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.arc(coord[0],coord[1],Math.sqrt((coord[0]- this.origX)^2 +(coord[1] - this.origY)^2),
        0,(Math.PI/180)*360,false);//need to review the .arc 
        this.contextDraft.stroke();
        this.contextDraft.closePath();
        this.contextDraft.fill(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY)
    }

    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.lineWidth = 2;
        this.contextReal.arc(coord[0],coord[1],Math.sqrt((coord[0]- this.origX)^2 +(coord[1] - this.origY)^2),
        0,(Math.PI/180)*360,false);
        this.contextReal.stroke();
        this.contextReal.closePath();
        }

    /*var circle = new Path2D();
    onMouseMove(){}
    onMouseLeave(){}
    onMouseEnter(){}
*/
} 

/*
// Set up!
var a_canvas = document.getElementById("a");
var context = a_canvas.getContext("2d");

// Draw the face
context.fillStyle = "yellow";
context.beginPath();
context.arc(95, 85, 40, 0, 2*Math.PI);
context.closePath();
context.fill();
context.lineWidth = 2;
context.stroke();
context.fillStyle = "black";

// Draw the left eye
context.beginPath();
context.arc(75, 75, 5, 0, 2*Math.PI);
context.closePath();
context.fill();

// Draw the right eye
context.beginPath();
context.arc(114, 75, 5, 0, 2*Math.PI);
context.closePath();
context.fill();

// Draw the mouth
context.beginPath();
context.arc(95, 90, 26, Math.PI, 2*Math.PI, true);
context.closePath();
context.fill();

// Write "Hello, World!"
context.font = "30px Garamond";
context.fillText("Hello, World!",15,175);*/