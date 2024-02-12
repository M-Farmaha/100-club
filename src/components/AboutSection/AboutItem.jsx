import { useEffect, useState } from "react";
import { AboutIconSvg, Item, SubTitle, TitleH3 } from "./AboutSection-styled";
import sprite from "../../sprite.svg";

export const AboutItem = ({ item, index }) => {
  const { id, icon, title, text } = item;
  const [isVisible, setIsVisible] = useState(false);

  const even = index % 2 === 0;

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(id);
      const rect = element.getBoundingClientRect();
      const visible = rect.top <= window.innerHeight && rect.bottom >= 0;

      setIsVisible(visible);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id]);

  return (
    <>
      <Item id={id} isVisible={isVisible} even={even}>
        <AboutIconSvg>
          <use href={sprite + icon}></use>
        </AboutIconSvg>
        <TitleH3>{title}</TitleH3>
        <SubTitle>{text}</SubTitle>
      </Item>
    </>
  );
};
