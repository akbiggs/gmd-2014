/* A position is an array with two values, where the first value represents
  the y-value and the second value represents the x-value. */
var posEquals = function(p1, p2) {
    return p1[0] === p2[0] && p1[1] === p2[1];
}

var posAdd = function(p1, p2) {
    return [p1[0] + p2[0], p1[1] + p2[1]];
}

var posMultiply = function(p1, p2) {
    // if no length property, assume it's a scalar value, and multiply both
    // dimensions of the other pos by it.
    if (!p2.length)
        p2 = [p2, p2];

    return [p1[0] * p2[0], p1[1] * p2[1]];
}

var posDistance = function(start, target) {
    return Math.abs(start[0] - target[0]) + Math.abs(start[1] - target[1]);
}

var containsPos = function(l, pos) {
    return l.some(function(v) { return posEquals(pos, v); });
}

var indexOfPos = function(l, pos) {
    for (var i = 0; i < l.length; i++) {
        if (posEquals(l[i], pos))
            return i;
    }
    return -1;
}

var posClone = function(pos) {
    return [pos[0], pos[1]];
}

var occupied = function(pos, world) {
    return pos[0] < 0 || pos[1] < 0 ||
        pos[0] >= world.tile_height || pos[1] >= world.tile_width ||
        containsPos(world.obstacles, pos);
}

var adjacents = function(pos, world) {
    north = posAdd(pos, [-1, 0]);
    south = posAdd(pos, [1, 0]);
    west = posAdd(pos, [0, -1]);
    east = posAdd(pos, [0, 1]);

    return [north, west, south, east].filter(function(v) {
        return !occupied(v, world);
    });
}


