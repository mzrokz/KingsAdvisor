const highlighColors = [
  "#ff4f4f" /*crimson*/,
  "#ffc54f" /*orange*/,
  "#4fa9ff" /*blue*/,
];

function highlightSquare(className, bestMove) {
  const board = document.querySelector("#board-single");
  const div = document.createElement("div");
  div.classList.add(className);
  div.classList.add("highlight");
  div.classList.add("best-move");

  div.style = `background-color: ${highlighColors[bestMove]}; opacity: 0.8;`;
  div.dataset.testElement = "highlight";
  board.appendChild(div);
}

function clearHighlightedSquares() {
  const highlightedSquares = document.querySelectorAll(
    "#board-single .best-move"
  );
  highlightedSquares.forEach((f) => {
    f.remove();
  });
}
