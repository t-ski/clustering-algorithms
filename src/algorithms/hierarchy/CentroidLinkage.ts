import { TCluster, TVector } from "../../types";
import * as vectorArithmetic from "../../arithmetic/vector";
import { AClustering } from "../AClustering";
import { AHierarchyBasedClustering } from "./AHierarchyBasedClustering";


export class CentroidLinkage extends AHierarchyBasedClustering {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}

	protected clusterDistance(c1: TCluster, c2: TCluster): number {
		return AClustering.distance(vectorArithmetic.mean(c1), vectorArithmetic.mean(c2));
	}
}