import { TMatrix } from "../../types";
import { AClustering } from "../AClustering";


export abstract class AGraphBasedClustering extends AClustering<TMatrix, number[][]> {
	constructor(adjacencyMatrix: TMatrix) {
		super(adjacencyMatrix);	// data ↔ Adjacency matrix
	}
}