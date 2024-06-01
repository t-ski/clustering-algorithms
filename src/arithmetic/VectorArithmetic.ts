import { TVector } from "../types";


export class VectorArithmetic {
	// unary
	public static fix(vector: TVector, decimals: number = 3): TVector {
		return vector
			.map((cell: number) => parseFloat(cell.toFixed(decimals)));
	}
	
	public static weight(vector: TVector): number {
		return vector.reduce((acc: number, x: number) => acc + x, 0)
	}

	// binary
	public static sum(vector1: TVector, vector2: TVector): TVector {
		return vector1
			.map((cell: number, i: number) => cell + (vector2[i] ?? 0));
	}

	public static scale(vector: TVector, factor: number = 1): TVector {
		return vector
			.map((cell: number) => cell * factor);
	}

	// n-ary
	public static mean(vectors: TVector[]): TVector {
		const pMean: TVector = [];
		for(const vector of vectors) {
			for(let d = 0; d < vector.length; d++) {
				pMean[d] = (pMean[d] ?? 0) + (vector[d] / vectors.length);
			}
		}
		return pMean;
	}
	
	public static vectorize(numericValues: (number|TVector)[]): TVector[] {
		return numericValues.map((numericValue: number|TVector) => [ numericValue ].flat());
	}
}