import { useEffect, useState } from "react";
import { ArrowIconSvg, Button } from "./ScrollToTopButton-styled";

import sprite from "../../sprite.svg";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <Button type="button" onClick={scrollToTop}>
        <ArrowIconSvg>
          <use href={sprite + "#icon-arrow"}></use>
        </ArrowIconSvg>
      </Button>
    )
  );
};
