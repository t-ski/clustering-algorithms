const { DBSCAN } = require("../../build/api");

const clustering = new DBSCAN(require("../data.vector.json"), 50, 4);

plot(__filename,
    clustering.clusters, clustering.noise
);