import { TVector, TCluster } from "../../types";
import { AClustering } from "../AClustering";
import { DBSCAN } from "./DBSCAN";


interface IPoint {
	vector: TVector;
	reachabilityDistance: number;
};


class PriorityQueue {
	private readonly queue: IPoint[] = [];

	public enqueue(vector: TVector, reachabilityDistance: number) {
		this.queue.push({
			vector, reachabilityDistance
		});
		this.queue.sort((a, b) => a.reachabilityDistance - b.reachabilityDistance);
	}

	public update(vector: TVector, reachabilityDistance: number) {
		for(let i = 0; i < this.queue.length; i++) {
			if(this.queue[i].vector.toString() !== vector.toString()) continue;
			this.queue[i].reachabilityDistance = reachabilityDistance;
		}
		this.queue.sort((a, b) => a.reachabilityDistance - b.reachabilityDistance);
	}

	public dequeue() {
	  return this.queue.shift()?.vector;
	}
}


export class OPTICS extends DBSCAN {
	readonly #computedNoise: TCluster = [];
	readonly #processedVectors: WeakSet<TVector> = new WeakSet();
	readonly #reachabilityDistances: WeakMap<TVector, number> = new WeakMap();
	
	protected readonly minPoints: number;

	constructor(data: TVector[], epsilon?: number, minPoints: number = 5) {
		super(data, epsilon);
		
		this.minPoints = minPoints;	
	}
	
	private coreDistance(data: TVector[], vector: TVector): number {
		const neighbours: TVector[] = this.rangeQuery(data, vector);
		return (neighbours.length + 1 >= this.minPoints)
			? AClustering.distance(vector, neighbours[this.minPoints + 1])
			: undefined;
	}

	protected update(data: TVector[], neighbours: TVector[], vector: TVector, seeds: PriorityQueue) {
		for(const neighbour of neighbours) {
			if(this.#processedVectors.has(neighbour)) continue;

			const newReachabilityDistance: number = Math.max(
				this.coreDistance(data, vector),
				AClustering.distance(vector, neighbour)
			);
			
			const curReachabilityDistance: number = this.#reachabilityDistances.get(neighbour);
			
			if(newReachabilityDistance >= (curReachabilityDistance ?? Infinity)) continue;
			
			this.#reachabilityDistances.set(neighbour, newReachabilityDistance);
			
			curReachabilityDistance
				? seeds.update(neighbour, newReachabilityDistance)
				: seeds.enqueue(neighbour, newReachabilityDistance);
		}
	}

	protected cluster(data: TVector[]): TCluster[] {
		const orderedList: TVector[] = [];
		
		for(const vector of data) {
			if(this.#processedVectors.has(vector)) continue;
			this.#processedVectors.add(vector);

			orderedList.push(vector);

			if(!this.coreDistance(data, vector)) continue;

			const seeds = new PriorityQueue();
			const neighbours: TVector[] = this.rangeQuery(data, vector);
			
			this.update(data, neighbours, vector, seeds);

			let seedVector: TVector;
			while(seedVector = seeds.dequeue()) {
				if(this.#processedVectors.has(seedVector)) continue;
				this.#processedVectors.add(seedVector);

				orderedList.push(seedVector);
				
				if(!this.coreDistance(data, seedVector)) continue;

				const nextNeigbours: TVector[] = this.rangeQuery(data, seedVector);

				this.update(data, nextNeigbours, seedVector, seeds);
			}
		}
		
		const clusters: TCluster[] = AClustering.initClusters(1);
		for(let i = 0; i < orderedList.length; i++) {
			((this.#reachabilityDistances.get(orderedList[i]) ?? Infinity) > this.epsilon)
			&& clusters.push([]);
			clusters[clusters.length - 1].push(orderedList[i]);
		}
		return clusters
		.filter((cluster: TCluster) => {
			const isNoise = cluster.length < this.minPoints;
			isNoise && this.#computedNoise.push(...cluster);
			return !isNoise;
		});
	}
	
	public get noise(): TCluster {
		return this.#computedNoise;
	}
}