import { TMatrix, TVector } from "../../types";
import { AClustering } from "../AClustering";


export abstract class AGraphBasedClustering extends AClustering<TMatrix, number[][]> {
	public static vectorsToAdjacencyMatrix(data: TVector[]): TMatrix {
		const adjacencyMatrix: TMatrix = [];
		for(let i = 0; i < data.length; i++) {
			for (let j = 0; j < data.length; j++) {
				adjacencyMatrix[i][j] = AClustering.distance(data[i], data[j]);
			}
		}
		return adjacencyMatrix;
	}

	constructor(adjacencyMatrix: TMatrix) {
		super(adjacencyMatrix);	// data ↔ Adjacency matrix
	}
}