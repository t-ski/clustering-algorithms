import { TVector, TCluster } from "../../types";
import { AClustering } from "../AClustering";
import { ACentroidBasedClustering } from "./ACentroidBasedClustering";


export class KMedoids extends ACentroidBasedClustering {
	constructor(data: TVector[], k?: number) {
		super(data, k);
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