$('#drawing-line').click(() => {
    currentFunction = new DrawingLine(contextReal, contextDraft);
});
$('#drawing-rectangle').click(() => {
    currentFunction = new DrawingRectangle(contextReal, contextDraft);
});
$('#drawing-circle').click(() => {
    currentFunction = new DrawingCircle(contextReal, contextDraft);
});
$('#eraser').click(() => {
    currentFunction = new Eraser(contextReal);
});
$('#clear').click(() => {
    let canvas = $('#canvas-real')[0];
    canvas.width = canvas.width;
    let canvas2 = $('#canvas-draft')[0];
    canvas2.width = canvas2.width;
});
$('#drawing-straightLine').click(() => {
    currentFunction = new DrawingStraightLine(contextReal, contextDraft);
});
$('#drawing-polygon').click(() => {
    currentFunction = new DrawingPolygon(contextReal, contextDraft);
});
currentFunction = new DrawingRectangle(contextReal, contextDraft);
