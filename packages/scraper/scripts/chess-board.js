const horizontalSquare = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };
function getHighlightClasses(strSquare) {
  const highlightClasses = [
    `square-${horizontalSquare[strSquare[0]]}${strSquare[1]}`,
    `square-${horizontalSquare[strSquare[2]]}${strSquare[3]}`,
  ];
  return highlightClasses;
}

module.exports = getHighlightClasses;
