import { Form, Section } from "./Filters-styled";
import { FilterSelect } from "./FilterSelect";

import { useStateContext } from "../../state/stateContext";
import { useEffect } from "react";
import { FILTERS, filterOptionsByDate } from "../../constants/constants";

export const ImageGalleryFilterBar = ({ setOrderedGalleryArray }) => {
  const { globalState } = useStateContext();
  const { photos, filters } = globalState;
  const { galleryDate } = filters || {};

  useEffect(() => {
    if (galleryDate === filterOptionsByDate.newest.id) setOrderedGalleryArray(photos);
    if (galleryDate === filterOptionsByDate.eldest.id) setOrderedGalleryArray([...photos].reverse());
  }, [galleryDate, photos, setOrderedGalleryArray]);

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FilterSelect
          id={FILTERS.galleryDate.id}
          options={filterOptionsByDate}
          label={FILTERS.galleryDate.label}
          placeholder={filterOptionsByDate[galleryDate]?.title}
          icon={"#icon-list"}
        />
      </Form>
    </Section>
  );
};
