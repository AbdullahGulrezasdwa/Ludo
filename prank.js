function rollDice(player) {
  let roll = Math.floor(Math.random() * 6) + 1;

  // codered luck boost (subtle)
  if (player.isCodeRed && Math.random() < 0.12 && roll < 6) {
    roll++;
  }

  return roll;
}
