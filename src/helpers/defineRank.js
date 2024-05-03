export const defineRank = (place) => {
  let rank;
  switch (place) {
    case 1:
      rank = 100;
      break;
    case 2:
      rank = 80;
      break;
    case 3:
      rank = 70;
      break;
    case 4:
      rank = 60;
      break;
    case 5:
      rank = 50;
      break;
    case 6:
      rank = 40;
      break;
    case 7:
      rank = 30;
      break;
    case 8:
      rank = 20;
      break;
    default:
      rank = 10;
  }
  return rank;
};
