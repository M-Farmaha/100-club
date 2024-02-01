import { useEffect, useState } from "react";
import { membersApi } from "../../Api/ApiRequest";
import { MembersUl, Section } from "./MemdersList-styled";
import { MembersItem } from "./MembersItem";

export const MembersList = () => {
  const [membersArray, setMembersArray] = useState([]);

  useEffect(() => {
    const response = membersApi();
    setMembersArray(response);
  }, []);

  return (
    <>
      <Section>
        <MembersUl>
          {membersArray?.map((el, index) => (
            <MembersItem key={el.id} el={el} index={index} />
          ))}
        </MembersUl>
      </Section>
    </>
  );
};
