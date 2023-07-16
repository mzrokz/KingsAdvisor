let mutation = {
  /* Setup mutation observer on move-list to listen for any new moves 
    and generete a new fen and send to stockfish spawned process */
  observeMoveList: async (page) => {
    const moveList = document.querySelector(".vertical-move-list");
    // Define a custom function to observe element changes
    const observeChanges = async () => {
      return new Promise((resolve, reject) => {
        const observer = new MutationObserver((mutations) => {
          // Handle the element changes here
          // You can perform desired actions or resolve the promise when the desired change is detected
          resolve(mutations);
          observer.disconnect(); // Disconnect the observer once the changes are detected
        });

        observer.observe(moveList, { childList: true, subtree: true });
      });
    };

    // Wait for element changes using the custom function
    const mutations = await page.waitForFunction(observeChanges);

    console.log(mutations); // Log the observed mutations
  },
};

export { mutation };
