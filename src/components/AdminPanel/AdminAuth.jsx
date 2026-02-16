import { useState } from "react";
import {
  AuthWrapper,
  AuthCard,
  AuthTitle,
  AuthSubtitle,
  AuthInput,
  AuthButton,
  AuthError,
  PasswordInputWrapper,
  PasswordToggle,
} from "./AdminPanel.styled";
import { hashPassword, ADMIN_PASSWORD_HASH } from "./adminHelpers";
import sprite from "../../sprite.svg";

export const AdminAuth = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const hash = await hashPassword(password);
      if (hash === ADMIN_PASSWORD_HASH) {
        sessionStorage.setItem("admin_authenticated", "true");
        onSuccess();
      } else {
        setError("Невірний пароль");
        setPassword("");
      }
    } catch {
      setError("Помилка авторизації");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <AuthCard>
        <AuthTitle>🔐 Адмін панель</AuthTitle>
        <AuthSubtitle>Введіть пароль для доступу</AuthSubtitle>
        <form onSubmit={handleSubmit}>
          {error && <AuthError>{error}</AuthError>}
          <PasswordInputWrapper>
            <AuthInput
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              $hasToggle
              autoFocus
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              <svg>
                <use href={`${sprite}#icon-${showPassword ? "eye-blocked" : "eye"}`} />
              </svg>
            </PasswordToggle>
          </PasswordInputWrapper>
          <AuthButton type="submit" disabled={loading || !password}>
            {loading ? "Перевірка..." : "Увійти"}
          </AuthButton>
        </form>
      </AuthCard>
    </AuthWrapper>
  );
};
