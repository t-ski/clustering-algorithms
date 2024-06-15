import { TVector } from "../../types";
import { AClustering } from "../AClustering";
import { AVectorBasedClustering } from "../AVectorBasedClustering";


export abstract class ADensityBasedClustering extends AVectorBasedClustering {
	protected readonly epsilon: number;

	constructor(data: TVector[], epsilon?: number) {
		super(data);

		this.epsilon = epsilon ?? this.estimateEpsilon(data);
	}
	
	protected estimateEpsilon(data: TVector[]): number {
		let maxDistance: number = -Infinity;
		for(let i = 0; i < data.length; i++) {
			for(let j = i + 1; j < data.length; j++) {
				maxDistance = Math.max(AClustering.distance(data[i], data[j]), maxDistance);
			}
		}
		return maxDistance / data.length;
	}
}