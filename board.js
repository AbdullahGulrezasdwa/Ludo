const BOARD_SIZE = 13;
const PATH_LENGTH = 52;

const SAFE_CELLS = [1, 9, 14, 22, 27, 35, 40, 48];

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    if (SAFE_CELLS.includes(i)) {
      cell.classList.add("safe");
    }

    cell.dataset.index = i;
    board.appendChild(cell);
  }
}
