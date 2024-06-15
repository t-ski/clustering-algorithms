import * as matrixArithmetic from "../../arithmetic/matrix";
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

	protected static adjacencyMatrixToSimilarityMatrix(adjacencyMatrix: TMatrix): TMatrix {
		const similarityMatrix: TMatrix = matrixArithmetic.copy(adjacencyMatrix);
		for(let i = 0; i < similarityMatrix.length; i++) {
			for(let j = 0; j < similarityMatrix.length; j++) {
				similarityMatrix[i][j] = similarityMatrix[i][j]
					? Math.max(...similarityMatrix.flat(2)) - similarityMatrix[i][j]
					: 0;
			}
		}
		return similarityMatrix;
	}

	constructor(adjacencyMatrix: TMatrix) {
		super(adjacencyMatrix);	// data ↔ Adjacency matrix
	}
}