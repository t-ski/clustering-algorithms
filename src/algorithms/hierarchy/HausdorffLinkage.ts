import { TCluster, TVector } from "../../types";
import { AClustering } from "../AClustering";
import { AHierarchyBasedClustering } from "./AHierarchyBasedClustering";


export class HausdorffLinkage extends AHierarchyBasedClustering {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}
	
	private directedMax(c1: TCluster, c2: TCluster): number {
		const mins: TVector = [];
		for(const p1 of c1) {
			let min = Infinity;
			for(const p2 of c2) {
				min = Math.min(AClustering.distance(p1, p2), min);
			}
			mins.push(min);
		}
		return Math.max(...mins);
	}

	protected clusterDistance(c1: TCluster, c2: TCluster): number {
		return Math.max(this.directedMax(c1, c2), this.directedMax(c2, c1));
	}
}