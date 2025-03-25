import { useState } from "react";
import { Group, IconSvg, IconWrap, Input, Label } from "./Filters-styled";

import sprite from "../../sprite.svg";
import { useStateContext } from "../../state/stateContext";

export const FilterByName = ({ id, label, value }) => {
  const { setGlobalState } = useStateContext();

  const [isFilterFocused, setIsFilterFocused] = useState(false);

  const onInputChange = (e) => {
    setGlobalState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [id]: e.target.value,
      },
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
