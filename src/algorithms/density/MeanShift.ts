import * as vectorArithmetic from "../../arithmetic/vector";
import { TVector, TCluster } from "../../types";
import { AClustering } from "../AClustering";
import { ADensityBasedClustering } from "./ADensityBasedClustering";


export class MeanShift extends ADensityBasedClustering {
	
	constructor(data: TVector[], epsilon?: number) {
		super(data, epsilon);
	}

	protected cluster(data: TVector[]): TCluster[] {
		const shiftVectors: TVector[] = [];
		
		for(let i = 0; i < data.length; i++) {
			shiftVectors[i] = Object.assign([], data[i]);	
			while(true) {
				let totalWeight = 0;
				let newVector: TVector = [];
				for(const bandwidthVector of data) {
					const distance: number = AClustering.distance(shiftVectors[i], bandwidthVector);
					const weight = Math.exp(-(distance**2) / (2 * this.epsilon**2));
					
					newVector = vectorArithmetic.sum(vectorArithmetic.scale(bandwidthVector, weight), newVector);

					totalWeight += weight;
				}

				newVector = vectorArithmetic.scale(newVector, 1 / totalWeight);

				if(this.hasConverged(shiftVectors[i], newVector)) break;

				shiftVectors[i] = newVector;
			}

			shiftVectors[i] = vectorArithmetic.fix(shiftVectors[i], 0);
		}

		const uniqueShiftVectors: string[] = [
			...new Set(shiftVectors.map((vector: TVector) => vector.toString()))
		];
		const clusters: TCluster[] = AClustering.initClusters(uniqueShiftVectors.length);
		for(let i = 0; i < data.length; i++) {
			clusters[uniqueShiftVectors.indexOf(shiftVectors[i].toString())].push(data[i]);
		}

		return clusters;
	}
}