import * as vectorArithmetic from "../../arithmetic/vector";
import { TCluster, TVector } from "../../types";
import { AClustering } from "../AClustering";
import { AHierarchyBasedClustering } from "./AHierarchyBasedClustering";


export class MedianLinkage extends AHierarchyBasedClustering {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}

	private median(cluster: TCluster): TVector {
		const orderedCluster = [ ...cluster ]
		.sort((a: TVector, b: TVector) => {
			return vectorArithmetic.weight(a) - vectorArithmetic.weight(b);
		});
		const i = Math.floor(cluster.length / 2);
		return !(cluster.length % 2)
			? vectorArithmetic.mean([ orderedCluster[i - 1], orderedCluster[i] ])
			: orderedCluster[i];
	}

	protected clusterDistance(c1: TCluster, c2: TCluster): number {
		return AClustering.distance(this.median(c1), this.median(c2));
	}
}