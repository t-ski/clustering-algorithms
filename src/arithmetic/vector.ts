import { TVector } from "../types";


// unary
export function fix(vector: TVector, decimals: number = 3): TVector {
	return vector
		.map((cell: number) => parseFloat(cell.toFixed(decimals)));
}

export function weight(vector: TVector): number {
	return vector.reduce((acc: number, x: number) => acc + x, 0)
}

// binary
export function sum(vector1: TVector, vector2: TVector): TVector {
	return vector1
		.map((cell: number, i: number) => cell + (vector2[i] ?? 0));
}

export function scale(vector: TVector, factor: number = 1): TVector {
	return vector
		.map((cell: number) => cell * factor);
}

// n-ary
export function mean(vectors: TVector[]): TVector {
	const pMean: TVector = [];
	for(const vector of vectors) {
		for(let d = 0; d < vector.length; d++) {
			pMean[d] = (pMean[d] ?? 0) + (vector[d] / vectors.length);
		}
	}
	return pMean;
}

export function vectorize(numericValues: (number|TVector)[]): TVector[] {
	return numericValues.map((numericValue: number|TVector) => [ numericValue ].flat());
}