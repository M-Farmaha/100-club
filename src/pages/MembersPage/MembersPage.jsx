import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { MembersList } from "../../components/MembersList/MembersList";
import { membersApi } from "../../Api/ApiRequest";
import { MembersFilterBar } from "../../components/Filters/MembersFilterBar";
import { CounterSection } from "../../components/CounterSection/CounterSection";

const MembersPage = () => {
  const [membersArray, setMembersArray] = useState([]);
  const [visibleMembersArray, setVisibleMembersArray] = useState(membersArray);

  useEffect(() => {
    window.scrollTo(0, 0);

    const members = membersApi();
    members?.sort((a, b) => a.name.localeCompare(b.name));
    setMembersArray(members);
  }, []);

  return (
    <>
      <MembersFilterBar
        membersArray={membersArray}
        setVisibleMembersArray={setVisibleMembersArray}
      />
      <CounterSection visibleUsers={visibleMembersArray.length} />
      <MembersList visibleMembersArray={visibleMembersArray} />

      <Outlet />
    </>
  );
};

export default MembersPage;
