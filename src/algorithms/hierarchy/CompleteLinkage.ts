import { TCluster, TVector } from "../../types";
import { AClustering } from "../AClustering";
import { AHierarchyBasedClustering } from "./AHierarchyBasedClustering";


export class CompleteLinkage extends AHierarchyBasedClustering {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}

	protected clusterDistance(c1: TCluster, c2: TCluster): number {
		let max = -Infinity;
		for(const p1 of c1) {
			for(const p2 of c2) {
				max = Math.max(AClustering.distance(p1, p2), max);
			}
		}
		return max;
	}
}