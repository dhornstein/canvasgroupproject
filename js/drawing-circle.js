class DrawingCircle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }
    onMouseDown(coord, event) {
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord, event) {
        this.contextDraft.strokeStyle = rgbaColor3;
        this.contextDraft.fillStyle = rgbaColor2;
        this.contextDraft.lineWidth = 5;
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.ellipse(this.origX+(coord[0]-this.origX)/2, this.origY+(coord[1]-this.origY)/2, 
        Math.abs(coord[0]-this.origX)/2, Math.abs(coord[1]-this.origY)/2, 0, Math.PI*2, false)
        this.contextDraft.fill();
        this.contextDraft.stroke(); 
    }
    onMouseMove() {
    }
    onMouseUp(coord) {
        this.contextReal.strokeStyle = rgbaColor3;
        this.contextReal.fillStyle = rgbaColor2;
        this.contextReal.lineWidth = 5;
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.ellipse(this.origX+(coord[0]-this.origX)/2, this.origY+(coord[1]-this.origY)/2, 
        Math.abs(coord[0]-this.origX)/2, Math.abs(coord[1]-this.origY)/2, 0, Math.PI*2, false)
        this.contextReal.fill();
        this.contextReal.stroke();
    }
    onMouseLeave() { }
    onMouseEnter() { }
}
