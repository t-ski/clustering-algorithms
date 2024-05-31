const { KMeans } = require("../../build/api");

const clustering = new KMeans(require("../data.vector.json"), 4);

plot(__filename, clustering.clusters);