import { TVector, TCluster } from "../../types";
import { AVectorBasedClustering } from "../AVectorBasedClustering";


export abstract class ACentroidBasedClustering extends AVectorBasedClustering {
	protected readonly k: number;

	constructor(data: TVector[], k: number = 2) {
		super(data);

		this.k = k;
	}

	protected abstract selectInitialCentroids(data: TVector[]): TVector[];
	protected abstract computeNewCentroids(current: {
		centroids: TVector[];
		clusters: TCluster[];
	}): TVector[];
}