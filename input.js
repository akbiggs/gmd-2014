var clicked = false;
var removeTilesMode = false;
var mousePos = [0, 0];
var keys = []; // keys that are down
var keysTapped = []; // keys that went down on the current frame

window.onclick = function(e) {
    mousePos = [e.pageX, e.pageY];
    clicked = true;
}

window.onkeydown = function(e) {
    if (keys.indexOf(e.keyCode) === -1) {
        keys.push(e.keyCode);
        keysTapped.push(e.keyCode);
    }

    if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
    }
}

window.onkeyup = function(e) {
    keys.splice(keys.indexOf(e.keyCode), 1);
}

var keyTapped = function(c) {
    return keysTapped.indexOf(c.charCodeAt()) !== -1;
}

var moveOnChar = function(c, dir, obj) {
    if (keyTapped(c)) {
        obj.pos = posAdd(obj.pos, dir);
        obj.lastDir = dir;
    }
}

var inputEndOfFrame = function() {
    clicked = false;
    keysTapped = [];
}

