const { KMeans } = require("../../build/api");

const clustering = new KMeans(DATA.vector, 4);

plot(__filename, clustering.clusters);