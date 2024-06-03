const { MeanShift } = require("../../build/api");

const clustering = new MeanShift(DATA.vector, 50);

plot(__filename, clustering.clusters);