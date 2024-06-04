import { TVector, TCluster } from "../../types";
import { AClustering } from "../AClustering";
import { ADensityBasedClustering } from "./ADensityBasedClustering";


export class DBSCAN extends ADensityBasedClustering {
	readonly #computedNoise: TCluster = [];
	
	protected readonly minPoints: number;

	constructor(data: TVector[], epsilon?: number, minPoints: number = 5) {
		super(data, epsilon);

		this.minPoints = minPoints;
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
	
	protected cluster(): TCluster[] {		
		const labels: WeakMap<TVector, number> = new WeakMap();

		let c = -1;
		for(const vector of this.data) {
			if(labels.has(vector)) continue;

		   	const neighbours: TVector[] = this.rangeQuery(vector);
		   	if(neighbours.length + 1 < this.minPoints) {
				labels.set(vector, -1);

				continue;
			}

			labels.set(vector, ++c);

			for(const neighbour of neighbours) {
				(labels.get(neighbour) === -1)
				&& labels.set(neighbour, c);
				if(labels.has(neighbour)) continue;
				
				labels.set(neighbour, c);
				
				const nextNeigbours: TVector[] = this.rangeQuery(neighbour);

				if(nextNeigbours.length + 1 < this.minPoints) continue;

				neighbours.push(...nextNeigbours);
			}
		}
		
		const clusters: TCluster[] = AClustering.initClusters(c + 1);
		for(const vector of this.data) {
			const index: number = labels.get(vector);
			(index < 0)
				? this.#computedNoise.push(vector)
				: clusters[index].push(vector);
		}

		return clusters;
	}
	
	public get noise(): TCluster {
		return this.#computedNoise;
	}
}