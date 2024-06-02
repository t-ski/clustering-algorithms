const { OPTICS } = require("../../build/api");


const optics1D = new OPTICS(DATA.VECTORS_1D, 3, 3);
test(
    optics1D.clusters,
    [
        [ [ -0.5 ], [ -0.35 ], [ -0.2 ] ]
    ]
);
test(
    optics1D.noise,
    [ [ 10 ], [ 15 ], [ 14 ], [ 17 ], [ 9 ] ]
);


const optics2D = new OPTICS(DATA.VECTORS_1D, 3, 3);
test(
    optics2D.clusters,
    [
        [ [ -0.5 ], [ -0.35 ], [ -0.2 ] ]
    ]
);
test(
    optics2D.noise,
    [ [ 10 ], [ 15 ], [ 14 ], [ 17 ], [ 9 ] ]
);