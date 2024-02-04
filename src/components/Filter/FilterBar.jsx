import { useState } from "react";
import { Form, Section } from "./FilterBar-styled";
import { FilterByName } from "./FilterByName";
import { useEffect } from "react";
import { FilterByType } from "./FilterByType";

export const FilterBar = ({ membersArray, setVisibleMembersArray }) => {
  const [inputsValue, setInputsValue] = useState({ name: "", type: "Усі" });

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
        <FilterByType
          inputsValue={inputsValue}
          setInputsValue={setInputsValue}
        />
      </Form>
    </Section>
  );
};
