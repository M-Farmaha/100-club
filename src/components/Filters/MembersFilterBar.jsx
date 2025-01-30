import { useState } from "react";
import { format } from "date-fns";

import { Form, Section } from "./Filters-styled";
import { FilterByName } from "./FilterByName";
import { useEffect } from "react";
import { FilterSelect } from "./FilterSelect";

export const MembersFilterBar = ({ membersArray, setVisibleMembersArray }) => {
  const optionsByType = [
    "Усі",
    "Аматор",
    "Напів професіонал",
    "Професіонал",
    "Легенда",
    "Тренер",
    "Дитяча група",
    "Тенісна мама",
  ];
  const optionsByBirthday = [
    "Вимкнути",
    "Найближчим часом",
    "Недавно було",
    "Найстарші",
    "Наймолодші",
  ];
  const optionsBySex = ["Усі", "Чоловіки", "Жінки"];

  const NAME = "filterByName";
  const TYPE = "filterByType";
  const BIRTH = "filterByBirthday";
  const SEX = "filterBySex";

  const filterByNameLabel = "Знайти гравця за іменем";
  const filterByTypeLabel = "Фільтр за категорією";
  const filterByBirthdayLabel = "Фільтр за днем народження";
  const filterBySexLabel = "Фільтр за статтю";

  const [filters, setFilters] = useState({
    [NAME]: "",
    [TYPE]: optionsByType[0],
    [BIRTH]: optionsByBirthday[0],
    [SEX]: optionsBySex[0],
  });

  useEffect(() => {
    const filtredByName = membersArray?.filter((member) =>
      member.name.toLowerCase().includes(filters[NAME].toLowerCase())
    );

    const filtredByType =
      filters[TYPE] === optionsByType[0]
        ? filtredByName
        : filtredByName?.filter((m) => m.type === filters[TYPE]);

    const filtredBySex = filtredByType?.filter((m) => {
      if (filters[SEX] === optionsBySex[1]) {
        return m.sex === "male";
      } else if (filters[SEX] === optionsBySex[2]) {
        return m.sex === "female";
      } else {
        return m;
      }
    });

    const filtredByBirthday = filtredBySex?.filter((m) => m.birthDate);
    const withoutBirthDate = filtredBySex?.filter((m) => !m.birthDate);

    const formatDate = format(new Date(), "MM-dd");

    if (
      filters[BIRTH] === optionsByBirthday[1] ||
      filters[BIRTH] === optionsByBirthday[2]
    ) {
      const ascendingOrder = filters[BIRTH] === optionsByBirthday[1];

      filtredByBirthday?.sort((a, b) => {
        const comparison = ascendingOrder
          ? a.birthDate.slice(5).localeCompare(b.birthDate.slice(5))
          : b.birthDate.slice(5).localeCompare(a.birthDate.slice(5));
        return comparison;
      });

      const index = filtredByBirthday.findIndex((el) =>
        ascendingOrder
          ? el.birthDate.slice(5) >= formatDate
          : el.birthDate.slice(5) <= formatDate
      );

      if (index !== -1) {
        const removed = filtredByBirthday.splice(0, index);
        filtredByBirthday.push(...removed);
      }
    }
    if (filters[BIRTH] === optionsByBirthday[3]) {
      filtredByBirthday?.sort((a, b) => a.birthDate.localeCompare(b.birthDate));
    }
    if (filters[BIRTH] === optionsByBirthday[4]) {
      filtredByBirthday?.sort((a, b) => b.birthDate.localeCompare(a.birthDate));
    }
    filtredByBirthday.push(...withoutBirthDate);

    setVisibleMembersArray(filtredByBirthday);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, setVisibleMembersArray]);

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FilterByName
          id={NAME}
          value={filters[NAME]}
          setFilters={setFilters}
          label={filterByNameLabel}
        />

        <FilterSelect
          id={TYPE}
          value={filters[TYPE]}
          setFilters={setFilters}
          typeOptions={optionsByType}
          label={filterByTypeLabel}
          placeholder={optionsByType[0]}
          icon={"#icon-list"}
        />

        <FilterSelect
          id={BIRTH}
          setFilters={setFilters}
          typeOptions={optionsByBirthday}
          label={filterByBirthdayLabel}
          placeholder={optionsByBirthday[0]}
          icon={"#icon-gift"}
        />

        <FilterSelect
          id={SEX}
          setFilters={setFilters}
          typeOptions={optionsBySex}
          label={filterBySexLabel}
          placeholder={optionsBySex[0]}
          icon={"#icon-sex"}
        />
      </Form>
    </Section>
  );
};
