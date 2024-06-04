import { TMatrix } from "../../types";
import { AGraphBasedClustering } from "./AGraphBasedClustering";


export class ConnectedComponents extends AGraphBasedClustering {
	constructor(adjacencyMatrix: TMatrix) {
		super(adjacencyMatrix);
	}
	
	private dfs(adjacencyMatrix: TMatrix, i: number, visited: boolean[]): number[] {
		if(visited[i]) return [];
		visited[i] = true;

		const cluster: number[] = [ i ];
		for (let j = 0; j < adjacencyMatrix.length; j++) {
			if(visited[j] || !adjacencyMatrix[i][j]) continue;

			let isClique = true;
			for(let k = 0; k < cluster.length; k++) {
				if(adjacencyMatrix[cluster[k]][j]) continue;
				isClique = false;

				break;
			}

			if(!isClique) continue;

			cluster.push(...this.dfs(adjacencyMatrix, j, visited));
		}
		return cluster;
	}
	
	protected cluster(adjacencyMatrix: TMatrix): number[][] {
		const visited: boolean[] = [];
		
		const clusters: number[][] = [];
		for(let i = 0; i < adjacencyMatrix.length; i++) {
			const cluster: number[] = this.dfs(adjacencyMatrix, i, visited);
			cluster.length
			&& clusters.push(cluster);
		}
		return clusters;
	}
}