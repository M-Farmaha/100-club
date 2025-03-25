import { format } from "date-fns";

import { Form, Section } from "./Filters-styled";
import { FilterByName } from "./FilterByName";
import { useEffect } from "react";
import { FilterSelect } from "./FilterSelect";
import { useStateContext } from "../../state/stateContext";
import { FILTERS, filterOptionsByBirth, filterOptionsBySex, filterOptionsByType } from "../../constants/constants";

export const MembersFilterBar = ({ setVisibleMembersArray }) => {
  const { globalState } = useStateContext();
  const { members, filters } = globalState;

  const { playersName, playersType, playersBirth, playersSex } = filters || {};

  useEffect(() => {
    if (!members) return;
    const filtredByName = members?.filter((m) => m.name.toLowerCase().includes(playersName.toLowerCase()));

    const filtredByType =
      playersType === filterOptionsByType.all.id ? filtredByName : filtredByName?.filter((m) => m.type === playersType);

    const filtredBySex =
      playersSex === filterOptionsBySex.all.id ? filtredByType : filtredByType?.filter((m) => m.sex === playersSex);

    let filtredByBirth = filtredBySex;

    if (playersBirth !== filterOptionsByBirth.off.id) {
      const membersWithBirth = filtredBySex?.filter((m) => m.birthDate);
      const membersWithoutBirth = filtredBySex?.filter((m) => !m.birthDate);

      const formatDate = format(new Date(), "MM-dd");

      const ascendingOrder = playersBirth === filterOptionsByBirth.upcoming.id;
      const descendingOrder = playersBirth === filterOptionsByBirth.recently.id;

      if (ascendingOrder || descendingOrder) {
        membersWithBirth?.sort((a, b) => {
          const comparison = ascendingOrder
            ? a.birthDate.slice(5).localeCompare(b.birthDate.slice(5))
            : b.birthDate.slice(5).localeCompare(a.birthDate.slice(5));
          return comparison;
        });

        const index = membersWithBirth.findIndex((el) =>
          ascendingOrder ? el.birthDate.slice(5) >= formatDate : el.birthDate.slice(5) <= formatDate
        );

        if (index !== -1) {
          const removed = membersWithBirth.splice(0, index);
          membersWithBirth.push(...removed);
        }
      }

      if (playersBirth === filterOptionsByBirth.oldest.id) {
        membersWithBirth?.sort((a, b) => a.birthDate.localeCompare(b.birthDate));
      }
      if (playersBirth === filterOptionsByBirth.youngest.id) {
        membersWithBirth?.sort((a, b) => b.birthDate.localeCompare(a.birthDate));
      }

      filtredByBirth = [...membersWithBirth, ...membersWithoutBirth];
    }

    setVisibleMembersArray(filtredByBirth);
  }, [members, playersBirth, playersName, playersSex, playersType, setVisibleMembersArray]);

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FilterByName id={FILTERS.playersName.id} value={playersName} label={FILTERS.playersName.label} />

        <FilterSelect
          id={FILTERS.playersType.id}
          options={filterOptionsByType}
          label={FILTERS.playersType.label}
          placeholder={filterOptionsByType[playersType]?.title}
          icon={"#icon-list"}
        />

        <FilterSelect
          id={FILTERS.playersBirth.id}
          options={filterOptionsByBirth}
          label={FILTERS.playersBirth.label}
          placeholder={filterOptionsByBirth[playersBirth]?.title}
          icon={"#icon-gift"}
        />

        <FilterSelect
          id={FILTERS.playersSex.id}
          options={filterOptionsBySex}
          label={FILTERS.playersSex.label}
          placeholder={filterOptionsBySex[playersSex]?.title}
          icon={"#icon-sex"}
        />
      </Form>
    </Section>
  );
};
