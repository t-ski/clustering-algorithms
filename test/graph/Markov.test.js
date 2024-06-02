const { Markov } = require("../../build/api");


test(
    new Markov(DATA.ADJACENCY_MATRIX).clusters,
    [ [ 0 ], [ 1 ], [ 2, 3 ] ]
);