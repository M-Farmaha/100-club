export const getMedalColor = (position) => {
  switch (position) {
    case 1:
      return "var(--player-gold-color)";
    case 2:
      return "var(--player-silver-color)";
    case 3:
      return "var(--player-bronze-color)";

    default:
      return null;
  }
};
