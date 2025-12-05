import { Form, Section } from "./Filters-styled";
import { FilterSelect } from "./FilterSelect";
import { useStateContext } from "../../state/stateContext";
import { FILTERS, filterOptionsBySex, filterOptionsByTournamentType } from "../../constants/constants";

export const SuperStatsFilterBar = () => {
  const { globalState } = useStateContext();
  const { filters } = globalState;
  
  // Use fallback values if filters not initialized in localStorage
  const superStatsSex = filters?.superStatsSex || filterOptionsBySex.all.id;
  const superStatsTournamentType = filters?.superStatsTournamentType || filterOptionsByTournamentType.all.id;

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
      </Form>
    </Section>
  );
};
