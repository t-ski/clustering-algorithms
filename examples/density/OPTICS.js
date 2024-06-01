const { OPTICS } = require("../../build/api");

const clustering = new OPTICS(require("../data.vector.json"), 50, 4);

plot(__filename,
    clustering.clusters, clustering.noise
);