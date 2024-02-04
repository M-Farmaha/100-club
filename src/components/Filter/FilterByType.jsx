import Select from "react-select";
import { useState } from "react";
import { Group, Label } from "./FilterBar-styled";

export const FilterByType = () => {
  const [isFilterFocused, setIsFilterFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

    container: (styles, { isFocused }) => ({
      ...styles,
      fontSize: "16px",
      color: "var(--primary-black-color)",
      border: isFocused
        ? "1px solid var(--accent-hover-color)"
        : "1px solid var(--primary-black-color)",
      borderRadius: "50px",
    }),

    indicatorsContainer: (styles) => ({
      ...styles,
      paddingRight: "16px",
    }),

    dropdownIndicator: (styles, { isFocused }) => ({
      ...styles,
      padding: "0px",
      color: isFocused
        ? "var(--accent-hover-color)"
        : "var(--primary-black-color)",
      transform: isFocused ? "scaleY(-1)" : "scaleY(1)",
      transition: "var(--main-transition)",
      "&:hover": {
        color: "var(--accent-hover-color)", // Колір при ховері
      },
    }),

    control: (styles, { isFocused }) => ({
      ...styles,
      height: "50px",
      width: "220px",
      border: isFocused ? "none" : "none",
      borderRadius: "50px",
      boxShadow: "none",

      backgroundColor: isFocused
        ? "var(--primary-white-color)"
        : "var(--secondary-white-color)",
      cursor: "pointer",
    }),

    menu: (styles) => ({
      ...styles,
      border: "none",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
      overflow: "hidden",
      borderRadius: "20px",
      padding: "10px 0px",
    }),

    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      fontSize: "16px",
      cursor: "pointer",
      padding: "5px 20px",
      color: isSelected
        ? "var(--primary-black-color)"
        : isFocused
        ? "var(--accent-hover-color)"
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
      <Label isFilterFocused={isFilterFocused}>Фільтрувати за типом</Label>
      <Select
        placeholder={"Усі"}
        noOptionsMessage={() => "Немає збігів"}
        maxMenuHeight={270}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={selectStyles}
        inputId="type"
        value={inputValue}
        onFocus={() => setIsFilterFocused(true)}
        onBlur={() => setIsFilterFocused(false)}
        // menuIsOpen={isFilterFocused}

        onChange={(selectedOption) => setInputValue(selectedOption)}
        options={typeOptions.map((type) => ({
          value: type,
          label: type,
        }))}
      ></Select>
    </Group>
  );
};
