var Monster = function(pos, AI) {
    pos: pos,
    color: "#ff0000",
    move_time: 250,
    moving: true,
    timer: 0,

    playerPosLastUpdate: [0, 0],
    playerMovedSinceLastUpdate: function(world) {
        return !posEquals(world.player.pos, this.playerPosLastUpdate);
    },

    // a pathfinder function is any function that takes in a start
    // position, a target position, and the world and returns an array
    // in the form [pathToTargetPosition, allExploredNodes]
    pathfinder: function(s, t, w) { return astar(s, t, w, posDistance) },
    //pathfinder: bfs,
    //pathfinder: dfs,

    path: [],
    considered: [],

    // AI functions take the world and update the monster accordingly.
    // Having this function as a property on the monster object allows
    // you to easily swap in different behaviors for the monster by changing
    // this function.
    runAI: AI

    draw: drawHunter
}
