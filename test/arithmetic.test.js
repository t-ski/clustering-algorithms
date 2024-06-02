const { MatrixArithmetic } = require("../build/arithmetic/MatrixArithmetic");
const { VectorArithmetic } = require("../build/arithmetic/VectorArithmetic");


test(
    MatrixArithmetic.identity([
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
    MatrixArithmetic.transpose([
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
    MatrixArithmetic.invert([
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
    MatrixArithmetic.normalize([
        [ 2, 3, 1 ],
        [ 4, 2, 3 ],
        [ 3, 2, 2 ]
    ]).map((vector) => VectorArithmetic.fix(vector, 1)),
    [
        [ 0.2, 0.4, 0.2 ],
        [ 0.4, 0.3, 0.5 ],
        [ 0.3, 0.3, 0.3 ]
    ]
);

test(
    MatrixArithmetic.multiply([
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
    MatrixArithmetic.multiply([
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
    MatrixArithmetic.power([
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
    VectorArithmetic.weight([ 2, 4, 1 ]),
    7
);

test(
    VectorArithmetic.sum([ 2, 4, 1 ], [ 3, 1, 2 ]),
    [ 5, 5, 3 ]
);

test(
    VectorArithmetic.scale([ 2, 4, 1 ], 2),
    [ 4, 8, 2 ]
);

test(
    VectorArithmetic.mean([ [ 2, 4, 1 ], [ 3, 1, 2 ] ]),
    [ 2.5, 2.5, 1.5 ]
);