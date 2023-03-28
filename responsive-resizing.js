"use strict"
//* Defaut Values and Initializations
const gameboard = document.querySelector(".gameboard");
let gameboardSize;
const baseSize = 0.8;
const linesSize = 0.0375;
const symbolsSize = 0.10;
window.addEventListener("load", setGameboardSize);
window.addEventListener("resize", setGameboardSize);

//* Resizing Gameboard
function setGameboardSize() {
	if (window.innerWidth < window.innerHeight) {
		gameboardSize = Math.trunc(baseSize * window.innerWidth);
	} else {
		gameboardSize = Math.trunc(baseSize * window.innerHeight);
	}
	gameboard.style.width = `${gameboardSize}px`;
	gameboard.style.height = `${gameboardSize}px`;
	gameboard.style.fontSize = `${gameboardSize * symbolsSize}px`;
	gameboard.style.gridGap = `${Math.trunc(gameboardSize * linesSize)}px`;
}