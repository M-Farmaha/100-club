import { useState } from "react";
import { Form, Section } from "./Filters-styled";
import { useEffect } from "react";
import { FilterSelect } from "./FilterSelect";

export const ImageGalleryFilterBar = ({
  galleryArray,
  setOrderedGalleryArray,
}) => {
  const [inputsValue, setInputsValue] = useState({
    type: "Спочатку найновіші",
  });

  const typeOptions = ["Спочатку найновіші", "Спочатку найстаріші"];

  useEffect(() => {
    const filtredByType =
      inputsValue.type === "Спочатку найновіші"
        ? [...galleryArray].reverse()
        : galleryArray;
    setOrderedGalleryArray(filtredByType);
  }, [galleryArray, inputsValue.type, setOrderedGalleryArray]);

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FilterSelect
          inputsValue={inputsValue}
          setInputsValue={setInputsValue}
          typeOptions={typeOptions}
          label={"Фільтрувати за датою"}
          placeholder={"Спочатку найновіші"}
        />
      </Form>
    </Section>
  );
};
