import Player from "./classes/player";
import Ship from "./classes/ship";
import {
  renderPlayer1GameBoard,
  renderPlayer2GameBoard,
  displayGame,
} from "./utils/domManger";

// create players
const player1 = new Player("Player 1");
const player2 = new Player("Player 2");
// Create gameboard
function init(shipsData) {
  // Create ships
  let ship1Data = shipsData[0];
  let ship2Data = shipsData[1];
  let ship3Data = shipsData[2];
  let ship4Data = shipsData[3];
  let ship5Data = shipsData[4];

  let ship1Width = ship1Data.width;
  let ship2Width = ship2Data.width;
  let ship3Width = ship3Data.width;
  let ship4Width = ship4Data.width;
  let ship5Width = ship5Data.width;

  let ship1 = new Ship(ship1Width);
  let ship2 = new Ship(ship2Width);
  let ship3 = new Ship(ship3Width);
  let ship4 = new Ship(ship4Width);
  let ship5 = new Ship(ship5Width);

  // Add ships to player 1 gameboard
  let ship1Row = Number(ship1Data.row);
  let ship1Col = Number(ship1Data.col);
  let ship2Row = Number(ship2Data.row);
  let ship2Col = Number(ship2Data.col);
  let ship3Row = Number(ship3Data.row);
  let ship3Col = Number(ship3Data.col);
  let ship4Row = Number(ship4Data.row);
  let ship4Col = Number(ship4Data.col);
  let ship5Row = Number(ship5Data.row);
  let ship5Col = Number(ship5Data.col);

  player1.playerPlaceShip(ship1, ship1Row, ship1Col, "horizontal");
  player1.playerPlaceShip(ship2, ship2Row, ship2Col, "horizontal");
  player1.playerPlaceShip(ship3, ship3Row, ship3Col, "horizontal");
  player1.playerPlaceShip(ship4, ship4Row, ship4Col, "horizontal");
  player1.playerPlaceShip(ship5, ship5Row, ship5Col, "horizontal");

  // Add ships to player 2 gameboard and use  random numbers every time
  function getRandomOrientation() {
    return Math.random() < 0.5 ? "horizontal" : "vertical";
  }

  player2.playerPlaceShip(
    ship1,
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    getRandomOrientation()
  );
  player2.playerPlaceShip(
    ship2,
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    getRandomOrientation()
  );
  player2.playerPlaceShip(
    ship3,
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    getRandomOrientation()
  );
  player2.playerPlaceShip(
    ship4,
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    getRandomOrientation()
  );
  player2.playerPlaceShip(
    ship5,
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    getRandomOrientation()
  );

  // Render game boards
  renderPlayer1GameBoard(player1);
  renderPlayer2GameBoard(player2);
}

// Function to handle player's turn
function playerHit(player, enemyBoard, row, col) {
  let result = player.fireShot(row, col, enemyBoard);
  renderPlayer1GameBoard(player1);
  renderPlayer2GameBoard(player2);
  return result;
}

function startGame(shipsData) {
  // Initialize game
  displayGame();
  console.log("Game started");
  init(shipsData);
  let player1Turn = true;
  let gameOver = false;

  // Get the parent elements of the game boards
  const player1Board = document.getElementById("player-1-board");
  const player2Board = document.getElementById("player-2-board");

  // Computer turn
  function computerTurn() {
    if (!player1Turn) {
      let randomRow = Math.floor(Math.random() * 10);
      let randomCol = Math.floor(Math.random() * 10);
      let result = playerHit(player2, player1.gameBoard, randomRow, randomCol);
      while (result === false) {
        randomRow = Math.floor(Math.random() * 10);
        randomCol = Math.floor(Math.random() * 10);
        result = playerHit(player2, player1.gameBoard, randomRow, randomCol);
      }

      if (player1.gameBoard.allShipsSunk()) {
        gameOver = true;
        console.log("Computer wins!");
      } else {
        player1Turn = true;
      }
    }
  }

  // Player turn
  function playerTurn(event) {
    if (player1Turn && !gameOver) {
      let row = parseInt(event.target.dataset.row);
      let col = parseInt(event.target.dataset.col);
      let result = playerHit(player1, player2.gameBoard, row, col);
      if (result === false) {
        console.log("Invalid move! Try again.");
        return;
      }
      if (player2.gameBoard.allShipsSunk()) {
        gameOver = true;
        console.log("Player 1 wins!");
      } else {
        player1Turn = false;
        setTimeout(computerTurn, 500); // Delay computer turn for better UX
      }
    }
  }

  // Attach event listener to player 2's board for player 1's turn
  if (player2Board) {
    player2Board.addEventListener("click", playerTurn);
  } else {
    console.error("Player 2 board not found");
  }
}

export default startGame;
