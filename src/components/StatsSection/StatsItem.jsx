import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Item, StatsIconSvg, SubTitle, TitleH3 } from "./StatsSection-styled";

import sprite from "../../sprite.svg";

export const StatItem = ({ name, count, icon }) => {
  const [isVisible, setIsVisible] = useState(false);

  const props = useSpring({
    value: isVisible ? count : 0,
    config: { tension: 200, friction: 100 },
  });

  useEffect(() => {
    const handleScroll = () => {
      const id = document.getElementById(name);
      const rect = id.getBoundingClientRect();
      const visible = rect.top <= window.innerHeight && rect.bottom >= 0;

      setIsVisible(visible);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [name]);

  return (
    <>
      <Item>
        <StatsIconSvg>
          <use href={sprite + `#${icon}`}></use>
        </StatsIconSvg>
        <TitleH3 id={name}>
          <animated.p>{props.value.to((x) => x.toFixed(0))}</animated.p>
        </TitleH3>
        <SubTitle>{name}</SubTitle>
      </Item>
    </>
  );
};
