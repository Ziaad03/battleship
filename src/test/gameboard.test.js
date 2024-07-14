import GameBoard from "../classes/gameboard";
import Ship from "../classes/ship";

describe("GameBoard", () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  test("should place a ship on the board", () => {
    const ship1 = new Ship(3);
    gameBoard.placeShip(ship1, 0, 0, "horizontal");
    expect(gameBoard.board[0][0]).toBe(ship1);
    expect(gameBoard.board[0][1]).toBe(ship1);
    expect(gameBoard.board[0][2]).toBe(ship1);
  });

  test("instance of ship", () => {
    const ship1 = new Ship(3);
    gameBoard.placeShip(ship1, 0, 0, "horizontal");

    expect(gameBoard.board[0][0]).toBeInstanceOf(Ship);
    expect(gameBoard.board[0][1]).toBeInstanceOf(Ship);
    expect(gameBoard.board[0][2]).toBeInstanceOf(Ship);
  });

  test("should receive an attack and mark the board accordingly", () => {
    const ship1 = new Ship(3);
    gameBoard.placeShip(ship1, 0, 0, "horizontal");
    gameBoard.receiveAttack(0, 1);
    expect(gameBoard.board[0][1]).toBe("hit");
  });

  test("should return true if all ships are sunk", () => {
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    gameBoard.placeShip(ship1, 0, 0, "horizontal");
    gameBoard.placeShip(ship2, 1, 0, "vertical");
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(0, 1);
    gameBoard.receiveAttack(1, 0);
    gameBoard.receiveAttack(2, 0);
    gameBoard.receiveAttack(3, 0);
    expect(gameBoard.allShipsSunk()).toBe(true);
  });

  test("should throw an error if the row or column is out of range", () => {
    const ship1 = new Ship(3);
    expect(() => gameBoard.placeShip(ship1, -1, 0, "horizontal")).toThrow();
    expect(() => gameBoard.placeShip(ship1, 0, -1, "horizontal")).toThrow();
    expect(() => gameBoard.placeShip(ship1, 10, 0, "horizontal")).toThrow();
  });

  // more test cases
  test("should return false if there is not enough space for the ship", () => {
    const ship1 = new Ship(3);
    expect(gameBoard.placeShip(ship1, 0, 8, "horizontal")).toBe(false);
    expect(gameBoard.placeShip(ship1, 8, 0, "vertical")).toBe(false);
  });

  test("should return false if there is a ship already there", () => {
    const ship1 = new Ship(3);
    gameBoard.placeShip(ship1, 0, 0, "horizontal");
    expect(gameBoard.placeShip(ship1, 0, 0, "horizontal")).toBe(false);
  });

  test("should return false if the attack is a miss", () => {
    const ship1 = new Ship(3);
    gameBoard.placeShip(ship1, 0, 0, "horizontal");
    gameBoard.receiveAttack(1, 0);
    expect(gameBoard.missedAttacks).toEqual([[1, 0]]);
  });

  // more test cases
  test("should return false if the attack is already made", () => {
    const ship1 = new Ship(3);
    gameBoard.placeShip(ship1, 0, 0, "horizontal");
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.receiveAttack(0, 0)).toBe(false);
  });
});
