import { TCluster, TVector } from "../../types";
import { VectorArithmetic } from "../../arithmetic/VectorArithmetic";
import { AClustering } from "../AClustering";
import { AHierarchyBasedClustering } from "./AHierarchyBasedClustering";


export class CentroidLinkage extends AHierarchyBasedClustering {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}

	protected clusterDistance(c1: TCluster, c2: TCluster): number {
		return AClustering.distance(VectorArithmetic.mean(c1), VectorArithmetic.mean(c2));
	}
}