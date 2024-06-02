import { TMatrix } from "../../types";
import { MatrixArithmetic } from "../../arithmetic/MatrixArithmetic";
import { AGraphBasedClustering } from "./AGraphBasedClustering";


export class Markov extends AGraphBasedClustering {
	private readonly e: number;
	private readonly r: number;

	constructor(data: TMatrix, e: number = 2, r: number = 2) {
		super(data);

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

	protected cluster(): number[][] {
		let markovMatrix: TMatrix = this.data;
		for(let i = 0; i < markovMatrix.length; i++) {
			markovMatrix[i][i] = markovMatrix[i][i] || 1;
		}

		markovMatrix = MatrixArithmetic.normalize(markovMatrix);

		while(true) {
			const newMarkovMatrix: TMatrix = this.inflate(this.expand(markovMatrix));
			if(this.hasConverged(newMarkovMatrix, markovMatrix)) break;

			markovMatrix = newMarkovMatrix;
		}

		const clusters: number[][] = [];
		let cluster: number[] = [];
		for(let i = 0; i < markovMatrix.length; i++) {
			if (markovMatrix[i][i] >= 0.5 && cluster.length) {
				clusters.push(cluster);
				cluster = [];
			}
			cluster.push(i);
		}
		(cluster.length > 0)
		&& clusters.push(cluster);
		return clusters
		.sort((a, b) => a.length - b.length);
	}
}