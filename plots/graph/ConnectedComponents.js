const { ConnectedComponents } = require("../../build/api");

const clustering = new ConnectedComponents(DATA.graph);

plot(__filename, clustering.clusters);