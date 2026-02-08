const BOARD_MAP = [
  // 15x15 grid: 0 = empty, P = path, S = safe, R/G/Y/B = home
  ".....RRRRR.....",
  ".....RRRRR.....",
  ".....RRRRR.....",
  ".....RRRRR.....",
  "PPPPPPSPPPPPPPP",
  "R....P.....G...",
  "R....P.....G...",
  "R....S.....G...",
  "R....P.....G...",
  "PPPPPPPPPPPPPPP",
  ".....YYYYY.....",
  ".....YYYYY.....",
  ".....YYYYY.....",
  ".....YYYYY.....",
  "..............."
];

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  BOARD_MAP.forEach(row => {
    [...row].forEach(c => {
      const cell = document.createElement("div");
      cell.className = "cell";

      if (c === "P") cell.classList.add("path");
      if (c === "S") cell.classList.add("safe");
      if (c === "R") cell.classList.add("home", "red");
      if (c === "G") cell.classList.add("home", "green");
      if (c === "Y") cell.classList.add("home", "yellow");
      if (c === "B") cell.classList.add("home", "blue");

      board.appendChild(cell);
    });
  });
}
