const { Distance } = require("../build/util/Distance");


const DATA = {
    actual: [ 2, 6 ],
    expected: [ 7, -3 ]
}


test(
    Math.round(
        Distance.euclidean(DATA.actual, DATA.expected)
    ),
    10
);

test(
    Distance.manhattan(DATA.actual, DATA.expected),
    14
);

test(
    Distance.chebyshev(DATA.actual, DATA.expected),
    6
);

test(
    parseFloat(
        Distance.cosine(DATA.actual, DATA.expected)
        .toFixed(2)
    ),
    1.08
);