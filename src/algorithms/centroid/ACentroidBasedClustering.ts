import { TVector, TCluster } from "../../types";
import { AClustering } from "../AClustering";
import { AVectorBasedClustering } from "../AVectorBasedClustering";


export abstract class ACentroidBasedClustering extends AVectorBasedClustering {
	protected readonly k: number;

	constructor(data: TVector[], k: number = 2) {
		super(data);

		this.k = k;
	}

    protected abstract selectInitialCentroids(): TVector[];
    protected abstract computeNewCentroid(cluster: TCluster): TVector;
	
    protected cluster(): TCluster[] {
    	let clusters: TCluster[] = [];

    	let centroids: TVector[] = this.selectInitialCentroids();
        
    	while(true) {
    		clusters = AClustering.initClusters(this.k);
			
    		for(const vector of this.data) {
    			let closestCentroid: TVector = centroids[0];
    			for(const centroid of centroids.slice(1)) {
    				closestCentroid = (AClustering.distance(vector, centroid) < AClustering.distance(vector, closestCentroid))
    					? centroid
    					: closestCentroid;
    			}
				
    			clusters[centroids.indexOf(closestCentroid)].push(vector);
    		}

    		const newCentroids: TVector[] = [];
    		for(let i = 0; i < clusters.length; i++) {
    			newCentroids.push(this.computeNewCentroid(clusters[i]) ?? centroids[i]);
    		}

    		if(this.hasConverged(centroids, newCentroids, 1e-3)) break;

    		centroids = newCentroids;
    	}
		
    	return clusters;
    }
}