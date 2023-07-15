function genFenScript() {
  // var squareClasses = ["piece wr square-11", "piece wn square-21", "piece wb square-31", "piece wq square-41", "piece wk square-51", "piece wb square-61", "piece wn square-63", "piece wr square-81", "piece wp square-12", "piece wp square-22", "piece wp square-32", "piece wp square-52", "piece wp square-62", "piece wp square-72", "piece wp square-82", "piece bq square-66", "piece bp square-17", "piece bp square-27", "piece bp square-37", "piece bp square-47", "piece bp square-77", "piece bp square-87", "piece br square-18", "piece bn square-28", "piece bb square-38", "piece bk square-58", "piece bb square-68", "piece bn square-78", "piece br square-88"];
  var chessBoard = null;

  let squares = document
    .getElementsByClassName("board")[0]
    .querySelectorAll(".piece");
  var squareClassList = [];
  squares.forEach((f) => {
    // console.log(f.className);
    squareClassList.push(f.className);
  });
  // console.log(squareClassList);

  {
    chessBoard = new Array(8);

    for (var i = 1; i <= 8; i++) {
      chessBoard[i] = new Array(8);
    }

    squareClassList.forEach((squareClass) => {
      // var className = 'piece bq square-53';
      let className = squareClass;
      let regexp = /square-\d\d/;

      let match = className.match(regexp);
      if (match[0] && match[0] != "") {
        let sqMatch = match[0].match(/\d\d/);
        if (sqMatch[0] && sqMatch[0] != "") {
          var sqNum = sqMatch[0];
        }
      }

      var p = className.match(/\s..\s/);
      if (p[0] && p[0] != "") {
        var piece = p[0].trim();
      }

      // console.log(sqNum);

      chessBoard[sqNum[1]][sqNum[0]] = piece;
    });

    var strFen = "";
    for (var l = 8; l >= 1; l--) {
      for (var m = 1; m <= 8; m++) {
        var p = getPieceInitals(chessBoard[l][m]);
        if (p) {
          strFen += p;
        }
      }
      if (l > 1) {
        strFen += "/";
      }
    }

    var x = strFen.split("/");
    var y = [];
    x.forEach((f) => {
      var newFen = "";
      var occ = 0;
      for (var a = 0; a < 8; a++) {
        if (f[a] == "1") {
          // console.log(f)
          occ += 1;
          if (occ > 1) {
            var pos = newFen.length - 1;
            newFen = replaceAt(newFen, pos, occ);
            // console.log(newFen)
          } else {
            newFen += f[a];
          }
        } else {
          occ = 0;
          newFen += f[a];
        }
      }
      y.push(newFen);
    });

    var fen = y.join("/");

    // console.log(fen);
    // ----------------------------------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------
    var nextMove = "";
    var castle = "KQkq";
    var isWhiteCastle = true;
    var isBlackCastle = true;
    var movesPlayed = 0;

    if (!window.location.href.includes("analysis")) {
      var vmlElement = document.querySelector(".vertical-move-list");
      var movesList = vmlElement.children;
      var movesPlayed = movesList.length;

      for (let i = 0; i < movesList.length; i++) {
        var whiteMove = movesList[i].querySelector(".white");
        var blackMove = movesList[i].querySelector(".black");

        if (whiteMove) {
          var move;
          var piece = false;

          // if (whiteMove.children[0]) {
          //     move = whiteMove.children[0].attributes[0].value;
          //     piece = move.includes('rook') || move.includes('king')
          // }

          if (
            whiteMove.innerText == "O-O" ||
            whiteMove.innerText == "O-O-O" ||
            whiteMove.innerText.includes("K")
          ) {
            isBlackCastle = false;
          }
        }

        if (blackMove) {
          var move;
          var piece = false;

          // if (blackMove.children[0]) {
          //     move = blackMove.children[0].attributes[0].value;
          //     piece = move.includes('rook') || move.includes('king')
          // }

          if (
            blackMove.innerText == "O-O" ||
            blackMove.innerText == "O-O-O" ||
            blackMove.innerText.includes("K")
          ) {
            isWhiteCastle = false;
          }
        }

        if (!isWhiteCastle && !isBlackCastle) {
          castle = "-";
        } else {
          if (isWhiteCastle) {
            castle = "KQ";
          } else if (isBlackCastle) {
            castle = "kq";
          }
        }

        if (i <= movesList.length) {
          if (whiteMove) {
            nextMove = "b";
          }
          if (blackMove) {
            nextMove = "w";
          }
        }
      }
    } else {
      let movesList = document.querySelectorAll(".move-text");
      movesPlayed = parseInt(movesList.length / 2) + (movesList.length % 2);
      for (let i = 0; i < movesList.length; i++) {
        // if i is even then white has played
        if (i % 2 == 0) {
          if (
            movesList[i].innerText == "O-O" ||
            movesList[i].innerText == "O-O-O" ||
            movesList[i].innerText.includes("K")
          ) {
            isBlackCastle = false;
          }
          nextMove = "b";
        }
        // if i is odd then black has played
        else {
          if (
            movesList[i].innerText == "O-O" ||
            movesList[i].innerText == "O-O-O" ||
            movesList[i].innerText.includes("K")
          ) {
            isWhiteCastle = false;
          }
          nextMove = "w";
        }
      }

      if (!isWhiteCastle && !isBlackCastle) {
        castle = "-";
      } else {
        if (isWhiteCastle) {
          castle = "KQ";
        } else if (isBlackCastle) {
          castle = "kq";
        }
      }
    }

    // var cmdFen = `position fen ${fen} ${nextMove} ${castle} - 0 ${movesPlayed} moves \n`;
    var cmdFen = `${fen} ${nextMove} ${castle} - 0 ${movesPlayed} moves`;
    // p.stdin.write(`position fen ${fen} ${nextMove} ${castle} - 0 ${movesPlayed} moves \n`)
    // p.stdin.write("go depth 21 \n")
    // console.log(cmdFen);
  }
  return cmdFen;
}

function asd() {
  function apiSuccess(response) {
    // console.log(response);
    var divLines = $(".chessLines")[0];
    if (divLines) {
      // $(divLines).text(this.responseText);
      // $(divLines).html(this.responseText);
      divLines.innerText = response;
    }
  }

  var data = JSON.stringify({
    FenString: cmdFen,
    Depth: 15,
    MultiPv: 5,
    WaitTime: 3,
  });

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      jsfx.apiSuccess(this.responseText);
    }
  });

  xhr.open("POST", jsfx.apiUrl + "/api/uci/GetBestMoves");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);
}

function replaceAt(str, index, replacement) {
  if (index >= str.length) {
    return str.valueOf();
  }
  return str.substring(0, index) + replacement + str.substring(index + 1);
}

function getPieceInitals(piece) {
  if (piece && piece != "") {
    switch (piece) {
      case "wp":
        return "P";
      case "wr":
        return "R";
      case "wn":
        return "N";
      case "wb":
        return "B";
      case "wq":
        return "Q";
      case "wk":
        return "K";

      // ---------------------

      case "bp":
        return "p";
      case "br":
        return "r";
      case "bn":
        return "n";
      case "bb":
        return "b";
      case "bq":
        return "q";
      case "bk":
        return "k";

      default:
        return "1";
    }
  } else {
    return "1";
  }
}
