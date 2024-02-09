import { useState } from "react";
import { Form, Section } from "./Filters-styled";
import { useEffect } from "react";
import { FilterSelect } from "./FilterSelect";

export const ImageGalleryFilterBar = ({
  galleryArray,
  setOrderedGalleryArray,
  setOrder,
}) => {
  const [inputsValue, setInputsValue] = useState({
    date: "Спочатку найновіші",
  });

  const typeOptions = ["Спочатку найновіші", "Спочатку найстаріші"];

  useEffect(() => {
    if (inputsValue.date === "Спочатку найновіші") {
      setOrderedGalleryArray(galleryArray);
      setOrder("newest");
    } else {
      setOrderedGalleryArray([...galleryArray].reverse());
      setOrder("eldest");
    }
  }, [galleryArray, inputsValue.date, setOrder, setOrderedGalleryArray]);

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FilterSelect
          id={"FilterByDate"}
          inputsValue={inputsValue}
          setInputsValue={setInputsValue}
          typeOptions={typeOptions}
          label={"Фільтр за датою"}
          placeholder={"Спочатку найновіші"}
          icon={"#icon-list"}
        />
      </Form>
    </Section>
  );
};
