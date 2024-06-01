import { TVector, TCluster } from "../../types";
import { VectorArithmetic } from "../../arithmetic/VectorArithmetic";
import { AClustering } from "../AClustering";
import { ACentroidBasedClustering } from "./ACentroidBasedClustering";


export class KMedoids extends ACentroidBasedClustering {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}
	
	protected selectInitialCentroids(): TVector[] {
		this.data.sort((a: TVector, b: TVector) => {
			return VectorArithmetic.weight(a) - VectorArithmetic.weight(b);
		});
		
		const intitialCentroids: TVector[] = [];
		for(let i = 1; i <= this.k; i++) {
			intitialCentroids.push(this.data[i * Math.floor(this.data.length / (this.k + 1))]);
		}
		return intitialCentroids;
	}
	
	protected computeNewCentroid(cluster: TCluster): TVector {
		const medoid = {
			vector: [] as TVector,
			distance: Infinity
		};
        
		for(let i = 0; i < cluster.length; i++) {
			let totalDistance = 0;
			for(let j = 0; j < cluster.length; j++) {
				totalDistance += AClustering.distance(cluster[i], cluster[j]);
			}
			totalDistance /= cluster.length;
            
			if(totalDistance >= medoid.distance) continue;

			medoid.vector = cluster[i];
			medoid.distance = totalDistance;
		}

		return medoid.vector;
	}
}