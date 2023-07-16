const { spawn } = require("child_process");
const getHighlightClass = require("./chess-board");

let stockFish = {
  process: null,
  spawnStockfish: () => {
    // Path to the Stockfish executable
    const stockfishPath = "../../../stockfish_20090216_x64.exe";

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

  getNextMoves: (fen, depth = 10, multipv = 5) => {
    // Set the position using a FEN string
    process.stdin.write(`position fen ${fen}\n`);
    process.stdin.write("setoption name MultiPV value 5\n");

    // Ask Stockfish to calculate the best move
    process.stdin.write("go depth 10\n");
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
      if (line.includes("bestmove")) {
        const move = line
          .match(/bestmove ..../)[0]
          .split(" ")[1]
          .substring(0, 2);
        const highlightClass = getHighlightClass(move);
        page.evaluate(() => {
          return clearHighlightedSquares();
        });
        page.evaluate((args) => {
          return highlightSquare(args);
        }, highlightClass);
      }
    });
  },

  getProcess() {
    return process;
  },
};

module.exports = stockFish;
