import { TCluster, TVector } from "../../types";
import { AClustering } from "../AClustering";
import { AHierarchyBasedClustering } from "./AHierarchyBasedClustering";


export class AverageLinkage extends AHierarchyBasedClustering {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}

	protected clusterDistance(c1: TCluster, c2: TCluster): number {
		let sum = 0;
		for(const p1 of c1) {
			for(const p2 of c2) {
				sum += AClustering.distance(p1, p2);
			}
		}
		return sum / (c1.length * c2.length);
	}
}