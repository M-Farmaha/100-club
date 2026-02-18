import { Form, Section } from "./Filters-styled";
import { FilterSelect } from "./FilterSelect";
import { useStateContext } from "../../state/stateContext";
import { FILTERS, filterOptionsBySex, filterOptionsByTournamentType, filterOptionsByRating } from "../../constants/constants";

export const SuperStatsFilterBar = () => {
  const { globalState } = useStateContext();
  const { filters } = globalState;
  
  // Use fallback values if filters not initialized in localStorage
  const superStatsSex = filters?.superStatsSex || filterOptionsBySex.all.id;
  const superStatsTournamentType = filters?.superStatsTournamentType || filterOptionsByTournamentType.all.id;
  const statsRating = filters?.statsRating || filterOptionsByRating.total.id;

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FilterSelect
          id={FILTERS.superStatsSex.id}
          options={filterOptionsBySex}
          label={FILTERS.superStatsSex.label}
          placeholder={filterOptionsBySex[superStatsSex]?.title}
          icon={"#icon-sex"}
        />

        <FilterSelect
          id={FILTERS.superStatsTournamentType.id}
          options={filterOptionsByTournamentType}
          label={FILTERS.superStatsTournamentType.label}
          placeholder={filterOptionsByTournamentType[superStatsTournamentType]?.title}
          icon={"#icon-cup"}
        />

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
