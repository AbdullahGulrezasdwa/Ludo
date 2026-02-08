const COLORS = ["red", "green", "yellow", "blue", "purple", "orange"];
const PATH_LENGTH = 40;

let game = {
  players: [],
  current: 0,
  dice: 0
};

const board = document.getElementById("board");
const turnText = document.getElementById("turnText");
const diceText = document.getElementById("diceText");
const rollBtn = document.getElementById("rollBtn");

function startGame() {
  const count = +document.getElementById("playerCount").value;
  const namesDiv = document.getElementById("names");

  game.players = [];

  for (let i = 0; i < count; i++) {
    const name = document.getElementById("name" + i).value || COLORS[i];
    game.players.push({
      id: i,
      name,
      color: COLORS[i],
      pos: 0,
      isCodeRed: name.toLowerCase() === "codered"
    });
  }

  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  drawBoard();
  updateTurn();
}

document.getElementById("playerCount").addEventListener("change", createNameInputs);

function createNameInputs() {
  const count = +document.getElementById("playerCount").value;
  const namesDiv = document.getElementById("names");
  namesDiv.innerHTML = "";

  for (let i = 0; i < count; i++) {
    namesDiv.innerHTML += `
      <input id="name${i}" placeholder="Player ${i + 1} name">
    `;
  }
}

createNameInputs();

rollBtn.onclick = () => {
  const player = game.players[game.current];
  const dice = biasedDiceRoll(player);

  game.dice = dice;
  diceText.textContent = "Dice: " + dice;

  if (player.pos === 0 && dice === 6) {
    player.pos = 1;
  } else if (player.pos > 0) {
    player.pos += dice;
    if (player.pos > PATH_LENGTH) player.pos = PATH_LENGTH;
  }

  drawBoard();

  if (dice !== 6) {
    game.current = (game.current + 1) % game.players.length;
  }

  updateTurn();
};

function updateTurn() {
  const p = game.players[game.current];
  turnText.textContent = `${p.name}'s turn`;
}

function drawBoard() {
  board.innerHTML = "";
  for (let i = 1; i <= PATH_LENGTH; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    game.players.forEach(p => {
      if (p.pos === i) {
        const t = document.createElement("div");
        t.className = `token ${p.color}`;
        cell.appendChild(t);
      }
    });

    board.appendChild(cell);
  }
}
