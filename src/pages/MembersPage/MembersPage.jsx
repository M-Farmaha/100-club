import { useEffect, useState } from "react";
import { MembersList } from "../../components/MembersList/MembersList";
import { membersApi } from "../../Api/ApiRequest";

const MembersPage = () => {
  const [membersArray, setMembersArray] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const members = membersApi();
    members?.sort((a, b) => a.name.localeCompare(b.name));
    setMembersArray(members);
  }, []);

  return (
    <>
      <MembersList membersArray={membersArray} />
    </>
  );
};

export default MembersPage;
