import * as vectorArithmetic from "../../arithmetic/vector";
import { TCluster, TVector } from "../../types";
import { AHierarchyBasedClustering } from "./AHierarchyBasedClustering";
import { AClustering } from "../AClustering";


export class Ward extends AHierarchyBasedClustering {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}

	protected clusterDistance(c1: TCluster, c2: TCluster): number {
		return ((c1.length * c2.length) / (c1.length + c2.length))
			 * AClustering.distance(vectorArithmetic.mean(c1), vectorArithmetic.mean(c2));
	}
}