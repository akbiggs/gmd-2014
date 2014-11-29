function circle(ctx, center, radius) {      
    ctx.save();
    ctx.beginPath();

    ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI, false);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
    ctx.stroke();

    ctx.restore();
}

function line(ctx, start, end) {
    var x0 = Math.round(start[0]), y0 = Math.round(start[1]),
        x1 = Math.round(end[0]), y1 = Math.round(end[1]);

    var dx = Math.abs(x1-x0);
    var dy = Math.abs(y1-y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx-dy;

    while(true){
        ctx.fillRect(Math.round(x0),Math.round(y0), 1, 1);

        if ((x0==x1) && (y0==y1)) break;
        var e2 = 2*err;
        if (e2 >-dy){ err -= dy; x0  += sx; }
        if (e2 < dx){ err += dx; y0  += sy; }
    }
}

