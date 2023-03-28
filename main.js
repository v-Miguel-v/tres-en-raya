"use strict"
//* Defaut Values and Initializations
let symbol1 = "✨";
let symbol2 = "💮";
let currentTurn = 0;
let currentSymbol = symbol1;
let isTheGameFinished = false;
const referenceGameboard = [[,,,],[,,,],[,,,]];
const gameboardSquares = document.getElementsByClassName("gameboard__square");

//* Main Game Logic
for (const square of gameboardSquares) {
	square.addEventListener("click", () => {
		if (!isTheGameFinished) {
			if (square.textContent === "") {
				square.textContent = currentSymbol;
				registerMove(square);
				switchSymbol();
				if (isTheGameFinished) showEndGameScreen();
			}
		}
	});
}

//* Complementary Functions
function switchSymbol() {
	switch (currentSymbol) {
		case symbol1:
			currentSymbol = symbol2;
			break;
		case symbol2:
			currentSymbol = symbol1;
			break;
	}
}

function registerMove(mySquare) {
	currentTurn++;
	const mySquareNumber = Number(mySquare.id[17]);
	const mySquareSymbol = mySquare.textContent;
	switch (mySquareNumber) {
		case 0:
			referenceGameboard[0][0] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 0, 0);
			break;
		case 1:
			referenceGameboard[0][1] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 0, 1);
			break;
		case 2:
			referenceGameboard[0][2] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 0, 2);
			break;
		case 3:
			referenceGameboard[1][0] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 1, 0);
			break;
		case 4:
			referenceGameboard[1][1] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 1, 1);
			break;
		case 5:
			referenceGameboard[1][2] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 1, 2);
			break;
		case 6:
			referenceGameboard[2][0] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 2, 0);
			break;
		case 7:
			referenceGameboard[2][1] = mySquareSymbol;
			verifyWinAndLoseConditions(mySquareSymbol, 2, 1);
			break;
		case 8:
			referenceGameboard[2][2] = mySquareSymbol;
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
	return (referenceGameboard[i] !== undefined && referenceGameboard[i][j] !== undefined) && (referenceGameboard[i][j] === symbol);
}

function showEndGameScreen() {
	const button = document.createElement("button");
	button.style = `
		position: absolute;
		font-size: var(--minor-buttons-size);
	`;
	button.innerText = "Regresar al Menú Principal";
	htmlBody.appendChild(button);
	button.addEventListener("click", () => {
		mainMenu.classList.remove("inactive");
		gameboard.classList.add("inactive");
		button.remove();
		cleanGameboard();
	});
}

function cleanGameboard() {
	currentTurn = 0;
	isTheGameFinished = false;
	referenceGameboard.pop();
	referenceGameboard.pop();
	referenceGameboard.pop();
	referenceGameboard.push([,,,]);
	referenceGameboard.push([,,,]);
	referenceGameboard.push([,,,]);
	for (const square of gameboardSquares) {
		square.textContent = "";
	}
}