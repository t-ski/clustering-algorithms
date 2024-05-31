const { KMedoids } = require("../../build/api");


test(
    new KMedoids(DATA_1D).clusters,
    [
        [ [ -0.5 ], [ -0.35 ], [ -0.2 ] ],
        [ [ 9 ], [ 10 ], [ 14 ], [ 15 ], [ 17 ] ]
    ]
);

test(
    new KMedoids(DATA_1D, 3).clusters,
    [
        [ [ -0.5 ], [ -0.35 ], [ -0.2 ] ],
        [ [ 9 ], [ 10 ] ],
        [ [ 14 ], [ 15 ], [ 17 ] ]
    ]
);

test(
    new KMedoids(DATA_2D).clusters,
    [
        [ [ -0.5, 0 ], [ -0.2, -0.1 ], [ -0.35, 0.15 ] ],
        [ [ 12, 5 ], [ 10, 9 ], [ 15, 7 ], [ 17, 10 ], [ 14, 22 ] ]
    ]
);