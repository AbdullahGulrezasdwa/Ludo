// Handles board, token rendering, and safe zones

const PATH_LENGTH = 52;
const SAFE_CELLS = [1, 9, 14, 22, 27, 35, 40, 48];

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let i = 1; i <= PATH_LENGTH; i++) {
    const cell = document.createElement("div");
    cell.className = "cell path";
    if (SAFE_CELLS.includes(i)) cell.classList.add("safe");
    cell.dataset.pos = i;
    board.appendChild(cell);
  }
}

function renderTokens(players) {
  document.querySelectorAll(".cell").forEach(c => c.innerHTML = "");

  players.forEach(player => {
    player.tokens.forEach(pos => {
      if (pos > 0) {
        const cell = document.querySelector(`[data-pos="${pos}"]`);
        if (!cell) return;
        const token = document.createElement("div");
        token.className = `token ${player.color}`;
        cell.appendChild(token);
      }
    });
  });
}

function moveToken(player, tokenIndex, dice) {
  if (player.tokens[tokenIndex] === 0 && dice === 6) {
    player.tokens[tokenIndex] = 1;
  } else if (player.tokens[tokenIndex] > 0) {
    player.tokens[tokenIndex] += dice;
    if (player.tokens[tokenIndex] > PATH_LENGTH) player.tokens[tokenIndex] = PATH_LENGTH;
  }
}

function handleKills(players, currentPlayerIndex) {
  const player = players[currentPlayerIndex];

  player.tokens.forEach(pos => {
    if (SAFE_CELLS.includes(pos) || pos === 0) return;
    players.forEach((other, idx) => {
      if (idx === currentPlayerIndex) return;
      other.tokens = other.tokens.map(t => (t === pos ? 0 : t));
    });
  });
}
