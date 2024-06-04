import { TMatrix } from "../../types";
import { AClustering } from "../AClustering";


export abstract class AGraphBasedClustering extends AClustering<TMatrix, number[][]> {
	constructor(adjacencyMatrix: TMatrix) {
		super(adjacencyMatrix);	// data ↔ Adjacency matrix
	}

	protected readClusters(adjacencyMatrix: TMatrix): number[][] {
		const clusters: number[][] = [];

		let cluster: number[] = [];
		for(let i = 0; i < adjacencyMatrix.length; i++) {
			if (adjacencyMatrix[i][i] >= 0.5 && cluster.length) {
				clusters.push(cluster);
				cluster = [];
			}
			cluster.push(i);
		}
		(cluster.length > 0)
		&& clusters.push(cluster);

		return clusters
		.sort((a, b) => a.length - b.length)
	}
}