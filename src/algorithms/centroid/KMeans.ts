import { TVector, TCluster } from "../../types";
import { VectorArithmetic } from "../../arithmetic/VectorArithmetic";
import { ACentroidBasedClustering } from "./ACentroidBasedClustering";


export class KMeans extends ACentroidBasedClustering {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}

	protected selectInitialCentroids(): TVector[] {
		const intitialCentroids: Set<TVector> = new Set();
		while(intitialCentroids.size < this.k) {
			intitialCentroids.add(this.data[Math.round(Math.random() * (this.data.length - 1))]);
		}
		return Array.from(intitialCentroids);
	}
	
	protected computeNewCentroid(cluster: TCluster): TVector {
		return VectorArithmetic.mean(cluster);
	}
}