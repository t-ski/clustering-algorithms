const { MedianLinkage } = require("../../build/api");

const clustering = new MedianLinkage(DATA.vector, 4);

plot(__filename, clustering.clusters);