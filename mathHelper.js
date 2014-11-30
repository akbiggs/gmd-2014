var identity = function(v) { return v; }

var lerp = function(a, b, t, lerpFn) {
    if (!lerpFn) {
        lerpFn = identity;
    }
    return a + lerpFn(t) * (b - a);
}
