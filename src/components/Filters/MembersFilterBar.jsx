import { useState } from "react";
import { format } from "date-fns";

import { Form, Section } from "./Filters-styled";
import { FilterByName } from "./FilterByName";
import { useEffect } from "react";
import { FilterSelect } from "./FilterSelect";

export const MembersFilterBar = ({ membersArray, setVisibleMembersArray }) => {
  const [inputsValue, setInputsValue] = useState({
    name: "",
    type: "Усі",
    birthday: "Вимкнути",
  });

  const optionsByType = [
    "Усі",
    "Аматор",
    "Професіонал",
    "Напів професіонал",
    "Тренер",
    "Дитяча група",
    "Тенісна мама",
    "Чемпіон",
  ];
  const optionsByBirthday = [
    "Вимкнути",
    "Найближчим часом",
    "Недавно було",
    "Найстарші",
    "Наймолодші",
  ];

  useEffect(() => {
    const filtredByName = membersArray?.filter((member) =>
      member.name.toLowerCase().includes(inputsValue.name.toLowerCase())
    );

    const filtredByType =
      inputsValue.type === "Усі"
        ? filtredByName
        : filtredByName?.filter((member) => member.type === inputsValue.type);

    const filtredByBirthday = filtredByType;
    const formatDate = format(new Date(), "MM-dd");

    if (
      inputsValue.birthday === "Найближчим часом" ||
      inputsValue.birthday === "Недавно було"
    ) {
      const ascendingOrder = inputsValue.birthday === "Найближчим часом";

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

    if (inputsValue.birthday === "Найстарші") {
      filtredByBirthday?.sort((a, b) => a.birthDate.localeCompare(b.birthDate));
    }

    if (inputsValue.birthday === "Наймолодші") {
      filtredByBirthday?.sort((a, b) => b.birthDate.localeCompare(a.birthDate));
    }

    setVisibleMembersArray(filtredByBirthday);
  }, [
    inputsValue.birthday,
    inputsValue.name,
    inputsValue.type,
    membersArray,
    setVisibleMembersArray,
  ]);

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FilterByName
          inputsValue={inputsValue}
          setInputsValue={setInputsValue}
        />

        <FilterSelect
          inputsValue={inputsValue}
          setInputsValue={setInputsValue}
          typeOptions={optionsByType}
          label={"Фільтр за категорією"}
          placeholder={"Усі"}
          icon={"#icon-list"}
        />

        <FilterSelect
          inputsValue={inputsValue}
          setInputsValue={setInputsValue}
          typeOptions={optionsByBirthday}
          label={"Фільтр за днем народження"}
          placeholder={"Вимкнути"}
          icon={"#icon-gift"}
        />
      </Form>
    </Section>
  );
};
