$('#doge').click(function(){
    var img = document.createElement("img");
    img.src = "./dogeHappy.jpg";
    img.onload = function () {
        contextReal.drawImage(img, 0, 0, canvasReal.width, canvasReal.height);
    }
});
