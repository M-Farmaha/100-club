import { useState } from "react";
import { Form, Section } from "./Filters-styled";
import { FilterByName } from "./FilterByName";
import { useEffect } from "react";
import { FilterSelect } from "./FilterSelect";

export const MembersFilterBar = ({ membersArray, setVisibleMembersArray }) => {
  const [inputsValue, setInputsValue] = useState({ name: "", type: "Усі" });

  const typeOptions = [
    "Усі",
    "Аматор",
    "Професіонал",
    "Напів професіонал",
    "Тренер",
    "Дитяча група",
    "Тенісна мама",
    "Чемпіон",
  ];

  useEffect(() => {
    const filtredByName = membersArray?.filter((member) =>
      member.name.toLowerCase().includes(inputsValue.name.toLowerCase())
    );

    const filtredByType =
      inputsValue.type === "Усі"
        ? filtredByName
        : filtredByName?.filter((member) => member.type === inputsValue.type);

    setVisibleMembersArray(filtredByType);
  }, [
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
          typeOptions={typeOptions}
          label={"Фільтрувати за категорією"}
          placeholder={"Усі"}
        />
      </Form>
    </Section>
  );
};
