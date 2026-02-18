import { Form, Section } from "./Filters-styled";
import { FilterSelect } from "./FilterSelect";
import { useStateContext } from "../../state/stateContext";
import { FILTERS, filterOptionsByRating } from "../../constants/constants";

export const StatsRatingFilterBar = () => {
  const { globalState } = useStateContext();
  const { filters } = globalState;

  const statsRating = filters?.statsRating || filterOptionsByRating.total.id;

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FilterSelect
          id={FILTERS.statsRating.id}
          options={filterOptionsByRating}
          label={FILTERS.statsRating.label}
          placeholder={filterOptionsByRating[statsRating]?.title}
          icon={"#icon-star"}
        />
      </Form>
    </Section>
  );
};
