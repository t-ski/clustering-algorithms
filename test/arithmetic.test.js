const matrixArithmetic = require("../build/arithmetic/matrix-arithmetic");
const vectorArithmetic = require("../build/arithmetic/vector-arithmetic");


test(
    matrixArithmetic.identity([
        [ 2, 3, 1 ],
        [ 4, 2, 3 ],
        [ 3, 2, 2 ]
    ]),
    [
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ]
    ]
);

test(
    matrixArithmetic.transpose([
        [ 2, 3, 1 ],
        [ 4, 2, 3 ],
        [ 3, 2, 2 ]
    ]),
    [
        [ 2, 4, 3 ],
        [ 3, 2, 2 ],
        [ 1, 3, 2 ]
    ]
);

test(
    matrixArithmetic.invert([
        [ 2, 3, 1 ],
        [ 4, 2, 3 ],
        [ 3, 2, 2 ]
    ]),
    [
        [ -2, -4, 7 ],
        [ 1, 1, -2 ],
        [ 2, 5, -8 ]
    ]
);

test(
    matrixArithmetic.normalize([
        [ 2, 3, 1 ],
        [ 4, 2, 3 ],
        [ 3, 2, 2 ]
    ]).map((vector) => vectorArithmetic.fix(vector, 1)),
    [
        [ 0.2, 0.4, 0.2 ],
        [ 0.4, 0.3, 0.5 ],
        [ 0.3, 0.3, 0.3 ]
    ]
);

test(
    matrixArithmetic.multiply([
        [ 2, 3, 1 ],
        [ 4, 2, 3 ],
        [ 3, 2, 2 ]
    ], [
        [ 2, 1, 2 ],
        [ 3, 1, 4 ],
        [ 1, 4, 2 ]
    ]),
    [
        [ 14, 9, 18 ],
        [ 17, 18, 22 ],
        [ 14, 13, 18 ]
    ]
);

test(
    matrixArithmetic.multiply([
        [ 2, 3, 1 ],
        [ 4, 2, 3 ]
    ], [
        [ 2, 1 ],
        [ 3, 1 ],
        [ 1, 4 ]
    ]),
    [
        [ 14, 9 ], [ 17, 18 ]
    ]
);

test(
    matrixArithmetic.power([
        [ 2, 3, 1 ],
        [ 4, 2, 3 ],
        [ 3, 2, 2 ]
    ], 3),
    [
        [ 133, 111, 87 ],
        [ 186, 151, 123 ],
        [ 147, 120, 97 ]
    ]
);


test(
    vectorArithmetic.weight([ 2, 4, 1 ]),
    7
);

test(
    vectorArithmetic.sum([ 2, 4, 1 ], [ 3, 1, 2 ]),
    [ 5, 5, 3 ]
);

test(
    vectorArithmetic.scale([ 2, 4, 1 ], 2),
    [ 4, 8, 2 ]
);

test(
    vectorArithmetic.mean([ [ 2, 4, 1 ], [ 3, 1, 2 ] ]),
    [ 2.5, 2.5, 1.5 ]
);