var World = function(width, height, tilesize) {
    var tile_width = Math.floor(width / tilesize);
    var tile_height = Math.floor(height / tilesize);

    return {
        width: width,
        height: height,

        debug: true,

        tile_width: tile_width,
        tile_height: tile_height,
        tilesize: tilesize,

        ground_color: "#00ff00",
        showConsidered: true,
        showPath: true,

        tiles: [],

        player: {
            pos: [0, 0],
            color: "#0000ff",
            lastDir: [0, 0]
        },

        monsters: [Hunter([Math.floor(width / 2), Math.floor(height / 2)])]
    }
}

var worldUpdate = function(world) {
/*
    // move the monster occasionally
    world.monster.timer += 1000 / 60;
    if (world.monster.timer >= world.monster.move_time) {
        world.monster.runAI(world);
        world.monster.timer = 0;
    }

    var player = world.player;
    var prevPos = player.pos;

    moveOnChar('W', [0, -1], player);
    moveOnChar('A', [-1, 0], player);
    moveOnChar('S', [0, 1], player);
    moveOnChar('D', [1, 0], player);

    // we attempted to move the player, but if they've hit an obstacle
    // return them to where they were before they moved.
    if (occupied(player.pos, world)) {
        player.pos = prevPos;
    }

    // DEBUG KEYS -- USED TO CONTROL SEARCH ALGORITHM + DEBUG INFO FOR DEMO
    /*
    if (keyTapped('C')) {
        world.showConsidered = !world.showConsidered;
    }
    if (keyTapped('X')) {
        world.showPath = !world.showPath;
    }
    if (keyTapped('B')) {
        world.monster.pathfinder = bfs;
    }
    if (keyTapped('N')) {
        world.monster.pathfinder = dfs;
    }
    if (keyTapped('M')) {
        world.monster.pathfinder = distanceAStar;
    }

    if (keyTapped('O')) {
        world.monster.move_time += 100;
    }
    if (keyTapped('P')) {
        world.monster.move_time = Math.max(0, world.monster.move_time - 100);
    }

    if (keyTapped('R')) {
        removeTilesMode = !removeTilesMode;
    }

    if (keyTapped('U')) {
        world.monster.moving = !world.monster.moving;
    }
    */

    // ADD/REMOVE TILES
    if (clicked) {
        var tileX = Math.floor((mousePos[0] - 14) / world.tilesize);
        var tileY = Math.floor((mousePos[1] - 11) / world.tilesize);
        var tilePos = [tileX, tileY];

        if (!(removeTilesMode || occupied(tilePos, world))) {
            world.tiles.push(tilePos);
        } else if (removeTilesMode) {
            var index = indexOfPos(world.tiles, tilePos);
            if (index !== -1) 
                world.tiles.splice(index, 1);
        }

        // recompute the path to the player on the next update, since we added
        // or removed a tile which might mess with the monster's path
        for (var i = 0; i < world.monsters.length; i++) {
            world.monsters[i].playerPosLastUpdate = [-1, -1];
        }
    }
};

var worldDraw = function(ctx, world) {
    // need to clear the previous frame
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // stroke everything black
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    
    worldDrawDebug(ctx, world);

    for (var i = 0; i < world.monsters.length; i++) {
        world.monsters[i].draw(ctx, world);
    }
};

var worldDrawGrid = function(ctx, world) {
    var tilesize = world.tilesize;

    for (var row = 0; row < world.tile_height; row++) {
        for (var col = 0; col < world.tile_width; col++) {
            var pos = [col, row];

            // shade tiles different colors depending on their properties
            if (occupied(pos, world)) {
                ctx.fillStyle = "#aaa";
            } else if (posEquals(pos, world.monster.pos)) {
                ctx.fillStyle = world.monster.color;
            } else if (posEquals(pos, world.player.pos)) {
                ctx.fillStyle = world.player.color;
            } else if (world.showPath && world.monster.path && containsPos(world.monster.path, pos)) {
                ctx.fillStyle = "#ffaa00";
            } else if (world.showConsidered && containsPos(world.monster.considered, pos)) {
                ctx.fillStyle = "#00aaff";
            } else {
                ctx.fillStyle = world.ground_color;
            }

            ctx.fillRect(col * tilesize, row * tilesize, tilesize, tilesize);
            ctx.strokeRect(col * tilesize, row * tilesize, tilesize, tilesize);
        }
    }
}

var worldDrawDebug = function(ctx, world) {
}
