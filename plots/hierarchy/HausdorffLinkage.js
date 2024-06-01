const { HausdorffLinkage } = require("../../build/api");

const clustering = new HausdorffLinkage(DATA.vector, 5);

plot(__filename, clustering.clusters);