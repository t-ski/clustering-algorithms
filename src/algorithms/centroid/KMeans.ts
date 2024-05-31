import { TVector, TCluster } from "../../types";
import { VectorArithmetic } from "../../arithmetic/VectorArithmetic";
import { ACentroidBasedClustering } from "./ACentroidBasedClustering";


export class KMeans extends ACentroidBasedClustering {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}

	protected computeNewCentroid(cluster: TCluster): TVector {
		return VectorArithmetic.mean(cluster);
	}
}