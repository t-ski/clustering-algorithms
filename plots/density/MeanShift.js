const { MeanShift } = require("../../build/api");

const clustering = new MeanShift(DATA.vector, 40);

plot(__filename, clustering.clusters);