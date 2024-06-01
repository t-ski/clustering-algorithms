const { MedianLinkage } = require("../../build/api");

const clustering = new MedianLinkage(DATA.vector, 5);

plot(__filename, clustering.clusters);