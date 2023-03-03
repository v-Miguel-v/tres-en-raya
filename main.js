"use strict"
//* Valores por Defecto e Inicializaciones
let currentTurn = 0;
let currentSymbol = "X";
let isTheGameFinished = false;
const gameboard = [[,,,],[,,,],[,,,]];
const gameboardSquares = document.getElementsByClassName("gameboard__square");

//* Lógica Principal del Juego
for (const square of gameboardSquares) {
	square.addEventListener("click", () => {
		if (!isTheGameFinished) {
			if (square.textContent === "") {
				square.textContent = currentSymbol;
				registerMove(square);
				switchSymbol();
				if (isTheGameFinished) alert("Juego terminado");
			}
		}
	});
}

//* Funciones Complementarias
function switchSymbol() {
	switch (currentSymbol) {
		case "X":
			currentSymbol = "O";
			break;
		case "O":
			currentSymbol = "X";
			break;
	}
}

function registerMove(mySquare) {
	currentTurn++;
	const mySquareNumber = Number(mySquare.id[17]);
	const mySquareSymbol = mySquare.textContent;
	switch (mySquareNumber) {
		case 0:
			gameboard[0][0] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 0, 0);
			break;
		case 1:
			gameboard[0][1] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 0, 1);
			break;
		case 2:
			gameboard[0][2] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 0, 2);
			break;
		case 3:
			gameboard[1][0] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 1, 0);
			break;
		case 4:
			gameboard[1][1] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 1, 1);
			break;
		case 5:
			gameboard[1][2] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 1, 2);
			break;
		case 6:
			gameboard[2][0] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 2, 0);
			break;
		case 7:
			gameboard[2][1] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 2, 1);
			break;
		case 8:
			gameboard[2][2] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 2, 2);
			break;
	}
	if (currentTurn === 9 && !isTheGameFinished) isTheGameFinished = true;
}

function verifyWinAndLoseConditions(mySymbol, iIndex, jIndex) {
	const adjacentPositions = {
		up: {i: iIndex-1, j:jIndex},
		down: {i: iIndex+1, j:jIndex},
		left: {i: iIndex, j:jIndex-1},
		right: {i: iIndex, j:jIndex+1},
		upleft: {i: iIndex-1, j:jIndex-1},
		upright: {i: iIndex-1, j:jIndex+1},
		downleft: {i: iIndex+1, j:jIndex-1},
		downright: {i: iIndex+1, j:jIndex+1}
	};
	for (const direction in adjacentPositions) {
		if (!isTheGameFinished) {
			const i = adjacentPositions[direction].i;
			const j = adjacentPositions[direction].j;
			if (isThereAnotherSymbolAdjacent(i, j, mySymbol)) {
				switch (direction) {
					case "up":
						if (isThereAnotherSymbolAdjacent(i-1, j, mySymbol)) {
							isTheGameFinished = true;
						} else if (isThereAnotherSymbolAdjacent(i+2, j, mySymbol)) {
							isTheGameFinished = true;
						}
						break;
					case "down":
						if (isThereAnotherSymbolAdjacent(i+1, j, mySymbol)) {
							isTheGameFinished = true;
						} else if (isThereAnotherSymbolAdjacent(i-2, j, mySymbol)) {
							isTheGameFinished = true;
						}
						break;
					case "left":
						if (isThereAnotherSymbolAdjacent(i, j-1, mySymbol)) {
							isTheGameFinished = true;
						} else if (isThereAnotherSymbolAdjacent(i, j+2, mySymbol)) {
							isTheGameFinished = true;
						}
						break;
					case "right":
						if (isThereAnotherSymbolAdjacent(i, j+1, mySymbol)) {
							isTheGameFinished = true;
						} else if (isThereAnotherSymbolAdjacent(i, j-2, mySymbol)) {
							isTheGameFinished = true;
						}
						break;
					case "upleft":
						if (isThereAnotherSymbolAdjacent(i-1, j-1, mySymbol)) {
							isTheGameFinished = true;
						} else if (isThereAnotherSymbolAdjacent(i+2, j+2, mySymbol)) {
							isTheGameFinished = true;
						}
						break;
					case "upright":
						if (isThereAnotherSymbolAdjacent(i-1, j+1, mySymbol)) {
							isTheGameFinished = true;
						} else if (isThereAnotherSymbolAdjacent(i+2, j-2, mySymbol)) {
							isTheGameFinished = true;
						}
						break;
					case "downleft":
						if (isThereAnotherSymbolAdjacent(i+1, j-1, mySymbol)) {
							isTheGameFinished = true;
						} else if (isThereAnotherSymbolAdjacent(i-2, j+2, mySymbol)) {
							isTheGameFinished = true;
						}
						break;
					case "downright":
						if (isThereAnotherSymbolAdjacent(i+1, j+1, mySymbol)) {
							isTheGameFinished = true;
						} else if (isThereAnotherSymbolAdjacent(i-2, j-2, mySymbol)) {
							isTheGameFinished = true;
						}
						break;
				}
			}
		}
	}
}

function isThereAnotherSymbolAdjacent(i, j, symbol) {
	return (gameboard[i] !== undefined && gameboard[i][j] !== undefined) && (gameboard[i][j] === symbol);
}