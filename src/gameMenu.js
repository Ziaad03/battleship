import startGame from "./gameModule";
import "./style/gameMenu.css";
import background from "./images/background.jpeg";
import shipIcon from "./images/ship-icon.png";

export function gameMenu() {
  // add background image to the body
  let backgroundImage = document.createElement("img");
  backgroundImage.src = background;
  backgroundImage.style.width = "100%";
  backgroundImage.style.height = "100vh";
  backgroundImage.style.position = "fixed";
  backgroundImage.style.top = "0";
  backgroundImage.style.left = "0";
  backgroundImage.style.zIndex = "-1";
  document.body.appendChild(backgroundImage);

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

  // make battleship title
  let divTitle = document.createElement("div");
  let title = document.createElement("h1");
  title.textContent = "Welcome to Battleship!";
  title.style.fontSize = "32px";
  title.style.fontWeight = "bold";

  divTitle.style.width = "90%";
  // center elemnts
  divTitle.style.display = "flex";
  divTitle.style.justifyContent = "center";
  divTitle.style.alignItems = "center";
  // leav top and bottom border
  divTitle.style.borderTop = "3px solid black";
  divTitle.style.borderBottom = "3px solid black";
  divTitle.style.display = "flex";
  divTitle.style.justifyContent = "center";
  divTitle.style.alignItems = "center";

  // create a div for the title icons
  let titleIconsDiv = document.createElement("div");
  // style the title icons div
  titleIconsDiv.style.display = "flex";
  titleIconsDiv.style.alignItems = "center";
  // create the ship icon
  let shipIconImg = document.createElement("img");
  shipIconImg.src = shipIcon;
  shipIconImg.style.width = "40px";
  shipIconImg.style.height = "40px";

  let shipIconImg2 = document.createElement("img");
  shipIconImg2.src = shipIcon;
  shipIconImg2.style.width = "40px";
  shipIconImg2.style.height = "40px";
  // append the ship icon to the title icons div
  titleIconsDiv.appendChild(shipIconImg);
  // append the title icons div to the div title
  divTitle.appendChild(shipIconImg);
  divTitle.appendChild(title);
  divTitle.appendChild(shipIconImg2);

  div.appendChild(divTitle);

  // create a div for the grid container
  let gridContainer = document.createElement("div");
  gridContainer.id = "grid-container";
  // style the grid container

  gridContainer.style.width = "800px";
  gridContainer.style.height = "500px";
  gridContainer.style.padding = "20px";

  let gridTitle = document.createElement("div");
  gridTitle.style.fontSize = "24px";
  gridTitle.style.fontWeight = "bold";
  gridTitle.id = "grid-title";
  gridTitle.textContent = "Place your ships";
  gridContainer.appendChild(gridTitle);
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
  shipsDiv.id = "ships-div";
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
