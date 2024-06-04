import { TVector, TCluster } from "../../types";
import { VectorArithmetic } from "../../arithmetic/VectorArithmetic";
import { AClustering } from "../AClustering";
import { KMeans } from "./KMeans";


export class KMeansPP extends KMeans {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}

	protected selectInitialCentroids(): TVector[] {
		const intitialCentroids: Set<TVector> = new Set([
			this.data[Math.round(Math.random() * (this.data.length - 1))]
		]);

		while(intitialCentroids.size < this.k) {
			const squaredDistances: number[] = [];
			for(const vector of this.data) {
				let distance: number = Infinity;
				for(const intitialCentroid of intitialCentroids) {
					distance = Math.min(AClustering.distance(vector, intitialCentroid));
				}
				squaredDistances.push(distance**2);
			}

			const randomPivot: number = Math.random()
				* squaredDistances.reduce((acc: number, squaredDistance: number) => acc + squaredDistance, 0);
			let i, sum = 0;
			for(i = 0; i < this.data.length; i++) {
				sum += squaredDistances[i];
				if(randomPivot <= sum) break;
			}
			intitialCentroids.add(this.data[i]);
		}

		return Array.from(intitialCentroids);
	}
	
	protected computeNewCentroids(current: { clusters: TCluster[]; }): TVector[] {
		const { clusters: curClusters } = current;
		
		const newCentroids: TVector[] = [];
		for(let i = 0; i < curClusters.length; i++) {
			newCentroids.push(VectorArithmetic.mean(curClusters[i]));
		}
		return newCentroids;
	}
}