// ==UserScript==
// @name         Kings Advisor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       mzrokz
// @match        https://www.chess.com/game/live/*
// @match        https://www.chess.com/analysis/game/live/*
// @require      https://cdn.socket.io/4.7.1/socket.io.js
// @require      file://D:\Work\Chess\KingsAdvisor\scripts\stockfish.js
// @require      file://D:\Work\Chess\KingsAdvisor\scripts\stockfishScript.js
// @require      file://D:\Work\Chess\KingsAdvisor\scripts\fenScript.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chess.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const boardLayout = document.querySelector("#board-layout-main");
  const button = document.createElement("button");
  button.innerHTML = "Generate FEN";
  button.onclick = function () {
    const fen = genFenScript();
    getMoves(fen);
  };
  boardLayout.insertBefore(button, boardLayout.childNodes[0]);
})();
