import { TMatrix } from "../../types";
import { MatrixArithmetic } from "../../arithmetic/MatrixArithmetic";
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
		return MatrixArithmetic.normalize(
			markovMatrix
			.map(row => {
				return row.map((cell: number) => cell**this.r);
			})
		);
	}
	
	private expand(markovMatrix: TMatrix): TMatrix {
		return MatrixArithmetic.power(markovMatrix, this.e);
	}

	protected cluster(adjacencyMatrix: TMatrix): number[][] {
		let markovMatrix: TMatrix = MatrixArithmetic.copy(adjacencyMatrix);
		for(let i = 0; i < markovMatrix.length; i++) {
			for(let j = 0; j < markovMatrix.length; j++) {
				markovMatrix[i][j] = markovMatrix[i][j]
					? Math.max(...markovMatrix.flat(2)) - markovMatrix[i][j]
					: 0;
			}
			markovMatrix[i][i] = markovMatrix[i][i] || 1;
		}
		markovMatrix = MatrixArithmetic.normalize(markovMatrix);

		while(true) {
			const newMarkovMatrix: TMatrix = this.inflate(this.expand(markovMatrix));
			if(this.hasConverged(newMarkovMatrix, markovMatrix)) break;

			markovMatrix = newMarkovMatrix;
		}
		
		return super.cluster(markovMatrix);
	}
}