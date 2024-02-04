import { useState } from "react";
import { Form, Section } from "./FilterBar-styled";
import { FilterByName } from "./FilterByName";
import { useEffect } from "react";
import { FilterByType } from "./FilterByType";

export const FilterBar = ({ membersArray, setVisibleMembersArray }) => {
  const [filtredByNameArray, setFiltredByNameArray] = useState(membersArray);

  useEffect(() => {
    setVisibleMembersArray(filtredByNameArray);
  }, [filtredByNameArray, setVisibleMembersArray]);

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FilterByName
          membersArray={membersArray}
          setFiltredByNameArray={setFiltredByNameArray}
        />
        <FilterByType />
      </Form>
    </Section>
  );
};
