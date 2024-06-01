/**
 * Import the clustering algorithm class and additional utilites.
 */
const { DBSCAN, util } = require("../build/api");

/**
 * Obtain the data that is ought to be cluster.
 */
const DATA = require("./example.data.json");


/**
 * Since the data is given as (vector, entity) tuples, preprocess
 * by vector data map utility class.
 */
const dataMap = new util.VectorDataMap(DATA);
/**
 * Define the clustering instance on the preprocessed vectors.
 */
const clustering = new DBSCAN(dataMap.vectors, 50, 4);
/**
 * Below is a vector that is focused for further insights.
 */
const focusVector = [ 646.04912, 258.00177 ];


/**
 * Print the clustering results, including to a supplementary
 * noise cluster (as the example uses DBSCAN).
 */
console.log("Clusters, Noise:");
console.log(clustering.clusters);
console.log(clustering.noise);

/**
 * Print the clustering quality according to the Silhouette
 * coefficient computed through the respectively accessible quality
 * helper utility.
 */
console.log(`\nQuality (Silhouette Coefficient): ${
    util.Quality.silhouetteCoefficient(clustering.clusters)
}`);

/**
 * Print specific information about the focused vector. Precisely, it
 * is the associated entity ID, as well as the index of the cluster it
 * was assigned to.
 */
console.log(`\nFocus: ${
    dataMap.getEntity(focusVector)?.id
} | Cluster: ${
    dataMap.getCluster(clustering.clusters, focusVector)
}`);