import { useState } from "react";
import { Group, IconSvg, IconWrap, Input, Label } from "./Filters-styled";

import sprite from "../../sprite.svg";

export const FilterByName = ({ id, inputValue, setInputsValue }) => {
  const [isFilterFocused, setIsFilterFocused] = useState(false);

  const onInputChange = (e) => {
    setInputsValue((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  return (
    <Group>
      <Label htmlFor={id} isFilterFocused={isFilterFocused}>
        Знайти гравця за іменем
        <IconWrap>
          <IconSvg>
            <use href={sprite + "#icon-search"}></use>
          </IconSvg>
        </IconWrap>
      </Label>

      <Input
        id={id}
        name={id}
        autoComplete="off"
        type="text"
        value={inputValue}
        placeholder="Введіть ім'я"
        onChange={onInputChange}
        onFocus={() => setIsFilterFocused(true)}
        onBlur={() => setIsFilterFocused(false)}
      />
    </Group>
  );
};
