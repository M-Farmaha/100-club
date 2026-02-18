import { createContext, useContext, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import sprite from "../../sprite.svg";

const ToastContext = createContext(null);

export const useAdminToast = () => useContext(ToastContext);

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-12px); }
`;

const ToastWrapper = styled.div`
  position: fixed;
  top: 130px;
  left: 0;
  right: 0;
  z-index: 1100;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const ToastMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--main-font);
  pointer-events: auto;
  animation: ${(props) => (props.$closing ? slideOut : slideIn)} 0.3s ease forwards;
  background: ${(props) =>
    props.$type === "error"
      ? "rgba(255, 68, 0, 0.95)"
      : props.$type === "warning"
      ? "rgba(255, 168, 0, 0.95)"
      : "rgba(34, 44, 68, 0.95)"};
  color: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  max-width: calc(100% - 32px);
  text-align: center;
`;

const ICON_MAP = {
  success: "icon-save",
  error: "icon-close",
  warning: "icon-close",
  delete: "icon-trash",
  restore: "icon-restore",
  add: "icon-plus",
};

const ToastIcon = ({ type }) => {
  const iconId = ICON_MAP[type] || ICON_MAP.success;
  return (
    <svg width="14" height="14" style={{ fill: "#fff", flexShrink: 0 }}>
      <use href={`${sprite}#${iconId}`} />
    </svg>
  );
};

export const AdminToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [closing, setClosing] = useState(false);

  const showToast = useCallback((text, type = "success", duration = 3000) => {
    setClosing(false);
    setToast({ text, type });

    setTimeout(() => {
      setClosing(true);
      setTimeout(() => {
        setToast(null);
        setClosing(false);
      }, 300);
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <ToastWrapper>
          <ToastMessage $type={toast.type} $closing={closing}>
            <ToastIcon type={toast.type} />
            {toast.text}
          </ToastMessage>
        </ToastWrapper>
      )}
    </ToastContext.Provider>
  );
};
