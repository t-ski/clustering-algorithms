const { SingleLinkage } = require("../../build/api");

const clustering = new SingleLinkage(DATA.vector, 4);

plot(__filename, clustering.clusters);