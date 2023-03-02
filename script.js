/* Valores por Defecto e Inicializaciones */
"use strict"
const gameboardSquares = document.getElementsByClassName("gameboard__square");

let currentSymbol = "X";
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

for (let square of gameboardSquares) {
	square.addEventListener("click", () => {
		square.textContent = currentSymbol;
		switchSymbol();
	});
}