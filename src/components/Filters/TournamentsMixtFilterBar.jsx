import { useEffect } from "react";
import { Form, Section } from "./Filters-styled";
import { FilterSelect } from "./FilterSelect";
import { getPlayerNameById } from "../../helpers/getPlayerNameById";
import { useStateContext } from "../../state/stateContext";
import { FILTERS, filterfilterOptionsBySexMix } from "../../constants/constants";

export const TournamentsMixtFilterBar = ({ flattenedArray, members, setFilteredArray }) => {
  const { globalState } = useStateContext();
  const { filters } = globalState;
  const { mixSex } = filters || {};

  const filtredBySex = () => {
    // If "pairs" is selected, return original array
    if (mixSex === 'pairs' || !mixSex) {
      return flattenedArray;
    }

    const filtredArray = flattenedArray.map((player) => {
      if (player.member_id.length === 2) {
        const memberId = player.member_id.find((id) => {
          const foundMember = members.find((m) => m.id === id && m.sex === mixSex);
          return foundMember;
        });

        if (memberId) {
          return {
            ...player,
            member_id: [memberId],
            name: getPlayerNameById([memberId], members),
          };
        }

        return player;
      }

      return player;
    });

    return filtredArray;
  };

  useEffect(() => {
    const filtredArray = filtredBySex();
    setFilteredArray(filtredArray);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mixSex, flattenedArray]);

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FilterSelect
          id={FILTERS.mixSex.id}
          options={filterfilterOptionsBySexMix}
          label={FILTERS.mixSex.label}
          placeholder={filterfilterOptionsBySexMix[mixSex]?.title}
          icon={"#icon-sex"}
        />
      </Form>
    </Section>
  );
};
