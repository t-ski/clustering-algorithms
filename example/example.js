const { DBSCAN, util } = require("../build/api");

const DATA = require("./example.data.json");


const dataMap = new util.VectorDataMap(DATA);
const clustering = new DBSCAN(dataMap.vectors, 50, 4);
const focusVector = [ 646.04912, 258.00177 ];

// CLUSTERING RESULTS
console.log("Clusters, Noise:");
console.log(clustering.clusters);
console.log(clustering.noise);

// FOCUSED VECTOR (ENTITY) IN CLUSTERING RESULTS
console.log(`\nFocus: ${
    dataMap.getEntity(focusVector)?.id
} | Cluster: ${
    dataMap.getCluster(clustering.clusters, focusVector)
}`);
console.groupEnd();