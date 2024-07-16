import startGame from "./gameModule";
import "./style/gameMenu.css";

export function gameMenu() {
  // add a button to start game
  let startButton = document.createElement("button");
  startButton.textContent = "Start Game";
  startButton.addEventListener("click", () => {
    let shipData = extractShipDataFromGrid(document.getElementById("grid"));
    console.log(shipData);
    document.body.innerHTML = "";

    startGame(shipData);
    // remove the button
    startButton.parentNode.removeChild(startButton);
  });
  document.body.appendChild(startButton);

  // create a div element
  let div = document.createElement("div");
  div.id = "game-menu-container";

  // style the div
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";

  // create a div for the grid container
  let gridContainer = document.createElement("div");
  gridContainer.id = "grid-container";
  // style the grid container
  gridContainer.style.display = "flex";
  gridContainer.style.justifyContent = "center";
  gridContainer.style.alignItems = "center";
  gridContainer.style.border = "1px solid black";
  gridContainer.style.width = "600px";
  gridContainer.style.height = "600px";

  // create a div for the grid
  let grid = document.createElement("div");
  grid.id = "grid";
  // style the grid
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(10, 1fr)";
  grid.style.gridTemplateRows = "repeat(10, 1fr)";
  grid.style.border = "1px solid black";
  grid.style.width = "400px";
  grid.style.height = "400px";

  // create the cells for the grid

  for (let i = 0; i < 100; i++) {
    let cell = document.createElement("div");
    cell.style.border = "1px solid black";
    cell.style.width = "38px";
    cell.style.height = "38px";

    // put row and coll attribute for each cell
    cell.dataset.row = Math.floor(i / 10);
    cell.dataset.col = i % 10;

    // add dragover event to allow drop
    cell.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    // add drop event to handle dropped ship
    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      let shipId = e.dataTransfer.getData("text/plain");
      let ship = document.getElementById(shipId);
      e.target.appendChild(ship);
    });

    grid.appendChild(cell);
  }

  // append the grid to the grid container
  gridContainer.appendChild(grid);

  // create a div for the ships
  let shipsDiv = document.createElement("div");
  // style the ships div
  shipsDiv.style.marginLeft = "20px";

  // create the ships
  for (let i = 0; i < 5; i++) {
    let ship = document.createElement("div");
    ship.classList.add("drag-ship");
    ship.id = `ship-${i}`;
    ship.style.width = `${40 * (i + 1)}px`;
    ship.style.height = "40px";
    ship.style.backgroundColor = "gray";
    ship.style.marginBottom = "10px";
    // set draggable to true
    ship.draggable = true;
    // add dragstart event
    ship.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", ship.id);
    });
    shipsDiv.appendChild(ship);
  }

  // append the ships div to the grid container
  gridContainer.appendChild(shipsDiv);

  // append the grid container to the div
  div.appendChild(gridContainer);

  // append the start button to the div
  div.appendChild(startButton);

  // append the div to the body
  document.body.appendChild(div);
}

function extractShipDataFromGrid(grid) {
  // get all the cells in grid
  let cells = grid.childNodes;

  let shipData = [];
  cells.forEach((cell) => {
    if (cell.childElementCount > 0) {
      //get the child element of the cell
      let cellShip = cell.children[0];
      //get the width from the ship id + 1
      let shipWidth = parseInt(cellShip.id.split("-")[1]) + 1;

      let ship = {
        row: cell.dataset.row,
        col: cell.dataset.col,
        width: shipWidth,
      };
      shipData.push(ship);
    }
  });
  return shipData;
}
export default gameMenu;
