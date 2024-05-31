import { TMatrix } from "../types";


export class MatrixArithmetic {	// column-wise
	// unary
	private static identity(matrix: TMatrix): TMatrix {
		const resultMatrix: TMatrix = [];
		for (let i = 0; i < matrix.length; i++) {
			resultMatrix[i] = new Array(matrix.length).fill(0) as number[];
			resultMatrix[i][i] = 1;
		}
		return resultMatrix;
	}

	private static transpose(matrix: TMatrix): TMatrix {
		return matrix[0]
		.map((_, i: number) => matrix.map(row => row[i]));
	}

	public static normalize(matrix: TMatrix): TMatrix {
		return MatrixArithmetic.transpose(
			MatrixArithmetic.transpose(matrix)
			.map(row => {
				const rowSum: number = row.reduce((acc: number, cell: number) => acc + cell, 0);
				return row.map(cell => cell / rowSum);
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