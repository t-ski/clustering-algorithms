const { util } = require("../build/api");


const CLUSTERING_GOOD = [
    [ [ -0.5, 0 ], [ -0.2, -0.1 ], [ -0.35, 0.15 ] ],
    [ [ 0.5, 0.7 ], [ 0.75, 0.62 ] ],
    [ [ 12, 15 ] ],
    [ [ 17, 17 ] ],
    [ [ 30, 41 ] ]
];
const CLUSTERING_BAD = [
    [ [ 0.5, 0.7 ], [ 0.75, 0.62 ], [ 30, 41 ] ],
    [ [ -0.35, 0.15 ] ],
    [ [ -0.5, 0 ], [ -0.2, -0.1 ], [ 17, 17 ], [ 12, 15 ] ]
];


// Silhouette → [-1,1] ↑
test(
    parseFloat(util.Quality.silhouetteCoefficient(CLUSTERING_GOOD).toFixed(2)),
    0.91
);
test(
    parseFloat(util.Quality.silhouetteCoefficient(CLUSTERING_BAD).toFixed(2)),
    -0.22
);


// Dunn → [0,+∞) ↑
test(
    parseFloat(util.Quality.dunnIndex(CLUSTERING_GOOD).toFixed(2)),
    3.2
);

test(
    parseFloat(util.Quality.dunnIndex(CLUSTERING_BAD).toFixed(3)),
    0.004
);


// Davies-Bouldin → [0,+∞) ↓
test(
    parseFloat(util.Quality.daviesBouldinIndex(CLUSTERING_GOOD).toFixed(2)),
    0.25
);
test(
    parseFloat(util.Quality.daviesBouldinIndex(CLUSTERING_BAD).toFixed(3)),
    2.999
);