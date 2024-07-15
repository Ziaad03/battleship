export class GameBoard {
  constructor() {
    // 2D 10x10 array, initializing with null to represent empty spots
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    this.missedAttacks = [];
    this.ships = [];
  }

  placeShip(ship, row, col, orientation) {
    // throw an error if row or column are not valid
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      throw new Error("Invalid row or column");
    }

    // validate this place according to orientation
    if (orientation === "vertical") {
      // check if there is enough space for the ship vertically
      if (row + (ship.length - 1) > 9) {
        return false;
      }

      // check if there is any ship already there
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][col]) {
          return false;
        }
      }

      // place the ship on board
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col] = ship;
      }
    } else {
      // check if there is enough space for the ship horizontally
      if (col + (ship.length - 1) > 9) {
        return false;
      }

      // check if there is any ship already there
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col + i]) {
          return false;
        }
      }

      // place the ship on board
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i] = ship;
      }
    }

    this.ships.push(ship);
    return true;
  }

  receiveAttack(row, col) {
    // throw an error if row or column are not valid
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      throw new Error("Invalid row or column");
    }

    if (this.board[row][col] === null) {
      this.missedAttacks.push([row, col]);
      this.board[row][col] = "miss";
      return true;
    } else if (this.board[row][col] === "hit") {
      return false;
    } else if (this.board[row][col] === "miss") {
      return false;
    } else {
      const ship = this.board[row][col];
      ship.hit();
      this.board[row][col] = "hit";
      return true;
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export default GameBoard;
