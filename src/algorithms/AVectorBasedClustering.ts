import * as vectorArithmetic from "../arithmetic/vector";
import { TVector } from "../types";
import { AClustering } from "./AClustering";


export abstract class AVectorBasedClustering extends AClustering {
	constructor(data: (number|TVector)[]) {
		super(vectorArithmetic.vectorize(data));
	}
}