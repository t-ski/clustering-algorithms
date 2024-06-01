const { DBSCAN } = require("../../build/api");

const clustering = new DBSCAN(DATA.vector, 50, 4);

plot(__filename,
    clustering.clusters, clustering.noise
);