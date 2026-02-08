document.addEventListener("DOMContentLoaded", () => {

const boardDiv = document.getElementById("board");
const namesDiv = document.getElementById("names");
const startBtn = document.getElementById("startBtn");
const rollBtn = document.getElementById("rollBtn");
const setup = document.getElementById("setup");
const gameDiv = document.getElementById("game");
const turnText = document.getElementById("turnText");
const diceText = document.getElementById("diceText");
const playerCountInput = document.getElementById("playerCount");

const COLORS = ["red","green","yellow","blue"];
let players = [];
let currentPlayer = 0;
const TOKENS = 4;

// Create name inputs
function createNameInputs() {
  namesDiv.innerHTML = "";
  for (let i = 0; i < playerCountInput.value; i++) {
    namesDiv.innerHTML += `<input id="name${i}" placeholder="Player ${i+1}"><br>`;
  }
}
playerCountInput.addEventListener("change", createNameInputs);
createNameInputs();

// Start Game
startBtn.onclick = () => {
  players = [];
  for (let i = 0; i < playerCountInput.value; i++) {
    const name = document.getElementById("name" + i).value || COLORS[i];
    players.push({
      name,
      color: COLORS[i],
      tokens: Array(TOKENS).fill(0),
      isCodeRed: name.toLowerCase() === "codered"
    });
  }

  setup.classList.add("hidden");
  gameDiv.classList.remove("hidden");

  createBoard();
  renderTokens(players);
  turnText.textContent = `${players[currentPlayer].name}'s turn`;
};

// Roll Dice
rollBtn.onclick = () => {
  const player = players[currentPlayer];
  const dice = rollDice(player);
  diceText.textContent = "Dice: " + dice;

  const tokenIndex = player.tokens.findIndex(t => t === 0 && dice === 6 || t > 0);
  if (tokenIndex !== -1) {
    moveToken(player, tokenIndex, dice);
    handleKills(players, currentPlayer);
  }

  renderTokens(players);

  if (dice !== 6) {
    currentPlayer = (currentPlayer + 1) % players.length;
  }

  turnText.textContent = `${players[currentPlayer].name}'s turn`;
};

});
