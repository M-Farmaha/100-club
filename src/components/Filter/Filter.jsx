import { useEffect, useState } from "react";
import {
  Form,
  Group,
  IconSvg,
  IconWrap,
  Input,
  Label,
  Section,
} from "./Filter-styled";

import sprite from "../../sprite.svg";

export const Filter = ({ membersArray, setVisibleMembersArray }) => {
  const [isFilterFocused, setIsFilterFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const visibleMembersArray = membersArray?.filter((member) =>
      member.name.toLowerCase().includes(inputValue?.toLowerCase())
    );
    setVisibleMembersArray(visibleMembersArray);
  }, [inputValue, membersArray, setVisibleMembersArray]);

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Group>
          <Label htmlFor={"filterInput"} isFilterFocused={isFilterFocused}>
            Знайти учасника за іменем
            <IconWrap>
              <IconSvg>
                <use href={sprite + "#icon-search"}></use>
              </IconSvg>
            </IconWrap>
          </Label>

          <Input
            id={"filterInput"}
            autoComplete="off"
            type="text"
            value={inputValue}
            placeholder="Введіть ім'я"
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFilterFocused(true)}
            onBlur={() => setIsFilterFocused(false)}
          />
        </Group>
      </Form>
    </Section>
  );
};
