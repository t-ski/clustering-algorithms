import { TCluster, TVector } from "../../types";
import { AClustering } from "../AClustering";
import { AHierarchyBasedClustering } from "./AHierarchyBasedClustering";


export class SingleLinkage extends AHierarchyBasedClustering {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}
	
	protected clusterDistance(c1: TCluster, c2: TCluster): number {
		let min = Infinity;
		for(const p1 of c1) {
			for(const p2 of c2) {
				min = Math.min(AClustering.distance(p1, p2), min);
			}
		}
		return min;
	}
}