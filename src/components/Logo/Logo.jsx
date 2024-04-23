import sprite from "../../sprite.svg";
import { LogoSvg, LogoWrap } from "./Logo-styled";

export const Logo = () => {
  return (
    <>
      <LogoWrap>
        <LogoSvg>
          <use href={sprite + "#logo-full"}></use>
        </LogoSvg>
      </LogoWrap>
    </>
  );
};

export const LogoAlt = () => {
  return (
    <>
      <LogoWrap>
        <LogoSvg>
          <use href={sprite + "#logo-alt"}></use>
        </LogoSvg>
      </LogoWrap>
    </>
  );
};

export const TournamentLogo = ({ path }) => {
  return (
    <>
      <LogoWrap style={{ width: "60px", height: "60px" }}>
        <LogoSvg>
          <use href={sprite + `#${path}`}></use>
        </LogoSvg>
      </LogoWrap>
    </>
  );
};
