const puppeteer = require("puppeteer");
require("dotenv").config();
const stockFish = require("./scripts/stockfish");
const mutation = require("./scripts/mutation");

async function scrapeWebsite() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Set the desired window size
  await page.setViewport({ width: 1500, height: 800 });

  await page.goto(process.env.LOGIN_URL);
  await page.waitForSelector("#username");
  await page.type("#username", process.env.ALIAS);
  await page.type("#password", process.env.PASSWORD);
  await page.click("#_remember_me");
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.click("#login"),
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  page.goto("https://www.chess.com/play");
  await new Promise((r) => setTimeout(r, 2000));

  page.goto(process.env.GAME_URL);

  await page.waitForSelector(".board .piece");

  await Promise.race([
    page.waitForSelector(".vertical-move-list"),
    page.waitForSelector(".horizontal-move-list"),
  ]);

  await new Promise((r) => setTimeout(r, 3000));

  // Attach a script to the page
  await page.addScriptTag({ path: "page-scripts/fenScript.js" });
  await page.addScriptTag({ path: "page-scripts/mutation-observer.js" });
  await page.addScriptTag({ path: "page-scripts/chess-board.js" });

  let fen = "";
  while (fen === "") {
    try {
      fen = await page.evaluate(() => {
        return genFenScript();
      });
      console.log(fen);
    } catch (error) {
      console.log(error);
    }
  }

  stockFish.spawnStockfish();
  stockFish.startNewGame();
  stockFish.setProcessOutput(page);

  mutation.observeMoveList(page);
  stockFish.getNextMoves(fen);

  // wait for 5 seconds
  // await new Promise((r) => setTimeout(r, 200000));
  //   stockfish.stdin.write("quit\n");

  //   await browser.close();
  // while (true) {
  //   // stockFish.getNextMoves(fen);
  // }

  process.on("SIGINT", () => {
    console.log("Received SIGINT signal. Exiting...");
    process.exit(0);
  });

  console.log("Waiting for Ctrl+C...");

  // Keep the program running indefinitely
  setInterval(() => {}, 1000);
}

scrapeWebsite();
