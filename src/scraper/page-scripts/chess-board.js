function highlightSquare(className) {
  const board = document.querySelector("#board-single");
  const div = document.createElement("div");
  div.className = className;
  div.style = "background-color: rgb(235, 97, 80); opacity: 0.8;";
  div.dataset.testElement = "highlight";
  board.appendChild(div);
}

function clearHighlightedSquares() {
  const highlightedSquares = document.querySelectorAll(
    "#board-single .highlight"
  );
  highlightedSquares.forEach((f) => {
    f.remove();
  });
}
