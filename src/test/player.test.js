import Player from "../classes/player";
import Ship from "../classes/ship";
import GameBoard from "../classes/gameboard";

describe("Player", () => {
  let player;

  beforeEach(() => {
    player = new Player("John");
  });

  it("should have a name property", () => {
    expect(player.name).toBe("John");
  });

  it("should have a gameBoard property", () => {
    expect(player.gameBoard).toBeDefined();
    expect(player.gameBoard).toBeInstanceOf(GameBoard);
  });
  it("should fire a shot on the enemy game board", () => {
    const enemyGameBoard = new GameBoard();
    const ship = new Ship(3);
    enemyGameBoard.placeShip(ship, 0, 0, "horizontal");
    player.fireShot(0, 0, enemyGameBoard);
    expect(enemyGameBoard.board[0][0]).toBe("hit");
  });

  it("should place a ship on the player's game board", () => {
    const ship = new Ship(3);
    player.playerPlaceShip(ship, 0, 0, "horizontal");
    expect(player.gameBoard.board[0][0]).toBe(ship);
  });
});
