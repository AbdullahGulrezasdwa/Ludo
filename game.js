const COLORS = ["red", "green", "yellow", "blue", "purple", "orange"];
const TOKENS = 4;
const PATH_LENGTH = 52;

let game = {
  players: [],
  current: 0
};

const turnText = document.getElementById("turnText");
const diceText = document.getElementById("diceText");
const rollBtn = document.getElementById("rollBtn");

document.getElementById("playerCount").onchange = createInputs;

function createInputs() {
  names.innerHTML = "";
  for (let i = 0; i < playerCount.value; i++) {
    names.innerHTML += `<input id="name${i}" placeholder="Player ${i+1}">`;
  }
}
createInputs();

function startGame() {
  game.players = [];
  for (let i = 0; i < playerCount.value; i++) {
    const name = document.getElementById("name" + i).value || COLORS[i];
    game.players.push({
      name,
      color: COLORS[i],
      tokens: Array(TOKENS).fill(0),
      isCodeRed: name.toLowerCase() === "codered"
    });
  }

  setup.classList.add("hidden");
  gameDiv.classList.remove("hidden");

  createBoard();
  updateTurn();
}

rollBtn.onclick = () => {
  const player = game.players[game.current];
  const dice = rollDice(player);
  diceText.textContent = dice;

  let idx = player.tokens.findIndex(t => t === 0 && dice === 6 || t > 0);
  if (idx !== -1) {
    player.tokens[idx] += dice;
    if (player.tokens[idx] > PATH_LENGTH) {
      player.tokens[idx] = PATH_LENGTH;
    }
  }

  if (dice !== 6) {
    game.current = (game.current + 1) % game.players.length;
  }

  updateTurn();
};

function updateTurn() {
  turnText.textContent = `${game.players[game.current].name}'s turn`;
}
