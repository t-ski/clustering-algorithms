const { util } = require("../build/api");


const DATA = {
    actual: [ 2, 6 ],
    expected: [ 7, -3 ]
}


test(
    Math.round(
        util.Distance.euclidean(DATA.actual, DATA.expected)
    ),
    10
);

test(
    util.Distance.manhattan(DATA.actual, DATA.expected),
    14
);

test(
    util.Distance.chebyshev(DATA.actual, DATA.expected),
    6
);

test(
    parseFloat(
        util.Distance.cosine(DATA.actual, DATA.expected)
        .toFixed(2)
    ),
    1.08
);