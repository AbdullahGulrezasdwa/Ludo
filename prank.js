// Handles subtle "codered" advantage

function rollDice(player) {
  let roll = Math.floor(Math.random() * 6) + 1;

  // Subtle advantage: ~12% chance to increase dice by 1
  if (player.isCodeRed && Math.random() < 0.12 && roll < 6) {
    roll++;
  }

  return roll;
}
