const { ConnectedComponents } = require("../../build/api");


test(
    new ConnectedComponents(DATA.ADJACENCY_MATRIX).clusters,
    [ [ 0, 1, 3 ], [ 2 ] ]
);