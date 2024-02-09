import { useState, useEffect } from "react";
import { AboutSection } from "../../components/AboutSection/AboutSection";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { StatsSection } from "../../components/StatsSection/StatsSection";

import { membersApi } from "../../Api/ApiRequest";

const HomePage = () => {
  const [membersArray, setMembersArray] = useState([]);

  useEffect(() => {
    const savedScrollPosition = localStorage.getItem("homePageScrollPosition");
    if (savedScrollPosition) {
      const parsedScrollPosition = parseInt(savedScrollPosition, 10);
      window.scrollTo(0, parsedScrollPosition);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      localStorage.setItem("homePageScrollPosition", window.scrollY);
    };
  }, []);

  useEffect(() => {
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
