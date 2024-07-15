import startGame from "./gameModule";

export function gameMenu() {
  console.log("Game Menu");
  // add a button to start game
  let startButton = document.createElement("button");
  startButton.textContent = "Start Game";
  startButton.addEventListener("click", () => {
    startGame();
    // remove the button
    startButton.parentNode.removeChild(startButton);
  });
  document.body.appendChild(startButton);
  // create a div element
  let div = document.createElement("div");

  // style the div
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";

  // append the start button to the div
  div.appendChild(startButton);

  // append the div to the body
  document.body.appendChild(div);
}

export default gameMenu;
