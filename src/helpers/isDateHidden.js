export const isDateHidden = (date) => {
  const hiddenDates = [
    "2024-04-07",
    "2024-04-21",
    "2024-04-28",
    "2024-05-19",
    "2024-08-04",
    "2024-08-17",
    "2024-08-18",
  ];
  return hiddenDates.includes(date);
};
