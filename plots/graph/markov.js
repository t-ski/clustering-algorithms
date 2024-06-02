const { Markov } = require("../../build/api");

const clustering = new Markov(DATA.graph, 3, 2);

plot(__filename, clustering.clusters);