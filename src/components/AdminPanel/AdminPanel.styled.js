import styled from "styled-components";

export const AdminContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 72px 24px;
  min-height: calc(100vh - 200px);
`;

export const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 20px;
`;

export const AuthCard = styled.div`
  background: linear-gradient(135deg, #1a1f35 0%, #222c44 100%);
  border-radius: 16px;
  padding: 40px 32px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const AuthTitle = styled.h2`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
`;

export const AuthSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  text-align: center;
  margin-bottom: 32px;
`;

export const AuthInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  padding-right: ${(props) => props.$hasToggle ? "48px" : "16px"};
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 16px;
  font-family: var(--main-font);
  outline: none;
  transition: var(--main-transition);
  margin-bottom: 16px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    border-color: var(--accent-color);
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(calc(-50% - 8px));
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: var(--main-transition);

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 22px;
    height: 22px;
    fill: #fff;
  }
`;

export const AuthButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover-color) 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  font-family: var(--main-font);
  cursor: pointer;
  transition: var(--main-transition);

  &:hover {
    background: linear-gradient(135deg, var(--accent-hover-color) 0%, var(--accent-color) 100%);
  }
`;

export const AuthError = styled.p`
  color: var(--primary-red-color);
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
  animation: shake 0.4s ease;

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }
`;

// Dashboard styles

export const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const DashboardTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-black-color);
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--main-font);
  cursor: pointer;
  transition: var(--main-transition);
  color: #fff;
  background: ${(props) => props.$variant === "danger"
    ? "var(--lose-color)"
    : "var(--primary-black-color)"};

  @media screen and (max-width: 576px) {
    padding: 10px 12px;
    min-width: 40px;
    min-height: 40px;
  }

  &:hover {
    background: ${(props) => props.$variant === "danger"
      ? "#e63d00"
      : "#3a4563"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
  }
`;

export const ButtonText = styled.span`
  @media screen and (max-width: 576px) {
    display: none;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: var(--main-transition);
  color: #fff;
  background: ${(props) => props.$variant === "danger"
    ? "var(--lose-color)"
    : "var(--primary-black-color)"};

  &:hover {
    background: ${(props) => props.$variant === "danger"
      ? "#e63d00"
      : "#3a4563"};
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;

export const TournamentCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: var(--main-transition);
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 14px;

  &:hover {
    border-color: var(--primary-black-color);
    background: rgba(34, 44, 68, 0.03);
  }
`;

export const TournamentCardInfo = styled.div`
  flex: 1;
`;

export const TournamentCardName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-black-color);
  margin-bottom: 4px;
`;

export const TournamentCardMeta = styled.p`
  font-size: 13px;
  color: var(--secondary-grey-color);
`;

// Editor styles

export const EditorSection = styled.div`
  margin-bottom: 16px;
`;

export const EditorSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-black-color);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StageRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${(props) => props.$active ? "rgba(34, 44, 68, 0.06)" : "#fff"};
  margin-bottom: 8px;
  transition: var(--main-transition);
  cursor: pointer;
  border: 1px solid ${(props) => props.$active ? "var(--primary-black-color)" : "rgba(0, 0, 0, 0.06)"};

  &:hover {
    border-color: var(--primary-black-color);
    background: rgba(34, 44, 68, 0.03);
  }
`;

export const StageDate = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: var(--primary-black-color);
  flex-shrink: 1;
  min-width: 0;
`;

export const StageRowRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
`;

export const StagePlayers = styled.span`
  font-size: 13px;
  color: var(--secondary-grey-color);
  min-width: 70px;
  text-align: left;
`;

export const PlayerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 768px) {
    padding: 16px;
    margin-bottom: 16px;
  }
`;

export const PlayerField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > label {
    font-size: 11px;
    font-weight: 600;
    color: var(--secondary-grey-color);
    letter-spacing: 0.3px;
    padding-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const NumberInput = styled.input`
  width: 70px;
  height: 40px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 14px;
  font-family: var(--main-font);
  text-align: center;
  outline: none;
  transition: var(--main-transition);
  background: var(--secondary-white-color);

  &:focus {
    border-color: var(--accent-hover-color);
    box-shadow: 0 0 0 3px rgba(105, 150, 0, 0.1);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const PlayerNumberFields = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;

  @media screen and (max-width: 768px) {
    width: 100%;
    gap: 8px;
    
    & > div {
      flex: 1;
    }

    & > button {
      flex-shrink: 0;
    }
  }
`;

export const DateInput = styled.input`
  padding: 10px 10px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 14px;
  font-family: var(--main-font);
  outline: none;
  transition: var(--main-transition);
  background: var(--secondary-white-color);
  color: var(--primary-black-color);

  &:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(105, 150, 0, 0.1);
  }
`;

export const BackLink = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  height: 44px;
  padding: 10px 18px;

  border-radius: 50px;
  background-color: transparent;
  border: 2px solid var(--primary-black-color);
  color: var(--primary-black-color);

  font-size: 14px;
  font-weight: 600;
  font-family: var(--main-font);

  cursor: pointer;
  transition: var(--main-transition);
  margin-bottom: 20px;

  &:hover {
    border-color: #3a4563;
    color: #3a4563;
  }

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--secondary-grey-color);
  font-size: 15px;
`;

export const SeasonTab = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.$active ? "var(--primary-black-color)" : "rgba(0, 0, 0, 0.1)"};
  background: ${(props) => props.$active ? "var(--primary-black-color)" : "transparent"};
  color: ${(props) => props.$active ? "#fff" : "var(--primary-black-color)"};
  font-size: 14px;
  font-weight: 600;
  font-family: var(--main-font);
  cursor: pointer;
  transition: var(--main-transition);

  &:hover {
    border-color: var(--primary-black-color);
    background: ${(props) => props.$active ? "var(--primary-black-color)" : "rgba(34, 44, 68, 0.06)"};
  }
`;

export const SeasonTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  margin: 16px 0;
`;

export const SuccessMessage = styled.div`
  background: rgba(34, 44, 68, 0.08);
  color: var(--primary-black-color);
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Confirm Modal styles

export const ConfirmOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 330px;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media screen and (max-width: 400px) {
    padding: 16px;
  }
`;

export const ConfirmCard = styled.div`
  background: linear-gradient(135deg, #1a1f35 0%, #222c44 100%);
  border-radius: 16px;
  padding: 32px 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);

  @media screen and (max-width: 400px) {
    padding: 24px 16px;
    border-radius: 12px;
  }
`;

export const ConfirmTitle = styled.h3`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
`;

export const ConfirmMessage = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.5;
`;

export const ConfirmButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;

  @media screen and (max-width: 400px) {
    gap: 8px;
  }
`;

export const ConfirmButton = styled.button`
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--main-font);
  cursor: pointer;
  transition: var(--main-transition);
  flex: 1;
  max-width: 140px;

  background: ${(props) =>
    props.$variant === "danger"
      ? "var(--lose-color)"
      : "var(--primary-black-color)"};
  color: #fff;

  &:hover {
    opacity: 0.9;
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media screen and (max-width: 400px) {
    padding: 12px 16px;
  }
`;

export const ConfirmInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 14px;
  font-family: var(--main-font);
  outline: none;
  transition: var(--main-transition);
  margin-bottom: 20px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    border-color: var(--accent-color);
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const ConfirmError = styled.p`
  color: var(--primary-red-color);
  font-size: 13px;
  text-align: center;
  margin-bottom: 16px;
`;
