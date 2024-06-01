const { util } = require("../build/api");


const PERSON = { age: 21 };

const VECTOR_DATA_MAP = new util.VectorDataMap([
    [ [ -10, -5 ], { age: 10 } ],
    [ [ -8, -9 ], { age: 9 } ],
    [ [ -9, 1 ], { age: 8 } ],

    [ [ 2, -1 ], { age: 20 } ],
    [ [ 0, 0 ], PERSON ],
    [ [ -1, 1 ], { age: 24 } ],
]);

const CLUSTERING = [
    [ [ -10, -5 ], [ -8, -9 ], [ -9, 1 ] ],
    [ [ 2, -1 ], [ 0, 0 ], [ -1, 1 ] ]
];


test(
    VECTOR_DATA_MAP.getVector(PERSON),
    [ 0, 0 ]
);


test(
    VECTOR_DATA_MAP.getEntity([ 0, 0 ]),
    PERSON
);


test(
    VECTOR_DATA_MAP.getCluster(CLUSTERING, PERSON),
    1
);
test(
    VECTOR_DATA_MAP.getCluster(CLUSTERING, [ -8, -9 ]),
    0
);