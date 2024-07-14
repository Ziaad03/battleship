import Player from "./classes/player";
import Ship from "./classes/ship";
import {
  renderPlayer1GameBoard,
  renderPlayer2GameBoard,
} from "./utils/domManger";

// create players
const player1 = new Player("Player 1");
const player2 = new Player("Player 2");
// Create gameboard
function init() {
  // Create ships
  const ship1 = new Ship(5);
  const ship2 = new Ship(4);
  const ship3 = new Ship(3);
  const ship4 = new Ship(3);
  const ship5 = new Ship(2);

  // Add ships to player 1 gameboard
  player1.playerPlaceShip(ship1, 0, 0, "horizontal");
  player1.playerPlaceShip(ship2, 1, 0, "horizontal");
  player1.playerPlaceShip(ship3, 2, 0, "horizontal");
  player1.playerPlaceShip(ship4, 3, 0, "horizontal");
  player1.playerPlaceShip(ship5, 4, 0, "horizontal");

  // Add ships to player 2 gameboard
  player2.playerPlaceShip(ship1, 0, 4, "vertical");
  player2.playerPlaceShip(ship2, 1, 2, "vertical");
  player2.playerPlaceShip(ship3, 2, 3, "vertical");
  player2.playerPlaceShip(ship4, 3, 7, "vertical");
  player2.playerPlaceShip(ship5, 4, 9, "vertical");

  // Render game boards
  renderPlayer1GameBoard(player1);
  renderPlayer2GameBoard(player2);
}

// Function to handle player's turn
function playerHit(player, enemyBoard, row, col) {
  player.fireShot(row, col, enemyBoard);
  renderPlayer1GameBoard(player1);
  renderPlayer2GameBoard(player2);
}

function startGame() {
  // Initialize game
  console.log("Game started");
  init();
  let player1Turn = true;

  // Get the parent elements of the game boards
  const player1Board = document.getElementById("player-1-board");
  const player2Board = document.getElementById("player-2-board");

  if (player1Board) {
    player1Board.addEventListener("click", (event) => {
      const row = parseInt(event.target.dataset.row);
      const col = parseInt(event.target.dataset.col);

      if (!player1Turn) {
        playerHit(player2, player1.gameBoard, row, col);
        player1Turn = true;
      }
    });
  } else {
    console.error("Player 1 board not found");
  }

  if (player2Board) {
    player2Board.addEventListener("click", (event) => {
      const row = parseInt(event.target.dataset.row);
      const col = parseInt(event.target.dataset.col);

      if (player1Turn) {
        playerHit(player1, player2.gameBoard, row, col);
        player1Turn = false;
      }
    });
  } else {
    console.error("Player 2 board not found");
  }
}

export default startGame;
