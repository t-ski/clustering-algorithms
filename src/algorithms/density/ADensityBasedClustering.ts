import { TVector } from "../../types";
import { AVectorBasedClustering } from "../AVectorBasedClustering";


export abstract class ADensityBasedClustering extends AVectorBasedClustering {
	protected readonly epsilon: number;

	constructor(data: TVector[], epsilon?: number) {
		super(data);

		this.epsilon = epsilon ?? this.estimateEpsilon();
	}
	
	protected estimateEpsilon(): number {
		return 2;	// TODO
	}
}