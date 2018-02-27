class DrawingStraightLine extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;    
    }

    onMouseDown(coord, event) {
        this.contextReal.strokeStyle = rgbaColor3;
        this.contextReal.lineWidth = 5;
        this.contextReal.beginPath();
        this.contextReal.moveTo(coord[0], coord[1]);
        this.origX = coord[0];
        this.origY = coord[1];
    }

    
    onDragging(coord, event) {
        this.contextDraft.strokeStyle = rgbaColor3;
        this.contextDraft.lineWidth = 5;
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.origX, this.origY);
        this.contextDraft.lineTo(coord[0], coord[1]);
        this.contextDraft.stroke();
    }

    onMouseMove() {}
    onMouseUp(coord, event) { 
        this.contextReal.lineTo(coord[0], coord[1]);
        this.contextReal.stroke();
    }

    onMouseLeave() { }
    onMouseEnter() { }


}