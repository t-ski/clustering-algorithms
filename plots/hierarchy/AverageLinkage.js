const { AverageLinkage } = require("../../build/api");

const clustering = new AverageLinkage(DATA.vector, 4);

plot(__filename, clustering.clusters);