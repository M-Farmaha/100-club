import { format } from "date-fns";
import ukLocale from "date-fns/locale/uk";

export const getUkrLocaleDate = (date) => {
  if (!date) return " Невідомо";

  const newDate = format(new Date(date), " d MMMM yyyy", {
    locale: ukLocale,
  });

  return newDate;
};
