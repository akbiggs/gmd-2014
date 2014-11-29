/***** SEARCH FUNCTIONS *****/
var bfs = function(start, target, world) {
    // explored is a list of all the tiles we've previously explored
    var explored = [];

    // to_search is a list of paths that we're currently searching for the
    // target on
    var to_search = [[start]]

    // while we haven't exhausted all of our options
    while (to_search.length > 0) {

        // get the next path to explore from the beginning of the list,
        // i.e. the oldest unexplored paths added to the list
        var current_path = to_search.shift();

        // the latest position on the path is the last element
        var current_pos = current_path[current_path.length - 1];

        // did we find the target?
        if (posEquals(current_pos, target)) {

            // return both the path to the target, and the list of explored
            // paths for reference. the latter is useful if we want to pick
            // a suboptimal path, or just display all the paths searched.
            return [current_path, explored];
        }

        // we didn't find the target, so grab all the adjacent positions
        // and explore those
        var adjs = adjacents(current_pos, world);
        for (var i = 0; i < adjs.length; i++) {
            var adj = adjs[i];

            // make sure we haven't explored this position before or we'll
            // infinitely loop if the target can't be found
            if (containsPos(explored, adj))
                continue;

            // add the new path to explore to the end of the search list, so
            // we don't explore it until after we've checked all the other
            // paths currently in our list
            to_search.push(current_path.concat([adj]));

            // mark this node as explored, so we don't explore it again later
            explored.push(adj);
        }
    }
    
    // we couldn't find the target, so no path exists.
    return [null, explored];
}

// basically the same as bfs, except we need to sort the points that we're
// going to explore next by the heuristic results.
var astar = function(start, target, world, heuristic) {

    var explored = [];
    var to_search = [[start]]

    while (to_search.length > 0) {
        var current_path = to_search.shift();
        var current_pos = current_path[current_path.length - 1];

        if (posEquals(current_pos, target))
            return [current_path, explored];
        var adjs = adjacents(current_pos, world);
        for (var i = 0; i < adjs.length; i++) {
            var adj = adjs[i];

            if (containsPos(explored, adj))
                continue;

            to_search.push(current_path.concat([adj]));
            explored.push(adj);

            // SORT PATHS TO EXPLORE NEXT BASED ON HEURISTIC
            to_search.sort(function(path1, path2) {
                var next1 = path1[path1.length - 1];
                var next2 = path2[path2.length - 1];

                return heuristic(next1, target) - heuristic(next2, target);
            })
        }
    }
    
    return [null, explored];
}

var distanceAStar = function(start, target, world) {
    return astar(start, target, world, posDistance);
}

var dfsRecursive = function(current, target, world, explored) {
    // make sure we haven't explored this position before
    if (containsPos(explored, current))
        return null;

    // check if we found the target
    if (posEquals(current, target))
        return [target];
    
    // mark this node as explored, so we don't check it later
    explored.push(current);

    // go through all the adjacent positions and explore them recursively.
    // Note that since adjacents always returns nodes in the same order of
    // direction, this will exhaust one direction until it can't explore
    // that direction anymore.
    var adjs = adjacents(current, world);
    for (var i = 0; i < adjs.length; i++) {
        var adj = adjs[i];

        // see if there's a path to the target from this adjacent node
        var adj_path = dfsRecursive(adj, target, world, explored);
        if (adj_path)
            return [current].concat(adj_path);
    }
    
    // no path exists from this node
    return null;
}

var dfs = function(start, target, world) {
    var explored = [];

    // explore recursively, bringing the results of what we explored
    // into the explored array so we can reference it later to see the
    // paths that were explored.
    return [dfsRecursive(start, target, world, explored), explored];
}

/***** INITIALIZATION + UPDATE/DRAW LOOP *****/

