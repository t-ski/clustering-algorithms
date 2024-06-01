const { OPTICS } = require("../../build/api");

const clustering = new OPTICS(DATA.vector, 50, 4);

plot(__filename,
    clustering.clusters, clustering.noise
);