import { useState, useEffect } from "react";
import { AboutSection } from "../../components/AboutSection/AboutSection";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { StatsSection } from "../../components/StatsSection/StatsSection";

import { membersApi } from "../../Api/ApiRequest";

const HomePage = () => {
  const [membersArray, setMembersArray] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const members = membersApi();
    setMembersArray(members);
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection membersArray={membersArray} />
    </>
  );
};

export default HomePage;
