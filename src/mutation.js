const stockFish = require('./stockfish');

let mutation = {
  /* Setup mutation observer on move-list to listen for any new moves 
    and generete a new fen and send to stockfish spawned process */
  observeMoveList: async (page) => {
    page.exposeFunction('onMoveListMutation', (fen) => {
      console.log(fen);
      stockFish.getNextMoves(fen);
    });
  },
};

module.exports = mutation;
