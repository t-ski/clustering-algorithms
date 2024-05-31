import { TVector } from "../types";


export class Distance {
	public static euclidean(p1: TVector, p2: TVector = []): number {
		let sum = 0;
		for(let i = 0; i < p1.length; i++) {
			sum += (p1[i] - (p2[i] ?? 0))**2;
		}
		return Math.sqrt(sum);
	}

	public static manhattan(p1: TVector, p2: TVector): number {
		let sum = 0;
		for(let i = 0; i < p1.length; i++) {
			sum += Math.abs(p1[i] - p2[i]);
		}
		return sum;
	}
	
	public static chebyshev(p1: TVector, p2: TVector): number {
		let max = -Infinity;
		for(let i = 0; i < p1.length; i++) {
			max = Math.max(p1[i], p2[i]);
		}
		return max;
	}

	public static cosine(p1: TVector, p2: TVector): number {
		let sum = 0;
		for(let i = 0; i < p1.length; i++) {
			sum += p1[i] * p2[i];
		}
        
		const cosSim = sum / (Distance.euclidean(p1) * Distance.euclidean(p2));
        
		return cosSim * -1 + 1;
	}
}