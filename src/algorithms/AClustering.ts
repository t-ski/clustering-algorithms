import { TVector, TCluster, TMatrix } from "../types";
import { Distance } from "../util/Distance";


type TDistanceMetricCallback = (vector1: TVector, vector2: TVector) => number;


export abstract class AClustering<D = TVector[], C = TCluster[]> {
	private static readonly maxIterations = 10000;
	
	private static distanceMetricCallback: TDistanceMetricCallback = (...args) => Distance.euclidean(...args);

	protected static distance(vector1: TVector, vector2: TVector): number {
    	return AClustering.distanceMetricCallback(vector1, vector2);
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
	
	private iterations: number = 0;
	private computedClusters: C;

	constructor(data: D) {
		this.data = data;
	}

    protected abstract cluster(): C;

    protected hasConverged(current: number|TVector|TMatrix, next: number|TVector|TMatrix, threshold: number = 1e-3) {
    	return (++this.iterations > AClustering.maxIterations)
			|| (AClustering.distanceMetricCallback([ current ].flat(2), [ next ].flat(2)) <= threshold);
    }

    public get clusters(): C {
    	this.computedClusters = this.computedClusters ?? this.cluster();
		
    	return this.computedClusters;
    }
}