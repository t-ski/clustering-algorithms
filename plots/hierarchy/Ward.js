const { Ward } = require("../../build/api");

const clustering = new Ward(DATA.vector, 4);

plot(__filename, clustering.clusters);