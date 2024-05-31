const { KMedoids } = require("../../build/api");

const clustering = new KMedoids(require("../data.vector.json"), 4);

plot(__filename, clustering.clusters);