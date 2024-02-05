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
    type: "Спочатку найновіші",
  });

  const typeOptions = ["Спочатку найновіші", "Спочатку найстаріші"];

  useEffect(() => {
    if (inputsValue.type === "Спочатку найновіші") {
      setOrderedGalleryArray(galleryArray);
      setOrder("newest");
    } else {
      setOrderedGalleryArray([...galleryArray].reverse());
      setOrder("eldest");
    }
  }, [galleryArray, inputsValue.type, setOrder, setOrderedGalleryArray]);

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
