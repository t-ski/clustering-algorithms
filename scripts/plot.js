const { writeFileSync, readFileSync, existsSync, rmSync, mkdirSync } = require("fs");
const { join, resolve, dirname } = require("path");

const { Resvg } = require("@resvg/resvg-js");


const PLOT_SVG = readFileSync(join(__dirname, "./plot.base.svg")).toString();
const PLOT_SVG_SIZE = 50;
const BASE_CLUSTER_COLOR = "0040A0";
const NOISE_COLOR = "E0E0E0";


process.on("exit", code => {
    !code && console.log("\x1b[32mExamples run.\x1b[0m");
});


function rotateColorHue(hexColor, angle) {
    let r = parseInt(hexColor.slice(0, 2), 16) / 255;
    let g = parseInt(hexColor.slice(2, 4), 16) / 255;
    let b = parseInt(hexColor.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const delta = max - Math.min(r, g, b);
    
    let hue = 0;
    if (delta === 0) {
        hue = 0;
    } else if (max === r) {
        hue = ((g - b) / delta) % 6;
    } else if (max === g) {
        hue = (b - r) / delta + 2;
    } else {
        hue = (r - g) / delta + 4;
    }
    hue = Math.round(hue * 60);
    hue = (hue + angle) % 360;
    hue += (hue < 0) ? 360 : 0;
    
    const c = (1 - Math.abs(2 * max - 1)) * delta;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = max - c / 2;
    if (hue < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (hue < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (hue < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (hue < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (hue < 300) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }
    
    return ((Math.round((r + m) * 255) << 16) + (Math.round((g + m) * 255) << 8) + Math.round((b + m) * 255))
        .toString(16)
        .padStart(6, "0");
}


module.exports.plot = function(path, filename, clusters, noise) {
    clusters = (!Array.isArray((clusters[0] || [])[0]))
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
    
    const scaleFactor = PLOT_SVG_SIZE / Math.max(PLOT_SVG_SIZE, Math.max(...clusters.concat(noise ? [ noise ] : []).flat(2)));
    const generateClusterGroup = (cluster, index) => {
        return `\t<g>\n${
            cluster.map((vector) => {
                return `\t\t<circle ${[
                    `style="fill: #${
                        (index === -1)
                        ? NOISE_COLOR
                        : rotateColorHue(BASE_CLUSTER_COLOR, (360 / clusters.length) * index)
                    };"`,
                    `cx="${vector[0] * scaleFactor}"`,
                    `cy="${(vector[1] || 0) * scaleFactor}"`,
                    `r="${(index === -1) ? 0.275 : 0.35}"`
                ].join(" ")}/>`
            })
            .join("\n")
        }\n\t</g>`;
    };

    const groups = clusters
    .map(generateClusterGroup)
    .concat(noise ? [ generateClusterGroup(noise, -1) ] : [])
    .join("\n");

    const svg = PLOT_SVG.replace(/ *<!-- *@ * -->/, groups);
    const resvg = new Resvg(svg, {
        background: "#FFFFFF",
        fitTo: {
            mode: "width",
            value: 600,
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