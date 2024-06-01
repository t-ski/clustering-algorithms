const { CentroidLinkage } = require("../../build/api");

const clustering = new CentroidLinkage(require("../data.vector.json"), 5);

plot(__filename, clustering.clusters);