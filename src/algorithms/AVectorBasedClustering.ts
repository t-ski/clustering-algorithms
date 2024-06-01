import { VectorArithmetic } from "../arithmetic/VectorArithmetic";
import { TVector } from "../types";
import { AClustering } from "./AClustering";


export abstract class AVectorBasedClustering extends AClustering {
	constructor(data: (number|TVector)[]) {
		super(VectorArithmetic.vectorize(data));
	}
}