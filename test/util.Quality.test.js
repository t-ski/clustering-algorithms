const { util } = require("../build/api");


test(
    parseFloat(
        util.Quality.silhouetteCoefficient([
            [ [ -0.5, 0 ], [ -0.2, -0.1 ], [ -0.35, 0.15 ] ],
            [ [ 0.5, 0.7 ], [ 0.75, 0.62 ] ],
            [ [ 12, 15 ] ],
            [ [ 17, 17 ] ],
            [ [ 30, 41 ] ]
        ]
    ).toFixed(2)),
    0.91
);

test(
    parseFloat(
        util.Quality.silhouetteCoefficient([
            [ [ 0.5, 0.7 ], [ 0.75, 0.62 ], [ 30, 41 ] ],
            [ [ -0.35, 0.15 ] ],
            [ [ -0.5, 0 ], [ -0.2, -0.1 ], [ 17, 17 ], [ 12, 15 ] ]
        ]
    ).toFixed(2)),
    -0.22
);