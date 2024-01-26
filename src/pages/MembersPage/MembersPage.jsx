import { useEffect } from "react";

const MembersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <p style={{ paddingTop: "100px" }}>Members Page</p>
    </>
  );
};

export default MembersPage;
