const { MedianLinkage } = require("../../build/api");

const clustering = new MedianLinkage(require("../data.vector.json"), 5);

plot(__filename, clustering.clusters);