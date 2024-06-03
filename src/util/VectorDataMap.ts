import { TVector, TCluster } from "../types";


type TDataPoint<T> = [ TVector, T ];


export class VectorDataMap<T extends object> {
	private readonly rawVectors: TVector[] = [];
	private readonly entityVectorMap: WeakMap<object, TVector>;
	private readonly vectorEntityMap: Map<string, T[]>;
    
	constructor(data: TDataPoint<T>[]) {
		this.rawVectors = data.map((point: TDataPoint<T>) => point[0]);
		this.entityVectorMap = new WeakMap(data.map((point: TDataPoint<T>) => [ point[1], point[0] ]));
        
		this.vectorEntityMap = new Map();
		for(const point of data) {
			const entities: T[] = this.vectorEntityMap.get(point[0].toString()) ?? [];
			this.vectorEntityMap.set(point[0].toString(), entities.concat(point[1]));
		}
	}

	public get vectors(): TVector[] {
		return this.rawVectors;
	}
    
	public getEntity(vector: TVector): T|T[] {
		const entities: T[] = this.vectorEntityMap.get(vector.toString()) ?? [];
		return (entities.length === 1) ? entities[0] : entities;
	}
    
	public getVector(entity: T): TVector {
		return this.entityVectorMap.get(entity);
	}
    
	public getCluster(clusters: TCluster[], vector: TVector): number|number[];
	public getCluster(clusters: TCluster[], entity: T): number|number[];
	public getCluster(clusters: TCluster[], vectorOrEntity: TVector|T): number|number[] {
		const vector: TVector = this.getVector(vectorOrEntity as T) ?? (vectorOrEntity as TVector);
		const clustersIndexes: number[] = [];
		for(let i = 0; i < clusters.length; i++) {
			if(!clusters[i].map((vector: TVector) => vector.toString()).includes(vector.toString())) continue;
			clustersIndexes.push(i);
		}
		return (clustersIndexes.length === 1) ? clustersIndexes[0] : clustersIndexes;
	}
    
}