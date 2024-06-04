import { TMatrix } from "../../types";
import { MatrixArithmetic } from "../../arithmetic/MatrixArithmetic";
import { AGraphBasedClustering } from "./AGraphBasedClustering";


export class Divisive extends AGraphBasedClustering {
	private readonly k: number;

	constructor(adjacencyMatrix: TMatrix, k: number = 2) {
		super(adjacencyMatrix);

		this.k = k;
	}
	
	protected cluster(): number[][] {
		const sparsificationMatrix: TMatrix = MatrixArithmetic.copy(this.data);
		
		let clusters: number[][];
		do {
			let maxCell: [ number, number ];
			let max = -Infinity;
			for(let i = 0; i < sparsificationMatrix.length; i++) {
				for(let j = 0; j < sparsificationMatrix.length; j++) {
					if(Math.abs(sparsificationMatrix[i][j]) <= max) continue;
					max = sparsificationMatrix[i][j];
					maxCell = [i, j];
				}
			}
			
			clusters = this.readClusters(sparsificationMatrix);

			sparsificationMatrix[maxCell[0]][maxCell[1]] = 0;
		} while(
			   (clusters.length > this.k)
			&& (Math.max(...sparsificationMatrix.flat(2)) !== 0)
		);

		return clusters;
	}
}