const { CompleteLinkage } = require("../../build/api");

const clustering = new CompleteLinkage(require("../data.vector.json"), 5);

plot(__filename, clustering.clusters);