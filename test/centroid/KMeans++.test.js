const { KMeansPP } = require("../../build/api");


// Results subject to chance (check cluster amounts)

test(
    new KMeansPP(DATA.VECTORS_1D).clusters,
    [
        [ [ -0.5 ], [ -0.35 ], [ -0.2 ] ],
        [ [ 10 ], [ 15 ], [ 9 ], [ 17 ], [ 14 ] ]
    ]
);

test(
    new KMeansPP(DATA.VECTORS_1D, 3).clusters.length,
    3
);

test(
    new KMeansPP(DATA.VECTORS_2D).clusters.length,
    2
);