const { DBSCAN } = require("../../build/api");


const dbscan1D = new DBSCAN(DATA_1D, 3, 3);
test(
    dbscan1D.clusters,
    [
        [ [ -0.5 ], [ -0.35 ], [ -0.2 ] ],
        [ [ 15 ], [ 17 ], [ 14 ] ]
    ]
);
test(
    dbscan1D.noise,
    [ [ 10 ], [ 9 ] ]
);


const dbscan2D = new DBSCAN(DATA_1D, 3, 3);
test(
    dbscan2D.clusters,
    [
        [ [ -0.5 ], [ -0.35 ], [ -0.2 ] ],
        [ [ 15 ], [ 17 ], [ 14 ] ]
    ]
);
test(
    dbscan2D.noise,
    [ [ 10 ], [ 9 ] ]
);