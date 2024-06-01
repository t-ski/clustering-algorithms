const { AverageLinkage } = require("../../build/api");

const clustering = new AverageLinkage(DATA.vector, 5);

plot(__filename, clustering.clusters);