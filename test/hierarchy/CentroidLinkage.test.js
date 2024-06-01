const { CentroidLinkage } = require("../../build/api");


test(
    new CentroidLinkage(DATA_1D).clusters,
    [
        [ [ -0.5 ], [ -0.35 ], [ -0.2 ] ],
        [ [ 10 ], [ 9 ], [ 17 ], [ 15 ], [ 14 ] ]
    ]
);

test(
    new CentroidLinkage(DATA_1D, 3).clusters,
    [
        [ [ -0.5 ], [ -0.35 ], [ -0.2 ] ],
        [ [ 10 ], [ 9 ] ],
        [ [ 17 ], [ 15 ], [ 14 ] ]
    ]
);

test(
    new CentroidLinkage(DATA_2D).clusters,
    [
        [ [ -0.2, -0.1 ], [ -0.5, 0 ], [ -0.35, 0.15 ] ],
        [ [ 14, 22 ], [ 17, 10 ], [ 10, 9 ], [ 15, 7 ], [ 12, 5 ] ]
    ]
);