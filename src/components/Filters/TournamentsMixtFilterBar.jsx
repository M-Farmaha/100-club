import { useEffect, useState } from "react";
import { Form, Section } from "./Filters-styled";
import { FilterSelect } from "./FilterSelect";
import { getPlayerNameById } from "../../helpers/getPlayerNameById";

export const TournamentsMixtFilterBar = ({
  flattenedArray,
  members,
  setFilteredArray,
}) => {
  const optionsBySex = ["Пари", "Чоловіки", "Жінки"];
  const SEX = "filterBySexMixt";
  const filterBySexLabel = "Фільтр за статтю";

  const [filters, setFilters] = useState({
    [SEX]: optionsBySex[0],
  });

  const filtredBySex = () => {
    const map =
      filters[SEX] === optionsBySex[1]
        ? "male"
        : filters[SEX] === optionsBySex[2]
        ? "female"
        : "";

    const filtredArray = flattenedArray.map((player) => {
      if (player.member_id.length === 2) {
        const memberId = player.member_id.find((id) => {
          const foundMember = members.find((m) => m.id === id && m.sex === map);
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
  }, [filters, setFilteredArray]);

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FilterSelect
          id={SEX}
          setFilters={setFilters}
          typeOptions={optionsBySex}
          label={filterBySexLabel}
          placeholder={optionsBySex[0]}
          icon={"#icon-sex"}
        />
      </Form>
    </Section>
  );
};
