import Ship from "../classes/ship";
import style from "../style.css";
export function displayGame() {
  let Title = document.createElement("h1");
  Title.textContent = "Battleship";
  document.body.appendChild(Title);
  let gameContainer = document.createElement("div");
  gameContainer.id = "game-board";
  document.body.appendChild(gameContainer);
  let playerBoard1 = document.createElement("div");
  playerBoard1.classList.add("player-board");
  let playerBoard2 = document.createElement("div");
  playerBoard2.classList.add("player-board");

  gameContainer.appendChild(playerBoard1);
  gameContainer.appendChild(playerBoard2);

  let player1Title = document.createElement("h2");
  player1Title.textContent = "Player 1's Board";
  let player2Title = document.createElement("h2");
  player2Title.textContent = "Player 2's Board";
  playerBoard1.appendChild(player1Title);
  playerBoard2.appendChild(player2Title);

  let player1Board = document.createElement("div");
  player1Board.id = "player-1-board";
  player1Board.classList.add("board");
  playerBoard1.appendChild(player1Board);
  let player2Board = document.createElement("div");
  player2Board.id = "player-2-board";
  player2Board.classList.add("board");
  playerBoard2.appendChild(player2Board);
}

export function renderPlayer1GameBoard(player) {
  // Get the game board element from the HTML
  const gameBoardElement = document.getElementById("player-1-board");

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

export default { renderPlayer1GameBoard, renderPlayer2GameBoard, displayGame };
