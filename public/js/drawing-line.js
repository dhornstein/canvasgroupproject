class DrawingLine extends PaintFunction{
    constructor(contextReal){
        super(); //inherit PaintFunction
        this.context = contextReal;            
    }
    
    onMouseDown(coord,event){
        this.context.strokeStyle = rgbaColor3;
        this.context.lineJoin = "round";
        this.context.lineWidth = 5; //default styles
        this.context.beginPath();
        this.context.moveTo(coord[0],coord[1]); //move to the point that mouse was pressed down
        this.draw(coord[0],coord[1]); //draw at the same point
    }
    onDragging(coord,event){
        this.draw(coord[0],coord[1]); //draw along the path of dragging
    }

    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

    draw(x,y){
        this.context.lineTo(x,y); //start
        this.context.moveTo(x,y); //end
        this.context.closePath(); //close (terminate path)
        this.context.stroke();    //initiate
    }
}