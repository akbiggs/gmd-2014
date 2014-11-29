var robotHunterAI = function(world) {
    var player = world.player;

    // only re-evaluate the path if the player moved since we last calculated
    // the path to them
    if (this.playerMovedSinceLastUpdate(world)) {

        this.playerPosLastUpdate = player.pos;

        var pathAndConsidered = this.pathfinder(this.pos, player.pos, world);
        this.path = pathAndConsidered[0];
        this.considered = pathAndConsidered[1];

        // remove the start node from the new path so the monster doesn't stay
        // in place
        if (this.path)
            this.path.shift();
    }

    // move the monster if we have a path and it should move
    if (this.moving && this.path && this.path.length > 0) {
        this.pos = this.path.shift();
    }
}

var drawHunter = function(ctx, world) {
    circle(ctx, this.pos, 20);
}
