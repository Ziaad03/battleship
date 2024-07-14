import GameBoard from "./gameboard";

// Define the Player class to handle player actions and game logic

export class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard();
  }

  // Method to fire a shot on the enemy game board
  fireShot(row, col, enemyGameBoard) {
    enemyGameBoard.receiveAttack(row, col);
  }
  // Method to place a ship on the player's game board
  playerPlaceShip(ship, row, col, orientation) {
    this.gameBoard.placeShip(ship, row, col, orientation);
  }

  getBoard() {
    return this.gameBoard.board;
  }
}

export default Player;
