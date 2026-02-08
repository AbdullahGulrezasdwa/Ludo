function biasedDiceRoll(player) {
  let roll = Math.floor(Math.random() * 6) + 1;

  // 🤫 Secret prank
  if (player.isCodeRed) {
    if (Math.random() < 0.10 && roll < 6) {
      roll++; // subtle luck boost
    }
  }

  return roll;
}
