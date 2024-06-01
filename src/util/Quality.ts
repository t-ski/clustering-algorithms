import { VectorArithmetic } from "../arithmetic/VectorArithmetic";
import { TCluster } from "../types";
import { Distance } from "./Distance";


export class Quality {
	public static silhouetteCoefficient(clusters: (number[]|TCluster)[]): number {
		const vectorClusters: TCluster[] = clusters
		.map((cluster: number[]|TCluster) => VectorArithmetic.vectorize(cluster));

		const mean = (values: number[]): number => {
			return values.reduce((acc: number, x: number) => acc + x, 0) / values.length;
		};
		
		const silhouettes: number[] = [];

		let i = 0;
		for(const cluster of vectorClusters) {
			for(const vector of cluster) {
				const aValues: number[] = [];
				for(const referencePoint of cluster) {
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

			i++;
		}

		return mean(silhouettes);
	}
}