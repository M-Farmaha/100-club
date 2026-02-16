import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuth } from "../../components/AdminPanel/AdminAuth";
import { ConfirmModal } from "../../components/AdminPanel/ConfirmModal";
import { useStateContext } from "../../state/stateContext";
import { tournamentsApi } from "../../Api/ApiRequest";
import {
  exportToJsonFile,
  importJsonFile,
  pushToGitHub,
  getGitHubToken,
  setGitHubToken,
  removeGitHubToken,
} from "../../components/AdminPanel/adminHelpers";
import { TournamentLogo } from "../../components/Logo/Logo";
import sprite from "../../sprite.svg";
import {
  AdminContainer,
  DashboardHeader,
  DashboardTitle,
  ActionButton,
  ButtonText,
  ButtonGroup,
  TournamentCard,
  TournamentCardInfo,
  TournamentCardName,
  TournamentCardMeta,
  SuccessMessage,
  EditorSection,
  EditorSectionTitle,
  Divider,
} from "../../components/AdminPanel/AdminPanel.styled";

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("admin_authenticated") === "true"
  );
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [publishing, setPublishing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [tokenInput, setTokenInput] = useState(() => getGitHubToken());
  const { globalState, setGlobalState } = useStateContext();
  const { tournaments } = globalState;
  const navigate = useNavigate();

  const showMessage = useCallback((text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  }, []);

  const handleExport = () => {
    exportToJsonFile(tournaments, "tournaments.json");
    showMessage("✅ Файл tournaments.json завантажено");
  };

  const handleImport = async () => {
    try {
      const data = await importJsonFile();
      if (Array.isArray(data)) {
        setGlobalState((prev) => ({ ...prev, tournaments: data }));
        showMessage("✅ Дані турнірів успішно імпортовано");
      } else {
        showMessage("❌ Невірний формат файлу — очікується масив турнірів", "error");
      }
    } catch (err) {
      showMessage(`❌ ${err.message}`, "error");
    }
  };

  const handlePublish = async () => {
    const token = getGitHubToken();
    if (!token) {
      setShowSettings(true);
      showMessage("⚠️ Спочатку вкажіть GitHub токен у налаштуваннях", "error");
      return;
    }

    setPublishing(true);
    try {
      const now = new Date().toLocaleString("uk-UA");
      await pushToGitHub(
        token,
        tournaments,
        "src/Api/tournaments.json",
        `Update tournaments.json — ${now}`
      );
      showMessage("✅ Опубліковано на GitHub! Сайт оновиться через ~1-2 хвилини");
    } catch (err) {
      showMessage(`❌ Помилка публікації: ${err.message}`, "error");
    } finally {
      setPublishing(false);
    }
  };

  const handleSaveToken = () => {
    if (tokenInput.trim()) {
      setGitHubToken(tokenInput.trim());
      showMessage("✅ GitHub токен збережено");
    } else {
      removeGitHubToken();
      showMessage("🗑 GitHub токен видалено");
    }
  };

  const getTotalStages = (tournament) => {
    return (
      tournament.seasons?.reduce(
        (acc, season) => acc + (season.stages?.length || 0),
        0
      ) || 0
    );
  };

  if (!authenticated) {
    return <AdminAuth onSuccess={() => setAuthenticated(true)} />;
  }

  const sortedTournaments = [...(tournaments || [])].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const hasToken = !!getGitHubToken();

  // Check if current tournaments differ from original published data
  // Normalize data for comparison: sort arrays by id/date and object keys
  const normalizeForComparison = (data) => {
    const sortArray = (arr, key) => {
      if (!Array.isArray(arr)) return arr;
      return [...arr].sort((a, b) => {
        const aVal = a[key] || '';
        const bVal = b[key] || '';
        return String(aVal).localeCompare(String(bVal));
      });
    };

    return JSON.stringify(
      sortArray(data, 'tournament_id').map(t => ({
        ...t,
        seasons: sortArray(t.seasons || [], 'year').map(s => ({
          ...s,
          stages: sortArray(s.stages || [], 'date').map(st => ({
            ...st,
            players: sortArray(st.players || [], 'id')
          }))
        }))
      })),
      (key, value) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          return Object.keys(value).sort().reduce((sorted, k) => {
            sorted[k] = value[k];
            return sorted;
          }, {});
        }
        return value;
      }
    );
  };

  const originalTournaments = tournamentsApi();
  const hasChanges = normalizeForComparison(tournaments) !== normalizeForComparison(originalTournaments);

  const handleRestoreAll = () => {
    // Deep clone to avoid reference issues
    const freshData = JSON.parse(JSON.stringify(tournamentsApi()));
    setGlobalState((prev) => ({ ...prev, tournaments: freshData }));
    setShowRestoreModal(false);
    showMessage("✅ Всі дані відновлено");
  };

  return (
    <AdminContainer>
      <DashboardHeader>
        <DashboardTitle>⚙️ Адмін панель</DashboardTitle>
        <ButtonGroup>
          <ActionButton
            $variant="secondary"
            onClick={() => setShowRestoreModal(true)}
            disabled={!hasChanges}
            style={{
              opacity: hasChanges ? 1 : 0.5,
              cursor: hasChanges ? 'pointer' : 'not-allowed',
            }}
          >
            <svg width="16" height="16" style={{ fill: 'currentColor' }}>
              <use href={`${sprite}#icon-restore`} />
            </svg>
            <ButtonText>Відновити</ButtonText>
          </ActionButton>
          <ActionButton
            onClick={handlePublish}
            disabled={publishing || !hasChanges}
            style={{
              background: hasToken && hasChanges
                ? "linear-gradient(135deg, #2ea043 0%, #3fb950 100%)"
                : undefined,
              opacity: hasChanges ? 1 : 0.5,
              cursor: hasChanges && !publishing ? 'pointer' : 'not-allowed',
            }}
          >
            {publishing ? "⏳" : "🚀"}
            <ButtonText>{publishing ? "Публікація..." : "Опублікувати"}</ButtonText>
          </ActionButton>
          <ActionButton onClick={handleImport} $variant="secondary">
            📥
            <ButtonText>Імпорт</ButtonText>
          </ActionButton>
          <ActionButton onClick={handleExport} $variant="secondary">
            📤
            <ButtonText>Експорт</ButtonText>
          </ActionButton>
          <ActionButton
            onClick={() => setShowSettings(!showSettings)}
            $variant="secondary"
          >
            ⚙️
          </ActionButton>
        </ButtonGroup>
      </DashboardHeader>

      {message && (
        <SuccessMessage
          style={
            messageType === "error"
              ? {
                  background: "rgba(255, 68, 0, 0.1)",
                  color: "var(--lose-color)",
                }
              : undefined
          }
        >
          {message}
        </SuccessMessage>
      )}

      {showSettings && (
        <EditorSection>
          <EditorSectionTitle>🔑 Налаштування GitHub</EditorSectionTitle>
          <p
            style={{
              fontSize: 13,
              color: "var(--secondary-grey-color)",
              marginBottom: 12,
              lineHeight: 1.5,
            }}
          >
            Для автоматичної публікації потрібен{" "}
            <a
              href="https://github.com/settings/tokens/new?scopes=repo&description=100-club-admin"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-color)" }}
            >
              GitHub Personal Access Token
            </a>{" "}
            з правом <strong>repo</strong>. Токен зберігається лише в localStorage
            вашого браузера.
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.12)",
                fontSize: 14,
                fontFamily: "var(--main-font)",
                outline: "none",
              }}
            />
            <ActionButton onClick={handleSaveToken}>Зберегти</ActionButton>
          </div>
          {hasToken && (
            <p
              style={{
                fontSize: 12,
                color: "var(--accent-color)",
                marginTop: 8,
              }}
            >
              ✓ Токен налаштовано
            </p>
          )}
          <Divider />
        </EditorSection>
      )}

      <div>
        {sortedTournaments.map((tournament) => (
          <TournamentCard
            key={tournament.tournament_id}
            onClick={() => navigate(`/admin/${tournament.tournament_id}`)}
          >
            <TournamentLogo path={tournament.logo} />
            <TournamentCardInfo>
              <TournamentCardName>{tournament.name}</TournamentCardName>
              <TournamentCardMeta>
                Сезонів: {tournament.seasons?.length || 0} • Етапів:{" "}
                {getTotalStages(tournament)}
              </TournamentCardMeta>
            </TournamentCardInfo>
            <span style={{ color: "var(--accent-color)", fontSize: "20px" }}>
              →
            </span>
          </TournamentCard>
        ))}
      </div>

      <ConfirmModal
        isOpen={showRestoreModal}
        onConfirm={handleRestoreAll}
        onCancel={() => setShowRestoreModal(false)}
        title="Відновити все?"
        message="Ця дія поверне всі турніри до останнього опублікованого стану. Всі поточні зміни будуть втрачені."
        confirmText="Відновити"
        cancelText="Скасувати"
        requirePassword={false}
        variant="danger"
      />
    </AdminContainer>
  );
};

export default AdminPage;
