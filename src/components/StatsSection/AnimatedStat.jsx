import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { TitleH3 } from "./StatsSection-styled";

export const AnimatedStat = ({ number, id }) => {
  const [isVisible, setIsVisible] = useState(false);

  const props = useSpring({
    value: isVisible ? number : 0,
    config: { duration: 2000 },
  });

  useEffect(() => {
    const handleScroll = () => {
      const title = document.getElementById(id);
      if (title) {
        const rect = title.getBoundingClientRect();
        const isVisible =
          rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
 
  }, [id]);

  return (
    <>
      <TitleH3 id={id}>
        <animated.p>{props.value.to((x) => x.toFixed(0))}</animated.p>
      </TitleH3>
    </>
  );
};
