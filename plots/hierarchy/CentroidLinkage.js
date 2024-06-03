const { CentroidLinkage } = require("../../build/api");

const clustering = new CentroidLinkage(DATA.vector, 4);

plot(__filename, clustering.clusters);