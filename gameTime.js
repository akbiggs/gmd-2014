Time = {
    current: 0,
    update: function(dt) {
        this.current += dt;
    }
}

var makeTimeFn = function(timeDifferenceFn) {
    return function(startTime, currentTime) {
        return timeDifferenceFn(currentTime - startTime);
    }
}

var timer = function(duration, callback) {
    var fired = false;
    return makeTimeFn(function(elapsed) {
        if (!fired && elapsed >= duration) {
            callback();
            fired = true;
        }
    });
}

var cycle = function(startValue, endValue, cycleDuration, lerpFn) {
    if (!lerpFn) {
        lerpFn = Math.sin;
    }

    return makeTimeFn(function(elapsed) {
        var cycle = Math.floor(elapsed / cycleDuration);
        var t = (elapsed % cycleDuration) / cycleDuration;

        if (cycle % 2 == 0) {
            return lerp(startValue, endValue, t, lerpFn);
        } else {
            return lerp(endValue, startValue, t, lerpFn);
        }
    });
}

