import * as matrixArithmetic from "../../arithmetic/matrix";
import { TMatrix } from "../../types";
import { AGraphBasedClustering } from "./AGraphBasedClustering";
import { ConnectedComponents } from "./ConnectedComponents";


export class Markov extends ConnectedComponents {
	private readonly e: number;
	private readonly r: number;

	constructor(adjacencyMatrix: TMatrix, e: number = 2, r: number = 2) {
		super(adjacencyMatrix);

		this.e = e;
		this.r = r;
	}
	
	private inflate(markovMatrix: TMatrix): TMatrix {
		return matrixArithmetic.normalize(
			markovMatrix
			.map(row => {
				return row.map((cell: number) => cell**this.r);
			})
		);
	}
	
	private expand(markovMatrix: TMatrix): TMatrix {
		return matrixArithmetic.power(markovMatrix, this.e);
	}

	protected cluster(adjacencyMatrix: TMatrix): number[][] {
		let markovMatrix: TMatrix = AGraphBasedClustering.adjacencyMatrixToSimilarityMatrix(adjacencyMatrix);
		for(let i = 0; i < markovMatrix.length; i++) {
			markovMatrix[i][i] = markovMatrix[i][i] || 1;
		}
		markovMatrix = matrixArithmetic.normalize(markovMatrix);

		while(true) {
			const newMarkovMatrix: TMatrix = this.inflate(this.expand(markovMatrix));
			if(this.hasConverged(newMarkovMatrix, markovMatrix)) break;

			markovMatrix = newMarkovMatrix;
		}
		
		return super.cluster(markovMatrix);
	}
}