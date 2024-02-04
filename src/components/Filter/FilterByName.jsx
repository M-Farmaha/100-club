import { useEffect, useState } from "react";
import { Group, IconSvg, IconWrap, Input, Label } from "./FilterBar-styled";

import sprite from "../../sprite.svg";

export const FilterByName = ({ membersArray, setFiltredByNameArray }) => {
  const [isFilterFocused, setIsFilterFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const visibleMembersArray = membersArray?.filter((member) =>
      member.name.toLowerCase().includes(inputValue?.toLowerCase())
    );
    setFiltredByNameArray(visibleMembersArray);
  }, [inputValue, membersArray, setFiltredByNameArray]);

  return (
    <Group>
      <Label isFilterFocused={isFilterFocused}>
        <IconWrap>
          <IconSvg>
            <use href={sprite + "#icon-search"}></use>
          </IconSvg>
        </IconWrap>
        Знайти учасника за іменем
      </Label>

      <Input
        autoComplete="off"
        type="text"
        value={inputValue}
        placeholder="Введіть ім'я"
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFilterFocused(true)}
        onBlur={() => setIsFilterFocused(false)}
      />
    </Group>
  );
};
