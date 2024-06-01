import { TVector } from "../../types";
import { AClustering } from "../AClustering";
import { AVectorBasedClustering } from "../AVectorBasedClustering";


export abstract class ADensityBasedClustering extends AVectorBasedClustering {
	protected readonly epsilon: number;

	constructor(data: TVector[], epsilon?: number) {
		super(data);

		this.epsilon = epsilon ?? this.estimateEpsilon();
	}
	
	protected estimateEpsilon(): number {
		return 2;
	}
	
	protected rangeQuery(vector: TVector): TVector[] {
		const neighbours: {
			distance: number;
			vector: TVector;
		}[] = [];
		
		for(let i = 0; i < this.data.length; i++) {
			if(i === this.data.indexOf(vector)) continue;
			
			const distance: number = AClustering.distance(vector, this.data[i]);

			if(distance > this.epsilon) continue;

			neighbours.push({
				distance,
				vector: this.data[i]
			});
		}

		neighbours.sort((a, b) => a.distance - b.distance);

		return neighbours.map((neighbour) => neighbour.vector);
	}
}