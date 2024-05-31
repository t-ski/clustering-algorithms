import { TVector, TCluster, TMatrix } from "../types";
import { Distance } from "../util/Distance";


type TDistanceMetricCallback = (vector1: TVector, vector2: TVector) => number;


export abstract class AClustering<D = TVector[], C = TCluster[]> {
	private static readonly maxIterations = 10000;
	protected static readonly convergenceThreshold = 0.001;	// dynamic?

	private static iterations = 0;
	private static distanceMetricCallback: TDistanceMetricCallback = (...args) => Distance.euclidean(...args);

	protected static distance(vector1: TVector, vector2: TVector): number {
    	return AClustering.distanceMetricCallback(vector1, vector2);
	}

	protected static hasConverged(current: number|TVector|TMatrix, next: number|TVector|TMatrix) {
		return (++AClustering.iterations > AClustering.maxIterations)
			|| (AClustering.distanceMetricCallback([ current ].flat(2), [ next ].flat(2)) <= AClustering.convergenceThreshold);
	}
	
	protected static initClusters<T>(size: number): T[] {
		const clusters: unknown[] = [];
		for(let i = 0; i < size; i++) {
			clusters.push([]);
		}
		return clusters as T[];
	}
	
	public static setDistanceMetric(distanceMetricCallback: TDistanceMetricCallback) {
		AClustering.distanceMetricCallback = distanceMetricCallback;
	}
	
	
	protected readonly data: D;
	
	private computedClusters: C;

	constructor(data: D) {
		this.data = data;
	}

    protected abstract cluster(): C;

    public get clusters(): C {
    	this.computedClusters = this.computedClusters ?? this.cluster();
		
    	return this.computedClusters;
    }
}