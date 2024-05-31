import { TVector } from "../types";


export class Distance {
	public static euclidean(vector1: TVector, vector2: TVector = []): number {
		let sum = 0;
		for(let i = 0; i < vector1.length; i++) {
			sum += (vector1[i] - (vector2[i] ?? 0))**2;
		}
		return Math.sqrt(sum);
	}

	public static manhattan(vector1: TVector, vector2: TVector): number {
		let sum = 0;
		for(let i = 0; i < vector1.length; i++) {
			sum += Math.abs(vector1[i] - vector2[i]);
		}
		return sum;
	}
	
	public static chebyshev(vector1: TVector, vector2: TVector): number {
		let max = -Infinity;
		for(let i = 0; i < vector1.length; i++) {
			max = Math.max(vector1[i], vector2[i]);
		}
		return max;
	}

	public static cosine(vector1: TVector, vector2: TVector): number {
		let sum = 0;
		for(let i = 0; i < vector1.length; i++) {
			sum += vector1[i] * vector2[i];
		}   
		const cosSim = sum / (Distance.euclidean(vector1) * Distance.euclidean(vector2));
		return cosSim * -1 + 1;
	}
}