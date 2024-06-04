const { Divisive } = require("../../build/api");

const clustering = new Divisive(DATA.graph, 4);

plot(__filename, clustering.clusters);