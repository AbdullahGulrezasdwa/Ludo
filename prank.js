function biasedDice(player) {
  let roll = Math.floor(Math.random() * 6) + 1;

  // 🤫 codered luck boost
  if (player.isCodeRed && Math.random() < 0.12 && roll < 6) {
    roll++;
  }

  return roll;
}

// 🔐 DEV CHEAT: press D to force 6
document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() === "d") {
    window.forceSix = true;
  }
});
