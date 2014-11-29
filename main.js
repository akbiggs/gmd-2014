window.onload = function() {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    var world = World(canvas.width, canvas.height, 30);

    setInterval(function() {
        update(world);
        draw(ctx, world);
    }, 1000/60);
}

var update = function(world) {
    worldUpdate(world);
    inputEndOfFrame();
}

var draw = function(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

/*
    var width = 600;
    for (var i = 0; i < width / 20; i++) {
        //ctx.beginPath();
        //ctx.moveTo(0,0);
        //ctx.lineTo(100, 100 - i * 10);
        //ctx.stroke();

        line(ctx, 0, 0, width, width - i * 10 + Math.round(Math.random() * 50));
    }
*/
    worldDraw(world);
}

