var FRACTURE_WIDTH = 30;
var FRACTURE_LENGTH = 60;

var FracturedBackground = function(width, height) {
    var polygons = [];
    var polywidth = width / FRACTURE_WIDTH;
    var polyheight = height / FRACTURE_LENGTH;

    for (var j = 0; j < polyheight; j++) {
        var x1 = 0, y1 = 0;
        var x2 = 0, y2 = 0;
        var x3 = 0, y3 = 0;
        var x4 = 0, y4 = 0;

        if (j === 0) {
            y1 = 0;
            y2 = FRACTURE_LENGTH;
            y3 = 0;
            y4 = FRACTURE_LENGTH;
        } else {
            y1 = polygons[(j - 1) * polywidth][1][1];
            y2 = polygons[(j - 1) * polywidth][1][1] + FRACTURE_LENGTH;
            y3 = polygons[(j - 1) * polywidth][1][1];
            y4 = polygons[(j - 1) * polywidth][1][1] + FRACTURE_LENGTH;
        }

        for (var i = 0; i < polywidth; i++) {
            if (i === 0) {
                x1 = 0;
                x2 = -FRACTURE_WIDTH / 2;
                x3 = FRACTURE_WIDTH;
                x4 = FRACTURE_WIDTH / 2;
            } else {
                x1 = polygons[i - 1][2][0];
                x2 = polygons[i - 1][3][0];
                x3 = polygons[i - 1][2][0] + FRACTURE_WIDTH;
                x4 = polygons[i - 1][3][0] + FRACTURE_WIDTH;
            }

            polygons.push([[x1, y1], [x2, y2], [x3, y3], [x4, y4], [255, 0, 0, 0]]);
        }
    }

    return {
        polygons: polygons,

        polywidth: polywidth,
        polyheight: polyheight,

        lightSources: [],

        update: updateFracturedBackground,
        draw: drawFracturedBackground
    };
}

var alphaCycler = cycle(0, 1, 500);

var updateFracturedBackground = function() {
    for (var i = 0; i < this.polygons.length; i++) {
        var col = i % this.polywidth;
        var row = Math.floor(i / this.polywidth);
        this.polygons[i][4][3] = alphaCycler(col * 50 + row * 50, Time.current)
    }
};

var drawFracturedBackground = function(ctx) {
    ctx.save();

    for (var i = 0; i < this.polygons.length; i++) {
        polygon(ctx, this.polygons[i]);
/*
        line(ctx, gon[0], gon[1]);
        line(ctx, gon[1], gon[3]);
        line(ctx, gon[0], gon[2]);
        line(ctx, gon[2], gon[3]);
*/
    }

    ctx.restore();
}
