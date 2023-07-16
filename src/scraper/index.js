const puppeteer = require("puppeteer");
require("dotenv").config();
const { stockFish } = require("./scripts/stockfish");
const { mutation } = require("./scripts/mutation");

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

  await new Promise((r) => setTimeout(r, 2000));

  // Attach a script to the page
  await page.addScriptTag({ path: "page-scripts/fenScript.js" });
  const fen = await page.evaluate(() => {
    return genFenScript();
  });
  console.log(fen);

  stockFish.spawnStockfish();
  stockFish.startNewGame();

  // Handle Stockfish output
  stockFish.process.stdout.on("data", (data) => {
    // console.log("Stockfish output:", data.toString());
    // transform data into "score cp and pv moves"
    if (
      data.toString().includes("multipv") &&
      data.toString().includes("score cp") &&
      data.toString().includes("pv")
    ) {
      console.log(data.toString());
    }
  });

  mutation.observeMoveList(page);

  // wait for 5 seconds
  //   await new Promise((r) => setTimeout(r, 200000));
  //   stockfish.stdin.write("quit\n");

  //   await browser.close();
}

scrapeWebsite();
