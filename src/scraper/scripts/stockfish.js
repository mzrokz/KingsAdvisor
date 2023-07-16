const { spawn } = require("child_process");

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
};

export { stockFish };
