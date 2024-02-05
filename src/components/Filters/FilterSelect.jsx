import Select from "react-select";
import { useState } from "react";
import { Group, IconSvg, IconWrap, Label } from "./Filters-styled";

import sprite from "../../sprite.svg";

export const FilterSelect = ({
  inputValue,
  setInputsValue,
  typeOptions,
  label,
  placeholder,
}) => {
  const [isFilterFocused, setIsFilterFocused] = useState(false);

  const onInputChange = (selectedOption) => {
    setInputsValue((prev) => ({
      ...prev,
      type: selectedOption.value,
    }));
  };

  const selectStyles = {
    NoOptionsMessage: (styles) => ({
      ...styles,
      background: "skyblue",
      color: "var(--primary-grey-color)",
    }),

    placeholder: (styles) => ({
      ...styles,
      fontSize: "16px",
      cursor: "pointer",
      color: "var(--primary-grey-color)",
    }),

    input: (styles) => ({
      ...styles,
      padding: "0px",
      margin: "0px",
    }),

    singleValue: (styles) => ({
      ...styles,
    }),

    valueContainer: (styles) => ({
      ...styles,
      paddingLeft: "20px",
    }),

    container: (styles) => ({
      ...styles,
      fontSize: "16px",
      color: "var(--primary-black-color)",
      border: isFilterFocused
        ? "1px solid var(--accent-hover-color)"
        : "1px solid var(--primary-black-color)",
      borderRadius: "50px",
    }),

    indicatorsContainer: (styles) => ({
      ...styles,
      paddingRight: "16px",
    }),

    dropdownIndicator: (styles) => ({
      ...styles,
      padding: "0px",
      color: isFilterFocused
        ? "var(--accent-hover-color)"
        : "var(--primary-grey-color)",
      transform: isFilterFocused ? "scaleY(-1)" : "scaleY(1)",
      transition: "var(--main-transition)",
      "&:hover": {
        color: "var(--accent-hover-color)",
      },
    }),

    control: (styles) => ({
      ...styles,
      height: "50px",
      width: "250px",
      border: "none",
      borderRadius: "50px",
      boxShadow: "none",

      backgroundColor: isFilterFocused
        ? "var(--primary-white-color)"
        : "var(--secondary-white-color)",
      cursor: "pointer",
    }),

    menu: (styles) => ({
      ...styles,
      border: "1px solid var(--accent-hover-color)",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
      overflow: "hidden",
      borderRadius: "20px",
      padding: "10px 0px",
    }),

    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      fontSize: "16px",
      cursor: "pointer",
      padding: "8px 20px",
      color: isFocused
        ? "var(--accent-hover-color)"
        : isSelected
        ? "var(--primary-black-color)"
        : "var(--primary-grey-color)",
      backgroundColor: "var(--primary-white-color)",
    }),

    menuList: (styles) => ({
      ...styles,
      "::-webkit-scrollbar": {
        width: "32px",
      },
      "::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "::-webkit-scrollbar-thumb": {
        background: "var(--secondary-white-color)",
        borderRadius: "9999px",
        border: "12px solid rgba(0, 0, 0, 0)",
        backgroundClip: "padding-box",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "var(--accent-hover-color)",
        borderRadius: "9999px",
        border: "12px solid rgba(0, 0, 0, 0)",
        backgroundClip: "padding-box",
      },
    }),
  };

  return (
    <Group>
      <Label isFilterFocused={isFilterFocused}>
        {label}
        <IconWrap>
          <IconSvg>
            <use href={sprite + "#icon-list"}></use>
          </IconSvg>
        </IconWrap>
      </Label>
      <Select
        placeholder={placeholder}
        noOptionsMessage={() => "Немає збігів"}
        maxMenuHeight={300}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={selectStyles}
        inputId="type"
        value={inputValue}
        isSearchable={false}
        onMenuOpen={() => setIsFilterFocused(true)}
        onMenuClose={() => setIsFilterFocused(false)}
        menuIsOpen={isFilterFocused}
        onChange={(selectedOption) => onInputChange(selectedOption)}
        options={typeOptions.map((type) => ({
          value: type,
          label: type,
        }))}
      ></Select>
    </Group>
  );
};
