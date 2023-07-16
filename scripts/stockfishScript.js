// var stockfish = null;
// function setupStockFish() {
//   stockfish = new Worker(
//     "https://raw.githubusercontent.com/nmrugg/stockfish.js/master/src/stockfish.js"
//   );
//   stockfish.onmessage = function (event) {
//     var response = event.data;
//     // Handle the response
//     console.log("response", response);
//   };
// }

// function getMoves(fen) {
//   stockfish.postMessage("uci");
//   // Set the FEN position
//   stockfish.postMessage("position fen " + fen);
//   // Start the analysis
//   stockfish.postMessage("go");
// }

// function getMoves(fen) {
//   // Socket.io client-side code
//   const socket = io("https://0e4d-122-168-14-142.ngrok-free.app");

//   // Your custom client-side code using Socket.io
//   // ...
//   socket.emit("chat message", "Hello, server!");
// }

function getMoves(fen) {
  //   const url = "https://0e4d-122-168-14-142.ngrok-free.app";
  //   const url = "http://localhost:3000";
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       debugger;
  //       console.log("Success:", data);
  //     });

  // Post request on https://localhost:44366/api/uci/GetBestMoves
  const url = "https://localhost:44366/api/uci/GetBestMoves";
  const data = {
    FenString: fen,
    Depth: 10,
    MultiPv: 0,
    WaitTime: 5,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(url, options)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
