import Ship from "../classes/ship";

export function renderPlayer1GameBoard(player) {
  // Get the game board element from the HTML
  const gameBoardElement = document.getElementById("player-1-board");

  // Clear the existing content of the game board
  gameBoardElement.innerHTML = "";
  console.log(player);
  let gameBoard = player.getBoard();

  // Loop through each row and column of the player's game board
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      // Create a new cell element for each position on the game board
      const cellElement = document.createElement("div");

      cellElement.dataset.row = row;
      cellElement.dataset.col = col;

      if (gameBoard[row][col] instanceof Ship) {
        cellElement.className = "ship";
      } else if (gameBoard[row][col] === "hit") {
        cellElement.className = "hit";
      } else if (gameBoard[row][col] === "miss") {
        cellElement.className = "miss";
      } else {
        cellElement.className = "empty";
      }
      cellElement.classList.add("cells");
      cellElement.classList.add("player-1-cells");
      // Append the cell element to the game board element
      gameBoardElement.appendChild(cellElement);
    }
  }
}

export function renderPlayer2GameBoard(player) {
  // Get the game board element from the HTML
  const gameBoardElement = document.getElementById("player-2-board");

  // Clear the existing content of the game board
  gameBoardElement.innerHTML = "";
  let gameBoard = player.getBoard();

  // Loop through each row and column of the player's game board
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      // Create a new cell element for each position on the game board
      const cellElement = document.createElement("div");
      cellElement.dataset.row = row;
      cellElement.dataset.col = col;

      // Set the class of the cell element based on the value in the game board
      if (gameBoard[row][col] instanceof Ship) {
        cellElement.className = "ship";
      } else if (gameBoard[row][col] === "hit") {
        cellElement.className = "hit";
      } else if (gameBoard[row][col] === "miss") {
        cellElement.className = "miss";
      } else {
        cellElement.className = "empty";
      }
      cellElement.classList.add("cells");
      cellElement.classList.add("player-2-cells");
      // Append the cell element to the game board element
      gameBoardElement.appendChild(cellElement);
    }
  }
}

export default { renderPlayer1GameBoard, renderPlayer2GameBoard };
