const { deepEqual } = require("assert");
const { resolve, join } = require("path");
const { readdirSync } = require("fs");


const TEST_PATH = resolve("./test/");


process.on("exit", code => {
    !code && console.log("\x1b[32mAll tests passed.\x1b[0m");
});


function runTests(path) {
    readdirSync(path, {
        withFileTypes: true
    })
    .forEach(dirent => {
        const subPath = join(path, dirent.name);

        if(dirent.isDirectory()) {
            runTests(subPath);

            return;
        }
        
        if(!/\.test\.js$/.test(dirent.name)) return;

        require(subPath);
    });
}


require("./test.data");

let i = 0;
global.test = function(actual, expected) {
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


runTests(TEST_PATH);