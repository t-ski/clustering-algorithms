import { TMatrix } from "../../types";
import { AClustering } from "../AClustering";


export abstract class AGraphBasedClustering extends AClustering<TMatrix, number[][]> {
	constructor(data: TMatrix) {
		super(data);	// data ↔ Adjacency matrix
	}
}