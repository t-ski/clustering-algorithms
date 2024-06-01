const { AverageLinkage } = require("../../build/api");

const clustering = new AverageLinkage(require("../data.vector.json"), 5);

plot(__filename, clustering.clusters);