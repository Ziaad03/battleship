import ship from "../classes/ship";

// test the ship class methods
const myShip = new ship(3);

test("get ship length", () => {
  expect(myShip.length).toBe(3);
});

test("set ship length", () => {
  myShip.length = 5;
  expect(myShip.length).toBe(5);
});

test("get hit ", () => {
  expect(myShip.hits).toBe(0);
  myShip.hit();
  expect(myShip.hits).toBe(1);
});

test("ship not sunk when the hits not equal length", () => {
  expect(myShip.isSunk()).toBe(false);
  myShip.hit();
});

test("ship is sunk when the hit equal length ", () => {
  expect(myShip.isSunk()).toBe(false);
  for (let i = 0; i < 3; i++) {
    myShip.hit();
  }
  expect(myShip.isSunk()).toBe(true);
});
