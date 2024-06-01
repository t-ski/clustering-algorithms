import { TVector, TCluster } from "../../types";
import { AVectorBasedClustering } from "../AVectorBasedClustering";


export abstract class AHierarchyBasedClustering extends AVectorBasedClustering {
	private readonly k: number;

	protected linkageValue: number;

	constructor(data: TVector[], k: number = 2) {
		super(data);

		this.k = k;
	}
	
	protected abstract clusterDistance(c1: TCluster, c2: TCluster): number;
	
	protected cluster(): TCluster[] {
		const clusters: TCluster[] = this.data.map((vector: TVector) => [ vector ]);
		
		while(clusters.length > this.k) {
			let minDistance: number = Infinity;
			let mergeClusters: [ number, number ];
			
			for(let i = 0; i < clusters.length; i++) {
				for(let j = i + 1; j < clusters.length; j++) {
					const distance = this.clusterDistance(clusters[i], clusters[j]);
					
					if(distance >= minDistance) continue;
					minDistance = distance;
					mergeClusters = [ i, j ];
				}
			}
			
			clusters.push(clusters[mergeClusters[0]].concat(clusters[mergeClusters[1]]));
			clusters.splice(Math.max(mergeClusters[0], mergeClusters[1]), 1);
			clusters.splice(Math.min(mergeClusters[0], mergeClusters[1]), 1);
		}
		
		return clusters;
	}
}