export const isDateHidden = (date) => {
  const hiddenDates = ["2024-04-07", "2024-04-21", "2024-04-28", "2024-05-19"];
  return hiddenDates.includes(date);
};
