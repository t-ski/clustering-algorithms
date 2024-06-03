const { HausdorffLinkage } = require("../../build/api");

const clustering = new HausdorffLinkage(DATA.vector, 4);

plot(__filename, clustering.clusters);