import { useEffect, useState } from "react";
import { MembersList } from "../../components/MembersList/MembersList";
import { membersApi } from "../../Api/ApiRequest";
import { Filter } from "../../components/Filter/Filter";

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
      <Filter
        membersArray={membersArray}
        setVisibleMembersArray={setVisibleMembersArray}
      />
      <MembersList visibleMembersArray={visibleMembersArray} />
    </>
  );
};

export default MembersPage;
