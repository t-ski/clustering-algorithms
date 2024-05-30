const { writeFileSync, readFileSync, existsSync, rmSync, mkdirSync } = require("fs");
const { join, resolve, dirname } = require("path");

const { Resvg } = require("@resvg/resvg-js");


const PLOT_SVG = readFileSync(join(__dirname, "./plot.base.svg")).toString();
const PLOT_SVG_SIZE = 50;
const BASE_CLUSTER_COLOR = "0080D0";
const NOISE_COLOR = "E0E0E0";


process.on("exit", code => {
    !code && console.log("\x1b[32mExamples run.\x1b[0m");
});


module.exports.plot = function(path, filename, clusters, noise) {
    clusters = (typeof(clusters[0]) === "number")
    ? clusters.map((cluster, i) => {
        return cluster
        .map((_, j) => [ j * (PLOT_SVG_SIZE / 10), i * PLOT_SVG_SIZE ]);
    })
    : clusters;

    let i = 0;
    let pngPath;
    while(pngPath = resolve(path, `${filename}-${i++}.png`)) {
        if(!existsSync(pngPath)) break;
        
        rmSync(pngPath);
    }

    if(!Array.isArray(clusters)) return;
    
    const drawClusters = clusters.concat(noise ? [ noise ] : []);
    
    let max = -Infinity;
    for(let cluster of drawClusters) {
        for(vector of cluster) {
            if(!Array.isArray(vector)) return;

            max = Math.max(max, Math.max(...vector));
        }
    }

    const scaleFactor = PLOT_SVG_SIZE / Math.max(PLOT_SVG_SIZE, max);
    const groups = drawClusters
    .map((cluster, j) => {
        const isNoise = noise && ((j + 1) === drawClusters.length);
        const color = !isNoise
        ? ((parseInt(`0x${BASE_CLUSTER_COLOR}`) + (((16**6 - 1) / drawClusters.length) * j)) % (16**6 - 1))
            .toString(16)
            .padStart(6, "0")
        : NOISE_COLOR;

        return `\t<g>\n${
            cluster.map((vector) => {
                return `\t\t<circle ${[
                    `style="fill: #${color};"`,
                    `cx="${vector[0] * scaleFactor}"`,
                    `cy="${(vector[1] || 0) * scaleFactor}"`,
                    `r="${!isNoise ? 0.35 : 0.275}"`
                ].join(" ")}/>`
            })
            .join("\n")
        }\n\t</g>`;
    })
    .join("\n");

    const svg = PLOT_SVG.replace(/ *<!-- *@ * -->/, groups);
    const resvg = new Resvg(svg, {
        background: "#FFFFFF",
        fitTo: {
            mode: "width",
            value: 800,
        }
    })

    i = 0;
    do {
        pngPath = resolve(path, `${filename}-${i++}.png`);
    } while(existsSync(pngPath));

    mkdirSync(dirname(pngPath), {
        recursive: true
    });
    writeFileSync(pngPath, resvg.render().asPng(), (err) => {
        if(err) throw err;
    });
};