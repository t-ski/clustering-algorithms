const { CompleteLinkage } = require("../../build/api");

const clustering = new CompleteLinkage(DATA.vector, 5);

plot(__filename, clustering.clusters);