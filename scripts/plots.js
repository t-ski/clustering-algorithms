const {readdirSync, rmSync } = require("fs");
const { dirname, resolve, join } = require("path");

const { plot } = require("./plot");


const PLOTS_PATH = resolve("./plots/");


function toRawFilename(filename) {
    return filename.match(/[^/]+$/)[0].replace(/\.js$/i, "");
}

function runExamples(path) {
    readdirSync(path, {
        withFileTypes: true
    })
    .forEach(dirent => {
        const subPath = join(path, dirent.name);

        if(dirent.isDirectory()) {
            runExamples(subPath);

            return;
        }

        if(!/\.js$/.test(dirent.name)) return;
        
        rmSync(join(path, `${toRawFilename(dirent.name)}.png`), {
            force: true
        });
        
        console.log(`\x1b[2m${dirent.name}\x1b[0m`);
        
        require(subPath);
    });
}


global.DATA = {
    graph: require("./plots.data.graph.json"),
    vector: require("./plots.data.vector.json")
};

global.plot = function(filename, clusters, noiseCluster) {
    plot(
        dirname(filename),
        toRawFilename(filename),
        clusters, noiseCluster
    );
};


runExamples(PLOTS_PATH);