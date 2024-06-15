import { TVector, TCluster } from "../../types";
import * as vectorArithmetic from "../../arithmetic/vector";
import { AClustering } from "../AClustering";
import { KMeans } from "./KMeans";


export class KMeansPP extends KMeans {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}

	protected selectInitialCentroids(data: TVector[]): TVector[] {
		const intitialCentroids: Set<TVector> = new Set([
			data[Math.round(Math.random() * (data.length - 1))]
		]);

		while(intitialCentroids.size < this.k) {
			const squaredDistances: number[] = [];
			for(const vector of data) {
				let distance: number = Infinity;
				for(const intitialCentroid of intitialCentroids) {
					distance = Math.min(AClustering.distance(vector, intitialCentroid));
				}
				squaredDistances.push(distance**2);
			}

			const randomPivot: number = Math.random()
				* squaredDistances.reduce((acc: number, squaredDistance: number) => acc + squaredDistance, 0);
			let i, sum = 0;
			for(i = 0; i < data.length; i++) {
				sum += squaredDistances[i];
				if(randomPivot <= sum) break;
			}
			intitialCentroids.add(data[i]);
		}

		return Array.from(intitialCentroids);
	}
	
	protected computeNewCentroids(current: { clusters: TCluster[]; }): TVector[] {
		const { clusters: curClusters } = current;
		
		const newCentroids: TVector[] = [];
		for(let i = 0; i < curClusters.length; i++) {
			newCentroids.push(vectorArithmetic.mean(curClusters[i]));
		}
		return newCentroids;
	}
}