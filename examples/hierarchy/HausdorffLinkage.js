const { HausdorffLinkage } = require("../../build/api");

const clustering = new HausdorffLinkage(require("../data.vector.json"), 5);

plot(__filename, clustering.clusters);