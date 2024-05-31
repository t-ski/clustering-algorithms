import { TVector } from "../types";
import { AClustering } from "./AClustering";


export abstract class AVectorBasedClustering extends AClustering {
	constructor(data: TVector[]) {
		super(data.map((vector: number|number[]) => [ vector ].flat()));
	}
}