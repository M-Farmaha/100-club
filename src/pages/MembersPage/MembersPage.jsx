import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { MembersList } from "../../components/MembersList/MembersList";
import { MembersFilterBar } from "../../components/Filters/MembersFilterBar";
import { ChartSection } from "../../components/ChartSection/ChartSection";
import { useStateContext } from "../../state/stateContext";

const MembersPage = () => {
  const { globalState } = useStateContext();
  const { members } = globalState;

  const [visibleMembersArray, setVisibleMembersArray] = useState(members);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MembersFilterBar
        membersArray={members}
        setVisibleMembersArray={setVisibleMembersArray}
      />

      <MembersList visibleMembersArray={visibleMembersArray} />
      <ChartSection membersArray={members} />
      <Outlet />
    </>
  );
};

export default MembersPage;
