import { TVector, TCluster } from "../../types";
import { VectorArithmetic } from "../../arithmetic/VectorArithmetic";
import { AClustering } from "../AClustering";
import { KMeans } from "./KMeans";


export class KMedoids extends KMeans {
	constructor(data: TVector[], k?: number) {
		super(data, k);
	}
	
	protected selectInitialCentroids(data: TVector[]): TVector[] {
		data.sort((a: TVector, b: TVector) => {
			return VectorArithmetic.weight(a) - VectorArithmetic.weight(b);
		});
		
		const intitialCentroids: TVector[] = [];
		for(let i = 1; i <= this.k; i++) {
			intitialCentroids.push(data[i * Math.floor(data.length / (this.k + 1))]);
		}
		return intitialCentroids;
	}
	
	protected computeNewCentroids(current: { clusters: TCluster[]; }): TVector[] {
		const { clusters: curClusters } = current;
		
		const newCentroids: TVector[] = [];
		for(const curCluster of curClusters) {
			const medoid = {
				vector: [] as TVector,
				distance: Infinity
			};
			
			for(let i = 0; i < curCluster.length; i++) {
				let totalDistance = 0;
				for(let j = 0; j < curCluster.length; j++) {
					totalDistance += AClustering.distance(curCluster[i], curCluster[j]);
				}
				totalDistance /= curCluster.length;
				
				if(totalDistance >= medoid.distance) continue;

				medoid.vector = curCluster[i];
				medoid.distance = totalDistance;
			}
			newCentroids.push(VectorArithmetic.mean(curCluster));
		}
		return newCentroids;
	}
}