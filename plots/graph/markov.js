const { Markov } = require("../../build/api");

const clustering = new Markov(DATA.graph, 2, 2);

plot(__filename, clustering.clusters);