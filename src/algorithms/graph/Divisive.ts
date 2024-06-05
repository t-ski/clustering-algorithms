import * as matrixArithmetic from "../../arithmetic/matrix";
import { TMatrix } from "../../types";
import { ConnectedComponents } from "./ConnectedComponents";


export class Divisive extends ConnectedComponents {
	private readonly k: number;

	constructor(adjacencyMatrix: TMatrix, k: number = 2) {
		super(adjacencyMatrix);

		this.k = k;
	}
	
	protected cluster(adjacencyMatrix: TMatrix): number[][] {
		const sparsificationMatrix: TMatrix = matrixArithmetic.copy(adjacencyMatrix);
		
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
			
			clusters = super.cluster(sparsificationMatrix);
			
			sparsificationMatrix[maxCell[0]][maxCell[1]] = 0;
		} while(
			   (clusters.length < this.k)
			&& (Math.max(...sparsificationMatrix.flat(2).map((value: number) => Math.abs(value))) !== 0)
		);
			
		return clusters;
	}
}