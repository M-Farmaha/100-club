import { useState } from "react";
import { Form, Section } from "./Filters-styled";
import { useEffect } from "react";
import { FilterSelect } from "./FilterSelect";

export const ImageGalleryFilterBar = ({
  galleryArray,
  setOrderedGalleryArray,
  setOrder,
}) => {
  const optionsByDate = ["Спочатку найновіші", "Спочатку найстаріші"];
  const DATE = "filterByDate";
  const filterByDateLabel = "Фільтр за датою";

  const [filters, setFilters] = useState({
    [DATE]: optionsByDate[0],
  });

  useEffect(() => {
    if (filters[DATE] === optionsByDate[0]) {
      setOrderedGalleryArray(galleryArray);
      setOrder("newest");
    } else {
      setOrderedGalleryArray([...galleryArray].reverse());
      setOrder("eldest");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, setOrder, setOrderedGalleryArray]);

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FilterSelect
          id={DATE}
          setFilters={setFilters}
          typeOptions={optionsByDate}
          label={filterByDateLabel}
          placeholder={optionsByDate[0]}
          icon={"#icon-list"}
        />
      </Form>
    </Section>
  );
};
