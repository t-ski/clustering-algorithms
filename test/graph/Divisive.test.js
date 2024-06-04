const { Divisive } = require("../../build/api");


test(
    new Divisive(DATA.ADJACENCY_MATRIX).clusters,
    [ [ 0, 1, 3 ], [ 2 ] ]
);

test(
    new Divisive(DATA.ADJACENCY_MATRIX, 3).clusters,
    [ [ 0 ], [ 1, 3 ], [ 2 ] ]
);