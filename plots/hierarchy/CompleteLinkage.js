const { CompleteLinkage } = require("../../build/api");

const clustering = new CompleteLinkage(DATA.vector, 4);

plot(__filename, clustering.clusters);