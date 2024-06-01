const { SingleLinkage } = require("../../build/api");

const clustering = new SingleLinkage(require("../data.vector.json"), 5);

plot(__filename, clustering.clusters);