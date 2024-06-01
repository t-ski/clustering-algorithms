import { TVector, TCluster } from "../../types";
import { VectorArithmetic } from "../../arithmetic/VectorArithmetic";
import { AClustering } from "../AClustering";
import { ADensityBasedClustering } from "./ADensityBasedClustering";


export class MeanShift extends ADensityBasedClustering {
	
	constructor(data: TVector[], epsilon?: number) {
		super(data, epsilon);
	}

	protected cluster(): TCluster[] {
		const shiftVectors: TVector[] = [];
		
		for(let i = 0; i < this.data.length; i++) {
			shiftVectors[i] = Object.assign([], this.data[i]);	
			while(true) {
				let totalWeight = 0;
				let newVector: TVector = [];
				for(const bandwidthVector of this.data) {
					const distance: number = AClustering.distance(shiftVectors[i], bandwidthVector);
					const weight = Math.exp(-(distance**2) / (2 * this.epsilon**2));
					
					newVector = VectorArithmetic.sum(VectorArithmetic.scale(bandwidthVector, weight), newVector);

					totalWeight += weight;
				}

				newVector = VectorArithmetic.scale(newVector, 1 / totalWeight);

				if(this.hasConverged(shiftVectors[i], newVector)) break;

				shiftVectors[i] = newVector;
			}

			shiftVectors[i] = VectorArithmetic.fix(shiftVectors[i], 0);
		}

		const uniqueShiftVectors: string[] = [
			...new Set(shiftVectors.map((vector: TVector) => vector.toString()))
		];
		const clusters: TCluster[] = AClustering.initClusters(uniqueShiftVectors.length);
		for(let i = 0; i < this.data.length; i++) {
			clusters[uniqueShiftVectors.indexOf(shiftVectors[i].toString())].push(this.data[i]);
		}

		return clusters;
	}
}