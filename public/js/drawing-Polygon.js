class DrawingPolygon extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.startX = [];
        this.startY = [];
        this.mouseUp = false;
        // console.log(this.startX, this.startY)
    }

    //set up a function to control the move

    onMouseDown(coord, event) {
        if (this.mouseUp == true) {
            // this.contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
            this.startX = [];
            this.startY = [];
            // this.contextReal.beginPath();
            // this.contextReal.moveTo(coord[0], coord[1])
            // this.contextReal.lineTo(coord[0], coord[1]);
            this.mouseUp = false;
        }
    }
    onMouseUp(coord, event) {
        this.contextReal.strokeStyle = rgbaColor3;
        this.contextReal.fillStyle = rgbaColor2;
        this.contextReal.lineWidth = 5;
        this.contextReal.lineJoin = "miter";
        this.contextReal.beginPath();
        // this.contextReal.beginPath();
        // this.contextReal.moveTo(this.startX[0], this.startY[0]);
        // var i;
        // for (i = 0; i < this.startX.length; i++) {
        //     this.contextReal.lineTo(this.startX[i], this.startY[i]);
        // }
        // this.contextReal.lineTo(coord[0], coord[1]);
        this.origA = coord[0];
        this.origB = coord[1];
        this.startX.push(this.origA);
        this.startY.push(this.origB);
        if (Math.abs(this.origA - this.startX[0]) < 20 && Math.abs(this.origB - this.startY[0]) < 20 && this.startX.length > 1 && this.startY.length > 1) {
            this.mouseUp = true;
            // this.contextReal.lineTo(this.startX[0], this.startY[0]);
            // this.contextReal.beginPath();
            this.contextReal.moveTo(this.startX[0], this.startY[0]);
            var i;
            for (i = 0; i < this.startX.length; i++) {
                this.contextReal.lineTo(this.startX[i], this.startY[i]);
            }
            this.contextReal.lineTo(this.origA, this.origB);
            this.contextReal.fill();
            this.contextReal.stroke();
        }
    }
    onMouseMove(coord, event) {
        if (this.mouseUp == false) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.strokeStyle = rgbaColor3;
            this.contextDraft.fillStyle = rgbaColor2;
            this.contextDraft.lineWidth = 5;
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.startX[0], this.startY[0]);
            var i;
            for (i = 0; i < this.startX.length; i++) {
                this.contextDraft.lineTo(this.startX[i], this.startY[i]);
            }
            this.contextDraft.lineTo(coord[0], coord[1]);
            this.contextDraft.fill();
            this.contextDraft.stroke();
        }
    }
    onMouseLeave() { 
    }


}