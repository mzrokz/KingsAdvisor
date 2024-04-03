const { spawn } = require("child_process");
const getHighlightClasses = require("./chess-board");
const config = require("./config");

let stockFish = {
  process: null,
  spawnStockfish: () => {
    // Path to the Stockfish executable
    const stockfishPath = "./stockfish_20090216_x64.exe";

    // Arguments to be passed to Stockfish
    const args = [];

    // Spawn the Stockfish process
    process = spawn(stockfishPath, args, {
      detached: true,
    });
  },

  startNewGame: () => {
    // Send commands to Stockfish
    process.stdin.write("uci\n");
    process.stdin.write("isready\n");
    process.stdin.write("ucinewgame\n");
  },

  getNextMoves: (fen, depth = config.depth, multipv = config.multipv) => {
    // Set the position using a FEN string
    process.stdin.write(`position fen ${fen}\n`);
    process.stdin.write(`setoption name MultiPV value ${multipv}\n`);

    // Ask Stockfish to calculate the best move
    process.stdin.write(`go depth ${depth}\n`);
  },

  setProcessOutput: (page) => {
    // Handle Stockfish output
    process.stdout.on("data", (data) => {
      const line = data.toString();
      console.log("Stockfish output:", line);
      // transform data into "score cp and pv moves"
      if (
        line.includes("multipv") &&
        line.includes("score cp") &&
        line.includes("pv")
      ) {
        console.log(line);
      }
      if (false && line.includes("bestmove")) {
        const move = line
          .match(/bestmove ..../)[0]
          .split(" ")[1]
          .substring(0, 2);
        const highlightClass = getHighlightClasses(move);
        page.evaluate(() => {
          return clearHighlightedSquares();
        });
        page.evaluate((args) => {
          return highlightSquare(args);
        }, highlightClass);
      }

      if (line.includes("multipv")) {
        for (let move = config.bestMove; move > 0; move--) {
          const bestMove = line.match(`multipv ${move}.*?pv (.\\d.\\d)`);
          if (bestMove && bestMove[1]) {
            const highlightClasses = getHighlightClasses(bestMove[1]);
            page.evaluate(() => {
              return clearHighlightedSquares();
            });
            highlightClasses.forEach((highlightClass) => {
              page.evaluate(
                (args) => {
                  return highlightSquare(args[0], args[1]);
                },
                [highlightClass, move - 1]
              );
            });
          }
        }
      }
    });
  },
};

module.exports = stockFish;
