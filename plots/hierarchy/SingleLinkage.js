const { SingleLinkage } = require("../../build/api");

const clustering = new SingleLinkage(DATA.vector, 5);

plot(__filename, clustering.clusters);