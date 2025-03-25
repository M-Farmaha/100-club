export const optionsByType = {
  amateur: { id: "amateur", title: "Аматор", color: "var(--type-amateur-color)" },
  semiProfessional: { id: "semiProfessional", title: "Напів професіонал", color: "var(--type-semiprofi-color)" },
  professional: { id: "professional", title: "Професіонал", color: "var(--type-profi-color)" },
  legend: { id: "legend", title: "Легенда", color: "var(--type-champion-color)" },
  coach: { id: "coach", title: "Тренер", color: "var(--type-coach-color)" },
  juniorGroup: { id: "juniorGroup", title: "Дитяча група", color: "var(--type-kid-color)" },
  tennisMom: { id: "tennisMom", title: "Тенісна мама", color: "var(--type-tennismom-color)" },
};

export const filterOptionsByType = {
  all: { id: "all", title: "Усі" },
  ...optionsByType,
};

export const optionsByForhand = {
  left: { id: "left", title: "Зліва", color: "var(--type-left-color)" },
  right: { id: "right", title: "Справа", color: "var(--type-right-color)" },
  null: { id: "null", title: "Невідомо", color: "var(--player-default-color)" },
};

export const optionsByBackhand = {
  onehand: { id: "onehand", title: "Одноручний", color: "var(--type-onehand-color)" },
  twohand: { id: "twohand", title: "Дворучний", color: "var(--type-twohand-color)" },
  both: { id: "both", title: "Одноручний та Дворучний", color: "var(--type-both-color)" },
  null: { id: "null", title: "Невідомо", color: "var(--player-default-color)" },
};

export const filterOptionsByBirth = {
  off: { id: "off", title: "Вимкнути" },
  upcoming: { id: "upcoming", title: "Найближчим часом" },
  recently: { id: "recently", title: "Недавно було" },
  oldest: { id: "oldest", title: "Найстарші" },
  youngest: { id: "youngest", title: "Наймолодші" },
};

export const optionsBySex = {
  male: { id: "male", title: "Чоловіки", color: "var(--type-male-color)" },
  female: { id: "female", title: "Жінки", color: "var(--type-female-color)" },
};

export const filterOptionsBySex = {
  all: { id: "all", title: "Усі" },
  ...optionsBySex,
};

export const filterfilterOptionsBySexMix = {
  pairs: { id: "pairs", title: "Пари" },
  ...optionsBySex,
};

export const filterOptionsByDate = {
  newest: { id: "newest", title: "Спочатку найновіші" },
  eldest: { id: "eldest", title: "Спочатку найстаріші" },
};

export const optionsByCity = {
  lviv: { id: "lviv", title: "Львів", color: "var(--type-lviv-color)" },
  others: { id: "others", title: "Інші", color: "var(--type-others-color)" },
  null: { id: "null", title: "Невідомо", color: "var(--player-default-color)" },
};

export const optionsByAge = {
  to20: { id: "to20", title: "Менше 20 років", color: "var(--type-to20-color)" },
  to40: { id: "to40", title: "20-40 років", color: "var(--type-20-40-color)" },
  to60: { id: "to60", title: "40-60 років", color: "var(--type-40-60-color)" },
  over60: { id: "over60", title: "Більше 60 років", color: "var(--type-over60-color)" },
  null: { id: "null", title: "Невідомо", color: "var(--player-default-color)" },
};

export const optionsByExperience = {
  to2: { id: "to2", title: "До 2 років", color: "var(--experience-to2-color)" },
  to5: { id: "to5", title: "2-5 років", color: "var(--experience-2-5-color)" },
  to10: { id: "to10", title: "5-10 років", color: "var(--experience-5-10-color)" },
  over10: { id: "over10", title: "Більше 10 років", color: "var(--experience-over10-color)" },
  null: { id: "null", title: "Невідомо", color: "var(--player-default-color)" },
};

export const FILTERS = {
  playersName: { id: "playersName", label: "Знайти гравця за іменем", initialValue: "" },
  playersType: { id: "playersType", label: "Фільтр за категорією", initialValue: filterOptionsByType.all.id },
  playersBirth: { id: "playersBirth", label: "Фільтр за днем народження", initialValue: filterOptionsByBirth.off.id },
  playersSex: { id: "playersSex", label: "Фільтр за статтю", initialValue: filterOptionsBySex.all.id },

  galleryDate: { id: "galleryDate", label: "Фільтр за датою", initialValue: filterOptionsByDate.newest.id },

  mixSex: { id: "mixSex", label: "Фільтр за статтю", initialValue: filterfilterOptionsBySexMix.pairs.id },
};
