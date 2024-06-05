const { util } = require("../build/api");


const DATA = {
    actual: [ 2, 6 ],
    expected: [ 7, -3 ]
}


test(
    Math.round(
        util.distance.euclidean(DATA.actual, DATA.expected)
    ),
    10
);

test(
    util.distance.manhattan(DATA.actual, DATA.expected),
    14
);

test(
    util.distance.chebyshev(DATA.actual, DATA.expected),
    6
);

test(
    parseFloat(
        util.distance.cosine(DATA.actual, DATA.expected)
        .toFixed(2)
    ),
    1.08
);