const { KMeansPP } = require("../../build/api");

const clustering = new KMeansPP(DATA.vector, 4);

plot(__filename, clustering.clusters);