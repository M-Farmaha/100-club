import { useState, useEffect } from "react";
import {
  ConfirmOverlay,
  ConfirmCard,
  ConfirmTitle,
  ConfirmMessage,
  ConfirmButtons,
  ConfirmButton,
  ConfirmInput,
  ConfirmError,
  PasswordInputWrapper,
  PasswordToggle,
} from "./AdminPanel.styled";
import { hashPassword, ADMIN_PASSWORD_HASH } from "./adminHelpers";
import sprite from "../../sprite.svg";

export const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "Підтвердження",
  message = "Ви впевнені?",
  confirmText = "Підтвердити",
  cancelText = "Скасувати",
  requirePassword = false,
  variant = "danger",
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setPassword("");
      setShowPassword(false);
      setError("");
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onCancel();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (requirePassword) {
      if (!password) {
        setError("Введіть пароль");
        return;
      }
      setLoading(true);
      try {
        const hash = await hashPassword(password);
        if (hash !== ADMIN_PASSWORD_HASH) {
          setError("Невірний пароль");
          setPassword("");
          setLoading(false);
          return;
        }
      } catch {
        setError("Помилка перевірки");
        setLoading(false);
        return;
      }
      setLoading(false);
    }
    onConfirm();
  };

  return (
    <ConfirmOverlay onClick={onCancel}>
      <ConfirmCard onClick={(e) => e.stopPropagation()}>
        <ConfirmTitle>{title}</ConfirmTitle>
        <ConfirmMessage>{message}</ConfirmMessage>

        {requirePassword && (
          <>
            {error && <ConfirmError>{error}</ConfirmError>}
            <PasswordInputWrapper>
              <ConfirmInput
                type={showPassword ? "text" : "password"}
                placeholder="Введіть пароль для підтвердження"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: "48px" }}
                autoFocus
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ transform: "translateY(calc(-50% - 10px))" }}
                tabIndex={-1}
              >
                <svg>
                  <use href={`${sprite}#icon-${showPassword ? "eye-blocked" : "eye"}`} />
                </svg>
              </PasswordToggle>
            </PasswordInputWrapper>
          </>
        )}

        <ConfirmButtons>
          <ConfirmButton onClick={onCancel} disabled={loading}>
            {cancelText}
          </ConfirmButton>
          <ConfirmButton
            $variant={variant}
            onClick={handleConfirm}
            disabled={loading || (requirePassword && !password)}
          >
            {loading ? "..." : confirmText}
          </ConfirmButton>
        </ConfirmButtons>
      </ConfirmCard>
    </ConfirmOverlay>
  );
};
