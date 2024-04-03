require("dotenv").config();

module.exports = {
  loginUrl: process.env.LOGIN_URL,
  alias: process.env.ALIAS,
  password: process.env.PASSWORD,
  gameUrl: process.env.GAME_URL,
  depth: process.env.DEPTH,
  multipv: process.env.MULTI_PV,
  bestMove: process.env.BEST_MOVE,
};
