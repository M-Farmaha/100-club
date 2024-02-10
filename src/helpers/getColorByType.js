export const getColorByType = (type) => {
  switch (type) {
    case "Аматор":
      return "var(--type-amateur-color)";
    case "Професіонал":
      return "var(--type-profi-color)";
    case "Напів професіонал":
      return "var(--type-semiprofi-color)";
    case "Тренер":
      return "var(--type-coach-color)";
    case "Дитяча група":
      return "var(--type-kid-color)";
    case "Тенісна мама":
      return "var(--type-tennismom-color)";
    case "Чемпіон":
      return "var(--type-champion-color)";

    case "male":
      return "var(--type-male-color)";
    case "female":
      return "var(--type-female-color)";

    case "Зліва":
      return "var(--type-left-color)";
    case "Справа":
      return "var(--type-right-color)";

    case "Одноручний":
      return "var(--type-onehand-color)";
    case "Одноручний та Дворучний":
      return "var(--type-both-color)";
    case "Дворучний":
      return "var(--type-twohand-color)";

    case "Львів":
      return "var(--type-lviv-color)";
    case "Інші":
      return "var(--type-others-color)";

    default:
      return "var(--primary-grey-color)";
  }
};
