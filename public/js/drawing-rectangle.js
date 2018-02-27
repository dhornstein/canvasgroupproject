class DrawingRectangle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;           
    }
    
    onMouseDown(coord,event){
        this.contextReal.fillStyle = rgbaColor2; //default style
        this.origX = coord[0]; //save coord of mouse down as starting ref. point
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.fillStyle = rgbaColor2; 
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height); //clear prev rec
        this.contextDraft.fillRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY);
        this,contextDraft.fill()
        //corners coord, width/height
        //create rec with fillStyle #f44
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height); //clear draft rec
        this.contextReal.fillRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY)
        //draw on realcanvas
    }
    onMouseLeave(){}
    onMouseEnter(){}
}