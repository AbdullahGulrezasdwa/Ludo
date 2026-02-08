const COLORS = ["red", "green", "yellow", "blue", "purple", "orange"];
const TOKENS_PER_PLAYER = 4;

let game = {
  players: [],
  current: 0,
  dice: 0
};

const turnText = document.getElementById("turnText");
const diceText = document.getElementById("diceText");
const diceEl = document.getElementById("dice");
const rollBtn = document.getElementById("rollBtn");

document.getElementById("playerCount")
  .addEventListener("change", createNameInputs);

function createNameInputs() {
  const count = +playerCount.value;
  names.innerHTML = "";
  for (let i = 0; i < count; i++) {
    names.innerHTML += `<input id="name${i}" placeholder="Player ${i+1}">`;
  }
}
createNameInputs();

function startGame() {
  const count = +playerCount.value;
  game.players = [];

  for (let i = 0; i < count; i++) {
    const name = document.getElementById("name" + i).value || COLORS[i];
    game.players.push({
      id: i,
      name,
      color: COLORS[i],
      tokens: Array(TOKENS_PER_PLAYER).fill(0),
      isCodeRed: name.toLowerCase() === "codered"
    });
  }

  setup.classList.add("hidden");
  gameDiv.classList.remove("hidden");

  createBoard();
  renderTokens();
  updateTurn();
}

rollBtn.onclick = () => {
  diceEl.classList.add("roll");

  setTimeout(() => {
    diceEl.classList.remove("roll");

    const player = game.players[game.current];
    let dice = window.forceSix ? 6 : biasedDice(player);
    window.forceSix = false;

    diceText.textContent = dice;

    movePlayer(player, dice);

    if (dice !== 6) {
      game.current = (game.current + 1) % game.players.length;
    }

    updateTurn();
    renderTokens();
  }, 500);
};

function movePlayer(player, dice) {
  let idx = player.tokens.findIndex(t => t === 0 && dice === 6 || t > 0);
  if (idx === -1) return;

  if (player.tokens[idx] === 0) {
    player.tokens[idx] = 1;
  } else {
    player.tokens[idx] += dice;
    if (player.tokens[idx] > PATH_LENGTH) {
      player.tokens[idx] = PATH_LENGTH;
    }
  }

  handleKills(player, idx);
}

function handleKills(player, tokenIndex) {
  const pos = player.tokens[tokenIndex];

  if (SAFE_CELLS.includes(pos)) return;

  game.players.forEach(p => {
    if (p === player) return;
    p.tokens = p.tokens.map(t => (t === pos ? 0 : t));
  });
}

function renderTokens() {
  document.querySelectorAll(".cell").forEach(c => c.innerHTML = "");

  game.players.forEach(p => {
    p.tokens.forEach(t => {
      if (t > 0) {
        const cell = document.querySelector(`[data-index="${t}"]`);
        if (!cell) return;
        const token = document.createElement("div");
        token.className = `token ${p.color}`;
        cell.appendChild(token);
      }
    });
  });
}

function updateTurn() {
  turnText.textContent = `${game.players[game.current].name}'s turn`;
                    }
