const puppeteer = require('puppeteer');

const launch = async () => {
  // launch chess.com on puppeteer
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1800,
      height: 950,
    },
  });
  const page = await browser.newPage();
  await page.goto(process.env.LOGIN_URL);
  await page.waitForSelector('input[name="_username"]');
  // get usernmae from .env file
  await page.type('input[name="_username"]', process.env.ALIAS);
  await page.type('input[name="_password"]', process.env.PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForSelector('#board', { timeout: 0 });

  await page.exposeFunction('startGame', async () => {
    console.log('Game started');
  });

  page.evaluate(() => {
    const form = document.querySelector('.nav-search-form');
    if (form) {
      // add flex-direction column
      form.style.flexDirection = 'column';
    }
  });

  //   await addScriptTags(page);
  await attachStartGame(page);

  //   await browser.close();
};

const attachStartGame = async (page) => {
  // Expose a start game function and add start game button to page calling this exposed function'
  await page.evaluate(() => {
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Game';
    startButton.onclick = async () => {
      await window.startGame();
    };
    document.body.querySelector('.nav-search-form').appendChild(startButton);
  });
};

const addScriptTags = async (page) => {
  // Attach a script to the page
  await page.addScriptTag({ path: './page-scripts/fenScript.js' });
  await page.addScriptTag({ path: './page-scripts/mutation-observer.js' });
  await page.addScriptTag({ path: './page-scripts/chess-board.js' });
};

launch();
