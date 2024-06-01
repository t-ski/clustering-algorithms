const { CentroidLinkage } = require("../../build/api");

const clustering = new CentroidLinkage(DATA.vector, 5);

plot(__filename, clustering.clusters);