import { useEffect } from "react";
import { AboutSection } from "../../components/AboutSection/AboutSection";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { StatsSection } from "../../components/StatsSection/StatsSection";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
    </>
  );
};

export default HomePage;
