const horizontalSquare = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };

function getHighlightClass(strSquare) {
  const highlightClass = `highlight square-${horizontalSquare[strSquare[0]]}${
    strSquare[1]
  }`;
  return highlightClass;
}

module.exports = getHighlightClass;
