const highlighColors = [
  '#ff4f4f' /*crimson*/,
  '#ffc54f' /*orange*/,
  '#4fa9ff' /*blue*/,
];

function highlightSquare(square, bestMove) {
  const board = document.querySelector('#board-single');
  const div = document.createElement('div');
  div.classList.add('highlight');
  div.classList.add('best-move');
  div.classList.add(square);

  console.log(square, bestMove);
  console.log(board.classList.contains('flipped'));

  div.style = `background-color: ${
    highlighColors[bestMove]
  }; opacity: 0.8; height:1%; width:1%; position: absolute; top: ${
    board.classList.contains('flipped')
      ? (square[1] - 1) * 12.5
      : (8 - square[1]) * 12.5
  }%; left:  ${
    board.classList.contains('flipped')
      ? (8 - square[0]) * 12.5 + bestMove
      : (square[0] - 1) * 12.5 + bestMove
  }%;`;
  div.dataset.testElement = 'highlight';
  board.appendChild(div);
}

function clearHighlightedSquares() {
  const highlightedSquares = document.querySelectorAll(
    '#board-single .best-move'
  );
  highlightedSquares.forEach((f) => {
    f.remove();
  });
}
