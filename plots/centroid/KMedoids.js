const { KMedoids } = require("../../build/api");

const clustering = new KMedoids(DATA.vector, 4);

plot(__filename, clustering.clusters);