import { TVector } from "../types";


export function euclidean(vector1: TVector, vector2: TVector = []): number {
	let sum = 0;
	for(let i = 0; i < vector1.length; i++) {
		sum += (vector1[i] - (vector2[i] ?? 0))**2;
	}
	return Math.sqrt(sum);
}

export function manhattan(vector1: TVector, vector2: TVector): number {
	let sum = 0;
	for(let i = 0; i < vector1.length; i++) {
		sum += Math.abs(vector1[i] - vector2[i]);
	}
	return sum;
}

export function chebyshev(vector1: TVector, vector2: TVector): number {
	let max = -Infinity;
	for(let i = 0; i < vector1.length; i++) {
		max = Math.max(vector1[i], vector2[i]);
	}
	return max;
}

export function cosine(vector1: TVector, vector2: TVector): number {
	let sum = 0;
	for(let i = 0; i < vector1.length; i++) {
		sum += vector1[i] * vector2[i];
	}   
	const cosSim = sum / (euclidean(vector1) * euclidean(vector2));
	return cosSim * -1 + 1;
}