import { useEffect } from "react";
import { MembersList } from "../../components/MembersList/MembersList";

const MembersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MembersList />
    </>
  );
};

export default MembersPage;
