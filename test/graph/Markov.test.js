const { Markov } = require("../../build/api");


test(
    new Markov(DATA.ADJACENCY_MATRIX, 2, 7).clusters,
    [ [ 0 ], [ 1, 3 ], [ 2 ] ]
);