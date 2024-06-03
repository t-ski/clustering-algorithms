import { VectorArithmetic } from "../arithmetic/VectorArithmetic";
import { TCluster, TVector } from "../types";
import { Distance } from "./Distance";


type TNumericCluster = number[]|TCluster;


export class Quality {
	private static vectorizeClusters(clusters: TNumericCluster[]): TCluster[] {
		return clusters
		.map((cluster: number[]|TCluster) => VectorArithmetic.vectorize(cluster));
	}

	public static silhouetteCoefficient(clusters: TNumericCluster[]): number {
		const vectorClusters: TCluster[] = Quality.vectorizeClusters(clusters);

		const mean = (values: number[]): number => {
			return values.reduce((acc: number, x: number) => acc + x, 0) / values.length;
		};
		
		const silhouettes: number[] = [];
		for(let i = 0; i < vectorClusters.length; i++) {
			for(const vector of vectorClusters[i]) {
				const aValues: number[] = [];
				for(const referencePoint of vectorClusters[i]) {
					aValues.push(Distance.euclidean(vector, referencePoint));
				}
				const a = mean(aValues);

				const bCandidates: number[] = [];
				let j = 0;
				for(const referenceCluster of vectorClusters) {
					if(j++ == i) continue;

					const bValues: number[] = [];
					for(const referencePoint of referenceCluster) {
						bValues.push(Distance.euclidean(vector, referencePoint));
					}
					bCandidates.push(mean(bValues));
				}

				const b = Math.min(...bCandidates) ?? 0;
				
				silhouettes.push((b - a) / Math.max(a, b));
			}
		}

		return mean(silhouettes);
	}

	public static dunnIndex(clusters: TNumericCluster[]) {
		const vectorClusters: TCluster[] = Quality.vectorizeClusters(clusters);

		const intraClusterDistances: number[] = vectorClusters
		.map((vectorCluster: TCluster) => {
			let maxDistance = -Infinity;
			for(let i = 0; i < vectorCluster.length; i++) {
				for(let j = i + 1; j < vectorCluster.length; j++) {
					maxDistance = Math.max(Distance.euclidean(vectorCluster[i], vectorCluster[j]), maxDistance);
				}
			}
			return maxDistance;
		});
		
		const interClusterDistances: number[] = [];
		for(let i = 0; i < vectorClusters.length; i++) {
		  for (let j = i + 1; j < vectorClusters.length; j++) {
				let minDistance = Infinity;
				for(let k = 0; k < vectorClusters[i].length; k++) {
					for(let l = 0; l < vectorClusters[j].length; l++) {
						minDistance = Math.min(Distance.euclidean(vectorClusters[i][k], vectorClusters[j][l]), minDistance);
					}
				}
				interClusterDistances.push(minDistance);
		  }
		}

		return Math.min(...interClusterDistances) / Math.max(...intraClusterDistances);
	}

	public static daviesBouldinIndex(clusters: TNumericCluster[]) {
		const vectorClusters: TCluster[] = Quality.vectorizeClusters(clusters);

		const centroids = vectorClusters
		.map((vectorCluster: TCluster) => {
			const centroid: TVector = [];
			for(let i = 0; i < vectorCluster.length; i++) {
				for(let j = 0; j < vectorCluster[0].length; j++) {
					centroid[j] = vectorCluster[i][j];
				}
			}
			return VectorArithmetic.scale(centroid, 1 / vectorCluster.length);
		});
		
		const distances: number[] = [];
		for(let i = 0; i < vectorClusters.length; i++) {
			let sum = 0;
			for (let j = 0; j < vectorClusters[i].length; j++) {
				sum += Distance.euclidean(vectorClusters[i][j], centroids[i]);
			}
			distances.push(sum / vectorClusters.length);
		}
		
		let ratioSum = 0;
		for(let i = 0; i < vectorClusters.length; i++) {
			let maxRatio = -Infinity;
			for(let j = 0; j < vectorClusters.length; j++) {
				if(i === j) continue;
				const ratio = (distances[i] + distances[j]) / Distance.euclidean(centroids[i], centroids[j]);
				maxRatio = Math.max(ratio, maxRatio);
			}
			ratioSum += maxRatio;
		}
		
		return ratioSum / vectorClusters.length;
	}
}