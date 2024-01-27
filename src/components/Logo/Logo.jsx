import sprite from "../../sprite.svg";
import { LogoSvg, LogoWWrap, LogoWWrapAlt } from "./Logo-styled";

export const Logo = () => {
  return (
    <>
      <LogoWWrap>
        <LogoSvg>
          <use href={sprite + "#logo-full"}></use>
        </LogoSvg>
      </LogoWWrap>
    </>
  );
};

export const LogoAlt = () => {
  return (
    <>
      <LogoWWrapAlt>
        <LogoSvg>
          <use href={sprite + "#logo-alt"}></use>
        </LogoSvg>
      </LogoWWrapAlt>
    </>
  );
};
