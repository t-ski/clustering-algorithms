const { MeanShift } = require("../../build/api");

const clustering = new MeanShift(require("../data.vector.json"), 40);

plot(__filename, clustering.clusters);