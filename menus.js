"use strict"
//* Main Menu
const mainMenu = document.querySelector(".main-menu");
const playButton = document.querySelector("#play-button");
const darkmodeButton = document.querySelector("#darkmode-button");
const languageButton = document.querySelector("#language-button");
const rankingsButton = document.querySelector("#rankings-button");
const settingsButton = document.querySelector("#settings-button");

playButton.addEventListener("click", () => {
	mainMenu.classList.add("inactive");
	gameboard.classList.remove("inactive");
});

//* Game End Screen
const htmlBody = document.querySelector("body");