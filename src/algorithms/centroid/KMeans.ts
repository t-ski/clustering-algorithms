import { TVector, TCluster } from "../../types";
import { VectorArithmetic } from "../../arithmetic/VectorArithmetic";
import { AClustering } from "../AClustering";
import { AVectorBasedClustering } from "../AVectorBasedClustering";


export class KMeans extends AVectorBasedClustering {
	protected readonly k: number;

	constructor(data: TVector[], k: number = 2) {
		super(data);

		this.k = k;
	}

	protected selectInitialCentroids(data: TVector[]): TVector[] {
		const intitialCentroids: Set<TVector> = new Set();
		while(intitialCentroids.size < this.k) {
			intitialCentroids.add(data[Math.round(Math.random() * (data.length - 1))]);
		}
		return Array.from(intitialCentroids);
	}
	
	protected computeNewCentroids(current: {
		centroids: TVector[];
		clusters: TCluster[];
	}): TVector[] {
		const { clusters: curClusters } = current;
		
		const newCentroids: TVector[] = [];
		for(const curCluster of curClusters) {
			newCentroids.push(VectorArithmetic.mean(curCluster));
		}
		return newCentroids;
	}
	
	protected cluster(data: TVector[]): TCluster[] {
    	let clusters: TCluster[] = [];
    	let centroids: TVector[] = this.selectInitialCentroids(data);
		
    	while(true) {
    		clusters = AClustering.initClusters(this.k);
			
    		for(const vector of data) {
    			let closestCentroid: TVector = centroids[0];
    			for(const centroid of centroids.slice(1)) {
    				closestCentroid = (AClustering.distance(vector, centroid) < AClustering.distance(vector, closestCentroid))
    					? centroid
    					: closestCentroid;
    			}
				
    			clusters[centroids.indexOf(closestCentroid)].push(vector);
    		}

    		const newCentroids: TVector[] = this.computeNewCentroids({
				centroids,
				clusters
			});

    		if(this.hasConverged(centroids, newCentroids, 1e-3)) break;

    		centroids = newCentroids;
    	}
		
    	return clusters;
	}
}