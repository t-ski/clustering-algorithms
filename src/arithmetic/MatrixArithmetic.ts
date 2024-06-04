import { TMatrix, TVector } from "../types";


export class MatrixArithmetic {	// row-major
	// unary
	public static copy(matrix: TMatrix): TMatrix {
		return matrix
			.map((row: TVector) => row.map((cell: number) => cell));
	}

	public static identity(matrix: TMatrix): TMatrix {
		const resultMatrix: TMatrix = [];
		for (let i = 0; i < matrix.length; i++) {
			resultMatrix[i] = new Array(matrix.length).fill(0) as number[];
			resultMatrix[i][i] = 1;
		}
		return resultMatrix;
	}

	public static transpose(matrix: TMatrix): TMatrix {
		return matrix[0]
			.map((_, i: number) => matrix.map(row => row[i]));
	}

	public static invert(matrix: TMatrix): TMatrix {
		const identityMatrix: TMatrix = MatrixArithmetic.identity(matrix);
		const augmentedMatrix = MatrixArithmetic.identity(matrix);
		for (let i = 0; i < matrix.length; i++) {
			augmentedMatrix[i] = matrix[i].slice();
			for (let j = 0; j < matrix.length; j++) {
				augmentedMatrix[i].push(identityMatrix[i][j]);
			}
		}
		for(let i = 0; i < matrix.length; i++) {
			let maxRowIndex: number = i;
			for(let j = i + 1; j < matrix.length; j++) {
				if(Math.abs(augmentedMatrix[j][i]) <= Math.abs(augmentedMatrix[maxRowIndex][i])) continue;
				maxRowIndex = j;
			}
			if(maxRowIndex !== i) {
				const tmp = augmentedMatrix[i];
				augmentedMatrix[i] = augmentedMatrix[maxRowIndex];
				augmentedMatrix[maxRowIndex] = tmp;
			}

			const pivotElement: number = augmentedMatrix[i][i];
			for(let j = i; j < 2 * matrix.length; j++) {
				augmentedMatrix[i][j] /= pivotElement;
			}
			for(let j = 0; j < matrix.length; j++) {
				if(j === i) continue;
				const pivotEliminationFactor: number = augmentedMatrix[j][i];
				for(let k = 0; k < (2 * matrix.length); k++) {
					augmentedMatrix[j][k] -= augmentedMatrix[i][k] * pivotEliminationFactor;
				}
			}
		}
		const resultMatrix: TMatrix = [];
		for (let i = 0; i < matrix.length; i++) {
			resultMatrix[i] = augmentedMatrix[i].slice(matrix.length);
		}
		return resultMatrix;
	}

	public static normalize(matrix: TMatrix): TMatrix {
		return MatrixArithmetic.transpose(
			MatrixArithmetic.transpose(matrix)
			.map(row => {
				const rowSum: number = row.reduce((acc: number, cell: number) => acc + cell, 0);
				return row.map(cell => rowSum ? (cell / rowSum) : 0);
			})
		);
	}

	// binary
	public static multiply(matrix1: TMatrix, matrix2: TMatrix): TMatrix {
		const resultMatrix: TMatrix = [];
		for(let i = 0; i < matrix1.length; i++) {
			resultMatrix[i] = [];
			for(let j = 0; j < matrix2[0].length; j++) {
				resultMatrix[i][j] = 0;
				for(let k = 0; k < matrix1[0].length; k++) {
					resultMatrix[i][j] += matrix1[i][k] * matrix2[k][j];
				}
			}
		}
		return resultMatrix;
	}

	public static power(matrix: TMatrix, power: number): TMatrix {
		if(power === 0) return MatrixArithmetic.identity(matrix);
		if(power % 2 !== 0) {
			return MatrixArithmetic.multiply(matrix, MatrixArithmetic.power(matrix, power - 1));
		}
		const halfPowerMatrix: TMatrix = MatrixArithmetic.power(matrix, power / 2);
		return MatrixArithmetic.multiply(halfPowerMatrix, halfPowerMatrix);
	}
}