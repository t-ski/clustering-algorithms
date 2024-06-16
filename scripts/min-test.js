/*
 * MinTest https://github.com/t-ski/min-test
 * (c) Thassilo Martin Schiepanski
 */

const { resolve, join } = require("path");
const { readdirSync } = require("fs");
const { deepEqual } = require("assert");

// ------------------------------------------
const deepSort = (obj) => {
    if(
        [ "string", "number", "boolean" ]
        .includes(obj)
    ) return obj;
    if(Array.isArray(obj)) return obj.sort();
    for(const member in obj) {
        obj[member] = deepSort(obj[member]);
    }
    return obj;
};

global.DATA = {
    ...require("./test.data.vector"),
    ...require("./test.data.graph")
};
// ------------------------------------------

let i = 0;
global.test = function(actual, expected) {
    // ---------------------------
    actual = deepSort(actual);
    expected = deepSort(expected);
    // ---------------------------
    
    i++;

    const path = ((new Error()).stack || "").split(/\n/g)[2];
    
    try {
        deepEqual(actual, expected);

        console.log(`\x1b[32m✓ (${i})\x1b[0m`);
    } catch(err) {
        console.error(`\x1b[31m✗ (${i})\x1b[2m${path}:\x1b[0m`);
        console.log("\n\x1b[1m\x1b[2mACTUAL\x1b[0m");
        console.log(err.actual);
        console.log("\n\x1b[1m\x1b[2mEXPECTED\x1b[0m");
        console.log(err.expected);
        
        process.exit(1);
    }
};

process.on("exit", code => {
    !code && console.log("\x1b[32mAll tests passed.\x1b[0m");
});

readdirSync(resolve(process.argv.slice(2)[0] ?? "./test/"), {
    withFileTypes: true,
    recursive: true
})
.forEach(dirent => {
    if(!/\.test\.js$/.test(dirent.name)) return;
    require(join(dirent.path, dirent.name));
});
