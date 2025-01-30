import { useState } from "react";
import { Group, IconSvg, IconWrap, Input, Label } from "./Filters-styled";

import sprite from "../../sprite.svg";

export const FilterByName = ({ id, label, value, setFilters }) => {
  const [isFilterFocused, setIsFilterFocused] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Group>
      <Label htmlFor={id} isFilterFocused={isFilterFocused}>
        {label}
        <IconWrap>
          <IconSvg>
            <use href={sprite + "#icon-search"}></use>
          </IconSvg>
        </IconWrap>
      </Label>

      <Input
        id={id}
        name={id}
        value={value}
        autoComplete="off"
        type="text"
        placeholder="Введіть ім'я"
        onChange={onInputChange}
        onFocus={() => setIsFilterFocused(true)}
        onBlur={() => setIsFilterFocused(false)}
      />
    </Group>
  );
};
